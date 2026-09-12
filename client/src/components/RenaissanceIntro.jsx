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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050B14] text-[#F4EBD9] pointer-events-auto cursor-pointer select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: INTRO_TIMING.outStart, duration: INTRO_TIMING.outDur, ease: "easeInOut" }}
      onClick={() => (onSkipRef.current ? onSkipRef.current() : onCompleteRef.current?.())}
    >
      <div className="relative text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Staggered Renaissance Wordmark */}
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
      </div>
    </motion.div>
  );
}
