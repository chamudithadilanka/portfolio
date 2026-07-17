"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Home", color: "#a78bfa" },
  { id: "about", label: "About", color: "#a78bfa" },
  { id: "skills", label: "Skills", color: "#34d399" },
  { id: "projects", label: "Projects", color: "#fbbf24" },
  { id: "experience", label: "Experience", color: "#e879f9" },
  { id: "contact", label: "Contact", color: "#60a5fa" },
];

export default function ScrollPipeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setIsVisible(scrollTop > 100);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setActiveIdx(i);
          return;
        }
      }
      setActiveIdx(0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="zigzag-pipeline"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
      transition={{ duration: 0.4 }}
    >
      {sections.map((sec, i) => {
        const isActive = i === activeIdx;
        const isPast = i < activeIdx;
        const isEven = i % 2 === 0;
        const yPos = (i / (sections.length - 1)) * 100;

        return (
          <div key={sec.id} className="zigzag-row">
            {/* Left side node */}
            <div className={`zigzag-side ${isEven ? "active-side" : "empty-side"}`}>
              {isEven && (
                <div className="zigzag-node-wrap" style={{ "--node-color": sec.color } as React.CSSProperties}>
                  {isActive && <div className="zigzag-pulse" style={{ borderColor: sec.color }} />}
                  <div
                    className={`zigzag-dot ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
                    style={{
                      background: isActive || isPast ? sec.color : "var(--border-light)",
                      boxShadow: isActive ? `0 0 14px ${sec.color}90, 0 0 28px ${sec.color}40` : "none",
                    }}
                  />
                  <span
                    className="zigzag-label"
                    style={{
                      color: isActive ? sec.color : isPast ? "var(--text-tertiary)" : "var(--border-light)",
                    }}
                  >
                    {sec.label}
                  </span>
                </div>
              )}
            </div>

            {/* Center line segment */}
            <div className="zigzag-center">
              {/* Vertical connector */}
              <div className={`zigzag-vert-line ${isPast || isActive ? "filled" : ""}`} />
              {/* Horizontal glow arm */}
              <div
                className={`zigzag-horiz-arm ${isEven ? "to-left" : "to-right"} ${isPast || isActive ? "filled" : ""}`}
                style={{
                  "--arm-color": sec.color,
                  background: isPast || isActive
                    ? `linear-gradient(${isEven ? "270deg" : "90deg"}, ${sec.color}, transparent)`
                    : undefined,
                } as React.CSSProperties}
              />
              {/* Glow node in center */}
              {isActive && (
                <div
                  className="zigzag-center-glow"
                  style={{ background: sec.color, boxShadow: `0 0 20px ${sec.color}80, 0 0 40px ${sec.color}30` }}
                />
              )}
              <div
                className={`zigzag-center-dot ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
                style={{
                  background: isActive ? sec.color : isPast ? sec.color : "var(--border-light)",
                  boxShadow: isActive ? `0 0 12px ${sec.color}80` : "none",
                }}
              />
            </div>

            {/* Right side node */}
            <div className={`zigzag-side ${!isEven ? "active-side" : "empty-side"}`}>
              {!isEven && (
                <div className="zigzag-node-wrap right-align" style={{ "--node-color": sec.color } as React.CSSProperties}>
                  <span
                    className="zigzag-label"
                    style={{
                      color: isActive ? sec.color : isPast ? "var(--text-tertiary)" : "var(--border-light)",
                    }}
                  >
                    {sec.label}
                  </span>
                  <div
                    className={`zigzag-dot ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
                    style={{
                      background: isActive || isPast ? sec.color : "var(--border-light)",
                      boxShadow: isActive ? `0 0 14px ${sec.color}90, 0 0 28px ${sec.color}40` : "none",
                    }}
                  />
                  {isActive && <div className="zigzag-pulse" style={{ borderColor: sec.color }} />}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Glowing scroll head traveling along zig-zag path */}
      <div className="zigzag-head-track" style={{ height: `${scrollProgress * 100}%` }}>
        <div className="zigzag-head-glow" />
      </div>
    </motion.div>
  );
}
