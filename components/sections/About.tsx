"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, FolderCheck, Users, Brain, Smartphone, Sparkles } from "lucide-react";
import NeuralNetworkBg from "@/components/NeuralNetworkBg";

const stats = [
  { label: "Industrial Training", value: "6 Mo", icon: Briefcase, color: "#a78bfa" },
  { label: "Projects Completed", value: "3+", icon: FolderCheck, color: "#34d399" },
  { label: "AI & Fullstack Apps", value: "Build", icon: Sparkles, color: "#fbbf24" },
];

const highlights = [
  { icon: Brain, title: "AI & Machine Learning", desc: "Building intelligent apps with OpenCV, MediaPipe & TensorFlow" },
  { icon: Smartphone, title: "Mobile Development", desc: "Flutter & Dart expert — pixel-perfect, performant apps" },
  { icon: Sparkles, title: "3D & Animation", desc: "Creating immersive experiences with Three.js & Framer Motion" },
];

export default function About() {
  return (
    <section id="about" style={{ background: "var(--bg-subtle)", position: "relative", overflow: "hidden" }}>
      <NeuralNetworkBg nodeCount={12} lineCount={6} />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">About</div>
          <h2 className="section-title">A bit about me</h2>
          <p className="section-desc" style={{ marginBottom: "20px" }}>{portfolioData.about}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3" style={{ gap: "20px", marginBottom: "20px" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="card-3d group hover-glow"
            >
              <motion.div
                className="flex items-center justify-center rounded-xl mb-4"
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  width: 52,
                  height: 52,
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}08)`,
                  border: `1px solid ${stat.color}30`,
                  color: stat.color,
                }}
              >
                <stat.icon size={24} />
              </motion.div>
              <motion.div
                className="text-3xl font-bold mb-1"
                style={{ color: stat.color, letterSpacing: "-0.02em" }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3" style={{ gap: "20px" }}>
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
              whileHover={{ y: -8, rotateY: 5 }}
              className="card-3d highlight-card group hover-glow"
            >
              <div className="highlight-icon" style={{ "--highlight-color": "#a78bfa" } as React.CSSProperties}>
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text)" }}>
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
