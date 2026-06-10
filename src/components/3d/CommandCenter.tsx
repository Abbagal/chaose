"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function HolographicPanel({ position, width, height, color }: {
  position: [number, number, number];
  width: number;
  height: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02;
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      {/* Border */}
      <Line
        points={[
          [-width/2, -height/2, 0],
          [width/2, -height/2, 0],
          [width/2, height/2, 0],
          [-width/2, height/2, 0],
          [-width/2, -height/2, 0],
        ]}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.4}
      />
      {/* Corner accents */}
      <Line
        points={[[-width/2, -height/2 + 0.15, 0], [-width/2, -height/2, 0], [-width/2 + 0.15, -height/2, 0]]}
        color={color}
        lineWidth={2}
        transparent
        opacity={0.9}
      />
      <Line
        points={[[width/2, height/2 - 0.15, 0], [width/2, height/2, 0], [width/2 - 0.15, height/2, 0]]}
        color={color}
        lineWidth={2}
        transparent
        opacity={0.9}
      />
    </group>
  );
}

function DataGrid({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  const lines = useMemo(() => {
    const l = [];
    for (let i = 0; i <= 8; i++) {
      l.push({ start: new THREE.Vector3(-2 + i * 0.5, -1.5, 0), end: new THREE.Vector3(-2 + i * 0.5, 1.5, 0), horizontal: false });
    }
    for (let i = 0; i <= 6; i++) {
      l.push({ start: new THREE.Vector3(-2, -1.5 + i * 0.5, 0), end: new THREE.Vector3(2, -1.5 + i * 0.5, 0), horizontal: true });
    }
    return l;
  }, []);

  return (
    <group ref={ref} position={position}>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color="#7DF9FF"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
    </group>
  );
}

function RadarDisplay({ position }: { position: [number, number, number] }) {
  const sweepRef = useRef<THREE.Mesh>(null);
  const ringRefs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];

  useFrame((state) => {
    if (sweepRef.current) {
      sweepRef.current.rotation.z = -state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group position={position}>
      {/* Radar rings */}
      {[0.4, 0.7, 1.0].map((r, i) => (
        <mesh key={i} ref={ringRefs[i]}>
          <torusGeometry args={[r, 0.005, 2, 64]} />
          <meshBasicMaterial color="#00FFB3" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Sweep */}
      <mesh ref={sweepRef}>
        <meshBasicMaterial color="#00FFB3" transparent opacity={0.4} side={THREE.DoubleSide} />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              0, 0, 0,
              1, 0, 0,
              Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), 0,
            ]), 3]}
          />
        </bufferGeometry>
      </mesh>

      {/* Cross hairs */}
      <Line points={[new THREE.Vector3(-1.1, 0, 0), new THREE.Vector3(1.1, 0, 0)]} color="#00FFB3" lineWidth={0.5} transparent opacity={0.2} />
      <Line points={[new THREE.Vector3(0, -1.1, 0), new THREE.Vector3(0, 1.1, 0)]} color="#00FFB3" lineWidth={0.5} transparent opacity={0.2} />

      {/* Blips */}
      {[
        [0.3, 0.5], [0.6, -0.3], [-0.4, 0.6], [-0.7, -0.2], [0.8, 0.4],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#FF6B35" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function CommandScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.x = -0.1 + Math.sin(state.clock.elapsedTime * 0.07) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main display panels */}
      <HolographicPanel position={[0, 0.5, 0]} width={4} height={2.5} color="#7DF9FF" />
      <HolographicPanel position={[-3.2, 0, -0.5]} width={2} height={3} color="#00FFB3" />
      <HolographicPanel position={[3.2, 0, -0.5]} width={2} height={3} color="#7DF9FF" />
      <HolographicPanel position={[0, -1.8, -0.3]} width={6} height={0.8} color="#FF6B35" />

      {/* Data grid */}
      <DataGrid position={[0, 0.5, 0.01]} />

      {/* Radar display */}
      <RadarDisplay position={[-3.2, 0.2, -0.49]} />

      {/* Particles */}
      <mesh>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#7DF9FF" />
      </mesh>

      {/* Floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshBasicMaterial color="#7DF9FF" transparent opacity={0.02} />
      </mesh>
      <Line
        points={[new THREE.Vector3(-6, -2.5, 0), new THREE.Vector3(6, -2.5, 0)]}
        color="#7DF9FF"
        lineWidth={1}
        transparent
        opacity={0.1}
      />
    </group>
  );
}

export default function CommandCenter() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 5, 5]} color="#7DF9FF" intensity={0.6} />
        <pointLight position={[-5, -2, 3]} color="#00FFB3" intensity={0.3} />
        <pointLight position={[5, -2, 3]} color="#FF6B35" intensity={0.2} />
        <CommandScene />
      </Canvas>
    </div>
  );
}
