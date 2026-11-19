const test = require('node:test');
const assert = require('node:assert/strict');
const { shouldProcessIncomingMessage } = require('../filter');

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

test('JARVIS Triage Filter: blocks self-originated and status broadcast messages', () => {
  const selfMsg = {
    key: { remoteJid: '6281234567890@s.whatsapp.net', fromMe: true },
    message: { conversation: 'Automated reply' }
  };
  const statusMsg = {
    key: { remoteJid: 'status@broadcast', fromMe: false },
    message: { conversation: 'Status update' }
  };

  assert.equal(shouldProcessIncomingMessage(selfMsg), false);
  assert.equal(shouldProcessIncomingMessage(statusMsg), false);
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
