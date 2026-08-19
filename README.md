# ⚡ KaifxWasi-Frontend

Ultra-fast, modern, glassmorphic Web Dashboard and WhatsApp Pairing Hub for **KaifxWasi-Mini WhatsApp Bot**.

---

## 🌟 Features
- **⚡ Instant 8-Digit Pairing Code**: Connect to WhatsApp in seconds without QR scanning.
- **📱 Live Dynamic QR Scanner**: Auto-refreshing QR code for WhatsApp Web linked devices.
- **📊 Real-Time Status & Capacity**: Live connection status, uptime, and active bot capacity.
- **🛡️ Admin Portal**: Multi-tenant session management, 1-click bot restart, and session purge.
- **🌐 Global Vercel Edge**: Optimized for 100% uptime and sub-millisecond global loading on Vercel.

---

## 🚀 1-Click Vercel Deployment

1. Go to [vercel.com/new](https://vercel.com/new).
2. Select this repository: `KaifxChaudhary-dev/KaifxWasi-Frontend`.
3. Click **Deploy**.

---

## 🔗 Backend Connection
By default, this frontend connects automatically via CORS REST APIs to the backend:
`https://kaifxwasi-mini-bot-335677af4df3.herokuapp.com`

> **Note:** If you want to connect to your own custom Heroku bot backend, you can set `localStorage.setItem('kaif_backend_url', 'https://your-custom-app.herokuapp.com')` in browser console.
