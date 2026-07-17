"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
  time: string;
};

const quickReplies = [
  "What are your skills?",
  "Tell me about your projects",
  "What is your experience?",
  "How can I contact you?",
];

function getBotResponse(input: string): string {
  const msg = input.toLowerCase();

  // Greetings
  if (msg.match(/^(hi|hello|hey|sup|yo|hola|good morning|good evening|good afternoon)/)) {
    return `Hey there! 👋 I'm ${portfolioData.name}'s AI assistant. I can tell you about his skills, projects, experience, or how to get in touch. What would you like to know?`;
  }

  // Name / who
  if (msg.includes("who") || msg.includes("your name") || msg.includes("about you") || msg.includes("tell me about yourself")) {
    return `${portfolioData.name} is a ${portfolioData.title} from Sri Lanka 🇱🇰 with 10+ years of experience. He specializes in building intelligent, pixel-perfect mobile applications using Flutter, React, Python, and cutting-edge AI/ML technologies.`;
  }

  // Skills
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("stack") || msg.includes("know") || msg.includes("tool")) {
    return `🔧 His core skills:\n\n• Flutter / Dart — 95%\n• React / Next.js — 94%\n• JavaScript — 96%\n• Node.js — 92%\n• Python — 88%\n• Tailwind CSS — 95%\n• MongoDB / MERN — 90%\n• Responsive Design — 98%\n\nHe's particularly strong in AI/ML integration with mobile apps using Python, OpenCV, and MediaPipe.`;
  }

  // AI / ML
  if (msg.includes("ai") || msg.includes("ml") || msg.includes("machine learning") || msg.includes("artificial intelligence") || msg.includes("deep learning")) {
    return `🤖 AI/ML is his specialty! He's built:\n\n• Smart Student Attendance System — facial recognition with Python & OpenCV\n• AI Rock Paper Scissors — real-time hand gesture detection with MediaPipe\n\nHe integrates AI models into production mobile apps for real-world use cases.`;
  }

  // Flutter / Mobile
  if (msg.includes("flutter") || msg.includes("mobile") || msg.includes("app") || msg.includes("dart")) {
    return `📱 Mobile development is his core expertise! He's built:\n\n• E-Tuition Flutter App — full e-learning platform\n• Workout UI App — sleek fitness tracking UI\n• Nimbus Venture Assignment — advanced Flutter components\n\nFlutter, Dart, and responsive mobile design are his bread and butter.`;
  }

  // Projects
  if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio") || msg.includes("built")) {
    return `🚀 He has 9+ featured projects:\n\n• DermScan – Skin Cancer Detection (AI/ML, Flutter, Flask) ⭐ Main Project\n• Smart Attendance (AI/ML)\n• AI Rock Paper Scissors (Computer Vision)\n• E-Tuition Flutter App\n• House Design App (MERN)\n• Workout UI App\n• Fashion Website\n• Nimbus Venture Flutter\n• Backend API (Node.js)\n\nCheck out the Projects section for details and GitHub links!`;
  }

  // Experience
  if (msg.includes("experience") || msg.includes("work") || msg.includes("career") || msg.includes("job") || msg.includes("year")) {
    return `💼 6 months intensive training:\n\n• Flutter & Node.js Developer — Industrial Training\n• AI/ML Mobile App Developer — Training Projects\n• Full Stack Developer — Personal Projects\n\nBuilt AI-powered mobile apps and websites with clean architecture.`;
  }

  // Education
  if (msg.includes("education") || msg.includes("university") || msg.includes("degree") || msg.includes("study") || msg.includes("school")) {
    return `🎓 Currently pursuing BSc in Computer Science / IT at the University of Sri Lanka (2022-Present), combined with 6 months intensive Flutter & Node.js training.`;
  }

  // Contact
  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("hire") || msg.includes("available")) {
    return `📬 Get in touch:\n\n• Email: ${portfolioData.email}\n• LinkedIn: linkedin.com/in/chamuditha-dilanka\n• GitHub: github.com/chamudithadilanka\n\nHe's currently available for AI/ML and mobile development projects!`;
  }

  // Price / cost / budget
  if (msg.includes("price") || msg.includes("cost") || msg.includes("budget") || msg.includes("rate") || msg.includes("charge")) {
    return `💰 Pricing depends on the project scope. He's open to discussing fixed-price or hourly rates. Reach out via email at ${portfolioData.email} with your project details and he'll get back to you!`;
  }

  // Location
  if (msg.includes("where") || msg.includes("location") || msg.includes("from") || msg.includes("country")) {
    return `📍 He's based in Sri Lanka 🇱🇰 and works remotely with clients worldwide. Time zone is IST (UTC+5:30).`;
  }

  // Thanks
  if (msg.includes("thank") || msg.includes("thanks") || msg.includes("thx")) {
    return `You're welcome! 😊 If you have any other questions about ${portfolioData.name}'s work, feel free to ask. Or reach out directly at ${portfolioData.email}!`;
  }

  // Help
  if (msg.includes("help") || msg.includes("what can") || msg.includes("options")) {
    return `I can help you with:\n\n• 🔧 Skills & tech stack\n• 🤖 AI/ML projects\n• 📱 Mobile development\n• 🚀 Featured projects\n• 💼 Work experience\n• 🎓 Education\n• 📬 Contact info\n\nJust ask anything!`;
  }

  // Default
  const defaults = [
    `I'd be happy to tell you more! Try asking about his skills, projects, AI/ML work, experience, or how to contact him.`,
    `Great question! I can help with info about his skills, projects, experience, or contact details. What interests you?`,
    `Hmm, I'm not sure about that specific topic. But I know a lot about his tech stack, projects, and experience! Try asking about those.`,
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: `Hi! 👋 I'm ${portfolioData.name}'s AI assistant. Ask me about his skills, projects, experience, or anything else!`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: getBotResponse(text),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="ai-chat-toggle"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="ai-chat-toggle-icon">
              <Bot size={22} />
              <span className="ai-chat-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-left">
                <div className="ai-chat-avatar">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="ai-chat-name">AI Assistant</div>
                  <div className="ai-chat-status">
                    <span className="ai-chat-online-dot" />
                    Always online
                  </div>
                </div>
              </div>
              <div className="ai-chat-header-right">
                <Sparkles size={14} style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: "0.65rem", color: "var(--text-tertiary)" }}>AI Powered</span>
              </div>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`ai-chat-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.role === "bot" && (
                    <div className="ai-chat-msg-avatar">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className="ai-chat-bubble">
                    <div className="ai-chat-text">{msg.text}</div>
                    <div className="ai-chat-time">{msg.time}</div>
                  </div>
                  {msg.role === "user" && (
                    <div className="ai-chat-msg-avatar user-avatar">
                      <User size={14} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="ai-chat-msg bot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="ai-chat-msg-avatar">
                    <Bot size={14} />
                  </div>
                  <div className="ai-chat-bubble typing">
                    <div className="typing-dots">
                      <span /><span /><span />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEnd} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="ai-chat-quick">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    className="ai-chat-quick-btn"
                    onClick={() => sendMessage(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              className="ai-chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="ai-chat-field"
              />
              <motion.button
                type="submit"
                className="ai-chat-send"
                disabled={!input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
