"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Globe = dynamic(() => import("@/components/3d/Globe"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const ParticleCanvas = dynamic(() => import("@/components/ui/ParticleCanvas"), {
  ssr: false,
  loading: () => null,
});

/* ── terminal boot sequence ────────────────────────────────────── */
const BOOT_LINES = [
  { text: "CHAOS DEFENCE AI  v2.4.1", delay: 0 },
  { text: "SANJAY DECISION ENGINE ........ ONLINE", delay: 600 },
  { text: "SENSOR FUSION NODES ........... 4,847 ACTIVE", delay: 1100 },
  { text: "THREAT ANALYSIS ENGINE ........ STANDBY", delay: 1600 },
  { text: "ENCRYPTION LAYER .............. AES-256 / FIPS 140-2", delay: 2000 },
  { text: "READY", delay: 2400, highlight: true },
];

function BootLine({ text, delay, highlight }: { text: string; delay: number; highlight?: boolean }) {
  const [show, setShow] = useState(false);
  const [chars, setChars] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      setShow(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setChars(i);
        if (i >= text.length) clearInterval(iv);
      }, 18);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  if (!show) return null;
  return (
    <div
      className="terminal-line"
      style={{
        color: highlight ? "#8B5CF6" : undefined,
        fontWeight: highlight ? 700 : undefined,
        textShadow: highlight ? "0 0 12px rgba(139,92,246,0.6)" : undefined,
      }}
    >
      <span className="prompt">›</span>
      {text.slice(0, chars)}
      {chars < text.length && <span className="animate-pulse">_</span>}
    </div>
  );
}

/* ── live status row ────────────────────────────────────────────── */
const STATUS_ITEMS = [
  { label: "NETWORK", value: "SECURE", color: "#22D3EE" },
  { label: "NODES", value: "4,847", color: "#8B5CF6" },
  { label: "LATENCY", value: "74ms", color: "#8B5CF6" },
  { label: "UPTIME", value: "99.99%", color: "#22D3EE" },
  { label: "THREAT", value: "AMBER", color: "#F59E0B" },
];

/* ── stats ──────────────────────────────────────────────────────── */
const STATS = [
  { value: "17+", label: "Sovereign Nations" },
  { value: "99.99%", label: "Operational Uptime" },
  { value: "<80ms", label: "Decision Latency" },
  { value: "500TB+", label: "Intel Processed Daily" },
];

/* ── sidebar data feeds ─────────────────────────────────────────── */
const FEED_ITEMS = [
  { id: "EVT-7741", type: "SIGINT", status: "ACTIVE", time: "00:14:22" },
  { id: "EVT-7740", type: "IMINT", status: "PROCESSING", time: "00:16:44" },
  { id: "EVT-7739", type: "HUMINT", status: "VERIFIED", time: "00:19:07" },
  { id: "EVT-7738", type: "MASINT", status: "ACTIVE", time: "00:23:15" },
  { id: "EVT-7737", type: "OSINT", status: "ALERT", time: "00:31:02" },
];

const statusColor: Record<string, string> = {
  ACTIVE: "#8B5CF6",
  PROCESSING: "#22D3EE",
  VERIFIED: "#22D3EE",
  ALERT: "#F59E0B",
};

