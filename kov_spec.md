# 🧾 FocusFlow – Követelményspecifikáció

## 1. Bevezetés

### 1.1. A rendszer célja  
A **FocusFlow** egy webes alkalmazás, amely segíti a felhasználókat a hatékony tanulásban és munkában a **Pomodoro technika** alkalmazásával.  
Az alkalmazás egy **AI tutor** funkciót is tartalmaz, amely tanulási segédként válaszol a felhasználó kérdéseire.  
Célja, hogy javítsa a fókuszt, növelje a produktivitást és személyre szabott támogatást nyújtson a tanulás során.

### 1.2. Felhasználói kör  
- **Diákok**, akik tanulmányaikhoz szeretnének koncentráltabban készülni.  
- **Szabadúszók** és **irodai dolgozók**, akik szeretnék optimalizálni a munkaidejüket.  
- **Bárki**, aki hatékonyabb időmenedzsmentet és fókuszt szeretne elérni.

### 1.3. Rendszer határai  
A rendszer kizárólag **webes környezetben**, böngészőből érhető el.  
Nem igényel telepítést. Az AI funkciók internetkapcsolathoz kötöttek.  
Az alkalmazás nem tárol bizalmas adatokat, csak felhasználói statisztikákat és beállításokat.

---

## 2. Funkcionális követelmények

| Azonosító | Funkció neve | Leírás |
|------------|---------------|--------|
| F1 | **Pomodoro Timer** | A felhasználó elindíthatja, szüneteltetheti és újraindíthatja a Pomodoro időzítőt. Az időzítő 25 perces munkaszakaszokat és 5 perces szüneteket váltogat. |
| F2 | **Egyéni beállítások** | A felhasználó módosíthatja a fókusz- és szünetidők hosszát. |
| F3 | **AI Tutor Chat** | A felhasználó kérdéseket tehet fel az AI tutornak tanulással vagy produktivitással kapcsolatban. |
| F4 | **Statisztikák megjelenítése** | Az alkalmazás naplózza és megjeleníti a felhasználó napi/heti fókuszidejét. |
| F5 | **Dark/Light mód** | A felhasználó átválthat világos és sötét megjelenés között. |
| F6 | **Adatmentés a böngészőben** | A beállítások és statisztikák a böngésző helyi tárhelyén (LocalStorage) kerülnek mentésre. |

---

## 3. Nem funkcionális követelmények

| Típus | Leírás |
|-------|--------|
| Teljesítmény | Az alkalmazás reszponzív, és 2 másodpercen belül betöltődik átlagos internetkapcsolat mellett. |
| Használhatóság | Egyszerű, letisztult felhasználói felület, intuitív navigáció. |
| Megbízhatóság | A timer és statisztikai adatok pontos működése garantált. |
| Kompatibilitás | Az alkalmazás működik Chrome, Firefox és Edge böngészőkben. |
| Biztonság | A felhasználói adatok csak lokálisan kerülnek tárolásra, külső szerverre nem kerülnek feltöltésre. |
| Karbantarthatóság | A kód moduláris, React komponensekre épül, így könnyen fejleszthető és bővíthető. |

---

## 4. Technológiai követelmények

| Elem | Technológia |
|------|--------------|
| Frontend | React.js |
| Stílus | CSS |
| Build Tool | Vite |
| Adattárolás | LocalStorage |
| AI funkció | OpenAI API integráció |
| Verziókezelés | Git + GitHub |
| Fejlesztői környezet | Visual Studio Code |

---

## 5. Felhasználói felület (vázlatosan)

**Főoldal:**
- Pomodoro időzítő (Start / Pause / Reset gombok)
- Fókusz és szünet visszaszámláló
- AI Tutor chat ablak
- Statisztikai összesítő (napi fókuszidő)
- Dark/Light mód váltó gomb

---

## 6. Jövőbeli bővítési lehetőségek
- Felhasználói fiókok és szinkronizáció több eszköz között  
- Részletes statisztikák és grafikonok  
- Gamifikáció (jutalmak a fókuszidőért)  
- Chrome bővítmény verzió, ami blokkolja a zavaró weboldalakat

---

## 7. Elfogadási kritériumok
- A timer helyesen váltja a fókusz és szünet ciklusokat  
- Az AI tutor válaszol a beírt kérdésekre  
- A statisztikák pontosan frissülnek  
- A dark/light mód azonnal alkalmazza a stílust  
- Az adatok megmaradnak az oldal újratöltése után  
