from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = "models/gemini-2.0-flash-lite"

chat_sessions = {}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    session_id = data.get("session_id", "default")

    system_prompt = """You are a warm, encouraging career coach for women 
    returning to work after a career break. Be concise, supportive, 
    and actionable. Keep responses under 100 words."""

    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    history = chat_sessions[session_id]

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[
                types.Content(role="user", parts=[types.Part(text=system_prompt)]),
                *history,
                types.Content(role="user", parts=[types.Part(text=user_message)])
            ]
        )
        reply = response.text

        chat_sessions[session_id].append(
            types.Content(role="user", parts=[types.Part(text=user_message)])
        )
        chat_sessions[session_id].append(
            types.Content(role="model", parts=[types.Part(text=reply)])
        )

        return jsonify({"reply": reply, "session_id": session_id})
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"reply": "Sorry, try again!", "error": str(e)}), 200

@app.route("/generate-questions", methods=["POST"])
def generate_questions():
    data = request.json
    skill = data.get("skill", "Technology")

    prompt = f"""Generate 8 beginner assessment questions for {skill}. 
    Return ONLY valid JSON:
    {{"questions": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"]}}"""

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt
        )
        return jsonify({"llm_output": response.text})
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
