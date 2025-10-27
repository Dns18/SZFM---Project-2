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

## 4. Rendszerstruktúra

<img width="1268" height="1080" alt="struct" src="https://github.com/user-attachments/assets/72678bbc-e7db-4442-8d78-3f3ac8e034e5" />
