import { useCallback, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frameId;
    let lenisInstance = null;
    let isMounted = true;

    import("lenis")
      .then((mod) => {
        if (!isMounted) return;
        const LenisClass = mod.default || mod.Lenis || mod;
        if (!LenisClass) return;

        const lenis = new LenisClass({
          duration: 1.15,
          easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
          wheelMultiplier: 0.95,
          touchMultiplier: 1.15,
          autoResize: true,
        });
        lenisInstance = lenis;
        lenisRef.current = lenis;
        window.__lenis = lenis;
        lenis.on("scroll", () => ScrollTrigger.update());

        const animate = (time) => {
          lenis.raf(time);
          frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
      })
      .catch((err) => {
        console.warn("Smooth scroll initialization skipped:", err);
      });

    return () => {
      isMounted = false;
      if (frameId) cancelAnimationFrame(frameId);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
