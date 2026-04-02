# Exam-Adaptive Quiz System - Implementation Guide

## Overview
This document describes the complete implementation of an exam-adaptive quiz flow integrating React frontend with Python backend for personalized learning.

## Architecture Flow

```
User Selects Exam (HSC/JEE/NEET)
    ↓
Upload PDF File
    ↓
Frontend: Extract PDF text using pdf.js
    ↓
Send exam_type + pdf_text to backend /analyze-exam/ endpoint
    ↓
Backend AI Engine:
  1. Keyword-based topic detection
  2. Topic frequency analysis
  3. Exam-specific question generation
  4. Learning feedback & recommendations
    ↓
Return structured response to frontend
    ↓
Display AdaptiveQuizResults component with:
  - Detected topics & frequencies
  - Personalized questions
  - Learning feedback
  - Recommendations
    ↓
Store results and create quiz
```

## Frontend Components

### 1. **ExamSelector.tsx**
- Visual card-based selector for HSC/JEE/NEET exams
- Selected exam state management
- Icons and descriptions for each exam type

### 2. **Updated UploadPage.tsx**
- Integrated ExamSelector component
- PDF text extraction using pdf.js parser
- Fallback to backend parsing for non-PDF files
- Loading states and progress tracking
- Display of AdaptiveQuizResults after analysis
- Error handling with fallback to local processing

### 3. **AdaptiveQuizResults.tsx**
- Display summary of analysis
- Show detected topics with visual badges
- Topic frequency chart with importance levels
- Generated questions preview (first 3 questions)
- Learning feedback with checkmarks
- Study recommendations
- Responsive grid layout

### 4. **PDF Parser (pdfParser.ts)**
- `extractPdfText(file)`: Extract text from PDF using pdf.js
- `isPdfFile(file)`: Validate PDF files
- Handles multi-page PDFs
- Error handling for parsing failures

### 5. **Updated API (api.ts)**
- `submitAdaptiveQuizRequest()`: Send exam type + PDF text to backend
- Error handling for API failures
- Graceful fallbacks

### 6. **Updated Types (quiz.ts)**
```typescript
type ExamType = 'HSC' | 'JEE' | 'NEET'

interface TopicFrequency {
  topic: string
  frequency: number
  percentage: number
  importance: 'High' | 'Medium' | 'Low'
}

interface AdaptiveAnalysisResult {
  exam_type: ExamType
  pdf_text: string
  detected_topics: string[]
  topic_frequencies: TopicFrequency[]
  personalized_questions: Question[]
  learning_feedback: string[]
  summary: string
  recommendations: string[]
}
```

## Backend Implementation

### 1. **AI Engine (ai_engine.py)**

#### Topic Detection
- **`detect_topics(text)`**: Keyword-based topic detection
  - Uses predefined keyword dictionaries for: physics, chemistry, biology, mathematics, history
  - Counts keyword occurrences
  - Returns top 5 topics by frequency

#### Topic Frequency Analysis
- **`calculate_topic_frequencies()`**: 
  - Calculate percentage distribution
  - Assign importance levels (High >30%, Medium 15-30%, Low <15%)
  - Sorts by frequency

#### Exam-Specific Question Generation
- **`generate_exam_specific_questions()`**:
  - **JEE**: Numerical, problem-solving focused
  - **NEET**: Conceptual, biological processes, definitions
  - **HSC**: Balanced theory and application
  - Uses OpenAI API with exam-specific prompts
  - Fallback mock questions if no API key

#### Supporting Functions
- `extract_text_from_pdf()`: PDF text extraction
- `extract_text_from_docx()`: DOCX extraction
- `extract_text_from_txt()`: TXT extraction
- `generate_learning_feedback()`: Personalized feedback
- `generate_recommendations()`: Study recommendations
- `generate_summary()`: Analysis summary
- `generate_mock_questions()`: Fallback questions

### 2. **Main Backend (main.py)**

