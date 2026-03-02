import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">

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

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-[#c9b8f0] px-10 py-10">
        <h1 className="text-2xl font-bold text-black mb-2">About Us</h1>
        <p className="text-gray-800 mb-8">
          Empowering women to restart their education and careers through personalized, AI-powered support
        </p>

        <h2 className="text-lg font-bold text-black mb-1">Our Mission</h2>
        <p className="text-gray-800 mb-8">
          To break down barriers for women and guide them back into education and the workforce
          with tailor-made reskilling roadmaps and scholarship assistance
        </p>

        <h2 className="text-lg font-bold text-black mb-1">Our Vision</h2>
        <p className="text-gray-800 mb-8">
          A world where every woman has the opportunity to learn, upskill, and secure a rewarding
          career, regardless of her past circumstances.
        </p>

        <h2 className="text-lg font-bold text-black mb-3">Why SHE-RETURNS?</h2>
        <div className="flex flex-col gap-2 mb-10">
          <p className="text-gray-800">🛡️ Support System</p>
          <p className="text-gray-800">🎓 Scholarship Access</p>
          <p className="text-gray-800">💡 Smart Technology</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-[#c9b8f0] border-t border-purple-300 px-10 py-6 flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-800 mb-2">Contact us</p>
          <div className="flex gap-8 text-sm text-gray-700">
            <span>Gmail: xxxx@gmail.co</span>
            <span>call: 987654321</span>
            <span>Linked-in: abcd</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌸</span>
          <span className="font-bold text-lg">SHE-RETURNS</span>
        </div>
      </div>

    </div>
  );
}
