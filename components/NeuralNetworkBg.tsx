"use client";

export default function NeuralNetworkBg({ nodeCount = 15, lineCount = 8, color = "#a78bfa" }: { nodeCount?: number; lineCount?: number; color?: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Floating nodes */}
      {[...Array(nodeCount)].map((_, i) => (
        <div
          key={`node-${i}`}
          style={{
            position: "absolute",
            width: 5 + (i % 4) * 2,
            height: 5 + (i % 4) * 2,
            borderRadius: "50%",
            background: `${color}${(10 + (i % 5) * 3).toString(16).padStart(2, "0")}`,
            border: `1px solid ${color}${(15 + (i % 4) * 4).toString(16).padStart(2, "0")}`,
            left: `${(i * 7 + 3) % 95}%`,
            top: `${(i * 11 + 8) % 85}%`,
            animation: `neuralFloat ${4 + (i % 3)}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {/* Connecting lines */}
      {[...Array(lineCount)].map((_, i) => (
        <div
          key={`line-${i}`}
          style={{
            position: "absolute",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${color}12, transparent)`,
            width: `${25 + (i % 4) * 12}%`,
            left: `${(i * 10 + 5) % 80}%`,
            top: `${(i * 13 + 10) % 80}%`,
            transform: `rotate(${i * 25}deg)`,
            animation: `neuralPulse ${5 + (i % 2)}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}
