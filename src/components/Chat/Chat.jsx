import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Szia! Miben segíthetek ma?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userText = input;
    setInput("");

    // user üzenet hozzáadása
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Nem érkezett érvényes válasz a szervertől." },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Hiba történt a szerverrel való kommunikáció közben." },
      ]);
    }

    setLoading(false);
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

        {loading && (
          <div className="chat-message ai">
            Gondolkodom...
          </div>
        )}
      </div>

      <div className="chat-input-group">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Kérdezz bármit..."
        />
        <button className="send-btn" onClick={handleSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}