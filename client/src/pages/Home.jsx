import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Navigation,
  Wind,
  ShieldCheck,
  UserCheck,
  Clock,
  Compass,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useSmoothScroll } from "../lib/smoothScroll";
import ContactFooter from "../components/ContactFooter";

gsap.registerPlugin(ScrollTrigger, Draggable);

const EVENTS = [
  {
    id: "01",
    name: "Deep Sea Coding",
    category: "Flagship 36-Hour Sprint",
    time: "10:00 AM • Day 1",
    desc: "Build autonomous subsea systems, AI agents, and deep-tech prototypes in a 36-hour continuous build sprint.",
    prize: "₹2,50,000 Pool",
  },
  {
    id: "02",
    name: "Pitchers 10.0",
    category: "Venture Capital Arena",
    time: "02:00 PM • Day 1",
    desc: "Present your high-impact startup to top syndicate investors, angel funds, and tier-1 venture cartographers.",
    prize: "₹5,00,000 Pool",
  },
  {
    id: "03",
    name: "Case Odyssey",
    category: "Corporate Strategy Battle",
    time: "10:00 AM • Day 2",
    desc: "Solve high-stakes strategic challenges and market disruption problems presented by global corporate leaders.",
    prize: "₹1,50,000 Pool",
  },
];

const CURRENT_SPONSORS = [
  { name: "Google Cloud", tier: "Title Partner" },
  { name: "Mariana Labs", tier: "Powered By" },
  { name: "Horizon Capital", tier: "Venture Partner" },
  { name: "Vanguard Tech", tier: "Tech Partner" },
  { name: "Abyss Systems", tier: "Infrastructure" },
  { name: "Nautical AI", tier: "Innovation Partner" },
];

const PAST_SPONSORS = [
  { name: "Microsoft", tier: "Past Partner" },
  { name: "AWS", tier: "Past Sponsor" },
  { name: "Polygon", tier: "Past Sponsor" },
  { name: "Sequoia", tier: "Past Partner" },
  { name: "Intel", tier: "Past Sponsor" },
  { name: "Cisco", tier: "Past Partner" },
];

const SPEAKERS = [
  { id: 1, role: "Keynote Navigator", topic: "Venturing Beyond The Digital Continental Shelf", org: "Deep Mariana Research" },
  { id: 2, role: "Expedition Captain", topic: "Autonomous Fleets & High-Seas Venture Architecture", org: "Oceanic AI Labs" },
  { id: 3, role: "Chief Cartographer", topic: "Mapping Decentralized Liquidity in Uncharted Waters", org: "Abyss Capital" },
  { id: 4, role: "Voyage Engineer", topic: "Next-Gen Propulsion Systems for Deep-Tech Horizons", org: "Vanguard Marine Labs" },
];

