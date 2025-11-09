# 🧭 Funkcionális specifikáció – FocusFlow

## 1. Áttekintés

**Projekt neve:** FocusFlow  
**Cél:**  
A FocusFlow egy webes alkalmazás, amely a tanulást és munkát segíti a fókusz megőrzésében.  
A Pomodoro technikát ötvözi egy beépített mesterséges intelligencia alapú tanulási segéddel (AI Tutor), így a felhasználók egyszerre fejleszthetik koncentrációjukat és tanulhatnak hatékonyan.

**Fejlesztési modell:** Scrum  
**Technológiák:**
- **Frontend:** React  
- **Stílus:** CSS  
- **Backend (tervezett):** opcionálisan Node.js / Flask (ha AI vagy statisztika mentés szükséges)  
- **AI:** ChatGPT API / OpenAI API integráció (pl. tutor funkcióhoz)

---

## 🎯 2. Fő funkciók

### 2.1 Pomodoro Timer
**Leírás:**  
A klasszikus Pomodoro technikán alapul: 25 perces fókusz szakaszokat követnek 5 perces szünetek.  
4 ciklus után hosszabb (15-20 perces) szünet következik.

**Funkciók:**
- Fókuszidő és szünetidő beállítása  
- Indítás / szünet / újraindítás gomb  
- Hangjelzés a szakaszok végén  
- Aktuális ciklus és hátralévő idő kijelzése  
- Automatikus váltás a ciklusok között (beállítható)

**Nem funkcionális követelmények:**
- Pontos időkezelés (±1s eltérés max)  
- Egyszerű, zavaró elemektől mentes UI

---

### 2.2 AI Tutor
**Leírás:**  
Egy beépített mesterséges intelligencia alapú segéd, amely segít tanulás közben kérdések megválaszolásában, magyarázatokban vagy összefoglalók készítésében.

**Funkciók:**
- Chat felület az AI-val  
- Szöveges kérdés beírása és válasz megjelenítése  
- Előző beszélgetések törlése / új téma kezdése  
- (Opcionálisan) kontextusos segítség, pl. tantárgy megadása

**Nem funkcionális követelmények:**
- Gyors válaszidő (<5 másodperc)  
- AI válaszok olvashatósága és formázása (pl. kódrészletek, listák)

---

### 2.3 Statisztikák
**Leírás:**  
A felhasználó visszajelzést kap arról, mennyi fókuszidőt töltött a héten vagy hónapban.

**Funkciók:**
- Összes fókuszidő megjelenítése napi/heti/havi bontásban  
- Diagram vagy grafikon (pl. oszlopdiagram)  
- Legutóbbi pomodoro ciklusok listázása  
- (Opcionálisan) célkitűzés: napi 4 pomodoro teljesítése

**Nem funkcionális követelmények:**
- Valós idejű frissítés  
- Adatok helyi tárolása (LocalStorage) vagy felhőben (pl. Firebase)

---

### 2.4 Dark/Light mód
**Leírás:**  
A felhasználó választhat világos vagy sötét megjelenés között.

**Funkciók:**
- Manuális váltás egy gombbal  
- Böngésző alapértelmezett téma felismerése  
- A beállítás mentése (LocalStorage)

**Nem funkcionális követelmények:**
- Színek kontrasztaránya megfelel az akadálymentesítési elveknek (WCAG AA)

---

### 2.5 Web App
**Leírás:**  
A FocusFlow böngészőből elérhető, asztali és mobil nézetre is optimalizált.

**Funkciók:**
- Reszponzív design (mobil, tablet, PC)   
- Offline mód (alap funkciók elérhetőek)

---

## 🧩 3. Felhasználói szerepek

| Szerep | Leírás | Jogosultság |
|--------|--------|--------------|
| **Vendég felhasználó** | Belépés nélkül használja az appot | Timer, Dark/Light mód, AI chat |
| **Regisztrált felhasználó (opcionális)** | Saját statisztikák mentése | Statisztika mentés, célok, beállítások |

---

## 💡 4. Felhasználói felület (UI) vázlat

**Fő oldal:**
- Jobb oldalt: Pomodoro óra (start/pause/reset gomb)  
- Bal oldalt: AI Tutor chatpanel  
- Felső menü: Home | Statisztikák | Beállítások | Dark/Light toggle  

**Statisztika oldal:**
- Grafikonok  
- Fókuszidő összesen  
- Célok teljesítése  

**Beállítások oldal:**
- Pomodoro hossz beállítása  
- Dark/Light mód  
- Adatok törlése

---

## ⚙️ 5. Nem funkcionális követelmények

| Kategória | Követelmény |
|------------|-------------|
| **Teljesítmény** | Az alkalmazás 3 másodpercen belül betölt |
| **Biztonság** | Adatvédelmi szabályok betartása (GDPR kompatibilitás) |
| **Használhatóság** | Egyszerű, intuitív UI, figyelemelterelő elemek nélkül |
| **Karbantarthatóság** | Kód moduláris szerkezetben, React komponensekre bontva |
| **Kompatibilitás** | Minden modern böngésző (Chrome, Firefox, Edge) támogatott |

---

## 🏗️ 6. Rendszerarchitektúra

### 6.1 Felhasználói felület (Frontend – React)
- Megjeleníti az időzítőt, a statisztikákat és az AI chatet.  
- Kezeli a felhasználói interakciókat.  
- Kommunikál a backenddel REST API-n keresztül.  
- Tárolja a helyi adatokat (LocalStorage).

### 6.2 Backend (Node.js / Flask)
- API endpointok a statisztikákhoz, felhasználói adatokhoz.
- AI modul integráció (OpenAI API hívások kezelése).

### 6.3 Adatkezelés
- Lokálisan (LocalStorage) vagy felhőben (Firebase).
- Mentett adatok: fókuszidők, beállítások, célkitűzések.
  
---

## 🧠 7. Jövőbeli bővítési lehetőségek

- Fiókrendszer és felhő alapú mentés  
- Gamifikáció (jutalmak, rangok)  
- Hangvezérlés  
- AI Tutor bővítése tantárgy-specifikus módokra (pl. matek, programozás)  
- Emlékeztetők és értesítések
