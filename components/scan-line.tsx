import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

export default ScanLine;
