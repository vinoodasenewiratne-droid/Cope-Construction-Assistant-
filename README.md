# Cope Construction Assistant — PWA Starter

This is a **from‑scratch, no‑code‑friendly** starter that turns your website into an **installable app (PWA)** and connects it to a simple **Google Apps Script backend** that talks to OpenAI’s API.

## What’s inside
- `index.html` — chat UI + install button
- `styles.css` — clean, dark theme
- `app.js` — sends messages to your backend URL
- `manifest.webmanifest` — makes it installable
- `sw.js` — service worker for offline support
- `offline.html` — offline fallback
- `icons/` — app icons
- `backend/Code.gs` — copy into Google Apps Script and deploy as a web app

---

## Step 1 — Backend (Google Apps Script)
1. Go to **script.google.com** → New project.
2. Replace the default code with the contents of `backend/Code.gs`.
3. **Set your API key**: Project Settings (gear) → **Script properties** → Add property  
   - Name: `OPENAI_API_KEY`  
   - Value: _your OpenAI API key_
4. **Deploy**: Deploy → *New deployment* → *Web app*  
   - Execute as: **Me**  
   - Who has access: **Anyone**  
   - Copy the **Web app URL**.

> The backend uses the **OpenAI Responses API** with `model: "gpt-4o-mini"` and a system prompt tailored for **Fiji FNBC + AS/NZS** guidance.

## Step 2 — Frontend (this PWA)
1. Open `app.js` and replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with the URL from Step 1.
2. Host these files on any static host (GitHub Pages, Netlify, Cloudflare Pages).  
   - **GitHub Pages** (simple): create a new repo → Upload files via web → Settings → Pages → Deploy from main branch → **URL appears**.
3. Visit your site on **HTTPS**. Your browser should show an **Install** option (or use the “Install App” button).

> You can also test locally using a static server (e.g., `python3 -m http.server`) but some PWA features require HTTPS.

## Step 3 — Try it
Ask: “Can I build 18 courses of 8‑inch blocks for two storeys?” or “What’s the acceptance criteria for 25 MPa concrete?”  
The bot will respond with **practical steps + compliance notes** and a **disclaimer**.

## Optional — Tune the assistant
- In `backend/Code.gs`, adjust the `systemPrompt` to your voice, include internal SOP links, and canned contacts (e.g., suppliers).  
- Add **simple intent routing** in Apps Script: if the message contains “order concrete”, the script can craft a supplier email.

## Troubleshooting
- If you see **CORS** issues, ensure you deployed as a **Web app** (“Anyone” access). Apps Script web apps generally allow cross‑origin JSON requests.
- If the PWA won’t install: confirm `manifest.webmanifest`, `icons/cope-192.png`, `icons/cope-512.png`, and that you’re on **HTTPS**.

---

## Next steps
- Add a Google Sheet for **site diary** rows; post to it from `doPost`.
- Add lead capture (name/phone/project) and email yourself when the user asks for a quote.
- Later, switch to a proper backend (FastAPI/Cloud Run) with a docs **RAG** index of your SOPs and standards summaries.

**Made for Cope Construction (Fiji).**
