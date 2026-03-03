from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key="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")
MODEL = "llama-3.3-70b-versatile"

chat_sessions = {}

SYSTEM_PROMPT = """You are a warm, encouraging career coach for women 
returning to work after a career break. Be concise, supportive, 
and actionable. Keep responses under 100 words."""

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    session_id = data.get("session_id", "default")

    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    chat_sessions[session_id].append({
        "role": "user",
        "content": user_message
    })

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                *chat_sessions[session_id]
            ],
            temperature=0.7,
        )
        reply = response.choices[0].message.content

        chat_sessions[session_id].append({
            "role": "assistant",
            "content": reply
        })

        return jsonify({"reply": reply, "session_id": session_id})
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"reply": "Sorry, try again!", "error": str(e)}), 200

@app.route("/calculate-score", methods=["POST"])
def calculate_score():
    data = request.json
    career_area = data.get("careerArea", "Technology")
    skill_level = data.get("skillLevel", "Beginner")
    questions = data.get("questions", [])
    user_answers = data.get("answers", {})

    # Build Q&A summary for AI
    qa_summary = ""
    for q in questions:
        user_ans = user_answers.get(str(q["id"]), "Not answered")
        correct_ans = q["answer"]
        is_correct = user_ans == correct_ans
        qa_summary += f"""
Q{q['id']}: {q['question']}
User answered: {user_ans}
Correct answer: {correct_ans}
Result: {"✓ Correct" if is_correct else "✗ Wrong"}
"""

    prompt = f"""You are an expert career assessment evaluator.

A woman re-entering the workforce in {career_area} at {skill_level} level 
just completed an assessment. Here are her results:

{qa_summary}

Analyze her performance and provide:
1. A weighted score out of 100 (not just percentage — weigh harder questions more)
2. Her strongest area
3. Her weakest area  
4. 3 specific learning recommendations
5. An encouraging message

Return ONLY valid JSON in this exact format:
{{
  "weighted_score": 85,
  "grade": "B+",
  "strongest_area": "...",
  "weakest_area": "...",
  "recommendations": ["rec1", "rec2", "rec3"],
  "message": "encouraging message here",
  "breakdown": {{
    "accuracy": 80,
    "consistency": 75,
    "concept_strength": 90
  }}
}}"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )
        text = response.choices[0].message.content
        cleaned = text.replace("```json", "").replace("```", "").strip()
        import json
        result = json.loads(cleaned)
        return jsonify(result)
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/generate-questions", methods=["POST"])
def generate_questions():
    data = request.json
    skill = data.get("skill", "Technology")
    level = data.get("level", "Beginner")

    prompt = f"""Generate 5 multiple choice questions for someone re-entering 
the workforce in {skill} at {level} level.

Return ONLY a valid JSON array, no extra text:
[
  {{
    "id": 1,
    "question": "Question text?",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }}
]"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        text = response.choices[0].message.content
        return jsonify({"llm_output": text})
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
