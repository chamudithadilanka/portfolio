"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "ML Engineer Level 1",
    issuer: "AI Academy",
    image: "/certifications/ml_engineer_level1.png",
    color: "#34d399",
  },
  {
    title: "ML Engineer Level 2",
    issuer: "AI Academy",
    image: "/certifications/ml_engineer_level2.png",
    color: "#60a5fa",
  },
  {
    title: "ML Engineer Level 3 - Gold",
    issuer: "AI Academy",
    image: "/certifications/ml_engineer_level3_gold.png",
    color: "#fbbf24",
  },
  {
    title: "AI Engineer Badge",
    issuer: "AI Academy",
    image: "/certifications/ai_engineer_badge.png",
    color: "#a78bfa",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const floatVariants = {
  animate: (i: number) => ({
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export default function Certifications() {
  return (
    <section id="certifications" style={{ background: "var(--bg-subtle)" }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">
            <Award size={14} />
            Certifications
          </div>
          <h2 className="section-title">My Achievements</h2>
          <p className="section-desc" style={{ marginBottom: "40px" }}>
            Professional certifications and badges earned through AI/ML training programs.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="certification-card"
              style={{
                background: "var(--surface)",
                border: `1px solid ${cert.color}25`,
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}50`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${cert.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}25`;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Certification Image */}
              <motion.div
                custom={i}
                variants={floatVariants}
                animate="animate"
                style={{
                  width: "100%",
                  height: "200px",
                  background: `linear-gradient(135deg, ${cert.color}15, ${cert.color}05)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background glow */}
                <div
                  style={{
                    position: "absolute",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${cert.color}20, transparent 70%)`,
                    filter: "blur(30px)",
                  }}
                />
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    maxWidth: "80%",
                    maxHeight: "80%",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                  }}
                />
              </motion.div>

              {/* Certification Info */}
              <div style={{ padding: "16px 20px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}08)`,
                      border: `1px solid ${cert.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: cert.color,
                    }}
                  >
                    <Award size={14} />
                  </div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)" }}>
                    {cert.title}
                  </h3>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
