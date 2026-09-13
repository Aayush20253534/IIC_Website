import { useEffect, useRef, useState } from "react";
import { SPONSOR_TIERS } from "../data/sponsorsData";
import SponsorStream from "../components/SponsorStream";
import ContactFooter from "../components/ContactFooter";
import SocialSideRail from "../components/SocialSideRail";
import ScrollIndicatorRail from "../components/ScrollIndicatorRail";

export default function Sponsors({ embedded = false }) {
  const [activeSponsor, setActiveSponsor] = useState(null);
  const [side, setSide] = useState("left");
  const gridRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current || !activeSponsor) return;
      const rect = gridRef.current.getBoundingClientRect();
      const scrolledAmount = -rect.top;

      if (
        window.innerWidth >= 768 &&
        (scrolledAmount > rect.height * 0.3 || rect.top > window.innerHeight * 0.7)
      ) {
        setActiveSponsor(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSponsor]);

  const handleCardClick = (event, sponsor, index) => {
    event.stopPropagation();
    const isLeftHalf = index % 2 === 0;
    setSide(isLeftHalf ? "right" : "left");
    setActiveSponsor((current) => (current?.name === sponsor.name ? null : sponsor));
  };

  const handleMouseEnter = (sponsor, index) => {
    if (window.innerWidth < 768) return;
    const isLeftHalf = index % 2 === 0;
    setSide(isLeftHalf ? "right" : "left");
    setActiveSponsor(sponsor);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) setActiveSponsor(null);
  };

  return (
    <div className={`${embedded ? "py-16" : "min-h-screen"} bg-transparent text-[#F4EBD9] relative`}>
      {!embedded && (
        <>
          <SocialSideRail />
          <ScrollIndicatorRail />
        </>
      )}

      {/* The entire first viewport is intentionally one continuous scene: no
          glass wrapper, no floating title card, no visual seam through the sea. */}
      <SponsorStream />

      <div id="sponsor-tiers" className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="text-center mb-14">
          <p className="text-[10px] sm:text-xs tracking-[0.38em] uppercase text-[#C5A25F] mb-3">
            The Fleet Behind Renaissance
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-[#F4EBD9]">
            Sponsor Tiers
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C5A25F] to-transparent mx-auto mt-5" />
        </div>

        <div className="space-y-16" ref={gridRef}>
          {SPONSOR_TIERS.map((tier) => (
            <section key={tier.id} className="text-center">
              <h3 className="font-cinzel text-lg sm:text-xl font-semibold tracking-[0.12em] text-[#DDB66F] mb-7">
                {tier.title}
              </h3>

              <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                {tier.sponsors.map((sponsor, sponsorIndex) => (
                  <button
                    key={`${tier.id}-${sponsor.name}-${sponsorIndex}`}
                    type="button"
                    onClick={(event) => handleCardClick(event, sponsor, sponsorIndex)}
                    onMouseEnter={() => handleMouseEnter(sponsor, sponsorIndex)}
                    onMouseLeave={handleMouseLeave}
                    className="group relative p-7 rounded-2xl bg-[#041021]/78 backdrop-blur-xl border border-[#C5A25F]/25 hover:border-[#DDB66F]/70 shadow-[0_18px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_46px_rgba(197,162,95,0.16)] transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer"
                    aria-label={`View ${sponsor.name} details`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#C5A25F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative w-64 sm:w-72 h-36 sm:h-40 bg-[#020812]/80 p-4 rounded-xl flex items-center justify-center mb-5 border border-[#C5A25F]/20 shadow-inner group-hover:border-[#C5A25F]/40 transition-colors">
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    <h4 className="font-montserrat font-bold text-base text-[#F4EBD9] tracking-wide group-hover:text-[#DDB66F] transition-colors">
                      {sponsor.name}
                    </h4>
                    <span className="text-[10px] text-[#9FC4D7] font-mono mt-2 uppercase tracking-[0.16em]">
                      {sponsor.category}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div
        className={`fixed z-50 w-[90%] sm:w-96 p-6 sm:p-8 rounded-3xl bg-[#071422]/96 backdrop-blur-2xl border border-[#C5A25F]/55 shadow-[0_20px_60px_rgba(0,0,0,0.72)] transition-all duration-500 ease-out bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 ${
          side === "left" ? "md:left-8 md:right-auto" : "md:right-8 md:left-auto"
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

            <div className="flex flex-col items-center text-center space-y-4">
              <span className="text-[10px] font-mono tracking-[0.24em] text-[#C5A25F] uppercase border-b border-[#C5A25F]/30 pb-1">
                Featured Partner
              </span>
              <div className="w-full h-40 bg-[#020812] p-4 rounded-2xl border border-[#C5A25F]/25 flex items-center justify-center shadow-inner">
                <img
                  src={activeSponsor.image}
                  alt={activeSponsor.name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_4px_12px_rgba(197,162,95,0.3)]"
                />
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F4EBD9]">
                {activeSponsor.name}
              </h2>
              <span className="text-[10px] text-[#9FC4D7] font-mono uppercase tracking-widest">
                {activeSponsor.category}
              </span>
              <p className="font-montserrat text-xs text-[#94A3B8] leading-relaxed">
                Official partner for Renaissance 2026, sailing with the voyage and powering the experience.
              </p>
            </div>
          </>
        )}
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
