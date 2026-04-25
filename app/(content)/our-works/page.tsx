"use client";

import FormCustomer from "@/components/form-customer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ArrowRight, ArrowLeft, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "next-cloudinary/dist/cld-video-player.css";
import LogoForm from "@/public/logo-no-text.svg";
import { useGetOurWorkByService } from "./our-work.web.service";
import { IResponseListOurWork } from "@/app/api/our-work/our-work.interface";
import { useGetListService } from "../our-services/our-service.web.service";
import ModalAddWork from "./components/ModalAddWork";
import CardContentAction from "./components/CardContentAction";
import ServiceFilter, {
  ServiceFilterItem,
  useActiveServiceFilter,
} from "./components/ServiceFilter";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface IPortfolio extends IResponseListOurWork {}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRIMITIVES — konsisten dengan halaman lain
// ─────────────────────────────────────────────────────────────────────────────

function SplitWords({
  text,
  delay = 0,
  stagger = 0.07,
  className = "",
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

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
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "110%", opacity: 0, filter: "blur(8px)" }
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
      className={`w-full h-px bg-white/10 relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-y-0 left-0 h-full w-[28%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "500%" } : { x: "-100%" }}
        transition={{ duration: 1.3, ease: "easeInOut", delay }}
      />
    </div>
  );
}

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
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILS — deteksi tipe media
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deteksi apakah URL adalah video berdasarkan ekstensi atau path Cloudinary.
 * Cloudinary video URL mengandung "/video/upload/" atau ekstensi video umum.
 */
function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const videoExts = /\.(mp4|webm|ogg|mov|avi|mkv|m4v)(\?.*)?$/i;
  const cloudinaryVideo = /\/video\/upload\//i;
  return videoExts.test(url) || cloudinaryVideo.test(url);
}

/**
 * Ekstrak public_id dari Cloudinary URL.
 * Dibutuhkan CldVideoPlayer yang menerima public_id, bukan full URL.
 * Contoh: "https://res.cloudinary.com/demo/video/upload/v123/my-video.mp4"
 *      → "my-video"
 */
function extractCloudinaryPublicId(url: string): string {
  try {
    const clean = url.split("?")[0];
    const uploadIdx = clean.indexOf("/upload/");
    if (uploadIdx === -1) return url;
    let path = clean.slice(uploadIdx + "/upload/".length);
    // Hapus versi (v123456789/)
    path = path.replace(/^v\d+\//, "");
    // Hapus ekstensi
    path = path.replace(/\.[^/.]+$/, "");
    return path;
  } catch {
    return url;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-KOMPONEN: SlideMedia
// Render image atau CldVideoPlayer tergantung URL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SlideMedia
 *
 * Menentukan apakah `video_image_url` adalah video atau gambar,
 * lalu merender komponen yang sesuai:
 * - Video → CldVideoPlayer, autoplay muted loop, kontrol custom
 * - Image → next/image fill object-cover
 *
 * isActive: false saat slide tidak aktif → video di-pause otomatis
 */
function SlideMedia({
  url,
  fallbackUrl,
  alt,
  isActive,
}: {
  url: string;
  fallbackUrl: string;
  alt: string;
  isActive: boolean;
}) {
  const isVideo = isVideoUrl(url);

  // Vignette overlay yang sama untuk image maupun video
  const Vignette = () => (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        background: `
          linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.3) 100%),
          linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%)
        `,
      }}
    />
  );

  if (isVideo) {
    const publicId = extractCloudinaryPublicId(url);

    return (
      <div className="absolute inset-0 overflow-hidden">
        {/*
         * CldVideoPlayer:
         * - Hide native controls via CSS — kita buat kontrol sendiri
         * - autoPlay hanya saat slide ini aktif
         * - muted wajib untuk browser autoplay policy
         * - loop agar background video tidak berhenti
         */}
        <div
          className="absolute inset-0 [&_.vjs-control-bar]:!hidden [&_.vjs-big-play-button]:!hidden [&_.vjs-loading-spinner]:!hidden"
          style={{ pointerEvents: isActive ? "auto" : "none" }}
        >
          <video
            id={`cld-player-${publicId.replace(/[^a-zA-Z0-9]/g, "-")}`}
            src={url}
            width={1920}
            height={1080}
            // autoPlay={isActive}
            // muted
            // loop
            controls
            className="!absolute !inset-0 !w-full !h-full [&_video]:object-cover [&_video]:w-full [&_video]:h-full"
          />
        </div>
        <Vignette />
      </div>
    );
  }

  // Gambar biasa
  return (
    <div className="absolute inset-0">
      <Image
        src={url || fallbackUrl}
        alt={alt}
        fill
        className="object-cover"
        priority
      />
      <Vignette />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDESHOW COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PortfolioSlideshow — fullscreen slide dengan:
 * - Image/Video background dengan crossfade (auto-detect via isVideoUrl)
 * - Info overlay di kiri bawah (client + title + desc)
 * - Badge metric di kanan atas
 * - Slide counter + progress bar
 * - Navigasi panah kiri/kanan + keyboard
 * - Auto-play 6 detik (pause saat hover atau slide video sedang main)
 * - Badge "VIDEO" indicator saat slide berisi video
 */
function PortfolioSlideshow({
  items,
  isAuthenticated,
}: {
  items: IPortfolio[];
  isAuthenticated: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setTimeout>>();

  const total = items.length;
  const isEmpty = total === 0;

  const go = useCallback(
    (idx: number, dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((idx + total) % total);
    },
    [total]
  );

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  // Auto-play — skip jika empty atau hanya 1 item
  useEffect(() => {
    if (isPaused || total <= 1) return;
    autoplayRef.current = setTimeout(() => next(), 6000);
    return () => clearTimeout(autoplayRef.current);
  }, [current, isPaused, next, total]);

  // Keyboard nav — skip jika empty
  useEffect(() => {
    if (isEmpty) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, isEmpty]);

  const item = items[current];

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      filter: "blur(8px)",
    }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      filter: "blur(8px)",
    }),
  };

  // ─────────────────────────────────────────────────────────────────────────
  // EMPTY STATE
  // ─────────────────────────────────────────────────────────────────────────

  if (isEmpty) {
    return (
      <div
        className="relative w-full h-[50vh] lg:h-[80vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Dot grid background — konsisten dengan halaman lain */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Konten empty state */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-5 px-6 text-center"
        >
          {/* Icon dekoratif — brackets ala code/AI terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-2"
            aria-hidden
          >
            <span
              className="text-4xl font-mono font-thin text-white/10 select-none"
              style={{ letterSpacing: "-0.05em" }}
            >
              [
            </span>
            {/* Pulsing dot di tengah */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/20" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white/20" />
            </span>
            <span
              className="text-4xl font-mono font-thin text-white/10 select-none"
              style={{ letterSpacing: "-0.05em" }}
            >
              ]
            </span>
          </motion.div>

          {/* Label kecil */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20"
          >
            No campaigns yet
          </motion.p>

          {/* Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/40 font-bold uppercase tracking-tight"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)" }}
          >
            The Stage Is Empty.
            <br />
            For Now.
          </motion.h3>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/20 text-xs md:text-sm font-mono max-w-[360px] leading-relaxed"
          >
            Every iconic campaign starts somewhere. Add the first portfolio
            entry to begin building a body of work that moves metrics.
          </motion.p>

          {/* CTA — hanya tampil untuk admin */}
          {isAuthenticated && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                (
                  document.getElementById(
                    "my_modal_add_portfolio"
                  ) as HTMLDialogElement
                )?.showModal()
              }
              className="mt-2 inline-flex items-center gap-2 px-5 py-2 text-[11px] font-mono uppercase tracking-widest text-white/50 border border-white/10 hover:border-white/30 hover:text-white/80 transition-all duration-200"
            >
              <Plus size={12} />
              Add First Campaign
            </motion.button>
          )}
        </motion.div>

        {/* Scan line dekoratif di bawah */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.05]"
          aria-hidden
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // NORMAL STATE
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="relative w-full aspect-[16/9] md:aspect-[16/7] h-[500px] lg:h-[80vh] overflow-hidden cursor-default"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background media (image/video) dengan crossfade ── */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={`bg-${item?.uuid || ""}`}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            scale: isVideoUrl(item?.video_image_url || "") ? 1 : 1.04,
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <SlideMedia
            url={item?.video_image_url || ""}
            fallbackUrl={item?.thumbnail_url || ""}
            alt={item?.title || ""}
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Badge VIDEO indicator ── */}
      {isVideoUrl(item?.video_image_url || "") && (
        <motion.div
          key={`video-badge-${item?.uuid || ""}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-2.5 py-1 border border-white/20"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80" />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">
            Video
          </span>
        </motion.div>
      )}

      {/* ── Badge metric kanan atas ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`badge-${item?.uuid || ""}`}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-5 right-5 z-20"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-white border rounded-full"
            style={{ backdropFilter: "blur(8px)" }}
          >
            {item?.objectiv_content || ""}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── Info overlay kiri bawah ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-10 pb-10 md:pb-14">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={`info-${item?.uuid || ""}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 max-w-[580px]"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
              {item?.key_result_content || ""}
            </p>
            <h2
              className="font-bold leading-tight text-white uppercase"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.75rem)" }}
            >
              {item?.title || ""}
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-1">
              {item?.description || ""}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Progress bar + counter + nav ── */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex gap-2 items-center flex-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Slide ${i + 1}`}
                className="relative h-px overflow-hidden transition-all duration-300"
                style={{ width: i === current ? 40 : 16 }}
              >
                <span className="absolute inset-0 bg-white/20" />
                {i === current && (
                  <motion.span
                    className="absolute inset-0 bg-white origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    key={`progress-${current}`}
                  />
                )}
              </button>
            ))}
          </div>

          <span className="font-mono text-[11px] text-white/30 tabular-nums">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-white/40 hover:bg-white/10 transition-all duration-200"
              aria-label="Previous"
            >
              <ArrowLeft size={14} className="text-white/60" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-white/40 hover:bg-white/10 transition-all duration-200"
              aria-label="Next"
            >
              <ArrowRight size={14} className="text-white/60" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Admin controls ── */}
      {isAuthenticated && <CardContentAction data={item as IPortfolio} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THUMBNAIL STRIP — grid preview di bawah slideshow
// ─────────────────────────────────────────────────────────────────────────────

// function ThumbnailStrip({
//   items,
//   active,
//   onSelect,
// }: {
//   items: IPortfolio[];
//   active: number;
//   onSelect: (i: number) => void;
// }) {
//   if (items.length <= 1) return null;

//   return (
//     <div className="w-full flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-none">
//       {items.map((item, i) => (
//         <button
//           key={item.uuid}
//           onClick={() => onSelect(i)}
//           className="relative flex-shrink-0 w-28 md:w-36 aspect-video overflow-hidden border transition-all duration-300"
//           style={{
//             borderColor:
//               i === active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.08)",
//           }}
//         >
//           <Image
//             src={item.thumbnail_url}
//             alt={item.title}
//             fill
//             className="object-cover"
//           />
//           <div
//             className="absolute inset-0 transition-opacity duration-300"
//             style={{
//               background: i === active ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.5)",
//             }}
//           />
//           <p className="absolute bottom-1.5 left-2 right-2 text-[9px] font-mono uppercase text-white/70 leading-tight truncate">
//             {item.title}
//           </p>
//         </button>
//       ))}
//     </div>
//   );
// }

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const activeFilter = useActiveServiceFilter();

  /**
   * Fetch portfolio data by service
   */
  const { data: listData, isLoading: listIsLoading } = useGetOurWorkByService({
    serviceId: activeFilter,
  });

  const { data: listServiceData, isLoading: listServiceIsLoading } =
    useGetListService();

  // Ganti MOCK_PORTFOLIOS dengan data dari API / React Query
  const portfolios = useMemo(() => {
    if (!listData) return [];
    return listData;
  }, [listData]);

  const FILTERS: ServiceFilterItem[] = useMemo(() => {
    if (!listServiceData) return [];
    return listServiceData.map((item) => ({
      label: item.name_service,
      value: item.uuid,
    }));
  }, [listServiceData]);

  const formRef = useRef<HTMLDivElement>(null);
  const isFormVisible = useInView(formRef, { once: true, margin: "-20% 0px" });

  const heroRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          §1  HERO — headline section
      ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        id="portfolio-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full bg-background flex flex-col justify-end pt-28 pb-10 md:pt-36 md:pb-12 overflow-hidden"
      >
        <div className="h-full w-[50%] overflow-hidden absolute z-0 top-0 bottom-0 -right-20">
          <Image
            src={LogoForm}
            fill
            alt="bg-section1"
            className=" object-contain"
          />
        </div>

        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background from-10% via-black/80 to-background z-10"></div>

        {/* Dot grid — AI nuance */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 80%, rgba(255,255,255,0.025) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-[90%] mx-auto mt-[10%] xl:px-12 flex flex-col gap-5">
          {/* Headline — 2-tone seperti referensi */}
          <h1
            className="leading-[1.0] tracking-tight font-bold uppercase"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
          >
            <SplitWords text="CAMPAIGNS THAT" delay={0.2} stagger={0.08} />
            <br />
            {/* "MOVED METRICS" — aksen merah */}
            <span className="inline-flex flex-wrap">
              {["MOVED", "METRICS."].map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    marginRight: "0.28em",
                  }}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                    }}
                    className="text-white/50 italic pr-4"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.55 + i * 0.1,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <ScanLine delay={0.9} className="mt-2 max-w-[30%]" />
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════
          §2  SLIDESHOW
      ═══════════════════════════════════════════════════════════════ */}
      <section
        id="portfolio-slideshow"
        className="relative w-full bg-background"
      >
        <div className="w-full min-h-[60vh] max-w-[90%] mx-auto xl:px-12 flex flex-col gap-4 pb-16">
          {/*filter service */}
          <ServiceFilter
            items={FILTERS}
            size="lg"
            loading={listServiceIsLoading}
          />
          {/* Add button (admin) */}
          {isAuthenticated && (
            <FadeUp className="flex justify-end mb-2">
              <button
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_add_ourwork"
                  ) as HTMLDialogElement;
                  if (modal) {
                    modal.showModal();
                  } else {
                    console.error("Modal element not found");
                  }
                }}
                className="btn btn-sm rounded-badge border-white/20 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white gap-2 font-mono text-xs tracking-widest uppercase"
              >
                <Plus size={14} />
                Add Portfolio
              </button>
            </FadeUp>
          )}

          {/* Main slideshow */}
          {!listIsLoading && (
            <FadeUp>
              <PortfolioSlideshow
                items={portfolios as unknown as IPortfolio[]}
                isAuthenticated={isAuthenticated}
              />
            </FadeUp>
          )}

          {/* Thumbnail strip */}
          {/* <FadeUp delay={0.2}>
            <ThumbnailStrip
              items={portfolios}
              active={activeSlide}
              onSelect={setActiveSlide}
            />
          </FadeUp> */}
        </div>

        {/* Subtle background texture untuk section ini */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 60% at 80% 30%, rgba(255,255,255,0.015) 0%, transparent 60%),
              radial-gradient(ellipse 40% 50% at 10% 80%, rgba(255,255,255,0.01) 0%, transparent 60%)
            `,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          §3  FORM
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
      <ModalAddWork />
    </>
  );
}
