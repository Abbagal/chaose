"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  Brain,
  MessageSquare,
  Network,
  Map,
  Users,
  RefreshCw,
  Shield,
  FileSearch,
  Lightbulb,
  Globe,
  Lock,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: FileText,
    title: "Turns documents into knowledge",
    description:
      "Reads PDFs, Word, Excel, PowerPoint, and images (including scanned pages) - automatically extracting important people, places, organisations, equipment, events, and relationships. Nothing has to be tagged by hand.",
  },
  {
    icon: Brain,
    title: "Understands meaning, not just keywords",
    description:
      "Every item is matched against a rich built-in knowledge map, so the system knows what things actually are - a person, a naval base, a military unit, a weapon system - and how they relate.",
  },
  {
    icon: MessageSquare,
    title: "Ask anything in plain English",
    description:
      "Chat assistant answers questions grounded in your own documents: who is connected to whom, what happened and when, what a document says, and more. No query language or training required.",
  },
  {
    icon: Network,
    title: "Connects the dots across documents",
    description:
      "Surfaces facts and links scattered across many files, so insights emerge that no single document states on its own. Fuses information into one connected picture.",
  },
  {
    icon: Lightbulb,
    title: "Interactive knowledge graph",
    description:
      "Explore entities and their connections visually. Click any item to see its details, properties, and where it sits within the larger structure of people, places, and organisations.",
  },
  {
    icon: Map,
    title: "Maps and locations",
    description:
      "Plots places - airports, ports, bases, cities - on an interactive map, and highlights the locations that are relevant to a question directly inside the answer.",
  },
  {
    icon: Users,
    title: "Cleans up and removes duplicates automatically",
    description:
      "Recognises the same person or place appearing under different names and aliases, merges genuine duplicates, and carefully avoids confusing two different people who share a name.",
  },
  {
    icon: RefreshCw,
    title: "Handles new information continuously",
    description:
      "As new documents arrive, processes them automatically and folds them into the knowledge base in near real time, so the picture stays current without manual effort.",
  },
  {
    icon: Shield,
    title: "Trustworthy, source-grounded answers",
    description:
      "Answers stay tied to the underlying source material. Flags conflicting accounts, and separates what can be said with high confidence from what remains uncertain or disputed.",
  },
  {
    icon: FileSearch,
    title: "Built for analysts",
    description:
      "On demand, produces executive briefings, intelligence assessments, timelines of events, and cause-and-effect or impact analysis - prioritised and written for decision-makers.",
  },
  {
    icon: Globe,
    title: "Broad, multi-domain coverage",
    description:
      "The underlying knowledge map spans multiple countries and domains - army, navy, air force, government, infrastructure, and more - so coverage is deep as well as wide.",
  },
  {
    icon: Lock,
    title: "Private and self-contained",
    description:
      "Can run entirely on your own infrastructure, with no dependence on outside services - keeping sensitive material fully under your control.",
  },
];

export default function SanjayCapabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 tactical-grid" style={{ opacity: 0.3 }} />

      {/* Glow effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,211,238,0.03), transparent)",
        }}
      />

      <div className="glow-line" />

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-6">Intelligence Knowledge Platform</div>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#0F172A",
              marginBottom: "1.5rem",
            }}
          >
            What SANJAY Does
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "rgba(15,23,42,0.5)",
              maxWidth: "48rem",
              margin: "0 auto",
            }}
          >
            Turns large collections of documents into a single, connected, searchable body of
            knowledge - and lets anyone explore it or ask questions in plain language.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                style={{
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(15,23,42,0.08)",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="group hover:border-[rgba(34,211,238,0.3)] transition-all duration-300"
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    borderTop: "2px solid rgba(34,211,238,0.5)",
                    borderLeft: "2px solid rgba(34,211,238,0.5)",
                  }}
                />

                {/* Icon */}
                <div
                  className="mb-4"
                  style={{
                    display: "inline-flex",
                    padding: "0.75rem",
                    background: "rgba(34,211,238,0.08)",
                    border: "1px solid rgba(34,211,238,0.2)",
                  }}
                >
                  <Icon size={24} style={{ color: "#22D3EE" }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "#0F172A",
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {capability.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "rgba(15,23,42,0.45)",
                  }}
                >
                  {capability.description}
                </p>

                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.05), transparent 70%)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p
            className="terminal-line"
            style={{
              color: "rgba(139,92,246,0.4)",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
            }}
          >
            IT READS EVERYTHING • UNDERSTANDS IT • CONNECTS IT • MAKES IT INSTANTLY EXPLORABLE
          </p>
        </motion.div>
      </div>
    </section>
  );
}
