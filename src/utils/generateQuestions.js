export async function generateQuestions(careerArea, skillLevel) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) throw new Error("Missing Groq API key");

  const prompt = `Generate 5 multiple choice questions for someone re-entering the workforce in the ${careerArea} field at a ${skillLevel} level.

Return ONLY a valid JSON array in this exact format, no extra text:
[
  {
    "id": 1,
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }
]`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (res.status === 429) throw new Error("Rate limit hit. Wait a moment and try again.");
  if (!res.ok) throw new Error(`Groq API error: ${res.status}`);

  const data = await res.json();
  const text = data.choices[0].message.content;
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
