"use client";

import { motion } from "framer-motion";
import { ARCHITECTURE_STEPS } from "../data";
import NodeGrid from "@/components/node-grid";
import GlowOrb from "@/components/glow-orb";
import SplitWords from "@/components/split-words";
import FadeUp from "@/components/fade-up";
import ScanLine from "@/components/scan-line";

/**
 * JourneySection
 *
 * §2 — "Your AI Xperience Journey"
 * Timeline 4-step dengan background putih,
 * nomor bold + connector line animasi.
 */
export default function JourneySection() {
  return (
    <section className="relative w-full bg-white border-t border-white/[0.06] py-20 lg:py-28 overflow-hidden">
      <NodeGrid opacity={0.03} />
      <GlowOrb x="50%" y="50%" size="60%" opacity={0.025} />

      <div className="relative z-10 w-full max-w-[80%] mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center max-w-[800px] mx-auto">
          <h2
            className="text-background font-bold"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}
          >
            <SplitWords
              text="Your AI Xperience Journey"
              delay={0.1}
              stagger={0.07}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-background leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1vw, 1.2rem)" }}
          >
            Rupa.AI AI Xperience is more than just an API, it&apos;s a bespoke
            AI solution for your brand. We build fully interactive microsites
            from scratch, featuring seamless generative AI integration across
            text, visuals, and audio through expert prompt engineering. Together
            with Moyo Tech, we deliver comprehensive, end-to-end execution for
            the Indonesian market.
          </motion.p>
        </div>

        <ScanLine delay={0.3} />

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARCHITECTURE_STEPS.map((step, i) => (
            <FadeUp
              key={step.no}
              delay={i * 0.1}
              className="flex flex-col items-center gap-5 p-7 group bg-gray-900/[0.02] transition-colors duration-300 border rounded-xl text-center backdrop-blur-md"
            >
              <span className="font-mono text-3xl font-bold text-white/80 p-2 bg-background w-14 h-14 rounded-xl text-center">
                {step.no}
              </span>
              <div className="h-px w-full bg-gray-900/[0.06] relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-white/20 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                />
              </div>
              <h6 className="font-bold uppercase tracking-tight text-background">
                {step.title}
              </h6>
              <p className="text-background text-sm leading-relaxed">
                {step.desc}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
