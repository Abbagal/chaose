"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  type: "hub" | "node" | "sensor";
  pulse: number;
  pulseSpeed: number;
};

type Edge = { a: number; b: number; progress: number; speed: number };

const COLORS = {
  hub: "#8B5CF6",
  node: "#22D3EE",
  sensor: "rgba(139,92,246,0.4)",
};

export default function NetworkGraph({ width = 500, height = 400 }: { width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Generate nodes
    const nodes: Node[] = [];
    // Hub nodes
    for (let i = 0; i < 4; i++) {
      nodes.push({
        x: 60 + Math.random() * (width - 120),
        y: 40 + Math.random() * (height - 80),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: 7,
        type: "hub",
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }
    // Regular nodes
    for (let i = 0; i < 10; i++) {
      nodes.push({
        x: 40 + Math.random() * (width - 80),
        y: 30 + Math.random() * (height - 60),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: 4,
        type: "node",
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.03,
      });
    }
    // Sensor nodes
    for (let i = 0; i < 14; i++) {
      nodes.push({
        x: 20 + Math.random() * (width - 40),
        y: 20 + Math.random() * (height - 40),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 2.5,
        type: "sensor",
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.04 + Math.random() * 0.04,
      });
    }

    // Generate edges
    const edges: Edge[] = [];
    const maxDist = width * 0.35;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist && edges.length < 40) {
          edges.push({ a: i, b: j, progress: Math.random(), speed: 0.002 + Math.random() * 0.004 });
        }
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Update node positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < n.r || n.x > width - n.r) n.vx *= -1;
        if (n.y < n.r || n.y > height - n.r) n.vy *= -1;
      });

      // Draw edges
      edges.forEach((e) => {
        e.progress = (e.progress + e.speed) % 1;
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const alpha = Math.min(1, (maxDist - dist) / maxDist) * 0.15;

        // Static line
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Travelling pulse
        const px = a.x + dx * e.progress;
        const py = a.y + dy * e.progress;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#8B5CF6";
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw nodes
      nodes.forEach((n) => {
        const pulseScale = 1 + Math.sin(n.pulse) * 0.15;
        const color = COLORS[n.type];

        // Glow ring
        if (n.type !== "sensor") {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4 * pulseScale);
          const glowColor = n.type === "hub" ? "139,92,246" : "34,211,238";
          glow.addColorStop(0, `rgba(${glowColor},0.25)`);
          glow.addColorStop(1, `rgba(${glowColor},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4 * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width, height }}
    />
  );
}
