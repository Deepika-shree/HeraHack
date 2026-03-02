import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroine from "../assets/heroine.png"; // replace with your actual image

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();
  navigate("/Home");  // ← change from /dashboard to /home
};


  return (
    <div className="flex h-screen w-full">

      {/* LEFT PANEL - Purple */}
      <div className="w-5/12 bg-[#b39ddb] flex flex-col justify-center items-start px-12 gap-6">
        <h1 className="text-4xl font-bold text-black tracking-wide">
          SHE-RETURNS
        </h1>

        <div className="bg-white p-4 rounded-md shadow-md w-48 h-52 flex items-center justify-center">
          <img
            src={heroine}
            alt="SHE-RETURNS Logo"
            className="object-contain w-full h-full"
          />
        </div>

        <p className="text-base font-semibold text-black italic max-w-xs leading-relaxed">
          "Because every woman deserves to reach her destination"
        </p>
      </div>

      {/* RIGHT PANEL - Gray */}
      <div className="w-7/12 bg-[#d9d9d9] flex flex-col justify-center items-start px-20">
        <h2 className="text-5xl font-serif font-semibold text-black mb-1">
          Login.
        </h2>
        <p className="text-sm text-gray-600 mb-8">
          Continue your journey with SHE-RETURNS
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">

          {/* Email */}
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-400 bg-[#d9d9d9] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-400 bg-[#d9d9d9] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-purple-500 w-4 h-4"
            />
            Remember me
          </label>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#9575cd] hover:bg-[#7e57c2] text-white font-semibold rounded-md transition duration-200"
          >
            Sign-in
          </button>

          {/* Create Account */}
          <p
            onClick={() => navigate("/register")}
            className="text-sm text-gray-600 cursor-pointer hover:text-purple-700 hover:underline mt-1"
          >
            create account?
          </p>

        </form>
      </div>
    </div>
  );
}
