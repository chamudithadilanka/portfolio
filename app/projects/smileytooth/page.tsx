"use client";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  Smile,
  Target,
  Zap,
  Activity,
  ExternalLink,
  GitBranch,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const check = () => {
      const t = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
      setTheme(t || "dark");
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

const screenshots = [
  {
    title: "Home Dashboard",
    desc: "Main health dashboard displaying your dental score, upcoming appointments, recent scan history, and quick-action buttons for camera scan and booking.",
    image: "/smileytooth/home_screen.jpeg",
    tags: ["Dashboard", "Health Score"],
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  {
    title: "Day Theme Routing",
    desc: "Automatic day mode with bright, energetic UI — warm tones, morning brush reminders at 7:00 AM, and upbeat brushing sounds.",
    image: "/smileytooth/day_routing_screen.jpeg.jpeg",
    tags: ["Day Mode", "Dynamic Theme"],
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.4)",
  },
  {
    title: "Night Theme Routing",
    desc: "Automatic night mode with calm, dimmed UI — cool tones, evening floss reminders at 9:00 PM, and sleep-friendly low-blue-light filter.",
    image: "/smileytooth/night_routing_screen.jpeg.jpeg",
    tags: ["Night Mode", "Dynamic Theme"],
    color: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.4)",
  },
  {
    title: "Calendar & Scheduling",
    desc: "Smart appointment booking with dentist finder, real-time availability calendar, and automated confirmation notifications.",
    image: "/smileytooth/calender_and schedule.jpeg",
    tags: ["Booking", "Calendar"],
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.4)",
  },
  {
    title: "Smart Notifications",
    desc: "Intelligent reminder system with morning/night brushing alerts, dentist appointment notifications, and habit tracking streaks.",
    image: "/smileytooth/notification_screen.jpeg",
    tags: ["Reminders", "Alerts"],
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.4)",
  },
];

const glowColors = [
  { color: "#38bdf8", glow: "rgba(56, 189, 248, 0.5)" },
  { color: "#fbbf24", glow: "rgba(251, 191, 36, 0.5)" },
  { color: "#a78bfa", glow: "rgba(167, 139, 250, 0.5)" },
  { color: "#34d399", glow: "rgba(52, 211, 153, 0.5)" },
  { color: "#f472b6", glow: "rgba(244, 114, 182, 0.5)" },
];

