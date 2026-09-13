import React from "react";
import WaterButton from "./WaterButton";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16">
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="max-w-[400px] sm:max-w-[460px] mb-5">
          <img
            src="/renaissance-logo.png"
            alt="Renaissance 10th Edition"
            className="w-full h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Balanced Summit Description Text */}
        <p className="font-montserrat text-lg sm:text-xl text-[#F4EBD9] max-w-xl font-light mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-relaxed">
          The Annual Entrepreneurship Summit of{" "}
          <span className="text-[#C5A25F] font-semibold tracking-wide">MNNIT Allahabad</span>.
        </p>

        {/* Physics-Based Water Filling Wooden Box Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <WaterButton to="/events" variant="primary">
            Explore Events
          </WaterButton>
          <WaterButton to="/register" variant="secondary">
            Register Now
          </WaterButton>
        </div>
      </div>
    </section>
  );
}
