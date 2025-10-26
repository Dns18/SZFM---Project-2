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
          <h1>Rólunk</h1>
          <p>Rólunk</p>
        </section>
      );
    case "analytics":
      return (
        <section>
          <h1>Szolgáltatások</h1>
          <p>Szolgáltatások</p>
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