function TimelineItem({ screen, index, total }: { screen: typeof screenshots[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const isLeft = index % 2 === 0;
  const color = screen.color;
  const glow = screen.glow;

  return (
    <div
      ref={ref}
      className="timeline-item"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isLeft ? "flex-end" : "flex-start",
        position: "relative",
        marginBottom: index < total - 1 ? "4rem" : 0,
        paddingLeft: isLeft ? 0 : "calc(50% + 40px)",
        paddingRight: isLeft ? "calc(50% + 40px)" : 0,
      }}
    >
      {/* Center dot */}
      <div
        className={`timeline-dot ${isInView ? "active" : ""}`}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `3px solid ${isInView ? color : "var(--border)"}`,
          background: isInView ? color : "var(--bg)",
          boxShadow: isInView ? `0 0 20px ${glow}, 0 0 40px ${glow}` : "none",
          transition: "all 0.4s ease",
          zIndex: 5,
        }}
      />

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="timeline-card"
        style={{
          width: "100%",
          maxWidth: 320,
          background: "var(--surface)",
          border: `1px solid ${isInView ? `${color}33` : "var(--border)"}`,
          borderRadius: 20,
          overflow: "hidden",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          boxShadow: isInView ? `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${glow}` : "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Phone frame */}
        <div style={{
          padding: "20px 20px 0",
          background: "linear-gradient(180deg, #0a0a14 0%, #101018 100%)",
          display: "flex",
          justifyContent: "center",
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: 240,
            background: "linear-gradient(145deg, #1c1c28, #0e0e16)",
            borderRadius: 38,
            padding: "14px",
            boxShadow: `
              0 0 0 1px ${glow},
              0 0 0 3px rgba(30, 30, 40, 0.9),
              0 25px 50px rgba(0, 0, 0, 0.5),
              0 0 35px ${glow},
              inset 0 1px 0 rgba(255, 255, 255, 0.06)
            `,
          }}>
            <div style={{ position: "absolute", right: -4, top: 110, width: 4, height: 65, background: "linear-gradient(180deg, #2a2a38, #1a1a28)", borderRadius: "0 3px 3px 0" }} />
            <div style={{ position: "absolute", left: -4, top: 90, width: 4, height: 38, background: "linear-gradient(180deg, #2a2a38, #1a1a28)", borderRadius: "3px 0 0 3px" }} />
            <div style={{ position: "absolute", left: -4, top: 140, width: 4, height: 38, background: "linear-gradient(180deg, #2a2a38, #1a1a28)", borderRadius: "3px 0 0 3px" }} />

            <div style={{
              width: "100%",
              aspectRatio: "9/19.5",
              borderRadius: 28,
              overflow: "hidden",
              position: "relative",
              background: "#000",
            }}>
              <div style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 85,
                height: 26,
                borderRadius: 14,
                background: "#000",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a1a28", border: "1px solid #252530" }} />
              </div>

              <img
                src={screen.image}
                alt={screen.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
                loading="lazy"
                onMouseEnter={(e) => {
                  (e.target as HTMLImageElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLImageElement).style.transform = "scale(1)";
                }}
              />

              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 28,
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.015) 100%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{
              width: 24,
              height: 24,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `${color}15`,
              border: `1px solid ${color}30`,
              color: color,
              fontSize: "0.7rem",
              fontWeight: 800,
              flexShrink: 0,
            }}>
              {index + 1}
            </span>
            <span style={{ fontSize: "1rem", fontWeight: 700 }}>
              {screen.title}
            </span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
            {screen.desc}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {screen.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6rem",
                  padding: "0.2rem 0.5rem",
                  borderRadius: 5,
                  background: `${color}10`,
                  border: `1px solid ${color}20`,
                  color: color,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SmileyToothPage() {
  const theme = useTheme();
  const handleScroll = () => {
    const timeline = document.querySelector(".timeline-container") as HTMLElement;
    const glowLine = document.querySelector(".timeline-line-glow") as HTMLElement;
    if (!timeline || !glowLine) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const timelineTop = rect.top;
    const timelineHeight = rect.height;

    const scrollProgress = Math.max(0, Math.min(1,
      (windowHeight * 0.5 - timelineTop) / timelineHeight
    ));

    glowLine.style.height = `${scrollProgress * 100}%`;

    const activeIndex = Math.min(
      glowColors.length - 1,
      Math.floor(scrollProgress * glowColors.length)
    );
    const active = glowColors[activeIndex];
    glowLine.style.background = `linear-gradient(180deg, ${glowColors[0].color}, ${active.color})`;
    glowLine.style.boxShadow = `0 0 12px ${active.glow}, 0 0 24px ${active.glow}`;
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background Animation - Dental Theme */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 40 + i * 10,
              height: 50 + i * 12,
              borderRadius: "40% 40% 50% 50%",
              background: `rgba(56, 189, 248, ${0.03 + i * 0.005})`,
              border: `1px solid rgba(56, 189, 248, ${0.06 + i * 0.01})`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${6 + i}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}

        {[...Array(3)].map((_, i) => (
          <div
            key={`pulse-${i}`}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "1px solid rgba(56, 189, 248, 0.08)",
              left: `${20 + i * 30}%`,
              top: `${30 + i * 15}%`,
              animation: `pulse-ring 4s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: theme === "dark" ? "rgba(6, 6, 10, 0.85)" : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="container mx-auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem",
          }}
        >
          <Link
            href="/#projects"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a
              href="https://github.com/chamudithadilanka"
              target="_blank"
              rel="noopener noreferrer"
              className="card-action-link"
              style={{ fontSize: "0.8rem" }}
            >
              <GitBranch size={14} />
              Source
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: "5rem 2rem 4rem" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.75rem",
                borderRadius: 6,
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#38bdf8",
                background: "rgba(56, 189, 248, 0.1)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#38bdf8",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              Main Project
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "1rem",
                letterSpacing: "-0.03em",
              }}
            >
              SmileyTooth –{" "}
              <span className="gradient-text">Dental Care App</span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 700,
                marginBottom: "1.5rem",
              }}
            >
              A fun and interactive dental health app for children and families — featuring
              brush reminders with voice guides, day/night themes, mood-based experiences,
              streak tracking, teeth image capture, and daily &amp; monthly health history.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              {["Flutter", "Dart", "AI/ML", "Hive", "GPT-OS 12"].map(
                (t) => (
                  <span key={t} className="tech-tag" style={{ fontSize: "0.75rem" }}>
                    {t}
                  </span>
                )
              )}
            </div>

            {/* Quick Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1rem",
                maxWidth: 600,
              }}
            >
              {[
                { icon: Target, label: "12+ Classes", desc: "Dental conditions" },
                { icon: Activity, label: "224x224", desc: "Input resolution" },
                { icon: Zap, label: "<2s", desc: "Analysis speed" },
                { icon: Smile, label: "92%+", desc: "Detection accuracy" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: 10,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <stat.icon size={18} style={{ color: "#38bdf8", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)" }}>
                      {stat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Screenshots - Vertical Timeline */}
      <section style={{ padding: "5rem 2rem", position: "relative" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em", textAlign: "center" }}>
              App Screenshots
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 600, textAlign: "center", margin: "0 auto 3rem" }}>
              Key screens from the SmileyTooth mobile application.
            </p>

            {/* Vertical Timeline Container */}
            <div className="timeline-container" style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
              <div className="timeline-line-track" style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 3,
                background: "var(--border)",
                borderRadius: 2,
                transform: "translateX(-50%)",
              }}>
                <div className="timeline-line-glow" style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "0%",
                  background: "linear-gradient(180deg, #38bdf8, #38bdf8)",
                  borderRadius: 2,
                  transition: "height 0.1s ease-out, background 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 0 12px rgba(56, 189, 248, 0.5), 0 0 24px rgba(56, 189, 248, 0.3)",
                }} />
              </div>

              {screenshots.map((screen, i) => (
                <TimelineItem key={screen.title} screen={screen} index={i} total={screenshots.length} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected Work */}
      <section style={{ padding: "5rem 2rem", background: "var(--bg-subtle)" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em", textAlign: "center" }}>
              Selected Work
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 600, textAlign: "center", margin: "0 auto 3rem" }}>
              Key features and technical highlights of the SmileyTooth application.
            </p>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <motion.div
                {...fadeUp}
                style={{
                  width: "100%",
                  maxWidth: 600,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid #38bdf820",
                  background: "var(--surface)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(56, 189, 248, 0.1)",
                  borderColor: "#38bdf840",
                }}
              >
                {/* Real Image */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/10",
                    overflow: "hidden",
                    background: "#0a0a14",
                    position: "relative",
                  }}
                >
                  <img
                    src="/smileytooth/home_screen.jpeg"
                    alt="SmileyTooth Dashboard"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease",
                    }}
                    loading="lazy"
                    onMouseEnter={(e) => {
                      (e.target as HTMLImageElement).style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLImageElement).style.transform = "scale(1)";
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                  }} />
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#38bdf815",
                        border: "1px solid #38bdf830",
                        color: "#38bdf8",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      1
                    </span>
                    <span style={{ fontSize: "1rem", fontWeight: 700 }}>
                      SmileyTooth – Dental Care App
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                    A fun and interactive dental health app for children and families — featuring brush reminders with voice guides, day/night themes, mood-based experiences, streak tracking, teeth image capture, and daily &amp; monthly health history.
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
                    {["Flutter", "Dart", "AI/ML", "Hive", "GPT-OS 12"].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.6rem",
                          padding: "0.2rem 0.5rem",
                          borderRadius: 5,
                          background: "#38bdf810",
                          border: "1px solid #38bdf820",
                          color: "#38bdf8",
                          fontWeight: 600,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "0.5rem",
                    padding: "0.6rem",
                    borderRadius: 8,
                    background: "#38bdf808",
                    border: "1px solid #38bdf815",
                  }}>
                    {[
                      { value: "92%+", label: "accuracy" },
                      { value: "<2s", label: "speed" },
                      { value: "12+", label: "classes" },
                    ].map((m) => (
                      <div key={m.label} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#38bdf8" }}>
                          {m.value}
                        </div>
                        <div style={{ fontSize: "0.55rem", color: "var(--text-tertiary)", textTransform: "capitalize" }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Features */}
      <section style={{ padding: "5rem 2rem" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em", textAlign: "center" }}>
              App Features
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 600, textAlign: "center", margin: "0 auto 3rem" }}>
              Everything your family needs for healthy teeth and gums.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {[
                {
                  icon: "🔔",
                  title: "Smart Reminders",
                  desc: "Morning and night brushing alerts with customizable notification schedules. Never miss a brushing session again.",
                  color: "#fbbf24",
                },
                {
                  icon: "📅",
                  title: "Schedule & Reschedule",
                  desc: "Plan your brushing routine and dentist appointments. Easily reschedule with one tap when plans change.",
                  color: "#34d399",
                },
                {
                  icon: "🌙",
                  title: "Day & Night Routing",
                  desc: "Automatic theme switching — bright and energetic during the day, calm and relaxing at night.",
                  color: "#a78bfa",
                },
                {
                  icon: "🪥",
                  title: "Brush Step Guide",
                  desc: "Animated step-by-step brushing guide with voice instructions for each mouth zone. 3 minutes of guided care.",
                  color: "#38bdf8",
                },
                {
                  icon: "😊",
                  title: "Dynamic Mood Changes",
                  desc: "The app adapts to your mood — sad, lovely, happy, or normal — with matching colors, sounds, and messages.",
                  color: "#f472b6",
                },
                {
                  icon: "🔥",
                  title: "Streaks & Expiry",
                  desc: "Track your brushing streaks and get alerts when it's time to replace your toothbrush. Build healthy habits.",
                  color: "#fb923c",
                },
                {
                  icon: "📷",
                  title: "Teeth Image Capture",
                  desc: "Take photos of your teeth to track changes over time. AI analyzes plaque, gum health, and tooth condition.",
                  color: "#22d3ee",
                },
                {
                  icon: "📊",
                  title: "Daily & Monthly History",
                  desc: "View your brushing history by day or month. Track progress, spot patterns, and share reports with your dentist.",
                  color: "#e879f9",
                },
                {
                  icon: "🤖",
                  title: "Mood-Aware AI Chatbot",
                  desc: "Chat with SmileyAI — it detects your mood and responds accordingly. Schedule appointments, ask dental questions, and get personalized explanations with a friendly voice.",
                  color: "#60a5fa",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{
                    padding: "1.25rem",
                    borderRadius: 14,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 12px 30px rgba(0,0,0,0.2), 0 0 20px ${feature.color}15`,
                    borderColor: `${feature.color}30`,
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{feature.icon}</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.35rem", color: feature.color }}>
                    {feature.title}
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 2rem" }}>
        <div className="container mx-auto">
          <motion.div
            {...fadeUp}
            style={{
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "center",
              padding: "2.5rem 2rem",
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(167, 139, 250, 0.08) 100%)",
              border: "1px solid var(--border)",
            }}
          >
            <Smile size={32} style={{ color: "#38bdf8", marginBottom: "1rem" }} />
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Interested in this project?
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto 1.5rem" }}>
              Check out the source code or get in touch to learn more about the implementation.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://github.com/chamudithadilanka"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <GitBranch size={16} />
                View Source
                <ExternalLink size={12} />
              </a>
              <Link
                href="/#projects"
                className="btn btn-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <ArrowLeft size={16} />
                Back to Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
