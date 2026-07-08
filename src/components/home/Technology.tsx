"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const DOMAINS = [
  {
    id: "TECH-01",
    name: "Artificial Intelligence",
    short: "AI/ML",
    desc: "Foundation models, reinforcement learning, and multi-modal AI systems trained for defence-specific tasks and operational contexts.",
    sub: ["Foundation Models", "Reinforcement Learning", "Multi-modal AI", "Edge Inference"],
    color: "#8B5CF6",
    trl: 9,
  },
  {
    id: "TECH-02",
    name: "Computer Vision",
    short: "CV",
    desc: "Real-time object detection, tracking, and recognition across EO/IR, SAR, and hyperspectral imagery at any scale.",
    sub: ["Object Detection", "Change Detection", "IR/EO Fusion", "SAR"],
    color: "#22D3EE",
    trl: 9,
  },
  {
    id: "TECH-03",
    name: "Large Language Models",
    short: "LLM",
    desc: "Sovereign LLMs deployed on-premises for intelligence analysis, report generation, and natural-language command interfaces.",
    sub: ["Sovereign LLM", "RAG Systems", "Doc Analysis", "NL Command"],
    color: "#8B5CF6",
    trl: 8,
  },
  {
    id: "TECH-04",
    name: "Multi-Agent Systems",
    short: "MAS",
    desc: "Autonomous agent frameworks coordinating across platforms, domains, and roles in complex operational environments.",
    sub: ["Agent Orchestration", "Task Decomposition", "Swarm Control", "HMT"],
    color: "#F59E0B",
    trl: 7,
  },
  {
    id: "TECH-05",
    name: "Graph Intelligence",
    short: "GRAPH",
    desc: "Knowledge graphs and network analysis revealing hidden relationships in massive intelligence datasets.",
    sub: ["Knowledge Graphs", "Link Analysis", "Entity Resolution", "GNN"],
    color: "#22D3EE",
    trl: 9,
  },
  {
    id: "TECH-06",
    name: "Sensor Fusion",
    short: "FUSION",
    desc: "Kalman filtering, particle filters, and deep fusion combining radar, LIDAR, acoustic, seismic, and SIGINT.",
    sub: ["Kalman Filter", "LIDAR Fusion", "Radar Proc.", "Multi-INT"],
    color: "#8B5CF6",
    trl: 9,
  },
  {
    id: "TECH-07",
    name: "Geospatial Intelligence",
    short: "GEOINT",
    desc: "Change detection, terrain analysis, pattern-of-life, and predictive geospatial modeling at national scale.",
    sub: ["Change Det.", "Pattern of Life", "Terrain AI", "GEOINT AI"],
    color: "#22D3EE",
    trl: 9,
  },
  {
    id: "TECH-08",
    name: "Edge AI",
    short: "EDGE",
    desc: "Quantized models and inference engines optimized for tactical edge deployment — no connectivity required.",
    sub: ["Model Quant.", "FPGA Deploy", "Offline Infer.", "Power Opt."],
    color: "#F59E0B",
    trl: 8,
  },
  {
    id: "TECH-09",
    name: "Secure On-Prem AI",
    short: "SOVEREIGN",
    desc: "Full-stack sovereign AI infrastructure. Air-gapped deployment, classified compute, zero-trust architecture.",
    sub: ["Air Gap", "Zero Trust", "HSM", "FIPS 140-2"],
    color: "#8B5CF6",
    trl: 9,
  },
];

function TRLBar({ trl, color, animate }: { trl: number; color: string; animate: boolean }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 9 }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={animate ? { opacity: i < trl ? 1 : 0.1, scaleY: 1 } : {}}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          style={{
            width: 4,
            height: 12,
            background: i < trl
              ? `linear-gradient(to top, ${color}, ${color}90)`
              : "rgba(255,255,255,0.08)",
            transformOrigin: "bottom",
            boxShadow: i < trl ? `0 0 4px ${color}60` : "none",
          }}
        />
      ))}
      <span className="terminal-line ml-1" style={{ fontSize: 8, color: `${color}60` }}>
        TRL-{trl}
      </span>
    </div>
  );
}

