"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PILLARS } from "../data";
import NodeGrid from "@/components/node-grid";
import GlowOrb from "@/components/glow-orb";
import SplitWords from "@/components/split-words";
import FadeUp from "@/components/fade-up";
import NeuralPulse from "@/components/neural-pulse";
import { LogoCaptivadWhite, RupaAiLogo } from "@/public";

/**
 * HeroSection
 *
 * §1 — Full-screen hero dengan:
 * - Partnership badge pulsing
 * - Headline SplitWords
 * - Animated circuit line SVG
 * - NeuralPulse dekoratif
 * - 3 pillar card
 * - Parallax + fade saat scroll
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      id="ai-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen bg-background flex flex-col justify-center items-center pt-44 lg:pt-[15%] pb-20 overflow-hidden"
      style={{
        backgroundImage: "",
      }}
    >
      <NodeGrid opacity={0.05} />
      <GlowOrb x="50%" y="40%" size="80%" opacity={0.04} />

      {/* Background image dengan parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0 scale-110"
        style={{ y: heroY }}
      >
        <Image
          src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777395739/Gemini_Generated_Image_nu912nu912nu912n_x6vuut.png"
          fill
          alt=""
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay gradient — dark vignette */}
      <div
        aria-hidden
        className="absolute inset-0 scale-[200%]"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Circuit lines */}
      {/* <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
      >
        {[
          { x1: "0", y1: "30%", x2: "100%", y2: "30%", delay: 0.5 },
          { x1: "0", y1: "70%", x2: "100%", y2: "70%", delay: 0.8 },
          { x1: "30%", y1: "0", x2: "30%", y2: "100%", delay: 1.1 },
          { x1: "70%", y1: "0", x2: "70%", y2: "100%", delay: 1.4 },
        ].map((l, i) => (
          <motion.line
            key={i}
            {...l}
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: l.delay, ease: "easeInOut" }}
          />
        ))}
      </svg> */}

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 flex flex-col items-center gap-7 w-full max-w-[80%] mx-auto text-center"
      >
        <div className="flex flex-col gap-6 items-center">
          {/* Partnership badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 text-2xl lg:gap-10"
          >
            <Image
              src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777394580/RUPA_AI_-_Logo_flat_faatsm.webp"
              alt="Rupa Ai Logo"
              width={130}
              height={130}
              className=" scale-50 md:scale-75 lg:scale-90"
            />
            x
            <Image
              src={LogoCaptivadWhite}
              alt="captivad"
              width={130}
              height={130}
              className=" scale-50 md:scale-75 lg:scale-90"
            />
          </motion.div>

          {/* Headline */}
          <h1
            className="leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
          >
            <SplitWords
              text="AI Xperience"
              delay={0.3}
              stagger={0.07}
              once={false}
            />
            <br />
            <span className="text-white">
              <SplitWords
                text="Revolution Campaign Your"
                delay={0.7}
                stagger={0.09}
                once={false}
              />
            </span>
            <br />
            <span className="text-white">
              <SplitWords
                text="Brand"
                delay={0.9}
                stagger={0.11}
                once={false}
              />
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-white leading-relaxed max-w-[750px]"
        >
          Deploy interactive AI agents that understand context, generate visual
          narratives, and create memorable physical brand touchpoints in
          real-time.
        </motion.p>

        {/* Pillar cards */}
        <FadeUp
          delay={1.2}
          className="relative z-10 w-full text-left max-w-[90%] lg:max-w-[80%] mx-auto py-20 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10"
        >
          {PILLARS.map((p, i) => (
            <FadeUp
              key={p.title}
              delay={i * 0.2}
              className="flex flex-col gap-4 p-8 border border-white/[0.5] rounded-xl"
            >
              <Image src={p.icon} alt="" width={30} height={30} />
              <h4 className="font-bold text-lg uppercase tracking-wider text-white/80">
                {p.title}
              </h4>
              <p className="text-white/35 leading-relaxed">{p.desc}</p>
            </FadeUp>
          ))}
        </FadeUp>
      </motion.div>

      {/* Neural pulse */}
      <div
        className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] pointer-events-none opacity-30"
        aria-hidden
      >
        <NeuralPulse />
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background, #080808))",
        }}
      />
    </motion.section>
  );
}
