import { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const sessionId = useRef(`session_${Date.now()}`);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          session_id: sessionId.current,
          context: "career guidance for women returning to work",
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Couldn't connect. Is Flask running on port 5000?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#c4b5fd" }}>
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="flex justify-center items-center h-full mt-32">
            <p className="text-purple-900 text-xl font-semibold opacity-50 text-center"
              style={{ fontFamily: "Georgia, serif" }}>
              Your personal career coach is here.<br />Ask me anything!
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "bot" && (
              <div className="w-8 h-8 rounded-full bg-purple-800 text-white flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">
                🌸
              </div>
            )}
            <div className={`max-w-lg px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === "user"
                ? "bg-purple-700 text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none"
            }`}>
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-purple-900 text-white flex items-center justify-center text-sm ml-2 mt-1 flex-shrink-0">
                👤
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-800 text-white flex items-center justify-center text-sm flex-shrink-0">
              🌸
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="px-6 pb-8 pt-4">
        <div className="flex items-center bg-gray-200 rounded-full px-6 py-4 shadow-inner max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything......?"
            className="flex-1 bg-transparent outline-none text-gray-700 text-base"
            style={{ fontFamily: "Georgia, serif", fontWeight: "600" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="ml-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40 transition-all"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
