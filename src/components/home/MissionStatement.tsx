"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SYSTEMS = [
  "Decision Intelligence Systems",
  "Mission Operating Platforms",
  "Battlefield AI",
  "Sensor Fusion Systems",
  "Autonomous Defence AI",
  "Intelligence Analysis Platforms",
  "Digital Battlespace Systems",
];

const PILLARS = [
  {
    code: "01",
    title: "Sovereign Deployment",
    body: "Every system air-gappable, on-premises, fully under your control. Zero foreign data exposure. Zero cloud dependency.",
    accent: "#8B5CF6",
    metric: "TRL 8-9",
    icon: "◈",
  },
  {
    code: "02",
    title: "Mission-First Engineering",
    body: "We start from operational doctrine — not product roadmaps. Every feature exists because an operator needed it.",
    accent: "#22D3EE",
    metric: "DOD COMPLIANT",
    icon: "⬡",
  },
  {
    code: "03",
    title: "Research-Led Systems",
    body: "Our engineering is grounded in deep research across AI, sensor fusion, autonomous systems, and geospatial intelligence.",
    accent: "#8B5CF6",
    metric: "CLASSIFIED PROGRAMS",
    icon: "◎",
  },
];

export default function MissionStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      style={{ background: "#07060F", position: "relative", overflow: "hidden" }}
    >
      {/* Top divider */}
      <div className="glow-line" />

      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.3 }} />

      {/* Mesh gradient */}
      <div className="absolute inset-0 mesh-bg" />

      {/* Animated orbs */}
      <div
        className="orb-1 absolute"
        style={{
          width: 700, height: 700,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        {/* ── Top row: label + mission quote ─────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 32, rotateX: 10 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label mb-8">Who We Are</div>

            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ color: "#fff", display: "block" }}>Chaos is a</span>
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 25px rgba(139,92,246,0.35))",
                }}
              >
                Defence AI
              </span>
              <span style={{ color: "rgba(255,255,255,0.75)", display: "block" }}>Research Lab.</span>
            </h2>

            {/* System tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {SYSTEMS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  className="hex-tag"
                  style={{
                    color: "rgba(139,92,246,0.5)",
                    borderColor: "rgba(139,92,246,0.12)",
                    background: "rgba(139,92,246,0.03)",
                    cursor: "default",
                    transition: "background 0.2s, border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(139,92,246,0.07)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.25)";
                    (e.currentTarget as HTMLDivElement).style.color = "rgba(139,92,246,0.85)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(139,92,246,0.03)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.12)";
                    (e.currentTarget as HTMLDivElement).style.color = "rgba(139,92,246,0.5)";
                  }}
                >
                  {s}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-between"
          >
            {/* Mission statement */}
            <div
              style={{
                borderLeft: "2px solid rgba(139,92,246,0.3)",
                paddingLeft: "1.5rem",
                marginBottom: "2rem",
                position: "relative",
              }}
            >
              {/* Glow on the border line */}
              <div
                style={{
                  position: "absolute",
                  left: -1, top: 0, bottom: 0,
                  width: 2,
                  background: "linear-gradient(to bottom, #8B5CF6, #22D3EE)",
                  boxShadow: "0 0 12px rgba(139,92,246,0.5)",
                }}
              />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.15rem",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.55)",
                  fontStyle: "italic",
                  marginBottom: "1rem",
                }}
              >
                "To build sovereign AI systems that enhance operational awareness, accelerate decision-making, and strengthen national security."
              </p>
              <p
                className="terminal-line"
                style={{ color: "rgba(139,92,246,0.35)", fontSize: 9 }}
              >
                CHAOS // MISSION STATEMENT // 2021
              </p>
            </div>

            {/* Metrics row */}
            <div
              className="grid grid-cols-3 gap-px"
              style={{ background: "rgba(255,255,255,0.035)" }}
            >
              {[
                { n: "17+", l: "Nations" },
                { n: "99.99%", l: "Uptime SLA" },
                { n: "TS/SCI", l: "Max Classification" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  style={{
                    background: "rgba(8,12,20,0.9)",
                    padding: "16px 20px",
                    borderTop: "2px solid rgba(139,92,246,0.15)",
                    transition: "background 0.3s, border-color 0.3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(14,20,30,0.95)";
                    (e.currentTarget as HTMLDivElement).style.borderTopColor = "rgba(139,92,246,0.4)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(8,12,20,0.9)";
                    (e.currentTarget as HTMLDivElement).style.borderTopColor = "rgba(139,92,246,0.15)";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                      background: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      letterSpacing: "-0.02em",
                      marginBottom: 2,
                    }}
                  >
                    {m.n}
                  </div>
                  <div className="terminal-line" style={{ color: "rgba(255,255,255,0.3)", fontSize: 9 }}>
                    {m.l}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Pillars ─────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden"
              style={{
                background: "rgba(8,12,20,0.85)",
                border: `1px solid rgba(255,255,255,0.06)`,
                padding: "2rem",
                cursor: "default",
                transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background = "rgba(14,22,32,0.95)";
                el.style.borderColor = `${p.accent}30`;
                el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 24px ${p.accent}10`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background = "rgba(8,12,20,0.85)";
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Top accent bar */}
              <div style={{ height: 2, background: `linear-gradient(90deg, ${p.accent}, transparent)`, width: 48, marginBottom: "1.5rem", boxShadow: `0 0 10px ${p.accent}` }} />

              {/* Icon */}
              <div
                style={{
                  fontSize: "1.5rem",
                  color: p.accent,
                  marginBottom: "1rem",
                  opacity: 0.7,
                  textShadow: `0 0 20px ${p.accent}`,
                }}
              >
                {p.icon}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="terminal-line" style={{ color: "rgba(255,255,255,0.18)", fontSize: 10 }}>
                  {p.code} //
                </div>
                <span
                  className="hex-tag"
                  style={{ color: `${p.accent}70`, borderColor: `${p.accent}20`, fontSize: 8, background: `${p.accent}06` }}
                >
                  {p.metric}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#fff",
                  marginBottom: "0.75rem",
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {p.body}
              </p>

              {/* Bottom corner accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0, right: 0,
                  width: 24, height: 24,
                  borderBottom: `1px solid ${p.accent}30`,
                  borderRight: `1px solid ${p.accent}30`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glow-line" />
    </section>
  );
}
