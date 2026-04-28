import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * TerminalLine — satu baris teks dengan efek "typing" cursor.
 * Memberikan nuansa AI terminal tanpa library animasi text tambahan.
 */
function TerminalLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span className="text-white/20 font-mono text-xs select-none">›</span>
      <span className="font-mono text-xs text-white/50 tracking-wide">
        {text}
      </span>
    </motion.div>
  );
}

export default TerminalLine;
