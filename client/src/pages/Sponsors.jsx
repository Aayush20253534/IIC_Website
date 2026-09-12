import React, { useState, useEffect, useRef } from "react"; import { SPONSOR_TIERS } from "../data/sponsorsData";
import SponsorStream from "../components/SponsorStream";
import ContactFooter from "../components/ContactFooter";

export default function Sponsors({ embedded = false }) {

  const [activeSponsor, setActiveSponsor] = useState(null);
  const [side, setSide] = useState("left");
  const gridRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current || !activeSponsor) return;
      const rect = gridRef.current.getBoundingClientRect();
      const gridHeight = rect.height;
      const scrolledAmount = -rect.top;

      // Closes preview panel when scrolled past 30% of sponsor grid
      if (scrolledAmount > gridHeight * 0.3 || rect.top > window.innerHeight * 0.7) {
        setActiveSponsor(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSponsor]);

  const handleMouseEnter = (sponsor, index) => {
    const isLeftHalf = index % 2 === 0;
    setSide(isLeftHalf ? "right" : "left");
    setActiveSponsor(sponsor);
  };
  return (
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-[#050B14] text-[#F4EBD9] flex flex-col justify-between relative`}>
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
        <div className="space-y-14" ref={gridRef}>
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.id} className="text-center">
              <h2 className="font-cinzel text-xl font-bold text-[#C5A25F] mb-6">
                {tier.title}
              </h2>
              <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                {tier.sponsors.map((sponsor, sIdx) => (
                  <div
                    key={sIdx}
                    onMouseEnter={() => handleMouseEnter(sponsor, sIdx)}
                    onMouseLeave={() => setActiveSponsor(null)}
                    className="group relative p-7 rounded-2xl bg-[#0A192F]/30 backdrop-blur-xl border border-[#C5A25F]/20 hover:border-[#C5A25F]/60 shadow-[0_8px_32px_0_rgba(5,11,20,0.37)] hover:shadow-[0_0_25px_rgba(197,162,95,0.2)] transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
                  >
                    {/* Subtle Gold Gradient Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#C5A25F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Inner Logo Box with Frosted Glass Layer */}
                    <div className="relative w-72 h-40 bg-[#050B14]/70 backdrop-blur-md p-4 rounded-xl flex items-center justify-center mb-5 border border-[#C5A25F]/25 shadow-inner group-hover:border-[#C5A25F]/40 transition-colors">
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    {/* Sponsor Title & Badge */}
                    <h3 className="font-montserrat font-bold text-base text-[#F4EBD9] tracking-wide group-hover:text-[#C5A25F] transition-colors">
                      {sponsor.name}
                    </h3>

                    <span className="text-[11px] text-[#0EA5E9] font-mono mt-2 uppercase tracking-widest px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 shadow-sm">
                      {sponsor.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed top-1/2 -translate-y-1/2 z-50 w-80 sm:w-96 p-8 rounded-3xl bg-[#0A192F]/90 backdrop-blur-2xl border-2 border-[#C5A25F]/60 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out pointer-events-none ${
          side === "left" ? "left-8" : "right-8"
        } ${
          activeSponsor
            ? "opacity-100 scale-100 translate-x-0"
            : side === "left"
            ? "opacity-0 scale-90 -translate-x-12"
            : "opacity-0 scale-90 translate-x-12"
        }`}
      >
        {activeSponsor && (
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#C5A25F] uppercase border-b border-[#C5A25F]/30 pb-1">
              Featured Partner
            </span>
            <div className="w-full h-48 bg-[#050B14] p-6 rounded-2xl border border-[#C5A25F]/30 flex items-center justify-center shadow-inner">
              <img
                src={activeSponsor.image}
                alt={activeSponsor.name}
                className="max-h-full max-w-full object-contain drop-shadow-[0_4px_12px_rgba(197,162,95,0.3)]"
              />
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-[#F4EBD9]">
              {activeSponsor.name}
            </h2>
            <span className="text-xs text-[#0EA5E9] font-mono uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#0EA5E9]/15 border border-[#0EA5E9]/30">
              {activeSponsor.category}
            </span>
            <p className="font-montserrat text-xs text-[#94A3B8] leading-relaxed pt-2">
              Official partner for Renaissance 2026. Empowering innovation and leadership across fleets.
            </p>
          </div>
        )}
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
