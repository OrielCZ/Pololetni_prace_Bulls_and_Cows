    //Server
const API_URL = 'http://localhost:3000/api';

function submitScore(player_name, attempts) {
    fetch(`${API_URL}/submit-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_name, attempts })
    })
    .then(response => response.json())
    .then(data => console.log('Skóre odesláno:', data))
    .catch(error => console.error('Chyba při odesílání skóre:', error));
}

function loadLeaderboard() {
    fetch(`${API_URL}/leaderboard`)
    .then(response => response.json())
    .then(scores => {
        const leaderboard = document.getElementById('leaderboard');
        leaderboard.innerHTML = scores.map((s, i) => `<li>${i + 1}. ${s.player_name} - ${s.attempts} pokusů</li>`).join('');
    })
    .catch(error => console.error('Chyba při načítání žebříčku:', error));
}

window.onload = loadLeaderboard;

// Nastavení událostí
function submitScore(player_name, attempts) {

    fetch('http://localhost:3000/api/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_name, attempts })
    })
    .then(response => response.json())
    .then(data => console.log('Skóre odesláno:', data))
    .catch(error => console.error('Chyba při odesílání skóre:', error));
}

// Náčítání score
function loadLeaderboard() {
    fetch('http://localhost:3000/api/leaderboard')
    .then(response => response.json())
    .then(scores => {
        const leaderboard = document.getElementById('leaderboard');
        leaderboard.innerHTML = scores.map((s, i) => `<li>${i + 1}. ${s.player_name} - ${s.attempts} pokusů</li>`).join('');
    })
    .catch(error => console.error('Chyba při načítání žebříčku:', error));
}

// Načíst žebříček při načtení stránky
window.onload = loadLeaderboard;

    //HRA
// Generování tajného čísla bez opakujících se číslic
function generateSecretNumber() {
    let digits = [];
    while (digits.length < 4) {
        let num = Math.floor(Math.random() * 10);
        if (!digits.includes(num) && num !== 0) {
            digits.push(num);
        }
    }
    return digits.join('');
}

// Funkce pro kontrolu Bulls a Cows
function checkGuess(secret, guess) {
    let bulls = 0;
    let cows = 0;
    
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }

    return { bulls, cows };
}



//↓V testu ↓
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".digit-input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            if (e.target.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus(); // Přeskočí na další číslo
                }
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && e.target.value === "") {
                if (index > 0) {
                    inputs[index - 1].focus(); // Skok zpět, když se maže
                }
            }
        });
    });
});

// Odeslání čísla ke zpracování
function submitGuess() {
    const inputs = document.querySelectorAll(".digit-input");
    let guess = "";

    inputs.forEach(input => {
        guess += input.value;
    });

    if (guess.length === 4) {
        console.log("Odeslaný tip:", guess);
        checkGuess(guess); // Tady by se volala funkce na kontrolu tipu
    } else {
        alert("Zadejte všechna 4 čísla!");
    }
}
//↑V testu ↑



// Funkce pro validaci vstupu
function isValidGuess(guess1, guess2, guess3, guess4) {
    let guess = guess1 + guess2 + guess3 + guess4
    if (guess.length !== 4 || isNaN(guess) || guess[0] === '0') {
        return false;
    }
    let digits = new Set(guess);
    return digits.size === 4;  // Kontrola duplicity číslic
}

let secretNumber = generateSecretNumber();
let attempts = 0;
let history = [];

document.getElementById('submit-guess').addEventListener('click', function() {
    const guess = document.getElementById('guess').value;

    if (!isValidGuess(guess)) {
        alert("Neplatný vstup! Zadejte čtyřmístné číslo bez duplicit.");
        return;
    }

    // Zobrazení zpětné vazby
    attempts++;
    const { bulls, cows } = checkGuess(secretNumber, guess);
    history.push(`Tip: ${guess} - 🟢${bulls} 🟡${cows}`);
    document.getElementById('feedback').innerText = `Bulls: ${bulls}, Cows: ${cows}`;
    
    // Historie pokusů
    const historyList = document.getElementById('history');
    historyList.innerHTML = history.map(entry => `<li>${entry}</li>`).join('');

    // Kontrola výhry
    if (bulls === 4) {
        const player_name = prompt("Gratulujeme! Zadejte své jméno:");
        if (player_name) submitScore(player_name, attempts);
        alert(`Uhodl jsi číslo ${secretNumber} za ${attempts} pokusů.`);
    }
});

// Nová hra
document.getElementById('new-game').addEventListener('click', function() {
    secretNumber = generateSecretNumber();
    attempts = 0;
    history = [];
    document.getElementById('guess').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('history').innerHTML = '';
});