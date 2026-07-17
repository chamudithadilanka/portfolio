"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowLeft,
  Brain,
  Server,
  Smartphone,
  Database,
  FlaskConical,
  Layers,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  GitBranch,
  Activity,
  Zap,
  Target,
  Shield,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
};

const workflowSteps = [
  {
    icon: Database,
    title: "Dataset Training",
    desc: "Prepare HAM10000 data and train the deep learning model",
    output: "best_model.h5",
    color: "#a78bfa",
  },
  {
    icon: Server,
    title: "Backend (Flask)",
    desc: "Load the model and create a prediction API",
    output: "JSON response",
    color: "#34d399",
  },
  {
    icon: Smartphone,
    title: "Frontend (Flutter)",
    desc: "Send image and show the prediction to the user",
    output: "Mobile app result",
    color: "#60a5fa",
  },
];

const trainingSteps = [
  {
    num: "01",
    title: "Download the Dataset",
    desc: "Download the HAM10000 dataset from Kaggle. The image files and metadata CSV file are stored in the project workspace.",
  },
  {
    num: "02",
    title: "Clean the Dataset",
    desc: "Check the metadata for missing values such as age or sex. Fill missing values, fix formatting issues, and make sure the labels are correct.",
  },
  {
    num: "03",
    title: "Preprocess the Images",
    desc: "Resize images to a fixed size of 224x224 so that all images match the model input size. Normalize pixel values so the model can learn more effectively.",
  },
  {
    num: "04",
    title: "Train the Model",
    desc: "Use TensorFlow and Keras to train a CNN-based model. MobileNetV2 or EfficientNet is used as the base architecture. The model learns patterns such as color, shape, and border differences.",
  },
  {
    num: "05",
    title: "Save the Trained Model",
    desc: "After training finishes, save the best model file as best_model.h5. This file is later used by the backend to make predictions.",
  },
];

const backendSteps = [
  {
    num: "01",
    title: "Create the Flask Server",
    desc: "Create a Flask application in Python. This server listens for requests from the frontend.",
  },
  {
    num: "02",
    title: "Load the Trained Model",
    desc: "When the server starts, load best_model.h5 into memory. This allows the backend to use the trained model without retraining it every time.",
  },
  {
    num: "03",
    title: "Create the Prediction Endpoint",
    desc: 'Create an API route such as /predict. This endpoint is used by the Flutter app to send an image file for prediction.',
  },
  {
    num: "04",
    title: "Receive and Preprocess the Image",
    desc: "When the user sends an image, the backend reads the file, resizes it to 224x224, converts it into an array, and normalizes it.",
  },
  {
    num: "05",
    title: "Run Prediction and Return JSON",
    desc: "The backend sends the processed image to the model. The model predicts the disease class and confidence score, then Flask returns the result as JSON.",
  },
];

const frontendSteps = [
  {
    num: "01",
    title: "Create the Mobile UI",
    desc: "Design a clean screen with buttons for choosing an image from the gallery or capturing a photo from the camera.",
  },
  {
    num: "02",
    title: "Select an Image",
    desc: "The user chooses a skin image. The selected image is shown on the screen before prediction.",
  },
  {
    num: "03",
    title: "Send Image to Backend",
    desc: "Use an HTTP POST request to send the image file from Flutter to the Flask /predict API endpoint.",
  },
  {
    num: "04",
    title: "Receive Prediction Result",
    desc: "The Flutter app receives the JSON response from the backend. This response contains the predicted disease name and the confidence value.",
  },
  {
    num: "05",
    title: "Display Final Result",
    desc: "Show the disease name, confidence score, and additional information on the result screen so the user can understand the prediction.",
  },
];

