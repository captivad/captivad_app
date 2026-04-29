"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── SplitWords ───────────────────────────────────────────────────────────────
export function SplitWords({
  text,
  delay = 0,
  stagger = 0.07,
  className = "",
  once = true,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-8% 0px" });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "110%", opacity: 0, filter: "blur(8px)" }
            }
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── ScanLine ────────────────────────────────────────────────────────────────
export function ScanLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`w-full h-px bg-white/10 relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-0 h-full w-[28%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "500%" } : { x: "-100%" }}
        transition={{ duration: 1.3, ease: "easeInOut", delay }}
      />
    </div>
  );
}

// ─── FadeUp ──────────────────────────────────────────────────────────────────
export function FadeUp({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── NodeGrid ────────────────────────────────────────────────────────────────
export function NodeGrid({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }}
    />
  );
}

// ─── GlowOrb ─────────────────────────────────────────────────────────────────
export function GlowOrb({
  x = "50%",
  y = "50%",
  size = "60%",
  opacity = 0.04,
  color = "255,255,255",
}: {
  x?: string;
  y?: string;
  size?: string;
  opacity?: number;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute pointer-events-none inset-0"
      style={{
        background: `radial-gradient(ellipse ${size} ${size} at ${x} ${y}, rgba(${color},${opacity}) 0%, transparent 70%)`,
      }}
    />
  );
}

// ─── NeuralPulse ─────────────────────────────────────────────────────────────
export function NeuralPulse() {
  return (
    <svg width="320" height="320" viewBox="0 0 320 320" className="w-full h-full opacity-20" aria-hidden>
      {[1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx="160" cy="160"
          r={40 + i * 30}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.1, 1.3] }}
          transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.circle
        cx="160" cy="160" r="8" fill="white"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

// ─── TerminalLine ────────────────────────────────────────────────────────────
export function TerminalLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span className="text-white/20 font-mono text-xs select-none">›</span>
      <span className="font-mono text-xs text-white/50 tracking-wide">{text}</span>
    </motion.div>
  );
}
