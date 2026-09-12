import React from "react";
import { SPEAKERS_DATA } from "../data/speakersData";

export default function Speakers() {
  return (
    <section className="py-24 px-6 bg-[#070E1A] relative overflow-hidden border-t border-[#C5A25F]/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/30 uppercase mb-3">
            Renaissance Keynotes
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#F4EBD9] tracking-wide mb-3">
            Distinguished Speakers
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A25F] mx-auto mb-4" />
          <p className="font-montserrat text-xs text-[#94A3B8] leading-relaxed">
            Eminent pioneers, founders, and leaders who have steered discussions across previous voyages of Renaissance.
          </p>
        </div>

        {/* Structured Symmetrical 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
          {SPEAKERS_DATA.map((speaker, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0A192F]/60 border border-[#C5A25F]/20 flex flex-col items-center text-center justify-between shadow-lg transition-all duration-300 hover:border-[#C5A25F]/50 hover:-translate-y-1 group min-h-[320px]"
            >
              {/* Top Details & Avatar */}
              <div className="flex flex-col items-center w-full">
                {/* Avatar with Nautical Gold Frame */}
                <div className="relative w-28 h-28 mb-4 rounded-full p-1 bg-gradient-to-b from-[#C5A25F]/40 to-transparent border border-[#C5A25F]/30 shadow-md">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full rounded-full object-cover bg-[#050B14]"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-speaker.svg";
                    }}
                  />
                </div>

                <h3 className="font-cinzel font-bold text-base text-[#F4EBD9] tracking-wide mb-1 group-hover:text-[#C5A25F] transition-colors">
                  {speaker.name}
                </h3>
                <p className="text-xs font-montserrat font-medium text-[#0EA5E9] leading-snug line-clamp-2 min-h-[32px] flex items-center justify-center">
                  {speaker.title}
                </p>
              </div>

              {/* Bottom Keynote Topic */}
              <div className="mt-4 pt-3.5 border-t border-[#C5A25F]/15 w-full flex flex-col items-center">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A25F]/80 mb-1">
                  Keynote Theme
                </span>
                <p className="text-[11px] font-montserrat text-[#94A3B8] italic leading-relaxed line-clamp-2">
                  "{speaker.topic}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
