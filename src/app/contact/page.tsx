"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Lock, Server } from "lucide-react";

const INQUIRY_TYPES = [
  "Platform Demonstration (SANJAY)",
  "Sovereign Deployment Consultation",
  "Research Partnership",
  "Custom System Development",
  "Technology Licensing",
  "Other",
];

const SECURITY_FEATURES = [
  { icon: Lock, label: "End-to-End Encrypted", desc: "All communications encrypted in transit" },
  { icon: Shield, label: "Verified Partners Only", desc: "Government and institutional access only" },
  { icon: Server, label: "Sovereign Infrastructure", desc: "No third-party data processing" },
];

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#05070A] min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(125,249,255,0.06),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7DF9FF]/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#7DF9FF]/40" />
              <span className="font-mono text-[11px] text-[#7DF9FF]/50 tracking-[0.3em] uppercase">Engage Chaos</span>
            </div>
            <h1 className="text-5xl lg:text-8xl font-tight font-black uppercase leading-[0.9] tracking-tight mb-8">
              <span className="text-white">Build The Future</span>
              <br />
              <span className="text-[#7DF9FF]">Of Operational</span>
              <br />
              <span className="text-white">Intelligence</span>
            </h1>
            <p className="text-white/50 text-xl leading-relaxed font-grotesk max-w-2xl">
              Chaos works with select government and defence partners. Use this form to request a conversation with our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + info */}
      <section ref={ref} className="relative py-16 lg:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="border border-[#00FFB3]/20 bg-[#00FFB3]/[0.04] p-12 text-center">
                  <div className="w-12 h-12 border-2 border-[#00FFB3]/40 flex items-center justify-center mx-auto mb-6">
                    <div className="w-4 h-4 bg-[#00FFB3]" />
                  </div>
                  <div className="font-mono text-[11px] text-[#00FFB3]/60 tracking-widest uppercase mb-4">
                    Request Received
                  </div>
                  <h3 className="text-2xl font-tight font-black uppercase text-white mb-4">
                    Submission Acknowledged
                  </h3>
                  <p className="text-white/40 text-sm font-grotesk">
                    Our team will review your inquiry and respond via secure channel within 48–72 hours. Only qualified government and institutional partners will receive a response.
                  </p>
                  <div className="mt-8 font-mono text-[10px] text-white/20 tracking-widest uppercase">
                    CHAOS-REQ-{Math.random().toString(36).slice(2, 10).toUpperCase()}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Classified notice */}
                  <div className="border border-[#FF6B35]/20 bg-[#FF6B35]/[0.04] p-4 flex items-start gap-3">
                    <Lock size={14} className="text-[#FF6B35]/60 mt-0.5 flex-shrink-0" />
                    <p className="font-mono text-[10px] text-[#FF6B35]/50 tracking-wider leading-relaxed">
                      This form is for qualified government and institutional inquiries only. Submissions are logged and reviewed. False representations may be reported to relevant authorities.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-[#0B0F14] border border-white/[0.08] text-white text-sm p-3 focus:outline-none focus:border-[#7DF9FF]/30 transition-colors font-grotesk placeholder:text-white/20"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-[#0B0F14] border border-white/[0.08] text-white text-sm p-3 focus:outline-none focus:border-[#7DF9FF]/30 transition-colors font-grotesk placeholder:text-white/20"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-[#0B0F14] border border-white/[0.08] text-white text-sm p-3 focus:outline-none focus:border-[#7DF9FF]/30 transition-colors font-grotesk placeholder:text-white/20"
                      placeholder="name@organization.gov"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">
                      Organization *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#0B0F14] border border-white/[0.08] text-white text-sm p-3 focus:outline-none focus:border-[#7DF9FF]/30 transition-colors font-grotesk placeholder:text-white/20"
                      placeholder="Ministry of Defence / Agency name"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">
                      Nature of Inquiry *
                    </label>
                    <select
                      required
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-[#0B0F14] border border-white/[0.08] text-white text-sm p-3 focus:outline-none focus:border-[#7DF9FF]/30 transition-colors font-grotesk appearance-none"
                    >
                      <option value="" className="bg-[#0B0F14]">Select inquiry type</option>
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-[#0B0F14]">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">
                      Mission Context
                    </label>
                    <textarea
                      rows={5}
                      className="w-full bg-[#0B0F14] border border-white/[0.08] text-white text-sm p-3 focus:outline-none focus:border-[#7DF9FF]/30 transition-colors font-grotesk resize-none placeholder:text-white/20"
                      placeholder="Describe your operational requirements, deployment environment, and timeline."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#7DF9FF] text-[#05070A] font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors duration-200"
                  >
                    Submit Secure Request
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center font-mono text-[9px] text-white/20 tracking-widest uppercase">
                    All submissions transmitted over TLS 1.3. No third-party data processing.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Sidebar info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Security features */}
              <div>
                <div className="font-mono text-[11px] text-[#7DF9FF]/50 tracking-[0.3em] uppercase mb-6">
                  Secure Channel
                </div>
                <div className="space-y-4">
                  {SECURITY_FEATURES.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 p-4 border border-white/[0.06] bg-[#0B0F14]/50">
                        <div className="w-8 h-8 flex items-center justify-center border border-[#7DF9FF]/20 text-[#7DF9FF] flex-shrink-0">
                          <Icon size={14} />
                        </div>
                        <div>
                          <div className="text-sm font-tight font-bold uppercase text-white mb-1">{feat.label}</div>
                          <div className="text-xs text-white/30 font-grotesk">{feat.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Response times */}
              <div className="border border-white/[0.06] p-6">
                <div className="font-mono text-[11px] text-[#7DF9FF]/50 tracking-[0.3em] uppercase mb-6">
                  Response Protocol
                </div>
                <div className="space-y-4">
                  {[
                    { type: "Initial Response", time: "48–72 hours" },
                    { type: "Qualification Review", time: "5–7 business days" },
                    { type: "Technical Briefing", time: "2–3 weeks (if qualified)" },
                    { type: "Demonstration Access", time: "Subject to clearance" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-white/30 font-grotesk">{item.type}</span>
                      <span className="font-mono text-[10px] text-[#7DF9FF]/50 tracking-wider">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct contact */}
              <div className="border border-white/[0.06] p-6">
                <div className="font-mono text-[11px] text-[#7DF9FF]/50 tracking-[0.3em] uppercase mb-4">
                  Direct Contact
                </div>
                <p className="text-xs text-white/30 font-grotesk mb-4">
                  For urgent national security inquiries, contact our secure operations desk directly.
                </p>
                <a
                  href="mailto:ops@chaosdefenceai.in"
                  className="font-mono text-[11px] text-[#7DF9FF]/60 tracking-wider hover:text-[#7DF9FF] transition-colors"
                >
                  ops@chaosdefenceai.in
                </a>
              </div>

              {/* Classification */}
              <div className="font-mono text-[9px] text-white/15 tracking-widest uppercase leading-relaxed">
                CHAOS-ENGAGE // RESTRICTED ACCESS<br />
                ENGAGEMENTS REQUIRE VERIFIED INSTITUTIONAL AUTHORIZATION<br />
                REF: CHAOS-CONTACT-PROTO-v2.4
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
