import React, { useState } from "react";
import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Szia! Miben segíthetek ma?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Érdekes! Nézzük meg együtt..." },
      ]);
    }, 800);
  };

  return (
    <div className="chat-wrapper">
      <h2 className="chat-title">AI TUTOR</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Írj egy üzenetet..."
        />
        <button onClick={handleSend}>Küldés</button>
      </div>
    </div>
  );
}
