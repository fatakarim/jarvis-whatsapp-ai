# 🤖 JARVIS — Gemini AI WhatsApp Personal Assistant

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![CI](https://github.com/fatakarim/jarvis-whatsapp-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/fatakarim/jarvis-whatsapp-ai/actions)
[![Google Gemini](https://img.shields.io/badge/Model-Gemini_2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![Baileys](https://img.shields.io/badge/WhatsApp-Baileys_Multi--Device-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://github.com/WhiskeySockets/Baileys)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](LICENSE)

**JARVIS** adalah asisten pribadi WhatsApp otomatis berbasis **Node.js** yang menggabungkan protokol WebSocket multi-device (`@whiskeysockets/baileys`) dengan kecerdasan **Google Gemini 2.5 Flash** (`@google/genai`). Dirancang untuk merespons pesan masuk secara kontekstual saat pemilik sedang fokus mengoding atau melakukan riset keamanan.

---

## ✨ Fitur Utama
- **Multi-File Auth State:** Sesi login tersimpan secara persisten tanpa perlu scan QR berulang kali.
- **Natural Typing Simulation:** Menyimulasikan status *typing (`composing`)* sebelum mengirim balasan agar interaksi terasa alami.
- **Private Chat Filter:** Mengabaikan pesan grup (`@g.us`) secara otomatis untuk menjaga privasi dan kuota API.
- **Custom Command Handler:** Mendukung perintah khusus seperti `!lokasi` di samping percakapan berbasis AI.

## 🚀 Cara Menjalankan

```bash
git clone https://github.com/fatakarim/jarvis-whatsapp-ai.git
cd jarvis-whatsapp-ai
npm install
export GEMINI_API_KEY="AIzaSyYourGeminiKeyHere"
npm start
```

Scan kode QR yang muncul di terminal menggunakan WhatsApp (**Perangkat Tertaut / Linked Devices**).

---

## 👨‍💻 Author
**Fata Fatikhul Karim**
- 🌐 Portfolio: [https://fatakarim.github.io](https://fatakarim.github.io)
- 💼 LinkedIn: [linkedin.com/in/fata-fatikhul-karim](https://www.linkedin.com/in/fata-fatikhul-karim)
- 🛡️ HackerOne: [@zeonmaltius](https://hackerone.com/zeonmaltius)
