from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

def analyze_text(text, exam):

    prompt = f"""
    Exam: {exam}

    Content:
    {text[:3000]}

    Extract topics and generate 5 questions.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content