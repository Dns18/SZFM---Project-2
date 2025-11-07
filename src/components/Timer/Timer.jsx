import { useState, useEffect, useRef } from "react";
import "./Timer.css";

const FOCUS_DURATION = 25*60; // 25 perc
const BREAK_DURATION = 5*60;  // 5 perc

export default function Timer() {
  const [time, setTime] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const endTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsBreak(false);
    setTime(FOCUS_DURATION);
  };

  // Váltás logika: ha lejárt az idő, automatikusan váltunk és elindítjuk az új időzítőt
  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalRef.current);
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      const nextDuration = nextIsBreak ? BREAK_DURATION : FOCUS_DURATION;
      setTime(nextDuration);
      // automatikusan elindítjuk az új ciklust
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isBreak]);

  // tisztítás komponens unmount esetén
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const totalForPercentage = isBreak ? BREAK_DURATION : FOCUS_DURATION;
  const percentage = (time / totalForPercentage) * 100;

  return (
    <div className="timer-wrapper">
      <h2 className="focus-title">{isBreak ? "BREAK" : "FOCUS SESSIONS"}</h2>

      <div className="circle-wrapper">
        <svg className="progress-ring" width="260" height="260">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e0ff" />
              <stop offset="100%" stopColor="#c8f560" />
            </linearGradient>
          </defs>

          <circle
            className="progress-ring__background"
            cx="130"
            cy="130"
            r="115"
          />
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

      <div className="button-group">
        <button
          className="btn start"
          onClick={startTimer}
          disabled={isActive}
        >
          Start
        </button>
        <button
          className="btn pause"
          onClick={pauseTimer}
          disabled={!isActive}
        >
          Pause
        </button>
        <button className="btn end" onClick={endTimer}>
          End
        </button>
      </div>

      <p className="next-break">
        {isBreak ? `Break time left: ${formatTime(time)}` : `Next Break: 5:00`}
      </p>
    </div>
  );
}
