"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const LINKS = {
  Platform: [
    { label: "SANJAY Overview", href: "/platform" },
    { label: "Intelligence Fusion", href: "/platform#capabilities" },
    { label: "Mission Planning", href: "/platform#capabilities" },
    { label: "AI Copilots", href: "/platform#capabilities" },
    { label: "Edge Deployment", href: "/platform#architecture" },
  ],
  Capabilities: [
    { label: "Battlespace Visualization", href: "/#capabilities" },
    { label: "Sensor Fusion", href: "/#capabilities" },
    { label: "Autonomous Systems", href: "/#capabilities" },
    { label: "Digital Twins", href: "/#capabilities" },
  ],
  Technology: [
    { label: "AI Research", href: "/#technology" },
    { label: "Computer Vision", href: "/#technology" },
    { label: "Geospatial Intelligence", href: "/#technology" },
    { label: "Edge AI", href: "/#technology" },
  ],
  Company: [
    { label: "About Chaos", href: "/about" },
    { label: "Research Programs", href: "/about#research" },
    { label: "Contact", href: "/contact" },
    { label: "Request Demo", href: "/contact" },
  ],
};

const SYSTEM_METRICS = [
  { label: "SANJAY", value: "v2.4.1", color: "#8B5CF6" },
  { label: "NODES", value: "4,847", color: "#22D3EE" },
  { label: "UPTIME", value: "99.99%", color: "#22D3EE" },
  { label: "LATENCY", value: "74ms", color: "#8B5CF6" },
  { label: "STATUS", value: "OPERATIONAL", color: "#22D3EE" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#F8FAFC",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top glow line */}
      <div className="glow-line" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.15 }} />

      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop: "4rem", paddingBottom: "2.5rem" }}
      >
        {/* System status bar */}
        <div
          className="flex flex-wrap items-center gap-6 mb-12 pb-6"
          style={{ borderBottom: "1px solid rgba(15,23,42,0.07)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="animate-node-glow"
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#22D3EE" }}
            />
            <span className="terminal-line" style={{ fontSize: 9, color: "rgba(34,211,238,0.55)", letterSpacing: "0.2em" }}>
              CHAOS SYSTEMS OPERATIONAL
            </span>
          </div>
          {SYSTEM_METRICS.map((m) => (
            <div key={m.label} className="terminal-line flex items-center gap-2" style={{ fontSize: 9 }}>
              <span style={{ color: "rgba(15,23,42,0.35)" }}>{m.label}:</span>
              <span style={{ color: m.color }}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Main footer grid */}
        <div className="grid lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
              <div style={{ position: "relative", width: 28, height: 28 }}>
                <div style={{
                  position: "absolute", inset: 0,
                  border: "1px solid rgba(139,92,246,0.25)",
                  transform: "rotate(45deg)",
                  boxShadow: "0 0 8px rgba(139,92,246,0.1)",
                }} />
                <div style={{ position: "absolute", inset: 5, background: "rgba(139,92,246,0.08)", transform: "rotate(45deg)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 4, height: 4, background: "#8B5CF6", borderRadius: "50%", boxShadow: "0 0 6px #8B5CF6" }} />
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 900,
                  fontSize: 14,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#0F172A",
                }}>
                  CHAOS
                </div>
                <div className="terminal-line" style={{ fontSize: 7, color: "rgba(139,92,246,0.35)", letterSpacing: "0.2em" }}>
                  DEFENCE AI RESEARCH
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                lineHeight: 1.8,
                color: "rgba(15,23,42,0.5)",
                marginBottom: "1.5rem",
                maxWidth: 280,
              }}
            >
              Defence AI Research and Decision Intelligence. Building sovereign AI systems for military, intelligence, and national security operations.
            </p>

            {/* Classification badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span className="classified-badge" style={{ alignSelf: "flex-start" }}>ITAR CONTROLLED</span>
              <span className="classified-badge" style={{ alignSelf: "flex-start", borderColor: "rgba(139,92,246,0.18)", color: "rgba(139,92,246,0.45)", background: "rgba(139,92,246,0.03)" }}>
                TS/SCI CAPABLE
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <div
                className="terminal-line mb-5"
                style={{ fontSize: 9, color: "rgba(139,92,246,0.35)", letterSpacing: "0.25em" }}
              >
                {category.toUpperCase()}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      textDecoration: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(15,23,42,0.5)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(124,58,237,0.85)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(15,23,42,0.5)";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(15,23,42,0.07)" }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
            <p className="terminal-line" style={{ fontSize: 9, color: "rgba(15,23,42,0.35)", letterSpacing: "0.1em" }}>
              © 2025 CHAOS DEFENCE AI RESEARCH PVT. LTD. ALL RIGHTS RESERVED.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy Policy", "Terms of Use", "Security"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    textDecoration: "none",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "rgba(15,23,42,0.35)",
                    letterSpacing: "0.1em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(124,58,237,0.75)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(15,23,42,0.35)"; }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="terminal-line" style={{ fontSize: 9, color: "rgba(15,23,42,0.3)", letterSpacing: "0.12em" }}>
            CHAOS-SANJAY-v2.4.1 // SOVEREIGN DEPLOYMENT // {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
