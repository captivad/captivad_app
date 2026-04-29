"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PARTNERSHIP_FEATURES } from "../data";
import NodeGrid from "@/components/node-grid";
import GlowOrb from "@/components/glow-orb";
import SplitWords from "@/components/split-words";
import FadeUp from "@/components/fade-up";
import ScanLine from "@/components/scan-line";
import { IndonesiaMap } from "@/public";

/**
 * PartnershipSection
 *
 * §5 — "Strategic Partnership for Maximum AI Innovation in Indonesia"
 * Layout 2 kolom:
 * - Kiri: headline + deskripsi
 * - Kanan: 4 feature badge
 *
 * Background image parallax di belakang seluruh section.
 */
export default function PartnershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full border-t border-white/[0.06] py-20 lg:py-28 overflow-hidden bg-background"
    >
      {/* Background image parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0 scale-110"
        style={{ y: bgY }}
      >
        <motion.img
          src={IndonesiaMap.src}
          alt=""
          className="w-full h-full object-contain xl:object-cover opacity-20"
        />
        {/* Dark overlay agar teks tetap readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.88) 100%)",
          }}
        />
      </motion.div>

      <GlowOrb x="80%" y="50%" size="50%" opacity={0.035} />
      <NodeGrid opacity={0.03} />

      <div className="relative z-10 w-full max-w-[80%] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Kiri — konten */}
        <div className="flex flex-col gap-6">
          <h2
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}
            className="leading-tight"
          >
            <SplitWords
              text="Strategic Partnership for"
              delay={0.1}
              stagger={0.07}
            />
            <br />
            <SplitWords
              text="Maximum AI Innovation in Indonesia"
              delay={0.45}
              stagger={0.1}
            />
          </h2>
          <ScanLine delay={0.6} className="max-w-[360px]" />
          <FadeUp delay={0.4}>
            <p className="text-white leading-relaxed max-w-[480px]">
              We combine global AI models with deep local context to deliver
              campaigns that resonate authentically across the archipelago.
            </p>
          </FadeUp>
        </div>

        {/* Kanan — feature badges */}
        <div className="grid grid-cols-2 gap-3">
          {PARTNERSHIP_FEATURES.map((f, i) => (
            <FadeUp
              key={f.label}
              delay={0.2 + i * 0.1}
              className="flex flex-col gap-4 p-5 border-l-2 border-white/[0.07] hover:border-white/50 transition-colors duration-300 group rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              <f.icon
                size={30}
                className="text-white group-hover:text-white/50 transition-colors duration-300"
              />
              <p className="font-bold uppercase tracking-wider text-white">
                {f.label}
              </p>
              <p className="text-lg text-white/80 leading-relaxed">{f.desc}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
