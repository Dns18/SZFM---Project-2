import React from "react";
import "./Sidebar.css";

export default function Sidebar({ route, setRoute }) {
  const links = [
    { id: "homepage", label: "Home page" },
    { id: "dashboard", label: "Dashboard" },
    { id: "courses", label: "Courses" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <nav className="sidebar" aria-label="Oldalsó navigáció">
      <div className="brand">FocusFlow</div>

      <ul className="nav-list">
        {links.map((l) => (
          <li
            key={l.id}
            className={`nav-item ${route === l.id ? "active" : ""}`}
            onClick={() => setRoute(l.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setRoute(l.id)}
          >
            {l.label}
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">© {new Date().getFullYear()}</div>
    </nav>
  );
}
