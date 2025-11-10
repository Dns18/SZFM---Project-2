# 📑 FocusFlow – Rendszerterv

## 1. Cél
A **FocusFlow** célja, hogy segítse a felhasználókat a hatékony tanulásban és munkában a **Pomodoro technika** és egy **AI tutor** ötvözésével.  
A rendszer egyszerűen használható webes alkalmazás, amely bármilyen eszközről elérhető.

---

## 2. Rendszerarchitektúra

**Felépítés:**
- **Frontend (React + CSS)** – kliensoldali alkalmazás
- **Backend (opcionális)** – AI integráció, statisztikák tárolása
- **Adattárolás**
  - Böngésző (localStorage / IndexedDB) → alap statisztikák
  - Backend (adatbázis, pl. MongoDB vagy PostgreSQL) → bővített statisztikák, AI kontextus
- **Külső szolgáltatások**
  - OpenAI → AI Tutor válaszok

---

## 3. Fő komponensek

### 🎯 Pomodoro Timer modul
- Beállított időzítők (25/5 perc, később konfigurálható)
- Indítás / szünet / reset funkció
- Hangjelzés vagy értesítés a ciklus végén
- Idő visszaszámlálás animációval

### 🤖 AI Tutor modul
- Chat UI (React komponens, hasonló Messenger/ChatGPT felülethez)
- Kérdés-válasz logika → API hívás AI szolgáltatás felé
- Tantárgy-specifikus kiegészítések (pl. matek, programozás modulok)

### 📊 Statisztikák modul
- Időnapló készítése minden befejezett Pomodoro után
- Napi/heti/havi nézet

### 🌙 Dark/Light mód
- React context alapú téma kezelés
- CSS változók (color scheme)
- Böngésző preferencia felismerése (`prefers-color-scheme`)

### 💻 Web App keretrendszer
- Reszponzív design (CSS Grid / Flexbox)
- Offline mód (PWA – Progressive Web App)

## 4. Fejlesztési és tesztelési terv

- **Fejlesztés:** Scrum módszertan szerint, 2 hetes sprintekkel  
- **Felhasználói tesztek:** UI és UX visszajelzések gyűjtése

## 5. Jövőbeli bővítési lehetőségek

- **Mobilalkalmazás verzió:** React Native alapokon  
- **Több AI-modell integráció:** pl. Claude, Gemini  
- **Tanulási célkitűzések követése:** Goal Tracker  
- **Gamifikációs elemek:** jutalmak, ranglista

## 6. Rendszerstruktúra

<img width="1268" height="1080" alt="struct" src="https://github.com/user-attachments/assets/72678bbc-e7db-4442-8d78-3f3ac8e034e5" />

## 7. Use-Case

<img width="1536" height="1024" alt="UseCase" src="https://github.com/user-attachments/assets/1765c3b4-7147-4087-90cc-5826ebef4a36" />

A fenti Use-Case diagram a FocusFlow alkalmazás fő funkcióit és a felhasználó interakcióit szemlélteti.
A rendszer egyetlen külső szereplője a Felhasználó, aki a webes felületen keresztül használja az alkalmazás szolgáltatásait.

A fő használati esetek a következők:
- **Pomodoro indítása / leállítása:** a felhasználó elindítja, szünetelteti vagy visszaállítja az időzítőt.
- **AI Tutor kérdés küldése:** a felhasználó kérdéseket tesz fel az AI-nak, amely segíti a tanulást vagy munkaszervezést.
- **Statisztika megtekintése:** a felhasználó hozzáfér a napi/heti fókuszidő statisztikákhoz.
- **Téma váltás:** a felhasználó átválthat világos és sötét megjelenési mód között.

A diagram célja, hogy áttekinthetően bemutassa, milyen műveleteket hajthat végre a felhasználó a rendszerrel, és hogyan kapcsolódnak ezek az egyes funkcionális egységekhez.


---

## 8. Rendszer komponensdiagramja:
Az alábbi komponensdiagram szemlélteti a FocusFlow alkalmazás fő React-komponenseinek kapcsolatát és a böngészőben tárolt adatok áramlását.
- **App.jsx** → az alkalmazás központi komponense, ami a `route` állapot alapján váltja az alkomponenseket.  
- **Navbar.jsx** → kapja a route-ot és a setRoute függvényt, így a navigáció kezelése itt történik.  
- **Timer.jsx** és **Chat.jsx** → a főoldalhoz (`homepage`) tartozó komponensek.  
- **Content.jsx** → a többi oldal tartalmát jeleníti meg.  
- **Courses.jsx** → a tanfolyamokat kezeli a `Content`-en belül.  
- **LocalStorage** → központi adattároló (mentett pomodoro sessionök, tanfolyamadatok).

```mermaid
graph TD
    subgraph "FocusFlow Alkalmazás"
        %% Fő komponens, kezeli a 'route' állapotot
        App[<b>App.jsx</b><br><i>state: route</i>]
        
        %% App által közvetlenül renderelt komponensek
        App --> Navbar[<b>Navbar.jsx</b><br><i>props: route, setRoute</i>]
        App -- "ha route == 'homepage'" --> Timer[<b>Timer.jsx</b><br><i>state: time, topic, ...</i>]
        App -- "ha route == 'homepage'" --> Chat[<b>Chat.jsx</b><br><i>state: messages, ...</i>]
        App -- "ha route != 'homepage'" --> Content[<b>Content.jsx</b><br><i>props: route<br>state: sessions</i>]
        
        %% Content által renderelt komponens
        Content -- "ha route == 'courses'" --> Courses[<b>Courses.jsx</b><br><i>state: courses, ...</i>]
    end

    subgraph "Böngésző Adattároló"
        LS[(<b>LocalStorage</b><br>Böngésző API)]
    end

    %% Adatkapcsolatok a LocalStorage-hoz
    Timer -. "<i>írja</i> (sessions, topics)" .-> LS
    Content -. "<i>olvassa</i> (sessions)" .-> LS
    Courses -. "<i>írja/olvassa</i> (courses)" .-> LS
