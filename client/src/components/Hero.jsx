import React, { useState, useEffect } from "react";
import WaterButton from "./WaterButton";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16">
      {/* 3D Ship Map Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ship-map-hero.jpg"
          alt="Ship and Ocean Map"
          className="w-full h-full object-cover brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="max-w-[420px] mb-4">
          <img
            src="/renaissance-logo.png"
            alt="Renaissance 10th Edition"
            className="w-full h-auto object-contain"
          />
        </div>

        <p className="font-montserrat text-base sm:text-lg text-[#F4EBD9]/90 max-w-xl font-light mb-8">
          The Annual Entrepreneurship Summit of <span className="text-[#C5A25F] font-semibold">MNNIT Allahabad</span>.
        </p>

        {/* Physics-Based Water Filling Wooden Box Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
          <WaterButton to="/events" variant="primary">
            Explore Events
          </WaterButton>
          <WaterButton to="/register" variant="secondary">
            Register Now
          </WaterButton>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-3 text-center max-w-md w-full p-4 rounded-xl bg-[#0A192F]/80 border border-[#C5A25F]/20 backdrop-blur-sm shadow-xl">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINUTES", value: timeLeft.minutes },
            { label: "SECONDS", value: timeLeft.seconds },
          ].map((unit, idx) => (
            <div key={idx} className="p-2">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#F4EBD9]">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-montserrat text-[#94A3B8] uppercase block mt-0.5">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
