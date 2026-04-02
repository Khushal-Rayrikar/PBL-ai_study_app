# 🚀 CORTEXA - UNIFIED AI STUDY PLATFORM

## ⚡ SINGLE UNIFIED LINK

### **Access Cortexa Here:**
```
http://localhost:3000
```

Everything is consolidated on **one port, one address**. No need to manage multiple tabs or ports!

---

## 🎯 What You Get

| Feature | URL |
|---------|-----|
| **Complete Application** | http://localhost:3000 |
| **Frontend UI** | http://localhost:3000 |
| **API Endpoints** | http://localhost:3000/api/* |
| **Health Check** | http://localhost:3000/health |
| **Backend Health** | http://localhost:3000/health/backend |
| **Frontend Health** | http://localhost:3000/health/frontend |

---

## 🚀 Quick Start (One Command!)

### **Windows:**
```cmd
start-cortexa.bat
```

### **Linux/Mac:**
```bash
./start-cortexa.sh
```

### **Manual Start:**

**Terminal 1 - Backend:**
```bash
cd ai-study-assistant
python main.py
```

**Terminal 2 - Gateway + Frontend:**
```bash
npm install  # First time only
node gateway-server.js
```

Then open: **http://localhost:3000**

---

## 📋 System Architecture

```
┌─────────────────────────────────────┐
│   Cortexa Unified Gateway (Port 3000)
│  ┌──────────────────────────────────┐
│  │     Frontend (React + TypeScript) │
│  │      - Document Upload UI        │
│  │      - Analysis Display          │
│  │      - Quiz Interface            │
│  └──────────────────────────────────┘
│  ┌──────────────────────────────────┐
│  │  API Proxy to Backend (Port 8000)│
│  │      /api/* → :8000/*            │
│  └──────────────────────────────────┘
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│   Backend AI Engine (Port 8000)      │
│   - FastAPI Server                  │
│   - Document Analyzer               │
│   - OpenAI Integration              │
│   - Study Material Generation      │
└─────────────────────────────────────┘
```

---

## 🔌 API Usage

All API calls are routed through the gateway:

### Analyze Document
```bash
curl -X POST http://localhost:3000/api/analyze/ \
  -F "file=@document.pdf"
```

### Get Platform Info
```bash
curl http://localhost:3000/api/
```

### Check Health
```bash
curl http://localhost:3000/health
```

---

## 🛠️ Technology Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Gateway:** Express.js + http-proxy-middleware  
- **Backend:** FastAPI + Uvicorn
- **AI:** OpenAI Integration
- **Processing:** PyMuPDF, python-docx

---

## 📦 Key Features

✨ **Unified Single Port Access** - No multiple ports to manage
✨ **Built Frontend** - Static files served directly
✨ **API Proxy** - Transparent routing to backend
✨ **Health Monitoring** - Check service status anytime
✨ **Hot Reload Ready** - Easy development with Vite
✨ **Production Ready** - Can be deployed as single service

---

## 🚨 Troubleshooting

### "Address already in use" on Port 3000?
```bash
node gateway-server.js --port 4000
```

### Backend not responding?
Make sure backend is running:
```bash
cd ai-study-assistant
python main.py
```

### Frontend not loading?
Build the frontend first:
```bash
cd ui_app/aca-mind-ui
npm run build
```

---

## 📚 Additional Resources

- **Full Documentation:** [SETUP.md](SETUP.md)
- **Platform Overview:** [CORTEXA_UNIFIED.md](CORTEXA_UNIFIED.md)
- **GitHub Repository:** https://github.com/Khushal-Rayrikar/PBL-ai_study_app

---

## ✅ Quick Reference

```bash
# Install dependencies (first time)
npm install

# Build frontend (when updated)
cd ui_app/aca-mind-ui && npm run build && cd ../..

# Start backend (terminal 1)
cd ai-study-assistant && python main.py

# Start unified gateway (terminal 2)
node gateway-server.js

# Access application
# Open browser: http://localhost:3000
```

---

## 🎉 That's It!

Everything runs through **ONE single link:**

## **👉 http://localhost:3000 👈**

No complex setups. No multiple terminals to juggle. Just one port. One link. Simple.

---

**Cortexa - AI-Powered Study Assistant**
*Built with React + FastAPI*
