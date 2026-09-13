import { useCallback, useEffect, useRef } from "react";
import Lenis from "lenis";
import { SmoothScrollContext } from "../lib/smoothScroll";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({
        top: target,
        behavior: options.immediate ? "auto" : "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.15,
      autoResize: true,
    });
    lenisRef.current = lenis;

    let frameId;
    const animate = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
