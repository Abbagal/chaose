import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#05070A",
          secondary: "#0B0F14",
          tertiary: "#111820",
        },
        accent: {
          cyan: "#22D3EE",
          green: "#8B5CF6",
          orange: "#F59E0B",
        },
        grid: "rgba(255,255,255,0.05)",
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          accent: "rgba(139,92,246,0.3)",
        },
      },
      fontFamily: {
        tight: ["var(--font-tight)", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "9xl": ["8rem", { lineHeight: "0.9" }],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15), transparent)",
        "radial-glow-green":
          "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34,211,238,0.1), transparent)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        radar: "radar 3s linear infinite",
        "data-stream": "dataStream 2s linear infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "scan-line": "scanLine 4s linear infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        dataStream: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 30px rgba(34,211,238,0.2)",
        "glow-green": "0 0 30px rgba(139,92,246,0.2)",
        "glow-orange": "0 0 30px rgba(245,158,11,0.2)",
        "inner-glow": "inset 0 0 60px rgba(139,92,246,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
