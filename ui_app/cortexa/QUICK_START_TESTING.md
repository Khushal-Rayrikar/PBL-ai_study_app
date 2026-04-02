# 🚀 Quick Start Testing Guide

## Current System Status

✅ **Backend**: Running on port 8000 (FastAPI + Uvicorn)  
✅ **Frontend**: Running on port 5173 (Vite Dev Server)  
✅ **Health**: All systems operational  

---

## 🎯 Quick Test (2 Minutes)

### Step 1: Open the Application
```
Visit: http://localhost:5173
```

### Step 2: Navigate to Upload
- Click **"Upload & Analyze"** in the navigation bar
- Or go directly to: `http://localhost:5173/upload`

### Step 3: Select Exam
Click one of these exam cards:
- 📚 **HSC** - Balanced theory & application
- 🧪 **JEE** - Numerical & problem-solving
- 🔬 **NEET** - Conceptual & biological

### Step 4: Upload a PDF
Create a test PDF with content like:

```
Introduction to Physics

Newton's First Law of Motion states that an object in motion 
tends to stay in motion, and an object at rest tends to stay 
at rest, unless acted upon by an external force.

Force = Mass × Acceleration (F = ma)

This fundamental principle of mechanics explains why seatbelts 
are essential in vehicles. When a car suddenly stops, a passenger 
continues moving forward due to inertia, unless the seatbelt 
provides a force to stop their motion.

The concept of gravitational force explains why objects fall 
toward Earth. The acceleration due to gravity is approximately 
9.8 m/s² on Earth's surface.
```

Save as `physics_test.pdf` and upload it.

### Step 5: Click "Analyze with AI"
- Watch the progress bar
- System extracts PDF text using pdf.js
- Sends to backend for analysis
- Analyzes and returns results

### Step 6: Review Results
You should see:

1. **Summary** - Overview of analysis
2. **Detected Topics** - Lists main topics found
3. **Topic Frequencies** - Shows importance levels
4. **Questions Preview** - Sample personalized questions
5. **Learning Feedback** - Exam-specific tips
6. **Recommendations** - Study plan

---

## ✅ Expected Output Example

### For JEE Exam (Physics PDF)
```
Detected Topics:
├─ physics (52% - HIGH)
├─ mechanics (33% - HIGH)
└─ motion (15% - MEDIUM)

Sample Questions Generated:
├─ Q1: A 5kg block accelerates at 2 m/s². Find force.
│  Answer: 10 N (F=ma)
│  Difficulty: Medium
├─ Q2: Calculate acceleration from force...
└─ Q3: Problem involving gravity and motion...

Learning Feedback:
- JEE emphasizes numerical problem-solving
- Your material is well-suited for mechanics focus
- Practice with high-frequency topics first

Recommendations:
1. Prioritize physics and mechanics concepts
2. Solve numerical problems for each topic
3. Review applications of Newton's laws
```

---

## 🔍 Verification Checklist

- [ ] Page loads without errors
- [ ] ExamSelector shows 3 exam options
- [ ] Can select exam (card highlights)
- [ ] File upload area is active
- [ ] Can drag & drop PDF or click to browse
- [ ] File preview shows correctly
- [ ] "Analyze with AI" button works
- [ ] Progress bar appears and fills to 100%
- [ ] Results display with all sections
- [ ] Questions are exam-appropriate
- [ ] Topic frequencies show percentages
- [ ] Importance levels are colored (High/Medium/Low)

---

## 🛠️ Backend Testing (Optional)

### Test Health Endpoint
```powershell
curl http://localhost:8000/health
```

Expected response:
```json
{"status":"healthy"}
```

### Test API Endpoint
```powershell
$body = @{
    exam_type = "JEE"
    pdf_text = "Newton first law force motion acceleration"
    filename = "test.pdf"
} | ConvertTo-Json

curl -X POST http://localhost:8000/analyze-exam/ `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

Expected response: Full analysis JSON with topics, questions, feedback, etc.

---

## 📝 Creating Test PDFs

### Test 1: Physics (for JEE)
```
Physics Fundamentals

Newton's Laws of Motion
- First Law: Objects remain at rest unless acted upon
- Second Law: F = ma (force equals mass times acceleration)
- Third Law: Every action has equal and opposite reaction

Motion and Mechanics
Velocity describes rate of change of position.
Acceleration is the rate of change of velocity.

Energy and Work
Work is force applied over distance.
Kinetic energy depends on mass and velocity.
```

### Test 2: Biology (for NEET)
```
Cell Biology

The cell is the basic unit of life. All living organisms 
are composed of one or more cells.

Types of Cells:
- Prokaryotic cells: No nucleus (bacteria)
- Eukaryotic cells: Have nucleus and organelles

Cell Structure:
- Nucleus: Contains genetic material (DNA)
- Mitochondria: Powerhouse of the cell
- Chloroplasts: Site of photosynthesis
- Ribosomes: Protein synthesis

Photosynthesis converts light energy to chemical energy.
Respiration breaks down glucose for energy.
```

