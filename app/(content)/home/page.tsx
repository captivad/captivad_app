"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { CardValueCount } from "@/components/card-value-count";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import "./style.css";
import FormCustomer from "@/components/form-customer";
import Link from "next/link";
import { OUR_SERVICES, WHO_WE_ARE } from "@/utils/router";
import { CldImage } from "next-cloudinary";
import InfiniteMarquee from "@/components/infinite-loop";
import { splitArrayInHalf } from "@/utils/general";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA — di luar komponen agar tidak re-create tiap render
// ─────────────────────────────────────────────────────────────────────────────

const BRANDS = [
  // { name: "Wuling", logo: "/FrameWuling.svg" },
  // { name: "Tempra", logo: "/Tempra.svg" },
  // { name: "Chery", logo: "/chery.svg" },
  // { name: "Citroën", logo: "/citroen.svg" },
  // { name: "WRP", logo: "/wrp.svg" },
  {
    name: "GoPay",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/gopay_qa0wuf.png",
  },
  {
    name: "Samsung",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/samsung_zmpqmb.png",
  },
  {
    name: "KFC",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/kfc_e7cxso.png",
  },
  {
    name: "Pizza Hut",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/pizzahut_xmeibj.png",
  },
  {
    name: "Uni Qlo",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777112224/uniqlo_ytdcnf.png",
  },
  {
    name: "WPP",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113555/wpp_bevexx.png",
  },
  {
    name: "SHARP",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/sharp_hhrifa.png",
  },
  {
    name: "Apple",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113554/apple_nifcnt.png",
  },
  {
    name: "XL",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113551/xl_w3mrrs.png",
  },
  {
    name: "BCA",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113551/bca_onowvz.png",
  },
  {
    name: "Genki",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/genki_gv632x.png",
  },
  {
    name: "KIA",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/kn_sryggg.png",
  },
  {
    name: "Molto",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/molto_en5ho6.png",
  },
  {
    name: "MCD",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/mcd_hci0dl.png",
  },
  {
    name: "Vinfast",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/vinfast_zcaifz.png",
  },
  {
    name: "By.U",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/byU_azqcjm.png",
  },
  {
    name: "Caffino",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113552/caffino_gydol8.png",
  },
  {
    name: "BTN",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/btn_kifydr.png",
  },
  {
    name: "Regen",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/regen_lo8srn.png",
  },
  {
    name: "Telkomsel",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/telkomsel_psp5cn.png",
  },
  {
    name: "Danamont",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/danamon_q4eq1n.png",
  },
  {
    name: "Avian",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/avian_gbdxcd.png",
  },
  {
    name: "MSGlow",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/msglow_kwvv3v.png",
  },
  {
    name: "POLITRON",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113553/politron_br8xpq.png",
  },
  {
    name: "PRONAS",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113554/pronas_lfp1bl.png",
  },
  {
    name: "Djarum",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113554/djarum_im88iz.png",
  },
  {
    name: "Mondial",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113554/mondial_oicmpp.png",
  },
  {
    name: "SmartFrend",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113554/smartfrend_wvlnbe.png",
  },
  {
    name: "Frank & Co",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113554/frank_co_bl4if3.png",
  },
  {
    name: "EMC Health Care",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113555/emc_p1gur9.png",
  },
  {
    name: "Hyundai",
    logo: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777113554/hyundai_iexavk.png",
  },
];

