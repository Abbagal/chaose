"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PROCESS = [
  { step: "01", label: "Submit Inquiry", desc: "Official government or institutional email required." },
  { step: "02", label: "Qualification Review", desc: "Our team reviews your operational requirements within 72hrs." },
  { step: "03", label: "Secure Briefing", desc: "Technical briefing under NDA for qualified organizations." },
  { step: "04", label: "Sovereign Deployment", desc: "On-premises deployment with full sovereign data control." },
];

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      style={{ background: "#080C12", position: "relative", overflow: "hidden" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 tactical-grid" style={{ opacity: 0.5 }} />

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(8rem, 20vw, 22rem)",
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: "transparent",
            WebkitTextStroke: "1px rgba(139,92,246,0.035)",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          CHAOS
        </motion.div>
      </div>

      {/* Animated glow orb */}
      <div
        className="orb-1 absolute"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 800, height: 800,
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, rgba(34,211,238,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Pulse rings */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "50%", left: "50%", width: 400, height: 400 }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(139,92,246,0.06)",
            }}
            animate={{
              scale: [1, 2.5, 2.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 1.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="glow-line" />
      <div className="absolute bottom-0 left-0 right-0 glow-line" />

      {/* Corner chrome */}
      <div className="absolute inset-8 pointer-events-none">
        {[
          { top: 0, left: 0, borderTop: "1px solid rgba(139,92,246,0.1)", borderLeft: "1px solid rgba(139,92,246,0.1)", width: 56, height: 56 },
          { top: 0, right: 0, borderTop: "1px solid rgba(139,92,246,0.1)", borderRight: "1px solid rgba(139,92,246,0.1)", width: 56, height: 56 },
          { bottom: 0, left: 0, borderBottom: "1px solid rgba(139,92,246,0.1)", borderLeft: "1px solid rgba(139,92,246,0.1)", width: 56, height: 56 },
          { bottom: 0, right: 0, borderBottom: "1px solid rgba(139,92,246,0.1)", borderRight: "1px solid rgba(139,92,246,0.1)", width: 56, height: 56 },
        ].map((style, i) => (
          <div key={i} className="absolute" style={style} />
        ))}
      </div>

      <div
        className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center"
        style={{ paddingTop: "7rem", paddingBottom: "7rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4))", transformOrigin: "right" }}
            />
            <span className="terminal-line" style={{ color: "rgba(139,92,246,0.45)", letterSpacing: "0.3em", fontSize: 9 }}>
              ENGAGE CHAOS // RESTRICTED ACCESS
            </span>
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(139,92,246,0.4))", transformOrigin: "left" }}
            />
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ color: "#fff" }}>Build The Future Of</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #22D3EE, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200%",
                animation: "gradientShift 4s ease-in-out infinite",
                display: "inline-block",
                filter: "drop-shadow(0 0 40px rgba(139,92,246,0.3))",
              }}
            >
              Operational Intelligence
            </span>
          </h2>

          <motion.div
            className="glow-line"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ maxWidth: 480, margin: "0 auto 2rem", transformOrigin: "center" }}
          />

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.38)",
              maxWidth: 540,
              margin: "0 auto 3rem",
            }}
          >
            Chaos works with select government and defence partners. Contact our team to discuss sovereign AI deployment for your mission.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/contact" className="btn-primary">
              Talk To Our Team
              <ArrowRight size={14} />
            </Link>
            <Link href="/platform" className="btn-secondary">
              Platform Overview
            </Link>
          </div>

          {/* Process steps */}
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px text-left perspective-container"
            style={{ background: "rgba(255,255,255,0.03)", maxWidth: 900, margin: "0 auto" }}
          >
            {PROCESS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "rgba(6,9,15,0.98)",
                  padding: "1.25rem",
                  borderTop: "2px solid transparent",
                  transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderTopColor = "rgba(139,92,246,0.4)";
                  el.style.background = "rgba(12,18,28,0.99)";
                  el.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3), 0 0 15px rgba(139,92,246,0.05)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderTopColor = "transparent";
                  el.style.background = "rgba(6,9,15,0.98)";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 900,
                    fontSize: "1.5rem",
                    background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.06))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "0.5rem",
                  }}
                >
                  {p.step}
                </div>
                <div className="terminal-line mb-1" style={{ fontSize: 8, color: "rgba(139,92,246,0.3)" }}>
                  STEP {p.step}
                </div>
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: "0.4rem",
                  }}
                >
                  {p.label}
                </div>
                <p className="terminal-line" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Fine print */}
          <p className="terminal-line mt-8" style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", letterSpacing: "0.15em" }}>
            ENGAGEMENTS REQUIRE VERIFIED GOVERNMENT OR INSTITUTIONAL AUTHORIZATION // CHAOS-ENGAGE-PROTO-v2.4
          </p>
        </motion.div>
      </div>
    </section>
  );
}
