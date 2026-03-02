import { useState } from "react";
import { useNavigate } from "react-router-dom";

const scholarships = [
  {
    id: 1,
    name: "AICTE Pragati Scholarship",
    education: "PG",
    income: 500000,
    state: "Maharashtra",
    field: "Business Management",
    mode: "Online",
  },
  {
    id: 2,
    name: "Women Entrepreneurship Grant",
    education: "UG",
    income: 300000,
    state: "Tamil Nadu",
    field: "Business Management",
    mode: "Online",
  },
  {
    id: 3,
    name: "Dell Women's Entrepreneur Network Award",
    education: "PG",
    income: 800000,
    state: "Karnataka",
    field: "Technology",
    mode: "Hybrid",
  },
];

export default function Scholarship() {
  const navigate = useNavigate();
  const [education, setEducation] = useState("All");
  const [income, setIncome] = useState("All");
  const [state, setState] = useState("All");
  const [field, setField] = useState("All");
  const [mode, setMode] = useState("All");

  const filtered = scholarships.filter((s) => {
    return (
      (education === "All" || s.education === education) &&
      (state === "All" || s.state === state) &&
      (field === "All" || s.field === field) &&
      (mode === "All" || s.mode === mode)
    );
  });

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
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
          <button
            onClick={() => navigate("/login")}
            className="bg-[#e8705a] hover:bg-[#d45f49] text-white px-5 py-2 rounded-full font-semibold transition"
          >
            LOGOUT
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div className="bg-[#c9b8f0] px-10 pt-8 pb-6">
        <h1 className="text-3xl font-bold text-black mb-1">Smart Scholarship Matching</h1>
        <p className="text-sm text-gray-700 mb-6">
          Find Scholarships Tailored To Your Profile, Goals, And Eligibility.
        </p>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl px-6 py-5 max-w-3xl">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="font-semibold text-gray-700 w-20">Education:</span>
            {["All", "UG", "PG", "Diploma"].map((opt) => (
              <button
                key={opt}
                onClick={() => setEducation(opt)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  education === opt
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-gray-700 w-20">Income:</span>
            {["All", "Tamil Nadu", "Maharashtra", "Karnataka"].map((opt) => (
              <button
                key={opt}
                onClick={() => setState(opt)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  state === opt
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
                }`}
              >
                {opt}
              </button>
            ))}
            {["Business Management", "Technology"].map((opt) => (
              <button
                key={opt}
                onClick={() => setField(opt)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  field === opt
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
                }`}
              >
                {opt}
              </button>
            ))}
            {["Online", "Hybrid"].map((opt) => (
              <button
                key={opt}
                onClick={() => setMode(opt)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  mode === opt
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SCHOLARSHIP CARDS */}
      <div className="grid grid-cols-3 gap-6 px-10 mt-8 mb-10">
        {filtered.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center mt-10">
            No scholarships match your filters.
          </p>
        ) : (
          filtered.map((s) => (
            <div
              key={s.id}
              className="bg-[#e8e0f7] rounded-2xl p-6 flex flex-col justify-between min-h-64"
            >
              <h3 className="font-bold text-gray-800 text-lg mb-2">{s.name}</h3>
              <div className="flex flex-col gap-1 text-sm text-gray-600 mb-4">
                <span>🎓 {s.education}</span>
                <span>📍 {s.state}</span>
                <span>📚 {s.field}</span>
                <span>💻 {s.mode}</span>
              </div>
              <div className="flex gap-3 mt-auto">
                <button className="bg-[#4a4a6a] hover:bg-[#3a3a5a] text-white px-4 py-2 rounded-md text-sm font-semibold transition">
                  View Details
                </button>
                <button className="bg-[#e8705a] hover:bg-[#d45f49] text-white px-4 py-2 rounded-md text-sm font-semibold transition">
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
