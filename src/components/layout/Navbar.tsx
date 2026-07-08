"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Platform", href: "/platform", tag: "SANJAY" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Technology", href: "/#technology" },
  { label: "Industries", href: "/#industries" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toUTCString().split(" ")[4] + " UTC");
    };
    update();
    const iv = setInterval(update, 1000);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearInterval(iv); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 72,
          display: "flex",
          alignItems: "center",
          transition: "background 0.4s, border-color 0.4s",
          background: scrolled ? "rgba(7,6,15,0.97)" : "rgba(7,6,15,0.6)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 lg:px-8 w-full"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            {/* Diamond icon */}
            <div style={{ position: "relative", width: 32, height: 32 }}>
              <div
                style={{
                  position: "absolute", inset: 0,
                  border: "1px solid rgba(139,92,246,0.4)",
                  transform: "rotate(45deg)",
                  transition: "border-color 0.3s",
                }}
              />
              <div
                style={{
                  position: "absolute", inset: 6,
                  background: "rgba(139,92,246,0.12)",
                  transform: "rotate(45deg)",
                }}
              />
              <div
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <div style={{ width: 5, height: 5, background: "#8B5CF6", borderRadius: "50%" }} />
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                CHAOS
              </div>
              <div
                className="terminal-line"
                style={{ fontSize: 8, color: "rgba(139,92,246,0.5)", marginTop: 2, letterSpacing: "0.2em" }}
              >
                DEFENCE AI RESEARCH
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#8B5CF6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {link.label}
                {link.tag && (
                  <span
                    style={{
                      fontSize: 7,
                      padding: "1px 5px",
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      color: "rgba(139,92,246,0.6)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {link.tag}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live clock */}
            <div className="terminal-line" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
              {time}
            </div>
            {/* Status dot */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22D3EE", animation: "dataPulse 2s ease-in-out infinite" }} />
              <span className="terminal-line" style={{ fontSize: 9, color: "rgba(34,211,238,0.5)", letterSpacing: "0.15em" }}>
                ONLINE
              </span>
            </div>
            {/* CTA */}
            <Link href="/contact" className="btn-primary" style={{ padding: "10px 20px", fontSize: 10 }}>
              Request Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 20,
                  height: 1,
                  background: mobileOpen && i === 1 ? "transparent" : "rgba(255,255,255,0.6)",
                  transform: mobileOpen
                    ? i === 0 ? "rotate(45deg) translate(4px, 4px)" : i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none"
                    : "none",
                  transition: "transform 0.2s, background 0.2s",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 72, left: 0, right: 0,
              zIndex: 49,
              background: "rgba(7,6,15,0.98)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
              padding: "2rem 1.5rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    textDecoration: "none",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    paddingBottom: "1rem",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ justifyContent: "center", marginTop: "0.5rem" }}
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
