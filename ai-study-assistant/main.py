from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from ai_engine import analyze_document

app = FastAPI(title="Cortexa AI Engine", version="1.0.2")

# CORS middleware for Cortexa
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cortexa API info
@app.get("/")
async def root():
    """Cortexa AI Engine - Analytics & Study Assistant API"""
    return {
        "name": "Cortexa",
        "version": "1.0.2",
        "description": "Advanced AI Engine for document analysis and study material generation"
    }

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

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)