export default function Hero() {
  const [time, setTime] = useState("--:--:-- UTC");
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── mouse-tracking 3D parallax ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const contentX = useTransform(springX, [0, 1], [-12, 12]);
  const contentY = useTransform(springY, [0, 1], [-8, 8]);
  const globeX = useTransform(springX, [0, 1], [8, -8]);
  const globeY = useTransform(springY, [0, 1], [5, -5]);

  useEffect(() => {
    const iv = setInterval(() => {
      const now = new Date();
      setTime(now.toUTCString().split(" ")[4] + " UTC");
    }, 1000);

    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      clearInterval(iv);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: "#05070A" }}
    >
      {/* ── particle canvas background ─── */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas count={100} interactive />
      </div>

      {/* ── base grid ─── */}
      <div className="absolute inset-0 bg-grid z-[1]" />

      {/* ── ambient orbs ─── */}
      <div
        className="orb-1"
        style={{
          width: 600, height: 600,
          top: "10%", right: "15%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          zIndex: 2,
        }}
      />
      <div
        className="orb-2"
        style={{
          width: 400, height: 400,
          bottom: "20%", left: "5%",
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          zIndex: 2,
        }}
      />

      {/* ── 3D globe with parallax ─── */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 z-[3]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ width: "58%", x: globeX, y: globeY }}
      >
        <Globe />
      </motion.div>

      {/* ── left gradient mask (subtle legibility fade, not occlusion) ─── */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background:
            "linear-gradient(90deg, #05070A 0%, rgba(5,7,10,0.75) 30%, rgba(5,7,10,0.35) 50%, transparent 72%)",
        }}
      />
      {/* ── bottom fade ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[4]"
        style={{ height: 220, background: "linear-gradient(to top, #05070A, transparent)" }}
      />

      {/* ── scan line ─── */}
      <div className="animate-scan-line z-[5]" />

      {/* ── top bar ─── */}
      <div
        className="absolute top-[72px] left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-2 z-20"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(5,7,10,0.7)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-6">
          <span className="terminal-line text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            CHAOS // SOVEREIGN OPERATIONS // {time}
          </span>
          {STATUS_ITEMS.map((s) => (
            <div key={s.label} className="hidden lg:flex items-center gap-1.5">
              <div
                className="w-1 h-1 rounded-full animate-node-glow"
                style={{ background: s.color }}
              />
              <span className="terminal-line text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {s.label}:{" "}
                <span style={{ color: s.color }}>{s.value}</span>
              </span>
            </div>
          ))}
        </div>
        <span className="classified-badge">TS // SCI // NOFORN</span>
      </div>

      {/* ── main content with parallax ─── */}
      <motion.div
        className="relative z-10 flex flex-col justify-center px-6 lg:px-8 max-w-7xl mx-auto"
        style={{ minHeight: "100svh", paddingTop: 112, paddingBottom: 80, x: contentX, y: contentY }}
      >
        <div style={{ maxWidth: 680 }}>
          {/* Boot terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 p-4 glass-panel"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(139,92,246,0.15)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(139,92,246,0.06)",
            }}
          >
            {/* Terminal header bar */}
            <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#F59E0B", opacity: 0.7 }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#8B5CF6", opacity: 0.7 }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#22D3EE", opacity: 0.7 }} />
              <span className="terminal-line ml-2 text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>CHAOS_SYS_INIT</span>
            </div>
            {BOOT_LINES.map((l, i) => (
              <BootLine key={i} text={l.text} delay={l.delay} highlight={l.highlight} />
            ))}
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.6, duration: 0.5 }}
            className="section-label mb-6"
          >
            Defence AI Research / Decision Intelligence
          </motion.div>

          {/* Main headline with 3D depth */}
          <motion.h1
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 2.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              perspective: "1000px",
            }}
          >
            <span style={{ color: "#F2F4F7", display: "block" }}>Decision</span>
            <span
              className="glitch"
              style={{
                display: "block",
                background: "linear-gradient(135deg, #8B5CF6, #22D3EE, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 200%",
                animation: "gradientShift 4s ease-in-out infinite, textGlitch 10s infinite",
                textShadow: "none",
                filter: "drop-shadow(0 0 30px rgba(139,92,246,0.4))",
              }}
            >
              Superiority
            </span>
            <span style={{ color: "rgba(255,255,255,0.55)", display: "block", fontSize: "0.6em" }}>
              For Modern Operations
            </span>
          </motion.h1>

          {/* Glow divider */}
          <motion.div
            className="glow-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3.1, duration: 0.9, ease: "easeOut" }}
            style={{ transformOrigin: "left", maxWidth: 480, marginBottom: "1.5rem" }}
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.7 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 520,
              marginBottom: "2.5rem",
            }}
          >
            AI systems that transform fragmented intelligence, sensor feeds, and operational data into{" "}
            <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>
              mission-ready decisions.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link href="/contact" className="btn-primary">
              Request Demonstration
              <ArrowRight size={14} />
            </Link>
            <Link href="/platform" className="btn-secondary">
              Explore SANJAY
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.7 }}
            className="grid grid-cols-2 lg:grid-cols-4 glass-panel"
            style={{
              maxWidth: 640,
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.7 + i * 0.1, duration: 0.4 }}
              >
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                    background: "linear-gradient(135deg, #F2F4F7 50%, #8B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── right sidebar — intel feed ─── */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotateY: -10 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 3.8, duration: 0.8 }}
        className="absolute right-8 bottom-20 hidden xl:block z-20"
        style={{ width: 270 }}
      >
        <div
          className="p-4 glass-panel-strong"
          style={{
            boxShadow: "0 16px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.08), inset 0 1px 0 rgba(139,92,246,0.06)",
          }}
        >
          <div
            className="terminal-line mb-3 pb-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
          >
            <span className="prompt">SYS</span> LIVE INTELLIGENCE FEED
          </div>
          {FEED_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 4.0 + idx * 0.1 }}
              className="flex items-center justify-between py-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <div className="terminal-line" style={{ color: "rgba(255,255,255,0.55)", fontSize: 9 }}>
                  {item.id}
                </div>
                <div
                  className="terminal-line"
                  style={{ color: statusColor[item.status] || "#8B5CF6", fontSize: 9 }}
                >
                  {item.type} {"//"} {item.status}
                </div>
              </div>
              <div className="terminal-line" style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>
                {item.time}
              </div>
            </motion.div>
          ))}
          <div
            className="terminal-line mt-3 pt-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(139,92,246,0.6)", fontSize: 9 }}
          >
            SANJAY-NET // 4,847 NODES // OPERATIONAL
          </div>
        </div>
      </motion.div>

      {/* ── scroll indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <div className="terminal-line" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>
          SCROLL
        </div>
        <motion.div
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px"
          style={{
            height: 40,
            background: "linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
