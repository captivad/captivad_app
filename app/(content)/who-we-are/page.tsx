"use client";

import FormCustomer from "@/components/form-customer";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { CldImage } from "next-cloudinary";
import Cardmember from "./components/card-member";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  { no: "01", text: "ATTENTION IS EARNED, NEVER STOLEN." },
  { no: "02", text: "MEDIA AND CREATIVE ARE ONE SYSTEM." },
  { no: "03", text: "IF IT CAN'T BE MEASURED, IT CAN'T BE IMPROVED." },
  {
    no: "04",
    text: "USE AI WHERE IT ADDS A NEW DIMENSION — NOT TO SAVE FIVE MINUTES.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SplitWords — staggered per-kata reveal dengan blur-to-sharp.
 * Trigger saat elemen masuk viewport.
 */
function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.28em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "110%", opacity: 0, filter: "blur(6px)" }
            }
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * GlitchLine — scan line horizontal tipis.
 * Nuansa HUD / AI terminal.
 */
function GlitchLine({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`w-full h-px bg-white/10 relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
        style={{ width: "30%" }}
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "450%" } : { x: "-100%" }}
        transition={{ duration: 1.2, ease: "easeInOut", delay }}
      />
    </div>
  );
}

/**
 * PrincipleItem — satu baris prinsip dengan animasi stagger dari kanan.
 * Hover: nomor & teks terang, garis kiri muncul sebagai aksen.
 */
function PrincipleItem({
  no,
  text,
  index,
}: {
  no: string;
  text: string;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: 28 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.85 + index * 0.13,
      }}
      className="group relative flex items-start gap-4 py-[14px] border-b border-white/[0.07] last:border-none cursor-default select-none"
    >
      {/* Aksen garis kiri — muncul saat hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-px bg-white/0 group-hover:bg-white/30 transition-colors duration-300"
      />

      {/* Nomor */}
      <span className="font-mono text-[14px] text-white/20 mt-[1px] tabular-nums flex-shrink-0 group-hover:text-white/40 transition-colors duration-300">
        {no}
      </span>

      {/* Teks */}
      <p className="text-[11px] md:text-[16px] leading-snug tracking-[0.06em] font-semibold text-white/40 uppercase group-hover:text-white/80 transition-colors duration-300">
        {text}
      </p>
    </motion.li>
  );
}

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
              className="text-[10px] text-white/25 uppercase tracking-[0.25em] font-mono"
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
                    className="text-white/50 italic"
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
              className="text-white/80 text-sm md:text-lg leading-relaxed max-w-[520px]"
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
