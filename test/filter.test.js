const test = require('node:test');
const assert = require('node:assert/strict');

// Pure message triage filter extracted from index.js
function shouldProcessIncomingMessage(msg) {
  if (!msg || !msg.message || (msg.key && msg.key.fromMe)) return false;
  const senderJid = (msg.key && msg.key.remoteJid) || '';
  if (senderJid.endsWith('@g.us')) return false;
  return true;
}

test('JARVIS Triage Filter: blocks group broadcasts (@g.us) with 0 LLM calls', () => {
  let llmInvocations = 0;
  const groupMsg = {
    key: { remoteJid: '120363041928374@g.us', fromMe: false },
    message: { conversation: 'Hello everyone in the group!' }
  };

  if (shouldProcessIncomingMessage(groupMsg)) {
    llmInvocations++;
  }
  assert.equal(llmInvocations, 0, 'Group messages must never trigger an LLM API call');
});

test('JARVIS Triage Filter: allows 1:1 direct messages (@s.whatsapp.net)', () => {
  let llmInvocations = 0;
  const directMsg = {
    key: { remoteJid: '6281234567890@s.whatsapp.net', fromMe: false },
    message: { conversation: 'Hi Fata, are you available?' }
  };

  if (shouldProcessIncomingMessage(directMsg)) {
    llmInvocations++;
  }
  assert.equal(llmInvocations, 1, '1:1 direct messages should be routed to the triage handler');
});
