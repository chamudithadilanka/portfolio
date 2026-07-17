"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail as MailIcon, ArrowUpRight, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n\n---\nSent from Portfolio Contact Form`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}&su=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contactItems = [
    { icon: MailIcon, label: "Email", value: portfolioData.email, href: `mailto:${portfolioData.email}` },
    { icon: MapPin, label: "Location", value: "Sri Lanka", href: "#" },
  ];

  return (
    <section id="contact" style={{ background: "var(--bg-subtle)" }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">
            <Sparkles size={14} />
            Contact
          </div>
          <h2 className="section-title">Let&apos;s build something intelligent</h2>
          <p className="section-desc mb-10">
            Have an AI/ML project or mobile app idea? I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5" style={{ gap: "32px" }}>
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="md:col-span-2"
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {contactItems.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ x: 4, scale: 1.02 }}
                className="card-3d flex items-center gap-3 group hover-glow"
                style={{ textDecoration: "none" }}
              >
                <motion.div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{
                    width: 44,
                    height: 44,
                    background: "var(--accent-glow)",
                    color: "var(--accent)",
                  }}
                >
                  <Icon size={20} />
                </motion.div>
                <div className="min-w-0">
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{label}</p>
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{value}</p>
                </div>
              </motion.a>
            ))}

            <motion.a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              whileHover={{ x: 4, scale: 1.02 }}
              className="card-3d flex items-center justify-between group hover-glow"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg shrink-0" style={{
                  width: 40,
                  height: 40,
                  background: "var(--accent-glow)",
                  color: "var(--accent)",
                }}>
                  <ArrowUpRight size={18} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Connect</p>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>LinkedIn</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: "var(--text-tertiary)" }} />
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            onSubmit={handleSubmit}
            className="md:col-span-3"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <motion.input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
              className="w-full rounded-lg text-sm"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                minHeight: 48,
                padding: "14px 18px",
                transition: "all 0.3s ease",
              }}
            />
            <motion.input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
              className="w-full rounded-lg text-sm"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                minHeight: 48,
                padding: "14px 18px",
                transition: "all 0.3s ease",
              }}
            />
            <motion.textarea
              rows={5}
              placeholder="Tell me about your AI/ML or mobile project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
              className="w-full rounded-lg text-sm resize-none"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                minHeight: 140,
                padding: "14px 18px",
                transition: "all 0.3s ease",
              }}
            />
            <motion.button
              type="submit"
              className="btn btn-primary btn-glow w-full"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(167, 139, 250, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Send size={16} />
              {sent ? "Sent!" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
