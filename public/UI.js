    //Windows
// Funkce pro zobrazení okna nastavení hry
function openGameSettings() {
    showWindow("gameSettings");
}

function openSettings(){
    showWindow("menuSettings");
    document.getElementById("menu").classList.add("hidden");
}

function backTuMenu(){
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("menuSettings").classList.add("hidden");
    document.getElementById("gameSettings").classList.add("hidden");
    document.getElementById("gameWindow").classList.add("hidden");
}

// Funkce pro spuštění hry
function startGame() {
    const playerName = document.getElementById("playerName").value;
    if (!playerName.trim()) {
        alert("Zadejte své jméno!");
        return;
    }
    localStorage.setItem("Name", playerName);
    // Skryjeme menu a zobrazíme hru
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("gameSettings").classList.add("hidden");
    showWindow("gameWindow");
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

    //Bavkeraund
//Pohyblivé pozadí
function createAnimal() {
    const animal = document.createElement("div");
    animal.classList.add("animal");

    let startX = Math.random() * window.innerWidth;
    let startY = Math.random() * window.innerHeight;
    let endX = Math.random() * window.innerWidth;
    let endY = Math.random() * window.innerHeight;

    animal.style.left = `${startX}px`;
    animal.style.top = `${startY}px`;

    document.body.appendChild(animal);

    animal.animate([
        { transform: `translate(0, 0)` },
        { transform: `translate(${endX - startX}px, ${endY - startY}px)` }
    ], {
        duration: Math.random() * 5000 + 5000, // 5-10 sekund
        iterations: Infinity,
        direction: "alternate"
    });
}

// Generuje několik zvířátek na začátku
for (let i = 0; i < 4; i++) {
    createAnimal();
}
