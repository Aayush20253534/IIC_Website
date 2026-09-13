import { useEffect, useRef } from "react";
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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050B14] text-[#F4EBD9] pointer-events-auto cursor-pointer select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: INTRO_TIMING.outStart, duration: INTRO_TIMING.outDur, ease: "easeInOut" }}
      onClick={() => (onSkipRef.current ? onSkipRef.current() : onCompleteRef.current?.())}
    >
      <div className="relative text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Edition Badge */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#C5A25F] font-mono block mb-3 font-semibold"
        >
          10th Edition • E-Cell MNNIT
        </motion.span>

        {/* Staggered NetraAI Wordmark */}
        <div className="flex items-center justify-center overflow-hidden my-2">
          {titleLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: 0.15 + index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.12em] text-[#F4EBD9] inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Golden Horizon Accent Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="w-32 sm:w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C5A25F] to-transparent my-3"
        />

        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-xs sm:text-sm font-montserrat uppercase text-[#0EA5E9] font-bold block"
        >
          VENTURE BEYOND THE KNOWN
        </motion.span>

        {/* Skip Hint */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="text-[9px] font-mono text-[#94A3B8] mt-8"
        >
          Click anywhere or press Esc to skip
        </motion.span>
      </div>
    </motion.div>
  );
}
