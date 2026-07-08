"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RESEARCH_AREAS = [
  { area: "Autonomous Decision-Making", focus: "Multi-agent reinforcement learning for complex operational environments" },
  { area: "Adversarial AI Robustness", focus: "Building AI systems resistant to adversarial manipulation in contested domains" },
  { area: "Federated Intelligence", focus: "Distributed intelligence fusion without centralizing classified data" },
  { area: "Tactical Edge AI", focus: "Model compression and inference optimization for resource-constrained deployment" },
  { area: "Explainable AI for Defence", focus: "Interpretable AI recommendations for high-stakes operational decisions" },
  { area: "Secure LLM Deployment", focus: "On-premises large language models for classified intelligence analysis" },
];

const PRINCIPLES = [
  { code: "01", title: "Sovereign by Design", body: "Every system we build is designed for sovereign deployment first. No cloud dependency, no third-party data exposure, no foreign infrastructure risk." },
  { code: "02", title: "Mission First", body: "Technology is subordinate to mission requirements. We start from operational doctrine, not product roadmaps." },
  { code: "03", title: "Research-Led", body: "Our engineering is grounded in deep research. We build what doesn't yet exist — not adapt what already does." },
  { code: "04", title: "Long-Term Partnerships", body: "We engage in multi-year partnerships, not transactional sales. Our success is measured by operational outcomes, not software licenses." },
];

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: true });
  const researchInView = useInView(researchRef, { once: true });
  const principlesInView = useInView(principlesRef, { once: true });

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.06),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#8B5CF6]/40" />
              <span className="font-mono text-[11px] text-[#8B5CF6]/50 tracking-[0.3em] uppercase">
                Defence AI Research Lab
              </span>
            </div>
            <h1 className="text-5xl lg:text-8xl font-tight font-black uppercase leading-[0.9] tracking-tight mb-8">
              <span className="text-black">We Build</span>
              <br />
              <span className="gradient-text-cyan">What Keeps</span>
              <br />
              <span className="text-black">Nations Secure.</span>
            </h1>
            <div className="glow-line max-w-xl mb-8" />
            <p className="text-black/50 text-xl leading-relaxed font-grotesk max-w-2xl">
              Chaos is a Defence AI Research company — not a consulting firm, not a software reseller. We exist to build sovereign AI systems that change the operational reality for those who defend nations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="relative py-24 bg-[#FFFFFF]">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[#8B5CF6]/40" />
                <span className="font-mono text-[11px] text-[#8B5CF6]/50 tracking-[0.3em] uppercase">Mission</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-tight font-black uppercase leading-[0.9] tracking-tight text-black mb-8">
                Decision Advantage <span className="gradient-text-cyan">Through</span> Sovereign AI
              </h2>
              <blockquote className="border-l-2 border-[#8B5CF6]/40 pl-6 mb-8">
                <p className="text-black/70 text-lg leading-relaxed font-grotesk italic">
                  "To build sovereign AI systems that enhance operational awareness, accelerate decision-making, and strengthen national security."
                </p>
              </blockquote>
              <p className="text-black/40 text-base leading-relaxed font-grotesk">
                We measure success by one metric: do the operators who depend on our systems have greater clarity, speed, and confidence in their decisions? If yes, we have succeeded.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-px bg-black/[0.06]"
            >
              {[
                { label: "Founded", value: "2021" },
                { label: "Focus", value: "Defence AI Research" },
                { label: "Deployment Model", value: "Sovereign / On-Premises" },
                { label: "Classification", value: "Up to TS/SCI" },
                { label: "Flagship Platform", value: "SANJAY v2.4.1" },
                { label: "Nations Deployed", value: "17+" },
              ].map((item, i) => (
                <div key={i} className="flex items-center bg-[#FFFFFF] px-6 py-4">
                  <span className="font-mono text-[11px] text-black/30 tracking-widest uppercase w-40">{item.label}</span>
                  <span className="text-black/70 text-sm font-grotesk">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research */}
      <section ref={researchRef} id="research" className="relative py-24 bg-[#FFFFFF]">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={researchInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#8B5CF6]/40" />
              <span className="font-mono text-[11px] text-[#8B5CF6]/50 tracking-[0.3em] uppercase">Research Programs</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-tight font-black uppercase text-black leading-tight">
              Active Research <span className="gradient-text-cyan">Areas</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-black/[0.06]">
            {RESEARCH_AREAS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={researchInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#FFFFFF] p-8 group hover:bg-[#FFFFFF] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="font-mono text-[10px] text-[#8B5CF6]/30 tracking-widest mt-1 flex-shrink-0">
                    RES-{String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-base font-tight font-bold uppercase tracking-wide text-black mb-2 group-hover:text-[#8B5CF6] transition-colors">
                      {item.area}
                    </h3>
                    <p className="text-black/35 text-sm leading-relaxed font-grotesk">{item.focus}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={researchInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 p-5 border border-[#F59E0B]/20 bg-[#F59E0B]/[0.03]"
          >
            <p className="font-mono text-[11px] text-[#F59E0B]/50 tracking-widest uppercase">
              Research publications, technical papers, and capability demonstrations are available to cleared partners under NDA. Contact our research team for access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section ref={principlesRef} className="relative py-24 bg-[#FFFFFF]">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-4 mb-16"
          >
            <div className="h-px w-12 bg-[#8B5CF6]/40" />
            <span className="font-mono text-[11px] text-[#8B5CF6]/50 tracking-[0.3em] uppercase">Operating Principles</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-8 border border-black/[0.06] group hover:border-[#8B5CF6]/15 transition-colors"
              >
                <div className="absolute top-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#8B5CF6]/40 to-transparent" />
                <div className="font-mono text-[11px] text-[#8B5CF6]/30 tracking-widest mb-4">{p.code}</div>
                <h3 className="text-xl font-tight font-bold uppercase tracking-wide text-black mb-4">{p.title}</h3>
                <p className="text-black/40 text-sm leading-relaxed font-grotesk">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[#FFFFFF] text-center">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-tight font-black uppercase text-black mb-6">
            Work With <span className="gradient-text-cyan">Chaos</span>
          </h2>
          <p className="text-black/40 text-base font-grotesk mb-8">
            We engage with select government and defence partners for sovereign AI deployment programs. Start a conversation with our team.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#07060F] font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors"
          >
            Engage Our Team
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
