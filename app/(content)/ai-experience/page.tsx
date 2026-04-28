"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Cpu, Mic, Layers, Map, BadgeCheck } from "lucide-react";
import FormCustomer from "@/components/form-customer";
import { Camera, Images, Interactive } from "@/public";
import Image from "next/image";
import {
  PILLARS,
  ARCHITECTURE_STEPS,
  SUCCESS_STORIES,
  CAPABILITIES,
  PROCESSES,
} from "./data/data-content";
import FadeUp from "@/components/fade-up";
import GlowOrb from "@/components/glow-orb";
import NeuralPulse from "@/components/neural-pulse";
import NodeGrid from "@/components/node-grid";
import SplitWords from "@/components/split-words";
import ScanLine from "@/components/scan-line";

export default function AIExperiencePage() {
  const formRef = useRef<HTMLDivElement>(null);
  const isFormVisible = useInView(formRef, { once: true, margin: "-20% 0px" });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          §1  HERO — Transform Brand Engagement with Cognitive AI
      ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        id="ai-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-screen bg-background flex flex-col justify-center items-center pt-[15%] pb-20 overflow-hidden"
      >
        <NodeGrid opacity={0.05} />
        <GlowOrb x="50%" y="40%" size="80%" opacity={0.04} />

        {/* Animated circuit lines — dekoratif background */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
        >
          <motion.line
            x1="0"
            y1="30%"
            x2="100%"
            y2="30%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.line
            x1="0"
            y1="70%"
            x2="100%"
            y2="70%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
          />
          <motion.line
            x1="30%"
            y1="0"
            x2="30%"
            y2="100%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 1.1, ease: "easeInOut" }}
          />
          <motion.line
            x1="70%"
            y1="0"
            x2="70%"
            y2="100%"
            stroke="white"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 1.4, ease: "easeInOut" }}
          />
        </svg>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center gap-7 w-full max-w-[80%] mx-auto text-center"
        >
          {/* Partnership badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60" />
            </span>
            IUPA.AI x CaptivAd
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
                delay={0.7}
                stagger={0.11}
                once={false}
              />
            </span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-white/40 leading-relaxed max-w-[750px]"
          >
            Deploy interactive AI agents that understand context, generate
            visual narratives, and create memorable physical brand touchpoints
            in real-time.
          </motion.p>

          {/* <ScanLine delay={1.2} className="max-w-[400px]" /> */}

          {/* CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-[11px] font-mono uppercase tracking-widest hover:bg-white/90 transition-colors duration-200">
              Initialize Demo
              <ArrowRight size={13} />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white/60 text-[11px] font-mono uppercase tracking-widest hover:border-white/40 hover:text-white/80 transition-colors duration-200">
              View Documentation
              <ArrowUpRight size={13} />
            </button>
          </motion.div>

          <Link
            href={""}
            className="btn btn-md lg:btn-lg rounded-badge bg-foreground text-primary hover:bg-white transition-colors"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
          <Link
            href={""}
            className="btn btn-md lg:btn-lg rounded-badge border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link> */}
          <div className="relative z-10 w-full text-left max-w-[70%] mx-auto py-20 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10">
            {PILLARS.map((p, i) => (
              <FadeUp
                key={p.title}
                delay={i * 0.12}
                className="flex flex-col gap-4 p-8 border border-white/[0.2] rounded-xl"
              >
                {/* <p.icon size={20} className="text-white/25" /> */}
                <Image
                  src={p.icon}
                  alt=""
                  width={30}
                  height={30}
                  className="text-white/25"
                />
                <h4 className="font-bold text-lg uppercase tracking-wider text-white/80">
                  {p.title}
                </h4>
                <p className="text-white/35 leading-relaxed">{p.desc}</p>
              </FadeUp>
            ))}
          </div>
        </motion.div>

        {/* Neural pulse di tengah bawah hero */}
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

      {/* ═══════════════════════════════════════════════════════════════
          §2  CAMPAIGN ARCHITECTURE — timeline stepper
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-white border-t border-white/[0.06] py-20 lg:py-28 overflow-hidden">
        <NodeGrid opacity={0.03} />
        <GlowOrb x="50%" y="50%" size="60%" opacity={0.025} />

        <div className="relative z-10 w-full max-w-[80%] mx-auto flex flex-col gap-14">
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
            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-background leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1vw, 1.2rem)" }}
            >
              Rupa.AI AI Xperience is more than just an API, it's a bespoke AI
              solution for your brand. We build fully interactive microsites
              from scratch, featuring seamless generative AI integration across
              text, visuals, and audio through expert prompt engineering.
              Together with Moyo Tech, we deliver comprehensive, end-to-end
              execution for the Indonesian market.
            </motion.p>
          </div>

          <ScanLine delay={0.3} />

          {/* Steps */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {ARCHITECTURE_STEPS.map((step, i) => (
              <FadeUp
                key={step.no}
                delay={i * 0.1}
                className="flex flex-col items-center gap-5 p-7 group bg-gray-900/[0.02] transition-colors duration-300 border rounded-xl text-center backdrop-blur-md"
              >
                {/* Nomor merah */}
                <span className="font-mono text-3xl font-bold text-white/80 p-2 bg-background w-14 h-14 rounded-xl text-center">
                  {step.no}
                </span>
                {/* Connector line */}
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

      {/* ═══════════════════════════════════════════════════════════════
          §3  SUCCESS STORIES — card grid
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-background border-t border-white/[0.06] py-20 lg:py-28 overflow-hidden">
        <GlowOrb x="30%" y="60%" size="50%" opacity={0.03} />
        <NodeGrid opacity={0.03} />

        <div className="relative z-10 w-full max-w-[80%] mx-auto flex flex-col gap-14">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-4">
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}>
                <SplitWords
                  text="Our AI Xperience Success Stories"
                  delay={0.1}
                  stagger={0.07}
                />
              </h2>
              <p
                style={{ fontSize: "clamp(1rem, 1vw, 1.2rem)" }}
                className="text-white leading-relaxed"
              >
                From ordinary to extraordinary: See how Indonesia's top brands
                are leveraging AI Xperience to build campaigns that define the
                future.
              </p>
            </div>
            {/* <FadeUp delay={0.3}>
              <Link
                href="/portfolio"
                className="hidden md:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors duration-200 group"
              >
                View All
                <ChevronRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </FadeUp> */}
          </div>

          <ScanLine delay={0.3} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUCCESS_STORIES.map((s, i) => (
              <FadeUp
                key={s.brand}
                delay={i * 0.15}
                className="group relative overflow-hidden min-h-[600px] flex flex-col justify-end rounded-xl"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Image background */}
                <div className="absolute inset-0">
                  <motion.img
                    src={s.img}
                    alt={s.brand}
                    className="w-full h-full object-cover opacity-25 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(8,8,8,0.98) 20%, rgba(8,8,8,0.6) 60%, rgba(8,8,8,0.2) 100%)",
                    }}
                  />
                </div>

                {/* Category badge */}
                <div
                  className="absolute top-5 left-5 text-sm rounded-full font-mono uppercase tracking-widest text-white px-2.5 py-1 border border-white/10"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {s.category}
                </div>

                {/* Content */}
                <div className="relative z-10 p-7 flex flex-col gap-4">
                  <h3
                    className="font-bold uppercase tracking-tight text-white/90"
                    style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
                  >
                    {s.brand}
                  </h3>
                  <p
                    style={{ fontSize: "clamp(1rem, 1vw, 1.2rem)" }}
                    className="text-white/40 leading-relaxed"
                  >
                    {s.desc}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 md:p-7 pt-7 justify-between border-t border-white/[0.07] mt-2">
                    {s.stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col gap-1">
                        <span
                          style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)" }}
                          className="font-mono font-bold text-white"
                        >
                          {stat.value}
                        </span>
                        <span className="text-sm lg:text-lg capitalize text-white/50">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §4  CORE CAPABILITIES — bento grid layout
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-background py-20 lg:py-28 overflow-hidden">
        <GlowOrb x="20%" y="60%" size="50%" opacity={0.03} />
        <NodeGrid opacity={0.03} />

        <div className="relative z-10 w-full max-w-[80%] mx-auto flex flex-col gap-12">
          {/* Header */}
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

          {/* Bento grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Large card — Image Generation */}
            <FadeUp
              delay={0.1}
              className="lg:col-span-2 relative min-h-[400px] overflow-hidden group bg-[#292A2A]"
              style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777223005/AI_Image_Generation_ogrmqd.png"
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(8,8,8,0.9) 30%, rgba(8,8,8,0.5) 100%)",
                  }}
                />
              </div>
              <div className="relative z-10 p-8 flex flex-col gap-4 h-full justify-end">
                <Image
                  src={Images}
                  width={40}
                  height={40}
                  className="text-white/30"
                  alt="Image"
                />
                <h4 className="font-bold uppercase tracking-tight">
                  {CAPABILITIES[0].title}
                </h4>
                <p className="text-white text-lg leading-relaxed max-w-[400px]">
                  {CAPABILITIES[0].desc}
                </p>
              </div>
            </FadeUp>

            {/* Neural Voice Synthesis */}
            <FadeUp
              delay={0.2}
              className="relative min-h-[280px] overflow-hidden group flex flex-col justify-between p-8 bg-[#292A2A]"
            >
              {/* Waveform decoration */}
              <div className="flex items-end gap-[3px] h-12 w-full" aria-hidden>
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
                <Mic size={40} className="text-white" />
                <h4 className="font-bold uppercase tracking-tight">
                  {CAPABILITIES[1].title}
                </h4>
                <p className="text-white text-lg leading-relaxed">
                  {CAPABILITIES[1].desc}
                </p>
              </div>
            </FadeUp>

            {/* Interactive Storytelling */}
            <FadeUp
              delay={0.3}
              className="relative min-h-[220px] overflow-hidden group flex flex-col gap-4 justify-start p-8 bg-[#292A2A]"
            >
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
              <Image
                src={Interactive}
                width={40}
                height={40}
                className="text-white/30"
                alt="Image"
              />
              <h4 className="font-bold uppercase tracking-tight">
                {CAPABILITIES[2].title}
              </h4>
              <p className="text-white text-lg leading-relaxed">
                {CAPABILITIES[2].desc}
              </p>
            </FadeUp>

            {/* AI Photobooth — large */}
            <FadeUp
              delay={0.4}
              className="lg:col-span-2 relative min-h-[220px] overflow-hidden group flex gap-4 flex-col justify-start p-8 bg-[#292A2A]"
            >
              <Image
                src={Camera}
                width={35}
                height={35}
                className="text-white/30"
                alt="Image"
              />
              <h4 className="font-bold uppercase tracking-tight">
                {CAPABILITIES[3].title}
              </h4>
              <p className="text-white text-lg leading-relaxed max-w-[400px]">
                {CAPABILITIES[3].desc}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §5  STRATEGIC PARTNERSHIPS — Indonesia focus
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-background border-t border-white/[0.06] py-20 lg:py-28 overflow-hidden">
        <GlowOrb x="80%" y="50%" size="50%" opacity={0.035} />
        <NodeGrid opacity={0.03} />

        <div className="relative z-10 w-full max-w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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

            {/* Terminal output — "live feed" nuansa */}
            {/* <FadeUp
              delay={0.6}
              className="mt-4 p-5 border border-white/[0.07] flex flex-col gap-2"
              style={{
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">
                system.log
              </p>
              <TerminalLine
                text="model.init('bahasa-indonesia-v3')"
                delay={0.8}
              />
              <TerminalLine
                text="context.inject(localCulture, festivalData)"
                delay={1.0}
              />
              <TerminalLine
                text="agent.deploy({ region: 'ID', scale: 'national' })"
                delay={1.2}
              />
              <TerminalLine text="campaign.status → LIVE ✓" delay={1.4} />
            </FadeUp> */}
          </div>

          {/* Kanan — feature badges */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Cpu,
                label: "Multi-Model Tech",
                desc: "We're not just API users. Rupa.AI combines the best AI models and refines them with expert engineering expertise to deliver superior, secure results that align with your brand vision. This is a core technical advantage that's hard to replicate.",
              },

              {
                icon: Layers,
                label: "Custom Microsites",
                desc: "From Figma concept and design, backend and frontend development, to hosting and post-launch support, the Rupa.AI team handles all technical aspects. You focus on the strategy, we bring the technology to life.",
              },
              {
                icon: Map,
                label: "Local Context",
                desc: "Captivad, our exclusive agency partner, ensures every AI Xperience is implemented with a deep understanding of the Indonesian market, culture, and audience, and provides local support for your campaign's success.",
              },
              {
                icon: BadgeCheck,
                label: "Proven Track Record",
                desc: "Our portfolio demonstrates our ability to produce AI campaigns that not only go viral but are also recognized by the industry. Together, create projects that have the potential to win prestigious awards.",
              },
            ].map((f, i) => (
              <FadeUp
                key={f.label}
                delay={0.2 + i * 0.1}
                className="flex flex-col gap-4 p-5 border-l-2 border-white/[0.07] hover:border-white/50 transition-colors duration-300 group"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <f.icon
                  size={30}
                  className="text-white group-hover:text-white/50 transition-colors duration-300"
                />
                <p className="font-bold uppercase tracking-wider text-white">
                  {f.label}
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  {f.desc}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §6  IMPLEMENTATION PROCESS — 2 columns
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-background border-t border-white/[0.06] py-20 lg:py-28 overflow-hidden">
        <NodeGrid opacity={0.03} />
        <GlowOrb x="70%" y="30%" size="50%" opacity={0.03} />

        <div className="relative z-10 w-full max-w-[80%] mx-auto flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <FadeUp>
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.3em]">
                Implementation
              </p>
            </FadeUp>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}>
              <SplitWords
                text="Distinct Implementation"
                delay={0.1}
                stagger={0.07}
              />
              <br />
              <span className="text-white/40 italic">
                <SplitWords text="Processes." delay={0.4} stagger={0.1} />
              </span>
            </h2>
            <FadeUp delay={0.2}>
              <p className="text-white/30 text-xs font-mono max-w-[400px]">
                Choose an approach that fits your timeline and technical needs.
              </p>
            </FadeUp>
          </div>

          <ScanLine delay={0.3} />

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {Object.entries(PROCESSES).map(([key, proc], i) => (
              <FadeUp
                key={key}
                delay={i * 0.15}
                className="flex flex-col gap-7 p-8 md:p-10"
                style={{
                  borderRight:
                    i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background:
                    i === 1 ? "rgba(255,255,255,0.015)" : "transparent",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <proc.icon size={16} className="text-white/25" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
                    {proc.label}
                  </h3>
                </div>
                <ScanLine delay={0.4 + i * 0.1} />

                {/* Steps */}
                <ol className="flex flex-col gap-4">
                  {proc.steps.map((step, j) => (
                    <FadeUp key={step} delay={0.5 + j * 0.1}>
                      <li className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-white/10 text-[9px] font-mono text-white/30 tabular-nums mt-0.5">
                          {j + 1}
                        </span>
                        <span className="text-sm text-white/50 leading-snug">
                          {step}
                        </span>
                      </li>
                    </FadeUp>
                  ))}
                </ol>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §7  FORM CTA
      ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        ref={formRef}
        id="form"
        initial={{ opacity: 0, y: 60 }}
        animate={isFormVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="lg:h-full p-[5%] lg:p-20 bg-foreground"
      >
        {isFormVisible && <FormCustomer />}
      </motion.section>
    </>
  );
}
