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
