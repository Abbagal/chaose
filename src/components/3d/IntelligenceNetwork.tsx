"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type NodeData = {
  position: THREE.Vector3;
  type: "hub" | "sensor" | "asset";
  active: boolean;
};

function NetworkNode({ node, index }: { node: NodeData; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = node.position.y + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05;
    }
    if (pulseRef.current && node.active) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.3;
      pulseRef.current.scale.setScalar(scale);
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - (scale - 1) / 0.3) * 0.4;
    }
  });

  const color = node.type === "hub" ? "#7DF9FF" : node.type === "sensor" ? "#00FFB3" : "#FF6B35";
  const size = node.type === "hub" ? 0.12 : 0.07;

  return (
    <group>
      <mesh ref={ref} position={node.position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {node.active && (
        <mesh ref={pulseRef} position={node.position}>
          <sphereGeometry args={[size * 2, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

function DataPulse({ start, end, speed }: { start: THREE.Vector3; end: THREE.Vector3; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(Math.random());

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * speed) % 1;
    if (ref.current) {
      ref.current.position.lerpVectors(start, end, progress.current);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#7DF9FF" transparent opacity={0.9} />
    </mesh>
  );
}

function Network() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes: NodeData[] = useMemo(() => [
    { position: new THREE.Vector3(0, 0, 0), type: "hub", active: true },
    { position: new THREE.Vector3(-3, 1.5, -1), type: "hub", active: true },
    { position: new THREE.Vector3(3, 1, -1), type: "hub", active: true },
    { position: new THREE.Vector3(0, -2.5, -1), type: "hub", active: false },
    { position: new THREE.Vector3(-5, -0.5, -2), type: "sensor", active: true },
    { position: new THREE.Vector3(5, -1, -2), type: "sensor", active: true },
    { position: new THREE.Vector3(-2, 3, -2), type: "sensor", active: false },
    { position: new THREE.Vector3(2, 3, -2), type: "sensor", active: true },
    { position: new THREE.Vector3(-4, -3, -1), type: "asset", active: true },
    { position: new THREE.Vector3(4, -3, -1), type: "asset", active: false },
    { position: new THREE.Vector3(-1.5, -1, -0.5), type: "sensor", active: true },
    { position: new THREE.Vector3(1.5, -1, -0.5), type: "sensor", active: true },
    { position: new THREE.Vector3(-2, 0.5, -0.5), type: "asset", active: true },
    { position: new THREE.Vector3(2, 0.5, -0.5), type: "asset", active: false },
    { position: new THREE.Vector3(0, 2, -0.5), type: "sensor", active: true },
  ], []);

  const connections = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    const maxDist = 3.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < maxDist) {
          pairs.push([nodes[i].position, nodes[j].position]);
        }
      }
    }
    return pairs;
  }, [nodes]);

  const pulses = useMemo(() => {
    return connections.slice(0, 8).map((conn, i) => ({
      start: conn[0],
      end: conn[1],
      speed: 0.3 + Math.random() * 0.4,
    }));
  }, [connections]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color="#7DF9FF"
          lineWidth={0.5}
          transparent
          opacity={0.12}
        />
      ))}
      {nodes.map((node, i) => (
        <NetworkNode key={i} node={node} index={i} />
      ))}
      {pulses.map((pulse, i) => (
        <DataPulse key={i} start={pulse.start} end={pulse.end} speed={pulse.speed} />
      ))}
    </group>
  );
}

export default function IntelligenceNetwork() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} color="#7DF9FF" intensity={0.4} />
        <pointLight position={[-5, -5, 5]} color="#00FFB3" intensity={0.2} />
        <Network />
      </Canvas>
    </div>
  );
}
