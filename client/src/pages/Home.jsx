import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Wind, ChevronRight, ShieldCheck, UserCheck, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useSmoothScroll } from "../lib/smoothScroll";
import ContactFooter from "../components/ContactFooter";

gsap.registerPlugin(ScrollTrigger, Draggable);

const SPONSORS = [
  { id: "01", name: "Sponsor 01", tier: "Anchor Title Partner", desc: "Deep Sea Oceanography & Autonomous Navigation", image: "/sponsors/sponsor1.png" },
  { id: "02", name: "Sponsor 02", tier: "Voyage Lead Partner", desc: "Algorithmic Navigation & Quantitative Labs", image: "/sponsors/sponsor2.png" },
  { id: "03", name: "Sponsor 03", tier: "Helm Strategic Partner", desc: "Subsea Energy Systems & Power Networks", image: "/sponsors/sponsor3.png" },
  { id: "04", name: "Sponsor 04", tier: "Horizon Capital", desc: "Deepwater Venture Syndicate & Capital", image: "/sponsors/sponsor4.png" },
  { id: "05", name: "Sponsor 05", tier: "Abyss Infrastructure", desc: "High-Frequency Oceanic Fiber Networks", image: "/sponsors/sponsor5.png" },
  { id: "06", name: "Sponsor 06", tier: "Nautical Cloud", desc: "Offshore Cloud & Maritime Supercomputing", image: "/sponsors/sponsor6.png" },
  { id: "07", name: "Sponsor 07", tier: "Compass Robotics", desc: "Unmanned Submersible Fleets & AI Drones", image: "/sponsors/sponsor7.png" },
  { id: "08", name: "Sponsor 08", tier: "Vanguard Marine", desc: "Decentralized Maritime Logistics & Commerce", image: "/sponsors/sponsor8.png" },
];

const SPEAKERS = [
  { id: 1, role: "Keynote Navigator", topic: "Venturing Beyond The Digital Continental Shelf", org: "Deep Mariana Research" },
  { id: 2, role: "Expedition Captain", topic: "Autonomous Fleets & High-Seas Venture Architecture", org: "Oceanic AI Labs" },
  { id: 3, role: "Chief Cartographer", topic: "Mapping Decentralized Liquidity in Uncharted Waters", org: "Abyss Capital" },
  { id: 4, role: "Voyage Engineer", topic: "Next-Gen Propulsion Systems for Deep-Tech Horizons", org: "Vanguard Marine Labs" },
];

