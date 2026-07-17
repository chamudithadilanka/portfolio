"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, GitBranch, Globe, Mail, Sparkles, Brain, Smartphone } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";
import dynamic from "next/dynamic";

const NeuralScene = dynamic(() => import("@/components/three/NeuralScene"), { ssr: false });

const phoneScreens = [
  { image: "/my_image.jpg", label: "Profile" },
  { image: "/smileytooth/home_screen.jpeg", label: "SmileyTooth" },
  { image: "/smileytooth/splash_screen.png", label: "Splash Screen" },
];

const socials = [
  { icon: GitBranch, href: portfolioData.github, label: "GitHub" },
  { icon: Globe, href: portfolioData.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${portfolioData.email}`, label: "Email" },
];

const techBadges = [
  { icon: Brain, label: "AI/ML", color: "#a78bfa" },
  { icon: Smartphone, label: "Mobile", color: "#34d399" },
  { icon: Globe, label: "Web Sites", color: "#fbbf24" },
];

const rotatingTexts = [
  { text: "Mobile Applications", color: "#34d399" },
  { text: "Fullstack Websites", color: "#60a5fa" },
  { text: "AI & ML Applications", color: "#a78bfa" },
];

const layer = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [typedName, setTypedName] = useState("");
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const phoneY = useTransform(scrollY, [0, 500], [0, -60]);
  const phoneRotate = useTransform(scrollY, [0, 500], [0, -8]);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScreenIndex((prev) => (prev + 1) % phoneScreens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for name - loops every 5s
  useEffect(() => {
    const fullName = "I'm Chamuditha Dilanka";
    let i = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        setTypedName(fullName.slice(0, i));
        i++;
        if (i > fullName.length) {
          // Pause before deleting
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 5000);
          return;
        }
        timeoutId = setTimeout(type, 80);
      } else {
        setTypedName(fullName.slice(0, i));
        i--;
        if (i < 0) {
          isDeleting = false;
          i = 0;
          // Pause before typing again
          timeoutId = setTimeout(type, 500);
          return;
        }
        timeoutId = setTimeout(type, 40);
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "80px", paddingBottom: "40px", background: theme === "dark" ? "#06060a" : "#f8f9fc" }}>
      {/* 3D Neural Network Background — parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <NeuralScene />
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="hero-bg-orbs" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        <div className="hero-orb orb-4" />
      </div>

      {/* Network Animation Background */}
      <div className="hero-network" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Network Nodes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="network-node"
            style={{
              position: "absolute",
              width: 6 + (i % 4) * 2,
              height: 6 + (i % 4) * 2,
              borderRadius: "50%",
              background: `rgba(167, 139, 250, ${0.3 + (i % 5) * 0.1})`,
              boxShadow: `0 0 ${8 + (i % 3) * 4}px rgba(167, 139, 250, ${0.2 + (i % 4) * 0.1})`,
              left: `${(i * 7 + 5) % 90}%`,
              top: `${(i * 11 + 15) % 80}%`,
              animation: `networkPulse ${3 + (i % 3)}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        {/* Network Lines - SVG */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgba(167, 139, 250, 0.3)" }} />
              <stop offset="50%" style={{ stopColor: "rgba(56, 189, 248, 0.2)" }} />
              <stop offset="100%" style={{ stopColor: "rgba(167, 139, 250, 0.3)" }} />
            </linearGradient>
          </defs>
          {[...Array(12)].map((_, i) => {
            const x1 = ((i * 8 + 10) % 85);
            const y1 = ((i * 12 + 20) % 75);
            const x2 = ((i * 8 + 10 + 15 + (i % 3) * 10) % 90);
            const y2 = ((i * 12 + 20 + 10 + (i % 4) * 8) % 80);
            return (
              <line
                key={`line-${i}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#lineGrad)"
                strokeWidth="1"
                className="network-line"
                style={{
                  animation: `lineFlow ${4 + (i % 2)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Floating particles */}
      <div className="hero-particles" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: 3 + (i % 4) * 2,
              height: 3 + (i % 4) * 2,
              borderRadius: "50%",
              background: `rgba(167, 139, 250, ${0.2 + (i % 5) * 0.1})`,
              left: `${(i * 5 + 2) % 100}%`,
              top: `${(i * 7 + 10) % 90}%`,
              animation: `heroFloat ${4 + (i % 3)}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Blur Boxes Animation */}
      <div className="hero-blur-boxes" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={`blur-${i}`}
            style={{
              position: "absolute",
              width: 60 + (i % 4) * 40,
              height: 60 + (i % 4) * 40,
              borderRadius: i % 2 === 0 ? "20%" : "50%",
              background: `linear-gradient(135deg, rgba(167, 139, 250, ${0.04 + (i % 3) * 0.02}), rgba(56, 189, 248, ${0.03 + (i % 4) * 0.01}))`,
              filter: "blur(20px)",
              left: `${(i * 12 + 5) % 85}%`,
              top: `${(i * 15 + 10) % 80}%`,
              animation: `blurFloat ${6 + (i % 3)}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating Circles */}
      <div className="hero-circles" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={`circle-${i}`}
            style={{
              position: "absolute",
              width: 100 + i * 60,
              height: 100 + i * 60,
              borderRadius: "50%",
              border: `1px solid rgba(167, 139, 250, ${0.08 - i * 0.01})`,
              left: `${50 - (100 + i * 60) / 2 / window?.innerWidth * 100 || 20}%`,
              top: `${50 - (100 + i * 60) / 2 / 800 * 100 || 30}%`,
              animation: `rotateCircle ${20 + i * 5}s linear infinite${i % 2 === 0 ? "" : " reverse"}`,
            }}
          />
        ))}
      </div>

      {/* Hexagon Shapes */}
      <div className="hero-hexagons" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[...Array(4)].map((_, i) => (
          <div
            key={`hex-${i}`}
            style={{
              position: "absolute",
              width: 30 + i * 10,
              height: 30 + i * 10,
              background: "transparent",
              border: `1px solid rgba(56, 189, 248, ${0.1 + i * 0.02})`,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              left: `${(i * 20 + 10) % 80}%`,
              top: `${(i * 25 + 15) % 70}%`,
              animation: `hexFloat ${5 + i * 2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Animated grid lines */}
      <div className="hero-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03 }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(167, 139, 250, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167, 139, 250, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "heroGridMove 20s linear infinite",
        }} />
      </div>

      {/* Gradient overlays */}
      <div className="hero-gradient-overlay" />
      <div className="hero-gradient-bottom" />

      <div className="container mx-auto w-full relative z-10">
        {/* Mobile: stacked layers. Desktop: 2-col grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ============ LEFT CONTENT ============ */}
          <div className="flex flex-col" style={{ gap: "8px" }}>
            {/* Layer 1: Status label */}
            <motion.div
              variants={layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="section-label"
            >
              <span className="pulse-dot" />
              Available for AI & Mobile Projects
            </motion.div>

            {/* Layer 2: Headline */}
            <motion.h1
              variants={layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]"
              style={{ letterSpacing: "-0.03em" }}
            >
              <span className="hero-name-typing">
                {typedName}
              </span>
              <br />
              I build{" "}
              <span className="hero-rotating-text-wrapper">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="hero-rotating-text"
                    style={{ color: rotatingTexts[textIndex].color }}
                  >
                    {rotatingTexts[textIndex].text}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Layer 3: Title */}
            <motion.p
              variants={layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {portfolioData.title}
            </motion.p>

            {/* Layer 4: Tagline */}
            <motion.p
              variants={layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-lg leading-relaxed"
              style={{ color: "var(--text-tertiary)" }}
            >
              {portfolioData.tagline}
            </motion.p>

            {/* Layer 4.5: Training & Fast Delivery Info */}
            <motion.div
              variants={layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap"
              style={{ gap: "12px" }}
            >
              <div className="hero-info-badge hib-training">
                <div className="hib-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div className="hib-content">
                  <span className="hib-title">6 Month Training</span>
                  <span className="hib-subtitle">Flutter & Node.js</span>
                </div>
              </div>
              <div className="hero-info-badge hib-fast">
                <div className="hib-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <div className="hib-content">
                  <span className="hib-title">Clean Architecture</span>
                  <span className="hib-subtitle">AI-Powered Apps</span>
                </div>
              </div>
            </motion.div>

            {/* Layer 5: Tech badges */}
            <motion.div
              variants={layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap"
              style={{ gap: "12px" }}
            >
              {techBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="tech-badge"
                  style={{ "--badge-color": badge.color } as React.CSSProperties}
                >
                  <badge.icon size={16} />
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>

            {/* Layer 6: Buttons */}
            <motion.div
              variants={layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap"
              style={{ gap: "16px" }}
            >
              <motion.button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn btn-primary btn-glow"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <ArrowRight size={18} />
              </motion.button>
              <motion.a
                href="#"
                download
                className="btn btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Download CV
              </motion.a>
            </motion.div>

            {/* Layer 7: Social icons */}
            <motion.div
              variants={layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center"
              style={{ gap: "12px" }}
            >
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon-link magnetic-btn"
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -5, scale: 1.1, boxShadow: "0 8px 25px rgba(167, 139, 250, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ============ RIGHT: 3D PHONE ============ */}
          <motion.div
            variants={layer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center md:justify-end"
            style={{ y: phoneY, rotateZ: phoneRotate }}
          >
            <div className="hero-phone-scene">
              {/* Background glow */}
              <div className="hero-phone-glow" />

              {/* Floating particles */}
              <motion.div className="hero-particle hp-1" animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="hero-particle hp-2" animate={{ y: [8, -8, 8], x: [4, -4, 4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} />
              <motion.div className="hero-particle hp-3" animate={{ y: [-6, 12, -6], x: [-3, 6, -3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} />
              <motion.div className="hero-particle hp-4" animate={{ y: [5, -10, 5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />

              {/* iPhone Frame */}
              <motion.div
                className="hero-iphone-frame"
                animate={{ y: [-8, 8, -8], rotateY: [-3, 3, -3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* iPhone body */}
                <div className="hero-iphone-body">
                  {/* Side buttons */}
                  <div className="hero-iphone-btn-power" />
                  <div className="hero-iphone-btn-vol-up" />
                  <div className="hero-iphone-btn-vol-down" />
                  <div className="hero-iphone-btn-mute" />

                  {/* Screen */}
                  <div className="hero-iphone-screen">
                    {/* Dynamic Island */}
                    <div className="hero-iphone-dynamic-island">
                      <div className="hero-iphone-camera" />
                    </div>

                    {/* Screen content - animated cycling */}
                    <div className="hero-iphone-image-container">
                      {phoneScreens.map((screen, i) => (
                        <img
                          key={screen.image}
                          src={screen.image}
                          alt={screen.label}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: screenIndex === i ? 1 : 0,
                            transition: "opacity 0.6s ease-in-out",
                          }}
                        />
                      ))}
                      {/* Screen label */}
                      <div style={{
                        position: "absolute",
                        bottom: 40,
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "4px 12px",
                        borderRadius: 12,
                        background: "rgba(0,0,0,0.6)",
                        backdropFilter: "blur(8px)",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        color: "#fff",
                        whiteSpace: "nowrap",
                        zIndex: 5,
                      }}>
                        {phoneScreens[screenIndex].label}
                      </div>
                      {/* Gradient overlay at bottom */}
                      <div className="hero-iphone-image-overlay" />
                    </div>

                    {/* Home indicator */}
                    <div className="hero-iphone-home-indicator" />
                  </div>
                </div>

                {/* Reflection */}
                <div className="hero-iphone-reflection" />
              </motion.div>

              {/* Orbiting Tech Logos */}
              <div className="hero-orbit-container">
                {/* Orbit path 1 */}
                <div className="hero-orbit-path orbit-1" />
                {/* Orbit path 2 */}
                <div className="hero-orbit-path orbit-2" />

                {/* Orbiting logos with actual images */}
                <div className="orbit-item orbit-item-1">
                  <div className="orbit-logo">
                    <img src="/logos/flutter.png" alt="Flutter" />
                  </div>
                </div>
                <div className="orbit-item orbit-item-2">
                  <div className="orbit-logo">
                    <img src="/logos/python.png" alt="Python" />
                  </div>
                </div>
                <div className="orbit-item orbit-item-3">
                  <div className="orbit-logo">
                    <img src="/logos/nextjs.png" alt="Next.js" />
                  </div>
                </div>
                <div className="orbit-item orbit-item-4">
                  <div className="orbit-logo">
                    <img src="/logos/nest.png" alt="NestJS" />
                  </div>
                </div>
                <div className="orbit-item orbit-item-5">
                  <div className="orbit-logo">
                    <img src="/logos/flutter.png" alt="Flutter" />
                  </div>
                </div>
                <div className="orbit-item orbit-item-6">
                  <div className="orbit-logo">
                    <img src="/logos/python.png" alt="Python" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
