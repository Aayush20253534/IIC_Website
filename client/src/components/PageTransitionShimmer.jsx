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

  // Rapid NetraAI-style transition controller
  const startTransition = useCallback(
    (targetPath) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      // 1. Immediately veil the screen (100ms)
      setCurtainState("veiling");

      setTimeout(() => {
        navigate(targetPath);
        window.dispatchEvent(new CustomEvent("reset-artifacts"));
        setCurtainState("holding");

        // 2. Hold logo for 180ms while new route mounts
        setTimeout(() => {
          setCurtainState("unveiling");

          // 3. Smooth unveil fade-out (180ms)
          setTimeout(() => {
            setCurtainState("idle");
            isTransitioningRef.current = false;
          }, 180);
        }, 180);
      }, 100);
    },
    [navigate]
  );

  // Intercept internal Link / <a> clicks at capture phase
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }

    const handleGlobalClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

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

      const currentPath = location.pathname;
      if (
        href === currentPath ||
        (href === "/" && (currentPath === "/" || currentPath === "/udbhav"))
      ) {
        return;
      }

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
            duration: curtainState === "unveiling" ? 0.18 : 0.1,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[999999] pointer-events-auto flex flex-col items-center justify-center bg-[#020610]/95 backdrop-blur-2xl"
        >
          {/* Ambient Ocean Cyan Glow Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-[#38BDF8]/25 rounded-full blur-[100px] pointer-events-none" />

          {/* NetraAI-style Oceanic Transition Emblem */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, filter: "blur(4px)" }}
            animate={{
              scale: curtainState === "unveiling" ? 1.04 : 1,
              opacity: curtainState === "unveiling" ? 0 : 1,
              filter: curtainState === "unveiling" ? "blur(6px)" : "blur(0px)",
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex flex-col items-center px-4 text-center select-none"
          >
            {/* Transparent Emblem */}
            <div className="w-80 sm:w-[540px] md:w-[680px] lg:w-[780px] mb-5 flex items-center justify-center">
              <img
                src="/renaissance-logo-clean.png"
                alt="Renaissance 10th Edition"
                className="w-full h-auto object-contain filter drop-shadow-[0_0_40px_rgba(56,189,248,0.7)] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Expanding Laser Hairline */}
            <div className="w-72 sm:w-[500px] md:w-[620px] h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent my-3 shadow-[0_0_18px_#38BDF8]" />

            {/* Sub-caption */}
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.35em] text-[#38BDF8]/90 drop-shadow-md">
              10TH EDITION • THE GREAT VOYAGE
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
