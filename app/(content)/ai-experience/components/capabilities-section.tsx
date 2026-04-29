"use client";

import Image from "next/image";
import { Mic, Check } from "lucide-react";
import { motion } from "framer-motion";
import { CAPABILITIES } from "../data";
import GlowOrb from "@/components/glow-orb";
import NodeGrid from "@/components/node-grid";
import SplitWords from "@/components/split-words";
import FadeUp from "@/components/fade-up";
import ScanLine from "@/components/scan-line";
import { AiPhotobooth } from "@/public";

// ─────────────────────────────────────────────────────────────────────────────
// SUB-KOMPONEN: FeatureList
// ─────────────────────────────────────────────────────────────────────────────

/**
 * FeatureList
 *
 * Daftar fitur utama per capability dengan animasi stagger dari kiri.
 * Setiap item menampilkan checkmark + teks, hover → terang.
 */
function FeatureList({
  features,
  baseDelay = 0,
}: {
  features: string[];
  baseDelay?: number;
}) {
  return (
    <ul className="flex flex-col gap-2 mt-1">
      {features.map((feat, i) => (
        <motion.li
          key={feat}
          className="flex items-start gap-2.5 group/feat"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
            delay: baseDelay + i * 0.08,
          }}
        >
          {/* Checkmark */}
          <span className="flex-shrink-0 w-4 h-4 mt-[2px] flex items-center justify-center rounded-full border border-white/20 group-hover/feat:border-white/50 transition-colors duration-200">
            <Check
              size={9}
              className="text-white/80 group-hover/feat:text-white transition-colors duration-200"
            />
          </span>
          <span className="text-[16px] text-white group-hover/feat:text-white/70 transition-colors duration-200 leading-snug">
            {feat}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CapabilitiesSection
 *
 * §4 — Bento grid 3 kolom:
 * - Image Generation (col-span-2) → bg image + feature list (layout row)
 * - Neural Voice               → waveform animasi + feature list
 * - Visual Storytelling        → dekoratif lines + feature list
 * - AI Photobooth (col-span-2) → bg image penuh + feature list (layout row)
 *
 * Setiap card menampilkan "Fitur Utama" dengan FeatureList.
 */
export default function CapabilitiesSection() {
  const [imgGen, voiceSynth, storytelling, photobooth] = CAPABILITIES;

  return (
    <section className="relative w-full bg-background py-20 lg:py-28 overflow-hidden">
      <GlowOrb x="20%" y="60%" size="50%" opacity={0.03} />
      <NodeGrid opacity={0.03} />

      <div className="relative z-10 w-full max-w-[80%] mx-auto flex flex-col gap-12">
        {/* ── Header ── */}
        <div className="flex flex-col gap-4">
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}>
            <SplitWords text="Core Capabilities" delay={0.1} stagger={0.08} />
          </h2>
          <FadeUp delay={0.2}>
            <p className="text-white">
              The Rupa.AI team integrates the best AI models to create unique
              experiences tailored to your brand's needs:
            </p>
          </FadeUp>
        </div>

        <ScanLine delay={0.3} />

        {/* ── Bento grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* ───────────────────────────────────────────────────────
              1. Image Generation + Content  (col-span-2 / large)
          ─────────────────────────────────────────────────────── */}
          <FadeUp
            delay={0.1}
            className="lg:col-span-2 relative rounded-xl min-h-[400px] overflow-hidden group bg-[#292A2A]"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Background image */}
            {imgGen.bgImage && (
              <div className="absolute inset-0">
                <motion.img
                  src={imgGen.bgImage}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 60%, rgba(8,8,8,0.2) 100%)",
                  }}
                />
              </div>
            )}

            {/* Content — 2 kolom: info kiri, fitur kanan */}
            <div className="relative z-10 p-8 flex flex-col lg:flex-row gap-8 h-full">
              <div className="flex flex-col gap-4 flex-1 justify-end">
                <Image src={imgGen.imgSrc} alt="" width={40} height={40} />
                <h4 className="font-bold uppercase tracking-tight">
                  {imgGen.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed max-w-[320px]">
                  {imgGen.desc}
                </p>
              </div>

              <div className="flex flex-col justify-end gap-2 min-w-[200px]">
                <p className="text-lg font-bold text-white">Main Features</p>
                <FeatureList features={imgGen.features} baseDelay={0.3} />
              </div>
            </div>
          </FadeUp>

          {/* ───────────────────────────────────────────────────────
              2. Neural Voice Synthesis  (small)
          ─────────────────────────────────────────────────────── */}
          <FadeUp
            delay={0.2}
            className="relative min-h-[360px] rounded-xl overflow-hidden group flex flex-col gap-4 justify-between p-8 bg-[#292A2A]"
          >
            {/* Waveform animasi */}
            <div className="flex items-end gap-[3px] h-10 w-full" aria-hidden>
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-white rounded-sm"
                  animate={{
                    height: [
                      `${20 + Math.random() * 60}%`,
                      `${20 + Math.random() * 60}%`,
                    ],
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.04,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold uppercase tracking-tight">
                {voiceSynth.title}
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {voiceSynth.desc}
              </p>

              <div className="h-px w-full bg-white/[0.07] my-1" />

              <p className="text-lg font-bold text-white">Main Features</p>
              <FeatureList features={voiceSynth.features} baseDelay={0.35} />
            </div>
          </FadeUp>

          {/* ───────────────────────────────────────────────────────
              3. Visual Storytelling  (small)
          ─────────────────────────────────────────────────────── */}
          <FadeUp
            delay={0.3}
            className="relative min-h-[360px] rounded-xl overflow-hidden group flex flex-col gap-4 justify-start p-8 bg-[#292A2A]"
          >
            {/* Dekoratif horizontal lines */}
            <div
              className="absolute top-6 right-6 flex flex-col gap-1.5"
              aria-hidden
            >
              {[70, 50, 85, 40, 65].map((h, i) => (
                <motion.div
                  key={i}
                  className="h-px bg-white/10"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${h}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                />
              ))}
            </div>

            <Image src={storytelling.imgSrc!} alt="" width={40} height={40} />
            <h4 className="font-bold uppercase tracking-tight">
              {storytelling.title}
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              {storytelling.desc}
            </p>

            <div className="h-px w-full bg-white/[0.07]" />

            <p className="text-lg font-bold text-white">Main Features</p>
            <FeatureList features={storytelling.features} baseDelay={0.35} />
          </FadeUp>

          {/* ───────────────────────────────────────────────────────
              4. AI Photobooth Integration  (col-span-2 / large)
          ─────────────────────────────────────────────────────── */}
          <FadeUp
            delay={0.4}
            className="lg:col-span-2 rounded-xl relative min-h-[360px] overflow-hidden group bg-[#292A2A]"
          >
            {/* Background image */}
            {photobooth.bgImage && (
              <div className="absolute inset-0">
                <motion.img
                  src={AiPhotobooth.src}
                  alt=""
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,8,8,0.97) 20%, rgba(8,8,8,0.6) 60%, rgba(8,8,8,0.2) 100%)",
                  }}
                />
              </div>
            )}

            {/* Content — 2 kolom: info kiri, fitur kanan */}
            <div className="relative z-10 p-8 h-full flex flex-col lg:flex-row gap-8 justify-end">
              <div className="flex flex-col justify-end gap-3 flex-1">
                <Image src={photobooth.imgSrc!} alt="" width={35} height={35} />
                <h4 className="font-bold uppercase tracking-tight">
                  {photobooth.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed max-w-[380px]">
                  {photobooth.desc}
                </p>
              </div>

              <div className="flex flex-col gap-2 min-w-[220px] justify-end">
                <p className="text-lg font-bold text-white">Main Features</p>
                <FeatureList features={photobooth.features} baseDelay={0.4} />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
