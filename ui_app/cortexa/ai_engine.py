from collections import Counter

def analyze_text(text, exam):
    text = text.lower()
    words = text.split()

    # 🔍 Topic keywords
    topics_map = {
        "Algebra": ["equation", "algebra", "x", "polynomial"],
        "Trigonometry": ["sin", "cos", "tan", "angle"],
        "Calculus": ["limit", "derivative", "integral"],
        "Probability": ["probability", "chance", "event"],
        "Biology": ["cell", "biology", "organism"]
    }

    topic_counts = {}

    # 🧠 Count frequency
    for topic, keywords in topics_map.items():
        count = sum(text.count(k) for k in keywords)
        if count > 0:
            topic_counts[topic] = count

    if not topic_counts:
        topic_counts["General"] = 1

    # 🔥 Sort topics by importance
    sorted_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)

    topics = [t[0] for t in sorted_topics]

    # 🎯 Generate questions based on exam
    questions = []
    for topic in topics:
        if exam == "JEE":
            questions.append(f"Advanced numerical problem on {topic}")
        elif exam == "NEET":
            questions.append(f"Conceptual theory question on {topic}")
        else:
            questions.append(f"Basic question on {topic}")

    # 📊 Difficulty
    word_count = len(words)
    if word_count < 500:
        difficulty = "Easy"
    elif word_count < 1500:
        difficulty = "Medium"
    else:
        difficulty = "Hard"

    # 🎯 Feedback
    main_topic = topics[0]
    feedback = f"Focus more on {main_topic} for {exam}"

    return {
        "topics": topics,
        "questions": questions,
        "difficulty": difficulty,
        "word_count": word_count,
        "feedback": feedback
    }