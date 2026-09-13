import React from "react";
import { SPONSOR_TIERS } from "../data/sponsorsData";
import SponsorStream from "../components/SponsorStream";
import ContactFooter from "../components/ContactFooter";

export default function Sponsors({ embedded = false }) {
  return (
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-transparent text-[#F4EBD9] flex flex-col justify-between relative`}>
      <div className="max-w-6xl mx-auto px-6 w-full mb-16">
        <div className="text-center mb-10 p-6 sm:p-8 rounded-3xl bg-[#020610]/80 backdrop-blur-xl border border-[#C5A25F]/25 shadow-2xl max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#041021] border border-[#C5A25F]/30 uppercase mb-3 font-semibold">
            Alliances & Fleet
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Our Sponsors</h1>
          <div className="w-16 h-0.5 bg-[#C5A25F] mx-auto mb-4" />
          <p className="font-montserrat text-xs text-[#E2E8F0] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Sponsors and partners supporting the Voyage of Renaissance 2026.
          </p>
        </div>

        {/* Dynamic Water Wave Stream with 3D Sailing Ships */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-[#C5A25F]/20 shadow-2xl bg-[#020610]/70 backdrop-blur-md">
          <SponsorStream />
        </div>

        {/* Tiered Partner Grid with Full-Size Prominent PNGs */}
        <div className="space-y-16">
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.id} className="text-center">
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#C5A25F] mb-8 drop-shadow-[0_0_12px_rgba(197,162,95,0.3)]">
                {tier.title}
              </h2>
              <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
                {tier.sponsors.map((sponsor, sIdx) => (
                  <div
                    key={sIdx}
                    className="group relative w-72 sm:w-80 md:w-96 p-6 sm:p-8 rounded-3xl bg-[#030914]/85 backdrop-blur-xl border border-[#C5A25F]/30 hover:border-[#C5A25F]/70 shadow-[0_12px_36px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(197,162,95,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
                  >
                    {/* Subtle Gold Gradient Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#C5A25F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Large Prominent Logo Box */}
                    <div className="relative w-full h-36 sm:h-44 bg-[#020610]/90 backdrop-blur-md p-5 rounded-2xl flex items-center justify-center mb-5 border border-[#C5A25F]/25 shadow-inner group-hover:border-[#C5A25F]/50 transition-colors">
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Sponsor Title & Badge */}
                    <h3 className="font-cinzel font-bold text-base sm:text-lg text-[#F4EBD9] tracking-wide group-hover:text-[#C5A25F] transition-colors">
                      {sponsor.name}
                    </h3>

                    <span className="text-[10px] sm:text-xs text-[#0EA5E9] font-mono mt-2 uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 shadow-sm">
                      {sponsor.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
