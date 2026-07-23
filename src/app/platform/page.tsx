"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Shield, Eye, Brain, Network, Crosshair, Layers, Zap, Users, BarChart2, GitMerge, Workflow } from "lucide-react";

const CommandCenter = dynamic(() => import("@/components/3d/CommandCenter"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const PLATFORM_CAPABILITIES = [
  { icon: Layers, title: "Multi-Source Intelligence Fusion", desc: "Ingest and fuse SIGINT, HUMINT, IMINT, MASINT, OSINT in real time. One authoritative picture." },
  { icon: Eye, title: "Geospatial Visualization", desc: "Interactive 3D terrain, satellite imagery, and operational overlays. See everything, miss nothing." },
  { icon: GitMerge, title: "Link Analysis", desc: "Reveal hidden relationships between entities, events, locations, and communications at scale." },
  { icon: Crosshair, title: "Mission Planning", desc: "AI-assisted course of action development, deconfliction, and synchronization across assets." },
  { icon: Users, title: "Entity Resolution", desc: "Resolve identities across fragmented datasets. From alias to persona to network — complete picture." },
  { icon: Brain, title: "AI Copilots", desc: "Natural language interface to your operational data. Ask questions, get answers, generate assessments." },
  { icon: Shield, title: "Threat Detection", desc: "Automated anomaly detection, pattern-of-life analysis, and early warning across all domains." },
  { icon: Network, title: "Event Correlation", desc: "Connect disparate events across time and space. Surface emerging threats before they materialize." },
  { icon: BarChart2, title: "Operational Dashboards", desc: "Configurable commander dashboards. Tactical, operational, and strategic views in one system." },
  { icon: Users, title: "Real-Time Collaboration", desc: "Secure multi-user collaboration. Analysts, commanders, and coalition partners — same picture, same moment." },
  { icon: Workflow, title: "Autonomous Workflows", desc: "AI-powered automation for repetitive analytical tasks. Free your analysts for high-value work." },
  { icon: Zap, title: "Edge Deployment", desc: "Full SANJAY capability at the tactical edge. Disconnected, intermittent, or denied environments." },
];

const ARCHITECTURE = [
  { layer: "Presentation", desc: "Unified operational interface — web, desktop, and API", color: "#8B5CF6" },
  { layer: "Intelligence", desc: "AI reasoning, LLM copilots, decision support engines", color: "#22D3EE" },
  { layer: "Fusion", desc: "Multi-INT ingestion, entity resolution, knowledge graph", color: "#8B5CF6" },
  { layer: "Data", desc: "Secure classified data stores, encrypted at rest and in transit", color: "#F59E0B" },
  { layer: "Infrastructure", desc: "Air-gapped sovereign compute, FIPS 140-2 compliant", color: "#22D3EE" },
];

function CapabilityCard({ cap, index }: { cap: typeof PLATFORM_CAPABILITIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const Icon = cap.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative bg-white/[0.03] border border-white/[0.06] p-6 group hover:border-[#8B5CF6]/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 flex items-center justify-center border border-[#8B5CF6]/20 text-[#8B5CF6] flex-shrink-0 group-hover:border-[#8B5CF6]/50 transition-colors">
          <Icon size={16} />
        </div>
        <div>
          <h3 className="text-sm font-tight font-bold uppercase tracking-wide text-white mb-2">
            {cap.title}
          </h3>
          <p className="text-white/35 text-xs leading-relaxed font-grotesk">
            {cap.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PlatformPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archInView = useInView(archRef, { once: true });

  return (
    <div className="bg-[#05070A] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 tactical-grid opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(139,92,246,0.07),transparent)]" />

        {/* 3D command center — full background */}
        <div className="absolute inset-0 opacity-70">
          <CommandCenter />
        </div>

        {/* Bottom fade for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05070A]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="classified-badge">PLATFORM OVERVIEW</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
              <span className="font-mono text-[10px] text-[#22D3EE]/60 tracking-[0.2em] uppercase">Live</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-8xl lg:text-[12rem] font-tight font-black uppercase leading-none tracking-tighter gradient-text-cyan mb-4">
              SANJAY
            </h1>
            <div className="font-mono text-[12px] text-[#8B5CF6]/60 tracking-[0.4em] uppercase mb-8">
              Sovereign Decision Intelligence Platform
            </div>
            <div className="glow-line max-w-xl mb-8" />
            <p className="text-white/50 text-xl leading-relaxed font-grotesk max-w-2xl mb-10">
              SANJAY integrates intelligence sources, sensor networks, operational databases, geospatial information, communications systems, and AI models into a unified operational picture — accessible in the most contested environments.
            </p>
            <div className="flex gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#07060F] font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors"
              >
                Request Access
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#capabilities"
                className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white/60 font-medium text-sm tracking-wider uppercase hover:border-white/40 hover:text-white transition-all"
              >
                View Capabilities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section id="capabilities" className="relative py-24 bg-[#05070A]">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#8B5CF6]/40" />
            <span className="font-mono text-[11px] text-[#8B5CF6]/50 tracking-[0.3em] uppercase">
              Platform Capabilities
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-tight font-black uppercase text-white mb-12 leading-tight">
            11 Core Capabilities.<br />
            <span className="gradient-text-cyan">One Unified System.</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PLATFORM_CAPABILITIES.map((cap, i) => (
              <CapabilityCard key={i} cap={cap} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section ref={archRef} className="relative py-24 bg-[#05070A]">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/15 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#8B5CF6]/40" />
            <span className="font-mono text-[11px] text-[#8B5CF6]/50 tracking-[0.3em] uppercase">
              Platform Architecture
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl lg:text-5xl font-tight font-black uppercase text-white mb-8 leading-tight">
                Sovereign.<br />
                <span className="gradient-text-cyan">Air-Gapped.</span><br />
                Mission-Ready.
              </h2>
              <p className="text-white/40 text-base leading-relaxed font-grotesk mb-8">
                SANJAY is designed from the ground up for classified deployment. No cloud dependency. No data leaves your infrastructure. Full sovereign control.
              </p>
              <div className="space-y-1">
                {["FIPS 140-2 compliant encryption", "Zero-trust network architecture", "Air-gapped deployment ready", "Hardware security module integration", "Multi-level security (MLS) support", "Common Criteria evaluation available"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <div className="w-1 h-1 bg-[#22D3EE] flex-shrink-0" />
                    <span className="text-sm text-white/50 font-grotesk">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture stack */}
            <div className="space-y-2">
              {ARCHITECTURE.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={archInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 border border-white/[0.06] bg-white/[0.03] group hover:border-white/10 transition-colors"
                >
                  <div className="font-mono text-[10px] tracking-widest uppercase w-20 flex-shrink-0 text-right" style={{ color: `${layer.color}60` }}>
                    {layer.layer}
                  </div>
                  <div className="w-px h-8 flex-shrink-0" style={{ background: layer.color, opacity: 0.3 }} />
                  <div>
                    <p className="text-sm text-white/50 font-grotesk">{layer.desc}</p>
                  </div>
                  <div className="ml-auto w-2 h-2 flex-shrink-0" style={{ background: layer.color, opacity: 0.4 }} />
                </motion.div>
              ))}
              {/* Version info */}
              <div className="pt-4 font-mono text-[10px] text-white/20 tracking-widest text-right uppercase">
                SANJAY v2.4.1 // PRODUCTION BUILD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[#05070A]">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="classified-badge">RESTRICTED ACCESS</span>
          <h2 className="text-4xl lg:text-5xl font-tight font-black uppercase text-white mt-8 mb-6">
            Ready to Deploy <span className="gradient-text-cyan">SANJAY</span>?
          </h2>
          <p className="text-white/40 text-base font-grotesk mb-8">
            SANJAY is available for sovereign deployment to qualified government and defence organizations. Contact our team for evaluation access.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#07060F] font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors"
          >
            Request Demonstration
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
