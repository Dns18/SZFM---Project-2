import { useState, useEffect, useRef } from "react";
import "./Timer.css";

export default function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
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
    setTime(25 * 60);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const percentage = (time / (25 * 60)) * 100;

  return (
    <div className="timer-wrapper">
      <h2 className="focus-title">FOCUS SESSIONS</h2>

      <div className="circle-wrapper">
        <svg className="progress-ring" width="260" height="260">
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
        <button className="btn start" onClick={startTimer}>
          Start
        </button>
        <button className="btn pause" onClick={pauseTimer}>
          Pause
        </button>
        <button className="btn end" onClick={endTimer}>
          End
        </button>
      </div>

      <p className="next-break">Next Break: 5:00</p>
    </div>
  );
}
