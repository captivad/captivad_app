import { useInView, motion } from "framer-motion";
import { useRef } from "react";

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

export default GlitchLine;
