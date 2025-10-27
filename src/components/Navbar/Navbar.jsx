import React from "react";
import "./Navbar.css";

export default function Navbar({ route, setRoute }) {
  const links = [
    { id: "homepage", label: "Home" },
    { id: "dashboard", label: "Dashboard" },
    { id: "courses", label: "Courses" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <header className="navbar">
      <div className="logo">FocusFlow</div>
      <nav className="nav-links">
        {links.map((link) => (
          <span
            key={link.id}
            className={`nav-item ${route === link.id ? "active" : ""}`}
            onClick={() => setRoute(link.id)}
          >
            {link.label}
          </span>
        ))}
      </nav>
    </header>
  );
}
