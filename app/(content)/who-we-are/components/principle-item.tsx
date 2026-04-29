import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

export default PrincipleItem;
