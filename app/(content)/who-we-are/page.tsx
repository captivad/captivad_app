"use client";

import FormCustomer from "@/components/form-customer";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { CldImage } from "next-cloudinary";
import Cardmember from "./components/card-member";
import SplitWords from "@/components/split-words";
import { PRINCIPLES } from "./data/whe-we-are-data";
import GlitchLine from "./components/glitch-line";
import PrincipleItem from "./components/principle-item";

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WhoWeAre() {
  const formRef = useRef<HTMLDivElement>(null);
  const isFormVisible = useInView(formRef, { once: true, margin: "-20% 0px" });

  const teamSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: teamSectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      {/* ################################################################
          SECTION 1 — HERO: A CREATIVE STUDIO + PRINCIPLES
      ################################################################ */}
      <motion.section
        id="section-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-screen bg-background flex flex-col justify-center items-center pt-28 md:pt-36 pb-24 overflow-hidden"
      >
        {/* Ambient glow — centre-bottom */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 65%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* ── 2-column layout ──────────────────────────────────── */}
        <div className="relative z-20 w-full max-w-[80%] px-[8%] xl:px-12 flex flex-col xl:flex-row gap-16 xl:gap-20 items-start">
          {/* ── LEFT: Headline + Description ── */}
          <div className="flex flex-col gap-6 xl:gap-8 flex-1 min-w-0">
            {/* Label editorial */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="text-sm text-white/50 uppercase tracking-[0.25em] font-mono"
            >
              Who We Are — Est. 2024
            </motion.p>

            {/* Headline */}
            <h1
              className="leading-[1.05] tracking-tight text-left"
              style={{ fontSize: "clamp(1.9rem, 4vw, 4.25rem)" }}
            >
              <SplitWords text="A CREATIVE STUDIO" delay={0.2} stagger={0.08} />
              <br />
              <SplitWords
                text="AT THE INTERSECTION"
                delay={0.5}
                stagger={0.07}
              />
              <br />
              <span className="inline-flex flex-wrap gap-x-[0.28em]">
                <SplitWords
                  text="OF MEDIA, CRAFT AND"
                  delay={0.75}
                  stagger={0.07}
                />{" "}
                <span style={{ display: "inline-block", overflow: "hidden" }}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 1.05,
                    }}
                    className="text-white/50 italic pr-2"
                  >
                    AI
                  </motion.span>
                </span>
              </span>
            </h1>

            {/* Scan line */}
            <GlitchLine delay={1.1} className="my-0" />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 1.1 }}
              className="text-white/80 leading-relaxed max-w-[520px]"
            >
              Captivad was founded on a simple belief: the best advertising is
              indistinguishable from content people actively seek out. We bring
              together media planners, creative technologists, filmmakers and AI
              engineers under one roof — so strategy, craft and technology stay
              in constant conversation.
            </motion.p>
          </div>

          {/* ── RIGHT: Principles ── */}
          <aside
            aria-label="Our principles"
            className="w-full xl:w-[320px] 2xl:w-[360px] flex-shrink-0 flex flex-col"
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg font-mono text-white/25 uppercase tracking-[0.3em] mb-4"
            >
              Principles
            </motion.p>

            {/* Top separator */}
            <GlitchLine delay={0.75} />

            {/* List */}
            <ul role="list" className="flex flex-col pl-2">
              {PRINCIPLES.map((p, i) => (
                <PrincipleItem key={p.no} no={p.no} text={p.text} index={i} />
              ))}
            </ul>
          </aside>
        </div>

        {/* Bottom fade ke section berikutnya */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--background, #0a0a0a))",
          }}
        />
      </motion.section>

      {/* ################################################################
          SECTION 2 — MEET THE TEAM
      ################################################################ */}
      <section
        ref={teamSectionRef}
        className="w-full relative min-h-screen bg-background overflow-hidden"
      >
        {/* Background image dengan parallax */}
        <motion.div
          aria-hidden
          className="absolute inset-0 scale-110"
          style={{ y: bgY }}
        >
          <CldImage
            src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776922025/whoweare-section1_xruu0i.svg"
            alt=""
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 100%)",
            }}
          />
        </motion.div>

        {/* Konten */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-[8%] lg:px-20 py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full text-[10px] md:text-xl text-white/50 uppercase tracking-[0.25em] font-mono flex justify-between"
          >
            <span>The Team</span>
            <span>Jakarta, ID</span>
          </motion.div>

          <div className="w-full mb-16">
            <GlitchLine delay={0.4} />
          </div>

          <Cardmember />
        </div>
      </section>

      {/* ################################################################
          SECTION 3 — FORM
      ################################################################ */}
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
