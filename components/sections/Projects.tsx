"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ExternalLink, GitBranch, Brain, Smartphone } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";

const dermscanScreens = [
  { image: "/dermscan/splash_screen.png", color: "#f43f5e", glow: "rgba(244, 63, 94, 0.3)" },
  { image: "/dermscan/home_screen.png", color: "#a78bfa", glow: "rgba(167, 139, 250, 0.3)" },
  { image: "/dermscan/library_screen.png", color: "#34d399", glow: "rgba(52, 211, 153, 0.3)" },
  { image: "/dermscan/result_screen.png", color: "#60a5fa", glow: "rgba(96, 165, 250, 0.3)" },
  { image: "/dermscan/history.png", color: "#fbbf24", glow: "rgba(251, 191, 36, 0.3)" },
];

const smileytoothScreens = [
  { image: "/smileytooth/home_screen.jpeg", color: "#38bdf8", glow: "rgba(56, 189, 248, 0.3)" },
  { image: "/smileytooth/day_routing_screen.jpeg.jpeg", color: "#fbbf24", glow: "rgba(251, 191, 36, 0.3)" },
  { image: "/smileytooth/night_routing_screen.jpeg.jpeg", color: "#a78bfa", glow: "rgba(167, 139, 250, 0.3)" },
  { image: "/smileytooth/calender_and schedule.jpeg", color: "#34d399", glow: "rgba(52, 211, 153, 0.3)" },
  { image: "/smileytooth/notification_screen.jpeg", color: "#f472b6", glow: "rgba(244, 114, 182, 0.3)" },
];

