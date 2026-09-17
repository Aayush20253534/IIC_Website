import React from "react";
import { SPEAKERS_DATA } from "../data/speakersData";

export default function Speakers() {
  return (
    <section className="py-24 px-6 bg-transparent relative overflow-hidden border-t border-[#C5A25F]/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Frosted Glass Backdrop */}
        <div className="text-center max-w-2xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-[#020610]/80 backdrop-blur-xl border border-[#C5A25F]/25 shadow-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#041021] border border-[#C5A25F]/30 uppercase mb-3">
            Renaissance Keynotes
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#F4EBD9] tracking-wide mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Distinguished Speakers
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A25F] mx-auto mb-4" />
          <p className="font-montserrat text-xs text-[#E2E8F0] leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Eminent pioneers, founders, and leaders who have steered discussions across previous voyages of Renaissance.
          </p>
        </div>

        {/* Structured Symmetrical 3x2 Grid without dummy guest text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
          {SPEAKERS_DATA.map((speaker, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#041021]/85 backdrop-blur-xl border border-[#C5A25F]/30 flex flex-col items-center text-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#C5A25F]/60 hover:-translate-y-1 group"
            >
              {/* Avatar with Nautical Gold Frame */}
              <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-b from-[#C5A25F]/40 to-transparent border border-[#C5A25F]/30 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src={speaker.image}
                  alt="Guest Speaker"
                  className="w-full h-full rounded-full object-cover bg-[#050B14]"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-speaker.svg";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
