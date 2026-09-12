import React from "react";
import { Link } from "react-router-dom";
import { SPONSOR_STREAM_ITEMS } from "../data/sponsorsData";
import WebGLWaterCanvas from "./WebGLWaterCanvas";

// Realistic Multi-Mast Pirate Galleon with Hydrodynamic Foam Wake
const RealisticPirateGalleon = () => (
  <div className="relative inline-flex items-center justify-center mx-8 sm:mx-12 animate-ship-realistic select-none shrink-0">
    <svg
      className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ship Wooden Hull with Planking */}
      <path
        d="M18 58 C26 78, 86 78, 98 58 L90 70 C78 82, 34 82, 26 70 Z"
        fill="#3D2314"
        stroke="#C5A25F"
        strokeWidth="2"
      />
      {/* Keel & Gold Trim */}
      <path d="M22 64 C36 74, 76 74, 92 64" stroke="#C5A25F" strokeWidth="1.5" />
      {/* Gun Ports */}
      <rect x="36" y="65" width="4" height="4" rx="0.5" fill="#150E0A" stroke="#C5A25F" strokeWidth="0.8" />
      <rect x="52" y="66" width="4" height="4" rx="0.5" fill="#150E0A" stroke="#C5A25F" strokeWidth="0.8" />
      <rect x="68" y="65" width="4" height="4" rx="0.5" fill="#150E0A" stroke="#C5A25F" strokeWidth="0.8" />

      {/* Main Mast, Fore Mast, Mizzen, Bowsprit */}
      <line x1="58" y1="12" x2="58" y2="60" stroke="#C5A25F" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="36" y1="24" x2="36" y2="60" stroke="#C5A25F" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="28" x2="80" y2="60" stroke="#C5A25F" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="94" y1="60" x2="112" y2="44" stroke="#C5A25F" strokeWidth="2" strokeLinecap="round" />

      {/* Rigging Stay Lines */}
      <line x1="58" y1="18" x2="22" y2="60" stroke="#C5A25F" strokeWidth="0.8" opacity="0.65" />
      <line x1="58" y1="18" x2="94" y2="60" stroke="#C5A25F" strokeWidth="0.8" opacity="0.65" />
      <line x1="36" y1="28" x2="20" y2="60" stroke="#C5A25F" strokeWidth="0.8" opacity="0.65" />
      <line x1="80" y1="32" x2="94" y2="60" stroke="#C5A25F" strokeWidth="0.8" opacity="0.65" />

      {/* Canvas Sails - Main Mast */}
      <path
        d="M44 18 C58 14, 58 38, 44 42 C52 38, 64 38, 72 42 C58 38, 58 14, 72 18 Z"
        fill="#F4EBD9"
        stroke="#D9CBB0"
        strokeWidth="1.2"
      />
      {/* Renaissance Skull Emblem */}
      <circle cx="58" cy="28" r="3.5" fill="#1C140D" />
      <path d="M54 34 L62 34" stroke="#1C140D" strokeWidth="1.2" strokeLinecap="round" />

      {/* Fore & Mizzen Sails */}
      <path d="M26 30 C34 26, 34 44, 26 48 Z" fill="#F4EBD9" opacity="0.9" stroke="#D9CBB0" strokeWidth="1" />
      <path d="M82 34 C90 30, 90 48, 82 52 Z" fill="#F4EBD9" opacity="0.9" stroke="#D9CBB0" strokeWidth="1" />
      <path d="M86 42 C96 38, 98 52, 86 54 Z" fill="#F4EBD9" opacity="0.85" stroke="#D9CBB0" strokeWidth="1" />

      {/* Jolly Roger Pirate Flag on Top Mast */}
      <path d="M58 10 L72 14 L58 18 Z" fill="#C5A25F" />

      {/* Dynamic Water Foam Wake along Keel */}
      <path
        d="M12 66 C24 62, 36 70, 56 66 C76 62, 92 70, 108 66"
        stroke="#38BDF8"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.95"
      />
      <circle cx="18" cy="67" r="2" fill="#E0F2FE" />
      <circle cx="102" cy="67" r="2" fill="#E0F2FE" />
      <circle cx="60" cy="69" r="1.5" fill="#E0F2FE" opacity="0.8" />
    </svg>
  </div>
);

export default function SponsorStream() {
  const items = [...SPONSOR_STREAM_ITEMS, ...SPONSOR_STREAM_ITEMS];

  return (
    <div className="relative pt-12 pb-10 bg-gradient-to-b from-[#050B14] via-[#03182E] to-[#050B14] border-y border-[#C5A25F]/20 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-6 relative z-30">
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/30 font-semibold mb-2">
          Fleet of Partners & Sponsors (Placeholder)
        </span>
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F4EBD9] tracking-wide">
          Sailing with the Voyage
        </h3>
      </div>

      {/* 3D WebGL Ocean Water Bed (Spanning full width under the sailing fleet) */}
      <div className="absolute inset-x-0 bottom-0 h-44 z-0 pointer-events-auto opacity-90">
        <WebGLWaterCanvas className="w-full h-full" />
      </div>

      {/* Flowing Water Current Marquee - Aligned Directly Onto Water Surface */}
      <div className="relative z-20 overflow-hidden pb-2 pt-4">
        <div className="flex w-max animate-ocean-stream items-end">
          {items.map((sponsor, idx) => (
            <React.Fragment key={idx}>
              {/* Floating Buoyant Sponsor Card */}
              <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#0A192F]/95 border border-[#C5A25F]/35 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.7)] animate-buoyant select-none group hover:border-[#C5A25F] transition-colors mb-2">
                <div className="w-16 h-10 rounded-lg bg-[#050B14] p-1.5 flex items-center justify-center overflow-hidden shrink-0 border border-[#C5A25F]/20">
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col text-left pr-2">
                  <span className="font-montserrat font-bold text-xs text-[#F4EBD9] tracking-wide">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#0EA5E9] uppercase tracking-wider">
                    {sponsor.tier}
                  </span>
                </div>
              </div>

              {/* Realistic Sailing Pirate Galleon Resting on Wave Line */}
              <RealisticPirateGalleon />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Surface Translucent Water Wave Crests with Glowing Foam */}
      <div className="absolute inset-x-0 bottom-0 h-24 overflow-hidden pointer-events-none z-10">
        <div className="flex w-[200%] animate-wave-foam opacity-70 h-full">
          <svg className="w-1/2 h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,65 C220,15 460,105 700,55 C940,20 1180,95 1440,65 L1440,120 L0,120 Z"
              fill="rgba(56, 189, 248, 0.35)"
            />
            <path
              d="M0,65 C220,15 460,105 700,55 C940,20 1180,95 1440,65"
              stroke="#E0F2FE"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
          <svg className="w-1/2 h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,65 C220,15 460,105 700,55 C940,20 1180,95 1440,65 L1440,120 L0,120 Z"
              fill="rgba(56, 189, 248, 0.35)"
            />
            <path
              d="M0,65 C220,15 460,105 700,55 C940,20 1180,95 1440,65"
              stroke="#E0F2FE"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Link to All Tiers */}
      <div className="text-center mt-3 relative z-30">
        <Link
          to="/sponsors"
          className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-[#C5A25F] hover:text-white transition-colors font-semibold px-4 py-1.5 rounded-full bg-[#050B14]/85 border border-[#C5A25F]/30 hover:border-[#C5A25F]"
        >
          <span>View Full Sponsor Tiers</span>
          <span>➔</span>
        </Link>
      </div>
    </div>
  );
}
