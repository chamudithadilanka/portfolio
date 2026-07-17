"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import NeuralNetworkBg from "@/components/NeuralNetworkBg";

const categoryColors: Record<string, string> = {
  "Flutter / Dart": "#02569B",
  "React / Next.js": "#61DAFB",
  "JavaScript": "#F7DF1E",
  "Node.js": "#339933",
  "Python": "#3776AB",
  "Tailwind CSS": "#06B6D4",
  "MongoDB / MERN": "#47A248",
  "Responsive Design": "#FF6B6B",
};

export default function Skills() {
  return (
    <section id="skills" style={{ position: "relative", overflow: "hidden" }}>
      <NeuralNetworkBg nodeCount={10} lineCount={5} color="#60a5fa" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Skills</div>
          <h2 className="section-title">My toolkit</h2>
          <p className="section-desc mb-10">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {portfolioData.skills.map((skill, i) => {
            const color = categoryColors[skill.name] || "#a78bfa";
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className="skill-card group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
                  />
                  <span className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                    {skill.name}
                  </span>
                  <span
                    className="ml-auto text-xs font-bold tabular-nums"
                    style={{ color }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-bar-fill"
                    style={{
                      background: `linear-gradient(90deg, ${color}40, ${color})`,
                      boxShadow: `0 0 12px ${color}30`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