### Test 3: Chemistry (for HSC)
```
Chemical Bonding

Atoms combine to form molecules through chemical bonds.

Types of Bonds:
- Ionic bonds: Transfer of electrons
- Covalent bonds: Sharing of electrons
- Hydrogen bonds: Between molecules

Periodic Table
Elements arranged by atomic number and properties.
Groups have similar chemical properties.

Chemical Reactions
Products form when reactants combine.
Energy is released or absorbed in reactions.
```

---

## 🧪 Testing Different Exam Types

### JEE Test Workflow
1. Select **JEE**
2. Upload physics/chemistry pdf
3. ✓ Expect: Numerical, calculation-focused questions
4. ✓ Expect: Problem-solving emphasis
5. ✓ Expect: "problem-solving" in feedback

### NEET Test Workflow
1. Select **NEET**
2. Upload biology/chemistry pdf
3. ✓ Expect: Conceptual questions
4. ✓ Expect: Definition-based questions
5. ✓ Expect: "Biological concepts" in feedback

### HSC Test Workflow
1. Select **HSC**
2. Upload mixed subject pdf
3. ✓ Expect: Balanced theory & application
4. ✓ Expect: Mix of question types
5. ✓ Expect: "Balanced learning" in feedback

---

## 📊 Checking Backend Logs

### See Backend Performance
The backend terminal shows:
```
INFO:     Started server process [6384]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000

POST /analyze-exam/ HTTP/1.1" 200 OK
```

### See Frontend Compilation
The frontend terminal shows:
```
> cortexa@1.0.2 dev
> npm run dev (or vite)

  VITE v5.0.8  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🐛 Troubleshooting

### Issue: Frontend shows blank page
**Solution**: Clear browser cache and refresh (Ctrl+Shift+Del, then F5)

### Issue: Can't upload PDF
**Solution**: Make sure exam is selected (you'll see a message)

### Issue: Analysis takes long time
**Solution**: Check backend terminal for errors, may need API key for OpenAI

### Issue: Questions look generic
**Solution**: That's normal if OpenAI API key not set - mock questions are shown

### Issue: Backend connection error
**Solution**: Verify `curl http://localhost:8000/health` returns 200 OK

---

## 📈 Success Indicators

✅ You'll know it's working when:

1. **Selection Works**
   - Exam card highlights when clicked
   - Shows "Selected" badge

2. **Upload Works**
   - Can drag files to drop zone
   - File preview appears

3. **Analysis Works**
   - Progress bar fills smoothly
   - No error messages

4. **Results Show**
   - Topics display with colors
   - Questions appear with options
   - Feedback shows bullet points
   - Recommendations numbered

5. **Quiz Saves**
   - Quiz appears in Quizzes page
   - Shows exam type badge
   - Questions available to answer

---

## 🎓 Testing the Complete Learning Path

```
1. Upload PDF → Get analyzed
2. View results → Review feedback
3. See questions → Understand difficulty
4. Check topics → Identify focus areas
5. Read feedback → Get study tips
6. Use recommendations → Follow study plan
7. Answer quiz → Test knowledge
8. Review performance → Improve
```

---

## 📞 System Commands Reference

```bash
# Start backend only
cd e:\PBL-ai_study_app\ui_app\cortexa
python main.py

# Start frontend only
npm run dev

# Run both (in separate terminals)
# Terminal 1:
python main.py

# Terminal 2:
npm run dev

# Check backend health
curl http://localhost:8000/health

# View git log
git log --oneline -5

# View feature branch
git branch -v
```

---

## ✨ What's Happening Behind the Scenes

### User clicks "Analyze with AI"
1. Frontend extracts PDF text using pdf.js Library
2. Creates JSON request with exam type & text
3. Sends POST to backend API endpoint

### Backend processes request
1. Validates exam type (HSC/JEE/NEET)
2. Runs keyword detection on text
3. Calculates topic frequencies
4. Generates exam-specific questions
5. Creates learning feedback
6. Generates recommendations
7. Returns JSON response

### Frontend receives response
1. Parses structured analysis result
2. Renders AdaptiveQuizResults component
3. User sees formatted output
4. Saves quiz to localStorage

---

## 🎯 Next Steps After Testing

- ✅ If everything works: All systems operational!
- ⚠️ If issues found: Check error messages in browser console or backend terminal
- 🔄 If questions are generic: Set OPENAI_API_KEY environment variable for better results
- 🚀 If satisfied: Ready to merge feature branch to main

---

**System**: ✅ Ready  
**Testing**: ✅ Simple & Quick  
**Results**: ✅ Live & Testable  

Start testing now! 🎉
