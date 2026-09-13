import React, { useEffect, useRef, useState } from "react";
import { SPONSOR_TIERS } from "../data/sponsorsData";
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

      // Keep the featured sponsor open on smaller screens.
      if (
        window.innerWidth >= 768 &&
        (scrolledAmount > gridHeight * 0.3 ||
          rect.top > window.innerHeight * 0.7)
      ) {
        setActiveSponsor(null);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSponsor]);

  const handleCardClick = (event, sponsor, index) => {
    event.stopPropagation();

    const isLeftHalf = index % 2 === 0;

    setSide(isLeftHalf ? "right" : "left");
    setActiveSponsor((previousSponsor) =>
      previousSponsor?.name === sponsor.name ? null : sponsor,
    );
  };

  const handleMouseEnter = (sponsor, index) => {
    if (window.innerWidth < 768) return;

    const isLeftHalf = index % 2 === 0;

    setSide(isLeftHalf ? "right" : "left");
    setActiveSponsor(sponsor);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setActiveSponsor(null);
    }
  };

  return (
    <div
      className={`${
        embedded ? "py-16" : "min-h-screen pt-28 pb-12"
      } bg-transparent text-[#F4EBD9] flex flex-col justify-between relative`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-16">
        <div className="text-center mb-10 p-6 sm:p-8 rounded-3xl bg-[#020610]/80 backdrop-blur-xl border border-[#C5A25F]/25 shadow-2xl max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#041021] border border-[#C5A25F]/30 uppercase mb-3 font-semibold">
            Alliances & Fleet
          </span>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Our Sponsors
          </h1>

          <div className="w-16 h-0.5 bg-[#C5A25F] mx-auto mb-4" />

          <p className="font-montserrat text-xs text-[#E2E8F0] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Sponsors and partners supporting Renaissance 2026.
          </p>
        </div>

        {/* Dynamic water-wave sponsor stream */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-[#C5A25F]/20 shadow-2xl bg-[#020610]/70 backdrop-blur-md">
          <SponsorStream />
        </div>

        {/* Tiered partner grid */}
        <div className="space-y-14" ref={gridRef}>
          {SPONSOR_TIERS.map((tier) => (
            <section key={tier.id} className="text-center">
              <h2 className="font-cinzel text-xl font-bold text-[#C5A25F] mb-6 drop-shadow-[0_0_10px_rgba(197,162,95,0.3)]">
                {tier.title}
              </h2>

              <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                {tier.sponsors.map((sponsor, sponsorIndex) => (
                  <button
                    key={`${tier.id}-${sponsor.name}-${sponsorIndex}`}
                    type="button"
                    onClick={(event) =>
                      handleCardClick(event, sponsor, sponsorIndex)
                    }
                    onMouseEnter={() =>
                      handleMouseEnter(sponsor, sponsorIndex)
                    }
                    onMouseLeave={handleMouseLeave}
                    className="group relative p-7 rounded-2xl bg-[#041021]/80 backdrop-blur-xl border border-[#C5A25F]/25 hover:border-[#C5A25F]/60 shadow-[0_8px_32px_0_rgba(2,6,16,0.6)] hover:shadow-[0_0_25px_rgba(197,162,95,0.25)] transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer"
                    aria-label={`View ${sponsor.name} details`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#C5A25F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative w-64 sm:w-72 h-36 sm:h-40 bg-[#050B14]/70 backdrop-blur-md p-4 rounded-xl flex items-center justify-center mb-5 border border-[#C5A25F]/25 shadow-inner group-hover:border-[#C5A25F]/40 transition-colors">
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    <h3 className="font-montserrat font-bold text-base text-[#F4EBD9] tracking-wide group-hover:text-[#C5A25F] transition-colors">
                      {sponsor.name}
                    </h3>

                    <span className="text-[11px] text-[#0EA5E9] font-mono mt-2 uppercase tracking-widest px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 shadow-sm">
                      {sponsor.category}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Featured sponsor floating panel */}
      <div
        className={`fixed z-50 w-[90%] sm:w-96 p-6 sm:p-8 rounded-3xl bg-[#0A192F]/95 backdrop-blur-2xl border-2 border-[#C5A25F]/60 shadow-[0_10px_40px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 ${
          side === "left"
            ? "md:left-8 md:right-auto"
            : "md:right-8 md:left-auto"
        } ${
          activeSponsor
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!activeSponsor}
      >
        {activeSponsor && (
          <>
            <button
              type="button"
              onClick={() => setActiveSponsor(null)}
              className="md:hidden absolute top-4 right-4 text-[#94A3B8] hover:text-[#F4EBD9] text-sm font-mono p-1 cursor-pointer"
              aria-label="Close sponsor details"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#C5A25F] uppercase border-b border-[#C5A25F]/30 pb-1">
                Featured Partner
              </span>

              <div className="w-full h-36 sm:h-48 bg-[#050B14] p-4 rounded-2xl border border-[#C5A25F]/30 flex items-center justify-center shadow-inner">
                <img
                  src={activeSponsor.image}
                  alt={activeSponsor.name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_4px_12px_rgba(197,162,95,0.3)]"
                />
              </div>

              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F4EBD9]">
                {activeSponsor.name}
              </h2>

              <span className="text-[10px] sm:text-xs text-[#0EA5E9] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0EA5E9]/15 border border-[#0EA5E9]/30">
                {activeSponsor.category}
              </span>

              <p className="font-montserrat text-xs text-[#94A3B8] leading-relaxed">
                Official partner for Renaissance 2026. Empowering innovation
                across fleets.
              </p>
            </div>
          </>
        )}
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
