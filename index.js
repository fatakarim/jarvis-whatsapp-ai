const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { GoogleGenAI } = require('@google/genai');
const qrcode = require('qrcode-terminal');
const pino = require('pino');

// Load Gemini API Key from environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Configurable fallback coordinates (defaults to Purbalingga city center)
const DEFAULT_LAT = parseFloat(process.env.BOT_LAT || '-7.3881');
const DEFAULT_LNG = parseFloat(process.env.BOT_LNG || '109.3639');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'fatal' })
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, qr } = update;

        if (qr) {
            console.log('\n=== SCAN QR CODE BELOW WITH WHATSAPP ===\n');
            qrcode.generate(qr, { small: true });
            console.log('\n========================================\n');
        }

        if (connection === 'close') {
            console.log('[JARVIS] Connection closed, reconnecting...');
            startBot();
        } else if (connection === 'open') {
            console.log('[JARVIS] Core System Active & Connected to Gemini AI Brain!');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const textMessage = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const senderJid = msg.key.remoteJid;

        // Ignore group chats by default for privacy
        if (senderJid.endsWith('@g.us')) return;

        console.log(`[CHAT IN] ${textMessage}`);

        async function simulateTyping() {
            await sock.sendPresenceUpdate('composing', senderJid);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        if (textMessage.toLowerCase() === '!lokasi') {
            await simulateTyping();
            await sock.sendMessage(senderJid, { text: 'Memetakan radar... Mengirimkan titik koordinat area:' });
            await sock.sendMessage(senderJid, {
                location: { degreesLatitude: DEFAULT_LAT, degreesLongitude: DEFAULT_LNG }
            });
            return;
        }

        try {
            await simulateTyping();

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: textMessage,
                config: {
                    systemInstruction:
                        'Nama kamu adalah JARVIS, asisten pintar buatan Fata Fatikhul Karim. ' +
                        'Tugasmu adalah membalas pesan WhatsApp ketika Fata sedang fokus kuliah, mengoding, atau riset keamanan siber. ' +
                        'Gunakan gaya bahasa asisten digital yang sopan, cerdas, ramah, dan ringkas. ' +
                        'Jika ada yang meminta lokasi, arahkan mereka mengetik perintah "!lokasi".'
                }
            });

            await sock.sendMessage(senderJid, { text: response.text }, { quoted: msg });
        } catch (error) {
            console.error('[JARVIS ERROR] Failed to generate AI response:', error.message);
            await sock.sendMessage(senderJid, {
                text: 'Maaf, sistem AI JARVIS sedang mengalami gangguan koneksi sementara.'
            });
        }
    });
}

startBot();
