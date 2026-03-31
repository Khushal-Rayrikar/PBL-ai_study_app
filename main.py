from fastapi import FastAPI, UploadFile, Form
import fitz
from ai_engine import analyze_text

app = FastAPI()

@app.post("/analyze/")
async def analyze(file: UploadFile, exam: str = Form(...)):
    pdf_bytes = await file.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    text = ""
    for page in doc:
        text += page.get_text()

    result = analyze_text(text, exam)

    return {"result": result}