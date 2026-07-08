"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const globeRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y += 0.0015;
      wireRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
    }
    if (innerGlowRef.current) {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      (innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.02 + pulse * 0.02;
    }
  });

  return (
    <>
      {/* Main globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshPhongMaterial
          color="#050810"
          emissive="#0a1830"
          specular="#8B5CF6"
          shininess={40}
          transparent
          opacity={0.97}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[2.42, 36, 36]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.055}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[2.38, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[2.65, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.012}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Far atmosphere */}
      <mesh>
        <sphereGeometry args={[2.9, 32, 32]} />
        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.005}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

function RadarRing({ radius, speed, color, opacity = 0.35 }: { radius: number; speed: number; color: string; opacity?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
      ref.current.rotation.x = 0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.003, 2, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function DataNodes() {
  const count = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.43;
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0015;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8B5CF6" size={0.045} transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function ConnectionLines() {
  const nodePositions = useMemo(() => {
    const nodes = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.43;
      nodes.push(new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      ));
    }
    return nodes;
  }, []);

  const pairs = useMemo(() => {
    const p = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 2.4) {
          p.push([nodePositions[i], nodePositions[j]]);
        }
      }
    }
    return p;
  }, [nodePositions]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group ref={groupRef}>
      {pairs.map((pair, i) => (
        <Line
          key={i}
          points={pair as THREE.Vector3[]}
          color="#8B5CF6"
          lineWidth={0.5}
          transparent
          opacity={0.12}
        />
      ))}
    </group>
  );
}

function OrbitingSatellite({ radius, speed, inclination }: { radius: number; speed: number; inclination: number }) {
  const ref = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed;
      ref.current.rotation.z = inclination;
    }
    if (trailRef.current) {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      (trailRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + pulse * 0.3;
    }
  });

  return (
    <group ref={ref}>
      {/* Satellite body */}
      <mesh position={[radius, 0, 0]}>
        <boxGeometry args={[0.07, 0.025, 0.07]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>
      {/* Solar panel */}
      <mesh position={[radius, 0, 0]}>
        <boxGeometry args={[0.22, 0.006, 0.025]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.7} />
      </mesh>
      {/* Glow dot */}
      <mesh ref={trailRef} position={[radius, 0, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const count = 1200;
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      ref.current.rotation.x = state.clock.elapsedTime * 0.003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.018} transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

function ScanRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * 0.3) % 1;
      ref.current.scale.setScalar(1 + t * 1.5);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.15;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.5, 0.008, 2, 64]} />
      <meshBasicMaterial color="#8B5CF6" transparent opacity={0.1} />
    </mesh>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.08} />
        <pointLight position={[10, 10, 10]} color="#8B5CF6" intensity={0.6} />
        <pointLight position={[-10, -5, -10]} color="#22D3EE" intensity={0.25} />
        <pointLight position={[0, 8, -5]} color="#ffffff" intensity={0.1} />

        <GlobeMesh />
        <DataNodes />
        <ConnectionLines />
        <ScanRing />
        <RadarRing radius={3.2} speed={0.3} color="#8B5CF6" opacity={0.35} />
        <RadarRing radius={3.7} speed={-0.2} color="#22D3EE" opacity={0.25} />
        <RadarRing radius={4.2} speed={0.15} color="#8B5CF6" opacity={0.18} />
        <RadarRing radius={4.8} speed={-0.1} color="#22D3EE" opacity={0.1} />
        <OrbitingSatellite radius={3.4} speed={0.4} inclination={0.3} />
        <OrbitingSatellite radius={3.9} speed={-0.3} inclination={-0.5} />
        <OrbitingSatellite radius={4.4} speed={0.25} inclination={0.8} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
