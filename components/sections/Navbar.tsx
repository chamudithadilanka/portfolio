"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";

const links = ["About", "Skills", "Projects", "Certifications", "Experience", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      // Detect active section
      const sections = links.map((l) => document.getElementById(l.toLowerCase()));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 150) {
          setActiveSection(links[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const navBg = theme === "dark"
    ? (scrolled ? "rgba(6, 6, 10, 0.85)" : "transparent")
    : (scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent");

  const linkColors = ["#a78bfa", "#34d399", "#fbbf24", "#fbbf24", "#e879f9", "#60a5fa"];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? navBg : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%) brightness(1.1)" : "none",
          borderBottom: scrolled ? "1px solid rgba(167, 139, 250, 0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)" : "none",
        }}
      >
        {/* Scroll progress bar */}
        <div className="scroll-progress-track">
          <motion.div
            className="scroll-progress-fill"
            style={{
              width: `${scrollProgress * 100}%`,
            }}
          />
          {/* Glowing head */}
          <motion.div
            className="scroll-progress-glow"
            style={{
              left: `${scrollProgress * 100}%`,
            }}
          />
        </div>

        <div className="container mx-auto h-16 flex items-center justify-between" style={{ padding: "0 24px" }}>
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-logo-text">CD</span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ gap: "8px" }}>
            {links.map((link, i) => {
              const isActive = activeSection === link;
              const color = linkColors[i % linkColors.length];
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="nav-link-item"
                  style={{
                    "--link-color": color,
                    color: isActive ? color : undefined,
                  } as React.CSSProperties}
                >
                  <span className="nav-link-text">{link}</span>
                  {/* Active glow underline */}
                  {isActive && (
                    <motion.div
                      className="nav-link-glow"
                      layoutId="navGlow"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      style={{ background: color, boxShadow: `0 0 12px ${color}80` }}
                    />
                  )}
                </button>
              );
            })}

            {/* Section dots pipeline (desktop) */}
            <div className="nav-pipeline">
              <div className="pipeline-track" />
              <motion.div
                className="pipeline-fill"
                style={{
                  height: `${scrollProgress * 100}%`,
                }}
              />
              {links.map((link, i) => {
                const color = linkColors[i % linkColors.length];
                const isActive = activeSection === link;
                const isPast = links.indexOf(activeSection) > i;
                return (
                  <div
                    key={link}
                    className="pipeline-dot-wrapper"
                    style={{ top: `${(i / (links.length - 1)) * 100}%` }}
                  >
                    <div
                      className={`pipeline-dot ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
                      style={{
                        background: isActive || isPast ? color : "var(--border-light)",
                        boxShadow: isActive ? `0 0 10px ${color}80` : "none",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              className="theme-toggle-btn"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={16} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <a
              href={`mailto:${portfolioData.email}`}
              className="btn btn-primary ml-2 text-sm"
              style={{ padding: "0.5rem 1.1rem", minHeight: "38px" }}
            >
              Let&apos;s Talk
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-1 md:hidden">
            <motion.button
              onClick={toggle}
              className="theme-toggle-btn"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              className="p-2 -mr-2"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{
                background: "rgba(16, 16, 24, 0.95)",
                backdropFilter: "blur(20px) saturate(180%)",
                borderLeft: "1px solid rgba(167, 139, 250, 0.1)",
                boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex items-center justify-end p-4">
                <button
                  onClick={() => setOpen(false)}
                  className="p-2"
                  style={{ minWidth: 44, minHeight: 44 }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile scroll pipeline */}
              <div className="px-6 pb-2">
                <div className="mobile-pipeline">
                  <div className="mobile-pipeline-track" />
                  <motion.div
                    className="mobile-pipeline-fill"
                    style={{ height: `${scrollProgress * 100}%` }}
                  />
                  {links.map((link, i) => {
                    const color = linkColors[i % linkColors.length];
                    const isActive = activeSection === link;
                    const isPast = links.indexOf(activeSection) > i;
                    return (
                      <div
                        key={link}
                        className="mobile-pipeline-dot-wrapper"
                        style={{ top: `${(i / (links.length - 1)) * 100}%` }}
                      >
                        <div
                          className={`pipeline-dot ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
                          style={{
                            background: isActive || isPast ? color : "var(--border-light)",
                            boxShadow: isActive ? `0 0 10px ${color}80` : "none",
                          }}
                        />
                        <span
                          className="mobile-pipeline-label"
                          style={{ color: isActive ? color : "var(--text-tertiary)" }}
                        >
                          {link}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1" />

              <div className="px-6 pb-8 pt-4">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="btn btn-primary w-full text-center"
                  onClick={() => setOpen(false)}
                  style={{
                    background: "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(124, 58, 237, 0.3))",
                    border: "1px solid rgba(167, 139, 250, 0.3)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
