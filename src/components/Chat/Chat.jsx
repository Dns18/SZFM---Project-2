import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Szia! Miben segíthetek ma?" },
  ]);
  const [input, setInput] = useState("");
  const boxRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Érdekes! Nézzük meg együtt..." },
      ]);
    }, 700);
  };

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <h3 className="chat-title">AI TUTOR</h3>

      <div className="chat-box" ref={boxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Írj egy üzenetet..."
        />
        <button className="send-btn" onClick={handleSend} ><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
    </div>
  );
}
