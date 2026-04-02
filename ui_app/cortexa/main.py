from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from ai_engine import analyze_document, analyze_for_adaptive_quiz
from pydantic import BaseModel

app = FastAPI(title="AI Study Assistant Backend", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for adaptive quiz
class AdaptiveQuizRequest(BaseModel):
    exam_type: str  # HSC, JEE, or NEET
    pdf_text: str  # Extracted PDF text from frontend
    filename: str  # Original filename

@app.post("/analyze/")
async def analyze_file(file: UploadFile = File(...)):
    """
    Analyze uploaded document and generate study materials
    """
    try:
        # Validate file type
        allowed_types = ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Unsupported file type. Please upload PDF, TXT, or DOCX files.")

        # Read file content
        content = await file.read()

        # Analyze document
        result = analyze_document(content, file.filename, file.content_type)

        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "analysis": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/analyze-exam/")
async def analyze_exam(request: AdaptiveQuizRequest):
    """
    Analyze PDF text for adaptive quiz based on exam type.
    Frontend sends extracted PDF text and exam type.
    Backend performs:
    1. Keyword-based topic detection
    2. Topic frequency analysis
    3. Exam-specific personalized question generation
    4. Learning feedback and recommendations
    """
    try:
        # Validate exam type
        valid_exams = ["HSC", "JEE", "NEET"]
        if request.exam_type not in valid_exams:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid exam type. Must be one of: {', '.join(valid_exams)}"
            )

        # Validate PDF text
        if not request.pdf_text or len(request.pdf_text.strip()) == 0:
            raise HTTPException(
                status_code=400,
                detail="PDF text is empty or invalid"
            )

        # Perform adaptive quiz analysis
        analysis_result = analyze_for_adaptive_quiz(
            request.pdf_text,
            request.exam_type,
            request.filename
        )

        return {
            "filename": request.filename,
            "exam_type": request.exam_type,
            "analysis": analysis_result
        }

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Adaptive analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)