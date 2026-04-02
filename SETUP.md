# Cortexa - Complete Setup Guide

## 🎯 Project Overview

**Cortexa** is a unified AI-powered study platform combining:
- **Frontend:** React + TypeScript + Vite web interface
- **Backend:** FastAPI AI engine with document analysis
- **AI:** OpenAI integration for intelligent study material generation

---

## 🚀 Quick Setup (< 5 minutes)

### Windows Users

1. **Navigate to project root:**
   ```cmd
   cd e:\PBL-ai_study_app
   ```

2. **Run the unified startup script:**
   ```cmd
   start-cortexa.bat
   ```

3. **Access Cortexa:**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:8000

### Linux/Mac Users

1. **Navigate to project root:**
   ```bash
   cd PBL-ai_study_app
   ```

2. **Run the unified startup script:**
   ```bash
   chmod +x start-cortexa.sh
   ./start-cortexa.sh
   ```

3. **Access Cortexa:**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:8000

---

## 📦 Manual Setup

### Backend Setup

```bash
cd ai-study-assistant

# Install dependencies
pip install -r requirements.txt

# Set environment variables
set OPENAI_API_KEY=your_api_key_here

# Run backend
python main.py
```

**Backend will be available at:** `http://localhost:8000`

### Frontend Setup

```bash
cd ui_app/aca-mind-ui

# Install dependencies
npm install

# Run development server
npm run dev
```

**Frontend will be available at:** `http://localhost:5174` (or next available port)

---

## 🐳 Docker Setup (Unified)

### Prerequisites
- Docker installed and running

### Run with Docker Compose

```bash
cd PBL-ai_study_app

# Set environment variables
set OPENAI_API_KEY=your_api_key_here

# Start both services
docker-compose up -d
```

**Services will be available at:**
- Frontend: http://localhost:5174
- Backend: http://localhost:8000

### Stop Services

```bash
docker-compose down
```

---

## 🌐 All Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:5174 | Web UI - Upload documents, view analysis |
| **Backend API** | http://localhost:8000 | REST API for AI document analysis |
| **API Documentation** | http://localhost:8000/docs | Interactive Swagger UI |
| **Root API Info** | http://localhost:8000/ | API metadata and version info |

---

## 📝 API Endpoints

### Root Info
```
GET http://localhost:8000/
```

Response:
```json
{
  "name": "Cortexa",
  "version": "1.0.2",
  "description": "Advanced AI Engine for document analysis and study material generation"
}
```

### Analyze Document
```
POST http://localhost:8000/analyze/
Content-Type: multipart/form-data

file: <PDF, TXT, or DOCX file>
```

Response:
```json
{
  "success": true,
  "summary": "...",
  "key_points": [...],
  "quiz_questions": [...]
}
```

---

## 🔧 Environment Variables

Create `.env` in `ai-study-assistant/`:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-key-here

# Optional: API Configuration
API_HOST=0.0.0.0
API_PORT=8000
```

---

## 📊 Project Structure

```
PBL-ai_study_app/
│
├── ai-study-assistant/          ← Backend (AI Engine)
│   ├── main.py                  Python FastAPI app
│   ├── ai_engine.py             AI processing logic
│   ├── requirements.txt          Python dependencies
│   ├── Dockerfile               Docker image
│   └── ...
│
├── ui_app/aca-mind-ui/          ← Frontend (React UI)
│   ├── src/
│   │   ├── App.tsx              Main React component
│   │   ├── App.css              Styling
│   │   └── ...
│   ├── package.json             NPM dependencies
│   ├── vite.config.ts           Vite configuration
│   ├── Dockerfile               Docker image
│   └── ...
│
├── start-cortexa.bat            Windows startup script
├── start-cortexa.sh             Linux/Mac startup script
├── docker-compose.yml           Docker Compose config
├── CORTEXA_UNIFIED.md           Unified platform documentation
├── SETUP.md                     This file
│
└── README.md                    Project readme
```

---

## 🛠️ Tech Stack

### Frontend
- React 19.2.4
- TypeScript 5.9.3
- Vite 8.0.1
- ESLint 9.39.4

### Backend
- FastAPI 0.104.1
- Uvicorn 0.24.0
- OpenAI 1.3.5
- PyMuPDF 1.23.7
- python-docx 1.1.0

---

## ✨ Features

✅ **Document Analysis**
- PDF, TXT, DOCX support
- Automatic text extraction
- AI-powered summarization

✅ **Study Material Generation**
- Key points extraction
- Quiz question generation
- Interactive learning interface

✅ **Modern Web Interface**
- Responsive design
- Real-time processing
- Beautiful UI with Cortexa branding

✅ **API-First Architecture**
- Clean REST API
- OpenAPI documentation
- Easy integration

---

## 🚨 Troubleshooting

### Port Already in Use

If port 5174 or 8000 is already in use:

**Frontend:**
```bash
cd ui_app/aca-mind-ui
npm run dev -- --port 5175
```

**Backend:**
```bash
cd ai-study-assistant
# Edit main.py and change port configuration, or:
uvicorn main:app --host 0.0.0.0 --port 8001
```

### Dependencies Issues

**Frontend:**
```bash
cd ui_app/aca-mind-ui
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
cd ai-study-assistant
pip install --upgrade -r requirements.txt
```

### OpenAI API Key

Make sure to set `OPENAI_API_KEY` environment variable before running the backend.

---

## 📚 Documentation

- **Unified Platform Guide:** [CORTEXA_UNIFIED.md](CORTEXA_UNIFIED.md)
- **This Setup Guide:** [SETUP.md](SETUP.md)
- **API Docs:** Available at http://localhost:8000/docs when backend is running

---

## 🎉 You're All Set!

Your Cortexa AI Study Platform is ready to use. Start both services and begin analyzing documents with AI-powered insights!

**Questions?** Check the documentation or review the source code in respective directories.

---

**Built with ❤️ by PBL Team**
