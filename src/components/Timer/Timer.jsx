// src/components/Timer/Timer.jsx
import { useState, useEffect, useRef } from "react";
import "./Timer.css";

const FOCUS_DURATION = 10; // 25 perc
const BREAK_DURATION = 5 ; // 5 perc
const STORAGE_KEY = "focusflow_sessions_v1";
const TOPICS_KEY = "focusflow_topics_v1";

function saveSessionToStorage(topic, durationSeconds) {
  if (!topic) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push({ topic, timestamp: Date.now(), duration: durationSeconds });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.warn("Saving session failed", e);
  }
}

function loadTopics() {
  try {
    const raw = localStorage.getItem(TOPICS_KEY);
    return raw ? JSON.parse(raw) : ["Matematika", "Történelem", "Fizika", "Programozás", "Nyelvtanulás"];
  } catch (e) {
    console.warn("Load topics failed", e);
    return ["Matematika", "Történelem", "Fizika", "Programozás", "Nyelvtanulás"];
  }
}

function saveTopics(topics) {
  try {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  } catch (e) {
    console.warn("Save topics failed", e);
  }
}

export default function Timer() {
  const [time, setTime] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const [topics, setTopics] = useState(() => loadTopics());
  const [topic, setTopic] = useState(() => {
    const t = loadTopics();
    return t && t.length ? t[0] : "Matematika";
  });
  const [newTopic, setNewTopic] = useState("");

  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sessionStartRef = useRef(null);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const playSound = (opts = {}) => {
    try {
      const ctx = audioCtxRef.current ?? new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const duration = opts.duration ?? 0.12;
      const type = opts.type ?? "sine";
      const volume = opts.volume ?? 0.18;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(opts.freq ?? 880, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  };

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      if (!isBreak && !sessionStartRef.current) sessionStartRef.current = Date.now();
      startInterval();
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const endTimer = () => {
    if (!isBreak && sessionStartRef.current) {
      const elapsedSec = Math.round((Date.now() - sessionStartRef.current) / 1000);
      saveSessionToStorage(topic, elapsedSec > 0 ? elapsedSec : FOCUS_DURATION);
    }
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsBreak(false);
    setTime(FOCUS_DURATION);
    sessionStartRef.current = null;
  };

  // utolsó 5 mp csipogás
  useEffect(() => {
    if (time > 0 && time <= 5) {
      const freq = isBreak ? 600 : 1000;
      playSound({ freq, duration: 0.12, type: "sine", volume: 0.18 });
    }
  }, [time, isBreak]);

  // váltás logika + mentés duration mezővel
  useEffect(() => {
    if (time === 0) {
      playSound({ freq: isBreak ? 660 : 880, duration: 0.18, type: "sine", volume: 0.22 });

      clearInterval(intervalRef.current);
      const wasBreak = isBreak;
      const nextIsBreak = !wasBreak;

      if (!wasBreak && sessionStartRef.current) {
        const elapsedSec = Math.round((Date.now() - sessionStartRef.current) / 1000);
        saveSessionToStorage(topic, elapsedSec > 0 ? elapsedSec : FOCUS_DURATION);
        sessionStartRef.current = null;
      }

      setIsBreak(nextIsBreak);
      const nextDuration = nextIsBreak ? BREAK_DURATION : FOCUS_DURATION;
      setTime(nextDuration);

      if (!nextIsBreak) {
        sessionStartRef.current = Date.now();
      }

      setIsActive(true);
      startInterval();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isBreak, topic]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      if (audioCtxRef.current && typeof audioCtxRef.current.close === "function") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const totalForPercentage = isBreak ? BREAK_DURATION : FOCUS_DURATION;
  const percentage = (time / totalForPercentage) * 100;

  // --- topic kezelő funkciók ---
  const handleAddTopic = () => {
    const trimmed = newTopic.trim();
    if (!trimmed) return;
    if (topics.includes(trimmed)) {
      setNewTopic("");
      setTopic(trimmed);
      return;
    }
    const updated = [...topics, trimmed];
    setTopics(updated);
    saveTopics(updated);
    setTopic(trimmed);
    setNewTopic("");
  };

  const handleRemoveTopic = (t) => {
    const confirmed = window.confirm(`Törlöd a témát: "${t}" ? (a korábbi sessionök megmaradnak)`);
    if (!confirmed) return;
    const updated = topics.filter((x) => x !== t);
    setTopics(updated);
    saveTopics(updated);
    if (topic === t) setTopic(updated[0] || "");
  };

  return (
    <div className="timer-wrapper">
      <h2 className="focus-title">{isBreak ? "BREAK" : "FOCUS SESSIONS"}</h2>

      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <label style={{ color: "#cbd5e1", fontSize: 14 }}>Mit szeretnél tanulni?</label>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: "#0b1220", color: "white" }}
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          onClick={() => topic && handleRemoveTopic(topic)}
          style={{ padding: "6px 8px", borderRadius: 8, background: "#7f1d1d", color: "white", border: "none" }}
          title="Téma törlése"
        >
          Töröl
        </button>
      </div>

      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Új téma hozzáadása"
          style={{ padding: "6px 8px", borderRadius: 8, border: "none", background: "#0b1220", color: "white", flex: 1 }}
        />
        <button
          onClick={handleAddTopic}
          style={{ padding: "6px 10px", borderRadius: 8, background: "#0b7df0", color: "white", border: "none" }}
        >
          Hozzáad
        </button>
      </div>

      <div className="circle-wrapper">
        <svg className="progress-ring" width="260" height="260">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e0ff" />
              <stop offset="100%" stopColor="#c8f560" />
            </linearGradient>
          </defs>

          <circle className="progress-ring__background" cx="130" cy="130" r="115" />
          <circle
            className="progress-ring__circle"
            cx="130"
            cy="130"
            r="115"
            style={{
              strokeDashoffset: `${(2 * Math.PI * 115 * (100 - percentage)) / 100}`,
            }}
          />
        </svg>
        <div className="time-text">{formatTime(time)}</div>
      </div>

      <div className="button-group" style={{ marginTop: 16 }}>
        <button className="btn start" onClick={startTimer} disabled={isActive}>
          Start
        </button>
        <button className="btn pause" onClick={pauseTimer} disabled={!isActive}>
          Szünet
        </button>
        <button className="btn end" onClick={endTimer}>
          Vége
        </button>
      </div>

      <p className="next-break">{isBreak ? `A szünetből vissza: ${formatTime(time)}` : `Következő szünet: 5:00`}</p>
    </div>
  );
}
