import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const INTRO_TIMING = {
  total: 1.8,
  outStart: 1.4,
  outDur: 0.4,
};

const titleLetters = "RENAISSANCE".split("");

export default function RenaissanceIntro({ onComplete, onSkip }) {
  const onCompleteRef = useRef(onComplete);
  const onSkipRef = useRef(onSkip);
  onCompleteRef.current = onComplete;
  onSkipRef.current = onSkip;

  useEffect(() => {
    const timer = setTimeout(() => onCompleteRef.current?.(), INTRO_TIMING.total * 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSkipRef.current ? onSkipRef.current() : onCompleteRef.current?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020610] text-[#F4EBD9] pointer-events-auto cursor-pointer select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: INTRO_TIMING.outStart, duration: INTRO_TIMING.outDur, ease: "easeInOut" }}
      onClick={() => (onSkipRef.current ? onSkipRef.current() : onCompleteRef.current?.())}
    >
      {/* Ambient Cinematic Golden Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[220px] bg-[#fbbf24]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Staggered Renaissance Wordmark with Rich Metallic Gold Gradient */}
        <div className="flex items-center justify-center overflow-hidden my-1">
          {titleLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 35, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.55,
                delay: 0.12 + index * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.14em] sm:tracking-[0.18em] bg-gradient-to-b from-[#FFFDF0] via-[#FFD700] to-[#B45309] bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Expanding Golden Hairline Accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-48 sm:w-72 h-[1px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent my-3"
        />

        {/* Sub-caption */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-montserrat text-[10px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.35em] text-[#F4EBD9]/85 uppercase"
        >
          10TH EDITION • E-CELL MNNIT ALLAHABAD
        </motion.p>
      </div>
    </motion.div>
  );
}
