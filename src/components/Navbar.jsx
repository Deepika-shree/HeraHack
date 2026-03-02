import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
      <Link to="/home" className="flex items-center gap-2">
        <img src="/src/assets/heroine.png" alt="logo" className="w-10 h-10" />
        <span className="font-bold text-gray-800 text-lg tracking-wide">SHE-RETURNS</span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-semibold text-gray-700">
        <Link to="/home" className="hover:text-purple-700 transition-colors">HOME</Link>
        <Link to="/reentry-form" className="hover:text-purple-700 transition-colors">RENTRY FORM</Link>
        <Link to="/dashboard" className="hover:text-purple-700 transition-colors">DASHBOARD</Link>
        <Link to="/scholarship" className="hover:text-purple-700 transition-colors">SCHOLARSHIP FORM</Link>
        <Link to="/about" className="hover:text-purple-700 transition-colors">ABOUT</Link>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-full font-semibold text-sm transition-all"
      >
        LOGOUT
      </button>
    </nav>
  );
};

export default Navbar;
