/**
 * Pure message triage filter for JARVIS WhatsApp Assistant.
 * Ensures group broadcasts (@g.us), status updates (status@broadcast),
 * and self-originated messages never trigger LLM API calls.
 */
function shouldProcessIncomingMessage(msg) {
  if (!msg || !msg.message || (msg.key && msg.key.fromMe)) return false;
  const senderJid = (msg.key && msg.key.remoteJid) || '';
  if (!senderJid || senderJid.endsWith('@g.us') || senderJid === 'status@broadcast') {
    return false;
  }
  return true;
}

module.exports = { shouldProcessIncomingMessage };