const screenshots = [
  {
    title: "Splash Screen",
    desc: "App loading screen with DermScan branding and animated logo. Displays the AI-powered skin analysis tagline while the deep learning model initializes in the background.",
    image: "/dermscan/splash_screen.png",
    tags: ["Onboarding", "Brand Identity"],
    color: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.4)",
  },
  {
    title: "Home Screen",
    desc: "Main dashboard with quick-access buttons for camera capture, gallery import, and scan history. Features a clean Material Design layout with gradient accents and intuitive navigation.",
    image: "/dermscan/home_screen.png",
    tags: ["Navigation", "Quick Actions"],
    color: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.4)",
  },
  {
    title: "Library Screen",
    desc: "Educational resource center displaying all 7 skin lesion types (Melanoma, Nevus, Basal Cell Carcinoma, etc.) with descriptions, risk levels, and visual examples for each condition.",
    image: "/dermscan/library_screen.png",
    tags: ["Education", "7 Lesion Types"],
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.4)",
  },
  {
    title: "Result Screen",
    desc: "AI prediction output showing the detected disease class, confidence percentage (e.g., 68.7%), and detailed information about the predicted condition with recommended next steps.",
    image: "/dermscan/result_screen.png",
    tags: ["AI Output", "Confidence Score"],
    color: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.4)",
  },
  {
    title: "History Screen",
    desc: "Chronological log of all past scans with thumbnails, timestamps, and prediction results. Allows users to track changes over time and share reports with healthcare providers.",
    image: "/dermscan/history.png",
    tags: ["Data Tracking", "Timeline"],
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.4)",
  },
];

