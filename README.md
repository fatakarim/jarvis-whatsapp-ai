# 🤖 JARVIS — Personal WhatsApp AI Triage Assistant Prototype

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![CI](https://github.com/fatakarim/jarvis-whatsapp-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/fatakarim/jarvis-whatsapp-ai/actions)
[![Google Gemini](https://img.shields.io/badge/Model-Gemini_2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![Baileys](https://img.shields.io/badge/WhatsApp-Baileys_Multi--Device-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://github.com/WhiskeySockets/Baileys)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](LICENSE)

**JARVIS** is an experimental, personal-use event-driven **Node.js** WhatsApp triage assistant combining the multi-device WebSocket protocol (`@whiskeysockets/baileys`) with **Google Gemini 2.5 Flash** (`@google/genai`). Built to handle incoming 1:1 personal messages in isolated local/Termux environments while studying or conducting application security research.

---

## ✨ Engineering Mechanics & Safety Guardrails
- **Strict Group & Broadcast Triage Filter (`filter.js`):** Automatically drops group broadcasts (`@g.us`), status updates (`status@broadcast`), and self-originated messages before reaching the LLM handler—verified by automated unit tests (`test/filter.test.js`) to guarantee **0 LLM API calls on group traffic**.
- **Deterministic Typing Presence Cadence:** Dispatches a 2,000ms `composing` presence update (`sendPresenceUpdate('composing')`) prior to sending `gemini-2.5-flash` responses.
- **Environment-Isolated Secret Hygiene:** Enforces fail-fast startup validation requiring `process.env.GEMINI_API_KEY` (with session artifacts excluded via `.gitignore`).
- **Multi-File Session Persistence:** Persists linked-device credentials via `useMultiFileAuthState` to avoid repeated QR pairing.

## 🚀 Installation & Running Tests

```bash
git clone https://github.com/fatakarim/jarvis-whatsapp-ai.git
cd jarvis-whatsapp-ai

# Run automated triage filter unit tests (zero external network required)
node --test test/filter.test.js

# Install dependencies and start the assistant
npm install
export GEMINI_API_KEY="your_gemini_api_key_here"
npm start
```

Scan the terminal QR code via WhatsApp (**Linked Devices**).

---

## 👨‍💻 Author
**Fata Fatikhul Karim**
- 🌐 Portfolio: [https://fatakarim.github.io](https://fatakarim.github.io)
- 💼 LinkedIn: [linkedin.com/in/fata-fatikhul-karim](https://www.linkedin.com/in/fata-fatikhul-karim)
- 🛡️ HackerOne: [@zeonmaltius](https://hackerone.com/zeonmaltius)