export default function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="technology"
      style={{ background: "#07060F", position: "relative", overflow: "hidden" }}
    >
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.25 }} />
      <div className="absolute inset-0 mesh-bg" />

      {/* Center vertical accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0, left: "50%",
          width: 1,
          height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.06), transparent)",
        }}
      />

      {/* Ambient orb */}
      <div
        className="orb-2 absolute"
        style={{
          width: 500, height: 500,
          top: "30%", right: "10%",
          background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="section-label mb-6">Research & Technology</div>
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
              <span style={{ color: "#fff", display: "block" }}>Deep Research.</span>
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
                Proven
              </span>
              <span style={{ color: "rgba(255,255,255,0.65)", display: "block" }}>Systems.</span>
            </h2>
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "1.5rem",
                }}
              >
                Chaos operates as a research lab — not a reseller. Every capability developed in-house and battle-tested before sovereign deployment.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  border: "1px solid rgba(245,158,11,0.22)",
                  background: "rgba(245,158,11,0.05)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-node-glow" style={{ background: "#F59E0B" }} />
                <span className="terminal-line" style={{ fontSize: 9, color: "rgba(245,158,11,0.65)" }}>
                  ALL RESEARCH CLASSIFIED // NDA REQUIRED FOR ACCESS
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech matrix with 3D hover */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px perspective-container" style={{ background: "rgba(255,255,255,0.03)" }}>
          {DOMAINS.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, rotateX: 8 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.04 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                background: active === i ? "rgba(14,22,32,0.99)" : "rgba(6,9,14,0.99)",
                padding: "1.75rem",
                cursor: "default",
                transition: "background 0.25s, box-shadow 0.25s, transform 0.2s",
                transform: active === i ? "translateY(-2px)" : "translateY(0)",
                boxShadow: active === i ? `0 12px 40px rgba(0,0,0,0.4), 0 0 20px ${tech.color}08` : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Left accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, bottom: 0,
                  width: 2,
                  background: active === i
                    ? `linear-gradient(to bottom, ${tech.color}, ${tech.color}30, transparent)`
                    : "transparent",
                  transition: "background 0.3s",
                  boxShadow: active === i ? `0 0 8px ${tech.color}` : "none",
                }}
              />

              {/* Top glow on hover */}
              {active === i && (
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: 1,
                    background: `linear-gradient(90deg, ${tech.color}80, transparent)`,
                    boxShadow: `0 0 8px ${tech.color}40`,
                  }}
                />
              )}

              {/* ID + short */}
              <div className="flex items-center justify-between mb-4">
                <span className="terminal-line" style={{ fontSize: 9, color: "rgba(255,255,255,0.16)" }}>
                  {tech.id}
                </span>
                <span
                  className="hex-tag"
                  style={{
                    color: `${tech.color}65`,
                    borderColor: `${tech.color}20`,
                    fontSize: 8,
                    background: active === i ? `${tech.color}08` : "transparent",
                  }}
                >
                  {tech.short}
                </span>
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: active === i ? "#8B5CF6" : "#fff",
                  marginBottom: "0.6rem",
                  transition: "color 0.25s",
                  textShadow: active === i ? "0 0 20px rgba(139,92,246,0.5)" : "none",
                }}
              >
                {tech.name}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.28)",
                  marginBottom: "1rem",
                }}
              >
                {tech.desc}
              </p>

              {/* TRL bar */}
              <div className="mb-3">
                <TRLBar trl={tech.trl} color={tech.color} animate={inView} />
              </div>

              {/* Sub-techs on hover */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="grid grid-cols-2 gap-1 pt-3"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      {tech.sub.map((s, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.05 }}
                          className="terminal-line"
                          style={{
                            fontSize: 8,
                            padding: "4px 8px",
                            background: `${tech.color}06`,
                            border: `1px solid ${tech.color}15`,
                            color: `${tech.color}65`,
                          }}
                        >
                          {s}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 animate-shimmer"
          style={{
            background: "rgba(139,92,246,0.02)",
            border: "1px solid rgba(139,92,246,0.07)",
          }}
        >
          <div className="flex items-start gap-4">
            <div style={{ width: 3, alignSelf: "stretch", background: "linear-gradient(to bottom, #8B5CF6, #22D3EE)", flexShrink: 0, minHeight: 32 }} />
            <div>
              <div className="terminal-line mb-1" style={{ fontSize: 9, color: "rgba(139,92,246,0.35)" }}>
                RESEARCH ACCESS
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.32)" }}>
                Publications, technical papers, and capability demonstrations available to cleared partners under NDA.
              </p>
            </div>
          </div>
          <div
            className="terminal-line whitespace-nowrap"
            style={{ fontSize: 9, color: "rgba(139,92,246,0.3)" }}
          >
            TRL 6–9 // ALL DOMAINS // PRODUCTION READY
          </div>
        </motion.div>
      </div>
    </section>
  );
}
