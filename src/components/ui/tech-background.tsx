"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TechGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vertical scanning line */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"
        initial={{ left: "-10%" }}
        animate={{ left: "110%" }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
      />
    </div>
  );
}

export function FloatingCode() {
  const codeSnippets = [
    "const build = () => {}",
    "npm run dev",
    "git push origin main",
    "export default App",
    "async function fetch()",
    "<Component />",
    "return { success }",
    "import React from",
    "useState(null)",
    "className=''",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((code, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[10px] text-white/[0.03] whitespace-nowrap"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 17) % 100}%`,
          }}
          animate={{
            opacity: [0.02, 0.05, 0.02],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
}

export function GlowingOrb() {
  return (
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function NoiseTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

interface TechBackgroundProps {
  children?: React.ReactNode;
  variant?: "default" | "minimal" | "intense";
}

export function TechBackground({ children, variant = "default" }: TechBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-[#121212] text-white overflow-hidden">
      <TechGrid />
      {variant !== "minimal" && <FloatingCode />}
      <GlowingOrb />
      <NoiseTexture />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
