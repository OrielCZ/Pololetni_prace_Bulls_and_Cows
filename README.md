# Bulls & Cows

Webová implementace tradiční logické hry Bulls & Cows (v ČR známé také jako "Býci a krávy").

## Popis projektu

Bulls & Cows je jednoduchá logická hra, ve které hráč hádá tajné číslo. Po každém pokusu dostane zpětnou vazbu:
- 🟢 Bulls (býci) - správná číslice na správném místě
- 🟡 Cows (krávy) - správná číslice na špatném místě

Cílem je uhodnout celé číslo s co nejmenším počtem pokusů.

## Technologie

### Frontend
- HTML5, CSS3, JavaScript
- Responsivní design
- Light/Dark mode

### Backend
- [Bun](https://bun.sh/) - JavaScript runtime
- [Elysia](https://elysiajs.com/) - Lightweight web framework
- SQLite - Embedded databáze pro ukládání skóre

## Funkce

- Možnost nastavení délky hádaného čísla (3-5 číslic)
- Uživatelsky přívětivé rozhraní s historií pokusů
- Žebříček nejlepších hráčů
- Persistence dat mezi herními sezeními
- Přepínání mezi světlým a tmavým režimem
- Ověřování platnosti vstupů (unikátní číslice)

## 📋 Prerekvizity

- [Bun](https://bun.sh/) (verze 1.0.0 nebo novější)

## 🔧 Instalace

1. Naklonujte repozitář:
   ```bash
   git clone https://github.com/vas-username/bulls-and-cows.git
   cd bulls-and-cows
   ```

2. Nainstalujte závislosti:
   ```bash
   bun install
   ```

3. Spusťte aplikaci:
   ```bash
   bun run index.ts
   ```

4. Otevřete aplikaci v prohlížeči:
   ```
   http://localhost:3000
   ```

## Struktura projektu

```
bulls-and-cows/
├── index.ts                # Hlavní soubor serveru
├── scores.db               # SQLite databáze skóre (automaticky vytvořena)
├── public/                 # Veřejně dostupné soubory
│   ├── index.html          # Hlavní HTML soubor
│   ├── style.css           # Styly
│   ├── script.js           # Herní logika
│   ├── UI.js               # UI komponenty a interakce
│   └── images/             # Obrázky a ikony
└── README.md               # Dokumentace projektu
```

## API Endpointy

| Cesta | Metoda | Popis | Parametry |
|-------|--------|-------|-----------|
| `/api/new-game` | GET | Vytvoří novou hru | - |
| `/api/game/:id/submit` | POST | Zpracuje pokus o uhádnutí | `code`: hádané číslo |
| `/api/submit-score` | POST | Uloží skóre hráče | `player_name`: jméno hráče, `attempts`: počet pokusů |
| `/api/leaderboard` | GET | Vrátí žebříček nejlepších hráčů | - |

## Autoři

- **Ondřej Zach** - Frontend (HTML, CSS, JavaScript)
- **Jiří Theodor Smítka** - Backend (API, databáze)

## Budoucí vylepšení

- [ ] Přidání možnosti více obtížností hry
- [ ] Implementace online multiplayer módu
- [ ] Statistiky hráče (průměrný počet pokusů, nejlepší výsledek, atd.)
- [ ] Podpora pro více jazyků