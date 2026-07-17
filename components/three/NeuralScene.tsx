"use client";
import { useRef, useMemo, useEffect, useState, Component, ReactNode } from "react";
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

const fallback = <div style={{ width: "100%", height: "100%", background: "var(--bg)" }} />;

function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { positions, colors, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const isAccent = Math.random() > 0.6;
      colors[i * 3] = isAccent ? 0.65 : 0.3;
      colors[i * 3 + 1] = isAccent ? 0.55 : 0.35;
      colors[i * 3 + 2] = isAccent ? 0.98 : 0.5;

      speeds[i] = Math.random() * 0.3 + 0.1;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, speeds, phases };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = mesh.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const speed = speeds[i];
      const phase = phases[i];
      posArray[i * 3 + 1] += Math.sin(time * speed + phase) * 0.003;
      posArray[i * 3] += Math.cos(time * speed * 0.7 + phase) * 0.002;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralLineMesh({ start, end, speed, phase }: { start: THREE.Vector3; end: THREE.Vector3; speed: number; phase: number }) {
  const lineRef = useRef<THREE.Line>(null!);
  const matRef = useRef<THREE.LineBasicMaterial>(null!);

  useEffect(() => {
    if (!lineRef.current) return;
    const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
    lineRef.current.geometry = geo;
  }, [start, end]);

  useFrame((state) => {
    if (!matRef.current) return;
    const time = state.clock.elapsedTime;
    matRef.current.opacity = (Math.sin(time * speed + phase) + 1) * 0.12 + 0.02;
  });

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints([start, end]), [start, end]);

  return (
    <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({
      color: "#a78bfa",
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    }))} ref={lineRef as React.RefObject<THREE.Line>} />
  );
}

function NeuralLines({ count = 60 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  const lineData = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3; speed: number; phase: number }[] = [];
    for (let i = 0; i < count; i++) {
      lines.push({
        start: new THREE.Vector3(
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8
        ),
        end: new THREE.Vector3(
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8
        ),
        speed: Math.random() * 0.2 + 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return lines;
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const line = lineData[i];
      if (!line) return;
      const lineObj = child as THREE.Line;
      const mat = lineObj.material as THREE.LineBasicMaterial;
      mat.opacity = (Math.sin(time * line.speed + line.phase) + 1) * 0.12 + 0.02;
    });
  });

  return (
    <group ref={groupRef}>
      {lineData.map((line, i) => (
        <NeuralLineMesh key={i} {...line} />
      ))}
    </group>
  );
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null!);

  const orbData = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      scale: Math.random() * 1.5 + 0.8,
      speed: Math.random() * 0.15 + 0.05,
      phase: i * 1.2,
      color: i % 2 === 0 ? "#a78bfa" : "#7c3aed",
    }));
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const orb = orbData[i];
      if (!orb) return;
      child.position.y = orb.position[1] + Math.sin(time * orb.speed + orb.phase) * 0.8;
      child.position.x = orb.position[0] + Math.cos(time * orb.speed * 0.6 + orb.phase) * 0.4;
    });
  });

  return (
    <group ref={group}>
      {orbData.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.scale * 0.3, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NeuralScene() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  if (!supported) return fallback;

  return (
    <div className="neural-canvas">
      <WebGLErrorBoundary fallback={fallback}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <Particles count={180} />
          <NeuralLines count={60} />
          <FloatingOrbs />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
