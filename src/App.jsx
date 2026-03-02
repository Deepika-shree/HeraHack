import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Scholarship from "./pages/Scholarship";
import About from "./pages/About";
import ReEntryForm from "./pages/ReEntryForm";
import Assessment from "./pages/Assessment";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />   {/* ← ADD HERE */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/ask-a-free-question" element={<Chatbot />} />  {/* ← ADD THIS */}
        <Route path="/about" element={<About />} />
        <Route path="/reentry-form" element={<ReEntryForm />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
