import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import "./App.css";

export default function App() {
  const [route, setRoute] = useState("home");

  return (
    <div className="app">
      <Sidebar route={route} setRoute={setRoute} />
      <main className="main">
        <Content route={route} />
      </main>
    </div>
  );
}
