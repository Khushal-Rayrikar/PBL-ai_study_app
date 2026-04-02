import os
from openai import OpenAI
from typing import Dict, Any, List, Tuple
import fitz  # PyMuPDF for PDF processing
from docx import Document  # python-docx for DOCX processing
import json
import re
from collections import Counter

# Initialize OpenAI client if API key is available
api_key = os.getenv("OPENAI_API_KEY")
if api_key:
    client = OpenAI(api_key=api_key)
else:
    client = None

# Keyword lists for topic detection
EXAM_KEYWORDS = {
    'physics': ['force', 'motion', 'energy', 'power', 'momentum', 'gravity', 'acceleration', 'velocity', 'wave', 'light', 'electricity', 'magnetism', 'thermodynamics'],
    'chemistry': ['atomic', 'molecule', 'bond', 'reaction', 'catalyst', 'equilibrium', 'pH', 'acid', 'base', 'oxidation', 'reduction', 'organic', 'inorganic'],
    'biology': ['cell', 'dna', 'rna', 'protein', 'enzyme', 'organism', 'evolution', 'genetics', 'photosynthesis', 'respiration', 'homeostasis', 'immune'],
    'mathematics': ['algebra', 'geometry', 'calculus', 'derivative', 'integral', 'function', 'matrix', 'vector', 'equation', 'theorem', 'proof', 'logarithm'],
    'history': ['empire', 'war', 'revolution', 'civilization', 'dynasty', 'treaty', 'monarch', 'culture', 'trade', 'conquest', 'period', 'era'],
}

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

def detect_topics(text: str) -> Tuple[List[str], Dict[str, int]]:
    """
    Detect topics from the text using keyword-based matching
    Returns: (detected_topics, topic_frequencies)
    """
    text_lower = text.lower()
    topic_frequency = {}
    
    # Count keyword occurrences for each topic
    for topic, keywords in EXAM_KEYWORDS.items():
        count = 0
        for keyword in keywords:
            count += text_lower.count(keyword)
        if count > 0:
            topic_frequency[topic] = count
    
    # Sort by frequency
    sorted_topics = sorted(topic_frequency.items(), key=lambda x: x[1], reverse=True)
    detected_topics = [topic for topic, _ in sorted_topics[:5]]  # Top 5 topics
    
    return detected_topics, topic_frequency

def calculate_topic_frequencies(detected_topics: List[str], topic_frequency: Dict[str, int]) -> List[Dict[str, Any]]:
    """
    Calculate topic frequency percentages and importance levels
    """
    total_frequency = sum(topic_frequency.values())
    
    result = []
    for topic in detected_topics:
        freq = topic_frequency.get(topic, 0)
        percentage = (freq / total_frequency * 100) if total_frequency > 0 else 0
        
        # Determine importance based on percentage
        if percentage > 30:
            importance = "High"
        elif percentage > 15:
            importance = "Medium"
        else:
            importance = "Low"
        
        result.append({
            "topic": topic,
            "frequency": freq,
            "percentage": round(percentage, 2),
            "importance": importance
        })
    
    return result

