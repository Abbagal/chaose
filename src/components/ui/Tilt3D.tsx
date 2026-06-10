"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  glare?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function Tilt3D({ children, className = "", style = {}, intensity = 12, glare = true, onMouseEnter, onMouseLeave }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [glareOpacity, setGlareOpacity] = useState(0);

  const handleEnter = () => { onMouseEnter?.(); };
  const handleLeaveOuter = () => { handleLeave(); onMouseLeave?.(); };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rx = -dy * intensity;
    const ry = dx * intensity;
    setTransform(`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`);
    setGlarePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    setGlareOpacity(0.12);
  };

  const handleLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setGlareOpacity(0);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeaveOuter}
    >
      {children}
      {glare && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(125,249,255,${glareOpacity}), transparent 60%)`,
            transition: "opacity 0.15s",
            borderRadius: "inherit",
          }}
        />
      )}
    </div>
  );
}
