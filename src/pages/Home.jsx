import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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

      {/* HERO SECTION */}
      <div className="bg-[#d8c9f0] mx-6 mt-6 rounded-2xl px-10 py-8 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black mb-1">Welcome, SHE-RETURNS !</h1>
          <p className="text-sm italic text-gray-700 mb-6">Restart Your Education. Reclaim Your Future.</p>

          {/* Progress Report */}
          <div className="bg-white rounded-xl px-6 py-5 max-w-md">
            <p className="font-semibold text-gray-800 mb-3">Here's Your Progress Report:</p>
            {[
              "Skills Assessment Completed",
              "Learning Pathway Ready",
              "Scholarship Matches Found",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-2">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 bg-[#e8705a] hover:bg-[#d45f49] text-white px-6 py-2 rounded-full text-sm font-semibold transition"
            >
              View Dashboard
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-52 h-44 flex-shrink-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
            alt="woman studying"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="grid grid-cols-3 gap-6 px-6 mt-8 mb-10">
        {[
          {
            title: "Personalized Learning Roadmap",
            desc: "Get a Custom Plan To Reskill And Upskill",
            img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&q=80",
            route: "/dashboard",
          },
          {
            title: "Scholarship Opportunities",
            desc: "Find Scholarship That Match Your Profile",
            img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=300&q=80",
            route: "/scholarship",
          },
          {
            title: "Upcoming Study Schedule",
            desc: "Plan Study Time Around Your Life",
            img: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=300&q=80",
            route: "/schedule",
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img src={card.img} alt={card.title} className="w-full h-40 object-cover" />
            <div className="px-5 py-4">
              <h3 className="font-bold italic text-gray-800 text-base mb-1">{card.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{card.desc}</p>
              <button
                onClick={() => navigate(card.route)}
                className="bg-[#7e57c2] hover:bg-[#6a3fbf] text-white px-6 py-2 rounded-full text-sm font-semibold transition"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
