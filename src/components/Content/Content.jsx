import React from "react";

export default function Content({ route }) {
  switch (route) {
    case "dashboard":
      return (
        <section>
          <h1>Dashboard</h1>
          <p>Dashboard</p>
        </section>
      );
    case "courses":
      return (
        <section>
          <h1>Courses</h1>
          <p>Courses</p>
        </section>
      );
    case "analytics":
      return (
        <section>
          <h1>Analytics</h1>
          <p>Analytics</p>
        </section>
      );
    default:
      return (
        <section>
          <h1>Ismeretlen</h1>
        </section>
      );
  }
}
