import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Scholarship from "./pages/Scholarship";
import About from "./pages/About";
import ReEntryForm from "./pages/ReEntryForm";
import Assessment from "./pages/Assessment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/about" element={<About />} />
        <Route path="/reentry-form" element={<ReEntryForm />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/dashboard" element={<div className="p-10 text-2xl font-bold text-purple-700">Dashboard coming soon! 🚀</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
