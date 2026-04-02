"""
Cortexa AI Engine v1.0.2
Advanced document analysis and study material generation
Part of the Cortexa AI Study Platform
"""

import os
from openai import OpenAI
from typing import Dict, Any
import fitz  # PyMuPDF for PDF processing
from docx import Document  # python-docx for DOCX processing

# Initialize OpenAI client if API key is available
api_key = os.getenv("OPENAI_API_KEY")
if api_key:
    client = OpenAI(api_key=api_key)
else:
    client = None

def extract_text_from_pdf(content: bytes) -> str:
    """Extract text from PDF file"""
    try:
        doc = fitz.open(stream=content, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        raise Exception(f"Failed to extract PDF text: {str(e)}")

def extract_text_from_docx(content: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        from io import BytesIO
        doc = Document(BytesIO(content))
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        raise Exception(f"Failed to extract DOCX text: {str(e)}")

def extract_text_from_txt(content: bytes) -> str:
    """Extract text from TXT file"""
    try:
        return content.decode('utf-8')
    except Exception as e:
        raise Exception(f"Failed to decode text: {str(e)}")

def analyze_document(content: bytes, filename: str, content_type: str) -> Dict[str, Any]:
    """
    Analyze document content and generate study materials using OpenAI
    """
    try:
        # Extract text based on file type
        if content_type == "application/pdf":
            text = extract_text_from_pdf(content)
        elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            text = extract_text_from_docx(content)
        elif content_type == "text/plain":
            text = extract_text_from_txt(content)
        else:
            raise Exception(f"Unsupported content type: {content_type}")

        # Limit text length for API
        max_chars = 10000
        if len(text) > max_chars:
            text = text[:max_chars] + "..."

        # Check if OpenAI client is available
        if client is None:
            # Mock analysis when no API key
            analysis = {
                "summary": f"Document '{filename}' uploaded successfully. Text extracted ({len(text)} characters).",
                "topics": ["Document Processing", "Text Analysis", "Study Materials"],
                "quiz_questions": [
                    {"question": "What is the main topic of this document?", "answer": "The document content has been processed."}
                ],
                "study_tips": ["Review the extracted text", "Use AI analysis for better insights (requires API key)"]
            }
        else:
            # Generate analysis using OpenAI
            prompt = f"""
            Analyze the following document content and generate study materials:

            Document: {filename}
            Content:
            {text}

            Please provide:
            1. A brief summary (2-3 sentences)
            2. Key topics/concepts (3-5 main topics)
            3. Potential quiz questions (3-5 questions with answers)
            4. Study tips for this material

            Format your response as JSON with keys: summary, topics, quiz_questions, study_tips
            """

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an AI study assistant that helps students analyze documents and create study materials. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.7
            )

            # Parse the response
            result_text = response.choices[0].message.content.strip()

            # Try to parse as JSON, if fails, create structured response
            try:
                import json
                analysis = json.loads(result_text)
            except:
                # Fallback structured response
                analysis = {
                    "summary": "Document analyzed successfully.",
                    "topics": ["Topic 1", "Topic 2", "Topic 3"],
                    "quiz_questions": [
                        {"question": "Sample question?", "answer": "Sample answer"}
                    ],
                    "study_tips": ["Review key concepts", "Practice with examples"]
                }

        return {
            "text_length": len(text),
            "analysis": analysis
        }

    except Exception as e:
        raise Exception(f"Analysis failed: {str(e)}")