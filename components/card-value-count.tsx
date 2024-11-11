"use client";

import React from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Image from "next/image";

interface ICardValueCount extends React.HTMLProps<HTMLDivElement> {
  icon: string;
  value: number;
  description: string;
  className?: string;
}

const CardValueCount = ({
  description,
  value,
  icon,
  className,
}: ICardValueCount) => {
  const [currentValue, setCurrentValue] = React.useState(0);

  // Format number with commas
  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US").format(num);

  React.useEffect(() => {
    // Increment the value from 1 to the target value
    let startValue = 0;
    const duration = 2000; // Duration for the animation in milliseconds
    const stepTime = Math.max(Math.floor(duration / value), 10); // Time between increments

    const increment = () => {
      startValue += Math.ceil(value / (duration / stepTime));
      if (startValue >= value) {
        setCurrentValue(value); // Set to final value when reached
        clearInterval(interval);
      } else {
        setCurrentValue(startValue); // Incrementally update the value
      }
    };

    const interval = setInterval(increment, stepTime);

    // Clean up the interval when the component is unmounted or value changes
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div
      className={`p-[1px] max-w-[250px] lg:max-w-[412px] bg-gradient-to-tl from-white from-40% to-white/30 rounded-3xl ${
        className && className
      }`}
    >
      <motion.div
        className="max-w-[300px] lg:max-w-[412px] min-h-[100px] lg:min-h-[142px] rounded-3xl bg-[#171717] flex items-center pl-10 lg:pl-20 gap-4 md:gap-10"
        initial={{ scale: 0.95 }} // Initial scale for a subtle effect
        animate={{ scale: 1 }} // Scale up to 1 (no scale)
        transition={{ duration: 0.3, ease: "easeOut" }} // Scale animation settings
      >
        <span className="w-[54px] aspect-square rounded-full bg-white flex justify-center items-center">
          <Image
            src={icon}
            alt="icons"
            width={30}
            height={30}
            className=" object-contain"
          />
        </span>

        {/* Animate the number changing */}
        <div className="flex flex-col gap-1">
          <motion.h3
            className="md:text-2xl lg:font-3xl font-bold text-white"
            key={currentValue} // Key forces a re-render on value change
            initial={{ opacity: 0, y: -10 }} // Start with hidden number
            animate={{ opacity: 1, y: 0 }} // Animate number into view
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
          >
            {formatNumber(currentValue)}
          </motion.h3>
          <p className="lg:text-2xl text-white">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export { CardValueCount };
