"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const RadarDisplay = dynamic(() => import("@/components/ui/RadarDisplay"), { ssr: false });
const NetworkGraph = dynamic(() => import("@/components/ui/NetworkGraph"), { ssr: false });

const CAPABILITIES = [
  "Multi-source intelligence fusion",
  "Geospatial visualization",
  "Link analysis",
  "Mission planning",
  "Entity resolution",
  "AI copilots",
  "Threat detection",
  "Event correlation",
  "Operational dashboards",
  "Real-time collaboration",
  "Autonomous workflows",
];

const FEED = [
  { src: "SIGINT-07", dest: "SANJAY-CORE", status: "FUSED", lat: "12ms" },
  { src: "SAT-IMG-14", dest: "GEO-ENGINE", status: "PROCESSING", lat: "8ms" },
  { src: "HUMINT-03", dest: "ENTITY-RES", status: "VERIFIED", lat: "34ms" },
  { src: "RADAR-22", dest: "TRACK-AI", status: "ACTIVE", lat: "4ms" },
  { src: "COMMS-INT", dest: "LINK-ANAL", status: "ALERT", lat: "19ms" },
];

const FEED_COLOR: Record<string, string> = {
  FUSED: "#00FFB3",
  PROCESSING: "#7DF9FF",
  VERIFIED: "#00FFB3",
  ACTIVE: "#7DF9FF",
  ALERT: "#FF6B35",
};

export default function SANJAYPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      style={{ background: "#0B0F14", position: "relative", overflow: "hidden" }}
    >
      <div className="absolute inset-0 tactical-grid" style={{ opacity: 0.5 }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(125,249,255,0.04), transparent)",
        }}
      />

      {/* Top/bottom borders */}
      <div className="glow-line" />
      <div className="absolute bottom-0 left-0 right-0 glow-line" />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-6">Flagship Platform</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(4rem, 10vw, 9rem)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "#fff",
                }}
              >
                SANJAY
              </h2>
              <p
                className="terminal-line mt-3"
                style={{ color: "rgba(125,249,255,0.5)", letterSpacing: "0.25em" }}
              >
                SOVEREIGN DECISION INTELLIGENCE PLATFORM
              </p>
            </div>
            <div className="flex gap-4 pb-2">
              <Link href="/platform" className="btn-primary">
                Explore Platform <ArrowRight size={13} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Request Access
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Main content grid ────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left panel – description + capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4"
            style={{
              background: "rgba(5,7,10,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "1.5rem",
            }}
          >
            {/* Corner chrome */}
            <div style={{ position: "relative", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: "1px solid rgba(125,249,255,0.4)", borderLeft: "1px solid rgba(125,249,255,0.4)" }} />
              <div className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: "1px solid rgba(125,249,255,0.4)", borderRight: "1px solid rgba(125,249,255,0.4)" }} />
              <div className="terminal-line mb-2" style={{ color: "rgba(125,249,255,0.4)", fontSize: 9 }}>
                SANJAY // CAPABILITY MANIFEST
              </div>
            </div>

            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.45)",
                marginBottom: "1.5rem",
              }}
            >
              Integrates intelligence sources, sensor networks, operational databases, geospatial systems, and AI models into a unified operational picture — in any environment.
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 py-1.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div style={{ width: 4, height: 4, background: "#7DF9FF", flexShrink: 0, opacity: 0.7 }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
                    {cap}
                  </span>
                  <div className="ml-auto terminal-line" style={{ fontSize: 8, color: "rgba(0,255,179,0.35)" }}>
                    ACTIVE
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center panel – network graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
            style={{
              background: "rgba(5,7,10,0.7)",
              border: "1px solid rgba(125,249,255,0.1)",
              overflow: "hidden",
              minHeight: 380,
            }}
          >
            {/* Corner accents */}
            {[
              { top: 0, left: 0, borderTop: "2px solid rgba(125,249,255,0.4)", borderLeft: "2px solid rgba(125,249,255,0.4)" },
              { top: 0, right: 0, borderTop: "2px solid rgba(125,249,255,0.4)", borderRight: "2px solid rgba(125,249,255,0.4)" },
              { bottom: 0, left: 0, borderBottom: "2px solid rgba(125,249,255,0.4)", borderLeft: "2px solid rgba(125,249,255,0.4)" },
              { bottom: 0, right: 0, borderBottom: "2px solid rgba(125,249,255,0.4)", borderRight: "2px solid rgba(125,249,255,0.4)" },
            ].map((style, i) => (
              <div key={i} className="absolute w-5 h-5" style={style} />
            ))}

            {/* Label */}
            <div
              className="absolute top-4 left-4 z-10 terminal-line"
              style={{ fontSize: 9, color: "rgba(125,249,255,0.5)" }}
            >
              SANJAY-NET // INTELLIGENCE TOPOLOGY
            </div>
            <div
              className="absolute top-4 right-4 z-10 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00FFB3", animation: "dataPulse 1.5s ease-in-out infinite" }} />
              <span className="terminal-line" style={{ fontSize: 9, color: "rgba(0,255,179,0.5)" }}>LIVE</span>
            </div>

            {/* Network canvas – full bleed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <NetworkGraph width={480} height={360} />
            </div>

            {/* Bottom legend */}
            <div
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
            >
              {[
                { color: "#7DF9FF", label: "HUB NODE" },
                { color: "#00FFB3", label: "ACTIVE NODE" },
                { color: "rgba(125,249,255,0.4)", label: "SENSOR NODE" },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="terminal-line" style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column – radar + data feed */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                background: "rgba(5,7,10,0.9)",
                border: "1px solid rgba(0,255,179,0.12)",
                padding: "1rem",
              }}
            >
              <div className="terminal-line mb-3 pb-2" style={{ fontSize: 9, color: "rgba(0,255,179,0.4)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                THREAT RADAR // SECTOR-7 // LIVE
              </div>
              <div className="flex justify-center">
                <RadarDisplay size={220} />
              </div>
              {/* Blip legend */}
              <div className="flex justify-between mt-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { color: "#FF6B35", label: "HOSTILE" },
                  { color: "#00FFB3", label: "FRIENDLY" },
                  { color: "#7DF9FF", label: "UNKNOWN" },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
                    <span className="terminal-line" style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Data ingestion feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{
                background: "rgba(5,7,10,0.9)",
                border: "1px solid rgba(125,249,255,0.08)",
                padding: "1rem",
                flex: 1,
              }}
            >
              <div className="terminal-line mb-3 pb-2" style={{ fontSize: 9, color: "rgba(125,249,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                INGESTION PIPELINE // REAL-TIME
              </div>
              {FEED.map((row, i) => (
                <div
                  key={i}
                  className="py-2 flex flex-col gap-0.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: FEED_COLOR[row.status] }} />
                      <span className="terminal-line" style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>
                        {row.src}
                      </span>
                    </div>
                    <span className="terminal-line" style={{ fontSize: 8, color: FEED_COLOR[row.status] }}>
                      {row.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pl-3">
                    <span className="terminal-line" style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>
                      → {row.dest}
                    </span>
                    <span className="terminal-line" style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>
                      {row.lat}
                    </span>
                  </div>
                </div>
              ))}
              <div className="terminal-line mt-3" style={{ fontSize: 8, color: "rgba(125,249,255,0.25)", textAlign: "center" }}>
                INGESTING 47 SOURCES // 2.3TB/hr
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
