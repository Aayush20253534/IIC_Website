import React, { useEffect, useRef, useState } from "react";
import { Compass, Waves, ArrowDown } from "lucide-react";

export default function SeaScrollTransition() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height + windowHeight;
      const current = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, current / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const depthMeters = Math.round(scrollProgress * 3200);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 overflow-hidden z-20 select-none"
    >
      {/* Dynamic Sea Transition Waves & Depth Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1: Ambient Trench Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#031326]/60 to-[#020610]" />

        {/* Layer 2: Foam Wave Surges */}
        <svg
          className="absolute top-0 left-0 w-full h-24 sm:h-36 text-[#38BDF8]/15"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="currentColor"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-full h-24 sm:h-36 text-[#020610]"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,96L60,90.7C120,85,240,75,360,85.3C480,96,600,128,720,133.3C840,139,960,117,1080,101.3C1200,85,1320,75,1380,69.3L1440,64L1440,160L1380,160C1320,160,1200,160,1080,160C960,160,840,160,720,160C600,160,480,160,360,160C240,160,120,160,60,160L0,160Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Center Cinematic Transition Beacon */}
      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Pulsing Depth Gauge Capsule */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#030e1d]/90 border border-[#38BDF8]/40 shadow-[0_0_25px_rgba(56,189,248,0.25)] backdrop-blur-xl mb-4 transition-all duration-300">
          <Waves className="w-4 h-4 text-[#38BDF8] animate-pulse" />
          <span className="font-mono text-xs font-bold text-[#E2E8F0] tracking-[0.25em] uppercase">
            ABYSS DESCENT • {depthMeters} METERS
          </span>
        </div>

        {/* Cinematic Sea Heading */}
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#F8FAFC] tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] flex items-center gap-3">
          <span>Entering the Grand Armada</span>
        </h2>

        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent mx-auto mt-4 mb-3" />

        <p className="font-montserrat text-xs sm:text-sm text-[#94A3B8] max-w-lg mx-auto font-light leading-relaxed">
          Scroll down to pilot the flagship helm and inspect the visionary fleet powering Renaissance 2026.
        </p>

        {/* Scroll Indicator Down Arrow */}
        <div className="mt-6 flex flex-col items-center gap-1.5 text-[#38BDF8] animate-bounce">
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
