/* ChatGPT integráció backend (Express.js) – OpenAI SDK használatával

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI kliens
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Teszt route – böngészőben ellenőrzéshez
app.get("/", (req, res) => {
  res.send("Backend fut a 4000-es porton ✅");
});

// CHAT ENDPOINT – most már OpenAI-jal
app.post("/api/chat", async (req, res) => {
  console.log("KAPTAM A FRONTENDTŐL:", req.body);

  const userMessage = req.body?.message || "";

  if (!userMessage) {
    return res.json({
      reply: "Nem kaptam üzenetet a kérésben.",
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Te egy barátságos magyar AI tutor vagy, aki röviden, érthetően magyaráz.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Üres válasz érkezett a modeltől. 😅";

    console.log("OPENAI VÁLASZ:", reply);

    return res.json({ reply });
  } catch (err) {
    console.error("OPENAI HIBA:", err?.response?.data || err.message);

    // FONTOS: mindig küldünk reply-t, még hibánál is
    return res.json({
      reply: "⚠️ Hiba történt a ChatGPT hívás közben. (Részletek a szerver logban.)",
    });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend fut: http://localhost:${PORT}`);
});
*/
/* Groq SDK */
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// GROQ kliens
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Teszt route
app.get("/", (req, res) => {
  res.send("Groq backend fut a 4000-es porton ✅");
});

// Chat endpoint (AI válasz)
app.post("/api/chat", async (req, res) => {
  console.log("KAPTAM A FRONTENDTŐL:", req.body);

  const userMessage = req.body?.message || "";

  if (!userMessage) {
    return res.json({
      reply: "Nem kaptam üzenetet a kérésben.",
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "Te egy barátságos és érthető magyar AI tutor vagy, mindig segítőkész vagy, de mindig vissza tereled a témát a tanulásra.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Üres válasz érkezett a Groq modelltől.";

    console.log("GROQ VÁLASZ:", reply);

    return res.json({ reply });
  } catch (err) {
    console.error("GROQ API HIBA:", err.message);

    return res.json({
      reply:
        "⚠️ Hiba történt a Groq AI hívás közben. (Részletek a szerver konzolon.)",
    });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend fut: http://localhost:${PORT}`);
});
