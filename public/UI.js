// Funkce pro zobrazení okna nastavení hry
function openGameSettings() {
    document.getElementById("gameSettings").classList.remove("hidden");
}

// Funkce pro spuštění hry
function startGame() {
    const playerName = document.getElementById("playerName").value;

    if (!playerName.trim()) {
        alert("Zadejte své jméno!");
        return;
    }

    console.log(`Hráč: ${playerName}`);

    // Skryjeme menu a zobrazíme hru
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("gameSettings").classList.add("hidden");
    document.getElementById("gameWindow").classList.remove("hidden");
}

// Přetahování oken
document.querySelectorAll(".draggable").forEach(window => {
    let isDragging = false, startX, startY;

    window.addEventListener("mousedown", (e) => {
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