#### Original Endpoint
- **POST /analyze/**: File upload and analysis (unchanged)

#### New Endpoint
- **POST /analyze-exam/**: Adaptive quiz analysis
  ```json
  Request:
  {
    "exam_type": "JEE|NEET|HSC",
    "pdf_text": "extracted text from frontend",
    "filename": "original_filename.pdf"
  }
  
  Response:
  {
    "filename": "...",
    "exam_type": "...",
    "analysis": {
      "exam_type": "...",
      "pdf_text": "...",
      "detected_topics": ["topic1", "topic2", ...],
      "topic_frequencies": [...],
      "personalized_questions": [...],
      "learning_feedback": [...],
      "summary": "...",
      "recommendations": [...]
    }
  }
  ```

## Key Features

### 1. **Exam-Specific Personalization**
- Different question styles per exam
- Adapted difficulty levels
- Focused feedback based on exam requirements

### 2. **Topic Intelligence**
- Keyword-based detection (no ML required, works offline)
- Frequency analysis identifies weak/strong areas
- Context-aware recommendations

### 3. **Robust Error Handling**
- Frontend PDF parsing with graceful fallback
- Backend processing with mock fallback
- User-friendly error messages

### 4. **Responsive UI**
- Mobile-friendly design
- Progress indicators
- Animated transitions
- Clear visual hierarchy

## Dependencies Added

### Frontend
```json
{
  "pdfjs-dist": "^4.0.379"
}
```

### Backend
No new dependencies (uses existing fastapi, fitz, docx, openai)

## API Integration Points

### Frontend → Backend Communication
1. **PDF Upload**: Exam selection + PDF parsing
2. **Request**: POST /analyze-exam/ with exam type and extracted text
3. **Response**: Structured analysis with topics, questions, feedback

### Question Storage
- Uses existing localStorage via quizService
- New `examType` field added to Quiz and UploadedMaterial types
- Auto-creates quiz from personalized questions

## Testing the Implementation

### Prerequisites
```bash
# Install frontend dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Set OpenAI API key
export OPENAI_API_KEY="your-key-here"
```

### Running the System
```bash
# Terminal 1: Backend
python main.py
# Runs on http://localhost:8000

# Terminal 2: Frontend
npm run dev
# Runs on http://localhost:5173
```

### Manual Testing
1. Navigate to Upload page
2. Select exam type (HSC/JEE/NEET)
3. Upload PDF file
4. View analysis results
5. Check generated questions

## File Structure
```
src/
├── components/
│   ├── ExamSelector.tsx          (NEW)
│   ├── AdaptiveQuizResults.tsx   (NEW)
│   └── ...
├── pages/
│   ├── UploadPage.tsx            (MODIFIED)
│   └── ...
├── lib/
│   ├── api.ts                    (MODIFIED)
│   ├── pdfParser.ts              (NEW)
│   └── quizService.ts            (MODIFIED)
├── types/
│   └── quiz.ts                   (MODIFIED)
└── ...

Backend:
├── main.py                       (MODIFIED)
├── ai_engine.py                  (MODIFIED)
└── requirements.txt              (unchanged)
```

## Future Enhancements

1. **Advanced NLP**: Replace keyword matching with ML models
2. **Spaced Repetition**: Track weak topics and suggest review
3. **Adaptive Difficulty**: Adjust question difficulty based on performance
4. **Performance Analytics**: Track improvement over time
5. **Multi-language Support**: Support questions in multiple languages
6. **Export Features**: Generate PDFs of results and questions

## Git Branch
- Branch Name: `feature/exam-adaptive-quiz`
- Created and all changes committed
- Ready for pull request and merging

## Summary
This implementation provides a complete, production-ready exam-adaptive quiz system with:
✅ Frontend PDF parsing (pdf.js)
✅ Backend topic detection (keyword-based)
✅ Topic frequency analysis
✅ Exam-specific question generation (JEE/NEET/HSC)
✅ Learning feedback and recommendations
✅ Responsive UI with result visualization
✅ Error handling and fallbacks
✅ Git version control
