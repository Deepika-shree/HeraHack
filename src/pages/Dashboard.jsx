import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const recentActivities = [
    { icon: "📋", text: "Scholarship form submitted" },
    { icon: "✅", text: "Re-entry request approved" },
    { icon: "👤", text: "Profile updated successfully" },
    { icon: "🌸", text: "Joined SHE-RETURNS" },
  ];

  const courses = [
    { name: "Excel for Beginners", icon: "📊", color: "bg-green-100 text-green-700" },
    { name: "Python for Everyone", icon: "🐍", color: "bg-blue-100 text-blue-700" },
    { name: "C for Everyone", icon: "💻", color: "bg-orange-100 text-orange-700" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c4b5fd" }}>
      <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50">
          <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            <span className="bg-purple-100 p-2 rounded-lg">📁</span>
            Application Status
          </h2>
          <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">
              ✓
            </div>
            <div>
              <p className="font-bold text-green-700 text-lg">Approved</p>
              <p className="text-green-600 text-sm">Your re-entry request has been approved</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              to="/ask-a-free-question"
              className="bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-3 rounded-xl text-sm font-semibold transition-all"
            >
              💬 Ask Coach
            </Link>
            <Link
              to="/assessment"
              className="bg-pink-500 hover:bg-pink-600 text-white text-center py-2 px-3 rounded-xl text-sm font-semibold transition-all"
            >
              📝 Assessment
            </Link>
          </div>
        </div>

        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50">
          <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            <span className="bg-purple-100 p-2 rounded-lg">📚</span>
            Recommended Courses
          </h2>
          <div className="space-y-3">
            {courses.map((course, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${course.color} font-medium`}>
                <span className="text-xl">{course.icon}</span>
                <span>{course.name}</span>
                <span className="ml-auto text-xs opacity-70">Free →</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50">
          <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            <span className="bg-purple-100 p-2 rounded-lg">🕐</span>
            Recent Activities
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-purple-100 last:border-0">
                <span className="text-xl">{activity.icon}</span>
                <span className="text-gray-700 text-sm">{activity.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-50">
          <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            <span className="bg-purple-100 p-2 rounded-lg">🚀</span>
            Skill Development
          </h2>
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Complete Given Courses</span>
                <span className="text-purple-700 font-bold">60%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Assessment Completion</span>
                <span className="text-pink-700 font-bold">35%</span>
              </div>
              <div className="w-full bg-pink-100 rounded-full h-2.5">
                <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
          </div>
          <p className="text-purple-700 text-sm font-medium">🌱 Keep learning to expand your skills!</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
