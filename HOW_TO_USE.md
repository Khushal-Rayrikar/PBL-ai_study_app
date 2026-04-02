# 🚀 How to Use Cortexa v1.0.2

## 📌 Quick Start (5 Minutes)

### **Prerequisites**
- Node.js 18+ installed
- Python 3.9+ installed
- Git installed
- 8GB RAM minimum

---

## 🎯 **Option 1: Run Everything (Easiest)**

### **Windows Users**
```cmd
cd e:\PBL-ai_study_app
start-cortexa.bat
```

### **Linux/Mac Users**
```bash
cd PBL-ai_study_app
chmod +x start-cortexa.sh
./start-cortexa.sh
```

**Wait 10-15 seconds, then open your browser:**

## **👉 http://localhost:3000 👈**

---

## 🔧 **Option 2: Manual Setup (If script doesn't work)**

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/Khushal-Rayrikar/PBL-ai_study_app.git
cd PBL-ai_study_app
```

### **Step 2: Terminal 1 - Start Backend (AI Engine)**
```bash
cd ai-study-assistant
pip install -r requirements.txt
python main.py
```

**You'll see:**
```
INFO: Uvicorn running on http://0.0.0.0:8000
```

### **Step 3: Terminal 2 - Start Gateway**
```bash
npm install  # First time only
node gateway-server.js
```

**You'll see:**
```
✅ Gateway running on: http://localhost:3000
```

### **Step 4: Open Browser**
Go to: **http://localhost:3000**

---

## 📱 **What You'll See - Dashboard**

When you open Cortexa, you'll see:

```
┌─────────────────────────────────────┐
│  🎓 Cortexa                         │
├─────────────────────────────────────┤
│  📊 Dashboard                       │
│  • Performance analytics            │
│  • Quiz statistics                  │
│  • Study progress tracking          │
└─────────────────────────────────────┘
```

---

## 🎓 **Features & How to Use Them**

### **1️⃣ Upload Page**
**Path:** http://localhost:3000/upload

**What to do:**
1. Click "Upload Document"
2. Select PDF, DOCX, or TXT file
3. Click "Analyze with AI"
4. Wait for analysis (AI will extract key points)

**What you get:**
- Document summary
- Key points extracted
- Quiz questions auto-generated
- Study materials created

---

### **2️⃣ Dashboard**
**Path:** http://localhost:3000/dashboard

**What you see:**
- 📈 Performance charts
- 📊 Unit-wise breakdown
- ⏱️ Time vs Marks analysis
- 🎯 Progress metrics

---

### **3️⃣ Quizzes**
**Path:** http://localhost:3000/quizzes

**How to use:**
1. See list of available quizzes
2. Click on a quiz to start
3. Answer questions
4. Get instant feedback
5. View detailed analysis

---

### **4️⃣ Theory/Study Materials**
**Path:** http://localhost:3000/theory

**Features:**
- Browse study materials
- Read organized content
- Search through topics
- Save favorites

---

### **5️⃣ Videos**
**Path:** http://localhost:3000/videos

**What's here:**
- Instructional videos
- Concept explanations
- Solution walkthroughs

---

### **6️⃣ Revision**
**Path:** http://localhost:3000/revision

**Features:**
- Quick revision notes
- Important formulas
- Summary cards
- Practice problems

---

### **7️⃣ Focus Mode**
**Path:** http://localhost:3000/focus

**Use for:**
- Distraction-free studying
- Focused learning sessions
- Deep work blocks

---

## 🌐 **All Available Links**

| Feature | URL |
|---------|-----|
| **Main App** | http://localhost:3000 |
| **Dashboard** | http://localhost:3000/dashboard |
| **Upload Documents** | http://localhost:3000/upload |
| **Quizzes** | http://localhost:3000/quizzes |
| **Theory** | http://localhost:3000/theory |
| **Videos** | http://localhost:3000/videos |
| **Revision** | http://localhost:3000/revision |
| **Focus Mode** | http://localhost:3000/focus |
| **API Health** | http://localhost:3000/health |

---

## 🤖 **AI Features**

### **Document Analysis**
Upload any study document and Cortexa AI will:
- ✅ Extract key concepts
- ✅ Generate quiz questions
- ✅ Create study summaries
- ✅ Identify important topics

### **Quiz Engine**
- Adaptive difficulty
- Instant feedback
- Performance tracking
- Detailed explanations

### **Smart Learning**
- Personalized recommendations
- Progress analytics
- Weakness identification
- Strength consolidation

---

## 🚀 **Tips for Best Experience**

1. **Start with Dashboard** → Get an overview
2. **Upload Documents** → Feed your study materials
3. **Take Quizzes** → Test your knowledge
4. **Review Theory** → Learn new concepts
5. **Watch Videos** → Visual explanations
6. **Use Revision** → Quick refreshers
7. **Focus Mode** → Deep study sessions

---

## 🐛 **Troubleshooting**

### **Port 3000 Already in Use?**
```bash
# Change gateway port in gateway-server.js (line 12)
const PORT = 4000;  # Change this
```

### **Backend Not Responding?**
```bash
# Make sure backend is running
cd ai-study-assistant
python main.py
```

### **Frontend Not Loading?**
```bash
# Rebuild frontend
cd ui_app/cortexa
npm install
npm run build
```

### **Dependencies Error?**
#### Backend:
```bash
cd ai-study-assistant
pip install --upgrade -r requirements.txt
```

#### Frontend:
```bash
cd ui_app/cortexa
rm -rf node_modules
npm install
```

---

## 📚 **Documentation**

- **Full Setup Guide:** [SETUP.md](SETUP.md)
- **Platform Overview:** [CORTEXA_UNIFIED.md](CORTEXA_UNIFIED.md)
- **Single Link Info:** [UNIFIED_LINK.md](UNIFIED_LINK.md)

---

## 🔐 **Environment Setup (Optional)**

Create `.env` file in `ai-study-assistant/`:
```env
OPENAI_API_KEY=your_api_key_here
```

For AI features to work at full capacity.

---

## 📲 **System Requirements**

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **RAM** | 4GB | 8GB+ |
| **Disk Space** | 2GB | 5GB+ |
| **Node.js** | 16.x | 18.x+ |
| **Python** | 3.8 | 3.10+ |
| **Browser** | Chrome 90+ | Latest |

---

## ✅ **Getting Started Checklist**

- [ ] Clone repository
- [ ] Install Node.js
- [ ] Install Python
- [ ] Start backend (`python main.py`)
- [ ] Start gateway (`node gateway-server.js`)
- [ ] Open http://localhost:3000
- [ ] Upload a test document
- [ ] Take a quiz
- [ ] Check dashboard

---

## 🎯 **Next Steps**

1. **Customize:** Modify pages in `ui_app/cortexa/src/pages/`
2. **Integrate:** Connect to your API endpoints
3. **Deploy:** Use Docker for production
4. **Extend:** Add new features as needed

---

## 📧 **Support**

**GitHub:** https://github.com/Khushal-Rayrikar/PBL-ai_study_app

**Release:** v1.0.2 (April 2, 2026)

---

## 🎉 **That's It!**

**Everything is ready. Just access:**

# **http://localhost:3000**

Enjoy learning with Cortexa! 🚀

---

*Built with React + TypeScript + FastAPI*
*AI-Powered Study Assistant Platform*
