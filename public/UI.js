    //Windows
// Funkce pro zobrazení okna nastavení hry
function openGameSettings() {
    document.getElementById("gameSettings").classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
}

function openLeaderboard(){
    document.getElementById("w_leaderboard").classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
}

function openSettings(){
    document.getElementById("menuSettings").classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
}

function openInfo(){
    document.getElementById("informace").classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
}

function backTuMenu(){
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("menuSettings").classList.add("hidden");
    document.getElementById("gameSettings").classList.add("hidden");
    document.getElementById("gameWindow").classList.add("hidden");
    document.getElementById("w_leaderboard").classList.add("hidden");
    document.getElementById("informace").classList.add("hidden");
}

// Funkce pro spuštění hry
function startGame() {
    const playerName = document.getElementById("playerName").value;
    const numberLength = parseInt(document.getElementById("numberLength").value);
    
    if (!playerName.trim()) {
        alert("Zadejte své jméno!");
        return;
    }
    localStorage.setItem("Name", playerName);
    localStorage.setItem("Length", numberLength);

        // Vytvoření vstupů podle zvolené délky
        const numberInputs = document.getElementById("number-inputs");
        numberInputs.innerHTML = '';
        for (let i = 0; i < numberLength; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.classList.add("digit-input");
            input.id = `digit${i + 1}`;
            numberInputs.appendChild(input);
        }
        setupInputNavigation(); // <- přidej tento řádek
        
    
    // Skryjeme menu a zobrazíme hru
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("gameSettings").classList.add("hidden");
    document.getElementById("gameWindow").classList.remove("hidden");
    setupInputNavigation();

    
}

// Přetahování oken jen za title-bar
document.querySelectorAll(".window").forEach(window => {
    const titleBar = window.querySelector(".title-bar");
    let isDragging = false, startX, startY;

    titleBar.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - window.offsetLeft;
        startY = e.clientY - window.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        window.style.left = `${e.clientX - startX}px`;
        window.style.top = `${e.clientY - startY}px`;
    });

    document.addEventListener("mouseup", () => isDragging = false);
});

// Funkce pro umístění okna na volné místo
function showWindow(id) {
    let windowElement = document.getElementById(id);
    windowElement.classList.remove("hidden");

    let windows = document.querySelectorAll(".window:not(.hidden)");
    let offsetX = 50;
    let offsetY = 50;

    windows.forEach(win => {
        let rect = win.getBoundingClientRect();
        offsetX = Math.max(offsetX, rect.right + 10);
        offsetY = Math.max(offsetY, rect.bottom + 10);
    });

    windowElement.style.left = `${Math.min(offsetX, window.innerWidth - 310)}px`;
    windowElement.style.top = `${Math.min(offsetY, window.innerHeight - 200)}px`;
}

    //Nastavení
// Získání tlačítka a přepínání režimu
const toggleButton = document.getElementById("toggleMode");

// Zkontrolování, jestli uživatel preferuje tmavý režim
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

toggleButton.addEventListener("click", function() {
    // Přepnutí třídy a uložení do localStorage
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
