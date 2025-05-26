/**
 * Bulls & Cows - Backend Server
 * 
 * Server implementace pro hru Bulls & Cows s využitím Elysia frameworku
 * a SQLite databáze pro ukládání skóre hráčů.
 * 
 * @author Jiří Theodor Smítka, Ondřej Zach
 * @version 1.0.0
 * @license MIT
 */

import Elysia, { t } from "elysia";
import staticPlugin from "@elysiajs/static";
import { Database } from "bun:sqlite";



/**
 * Konfigurační konstanty aplikace
 */
const ALLOWED_CHARS = "1234567890";  // Povolené znaky pro generování kódu
const CODE_LENGTH = 4;               // Výchozí délka kódu
const GAME_DURATION = 60 * 60 * 1000; // Doba trvání hry (1 hodina)
const PORT = 3000;                   // Port serveru

/**
 * Inicializace SQLite databáze pro ukládání skóre
 */
const db = new Database("scores.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name TEXT NOT NULL,
    attempts INTEGER NOT NULL,
    timestamp INTEGER NOT NULL
  )
`);

/**
 * Typ pro uchování informací o probíhající hře
 */
type GameInfo = {
  code: string;   // Tajný kód k uhodnutí
  start: number;  // Čas začátku hry (timestamp)
  attempt: number; // Počet pokusů
};

/**
 * In-memory úložiště aktivních her
 */
const games = new Map<number, GameInfo>();

/**
 * Generuje náhodné číslo v rozsahu 0 až (max-1)
 * 
 * @param max - Maximální hodnota (nezahrnuje tuto hodnotu)
 * @returns Náhodné celé číslo
 */
const random = function (max: number): number {
  return Math.floor(Math.random() * max);
};

/**
 * Vrací náhodný znak z povolených znaků
 * 
 * @returns Náhodný znak
 */
const random_char = function (): string {
  return ALLOWED_CHARS[random(ALLOWED_CHARS.length)];
};

/**
 * Generátor jedinečných ID pro hry
 * Uzávěr (closure) pro zajištění unikátnosti ID
 * 
 * @returns Funkce vracející nové ID
 */
const gen_id = (function (): () => number {
  let id = 1;
  return () => id++;
})();

/**
 * Generuje náhodný kód dané délky
 * 
 * @param len - Délka kódu
 * @returns Vygenerovaný kód jako řetězec
 */
const gen_code = function (len: number): string {
  return new Array(len).fill(null).map(_ => random_char()).join("");
};

/**
 * Typ pro výsledek porovnání hádaného kódu s tajným kódem
 */
type DigitStatus = { 
  ok: number;     // Počet číslic na správném místě (bulls)
  almost: number; // Počet číslic ve výsledku, ale na špatném místě (cows)
  wrong: number;  // Počet špatných číslic
};

/**
 * Vyhodnotí pokus uživatele a vrátí počet správných číslic
 * na správných a špatných místech (bulls and cows)
 * 
 * @param guess - Hádaný kód od uživatele
 * @param code - Tajný kód k uhodnutí
 * @returns Objekt s počtem bulls (ok), cows (almost) a wrong číslic
 */
function evaluateGuess(guess: string, code: string): DigitStatus {
  let correctPosition = 0;
  let wrongPosition = 0;
  const secretDigits = code.split('');
  const guessDigits = guess.split('');
  const secretCounts: { [key: string]: number } = {};
  const guessCounts: { [key: string]: number } = {};

  // Nejdřív najdi číslice na správných pozicích
  for (let i = 0; i < code.length; i++) {
    if (secretDigits[i] === guessDigits[i]) {
      correctPosition++;
    } else {
      // Spočítej zbývající číslice pro pozdější porovnání
      secretCounts[secretDigits[i]] = (secretCounts[secretDigits[i]] || 0) + 1;
      guessCounts[guessDigits[i]] = (guessCounts[guessDigits[i]] || 0) + 1;
    }
  }

  // Spočítej číslice na špatných pozicích
  for (const digit in guessCounts) {
    if (secretCounts[digit]) {
      wrongPosition += Math.min(secretCounts[digit], guessCounts[digit]);
    }
  }

  // Sestav výsledek
  const result: DigitStatus = { 
    ok: correctPosition, 
    almost: wrongPosition, 
    wrong: code.length - correctPosition - wrongPosition 
  };
  
  // Oprava možného záporného počtu špatných číslic
  if (result.wrong < 0)
    result.wrong = 0;

  return result;
}

/**
 * Hlavní funkce pro spuštění serveru
 * 
 * @param port - Port, na kterém má server běžet
 */
function serve(port: number): void {
  // API endpointy pro hru
  const api = new Elysia()
    /**
     * Vytvoří novou hru
     * 
     * @route GET /api/new-game
     * @returns Objekt s ID hry a časem začátku
     */
    .get("/api/new-game", () => {
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
    /**
     * Zpracuje pokus hráče o uhádnutí kódu
     * 
     * @route POST /api/game/:id/submit
     * @param id - ID hry
     * @param body.code - Hádaný kód
     * @returns Výsledek pokusu nebo chybovou zprávu
     */
    .post("/api/game/:id/submit", ({ body, params, set }) => {
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

      // Pokud hráč uhodl celý kód, odstraň hru z paměti
      if (result.ok === CODE_LENGTH) {
        games.delete(id);
      }

      return {
        result
      };
    }, {
      body: t.Object({
        code: t.String()
      })
    })
    /**
     * Uloží skóre hráče do databáze
     * 
     * @route POST /api/submit-score
     * @param body.player_name - Jméno hráče
     * @param body.attempts - Počet pokusů
     * @returns Potvrzení úspěchu nebo chybovou zprávu
     */
    .post("/api/submit-score", ({ body, set }) => {
      const { player_name, attempts } = body;
      
      // Validace vstupních dat
      if (!player_name || typeof attempts !== 'number') {
        set.status = 400;
        return {
          err: "Invalid data"
        };
      }
      
      try {
        // Uložení skóre do databáze
        db.exec(`
          INSERT INTO scores (player_name, attempts, timestamp) 
          VALUES (?, ?, ?)
        `, [player_name, attempts, Date.now()]);
        
        return {
          success: true,
          message: "Score submitted successfully"
        };
      } catch (error) {
        console.error("Error saving score:", error);
        set.status = 500;
        return {
          err: "Failed to save score"
        };
      }
    }, {
      body: t.Object({
        player_name: t.String(),
        attempts: t.Number()
      })
    })
    /**
     * Vrátí žebříček nejlepších hráčů
     * 
     * @route GET /api/leaderboard
     * @returns Seznam nejlepších hráčů seřazený podle počtu pokusů
     */
    .get("/api/leaderboard", () => {
      try {
        // Načtení nejlepších 10 skóre seřazených podle počtu pokusů
        const scores = db.query(`
          SELECT player_name, attempts 
          FROM scores 
          ORDER BY attempts ASC, timestamp ASC 
          LIMIT 10
        `).all();
        
        return scores;
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
      }
    });

  // Hlavní aplikace - spojení statických souborů a API
  const app = new Elysia()
    .use(staticPlugin({
      prefix: "/",
      assets: "public"
    }))
    .use(api);

  // Pravidelné čištění neaktivních her
  setInterval(() => {
    const entries = games.entries();
    for (const [id, game] of entries) {
      if (game.start + GAME_DURATION < Date.now()) {
        games.delete(id);
      }
    }
  }, 60_000);
  
  // Spuštění serveru
  app.listen({ port }, () => console.log(`Server is running on http://localhost:${port}`));
  
  // Výpis informací o žebříčku při startu
  console.log("Leaderboard initialized with:", db.query("SELECT * FROM scores ORDER BY attempts ASC LIMIT 5").all());
}

// Spuštění serveru na konfigurovaném portu
serve(PORT);