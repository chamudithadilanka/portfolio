"use client";
import { motion } from "framer-motion";
import { Heart, GitBranch, Globe, Mail, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const socials = [
  { icon: GitBranch, href: portfolioData.github, label: "GitHub" },
  { icon: Globe, href: portfolioData.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${portfolioData.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="py-8"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-lg font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CD
          </motion.button>

          <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-tertiary)" }}>
            &copy; {new Date().getFullYear()} {portfolioData.name}
            <span className="mx-1">&middot;</span>
            Built with
            <Heart size={12} style={{ color: "var(--accent)" }} />
            & AI
            <Sparkles size={12} style={{ color: "var(--warning)" }} />
            using Next.js
          </p>

          <div className="flex items-center gap-1">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center rounded-lg transition-colors hover:text-[var(--accent)]"
                style={{
                  width: 36,
                  height: 36,
                  color: "var(--text-tertiary)",
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
