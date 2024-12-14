"use client";
import { motion } from "framer-motion";

const SkeletonWorkCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1,
        ease: "easeOut",
        delay: 0.4,
      }}
      className="hidden lg:flex flex-col gap-24 w-full mb-6"
    >
      <div className="w-full justify-center lg:flex flex-wrap gap-10 overflow-hidden">
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
      </div>
      <div className="hidden w-full justify-center lg:flex flex-wrap gap-10 overflow-hidden">
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
      </div>
      <div className="hidden w-full justify-center lg:flex flex-wrap gap-10 overflow-hidden">
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
        <div className="skeleton relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"></div>
      </div>
    </motion.div>
  );
};

export default SkeletonWorkCard;
