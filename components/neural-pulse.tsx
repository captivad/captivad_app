import { motion } from "framer-motion";

/**
 * NeuralPulse — animasi SVG berupa lingkaran konsentris yang berpulsa.
 * Mewakili "sinyal AI" secara visual tanpa library eksternal tambahan.
 */
function NeuralPulse() {
  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      className="w-full h-full opacity-20"
      aria-hidden
    >
      {[1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx="160"
          cy="160"
          r={40 + i * 30}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.1, 1.3] }}
          transition={{
            duration: 3,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.circle
        cx="160"
        cy="160"
        r="8"
        fill="white"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default NeuralPulse;
