# Pololetni_prace_Bulls_and_Cows
 
 [Bulls & Cows_Cíle](https://www.remnote.com/a/Seznam-projektu/67a09c942d1d3b8343d49e4b)

Cíl projektu
Vytvořit interaktivní webovou hru Bulls & Cows, kde hráč hádá náhodné čtyřmístné číslo, které si počítač tajně vygeneruje. Po každém pokusu systém poskytne zpětnou vazbu o počtu správných číslic na správném místě (Bulls) a správných číslic na nesprávném místě (Cows). Hra musí být interaktivní, vizuálně přehledná a obsahovat statistiky hráče.
Funkční požadavky

## 1. Generování tajného čísla
Po spuštění hry si počítač náhodně vygeneruje čtyřmístné číslo.
Číslice se nemohou opakovat (např. 1234 je platné, 1123 není).

## 2. Zadávání hádaného čísla
Hráč zadá svůj tip (čtyřmístné číslo) do vstupního pole.
Po potvrzení se zobrazí výsledek:
Bulls (🟢) – správná číslice na správném místě.
Cows (🟡) – správná číslice, ale na špatném místě.
Například:
Tajné číslo: 4271
Hádání hráče: 1234
Výsledek: 🟢1 (správná číslice na správném místě – 4), 🟡2 (číslice 2 a 1 jsou správné, ale na špatném místě).

## 3. Omezení vstupů a validace
Hráč může zadat pouze čtyřmístné číslo.
Duplicitní číslice nejsou povoleny.
Číslo nesmí začínat 0. 
Při neplatném vstupu se zobrazí chybová zpráva.

## 4. Počítání pokusů a vítězství
Po každém pokusu se počet tahů zvýší.
Pokud hráč uhodne celé číslo, hra zobrazí vítěznou zprávu a nabídne možnost nové hry.

## 5. Historie pokusů
Zobrazení historie všech tipů a jejich výsledků (např. tabulka s tipem hráče, počtem Bulls & Cows).
Bonusové požadavky
Ukládání nejlepších výsledků
Ukládání nejlepších her (nejmenší počet tahů) do LocalStorage.
Možnost nastavení délky čísla
Hráč si může vybrat délku tajného čísla (např. 3, 4, 5 číslic).
Tematický vzhled (Dark/Light Mode)
Možnost přepnutí světlého/tmavého režimu, uložené do LocalStorage.
Animace a UX prvky
Zvýraznění správných/špatných číslic ve výsledcích.
Možnost vizuální reprezentace výsledků (např. barevné kódy místo textu).
Režim proti AI
Počítač se pokouší hádat hráčovo číslo, hráč dává zpětnou vazbu počítači (Bulls & Cows).
Technické požadavky
HTML, CSS a JavaScript (bez jQuery).
Generování čtyřmístného čísla bez duplicitních číslic.
Práce s event listenery pro interaktivní ovládání.
Validace vstupů a chybové zprávy pro nesprávné vstupy.
LocalStorage pro ukládání nejlepších výsledků a nastavení.
Responzivní design – správné zobrazení na desktopu i mobilu.
Očekávané hodnocení

## Kritérium
Body
Poznámka
HTML – správná struktura
10
Přehledné herní prvky
CSS – vizuální styl, UX prvky
15
Animace, přehledné UI
JavaScript – základní funkčnost
20
Herní logika, porovnávání tipů
Validace vstupů a omezení
15
Kontrola čísel a duplicitních číslic
Ukládání skóre do LocalStorage
10
Nejlepší výsledky se ukládají a zobrazují
Možnost změny délky čísla
10
Dynamická změna pravidel hry
Organizace a čistota kódu
10
Strukturovaný kód, komentáře
Bonusové funkce
10
Dark mode, animace, hra proti AI