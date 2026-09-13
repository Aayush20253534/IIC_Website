import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Custom hook to trigger seamless page transitions imperatively
 */
export function useSeamlessNavigate() {
  const navigate = useNavigate();
  return useCallback(
    (to, options = {}) => {
      window.dispatchEvent(
        new CustomEvent("seamless-navigate", { detail: { to, options } })
      );
    },
    []
  );
}

export default function PageTransitionShimmer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [curtainState, setCurtainState] = useState("idle"); // "idle" | "veiling" | "holding" | "unveiling"
  const isTransitioningRef = useRef(false);
  const isFirstMountRef = useRef(true);

  // Transition controller
  const startTransition = useCallback(
    (targetPath) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      // 1. Immediately veil the screen (masks current page before route change)
      setCurtainState("veiling");

      // 2. Once veil is completely covering the screen (180ms), switch the route behind the veil
      setTimeout(() => {
        navigate(targetPath);
        window.dispatchEvent(new CustomEvent("reset-artifacts"));
        setCurtainState("holding");

        // 3. Hold majestic golden logo for 460ms while new page finishes mounting
        setTimeout(() => {
          setCurtainState("unveiling");

          // 4. Smooth unveil fade-out (320ms)
          setTimeout(() => {
            setCurtainState("idle");
            isTransitioningRef.current = false;
          }, 320);
        }, 460);
      }, 180);
    },
    [navigate]
  );

  // Intercept all internal Link / <a> clicks at capture phase
  useEffect(() => {
    // Skip on first mount to prevent overlapping with initial splash screen
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }

    const handleGlobalClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Filter out external URLs, mailto, tel, hash anchors, new tabs, and keyboard modifiers
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        anchor.target === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      // If clicking current route, do nothing
      const currentPath = location.pathname;
      if (
        href === currentPath ||
        (href === "/" && (currentPath === "/" || currentPath === "/udbhav"))
      ) {
        return;
      }

      // Intercept and run veil-first seamless transition
      e.preventDefault();
      e.stopPropagation();
      startTransition(href);
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [location.pathname, startTransition]);

  // Listen for programmatic transition events
  useEffect(() => {
    const handleProgrammaticNav = (e) => {
      const { to } = e.detail || {};
      if (to && to !== location.pathname) {
        startTransition(to);
      }
    };

    window.addEventListener("seamless-navigate", handleProgrammaticNav);
    return () => window.removeEventListener("seamless-navigate", handleProgrammaticNav);
  }, [location.pathname, startTransition]);

  const isVisible = curtainState !== "idle";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="transition-curtain"
          initial={{ opacity: 0 }}
          animate={{
            opacity: curtainState === "unveiling" ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: curtainState === "unveiling" ? 0.32 : 0.18,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[999999] pointer-events-auto flex flex-col items-center justify-center bg-[#020610]/98 backdrop-blur-3xl"
        >
          {/* Ambient Cinematic Golden Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[260px] bg-[#fbbf24]/18 rounded-full blur-[90px] pointer-events-none" />

          {/* Majestic NetraAI-style Golden Hairline & Oversized Monogram */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, filter: "blur(6px)" }}
            animate={{
              scale: curtainState === "unveiling" ? 1.05 : 1,
              opacity: curtainState === "unveiling" ? 0 : 1,
              filter: curtainState === "unveiling" ? "blur(8px)" : "blur(0px)",
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center px-4 text-center select-none"
          >
            {/* Grand Oversized Renaissance Wordmark */}
            <span className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.14em] sm:tracking-[0.18em] bg-gradient-to-b from-[#FFFDF0] via-[#FFD700] to-[#B45309] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(251,191,36,0.6)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              RENAISSANCE
            </span>

            {/* Expanding Laser Hairline */}
            <div className="w-56 sm:w-96 h-[1.5px] bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent my-3 shadow-[0_0_12px_#FBBF24]" />

            {/* Sub-caption */}
            <span className="text-[10px] sm:text-xs font-montserrat font-bold uppercase tracking-[0.35em] text-[#F4EBD9]/90 drop-shadow-md">
              10TH EDITION • THE GREAT VOYAGE
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