function FeaturedProjectCard({
  project,
  screens,
  pageLink,
  icon: Icon,
}: {
  project: typeof portfolioData.projects[0];
  screens: typeof dermscanScreens;
  pageLink: string;
  icon: typeof Brain;
}) {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, screens.length]);

  const current = screens[activeScreen];

  const nextScreen = () => setActiveScreen((prev) => (prev + 1) % screens.length);
  const prevScreen = () => setActiveScreen((prev) => (prev - 1 + screens.length) % screens.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className="project-card featured"
      style={{
        "--card-accent": current.color,
        background: "var(--surface)",
        cursor: "pointer",
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Phone Section */}
      <div
        className="featured-phone-section"
        style={{
          position: "relative",
          padding: "1.5rem 1.5rem",
          background: `radial-gradient(ellipse at center, ${current.glow} 0%, transparent 70%)`,
          transition: "background 0.6s ease",
        }}
        onClick={(e) => {
          e.stopPropagation();
          nextScreen();
        }}
      >
        {/* Animated Background */}
        <div className="card-health-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="mini-cell mc-1" style={{ background: `radial-gradient(circle, ${current.glow} 0%, transparent 70%)` }} />
          <div className="mini-cell mc-2" style={{ background: `radial-gradient(circle, ${current.glow} 0%, transparent 70%)` }} />
          <div className="mini-cell mc-3" style={{ background: `radial-gradient(circle, ${current.glow} 0%, transparent 70%)` }} />
          <div className="mini-pulse mp-1" style={{ borderColor: `${current.color}30` }} />
          <div className="mini-pulse mp-2" style={{ borderColor: `${current.color}20` }} />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevScreen(); }}
          style={{
            position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
            width: 36, height: 36, borderRadius: "50%", border: "none",
            background: theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            color: theme === "dark" ? "#fff" : "#333", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 5, transition: "all 0.3s ease",
            opacity: isHovered ? 1 : 0,
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = current.color; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.background = theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.8)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextScreen(); }}
          style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
            width: 36, height: 36, borderRadius: "50%", border: "none",
            background: theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            color: theme === "dark" ? "#fff" : "#333", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 5, transition: "all 0.3s ease",
            opacity: isHovered ? 1 : 0,
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = current.color; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.background = theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.8)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Screen counter */}
        <div
          style={{
            position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: 6, zIndex: 3,
            padding: "6px 14px", borderRadius: 20,
            background: theme === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease, background 0.4s ease",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: current.color, boxShadow: `0 0 8px ${current.glow}` }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#fff" }}>
            {activeScreen + 1} / {screens.length}
          </span>
        </div>

        {/* Phone body */}
        <div
          style={{
            position: "relative", zIndex: 2, width: 280, margin: "0 auto",
            background: theme === "dark" ? "linear-gradient(145deg, #1c1c28, #0e0e16)" : "linear-gradient(145deg, #e8e8f0, #d0d0d8)",
            borderRadius: 44, padding: "18px",
            boxShadow: `0 0 0 1px ${current.glow}, 0 0 0 4px ${theme === "dark" ? "rgba(30, 30, 40, 0.9)" : "rgba(220, 220, 230, 0.9)"}, 0 50px 100px rgba(0, 0, 0, ${theme === "dark" ? "0.7" : "0.15"}), 0 0 70px ${current.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.06)`,
            transition: "box-shadow 0.6s ease, background 0.4s ease",
          }}
        >
          {/* Side buttons */}
          <div style={{ position: "absolute", right: -5, top: 130, width: 5, height: 80, background: theme === "dark" ? "linear-gradient(180deg, #2a2a38, #1a1a28)" : "linear-gradient(180deg, #ccc, #aaa)", borderRadius: "0 4px 4px 0" }} />
          <div style={{ position: "absolute", left: -5, top: 110, width: 5, height: 45, background: theme === "dark" ? "linear-gradient(180deg, #2a2a38, #1a1a28)" : "linear-gradient(180deg, #ccc, #aaa)", borderRadius: "4px 0 0 4px" }} />
          <div style={{ position: "absolute", left: -5, top: 165, width: 5, height: 45, background: theme === "dark" ? "linear-gradient(180deg, #2a2a38, #1a1a28)" : "linear-gradient(180deg, #ccc, #aaa)", borderRadius: "4px 0 0 4px" }} />

          {/* Screen */}
          <div style={{ width: "100%", aspectRatio: "9/19.5", borderRadius: 32, overflow: "hidden", position: "relative", background: theme === "dark" ? "#000" : "#f0f0f5" }}>
            {/* Dynamic Island */}
            <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 100, height: 30, borderRadius: 18, background: theme === "dark" ? "#000" : "#d0d0d8", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: theme === "dark" ? "#1a1a28" : "#bbb", border: `1px solid ${theme === "dark" ? "#252530" : "#aaa"}` }} />
            </div>

            {/* Screen content */}
            <img
              src={current.image}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.4s ease" }}
              loading="lazy"
            />

            {/* Reflection */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.015) 100%)", pointerEvents: "none", zIndex: 2 }} />
          </div>
        </div>

        {/* Screen indicators */}
        <div
          style={{
            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 10, zIndex: 5,
            padding: "10px 20px", borderRadius: 24,
            background: theme === "dark" ? "rgba(10, 10, 20, 0.8)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${current.color}30`,
            boxShadow: `0 4px 20px rgba(0, 0, 0, ${theme === "dark" ? "0.4" : "0.1"}), 0 0 20px ${current.glow}`,
            transition: "border-color 0.6s ease, box-shadow 0.6s ease, background 0.4s ease",
          }}
        >
          {screens.map((screen, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActiveScreen(i); }}
              style={{
                width: activeScreen === i ? 28 : 10, height: 10, borderRadius: 5, border: "none",
                background: activeScreen === i ? screen.color : "rgba(255,255,255,0.3)",
                cursor: "pointer", transition: "all 0.3s ease",
                boxShadow: activeScreen === i ? `0 0 12px ${screen.glow}` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div
        className="project-card-body"
        style={{ padding: "2rem 2.5rem" }}
        onClick={() => window.location.href = pageLink}
      >
        <div className="featured-badge" style={{ color: current.color, background: `${current.color}10`, borderColor: `${current.color}25` }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: current.color, animation: "pulse-glow 2s ease-in-out infinite" }} />
          Featured Project
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{
              width: 40, height: 40,
              background: `linear-gradient(135deg, ${current.color}20, ${current.color}08)`,
              border: `1px solid ${current.color}30`, color: current.color,
            }}
          >
            <Icon size={18} />
          </div>
          <h3 className="font-bold text-lg leading-tight" style={{ color: "var(--text)" }}>
            {project.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag" style={{ borderColor: `${current.color}20` }}>
              {t}
            </span>
          ))}
        </div>

        <div className="card-actions" style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-action-link group/link" onClick={(e) => e.stopPropagation()}>
            <GitBranch size={14} />
            Source
          </a>
          <Link href={pageLink} className="card-action-link group/link" onClick={(e) => e.stopPropagation()}>
            <ExternalLink size={14} />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const dermscan = portfolioData.projects[0];
  const smileytooth = portfolioData.projects[1];

  return (
    <section id="projects" style={{ background: "var(--bg-subtle)", position: "relative", overflow: "hidden" }}>
      {/* Neural Network Background */}
      <div className="section-neural-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="neural-node"
            style={{
              position: "absolute",
              width: 6 + (i % 3) * 2,
              height: 6 + (i % 3) * 2,
              borderRadius: "50%",
              background: `rgba(167, 139, 250, ${0.08 + (i % 5) * 0.02})`,
              border: `1px solid rgba(167, 139, 250, ${0.12 + (i % 4) * 0.02})`,
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7 + 10) % 90}%`,
              animation: `neuralFloat ${4 + (i % 3)}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="neural-line"
            style={{
              position: "absolute",
              height: 1,
              background: `linear-gradient(90deg, transparent, rgba(167, 139, 250, ${0.06 + (i % 3) * 0.02}), transparent)`,
              width: `${30 + (i % 4) * 15}%`,
              left: `${(i * 8) % 80}%`,
              top: `${(i * 11 + 5) % 85}%`,
              transform: `rotate(${i * 30}deg)`,
              animation: `neuralPulse ${5 + (i % 2)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Projects</div>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-desc mb-10">
            Featured AI/ML projects with dedicated deep-dive pages.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          <FeaturedProjectCard
            project={dermscan}
            screens={dermscanScreens}
            pageLink="/projects/dermscan"
            icon={Brain}
          />
          <FeaturedProjectCard
            project={smileytooth}
            screens={smileytoothScreens}
            pageLink="/projects/smileytooth"
            icon={Smartphone}
          />
        </div>
      </div>
    </section>
  );
}
