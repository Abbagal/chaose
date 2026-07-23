"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Tilt3D from "@/components/ui/Tilt3D";

const INDUSTRIES = [
  {
    id: "SECTOR-01",
    title: "Defence",
    sub: "Army / Navy / Air Force / Space",
    description: "Land, maritime, air, and cyber domains. Decision intelligence for military commands, joint operations, and strategic planning at all echelons.",
    color: "#8B5CF6",
    tags: ["Joint Ops", "C2 Systems", "ISR"],
    clearance: "TS/SCI",
  },
  {
    id: "SECTOR-02",
    title: "Intelligence Agencies",
    sub: "National Intelligence Directorates",
    description: "Analysis platforms for national intelligence agencies. Multi-source fusion, entity resolution, and link analysis at national scale.",
    color: "#22D3EE",
    tags: ["HUMINT", "Signal Proc", "Pattern of Life"],
    clearance: "TS/SCI/SAP",
  },
  {
    id: "SECTOR-03",
    title: "Homeland Security",
    sub: "Internal Security / CT Operations",
    description: "Integrated threat assessment for border protection, counter-terrorism, and critical infrastructure security.",
    color: "#F59E0B",
    tags: ["CT Ops", "Asset Protection", "Response"],
    clearance: "SECRET",
  },
  {
    id: "SECTOR-04",
    title: "Critical Infrastructure",
    sub: "Energy / Water / Comms / Finance",
    description: "AI-powered monitoring for power grids, water systems, communications, and financial infrastructure — protecting national dependencies.",
    color: "#8B5CF6",
    tags: ["Grid Security", "SCADA AI", "Anomaly Det."],
    clearance: "CUI",
  },
  {
    id: "SECTOR-05",
    title: "Border Security",
    sub: "Land / Maritime / Aerial",
    description: "Sensor fusion across land, maritime, and air borders. Autonomous detection, tracking, and interdiction coordination at scale.",
    color: "#22D3EE",
    tags: ["Sensor Fusion", "UAV Intel", "Cross-Border"],
    clearance: "SECRET",
  },
  {
    id: "SECTOR-06",
    title: "Emergency Response",
    sub: "Crisis Management / NDRF",
    description: "Unified command and control for large-scale emergencies. Resource coordination, situational awareness, and predictive allocation.",
    color: "#F59E0B",
    tags: ["Unified CMD", "Resource Ops", "Predictive AI"],
    clearance: "UNCLASSIFIED",
  },
  {
    id: "SECTOR-07",
    title: "Strategic Operations",
    sub: "National Command Authority",
    description: "Strategic-level decision intelligence for national command authorities, coalition operations, and long-range strategic planning.",
    color: "#8B5CF6",
    tags: ["NCA", "Coalition Ops", "Strategic Intel"],
    clearance: "TS/SCI/NOFORN",
  },
];

const clearanceColor: Record<string, string> = {
  "TS/SCI": "#F59E0B",
  "TS/SCI/SAP": "#F59E0B",
  "TS/SCI/NOFORN": "#F59E0B",
  SECRET: "#8B5CF6",
  CUI: "#22D3EE",
  UNCLASSIFIED: "rgba(255,255,255,0.35)",
};

export default function Industries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      ref={ref}
      id="industries"
      style={{ background: "#05070A", position: "relative", overflow: "hidden" }}
    >
      <div className="absolute inset-0 tactical-grid" style={{ opacity: 0.35 }} />
      <div className="absolute inset-0 mesh-bg" />

      {/* Vertical accent lines */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: "25%", width: 1, background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.05), transparent)" }}
      />
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ right: "25%", width: 1, background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.05), transparent)" }}
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
          <div className="section-label mb-6">Sectors We Serve</div>
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
              <span style={{ color: "#F2F4F7", display: "block" }}>National</span>
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
                Security
              </span>
              <span style={{ color: "rgba(255,255,255,0.65)", display: "block" }}>Domains</span>
            </h2>
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "1rem",
                }}
              >
                Chaos systems operate across the full national security spectrum — from tactical edge deployments to strategic command level.
              </p>
              <div className="flex flex-wrap gap-2">
                {["TS/SCI", "SECRET", "CUI", "UNCLASSIFIED"].map((c) => (
                  <span
                    key={c}
                    className="hex-tag"
                    style={{ color: clearanceColor[c], borderColor: `${clearanceColor[c]}30`, fontSize: 8, background: `${clearanceColor[c]}06` }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Industry grid with 3D tilt */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 perspective-container">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tilt3D
                intensity={6}
                glare
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "1.5rem",
                  minHeight: 200,
                  height: "100%",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                className="relative overflow-hidden"
              >
                {/* Top accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: 48, height: 1,
                    background: `linear-gradient(90deg, ${ind.color}60, transparent)`,
                  }}
                />

                {/* ID + clearance */}
                <div className="flex items-center justify-between mb-4">
                  <div className="terminal-line" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                    {ind.id}
                  </div>
                  <span
                    className="hex-tag"
                    style={{ color: clearanceColor[ind.clearance], borderColor: `${clearanceColor[ind.clearance]}22`, fontSize: 7, background: `${clearanceColor[ind.clearance]}06` }}
                  >
                    {ind.clearance}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#F2F4F7",
                    marginBottom: "0.25rem",
                  }}
                >
                  {ind.title}
                </h3>

                <div className="terminal-line mb-3" style={{ fontSize: 8, color: `${ind.color}55` }}>
                  {ind.sub}
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: "1rem",
                  }}
                >
                  {ind.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {ind.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="hex-tag"
                      style={{ color: `${ind.color}55`, borderColor: `${ind.color}15`, fontSize: 7, background: `${ind.color}05` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom corner */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, right: 0,
                    width: 16, height: 16,
                    borderBottom: `1px solid ${ind.color}25`,
                    borderRight: `1px solid ${ind.color}25`,
                  }}
                />
              </Tilt3D>
            </motion.div>
          ))}

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 + INDUSTRIES.length * 0.07 }}
          >
            <Tilt3D
              intensity={5}
              style={{
                background: "rgba(139,92,246,0.025)",
                border: "1px solid rgba(139,92,246,0.08)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 200,
                height: "100%",
                cursor: "pointer",
                transition: "background 0.3s, border-color 0.3s",
              }}
            >
              <div>
                <div className="terminal-line mb-4" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                  SECTOR-08
                </div>
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Special Programs
                </h3>
                <p className="terminal-line" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", lineHeight: 1.7 }}>
                  Bespoke sovereign AI deployments for classified environments and special access programs. Contact for details.
                </p>
              </div>
              <div className="terminal-line" style={{ fontSize: 9, color: "rgba(139,92,246,0.35)", marginTop: "1rem" }}>
                CONTACT FOR ACCESS →
              </div>
            </Tilt3D>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
