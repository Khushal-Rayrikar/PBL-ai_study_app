from fastapi import FastAPI
from pydantic import BaseModel
from ai_engine import analyze_text

app = FastAPI()

class InputData(BaseModel):
    text: str
    exam: str

@app.post("/analyze")
def analyze(data: InputData):
    result = analyze_text(data.text, data.exam)
    return result