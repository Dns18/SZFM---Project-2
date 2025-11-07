import React from "react";

export default function Content({ route }) {
  switch (route) {
        case "homepage":
      return (
        <section>
          <h1>Home Page</h1>
          <p>Home Page</p>
        </section>
      );
    case "dashboard":
      return (
        <section>
          <h1>Dashboard</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel lorem ac sapien viverra mattis. Nulla facilisi. Donec at pharetra lacus. Curabitur tempus felis non massa luctus, sit amet tristique lorem fringilla. Integer elementum, eros ac facilisis hendrerit, justo ipsum porta odio, sed suscipit mauris dolor nec nulla. Suspendisse potenti. 
</p>
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
