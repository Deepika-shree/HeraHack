import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FALLBACK_QUESTIONS = {
  Technology: [
    "What is the difference between HTML and CSS?",
    "What does a web browser do?",
    "What is an IP address?",
    "What is the purpose of JavaScript in a website?",
    "What is a database used for?",
    "What does 'responsive design' mean?",
    "What is the difference between frontend and backend?",
    "What is an API?",
    "What is cloud storage?",
    "What is a programming loop?",
  ],
  Healthcare: [
    "What is the role of a nurse in patient care?",
    "What does 'vital signs' refer to?",
    "What is the difference between a virus and a bacteria?",
    "What is first aid?",
    "What does BMI stand for?",
    "What is the function of the heart?",
    "What is a medical diagnosis?",
    "What is hygiene in a healthcare setting?",
    "What does 'patient confidentiality' mean?",
    "What is a vaccination?",
  ],
  Business: [
    "What is the difference between revenue and profit?",
    "What does a balance sheet show?",
    "What is marketing?",
    "What is the role of a manager?",
    "What is supply and demand?",
    "What is a business plan?",
    "What does 'cash flow' mean?",
    "What is customer service?",
    "What is an invoice?",
    "What is entrepreneurship?",
  ],
};

export default function Assessment() {
  const navigate = useNavigate();
  const location = useLocation();
  const careerArea = location.state?.careerArea || "Technology";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill: careerArea }),
      });
      const data = await res.json();
      const parsed = JSON.parse(data.llm_output);
      setQuestions(parsed.questions);
      setUsingFallback(false);
    } catch (err) {
      setQuestions(
        FALLBACK_QUESTIONS[careerArea] || FALLBACK_QUESTIONS["Technology"]
      );
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    navigate("/dashboard", { state: { answers, careerArea } });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-3 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="font-bold text-lg tracking-wide">SHE-RETURNS</span>
        </div>
        <div className="flex items-center gap-8 text-sm font-semibold text-gray-800">
          <span onClick={() => navigate("/home")} className="cursor-pointer hover:text-purple-600">HOME</span>
          <span onClick={() => navigate("/reentry-form")} className="cursor-pointer hover:text-purple-600">RENTRY FORM</span>
          <span onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-purple-600">DASHBOARD</span>
          <span onClick={() => navigate("/scholarship")} className="cursor-pointer hover:text-purple-600">SCHOLARSHIP FORM</span>
          <span onClick={() => navigate("/schedule")} className="cursor-pointer hover:text-purple-600">SCHEDULE</span>
          <span onClick={() => navigate("/about")} className="cursor-pointer hover:text-purple-600">ABOUT</span>
          <button onClick={() => navigate("/login")} className="bg-[#e8705a] hover:bg-[#d45f49] text-white px-5 py-2 rounded-full font-semibold transition">
            LOGOUT
          </button>
        </div>
      </nav>

      <div className="bg-[#c9b8f0] min-h-screen px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-black">Skill Assessment — {careerArea}</h1>
            <p className="text-sm text-gray-700 mt-1">Answer the questions below based on your current knowledge.</p>
          </div>
          {usingFallback && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full border border-yellow-300">
              ⚡ Using cached questions
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">Generating questions for {careerArea}...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 max-w-3xl">
              {questions.map((q, index) => (
                <div key={index} className="bg-[#ddd6f0] rounded-2xl px-6 py-5">
                  <p className="font-semibold text-gray-800 mb-3">{index + 1}. {q}</p>
                  <textarea
                    rows={2}
                    placeholder="Type your answer here..."
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswer(index, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
              ))}
            </div>
            <div className="max-w-3xl mt-6 flex justify-end">
              <button onClick={handleSubmit} className="bg-[#e8705a] hover:bg-[#d45f49] text-white px-10 py-3 rounded-full font-bold text-sm transition shadow-md">
                Submit Assessment →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
