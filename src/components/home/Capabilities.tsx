"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Tilt3D from "@/components/ui/Tilt3D";

const CAPABILITIES = [
  {
    code: "CAP-01",
    title: "Intelligence Fusion",
    short: "MULTI-INT",
    description:
      "Combine SIGINT, HUMINT, IMINT, MASINT, OSINT into a single authoritative operational picture. Real-time ingestion at petabyte scale.",
    tags: ["SIGINT", "HUMINT", "OSINT", "MASINT"],
    color: "#8B5CF6",
    progress: 94,
  },
  {
    code: "CAP-02",
    title: "Battlespace Visualization",
    short: "GEO-VIZ",
    description:
      "Interactive 3D terrain, satellite imagery, blue-force tracking, threat overlays, and geospatial analysis in one unified interface.",
    tags: ["3D Terrain", "Blue Force", "Threat Map", "SAR"],
    color: "#22D3EE",
    progress: 91,
  },
  {
    code: "CAP-03",
    title: "AI Decision Support",
    short: "COGN-AI",
    description:
      "Natural language operational queries, automated pattern detection, and AI-generated assessments to accelerate analyst workflows.",
    tags: ["LLM", "NLP", "Pattern AI", "RAG"],
    color: "#8B5CF6",
    progress: 88,
  },
  {
    code: "CAP-04",
    title: "Autonomous Systems",
    short: "AUTO-SYS",
    description:
      "Command and control for UAV swarms, UGVs, and robotic platforms. Human-machine teaming at operational scale.",
    tags: ["UAV C2", "Swarm AI", "UGV", "HMT"],
    color: "#F59E0B",
    progress: 82,
  },
  {
    code: "CAP-05",
    title: "Digital Twin Operations",
    short: "DIG-TWIN",
    description:
      "Live digital representations of physical environments. Simulate missions, predict adversary behavior, plan with confidence.",
    tags: ["Digital Twin", "Simulation", "Prediction", "Physics"],
    color: "#22D3EE",
    progress: 79,
  },
  {
    code: "CAP-06",
    title: "Mission Planning",
    short: "PLAN-AI",
    description:
      "AI-assisted course of action development. Deconflict operations, optimize routes, synchronize effects across domains.",
    tags: ["COA Dev", "Route Opt", "COOP", "CONOPS"],
    color: "#8B5CF6",
    progress: 96,
  },
];

function CapabilityCard({ cap, index, inView }: { cap: typeof CAPABILITIES[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tilt3D
        intensity={8}
        glare
        style={{
          height: "100%",
          background: hovered
            ? "rgba(14, 22, 32, 0.98)"
            : "rgba(7, 10, 16, 0.95)",
          border: `1px solid ${hovered ? cap.color + "30" : "rgba(255,255,255,0.06)"}`,
          padding: "2rem",
          cursor: "default",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${cap.color}10, inset 0 1px 0 ${cap.color}10`
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden"
      >
        {/* Animated top bar */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0,
            height: 2,
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${cap.color}, ${cap.color}50, transparent)`,
            transition: "width 0.5s ease",
            boxShadow: hovered ? `0 0 10px ${cap.color}` : "none",
          }}
        />

        {/* Left depth accent */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, bottom: 0,
            width: 1,
            background: hovered ? `linear-gradient(to bottom, ${cap.color}60, transparent)` : "transparent",
            transition: "background 0.3s",
          }}
        />

        {/* Glow orb on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              top: -40, right: -40,
              width: 120, height: 120,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${cap.color}15, transparent 70%)`,
              filter: "blur(20px)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="terminal-line" style={{ color: "rgba(255,255,255,0.16)", fontSize: 10 }}>
            {cap.code}
          </div>
          <span
            className="hex-tag"
            style={{
              color: `${cap.color}80`,
              borderColor: `${cap.color}25`,
              fontSize: 8,
              background: `${cap.color}06`,
            }}
          >
            {cap.short}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: "1.05rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: hovered ? "#fff" : "rgba(255,255,255,0.9)",
            marginBottom: "0.75rem",
            transition: "color 0.3s",
          }}
        >
          {cap.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.825rem",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.33)",
            marginBottom: "1.25rem",
          }}
        >
          {cap.description}
        </p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="terminal-line" style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>
              CAPABILITY READINESS
            </span>
            <span className="terminal-line" style={{ fontSize: 8, color: cap.color, opacity: 0.7 }}>
              TRL-9 // {cap.progress}%
            </span>
          </div>
          <div
            style={{
              height: 2,
              background: "rgba(255,255,255,0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${cap.progress}%` } : {}}
              transition={{ duration: 1.4, delay: 0.4 + index * 0.1, ease: "easeOut" }}
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${cap.color}, ${cap.color}70)`,
                boxShadow: `0 0 8px ${cap.color}60`,
              }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {cap.tags.map((tag, j) => (
            <span
              key={j}
              className="hex-tag"
              style={{
                color: `${cap.color}65`,
                borderColor: `${cap.color}18`,
                fontSize: 8,
                background: `${cap.color}05`,
                transition: "background 0.2s",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Tilt3D>
    </motion.div>
  );
}

export default function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      ref={ref}
      id="capabilities"
      style={{ background: "#FFFFFF", position: "relative", overflow: "hidden" }}
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.3 }} />
      <div className="absolute inset-0 mesh-bg" />

      {/* Ambient orbs */}
      <div
        className="orb-1 absolute"
        style={{
          width: 500, height: 500,
          top: "20%", left: "10%",
          background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.12), transparent)" }}
      />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="section-label mb-6">Mission Capabilities</div>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "#0F172A", display: "block" }}>Built For</span>
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px rgba(139,92,246,0.3))",
                }}
              >
                Contested
              </span>
              <span style={{ color: "rgba(15,23,42,0.65)", display: "block" }}>Environments</span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                color: "rgba(15,23,42,0.35)",
                maxWidth: 420,
              }}
            >
              Every capability engineered for the operational realities of military environments — from forward operating bases to national command authorities.
            </p>
          </div>
        </motion.div>

        {/* 3D Tilt Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 perspective-container">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={i} cap={cap} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
