"use client";
import { useRef, useEffect, useState, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

const fallback = <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #0a0a1a, #1a1040)" }} />;

function PhoneScreen() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.15 + 0.1;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.05 - 0.05;
    meshRef.current.position.y = Math.sin(time * 0.4) * 0.1;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (Math.sin(time * 1.5) + 1) * 0.04 + 0.02;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[1.6, 3.2, 0.15]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Screen bezel */}
      <mesh position={[0, 0, 0.076]}>
        <boxGeometry args={[1.48, 3.0, 0.005]} />
        <meshStandardMaterial
          color="#0d0d1a"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Screen content - gradient */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[1.4, 2.85]} />
        <meshBasicMaterial color="#0a0a1a" />
      </mesh>

      {/* AI Neural network visual on screen */}
      <ScreenContent />

      {/* Notch */}
      <mesh position={[0, 1.4, 0.08]}>
        <boxGeometry args={[0.5, 0.12, 0.01]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Side button */}
      <mesh position={[0.82, 0.4, 0]}>
        <boxGeometry args={[0.03, 0.3, 0.06]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glow behind phone */}
      <mesh ref={glowRef} position={[0, 0, -0.5]}>
        <planeGeometry args={[4, 5]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function ScreenContent() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as unknown as THREE.Mesh;
      if (mesh.material && "opacity" in mesh.material) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = (Math.sin(time * 0.8 + i * 0.5) + 1) * 0.15 + 0.05;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0.085]}>
      {/* AI brain icon - top */}
      <mesh position={[0, 1.0, 0]}>
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Neural nodes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 0.15;
        return (
          <mesh key={`node-${i}`} position={[Math.cos(angle) * r, 1.0 + Math.sin(angle) * r, 0]}>
            <circleGeometry args={[0.02, 8]} />
            <meshBasicMaterial
              color="#c4b5fd"
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}

      {/* Data lines - middle section */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 0.3 - i * 0.2, 0]}>
          <planeGeometry args={[0.8 - i * 0.1, 0.04]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#a78bfa" : "#7c3aed"}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Bottom graph bars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`bar-${i}`} position={[-0.32 + i * 0.16, -0.8, 0]}>
          <planeGeometry args={[0.1, 0.15 + i * 0.08]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Floating data particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 1.2;
        const y = (Math.random() - 0.5) * 2.4;
        return (
          <mesh key={`dot-${i}`} position={[x, y, 0]}>
            <circleGeometry args={[0.008, 6]} />
            <meshBasicMaterial
              color="#c4b5fd"
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function PhoneMockup() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  if (!supported) return fallback;

  return (
    <div className="phone-3d-canvas">
      <WebGLErrorBoundary fallback={fallback}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[3, 3, 5]} intensity={0.8} color="#c4b5fd" />
          <directionalLight position={[-2, -1, 3]} intensity={0.3} color="#7c3aed" />
          <PhoneScreen />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