export default function Home() {
  const [activeSponsorIdx, setActiveSponsorIdx] = useState(0);
  const smoothScroll = useSmoothScroll();

  const heroSectionRef = useRef(null);
  const sponsorsSectionRef = useRef(null);
  const transitionWrapperRef = useRef(null);
  const wheelContainerRef = useRef(null);
  const wheelImgRef = useRef(null);
  const sponsorsHeaderRef = useRef(null);
  const sponsorCardRef = useRef(null);
  const sponsorsFooterRef = useRef(null);
  const aboutTextRef = useRef(null);
  const speakersPanelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // Section 2: Rapid Entrance Reveal & Fluid Locked Sponsors
      // -------------------------------------------------------------
      if (sponsorsSectionRef.current) {
        const totalSteps = SPONSORS.length;

        // 1. Entrance Trigger (Reveals elements smoothly as section reaches viewport)
        const entranceTargets = [
          sponsorsHeaderRef.current,
          wheelContainerRef.current,
          sponsorCardRef.current,
          sponsorsFooterRef.current,
        ].filter(Boolean);

        if (entranceTargets.length > 0) {
          gsap.fromTo(
            entranceTargets,
            { opacity: 0, y: 20, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.04,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sponsorsSectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 2. Pinned ScrollTrigger (Locks full screen & holds on Sponsor 01 before stepping)
        ScrollTrigger.create({
          trigger: sponsorsSectionRef.current,
          start: "top top",
          end: `+=${totalSteps * 320}`,
          pin: true,
          scrub: 0.5, // Crisp & responsive momentum scrubbing
          onUpdate: (self) => {
            const rawProgress = self.progress;

            // Rotate transparent pirate wheel smoothly
            if (wheelImgRef.current) {
              gsap.set(wheelImgRef.current, {
                rotation: rawProgress * 360 * 2.0,
              });
            }

            // Hold Sponsor 01 for the initial 15% of pinned scroll distance
            const holdThreshold = 0.15;
            let normalizedProgress = 0;
            if (rawProgress > holdThreshold) {
              normalizedProgress = (rawProgress - holdThreshold) / (1 - holdThreshold);
            }

            const newIdx = Math.min(
              totalSteps - 1,
              Math.floor(normalizedProgress * totalSteps)
            );

            setActiveSponsorIdx((prev) => {
              if (prev !== newIdx) {
                if (sponsorCardRef.current) {
                  gsap.fromTo(
                    sponsorCardRef.current,
                    { filter: "blur(10px)", opacity: 0.5, scale: 0.97 },
                    { filter: "blur(0px)", opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }
                  );
                }
                return newIdx;
              }
              return prev;
            });
          },
        });
      }

      // -------------------------------------------------------------
      // Section 3 (About) & Section 4 (Speakers Abyss Slide-up)
      // -------------------------------------------------------------
      if (transitionWrapperRef.current && speakersPanelRef.current) {
        const transitionTl = gsap.timeline({
          scrollTrigger: {
            trigger: transitionWrapperRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          },
        });

        if (aboutTextRef.current) {
          transitionTl.fromTo(
            aboutTextRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
        }

        transitionTl.fromTo(
          speakersPanelRef.current,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.6, ease: "power2.inOut" }
        );
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const activeSponsor = SPONSORS[activeSponsorIdx];

  return (
    <div className="relative z-10 w-full text-white selection:bg-[#38BDF8] selection:text-[#020610]">
      {/* ============================================================ */}
      {/* SECTION 1: HERO (100vh) - PERFECTLY CENTERED LOGO & CTAs    */}
      {/* ============================================================ */}
      <section
        ref={heroSectionRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center overflow-visible mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto overflow-visible my-auto">
          {/* Centered Transparent Emblem Logo */}
          <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mb-8 flex items-center justify-center overflow-visible">
            <img
              src="/renaissance-logo-clean.png"
              alt="Renaissance 10th Edition Emblem"
              onError={(e) => {
                e.currentTarget.src = "/renaissance-logo-transparent.png";
              }}
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_30px_rgba(56,189,248,0.35)] select-none pointer-events-none transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.32em] text-[#38BDF8]/90 mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Venture Beyond Known • 10th Edition
          </p>

          {/* Action CTAs: Register Now + Begin Voyage */}
          <div className="overflow-visible flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Primary Register Now CTA */}
            <Link
              to="/register"
              className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#38BDF8] via-sky-400 to-[#38BDF8] text-[#020610] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all duration-300 transform hover:scale-[1.03] overflow-visible cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#020610] overflow-visible" />
              <span>Register Now</span>
            </Link>

            {/* Begin Voyage CTA */}
            <a
              href="#sponsors"
              onClick={(e) => {
                e.preventDefault();
                if (smoothScroll?.scrollTo && sponsorsSectionRef.current) {
                  smoothScroll.scrollTo(sponsorsSectionRef.current, { duration: 1.2 });
                } else {
                  sponsorsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group relative flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-[#38BDF8]/40 bg-[#040e1d]/75 backdrop-blur-md text-[#CBD5E1] hover:text-white hover:border-[#38BDF8] hover:bg-[#040e1d]/90 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] overflow-visible cursor-pointer"
            >
              <div className="overflow-visible flex items-center justify-center">
                <Navigation className="w-4 h-4 text-[#38BDF8] transform -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 overflow-visible" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase">
                Begin Voyage
              </span>
              <div className="overflow-visible flex items-center justify-center">
                <Wind className="w-3.5 h-3.5 text-[#38BDF8]/80 group-hover:text-[#38BDF8] transition-colors overflow-visible" />
              </div>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#38BDF8]/70 text-xs font-mono overflow-visible">
          <span className="tracking-widest uppercase text-[10px]">Scroll To Navigate</span>
          <div className="w-4 h-7 border border-[#38BDF8]/40 rounded-full flex items-start justify-center p-1 overflow-visible">
            <div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: SPONSORS (LEFT WHEEL | RIGHT SPONSOR SHOWCASE)    */}
      {/* ============================================================ */}
      <section
        id="sponsors"
        ref={sponsorsSectionRef}
        className="relative w-full h-screen bg-[#020610]/95 border-y border-[#38BDF8]/20 flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-6 sm:px-12 overflow-hidden select-none"
      >
        {/* Giant Rotating Nautical Wheel (Anchored to exact left boundary: 50% on screen, 50% off screen) */}
        <div
          ref={wheelContainerRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[100vh] h-[100vh] sm:w-[105vh] sm:h-[105vh] pointer-events-none z-10 flex items-center justify-center overflow-visible"
        >
          {/* Cyan Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none" />

          {/* Transparent Pirate Wheel Image */}
          <img
            ref={wheelImgRef}
            src="/pirate-wheel-transparent.png"
            alt="Nautical Wheel"
            className="w-full h-full object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] drop-shadow-[0_0_50px_rgba(56,189,248,0.4)] select-none pointer-events-none will-change-transform overflow-visible"
          />
        </div>

        {/* Right Half Container: Section Header & Showcase Card (100% Readable, Zero Overlap with Wheel) */}
        <div className="max-w-7xl w-full mx-auto flex flex-col items-end justify-center my-auto relative z-20">
          <div className="w-full max-w-lg sm:max-w-xl ml-auto flex flex-col gap-4">

            {/* Clean Section Header (Right Aligned above Card) */}
            <div
              ref={sponsorsHeaderRef}
              className="w-full flex items-end justify-between pb-1"
            >
              <div>
                <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-[0.25em] font-semibold">
                  Summit Partners
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Expedition Sponsors
                </h2>
              </div>

              <div className="flex items-center gap-2 bg-[#030914]/90 px-3.5 py-1.5 rounded-xl border border-white/10 font-mono text-xs shadow-lg">
                <span className="text-[#94A3B8]">Partner:</span>
                <span className="text-[#38BDF8] font-bold text-sm">
                  {String(activeSponsorIdx + 1).padStart(2, "0")} / 08
                </span>
              </div>
            </div>

            {/* Showcase Card with '?' Placeholder Image */}
            <div
              ref={sponsorCardRef}
              className="w-full p-6 sm:p-8 rounded-3xl border border-[#38BDF8]/40 bg-[#040f21]/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] shadow-[0_0_40px_rgba(56,189,248,0.2)] flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="w-full flex items-center justify-between pb-3.5 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-[#38BDF8] tracking-widest uppercase">
                  PARTNER {activeSponsor.id} / 08
                </span>
                <span className="text-xs font-mono px-3.5 py-1 rounded-full border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8] uppercase tracking-wider font-semibold">
                  {activeSponsor.tier}
                </span>
              </div>

              {/* Inner Dark Showcase Container with Mystery '?' Image Badge */}
              <div className="w-full my-5 p-5 sm:p-6 bg-[#020610] rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left shadow-inner relative group min-h-[190px]">
                {/* '?' Placeholder Image Frame */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border border-[#38BDF8]/40 bg-gradient-to-b from-[#04152e] via-[#020914] to-[#020610] flex flex-col items-center justify-center shrink-0 shadow-[0_0_25px_rgba(56,189,248,0.25)] overflow-hidden">
                  {/* Background Grid Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:10px_10px] opacity-20 pointer-events-none" />
                  
                  {/* Giant Glowing Question Mark */}
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#38BDF8] drop-shadow-[0_0_15px_rgba(56,189,248,0.9)] z-10 font-mono">
                    ?
                  </span>

                  <span className="text-[9px] font-mono text-[#38BDF8]/80 uppercase tracking-widest mt-1 z-10 font-bold">
                    REVEAL SOON
                  </span>
                </div>

                {/* Details Next to Image */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    {activeSponsor.name}
                  </h3>

                  <span className="text-xs font-mono text-[#38BDF8] mt-1 font-semibold tracking-wider">
                    Official Summit Partner
                  </span>

                  <p className="text-xs text-[#94A3B8] font-mono mt-2 leading-relaxed max-w-xs">
                    {activeSponsor.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Card Bar */}
              <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#94A3B8]">Renaissance 10th Edition</span>
                <span className="text-[#38BDF8] font-bold">Partner Showcase</span>
              </div>
            </div>

          </div>
        </div>

        {/* Clean Bottom Status Bar */}
        <div
          ref={sponsorsFooterRef}
          className="max-w-7xl w-full mx-auto flex items-center justify-between text-xs font-mono text-[#64748B] relative z-20"
        >
          <span className="text-[#38BDF8]/80">Scroll to explore summit partners</span>
          <span className="hidden sm:inline text-[#64748B]">10th Edition Summit</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRANSITION WRAPPER: SECTION 3 (ABOUT) & SECTION 4 (SPEAKERS) */}
      {/* ============================================================ */}
      <div
        ref={transitionWrapperRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Section 3: About Renaissance */}
        <section className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 text-center z-10 bg-transparent">
          <div
            ref={aboutTextRef}
            className="max-w-3xl mx-auto flex flex-col items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/30 bg-[#040e1d]/80 text-[#38BDF8] text-xs font-mono mb-6 uppercase tracking-widest">
              <Wind className="w-3.5 h-3.5" />
              <span>The Odyssey • Genesis</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-sky-200 to-white">
                Renaissance
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed font-light mb-6">
              Renaissance is the flagship annual entrepreneurship summit of MNNIT Allahabad. Over a decade of voyages, it has served as the launchpad for visionary founders, researchers, and creators charting uncharted waters in deep technology, decentralized systems, and high-impact enterprise.
            </p>

            <p className="text-xs sm:text-sm text-[#38BDF8]/80 font-mono tracking-widest uppercase">
              Keep scrolling to descend into the abyss of our keynote voyagers ↓
            </p>
          </div>
        </section>

        {/* Section 4: Speakers Transition (Sliding up from the Abyss) */}
        <section
          ref={speakersPanelRef}
          className="absolute inset-0 w-full h-full bg-[#020610]/95 backdrop-blur-2xl border-t-2 border-[#38BDF8]/40 flex flex-col items-center justify-center px-6 z-20"
        >
          <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#040e1d]/80 text-[#38BDF8] text-xs font-mono mb-3 uppercase tracking-widest">
                <Navigation className="w-3.5 h-3.5 -rotate-45" />
                <span>Eminent Voyagers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Keynote Speakers
              </h2>
              <p className="text-xs sm:text-sm font-mono text-[#38BDF8]/70 mt-2">
                Voices emerging from the deepest depths of the ocean
              </p>
            </div>

            {/* Silhouette Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {SPEAKERS.map((speaker) => (
                <div
                  key={speaker.id}
                  className="group relative rounded-2xl border border-white/10 bg-[#040f21]/70 p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-[#38BDF8]/60 hover:bg-[#05142b]/90 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                >
                  {/* Generic Silhouette Placeholder */}
                  <div className="relative w-24 h-24 rounded-full border border-[#38BDF8]/30 bg-[#030914] flex items-center justify-center mb-5 overflow-hidden group-hover:border-[#38BDF8] transition-colors shadow-inner">
                    <svg
                      className="w-16 h-16 text-[#38BDF8]/40 group-hover:text-[#38BDF8]/80 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020610]/90 to-transparent pointer-events-none" />
                  </div>

                  <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-widest mb-1">
                    {speaker.org}
                  </span>
                  <h3 className="text-base font-semibold text-white group-hover:text-[#38BDF8] transition-colors mb-2">
                    {speaker.role}
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                    {speaker.topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Global Summit Footer */}
      <ContactFooter />
    </div>
  );
}
