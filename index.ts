import { file } from "bun";
import Elysia, { t } from "elysia";

// CONFIG
const ALLOWED_CHARS = "1234567890";
const CODE_LENGTH = 4;
const GAME_DURATION = 60 * 60 * 1000; // 1 hodina
const ATTEMPTS = 10;
const PORT = 3000;

// CODE
const games = new Map<number, {
  code: string,
  start: number,
  attempt: number
}>();

const random = function (max: number) {
  return Math.floor(Math.random() * max);
};
const random_char = function () {
  return ALLOWED_CHARS[random(ALLOWED_CHARS.length)];
};
const gen_id = (function () {
  let id = 1;
  return () => id++;
})();
const gen_code = function (len: number) {
  return new Array(len).fill(null).map(_ => random_char()).join("");
};

type DigitStatus = { ok: number, almost: number, wrong: number };

function evaluateGuess(guess: string, code: string): DigitStatus {
  let correctPosition = 0;
  let wrongPosition = 0;
  const secretDigits = code.split('');
  const guessDigits = guess.split('');
  const secretCounts: { [key: string]: number } = {};
  const guessCounts: { [key: string]: number } = {};

  for (let i = 0; i < 4; i++) {
    if (secretDigits[i] === guessDigits[i]) {
      correctPosition++;
    } else {
      secretCounts[secretDigits[i]] = (secretCounts[secretDigits[i]] || 0) + 1;
      guessCounts[guessDigits[i]] = (guessCounts[guessDigits[i]] || 0) + 1;
    }
  }

  for (const digit in guessCounts) {
    if (secretCounts[digit]) {
      wrongPosition += Math.min(secretCounts[digit], guessCounts[digit]);
    }
  }

  const result: DigitStatus = { ok: correctPosition, almost: wrongPosition, wrong: code.length - correctPosition - wrongPosition };
  if (result.wrong < 0)
    result.wrong = 0;

  return result;
}


function serve(port: number) {
  const api = new Elysia()
    .get("/new-game", () => {
      const id = gen_id();
      const code = gen_code(CODE_LENGTH);

      const time = Date.now();

      games.set(id, {
        code,
        start: time,
        attempt: 0
      });
      return {
        id,
        start: time
      };
    })
    .post("/game/:id/submit", ({ body, params, set }) => {
      const id = Number(params.id);
      const code = body.code;
      const game = games.get(id);
      if (!game) {
        set.status = 404;
        return {
          err: "Game Not Found"
        };
      }

      game.attempt++;
      const result = evaluateGuess(code, game.code);

      if (result.ok === CODE_LENGTH || game.attempt >= 10) {
        games.delete(id);
      }

      return {
        result,
        code: game.attempt >= 10 ? game.code : undefined
      };
    }, {
      body: t.Object({
        code: t.String()
      })
    });


  const app = new Elysia()
    .use(api)
    .all("/", () => file("./index.html"))
    .all("*", () => file("./not_found.html"));


  setInterval(() => {
    const entries = games.entries();
    for (const [id, game] of entries) {
      if (game.start + GAME_DURATION < Date.now() || game.attempt >= ATTEMPTS) {
        games.delete(id);
      }
    }
  }, 60_000);
  app.listen({ port }, () => console.log(`Listening on port ${port}`));
}
serve(PORT);