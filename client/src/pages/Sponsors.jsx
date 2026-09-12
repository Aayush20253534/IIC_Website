import React from "react";
import { SPONSOR_TIERS } from "../data/sponsorsData";
import SponsorStream from "../components/SponsorStream";
import ContactFooter from "../components/ContactFooter";

export default function Sponsors({ embedded = false }) {
  return (
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-[#050B14] text-[#F4EBD9] flex flex-col justify-between`}>
      <div className="max-w-6xl mx-auto px-6 w-full mb-16">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/30 uppercase mb-3 font-semibold">
            Alliances & Fleet
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold mb-2">Our Sponsors</h1>
          <div className="w-16 h-0.5 bg-[#C5A25F] mx-auto mb-4" />
          <p className="font-montserrat text-xs text-[#94A3B8]">Sponsors and partners supporting Renaissance 2026 (Placeholders).</p>
        </div>

        {/* Dynamic Water Wave Stream with Sailing Ships */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-[#C5A25F]/20 shadow-2xl">
          <SponsorStream />
        </div>

        {/* Tiered Partner Grid */}
        <div className="space-y-14">
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.id} className="text-center">
              <h2 className="font-cinzel text-xl font-bold text-[#C5A25F] mb-6">
                {tier.title}
              </h2>
              <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                {tier.sponsors.map((sponsor, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-6 rounded-xl bg-[#0A192F]/60 border border-[#C5A25F]/25 flex flex-col items-center justify-center text-center hover:border-[#C5A25F]/50 transition-colors"
                  >
                    <div className="w-72 h-40 bg-[#050B14] p-2 rounded-lg flex items-center justify-center mb-3.5 border border-[#C5A25F]/20">
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="font-montserrat font-bold text-sm text-[#F4EBD9]">
                      {sponsor.name}
                    </h3>
                    <span className="text-[11px] text-[#0EA5E9] font-mono mt-1 uppercase tracking-wide flex justify-center">
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