def generate_exam_specific_questions(
    topics: List[str],
    exam_type: str,
    text: str
) -> List[Dict[str, Any]]:
    """
    Generate personalized questions based on exam type and detected topics
    JEE: Numerical and problem-solving focused
    NEET: Conceptual and theoretical focused
    HSC: Balanced between theory and application
    """
    if client is None:
        # Return mock questions if no API key
        return generate_mock_questions(topics, exam_type)
    
    topics_str = ", ".join(topics)
    
    exam_prompts = {
        'JEE': """Generate 5 physics/chemistry/mathematics problems that are:
                - Numerical and calculation-focused
                - Require step-by-step problem-solving
                - Test conceptual understanding through numerical application
                - Include practical scenarios
                Topics to cover: """ + topics_str,
        'NEET': """Generate 5 biology/chemistry/physics questions that are:
                - Conceptually focused
                - Test understanding of biological processes
                - Include terminology and definitions
                - Relate to real-world biological scenarios
                Topics to cover: """ + topics_str,
        'HSC': """Generate 5 comprehensive questions that are:
                - Balanced between theory and application
                - Test both understanding and knowledge
                - Cover important concepts from the material
                - Include practical examples
                Topics to cover: """ + topics_str,
    }
    
    prompt = exam_prompts.get(exam_type, exam_prompts['HSC'])
    
    prompt += f"""
    
    Document context (first 1000 characters):
    {text[:1000]}
    
    Return as JSON array with this structure:
    [
        {{
            "question": "Question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0,
            "difficulty": "Easy|Medium|Hard",
            "explanation": "Why this is correct",
            "topic": "Related topic"
        }}
    ]
    Only return valid JSON array, no other text.
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are an expert {exam_type} exam question generator. Generate high-quality multiple choice questions that match {exam_type} exam standards."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=2000,
            temperature=0.7
        )
        
        result_text = response.choices[0].message.content.strip()
        
        # Extract JSON from the response
        try:
            questions = json.loads(result_text)
            # Add IDs to questions
            for i, q in enumerate(questions):
                q['id'] = f"q{i+1}"
            return questions
        except:
            return generate_mock_questions(topics, exam_type)
    except Exception as e:
        print(f"Error generating questions: {e}")
        return generate_mock_questions(topics, exam_type)

def generate_mock_questions(topics: List[str], exam_type: str) -> List[Dict[str, Any]]:
    """Generate mock questions when API is not available"""
    questions = []
    
    difficulty_order = ["Easy", "Medium", "Medium", "Hard", "Hard"]
    
    for i, topic in enumerate(topics[:5]):
        question = {
            "id": f"q{i+1}",
            "question": f"What is a key concept related to {topic} for {exam_type} exam?",
            "options": [
                f"Fundamental principle of {topic}",
                f"Advanced application of {topic}",
                f"Historical context of {topic}",
                f"Real-world example of {topic}"
            ],
            "correctAnswer": 0,
            "difficulty": difficulty_order[i],
            "explanation": f"This question tests understanding of {topic}, which is important for {exam_type}.",
            "topic": topic
        }
        questions.append(question)
    
    return questions

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

def analyze_for_adaptive_quiz(
    pdf_text: str,
    exam_type: str,
    filename: str
) -> Dict[str, Any]:
    """
    Analyze PDF text and generate adaptive quiz based on exam type
    - Detects topics via keyword matching
    - Calculates topic frequencies
    - Generates exam-specific personalized questions
    - Returns structured response for frontend
    """
    try:
        # Detect topics
        detected_topics, topic_frequency = detect_topics(pdf_text)
        
        # Calculate topic frequencies
        topic_frequencies = calculate_topic_frequencies(detected_topics, topic_frequency)
        
        # Generate exam-specific questions
        personalized_questions = generate_exam_specific_questions(
            detected_topics,
            exam_type,
            pdf_text
        )
        
        # Generate learning feedback
        learning_feedback = generate_learning_feedback(detected_topics, exam_type)
        
        # Generate recommendations
        recommendations = generate_recommendations(topic_frequencies, exam_type)
        
        # Generate summary
        summary = generate_summary(detected_topics, exam_type, pdf_text)
        
        return {
            "exam_type": exam_type,
            "pdf_text": pdf_text[:1000],  # Store first 1000 chars
            "detected_topics": detected_topics,
            "topic_frequencies": topic_frequencies,
            "personalized_questions": personalized_questions,
            "learning_feedback": learning_feedback,
            "summary": summary,
            "recommendations": recommendations
        }
    except Exception as e:
        raise Exception(f"Adaptive quiz analysis failed: {str(e)}")

def generate_learning_feedback(topics: List[str], exam_type: str) -> List[str]:
    """Generate personalized learning feedback based on detected topics and exam type"""
    feedback = [
        f"Your material covers {len(topics)} main topics suitable for {exam_type} exam.",
        f"Key topics detected: {', '.join(topics[:3])}. Focus on these areas.",
        f"The {exam_type} exam emphasizes {'numerical problem-solving' if exam_type == 'JEE' else 'conceptual understanding' if exam_type == 'NEET' else 'balanced learning'}.",
        f"Your study material aligns well with {exam_type} syllabus requirements.",
        f"Practice problems related to {topics[0] if topics else 'these topics'} to strengthen weak areas."
    ]
    return feedback

def generate_recommendations(topic_frequencies: List[Dict[str, Any]], exam_type: str) -> List[str]:
    """Generate personalized study recommendations"""
    high_priority = [t for t in topic_frequencies if t['importance'] == 'High']
    
    recommendations = [
        f"Prioritize high-frequency topics: {', '.join([t['topic'] for t in high_priority[:2]])}",
        f"Create detailed notes on concepts with >20% frequency coverage",
        f"Solve practice problems from high-importance topics first",
        f"Use the generated questions to test your understanding",
        f"Review weak areas identified by topic frequency analysis"
    ]
    
    return recommendations

def generate_summary(topics: List[str], exam_type: str, text: str) -> str:
    """Generate a summary of the document analysis"""
    summary = f"Document analyzed for {exam_type} exam. "
    summary += f"Detected {len(topics)} key topic{'s' if len(topics) != 1 else ''}: {', '.join(topics[:3])}. "
    summary += f"Text length: {len(text)} characters. "
    summary += "Personalized questions and feedback generated based on exam requirements."
    
    return summary