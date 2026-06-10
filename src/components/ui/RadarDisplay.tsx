"use client";

import { useEffect, useRef, useState } from "react";

type Blip = {
  id: number;
  angle: number;
  radius: number;
  brightness: number;
  type: "hostile" | "friendly" | "unknown";
};

const COLORS = {
  hostile: "#FF6B35",
  friendly: "#00FFB3",
  unknown: "#7DF9FF",
};

const LABELS = [
  { angle: 45, radius: 0.55, label: "A-TGT-04", type: "hostile" as const },
  { angle: 120, radius: 0.35, label: "F-AST-11", type: "friendly" as const },
  { angle: 210, radius: 0.7, label: "U-OBJ-07", type: "unknown" as const },
  { angle: 300, radius: 0.48, label: "F-UAV-03", type: "friendly" as const },
  { angle: 165, radius: 0.62, label: "A-TGT-09", type: "hostile" as const },
];

export default function RadarDisplay({ size = 280 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepAngle = useRef(0);
  const blips = useRef<Blip[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    blips.current = LABELS.map((b, i) => ({
      id: i,
      angle: (b.angle * Math.PI) / 180,
      radius: b.radius,
      brightness: 0,
      type: b.type,
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 8;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      // Background circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(5, 10, 8, 0.95)";
      ctx.fill();

      // Rings
      [0.25, 0.5, 0.75, 1].forEach((f) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,255,179,0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Cross hairs
      ctx.strokeStyle = "rgba(0,255,179,0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.stroke();

      // Sweep gradient
      const sweep = sweepAngle.current;

      // Draw sweep as a filled arc
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, sweep - 1.5, sweep, false);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      sweepGrad.addColorStop(0, "rgba(0,255,179,0.25)");
      sweepGrad.addColorStop(1, "rgba(0,255,179,0)");
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweep) * r, cy + Math.sin(sweep) * r);
      ctx.strokeStyle = "rgba(0,255,179,0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Fade trail
      ctx.save();
      for (let i = 1; i <= 40; i++) {
        const a = sweep - i * 0.04;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, a - 0.04, a, false);
        ctx.closePath();
        const alpha = (1 - i / 40) * 0.06;
        ctx.fillStyle = `rgba(0,255,179,${alpha})`;
        ctx.fill();
      }
      ctx.restore();

      // Blips
      blips.current.forEach((b) => {
        const angleDiff = ((b.angle - sweep) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (angleDiff < 0.08) {
          b.brightness = 1;
        } else {
          b.brightness = Math.max(0, b.brightness - 0.008);
        }

        if (b.brightness > 0.05) {
          const bx = cx + Math.cos(b.angle) * r * b.radius;
          const by = cy + Math.sin(b.angle) * r * b.radius;
          const color = COLORS[b.type];

          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = b.brightness;
          ctx.fill();

          // Glow
          const glow = ctx.createRadialGradient(bx, by, 0, bx, by, 12);
          glow.addColorStop(0, `${color}80`);
          glow.addColorStop(1, `${color}00`);
          ctx.beginPath();
          ctx.arc(bx, by, 12, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,255,179,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#00FFB3";
      ctx.fill();

      sweepAngle.current = (sweepAngle.current + 0.018) % (Math.PI * 2);
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
      {/* Labels */}
      {LABELS.map((b, i) => {
        const angle = (b.angle * Math.PI) / 180;
        const bx = size / 2 + Math.cos(angle) * (size / 2 - 8) * b.radius;
        const by = size / 2 + Math.sin(angle) * (size / 2 - 8) * b.radius;
        return (
          <div
            key={i}
            className="absolute terminal-line pointer-events-none"
            style={{
              left: bx + 8,
              top: by - 6,
              fontSize: 8,
              color: COLORS[b.type],
              opacity: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            {b.label}
          </div>
        );
      })}
    </div>
  );
}
