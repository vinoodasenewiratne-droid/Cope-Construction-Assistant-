// Cope Construction PWA Chatbot
let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');
const messages = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const statusBadge = document.getElementById('statusBadge');

// TODO: Replace with your deployed Google Apps Script Web App URL
const BOT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwnz_zLgKQJROWhQu0NSdfl74vjmxI57lZ6orAwtJa8P0uMe09zET9KxO2Vs1TtMts4SA/exec";

// PWA install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});
installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.style.display = 'none';
});

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}

function addMessage(text, who='bot'){
  const el = document.createElement('div');
  el.className = `msg ${who}`;
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
  // Persist history
  const log = JSON.parse(localStorage.getItem('cope_chatlog') || '[]');
  log.push({who, text, t: Date.now()});
  localStorage.setItem('cope_chatlog', JSON.stringify(log));
}

function loadHistory(){
  const log = JSON.parse(localStorage.getItem('cope_chatlog') || '[]');
  for(const m of log.slice(-100)){
    addMessage(m.text, m.who);
  }
}
loadHistory();

async function askBot(q){
  addMessage(q, 'user');
  addMessage('Thinking…', 'bot');
  try{
    const res = await fetch(BOT_ENDPOINT, {
   const res = await fetch(BOT_ENDPOINT, {
  method: 'POST',
  body: JSON.stringify({ message: q })
});

    });
    const data = await res.json();
    const last = messages.querySelector('.msg.bot:last-child');
    last.textContent = (data.reply || data.error || 'Sorry, no response.');
  }catch(err){
    const last = messages.querySelector('.msg.bot:last-child');
    last.textContent = 'Network error. Your message is saved offline; try again when online.';
  }
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = userInput.value.trim();
  if(!q) return;
  userInput.value='';
  askBot(q);
});

// Offline indicator
function updateStatus(){
  statusBadge.textContent = navigator.onLine ? '• Online' : '• Offline-ready';
}
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
updateStatus();

// Welcome message once
if(!localStorage.getItem('cope_welcomed')){
  addMessage('Bula! I’m Cope Construction’s assistant. Ask me about FNBC/AS‑NZS compliance, site diaries, concrete orders, RFIs/VOs, or safety prompts.');
  localStorage.setItem('cope_welcomed','1');
}
