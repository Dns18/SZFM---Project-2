import React from "react";
import "./Navbar.css";

export default function Navbar({ route, setRoute }) {
  const links = [
    { id: "homepage", label: "Kezdőlap" },
    { id: "dashboard", label: "Statisztikák" },
    { id: "courses", label: "Tanfolyamok" },
    { id: "analytics", label: "Elemzések" },
  ];

  return (
    <header className="navbar">
      <div className="logo">FocusFlow</div>
      <nav className="nav-links">
        {links.map((l) => (
          <button
            key={l.id}
            className={`nav-item ${route === l.id ? "active" : ""}`}
            onClick={() => setRoute(l.id)}
          >
            {l.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