export default function Home() {
  const smoothScroll = useSmoothScroll();

  const heroSectionRef = useRef(null);
  const sponsorsSectionRef = useRef(null);
  const transitionWrapperRef = useRef(null);
  const wheelContainerRef = useRef(null);
  const wheelImgRef = useRef(null);
  const sponsorsHeaderRef = useRef(null);
  const cardsRef = useRef([]);
  const sponsorsFooterRef = useRef(null);
  const aboutTextRef = useRef(null);
  const speakersPanelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // Section 2: Flagship Events Single Chained GSAP Timeline
      // -------------------------------------------------------------
      if (sponsorsSectionRef.current) {
        // Entrance Trigger for Section Elements
        const entranceTargets = [
          sponsorsHeaderRef.current,
          wheelContainerRef.current,
          sponsorsFooterRef.current,
        ].filter(Boolean);

        if (entranceTargets.length > 0) {
          gsap.fromTo(
            entranceTargets,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
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

        // Single Pinned GSAP Timeline for Right-Side Stacked Events
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sponsorsSectionRef.current,
            start: "top top",
            end: "+=3500",
            pin: true,
            scrub: 0.5,
          },
        });

        // 1. Scrub Left Wheel Rotation independently on the main timeline
        if (wheelImgRef.current) {
          mainTl.to(
            wheelImgRef.current,
            { rotation: 720, ease: "none" },
            0
          );
        }

        // 2. Loop through Card DOM References and Chain Animations Sequentially
        cardsRef.current.forEach((cardNode, idx) => {
          if (!cardNode) return;

          const detailsNode = cardNode.querySelector(".event-details-body");

          // Step 1: Card comes into view (fade in & scale 0.85 -> 1.0)
          mainTl.fromTo(
            cardNode,
            { opacity: 0, scale: 0.85, filter: "blur(10px)", pointerEvents: "none" },
            { opacity: 1, scale: 1.0, filter: "blur(0px)", pointerEvents: "auto", duration: 1, ease: "power2.out" }
          );

          // Step 2: Card zooms in (scale 1.0 -> 1.08) while detailed info fades in
          mainTl.to(cardNode, { scale: 1.08, duration: 1.2, ease: "none" }, "<");
          if (detailsNode) {
            mainTl.fromTo(
              detailsNode,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              "<+=0.3"
            );
          }

          // Step 3: Card fades out & scales up (1.08 -> 1.15) to reveal next event (if not last)
          if (idx < EVENTS.length - 1) {
            mainTl.to(cardNode, {
              opacity: 0,
              scale: 1.15,
              filter: "blur(8px)",
              pointerEvents: "none",
              duration: 0.8,
              ease: "power2.in",
            });
          }
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
            <Link
              to="/register"
              className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#38BDF8] via-sky-400 to-[#38BDF8] text-[#020610] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all duration-300 transform hover:scale-[1.03] overflow-visible cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#020610] overflow-visible" />
              <span>Register Now</span>
            </Link>

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
                Explore Events
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
      {/* SECTION 2: FLAGSHIP EVENTS WHEEL (RIGHT SIDE STACKED CARDS)  */}
      {/* ============================================================ */}
      <section
        id="sponsors"
        ref={sponsorsSectionRef}
        className="relative w-full h-screen bg-[#020610]/95 border-y border-[#38BDF8]/20 flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-6 sm:px-12 overflow-hidden select-none"
      >
        {/* Dynamic Mariana Blue Gaussian Blur Aura */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#0284C7]/25 rounded-full blur-[100px] pointer-events-none animate-pulse" />

        {/* Giant Rotating Nautical Wheel (Anchored to exact left boundary) */}
        <div
          ref={wheelContainerRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[100vh] h-[100vh] sm:w-[105vh] sm:h-[105vh] pointer-events-none z-10 flex items-center justify-center overflow-visible"
        >
          {/* Cyan Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-[#38BDF8]/20 blur-3xl pointer-events-none" />

          {/* Clean Transparent Pirate Wheel Image */}
          <img
            ref={wheelImgRef}
            src="/pirate-wheel-transparent.png"
            alt="Nautical Wheel"
            className="w-full h-full object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] drop-shadow-[0_0_50px_rgba(56,189,248,0.45)] select-none pointer-events-none will-change-transform overflow-visible"
          />
        </div>

        {/* Right Half Container: Section Header & Stacked Absolute Cards */}
        <div className="max-w-7xl w-full mx-auto flex flex-col items-end justify-center my-auto relative z-20">
          <div className="w-full max-w-lg sm:max-w-xl ml-auto flex flex-col gap-4">

            {/* Clean Section Header (Right Aligned) */}
            <div
              ref={sponsorsHeaderRef}
              className="w-full flex items-end justify-between pb-2 border-b border-white/10"
            >
              <div>
                <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Summit Flagships</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Featured Events
                </h2>
              </div>
            </div>

            {/* Stacked Absolute Cards Container */}
            <div className="relative w-full h-[420px] sm:h-[450px]">
              {EVENTS.map((event, idx) => (
                <div
                  key={event.id}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="absolute inset-0 w-full h-full p-6 sm:p-8 rounded-3xl border border-[#38BDF8]/40 bg-[#040f21]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] shadow-[0_0_40px_rgba(56,189,248,0.25)] flex flex-col justify-between overflow-hidden will-change-transform"
                >
                  {/* Card Header: Event ID & Category */}
                  <div className="w-full flex items-center justify-between pb-3.5 border-b border-white/10">
                    <span className="text-xs font-mono font-bold text-[#38BDF8] tracking-widest uppercase">
                      EVENT {event.id} / 03
                    </span>
                    <span className="text-xs font-mono px-3.5 py-1 rounded-full border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8] uppercase tracking-wider font-semibold">
                      {event.category}
                    </span>
                  </div>

                  {/* Title & Mystery '?' Showcase Badge */}
                  <div className="event-title-badge w-full my-2 p-5 sm:p-6 bg-[#020610] rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-6 shadow-inner">
                    {/* Mystery '?' Image Frame */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-[#38BDF8]/50 bg-gradient-to-b from-[#04152e] via-[#020914] to-[#020610] flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.3)] overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:10px_10px] opacity-20 pointer-events-none" />
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#38BDF8] drop-shadow-[0_0_12px_rgba(56,189,248,0.9)] z-10 font-mono">
                        ?
                      </span>
                      <span className="text-[8px] font-mono text-[#38BDF8]/80 uppercase tracking-widest mt-0.5 z-10 font-bold">
                        FLAGSHIP
                      </span>
                    </div>

                    {/* Event Name & Prize */}
                    <div className="flex flex-col text-center sm:text-left">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                        {event.name}
                      </h3>
                      <span className="text-xs font-mono text-[#38BDF8] font-bold tracking-wider mt-1">
                        {event.prize}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Info Body (Fades in on Zoom) */}
                  <div className="event-details-body w-full flex flex-col gap-3">
                    {/* Time & Schedule Badge */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] font-semibold bg-[#020610] px-3.5 py-1.5 rounded-xl border border-white/10 w-fit">
                      <Clock className="w-4 h-4 text-[#38BDF8]" />
                      <span>{event.time}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#CBD5E1] font-mono leading-relaxed line-clamp-2">
                      {event.desc}
                    </p>

                    {/* Action Bar with 'Register' CTA Button */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <Link
                        to="/register"
                        className="group relative flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#38BDF8] via-sky-400 to-[#38BDF8] text-[#020610] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all duration-300 transform hover:scale-[1.03] cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4 text-[#020610]" />
                        <span>Register Now</span>
                      </Link>

                      <Link to="/events" className="text-xs font-mono text-[#38BDF8] font-bold hover:underline">
                        View Schedule →
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Clean Bottom Status Bar */}
        <div
          ref={sponsorsFooterRef}
          className="max-w-7xl w-full mx-auto flex items-center justify-between text-xs font-mono text-[#64748B] relative z-20"
        >
          <span className="text-[#38BDF8]/80">Scroll to explore flagship summit events</span>
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
        {/* Section 3: About Renaissance (HIGH CONTRAST GLASS CARD CONTAINER) */}
        <section className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 text-center z-10 bg-transparent">
          <div
            ref={aboutTextRef}
            className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl border border-[#38BDF8]/40 bg-[#040f21]/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] shadow-[0_0_40px_rgba(56,189,248,0.25)] flex flex-col items-center justify-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/40 bg-[#040e1d]/90 text-[#38BDF8] text-xs font-mono mb-6 uppercase tracking-widest shadow-md">
              <Wind className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>The Odyssey • Genesis</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-sky-300 to-white">
                Renaissance
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal mb-6 max-w-2xl">
              Renaissance is the flagship annual entrepreneurship summit of MNNIT Allahabad. Over a decade of voyages, it has served as the launchpad for visionary founders, researchers, and creators charting uncharted waters in deep technology, decentralized systems, and high-impact enterprise.
            </p>

            <div className="pt-4 border-t border-white/10 w-full flex items-center justify-center">
              <p className="text-xs text-[#38BDF8] font-mono tracking-widest uppercase font-semibold">
                Keep scrolling to descend into the abyss of our keynote voyagers ↓
              </p>
            </div>
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
                  <div className="relative w-24 h-24 rounded-full border border-[#38BDF8]/30 bg-[#030914] flex items-center justify-center mb-5 overflow-hidden group-hover:border-[#38BDF8] transition-colors shadow-inner">
                    <svg
                      className="w-16 h-16 text-[#38BDF8]/40 group-hover:text-[#38BDF8]/80 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
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

      {/* ============================================================ */}
      {/* SECTION 5: SPONSORS (DEDICATED QUICK HORIZONTAL TICKER)       */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#020610] border-t border-[#38BDF8]/20 py-16 px-6 overflow-hidden select-none z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#0284C7]/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

        <div className="max-w-7xl mx-auto flex flex-col items-center mb-10 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#38BDF8]/30 bg-[#040e1d]/90 text-[#38BDF8] text-[11px] font-mono uppercase tracking-widest mb-2 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Summit Strategic Partners</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Current & Past Sponsors
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] mt-1">
            Industry leaders & legacy partners empowering our 10-year odyssey
          </p>
        </div>

        {/* Row 1: Current Sponsors */}
        <div className="w-full overflow-hidden mb-6 relative z-10">
          <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-full">
            {[...CURRENT_SPONSORS, ...CURRENT_SPONSORS, ...CURRENT_SPONSORS].map((sponsor, idx) => (
              <div
                key={`curr-${idx}`}
                className="inline-flex items-center gap-4 px-6 py-3.5 rounded-2xl border border-[#38BDF8]/40 bg-[#040f21]/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)] shadow-[0_0_15px_rgba(56,189,248,0.15)] group hover:border-[#38BDF8] transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl border border-[#38BDF8]/30 bg-[#020610] flex items-center justify-center font-mono font-bold text-[#38BDF8] text-sm group-hover:scale-110 transition-transform">
                  ★
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-extrabold text-white group-hover:text-[#38BDF8] transition-colors">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#38BDF8]/80 uppercase tracking-wider font-semibold">
                    {sponsor.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Past Sponsors */}
        <div className="w-full overflow-hidden relative z-10">
          <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap min-w-full">
            {[...PAST_SPONSORS, ...PAST_SPONSORS, ...PAST_SPONSORS].map((sponsor, idx) => (
              <div
                key={`past-${idx}`}
                className="inline-flex items-center gap-4 px-6 py-3.5 rounded-2xl border border-white/10 bg-[#030a17]/80 backdrop-blur-md shadow-md group hover:border-[#38BDF8]/50 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl border border-white/10 bg-[#020610] flex items-center justify-center font-mono font-bold text-[#94A3B8] text-sm group-hover:text-[#38BDF8] transition-colors">
                  ✦
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-[#CBD5E1] group-hover:text-white transition-colors">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider font-semibold">
                    {sponsor.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Summit Footer */}
      <ContactFooter />
    </div>
  );
}
