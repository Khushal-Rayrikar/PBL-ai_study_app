# Cortexa - Unified AI Study Platform

**Cortexa** is an advanced AI-powered study assistant that combines an intelligent backend AI engine with a modern, responsive web interface.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (for frontend)
- **Python 3.9+** (for backend)
- **Git**

### Installation & Running

#### Option 1: Run Both Services (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Khushal-Rayrikar/PBL-ai_study_app.git
   cd PBL-ai_study_app
   ```

2. **Terminal 1 - Start Backend (AI Engine):**
   ```bash
   cd ai-study-assistant
   pip install -r requirements.txt
   python main.py
   ```
   Backend runs on: **http://localhost:8000**

3. **Terminal 2 - Start Frontend (UI):**
   ```bash
   cd ui_app/aca-mind-ui
   npm install
   npm run dev
   ```
   Frontend runs on: **http://localhost:5174** (or next available port)

---

## 📋 Project Structure

```
PBL-ai_study_app/
├── ai-study-assistant/          # Backend - AI Engine
│   ├── main.py                  # FastAPI application
│   ├── ai_engine.py             # AI analysis engine
│   ├── requirements.txt          # Python dependencies
│   └── ...
│
├── ui_app/aca-mind-ui/          # Frontend - React UI
│   ├── src/
│   │   ├── App.tsx              # Main application
│   │   ├── App.css              # Styling
│   │   └── ...
│   ├── package.json             # Node dependencies
│   └── ...
│
└── README.md                     # This file
```

---

## 🔗 API Endpoints

### Backend API Documentation
- **Home Endpoint:** `http://localhost:8000/`
  ```json
  {
    "name": "Cortexa",
    "version": "1.0.2",
    "description": "Advanced AI Engine for document analysis and study material generation"
  }
  ```

- **Analyze Document:** `POST /analyze/`
  - Upload PDF, TXT, or DOCX files for AI analysis
  - Returns study materials, summaries, and quiz questions

### Frontend Interface
- **Main Page:** `http://localhost:5174/`
- Features:
  - Document upload and analysis
  - Real-time AI processing
  - Study material generation
  - Interactive quizzes
  - Progress tracking

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS** - Styling

### Backend
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **OpenAI API** - AI engine
- **PyMuPDF** - PDF processing
- **python-docx** - DOCX processing

---

## 📦 Features

✅ **AI-Powered Analysis**
- Automatic document processing
- Content extraction and summarization
- Intelligent study material generation

✅ **Modern Web Interface**
- Responsive design
- Real-time processing feedback
- Interactive UI components

✅ **Multi-Format Support**
- PDF documents
- Plain text files
- Word documents (DOCX)

✅ **Quiz Generation**
- Automatic question creation
- Multiple question types
- Progress tracking

---

## 🔐 Environment Variables

Create `.env` file in `ai-study-assistant/`:
```env
OPENAI_API_KEY=your_api_key_here
```

---

## 📝 Development

### Frontend Development
```bash
cd ui_app/aca-mind-ui
npm run dev       # Start dev server with HMR
npm run build     # Production build
npm run lint      # Run ESLint
```

### Backend Development
```bash
cd ai-study-assistant
pip install -r requirements.txt
python main.py    # Start server
```

---

## 🚀 Production Deployment

### Frontend Build
```bash
cd ui_app/aca-mind-ui
npm run build
# Outputs to: dist/
```

### Backend Deployment
```bash
cd ai-study-assistant
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

---

## 📊 Status

- **Frontend:** ✅ Running on http://localhost:5174
- **Backend:** ✅ Running on http://localhost:8000
- **Version:** 1.0.2
- **Platform:** Cortexa AI Study Assistant

---

## 🔗 Access Cortexa

**All-in-One Unified Link:**
- **Frontend + Backend:** http://localhost:5174 (frontend at :5174, backend at :8000)
- **API Documentation:** http://localhost:8000/docs (Swagger UI)

---

## 📄 License

This project is part of PBL - AI Study App

## 👨‍💻 Author

Khushal Rayrikar

---

**Built with ❤️ using React + FastAPI**
