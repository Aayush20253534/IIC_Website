import React from "react";
import { Link } from "react-router-dom";
import { SPONSOR_STREAM_ITEMS } from "../data/sponsorsData";

export default function SponsorStream() {
  const items = [...SPONSOR_STREAM_ITEMS, ...SPONSOR_STREAM_ITEMS];

  return (
    <div className="relative pt-12 pb-10 bg-gradient-to-b from-[#020712] via-[#041021] to-[#020712] border-y border-[#C5A25F]/25 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8 relative z-30">
        <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/35 font-semibold mb-2 shadow-md">
          Fleet of Partners & Sponsors
        </span>
        <h3 className="font-cinzel text-xl sm:text-3xl font-bold text-[#F4EBD9] tracking-wide drop-shadow-md">
          Sailing with the Voyage
        </h3>
        <p className="text-xs text-[#94A3B8] font-montserrat mt-1 max-w-md mx-auto">
          Cruising alongside the pioneers anchoring Renaissance 2026
        </p>
      </div>

      {/* Flowing Ocean Stream Marquee - Prominent Full-Square Sponsor Blocks */}
      <div className="relative z-20 overflow-hidden pb-4 pt-2">
        <div className="flex w-max animate-ocean-stream items-center">
          {items.map((sponsor, idx) => (
            <div
              key={idx}
              className="mx-6 sm:mx-8 w-52 h-52 sm:w-64 sm:h-64 aspect-square rounded-2xl bg-[#030914]/92 border border-[#C5A25F]/35 backdrop-blur-sm shadow-[0_16px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden select-none group hover:border-[#C5A25F] hover:shadow-[0_0_30px_rgba(197,162,95,0.35)] transition-all shrink-0"
            >
              {/* Full-Square Logo Display Stage */}
              <div className="flex-1 w-full p-6 flex items-center justify-center bg-gradient-to-b from-[#071d3a]/40 via-transparent to-transparent">
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)] group-hover:scale-108 transition-transform duration-300"
                />
              </div>

              {/* Dedicated Sleek Bottom Brand & Tier Slot */}
              <div className="bg-[#020610]/95 border-t border-[#C5A25F]/25 px-4 py-3 flex items-center justify-between gap-2">
                <span className="font-cinzel font-bold text-xs sm:text-sm text-[#F4EBD9] truncate tracking-wide">
                  {sponsor.name}
                </span>
                <span className="text-[9px] font-mono text-[#38BDF8] uppercase tracking-wider px-2 py-0.5 rounded bg-[#0EA5E9]/15 border border-[#0EA5E9]/30 shrink-0 font-semibold">
                  {sponsor.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link to All Tiers */}
      <div className="text-center mt-6 relative z-30">
        <Link
          to="/sponsors"
          className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-[#C5A25F] hover:text-white transition-colors font-semibold px-6 py-2.5 rounded-full bg-[#050B14]/90 border border-[#C5A25F]/40 hover:border-[#C5A25F] shadow-lg hover:shadow-[0_0_20px_rgba(197,162,95,0.3)]"
        >
          <span>View Full Sponsor Tiers</span>
          <span>➔</span>
        </Link>
      </div>
    </div>
  );
}



