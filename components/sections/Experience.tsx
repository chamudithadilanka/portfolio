"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Briefcase, Sparkles } from "lucide-react";
import NeuralNetworkBg from "@/components/NeuralNetworkBg";

export default function Experience() {
  return (
    <section id="experience" style={{ position: "relative", overflow: "hidden" }}>
      <NeuralNetworkBg nodeCount={10} lineCount={5} color="#34d399" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Experience</div>
          <h2 className="section-title">Where I&apos;ve worked</h2>
        </motion.div>

        <div className="mt-8 relative">
          {/* Animated timeline line */}
          <div className="timeline-line hidden sm:block" />

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {portfolioData.experience.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.2, duration: 0.5, type: "spring", stiffness: 80 }}
                whileHover={{ x: 8, scale: 1.01 }}
                className="experience-card sm:ml-12 relative group hover-glow"
              >
                {/* Timeline dot with pulse */}
                <motion.div
                  className="timeline-dot hidden sm:flex"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                >
                  <div className="timeline-dot-inner" />
                  <div className="timeline-dot-pulse" />
                </motion.div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="font-bold text-base" style={{ color: "var(--text)" }}>
                    {exp.role}
                  </h3>
                  <span className="experience-period">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: "var(--accent)" }}>
                  {exp.company}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {exp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap size={18} style={{ color: "var(--accent)" }} />
            <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>
              Education
            </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {portfolioData.education.map((edu) => (
              <div key={edu.degree} className="card-3d">
                <h4 className="font-bold text-sm" style={{ color: "var(--text)" }}>
                  {edu.degree}
                </h4>
                <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                  {edu.school}
                </p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
