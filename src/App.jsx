import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/Content/Content";
import Timer from "./components/Timer/Timer";
import "./App.css";

export default function App() {
  const [route, setRoute] = useState("homepage");

  return (
    <div className="app">
      <Navbar route={route} setRoute={setRoute} />
      <div className="main-layout">
        <div className="ai-tutor-panel">{/* AI Tutor később ide jön */}</div>
      <div className="timer-panel">
        {route === "homepage" && <Timer />}
      </div>
</div>

    </div>
  );
}
