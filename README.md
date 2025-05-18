# Pololetni_prace_Bulls_and_Cows
 
 [Bulls & Cows_Cíle](https://www.remnote.com/a/Seznam-projektu/67a09c942d1d3b8343d49e4b)

# Dokumentace k projektu Bulls & Cows

## 1. Přehled projektu
Bulls & Cows je webová hra, ve které hráč hádá náhodné čtyřmístné číslo, které si počítač tajně vygeneruje. Po každém pokusu dostane zpětnou vazbu v podobě:
- **Bulls (🟢)** – správná číslice na správném místě.
- **Cows (🟡)** – správná číslice, ale na špatném místě.

---

## 2. Struktura projektu

### **Frontend (JavaScript, HTML, CSS)**
- `index.html` – obsahuje UI hry.
- `style.css` – definuje vizuální styl hry.
- `script.js` – herní logika na straně klienta.

### **Backend (Node.js, Express, PostgreSQL)**
- `index.ts` – serverová logika.

---

## 3. Herní logika
### **Generování tajného čísla**
- Po spuštění hry backend vygeneruje **čtyřmístné číslo bez duplicitních číslic**.
- Číslo je uloženo do session na straně klienta.

### **Zadávání hádaného čísla**
- Hráč zadává číslo do inputu a potvrzuje ho tlačítkem.
- Backend zkontroluje vstup a vrátí počet Bulls a Cows.
- Výsledky se zobrazí v tabulce historie pokusů.

### **Validace vstupu**
- Hráč může zadat pouze **čtyřmístné číslo**.
- **Duplicitní číslice nejsou povoleny**.
- Číslo **nesmí začínat nulou**.

### **Počítání pokusů a vítězství**
- Po každém pokusu se **zvýší počet tahů**.
- Pokud hráč uhodne celé číslo, zobrazí se vítězná zpráva a možnost nové hry.

### **Historie pokusů**
- Všechny předchozí pokusy se zobrazují ve formě tabulky.

---

## 4. Online leaderboard
### **Ukládání skóre**
- Backend přijímá jméno hráče (`player_name`) a počet pokusů.
- Skóre se ukládá do PostgreSQL.

### **Zobrazení leaderboardu**
- Frontend načítá leaderboard přes API a zobrazuje top hráče.

---

## 5. Technické požadavky vs. aktuální stav

| Požadavek | Stav |
|-----------|------|
| **Generování tajného čísla** | ✅ Hotovo |
| **Validace vstupu** | ✅ Hotovo |
| **Počítání pokusů** | ✅ Hotovo |
| **Historie pokusů** | ✅ Hotovo |
| **Online leaderboard** | ✅ Hotovo |
| **LocalStorage pro nejlepší skóre** | ✅ Hotovo |
| **Možnost změny délky čísla** | ✅ Hotovo |
| **Dark/Light Mode** | ✅ Hotovo |


---

## 6. Jak spustit projekt
### **1. Backend**
To install dependencies:
```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

---

### **2. Frontend**
Stačí otevřít `index.html` v prohlížeči.

---