import React from "react";
import ContactFooter from "../components/ContactFooter";
import WaterButton from "../components/WaterButton";

export default function Gallery({ embedded = false }) {
  return (
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-transparent text-[#F4EBD9] flex flex-col justify-between`}>
      <div className="max-w-4xl mx-auto px-6 w-full mb-16 text-center">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/30 uppercase mb-3 font-semibold">
            Media & Event Gallery
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold mb-3">
            Renaissance Gallery
          </h1>
          <div className="w-16 h-[2px] bg-[#C5A25F] mx-auto mb-4" />
          <p className="font-montserrat text-xs text-[#94A3B8] max-w-lg mx-auto">
            Official photos and keynote recordings from Renaissance 2026.
          </p>
        </div>

        {/* Clean Empty Placeholder State */}
        <div className="p-12 sm:p-16 rounded-2xl bg-[#0A192F]/50 border border-[#C5A25F]/20 flex flex-col items-center justify-center max-w-xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#050B14] border border-[#C5A25F]/30 flex items-center justify-center mb-5 text-[#C5A25F]">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>

          <h3 className="font-cinzel font-bold text-lg text-[#F4EBD9] mb-2">
            Photo & Video Gallery
          </h3>
          <p className="font-montserrat text-xs text-[#94A3B8] max-w-md mb-8 leading-relaxed">
            Event photographs, keynote session recordings, and competition highlights will be published here during the summit.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <WaterButton to="/events" variant="primary" className="!px-6 !py-2.5 text-xs">
              Explore Events
            </WaterButton>
            <WaterButton to="/" variant="secondary" className="!px-6 !py-2.5 text-xs">
              Return Home
            </WaterButton>
          </div>
        </div>
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