const moreScreenshots = [
  {
    title: "Scan Flow",
    desc: "Guided step-by-step interface walking users through the complete skin analysis process — from image capture to AI processing to final diagnosis with visual progress indicators.",
    image: "/dermscan/screen_01.png",
    tags: ["User Flow", "Guided UX"],
  },
  {
    title: "Camera View",
    desc: "Real-time camera interface with focus grid and skin region detection. Automatically adjusts exposure and applies preprocessing filters before capturing the lesion image for analysis.",
    image: "/dermscan/screen_02.png",
    tags: ["Camera", "Image Capture"],
  },
  {
    title: "Processing",
    desc: "AI analysis in progress — displays the MobileNetV2/EfficientNet model processing the captured image through the Flask backend. Shows real-time progress with neural network visualization.",
    image: "/dermscan/screen_03.png",
    tags: ["AI Processing", "Real-time"],
  },
  {
    title: "Diagnosis Detail",
    desc: "Comprehensive breakdown of the prediction including disease name, confidence score, affected area analysis, comparison with known patterns, and urgency level indicator.",
    image: "/dermscan/screen_04.png",
    tags: ["Detailed Analysis", "Medical Info"],
  },
  {
    title: "Report Summary",
    desc: "Exportable PDF-ready report consolidating the scan image, AI prediction, confidence metrics, historical comparisons, and professional recommendations for medical consultation.",
    image: "/dermscan/screen_05.png",
    tags: ["Export", "Professional Report"],
  },
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
            {/* Side buttons */}
            <div style={{ position: "absolute", right: -4, top: 110, width: 4, height: 65, background: "linear-gradient(180deg, #2a2a38, #1a1a28)", borderRadius: "0 3px 3px 0" }} />
            <div style={{ position: "absolute", left: -4, top: 90, width: 4, height: 38, background: "linear-gradient(180deg, #2a2a38, #1a1a28)", borderRadius: "3px 0 0 3px" }} />
            <div style={{ position: "absolute", left: -4, top: 140, width: 4, height: 38, background: "linear-gradient(180deg, #2a2a38, #1a1a28)", borderRadius: "3px 0 0 3px" }} />

            {/* Screen */}
            <div style={{
              width: "100%",
              aspectRatio: "9/19.5",
              borderRadius: 28,
              overflow: "hidden",
              position: "relative",
              background: "#000",
            }}>
              {/* Dynamic Island */}
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

              {/* Screen content */}
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

              {/* Screen reflection */}
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

const glowColors = [
  { color: "#f43f5e", glow: "rgba(244, 63, 94, 0.5)" },
  { color: "#a78bfa", glow: "rgba(167, 139, 250, 0.5)" },
  { color: "#34d399", glow: "rgba(52, 211, 153, 0.5)" },
  { color: "#60a5fa", glow: "rgba(96, 165, 250, 0.5)" },
  { color: "#fbbf24", glow: "rgba(251, 191, 36, 0.5)" },
];

export default function DermScanPage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-following glow effect with color changes
  const handleScroll = () => {
    const timeline = document.querySelector(".timeline-container") as HTMLElement;
    const glowLine = document.querySelector(".timeline-line-glow") as HTMLElement;
    if (!timeline || !glowLine) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const timelineTop = rect.top;
    const timelineHeight = rect.height;

    // Calculate how far through the timeline we've scrolled
    const scrollProgress = Math.max(0, Math.min(1,
      (windowHeight * 0.5 - timelineTop) / timelineHeight
    ));

    glowLine.style.height = `${scrollProgress * 100}%`;

    // Determine which screen is active and update glow color
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
      {/* Peaceful Background Animation - Health Theme */}
      <div className="health-bg-animation" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Floating Cells */}
        <div className="cell cell-1" />
        <div className="cell cell-2" />
        <div className="cell cell-3" />
        <div className="cell cell-4" />
        <div className="cell cell-5" />
        <div className="cell cell-6" />
        <div className="cell cell-7" />
        <div className="cell cell-8" />

        {/* DNA Helix Strands */}
        <div className="dna-strand dna-1" />
        <div className="dna-strand dna-2" />

        {/* Pulse Rings */}
        <div className="pulse-ring pulse-1" />
        <div className="pulse-ring pulse-2" />
        <div className="pulse-ring pulse-3" />

        {/* Medical Cross Shapes */}
        <div className="medical-cross cross-1" />
        <div className="medical-cross cross-2" />

        {/* Floating Molecules */}
        <div className="molecule mol-1" />
        <div className="molecule mol-2" />
        <div className="molecule mol-3" />
      </div>
      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(6, 6, 10, 0.85)",
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
      <section style={{ padding: "4rem 2rem 3rem" }}>
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
                color: "#f43f5e",
                background: "rgba(244, 63, 94, 0.1)",
                border: "1px solid rgba(244, 63, 94, 0.25)",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#f43f5e",
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
              DermScan –{" "}
              <span className="gradient-text">Skin Cancer Detection App</span>
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
              An AI-powered skin cancer detection system using deep learning
              (MobileNetV2/EfficientNet) trained on the HAM10000 dataset, with a
              Flask backend API and a Flutter mobile frontend for real-time
              lesion classification.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              {["Python", "TensorFlow", "Flask", "Flutter", "AI/ML", "Deep Learning"].map(
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
                { icon: Target, label: "7 Classes", desc: "Lesion types" },
                { icon: Activity, label: "224x224", desc: "Input resolution" },
                { icon: Zap, label: "Real-time", desc: "Prediction speed" },
                { icon: Shield, label: "94%+", desc: "Model accuracy" },
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
                  <stat.icon size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
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

      {/* Workflow Overview */}
      <section style={{ padding: "3rem 2rem" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              System Architecture
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 600 }}>
              Three main parts work together as one full system: training, backend, and frontend.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  {...stagger}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "1.5rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
                        border: `1px solid ${step.color}30`,
                        color: step.color,
                      }}
                    >
                      <step.icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontWeight: 600 }}>
                        Part {i + 1}
                      </div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)" }}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                    {step.desc}
                  </p>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: step.color,
                      padding: "0.25rem 0.6rem",
                      borderRadius: 6,
                      background: `${step.color}10`,
                      border: `1px solid ${step.color}20`,
                      display: "inline-block",
                    }}
                  >
                    Output: {step.output}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flow arrows */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
                color: "var(--text-tertiary)",
                fontSize: "0.75rem",
              }}
            >
              <span>Training</span>
              <ArrowRight size={14} />
              <span>Backend</span>
              <ArrowRight size={14} />
              <span>Frontend</span>
              <ArrowRight size={14} />
              <span>Result</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dataset Training */}
      <section style={{ padding: "3rem 2rem", background: "var(--bg-subtle)" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <Database size={20} style={{ color: "#a78bfa" }} />
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Dataset Training
              </h2>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 600 }}>
              Teaching the AI model how to identify different types of skin lesions using the HAM10000 dataset from Kaggle.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {trainingSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  {...stagger}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    padding: "1.25rem 1.5rem",
                    borderRadius: 12,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #a78bfa20, #a78bfa08)",
                      border: "1px solid #a78bfa30",
                      color: "#a78bfa",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Backend Section */}
      <section style={{ padding: "3rem 2rem" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <FlaskConical size={20} style={{ color: "#34d399" }} />
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Backend (Flask API)
              </h2>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 600 }}>
              The middle layer between the mobile app and the trained model. It receives an image, processes it, runs the model, and sends back the result.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {backendSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  {...stagger}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    padding: "1.25rem 1.5rem",
                    borderRadius: 12,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #34d39920, #34d39908)",
                      border: "1px solid #34d39930",
                      color: "#34d399",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* API Response Example */}
            <motion.div
              {...stagger}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                marginTop: "1.5rem",
                padding: "1.25rem 1.5rem",
                borderRadius: 12,
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                Example API Response
              </div>
              <code
                style={{
                  display: "block",
                  padding: "1rem",
                  borderRadius: 8,
                  background: "#0a0a14",
                  border: "1px solid var(--border)",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: "#34d399",
                  lineHeight: 1.6,
                }}
              >
                {"{"}&quot;prediction&quot;: &quot;Melanoma&quot;, &quot;confidence&quot;: 68.7{"}"}
              </code>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Frontend Section */}
      <section style={{ padding: "3rem 2rem", background: "var(--bg-subtle)" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <Smartphone size={20} style={{ color: "#60a5fa" }} />
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Frontend (Flutter App)
              </h2>
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 600 }}>
              The user interface that allows the user to select or capture a skin image and view the AI prediction result.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {frontendSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  {...stagger}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    padding: "1.25rem 1.5rem",
                    borderRadius: 12,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #60a5fa20, #60a5fa08)",
                      border: "1px solid #60a5fa30",
                      color: "#60a5fa",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* End-to-End Flow */}
      <section style={{ padding: "3rem 2rem" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
              End-to-End Flow
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 600 }}>
              The complete workflow from training to user prediction.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                position: "relative",
              }}
            >
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: 17,
                  top: 20,
                  bottom: 20,
                  width: 2,
                  background: "linear-gradient(to bottom, #a78bfa, #34d399, #60a5fa)",
                  borderRadius: 1,
                }}
              />
              {[
                "Train the deep learning model using the HAM10000 dataset",
                "Save the trained model as best_model.h5",
                "Load the model inside the Flask backend",
                "Build a /predict API to accept image files",
                "Create the Flutter app user interface",
                "User selects or captures a skin image",
                "Flutter sends the image to the Flask backend",
                "The backend preprocesses the image and runs the model",
                "The backend returns the result as JSON",
                "Flutter shows the prediction and confidence to the user",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...stagger}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.6rem 0",
                    paddingLeft: "0.5rem",
                  }}
                >
                  <CheckCircle2
                    size={16}
                    style={{
                      color: i < 4 ? "#a78bfa" : i < 6 ? "#34d399" : "#60a5fa",
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screenshots - Vertical Timeline */}
      <section style={{ padding: "4rem 2rem", background: "var(--bg-subtle)", position: "relative" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em", textAlign: "center" }}>
              App Screenshots
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", maxWidth: 600, textAlign: "center", margin: "0 auto 3rem" }}>
              Key screens from the DermScan mobile application.
            </p>

            {/* Vertical Timeline Container */}
            <div className="timeline-container" style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
              {/* Vertical Line */}
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
                  background: "linear-gradient(180deg, #f43f5e, #f43f5e)",
                  borderRadius: 2,
                  transition: "height 0.1s ease-out, background 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 0 12px rgba(244, 63, 94, 0.5), 0 0 24px rgba(244, 63, 94, 0.3)",
                }} />
              </div>

              {/* Timeline Items */}
              {screenshots.map((screen, i) => (
                <TimelineItem key={screen.title} screen={screen} index={i} total={screenshots.length} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Screenshots - Full Width */}
      <section style={{ padding: "3rem 2rem" }}>
        <div className="container mx-auto">
          <motion.div {...fadeUp} style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
              App Walkthrough
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 600 }}>
              Complete flow of the DermScan application from scan to diagnosis.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {moreScreenshots.map((screen, i) => (
                <motion.div
                  key={screen.title}
                  {...stagger}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/10",
                      overflow: "hidden",
                      background: "#0a0a14",
                    }}
                  >
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
                  </div>
                  <div style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, #f43f5e20, #f43f5e08)",
                          border: "1px solid #f43f5e30",
                          color: "#f43f5e",
                          fontSize: "0.6rem",
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                        {screen.title}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                      {screen.desc}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {screen.tags.map((tag: string) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.55rem",
                            padding: "0.15rem 0.4rem",
                            borderRadius: 4,
                            background: "rgba(167, 139, 250, 0.08)",
                            border: "1px solid rgba(167, 139, 250, 0.15)",
                            color: "#a78bfa",
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
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "3rem 2rem" }}>
        <div className="container mx-auto">
          <motion.div
            {...fadeUp}
            style={{
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "center",
              padding: "2.5rem 2rem",
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(167, 139, 250, 0.08) 0%, rgba(244, 63, 94, 0.08) 100%)",
              border: "1px solid var(--border)",
            }}
          >
            <Layers size={32} style={{ color: "var(--accent)", marginBottom: "1rem" }} />
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Interested in this project?
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", maxWidth: 500, margin: "0 auto 1.5rem" }}>
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
