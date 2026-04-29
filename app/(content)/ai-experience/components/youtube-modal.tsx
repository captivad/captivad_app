"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface YoutubeModalProps {
  youtubeId: string | null;
  startAt?: number;
  onClose: () => void;
}

/**
 * YoutubeModal
 *
 * Modal fullscreen untuk memutar video YouTube.
 * - Embed via iframe dengan autoplay=1 saat terbuka
 * - Tutup via tombol X, klik backdrop, atau tekan Escape
 * - Animasi fade + scale masuk/keluar
 */
export default function YoutubeModal({
  youtubeId,
  startAt = 0,
  onClose,
}: YoutubeModalProps) {
  // Tutup dengan keyboard Escape
  useEffect(() => {
    if (!youtubeId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [youtubeId, onClose]);

  // Kunci scroll saat modal terbuka
  useEffect(() => {
    if (youtubeId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [youtubeId]);

  const embedSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&start=${startAt}&rel=0&modestbranding=1`
    : "";

  return (
    <AnimatePresence>
      {youtubeId && (
        // Backdrop
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-8"
          style={{
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          {/* Modal container — stopPropagation agar klik di dalam tidak menutup */}
          <motion.div
            className="relative w-full max-w-[900px] aspect-video"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Border dekoratif */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute rounded-full -top-10 right-0 z-10 w-8 h-8 flex items-center justify-center border border-white/15 hover:border-white/40 hover:bg-white/10 transition-all duration-200"
              aria-label="Close video"
            >
              <X size={14} className="text-white/60" />
            </button>

            {/* YouTube iframe */}
            <iframe
              src={embedSrc}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: "none", display: "block" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