const METRICS = [
  {
    value: 1000,
    description: "Campaign Delivered",
    icon: "thumb_up.svg",
    indent: "mx-10 sm:ml-16 xl:ml-40",
  },
  {
    value: 10000,
    description: "Creative Executed",
    icon: "campaign.svg",
    indent: "mx-20 sm:ml-32 lg:ml-40 xl:ml-60",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SplitWords — staggered per-kata reveal dengan blur-to-sharp.
 * Viewport-triggered: animasi hanya berjalan saat elemen masuk layar.
 */
function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-8% 0px" });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.3em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "110%", opacity: 0, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
            className="pr-2"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * ScanLine — garis horizontal tipis yang sweep kiri→kanan.
 * Nuansa HUD / AI terminal tanpa berlebihan.
 */
function ScanLine({
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
      className={`relative w-full h-px bg-white/10 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-y-0 left-0 h-full w-[25%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "500%" } : { x: "-100%" }}
        transition={{ duration: 1.4, ease: "easeInOut", delay }}
      />
    </div>
  );
}

/**
 * FadeUp — generic fade + slide up, viewport-triggered.
 */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * NodeGrid — grid titik-titik dekoratif ala neural network.
 * Pure CSS, performa tinggi.
 */
function NodeGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none opacity-[0.06]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  );
}

/**
 * GlowOrb — ambient glow bulat, untuk variasi visual antar section.
 */
function GlowOrb({
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
      className="absolute pointer-events-none"
      style={{
        inset: 0,
        background: `radial-gradient(ellipse ${size} ${size} at ${x} ${y}, rgba(${color},${opacity}) 0%, transparent 70%)`,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — media query
// ─────────────────────────────────────────────────────────────────────────────

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — intersection observer untuk lazy-render section
// ─────────────────────────────────────────────────────────────────────────────

function useSectionVisibility(keys: string[], threshold = 0.2) {
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(keys.map((k) => [k, false]))
  );

  const refs = React.useMemo(
    () =>
      Object.fromEntries(
        keys.map((k) => [k, React.createRef<HTMLDivElement>()])
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const observers = Object.entries(refs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            setVisible((prev) => ({ ...prev, [key]: true }));
        },
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [refs, threshold]);

  return { visible, refs };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const SECTION_KEYS = [
    "intro",
    "testimony",
    "brand",
    "greeting",
    "transform",
    "form",
  ];
  const { visible, refs } = useSectionVisibility(SECTION_KEYS);

  const [brandsFirstHalf, brandsSecondHalf] = splitArrayInHalf(BRANDS);

  // Smooth scroll ke section intro saat mount
  useEffect(() => {
    if (typeof window !== "undefined" && refs.intro.current) {
      refs.intro.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [refs.intro]);

  // Parallax untuk section testimony → brand → transform (shared dark zone)
  const darkZoneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: darkZoneProgress } = useScroll({
    target: darkZoneRef,
    offset: ["start end", "end start"],
  });
  const darkBgY = useTransform(darkZoneProgress, [0, 1], ["-5%", "5%"]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          §1  HERO — Where Reach Meets Intelligence
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={refs.intro as React.RefObject<HTMLDivElement>}
        id="section-intro"
        className="relative w-full min-h-dvh xl:h-dvh bg-primary flex justify-center pt-44 md:pt-0 md:items-center overflow-hidden"
      >
        {/* Background GIF */}
        <Image
          src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776920685/Space_ds6knk.gif"
          fill
          priority
          alt=""
          aria-hidden
          className="absolute z-0 inset-0 object-cover"
        />

        {/* Overlay — gradien diagonal agar teks terbaca */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Dot grid overlay */}
        <NodeGrid />

        {/* Konten */}
        <div className="relative w-full text-center z-20 px-[8%] md:px-0 flex flex-col items-center gap-6">
          {/* Label kecil — editorial AI */}
          {/* <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.4, delay: 0.1 }}
            className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.3em] font-mono"
          >
            AI-Powered Advertising
          </motion.p> */}

          {/* Headline */}
          <h1
            className="text-[28px] md:text-[44px] lg:text-[80px] leading-[1.05] tracking-tight"
            style={{ textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
          >
            <SplitWords
              text="Where Reach"
              delay={0.3}
              stagger={0.1}
              once={false}
            />
            <br />
            <motion.span
              className="text-white italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <SplitWords
                text="Meets Intelligence"
                className=""
                delay={0.6}
                stagger={0.09}
                once={false}
              />
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="text-white/80 text-sm md:text-lg max-w-[580px] leading-relaxed"
          >
            Connecting brands to the right audiences through a unified network
            of data, media, and AI-powered experiences — built for scale and
            measurable impact.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex gap-3 lg:gap-4 mt-4"
          >
            <Link
              href={WHO_WE_ARE}
              className="btn btn-md lg:btn-lg rounded-badge bg-foreground text-primary hover:bg-white transition-colors"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link
              href={OUR_SERVICES}
              className="btn btn-md lg:btn-lg rounded-badge border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Bottom fade ke section berikutnya */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--background, #0a0a0a))",
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §2  GREETING — We Don't Interrupt. We Invite.
      ═══════════════════════════════════════════════════════════════ */}
      <section
        id="section-greeting"
        ref={refs.greeting as React.RefObject<HTMLDivElement>}
        className="relative h-auto xl:h-[600px] px-[8%] xl:px-0 w-full bg-background xl:overflow-hidden bg-white"
      >
        {/* Glow subtil di kanan */}
        <GlowOrb x="85%" y="50%" size="50%" opacity={0.05} />

        {visible.greeting && (
          <>
            <div className="w-full xl:w-[52%] h-full flex justify-center flex-col gap-6 lg:gap-8 xl:pl-20 text-primary z-20 py-12 xl:py-0">
              {/* Mobile image */}
              <FadeUp delay={0.2} className="xl:hidden">
                <CldImage
                  src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776922030/img-person_swvbxu.svg"
                  width={500}
                  height={500}
                  priority
                  alt="Team"
                  className="w-full"
                />
              </FadeUp>

              {/* Label */}
              <FadeUp delay={0.1}>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono">
                  WE DON&apos;T INTERRUPT AUDIENCES. WE INVITE THEM IN
                </p>
              </FadeUp>

              {/* Headline */}
              <h1 className="font-bold leading-tight">
                <SplitWords
                  text="WE DON'T INTERRUPT AUDIENCES."
                  delay={0.2}
                  stagger={0.06}
                />
                <br />
                <SplitWords
                  text="WE INVITE THEM IN"
                  delay={0.6}
                  stagger={0.06}
                />
              </h1>

              <ScanLine delay={0.9} className="max-w-[420px]" />

              <FadeUp delay={0.8}>
                <p className="text-black text-sm md:text-lg leading-relaxed max-w-[480px]">
                  Every Captivad campaign is engineered for attention — media
                  placed with precision, creative built to react, and microsites
                  that turn a 30-second visit into a brand story worth sharing.
                </p>
              </FadeUp>
            </div>

            {/* Desktop image */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="hidden xl:block absolute -right-10 lg:right-20 -bottom-20 md:top-0 overflow-hidden rounded-3xl"
            >
              <CldImage
                src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776922030/img-person_swvbxu.svg"
                width={602}
                height={602}
                priority
                alt="Team member"
              />
            </motion.div>
          </>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §3–5  DARK ZONE — Testimony + Brand + Transform
          Tiga section ini dibungkus satu wrapper dengan background
          bersama sehingga terasa satu "dunia" namun setiap section
          memiliki komposisi visual yang berbeda.
      ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={darkZoneRef}
        className="relative w-full overflow-hidden"
        style={{ background: "var(--background, #080808)" }}
      >
        {/* ── Background bersama: parallax dot grid + glow ── */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ y: darkBgY }}
        >
          {/* Dot grid — nampak AI/data */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          {/* Diagonal line grid — sense of circuit board */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  rgba(255,255,255,1) 0px,
                  rgba(255,255,255,1) 1px,
                  transparent 1px,
                  transparent 80px
                )
              `,
            }}
          />
        </motion.div>

        {/* ─── §3 TESTIMONY ─────────────────────────────────────── */}
        <section
          id="section-testimony"
          ref={refs.testimony as React.RefObject<HTMLDivElement>}
          className="relative w-full h-[400px] sm:h-[600px] md:h-[800px] xl:h-full overflow-hidden border-t border-white/[0.06]"
        >
          {visible.testimony && (
            <>
              {/* Metric cards — stagger dari kiri */}
              <div className="absolute z-10 left-[7%] lg:left-[15%] top-10 sm:top-20 md:top-60 w-full flex flex-col gap-4 lg:gap-10">
                {METRICS.map((m, i) => (
                  <motion.div
                    key={m.description}
                    className={`w-full ${m.indent}`}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.3 + i * 0.2,
                    }}
                  >
                    <CardValueCount
                      value={m.value}
                      description={m.description}
                      icon={m.icon}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Hero image */}
              <div className="relative h-full w-full xl:pl-96 overflow-hidden">
                <motion.img
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                  src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776923439/successful-executive-asia-young-businesswoman-smart-casual-wear-drawing-writing-using-pen-with-digital-tablet-computer-thinking-inspiration-search-ideas-working-process-modern-office_1_1_bhgo6c.png"
                  alt="Campaign overview"
                  className="w-full h-full object-cover"
                />

                {/* Bottom fade — blend ke section brand di bawahnya */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, transparent 30%, rgba(8,8,8,0.9) 80%, var(--background, #080808) 100%)",
                  }}
                />

                {/* Left vignette agar metric cards terbaca */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, var(--background, #080808) 0%, transparent 50%)",
                  }}
                />
              </div>
            </>
          )}
        </section>

        {/* ─── §4 BRAND ─────────────────────────────────────────── */}
        <section
          id="landing-brand"
          ref={refs.brand as React.RefObject<HTMLDivElement>}
          className="relative w-full py-20 flex flex-col gap-10 items-center justify-center border-t border-white/[0.06]"
        >
          {/* Glow di tengah-tengah section ini */}
          <GlowOrb x="50%" y="50%" size="70%" opacity={0.035} />

          {visible.brand && (
            <>
              {/* Label */}
              <FadeUp delay={0.1}>
                <p className="text-[10px] text-white/25 uppercase tracking-[0.3em] font-mono text-center">
                  Our Partners
                </p>
              </FadeUp>

              {/* Heading */}
              <h2 className="w-full text-center px-[8%] md:px-0">
                <SplitWords
                  text="Trusted by Our Leading Brands"
                  delay={0.2}
                  stagger={0.06}
                />
              </h2>

              <ScanLine delay={0.7} className="max-w-[320px]" />

              {/* Marquee */}
              <FadeUp delay={0.5} className="w-full">
                <InfiniteMarquee
                  brands={brandsFirstHalf}
                  logoWidth={isDesktop ? 200 : 100}
                  logoHeight={isDesktop ? 150 : 60}
                  gap={isDesktop ? 64 : 40}
                  duration={28}
                  fadeWidth={isDesktop ? 200 : 80}
                  pauseOnHover
                  backgroundColor="var(--background, #080808)"
                />
              </FadeUp>
              {/* Marquee */}
              <FadeUp delay={0.5} className="w-full">
                <InfiniteMarquee
                  brands={brandsSecondHalf}
                  logoWidth={isDesktop ? 200 : 100}
                  logoHeight={isDesktop ? 150 : 60}
                  gap={isDesktop ? 64 : 40}
                  duration={28}
                  fadeWidth={isDesktop ? 200 : 80}
                  pauseOnHover
                  backgroundColor="var(--background, #080808)"
                  direction="right"
                />
              </FadeUp>
            </>
          )}
        </section>

        {/* ─── §5 TRANSFORM ─────────────────────────────────────── */}
        <section
          id="section-transform"
          ref={refs.transform as React.RefObject<HTMLDivElement>}
          className="relative h-[400px] md:h-[600px] w-full flex overflow-hidden border-y border-white/[0.06]"
        >
          {/* Circular GIF — dekoratif, berbeda posisi dari sebelumnya (kanan) */}
          <div className="z-0 absolute right-0 top-0 bottom-0 w-full lg:w-[700px] aspect-square my-auto overflow-hidden opacity-20 pointer-events-none">
            <CldImage
              src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776922254/Circular_x2dlfj.gif"
              width={800}
              height={800}
              priority
              alt=""
              aria-hidden
              objectFit="cover"
            />
          </div>

          {/* Glow kiri */}
          <GlowOrb x="15%" y="50%" size="40%" opacity={0.06} />

          {visible.transform && (
            <div className="z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-[8%] lg:p-20 text-foreground">
              {/* Headline kiri */}
              <div className="w-full flex flex-col gap-4 items-center lg:items-start">
                {/* Label */}
                {/* <FadeUp delay={0.1}>
                  <p className="text-[10px] text-white/25 uppercase tracking-[0.3em] font-mono">
                    The Shift
                  </p>
                </FadeUp> */}

                <h1 className="font-bold text-center lg:text-left leading-tight">
                  <SplitWords
                    text="TRANSFORM HOW YOU"
                    delay={0.2}
                    stagger={0.06}
                  />
                  <br />
                  <SplitWords
                    text="REACH YOUR AUDIENCE."
                    delay={0.55}
                    stagger={0.06}
                  />
                </h1>

                <ScanLine
                  delay={0.9}
                  className="hidden lg:block max-w-[360px]"
                />
              </div>

              {/* Body kanan */}
              <FadeUp
                delay={0.6}
                className="w-full flex items-start lg:items-end"
              >
                <p className="text-white/80 text-[14px] md:text-[18px] lg:text-lg leading-relaxed text-center lg:text-left">
                  That&apos;s why we offer tailored support to meet your unique
                  needs. Our team sails alongside you, exploring the uncharted
                  waters of your challenges and opportunities to develop bespoke
                  solutions.
                </p>
              </FadeUp>
            </div>
          )}
        </section>
      </div>
      {/* ═══════════════════════════════════════════════════════════════ */}

      {/* ═══════════════════════════════════════════════════════════════
          §6  FORM
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={refs.form as React.RefObject<HTMLDivElement>}
        id="form"
        className="lg:h-full p-[5%] lg:p-20 bg-foreground"
      >
        {visible.form && <FormCustomer />}
      </section>
    </>
  );
}
