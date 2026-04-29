import { useCallback, useEffect, useRef, useState } from "react";
import { IPortfolio } from "../page";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import CardContentAction from "./card-content-action";
import { isVideoUrl } from "../utils/our-work-utils";
import SlideMedia from "./slide-media";

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
        className="relative w-full h-[40vh] lg:h-[80vh] flex flex-col items-center justify-center overflow-hidden"
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
      className="relative w-full aspect-[16/9] md:aspect-[16/7] h-[40vh] lg:h-[80vh] overflow-hidden cursor-default"
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

          <span className="font-mono text-sm text-white/30 tabular-nums">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 hover:border-white/40 hover:bg-white/10 transition-all duration-200"
              aria-label="Previous"
            >
              <ArrowLeft size={14} className="text-white/60" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 hover:border-white/40 hover:bg-white/10 transition-all duration-200"
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

export default PortfolioSlideshow;
