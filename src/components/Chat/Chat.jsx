// src/components/Chat/Chat.jsx
import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Chat({ topic }) {
  const [messages, setMessages] = useState([{ sender: "ai", text: "Szia! Miben segíthetek ma?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages, loading]);

  const pushMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Használt topic: prop elsődleges, localStorage fallback
    const usedTopic = (topic && topic.trim()) ? topic : (localStorage.getItem("selectedTopic") || "").trim();

    if (!usedTopic) {
      pushMessage({ sender: "ai", text: "Kérlek, előbb válaszd ki, mit szeretnél tanulni (Mit szeretnél tanulni?)." });
      setInput("");
      return;
    }

    const userText = trimmed;
    setInput("");
    pushMessage({ sender: "user", text: userText });
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: usedTopic, message: userText }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data?.reply) pushMessage({ sender: "ai", text: data.reply });
      else pushMessage({ sender: "ai", text: "Nem érkezett érvényes válasz a szervertől." });
    } catch (err) {
      console.error("Chat hiba:", err);
      pushMessage({ sender: "ai", text: "⚠️ Hiba történt a szerverrel való kommunikáció közben. Próbáld újra később." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-wrapper">
      <h3 className="chat-title">AI TUTOR</h3>

      <div className="chat-box" ref={boxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.sender}`}>
            {m.text}
          </div>
        ))}

        {loading && <div className="chat-message ai">Gondolkodom...</div>}
      </div>

      <div className="chat-input-group">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={topic ? "Kérdezz a kiválasztott témáról..." : "Előbb válaszd ki a témát..."}
        />
        <button className="send-btn" onClick={handleSend} disabled={loading} title={topic ? "Küldés" : "Válassz témát előbb"}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
