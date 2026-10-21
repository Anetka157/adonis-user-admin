# Dokumentace a hodnocení: AdonisJS v6

## 1. Dojmy z práce v AdonisJS
Spouštět celý projekt přes WSL, protože to odmítalo fungovat klasicky pod Windows, bylo ze začátku docela matoucí, ale celkově to šlo docela v pohodě.

Osobně mi navíc AdonisJS nepřijde o moc jiný oproti Laravelu – z mého pohledu v tom nevidím nějaký moc velký rozdíl, protože koncepce a struktura jsou si hodně blízké.

---

## 2. Pro a proti (Pros & Cons)

### Výhody
- **Bezpečnost v základu:** Ochrana proti CSRF, XSS, SQL injection a bezpečné hashování hesel jsou součástí jádra.
- **Skvělá dokumentace:** Oficiální návody jsou moderní, velmi podrobné a aktuální.
- **Lucid ORM:** Výkonná databázová vrstva s velmi přívětivou syntaxí.

### Nevýhody
- **Přísná struktura a pravidla:** Framework vyžaduje dodržování přesných konvencí, což může být ze začátku trochu svazující.

---

## 3. Porovnání AdonisJS a Laravelu

Když to srovnám s Laravelem, tak z uživatelského hlediska při psaní kódu jsem se cítila v podstatě skoro stejně jako v Laravelu. Koncepty jsou skoro totožné – trasy (routes), kontrolery, ORM pro databázi i šablonovací systém pracují na velmi podobném principu.

Hlavní rozdíl, který člověk při práci vnímá, je ten, že zatímco v Laravelu se píše v PHP, AdonisJS běží na Node.js a píše se v TypeScriptu. Díky TypeScriptu nám editor sám lépe napovídá chyby už během psaní. Pokud má ale člověk zkušenost s Laravelem, přechod na AdonisJS pro něj nebude žádný velký šok, protože celková filozofie obou frameworků je téměř stejná.

---

## 4. Srovnání kódů AdonisJS a Laravelu

Při přímém srovnání logiky psaní kódu je vidět, že obě technologie vycházejí ze stejných konceptů, ale v detailu pracují odlišně kvůli rozdílným jazykům a architekturám.

### Routy (Směrování)
* **Princip:** V obou frameworkách se trasy definují na jednom centrálním místě (v AdonisJS v `start/routes.ts`, v Laravelu v `routes/web.php`). V obou případech můžeme trasám nastavovat HTTP metody (GET, POST), mapovat je na konkrétní metody kontrolerů a dávat jim vlastní pojmenování pro snadný redirect.
* **Rozdíl:** V AdonisJS se využívají asynchronní importy kontrolerů, což šetří paměť při spouštění aplikace, a díky TypeScriptu jsou názvy metod i tras kontrolovány na úrovni editoru.

### Kontrolery (Controller)
* **Princip:** Kontrolery v obou systémech slouží jako propojovací článek mezi databází a uživatelským rozhraním. Přijímají data z formulářů, zpracovávají logiku a vrací odpověď (redirect nebo vykreslení šablony).
* **Rozdíl:** V Laravelu přijímá metoda kontroleru objekt `Request` přímým vstříknutím do parametrů. V AdonisJS metoda dostává jediný objekt – `HttpContext` – ze kterého si jednoduše vytáhneme jak `request` pro čtení dat, tak `response` pro směrování. Navíc metody v AdonisJS musí být definované jako asynchronní (`async`).

### ORM a vytvoření záznamu v databázi
* **Princip:** Pro práci s databází využívají oba frameworky vzor Active Record – Laravel má své **Eloquent ORM** a AdonisJS používá **Lucid ORM**. Vytvoření nového záznamu probíhá v podstatě stejně: načtou se požadovaná data z požadavku a předají se statické metodě `create()` daného modelu.
* **Rozdíl:** Zásadní rozdíl spočívá v asynchronním chování. V AdonisJS musíme před každou databázovou operací (jako je `User.create()` nebo `User.all()`) uvádět klíčové slovo `await`, protože Node.js neblokuje vlákno a čeká na dokončení dotazu asynchronně. V Laravelu probíhá volání v PHP synchronně bez nutnosti specifikovat `await`.

---
