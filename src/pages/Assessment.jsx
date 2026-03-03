import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { generateQuestions } from "../utils/generateQuestions";

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [careerArea, setCareerArea] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuestions = async (area, level) => {
    setLoading(true);
    setError("");
    try {
      const qs = await generateQuestions(area, level);
      setQuestions(qs);
    } catch (err) {
      console.error(err);
      setError("Failed to generate questions. Try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "reentryForms", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const area = data.careerArea || "Technology";
        const level = data.skillLevel || "Beginner";
        setCareerArea(area);
        setSkillLevel(level);
        await fetchQuestions(area, level);
      } else {
        await fetchQuestions("Technology", "Beginner");
      }
    };

    init();
  }, []);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });
    setScore(correct);
  };

  const handleRetry = () => {
    setScore(null);
    setAnswers({});
    fetchQuestions(careerArea, skillLevel);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#2d1b4e] flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-400 mb-4" />
        <p className="text-purple-300">Generating your personalized questions...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#2d1b4e] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => fetchQuestions(careerArea, skillLevel)}
            className="bg-purple-500 px-6 py-2 rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#2d1b4e] text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Career Assessment</h1>
      <p className="text-purple-300 mb-8">
        🎯 Topic:{" "}
        <span className="font-semibold text-white">{careerArea}</span> &nbsp;|&nbsp;
        Level: <span className="font-semibold text-white">{skillLevel}</span>
      </p>

      {score !== null ? (
        <div className="bg-purple-800 rounded-2xl p-8 text-center">
          <h2 className="text-4xl font-bold mb-4">🎉 Your Score</h2>
          <p className="text-6xl font-extrabold text-yellow-300">
            {score} / {questions.length}
          </p>
          <p className="mt-4 text-purple-200">
            {score === questions.length
              ? "Perfect! You're ready to reenter the workforce! 🚀"
              : score >= questions.length / 2
              ? "Good job! Keep practicing! 💪"
              : "Keep learning, you'll get there! 📚"}
          </p>
          <button
            onClick={handleRetry}
            className="mt-6 bg-white text-purple-900 font-semibold px-6 py-2 rounded-full"
          >
            Generate New Questions
          </button>
        </div>
      ) : (
        <>
          {questions.map((q) => (
            <div key={q.id} className="bg-white/10 rounded-2xl p-6 mb-6">
              <p className="font-semibold text-lg mb-4">
                {q.id}. {q.question}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(q.id, opt)}
                    className={`py-2 px-4 rounded-xl text-sm font-medium border transition ${
                      answers[q.id] === opt
                        ? "bg-purple-500 border-purple-300 text-white"
                        : "bg-white/10 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-bold py-3 rounded-2xl mt-4"
          >
            Submit Assessment
          </button>
        </>
      )}
    </div>
  );
}
