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
  const wheelContainerRef = useRef(null);
  const wheelImgRef = useRef(null);
  const sponsorsHeaderRef = useRef(null);
  const visualsRef = useRef([]);
  const detailsRef = useRef([]);
  const sponsorsFooterRef = useRef(null);

  // Sponsors Section Refs
  const sponsorsPinnedSectionRef = useRef(null);
  const sponsorsCyanAuraRef = useRef(null);
  const sponsorsRow1Ref = useRef(null);
  const sponsorsRow2Ref = useRef(null);

  // About Section Refs
  const aboutSectionRef = useRef(null);
  const aboutAuraRef = useRef(null);
  const aboutBadgeRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutDescRef = useRef(null);
  const aboutCtaRef = useRef(null);

  const speakersSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // Section 2: Flagship Events 3-Phase Chained GSAP Timeline
      // -------------------------------------------------------------
      if (sponsorsSectionRef.current) {
        // Entrance Animation for Static Section Elements
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

        // Dedicated Continuous Scrubbed Rotation for Pirate Wheel
        if (wheelImgRef.current) {
          gsap.set(wheelImgRef.current, { transformOrigin: "50% 50%" });
          gsap.to(wheelImgRef.current, {
            rotation: 1440,
            ease: "none",
            scrollTrigger: {
              trigger: sponsorsSectionRef.current,
              start: "top top",
              end: "+=7000",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        // Single Pinned GSAP Timeline with 7000px distance for Event Cards
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sponsorsSectionRef.current,
            start: "top top",
            end: "+=7000",
            pin: true,
            scrub: 1,
          },
        });

        // Loop through Event Visuals & Floating Details Panels
        EVENTS.forEach((_, idx) => {
          const visualEl = visualsRef.current[idx];
          const detailsEl = detailsRef.current[idx];
          if (!visualEl || !detailsEl) return;

          // PHASE 1: Event Visual Fades In & Zooms In
          mainTl.fromTo(
            visualEl,
            { opacity: 0, scale: 0.8, filter: "blur(12px)", pointerEvents: "none" },
            { opacity: 1, scale: 1.0, filter: "blur(0px)", pointerEvents: "auto", duration: 1.5, ease: "power2.out" }
          );

          // PHASE 2: Floating Sapphire Details Panel Slides Up (Reveals AFTER Visual zoom)
          mainTl.fromTo(
            detailsEl,
            { opacity: 0, y: 50, scale: 0.92, pointerEvents: "none" },
            { opacity: 1, y: 0, scale: 1.0, pointerEvents: "auto", duration: 1.2, ease: "power2.out" },
            "-=0.6"
          );

          // Pinned Hold Interval so the event stays on screen comfortably while scrolling
          mainTl.to([visualEl, detailsEl], { opacity: 1, duration: 2.2 });

          // PHASE 3: Exit - Visual and Details fade out for next event
          if (idx < EVENTS.length - 1) {
            mainTl.to(
              [visualEl, detailsEl],
              {
                opacity: 0,
                scale: 1.1,
                y: -30,
                filter: "blur(10px)",
                pointerEvents: "none",
                duration: 1.2,
                ease: "power2.in",
              }
            );
          }
        });
      }

      // -------------------------------------------------------------
      // Section 3: Sponsors Pinned Cartographer Vault (Ultra-Smooth In & Out)
      // -------------------------------------------------------------
      if (sponsorsPinnedSectionRef.current) {
        const sponsorsTl = gsap.timeline({
          scrollTrigger: {
            trigger: sponsorsPinnedSectionRef.current,
            start: "top top",
            end: "+=4500",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. ANIMATE IN: Header & Sponsor Rows fade in, zoom, and slide up into view
        const animateInTargets = [
          sponsorsHeaderRef.current,
          sponsorsRow1Ref.current,
          sponsorsRow2Ref.current,
        ].filter(Boolean);

        if (animateInTargets.length > 0) {
          sponsorsTl.fromTo(
            animateInTargets,
            { opacity: 0, y: 70, scale: 0.88, filter: "blur(12px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 2, stagger: 0.25, ease: "power2.out" },
            0
          );
        }

        if (sponsorsCyanAuraRef.current) {
          sponsorsTl.fromTo(
            sponsorsCyanAuraRef.current,
            { scale: 0.4, opacity: 0.1 },
            { scale: 1.6, opacity: 0.95, duration: 8, ease: "none" },
            0
          );
        }

        // 2. DUAL MARQUEE SWEEPS: Row 1 moves Right-to-Left, Row 2 moves Left-to-Right
        if (sponsorsRow1Ref.current) {
          sponsorsTl.fromTo(
            sponsorsRow1Ref.current,
            { xPercent: 0 },
            { xPercent: -65, duration: 5, ease: "none" },
            1.5
          );
        }

        if (sponsorsRow2Ref.current) {
          sponsorsTl.fromTo(
            sponsorsRow2Ref.current,
            { xPercent: -65 },
            { xPercent: 0, duration: 5, ease: "none" },
            1.5
          );
        }

        // 3. ANIMATE OUT: Header & Sponsor Rows fade out and scale down to clear stage for About section
        if (animateInTargets.length > 0) {
          sponsorsTl.to(
            animateInTargets,
            { opacity: 0, y: -60, scale: 0.92, filter: "blur(10px)", duration: 2, ease: "power2.inOut" },
            6.5
          );
        }
      }

      // -------------------------------------------------------------
      // Section 4: About Renaissance (Pinned Parallax Scroll Animation)
      // -------------------------------------------------------------
      if (aboutSectionRef.current) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top top",
            end: "+=2500",
            pin: true,
            scrub: 1,
          },
        });

        // 1. Deep Ocean Glow Aura Expands with scroll
        if (aboutAuraRef.current) {
          aboutTl.fromTo(
            aboutAuraRef.current,
            { scale: 0.6, opacity: 0.2 },
            { scale: 1.6, opacity: 0.85, ease: "none" },
            0
          );
        }

        // 2. Badge slides down & fades in
        if (aboutBadgeRef.current) {
          aboutTl.fromTo(
            aboutBadgeRef.current,
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0
          );
        }

        // 3. Giant "About Renaissance" Title zooms in with cyan glow & blur reveal
        if (aboutTitleRef.current) {
          aboutTl.fromTo(
            aboutTitleRef.current,
            { opacity: 0, scale: 0.5, filter: "blur(20px)" },
            { opacity: 1, scale: 1.15, filter: "blur(0px)", ease: "power2.out" },
            0.15
          );
        }

        // 4. Detailed Description text floats up with high contrast
        if (aboutDescRef.current) {
          aboutTl.fromTo(
            aboutDescRef.current,
            { opacity: 0, y: 80, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1.0, ease: "power2.out" },
            0.35
          );
        }

        // 5. Scroll CTA prompt slides in
        if (aboutCtaRef.current) {
          aboutTl.fromTo(
            aboutCtaRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.55
          );
        }
      }

      // -------------------------------------------------------------
      // Section 5: Keynote Speakers (Pinned 2-Top 2-Bottom Sequential Showcase)
      // -------------------------------------------------------------
      if (speakersSectionRef.current) {
        const speakersHeaderEl = speakersSectionRef.current.querySelector(".speakers-header");
        const topCardEls = speakersSectionRef.current.querySelectorAll(".speaker-card-top");
        const bottomCardEls = speakersSectionRef.current.querySelectorAll(".speaker-card-bottom");

        const speakersTl = gsap.timeline({
          scrollTrigger: {
            trigger: speakersSectionRef.current,
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Phase 1: Header & Top 2 Speaker Cards animate in
        if (speakersHeaderEl) {
          speakersTl.fromTo(
            speakersHeaderEl,
            { opacity: 0, y: -30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" },
            0
          );
        }

        if (topCardEls.length > 0) {
          speakersTl.fromTo(
            topCardEls,
            { opacity: 0, y: 50, scale: 0.88, filter: "blur(10px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.2, ease: "power2.out" },
            0.4
          );
        }

        // 2. Phase 2: Bottom 2 Speaker Cards animate in right below
        if (bottomCardEls.length > 0) {
          speakersTl.fromTo(
            bottomCardEls,
            { opacity: 0, y: 50, scale: 0.88, filter: "blur(10px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.2, ease: "power2.out" },
            1.5
          );
        }

        // 3. Phase 3: Hold phase - all 4 cards remain 100% visible on screen
        speakersTl.to([...topCardEls, ...bottomCardEls], { opacity: 1, duration: 2.5 });
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
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_35px_rgba(56,189,248,0.5)] select-none pointer-events-none transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.32em] text-sky-300 font-bold mb-8 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]">
            Venture Beyond Known • 10th Edition
          </p>

          {/* Action CTAs: Register Now + Begin Voyage */}
          <div className="overflow-visible flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/register"
              className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 text-[#020610] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] transition-all duration-300 transform hover:scale-[1.03] overflow-visible cursor-pointer"
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
              className="group relative flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-sky-300/60 bg-sky-950/70 backdrop-blur-md text-white hover:text-sky-200 hover:border-sky-300 hover:bg-sky-900/80 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] overflow-visible cursor-pointer"
            >
              <div className="overflow-visible flex items-center justify-center">
                <Navigation className="w-4 h-4 text-sky-300 transform -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 overflow-visible" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase">
                Explore Events
              </span>
              <div className="overflow-visible flex items-center justify-center">
                <Wind className="w-3.5 h-3.5 text-sky-300 group-hover:text-white transition-colors overflow-visible" />
              </div>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sky-300 text-xs font-mono overflow-visible">
          <span className="tracking-widest uppercase text-[10px]">Scroll To Navigate</span>
          <div className="w-4 h-7 border border-sky-300/50 rounded-full flex items-start justify-center p-1 overflow-visible">
            <div className="w-1.5 h-1.5 bg-sky-300 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: FLAGSHIP EVENTS WHEEL (LIGHT BLUE GLASSMorphism)  */}
      {/* ============================================================ */}
      <section
        id="sponsors"
        ref={sponsorsSectionRef}
        className="relative w-full h-screen bg-gradient-to-b from-[#031528]/90 via-[#072545]/85 to-[#031528]/90 backdrop-blur-3xl border-y border-sky-300/30 flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-6 sm:px-12 overflow-hidden select-none"
      >
        {/* Dynamic Light Sky Blue & Cyan Gaussian Blur Aura */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-400/30 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-300/25 rounded-full blur-[130px] pointer-events-none animate-pulse" />

        {/* Giant Rotating Nautical Wheel */}
        <div
          ref={wheelContainerRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[100vh] h-[100vh] sm:w-[105vh] sm:h-[105vh] pointer-events-none z-10 flex items-center justify-center overflow-visible"
        >
          {/* Light Cyan Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-sky-300/25 blur-3xl pointer-events-none" />

          <img
            ref={wheelImgRef}
            src="/pirate-wheel-transparent.png"
            alt="Nautical Wheel"
            className="w-full h-full object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)] drop-shadow-[0_0_55px_rgba(56,189,248,0.55)] select-none pointer-events-none will-change-transform overflow-visible"
          />
        </div>

        {/* Right Half Container: Section Header & Stacked Absolute Event Containers */}
        <div className="max-w-7xl w-full mx-auto flex flex-col items-end justify-center my-auto relative z-20">
          <div className="w-full max-w-lg sm:max-w-xl ml-auto flex flex-col gap-4">

            {/* Clean Section Header (Right Aligned) */}
            <div
              ref={sponsorsHeaderRef}
              className="w-full flex items-end justify-between pb-2 border-b border-sky-300/30"
            >
              <div>
                <span className="text-[11px] font-mono text-sky-300 uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-300" />
                  <span>Summit Flagships</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Featured Events
                </h2>
              </div>
            </div>

            {/* Stacked Absolute Containers for Event Visual & Floating Sapphire Details Panel */}
            <div className="relative w-full h-[480px] sm:h-[510px]">
              {EVENTS.map((event, idx) => (
                <div
                  key={event.id}
                  className="absolute inset-0 w-full h-full flex flex-col gap-4 pointer-events-none"
                >
                  {/* 1. Event Visual Card (Light Blue Glassmorphic Panel) */}
                  <div
                    ref={(el) => (visualsRef.current[idx] = el)}
                    className="w-full p-5 sm:p-6 rounded-3xl border border-sky-300/50 bg-[#07294d]/85 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] shadow-[0_0_40px_rgba(56,189,248,0.3)] flex flex-col gap-3 overflow-hidden will-change-transform pointer-events-auto shrink-0"
                  >
                    {/* Header Bar */}
                    <div className="w-full flex items-center justify-between pb-2.5 border-b border-sky-300/20">
                      <span className="text-xs font-mono font-bold text-sky-300 tracking-widest uppercase">
                        EVENT {event.id} / 03
                      </span>
                      <span className="text-xs font-mono px-3.5 py-1 rounded-full border border-sky-300/40 bg-sky-400/20 text-sky-200 uppercase tracking-wider font-semibold">
                        {event.category}
                      </span>
                    </div>

                    {/* Mystery '?' Showcase Badge (Light Sky Blue Gradient Frame) */}
                    <div className="w-full p-4 bg-[#041d36] rounded-2xl border border-sky-300/30 flex flex-col sm:flex-row items-center gap-5 shadow-inner">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-sky-300/60 bg-gradient-to-br from-[#0c4a6e] via-[#073659] to-[#031d33] flex flex-col items-center justify-center shrink-0 shadow-[0_0_25px_rgba(56,189,248,0.4)] overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:10px_10px] opacity-30 pointer-events-none" />
                        <span className="text-3xl sm:text-4xl font-extrabold text-sky-200 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)] z-10 font-mono">
                          ?
                        </span>
                        <span className="text-[8px] font-mono text-sky-300 uppercase tracking-widest mt-0.5 z-10 font-bold">
                          FLAGSHIP
                        </span>
                      </div>

                      <div className="flex flex-col text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                          {event.name}
                        </h3>
                        <span className="text-xs font-mono text-sky-300 font-bold tracking-wider mt-1">
                          {event.prize}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Floating Light Sapphire Event Details Panel */}
                  <div
                    ref={(el) => (detailsRef.current[idx] = el)}
                    className="w-full p-5 sm:p-6 rounded-2xl border border-sky-300/70 bg-[#083358]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] shadow-[0_0_45px_rgba(56,189,248,0.4)] flex flex-col gap-3.5 will-change-transform pointer-events-auto z-30"
                  >
                    {/* Time & Schedule Badge */}
                    <div className="flex items-center justify-between pb-2 border-b border-sky-300/20">
                      <div className="flex items-center gap-2 text-xs font-mono text-sky-300 font-bold uppercase tracking-wider">
                        <Clock className="w-4 h-4 text-sky-300" />
                        <span>{event.time}</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 border border-amber-300/40 bg-amber-400/15 px-2.5 py-0.5 rounded-full font-semibold">
                        Phase 2 Active
                      </span>
                    </div>

                    {/* Overview Description */}
                    <p className="text-xs sm:text-sm text-sky-100 font-mono leading-relaxed">
                      {event.desc}
                    </p>

                    {/* Action Bar with 'Register' CTA Button */}
                    <div className="pt-2 border-t border-sky-300/20 flex items-center justify-between">
                      <Link
                        to="/register"
                        className="group relative flex items-center justify-center gap-2.5 px-7 py-2.5 rounded-full bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 text-[#020610] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] transition-all duration-300 transform hover:scale-[1.03] cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4 text-[#020610]" />
                        <span>Register Now</span>
                      </Link>

                      <Link to="/events" className="text-xs font-mono text-sky-300 font-bold hover:underline">
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
          className="max-w-7xl w-full mx-auto flex items-center justify-between text-xs font-mono text-sky-200/80 relative z-20"
        >
          <span className="text-sky-300">Scroll to zoom event visual & reveal details panel</span>
          <span className="hidden sm:inline text-sky-300/70">10th Edition Summit</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: SPONSORS (PINNED CARTOGRAPHER VAULT)            */}
      {/* ============================================================ */}
      <section
        ref={sponsorsPinnedSectionRef}
        className="relative min-h-screen w-full bg-gradient-to-b from-[#03172e] via-[#06294d] to-[#03172e] border-t border-amber-300/30 flex flex-col items-center justify-center px-6 overflow-hidden select-none z-20"
      >
        {/* Dual Cartographer Glow Auras (Amber Astrolabe + Light Sky Blue) */}
        <div
          ref={sponsorsCyanAuraRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-amber-300/20 rounded-full blur-[150px] pointer-events-none"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-400/25 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        {/* Header */}
        <div
          ref={sponsorsHeaderRef}
          className="max-w-7xl mx-auto flex flex-col items-center mb-12 text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/50 bg-amber-400/15 text-amber-200 text-xs font-mono uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Summit Strategic Partners</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Current & Past{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-sky-300">
              Sponsors
            </span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-amber-300 mt-2 font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] flex items-center gap-2">
            <span>Scroll to accelerate partner voyager streams</span>
            <span className="animate-bounce">↓</span>
          </p>
        </div>

        {/* Fast Left-to-Right Row 1 (Current Sponsors - Polished Brass Cards) */}
        <div
          className="w-full overflow-hidden mb-8 relative z-10 max-w-7xl mx-auto"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div
            ref={sponsorsRow1Ref}
            className="flex gap-6 whitespace-nowrap min-w-max will-change-transform"
          >
            {[
              ...CURRENT_SPONSORS,
              ...CURRENT_SPONSORS,
              ...CURRENT_SPONSORS,
              ...CURRENT_SPONSORS,
              ...CURRENT_SPONSORS,
              ...CURRENT_SPONSORS,
            ].map((sponsor, idx) => (
              <div
                key={`curr-${idx}`}
                className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl border border-amber-300/50 bg-[#0c3963]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] shadow-[0_0_25px_rgba(245,158,11,0.2)] group hover:border-amber-300 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl border border-amber-300/50 bg-[#062442] flex items-center justify-center font-mono font-bold text-amber-300 text-base group-hover:scale-110 transition-transform shadow-inner">
                  ★
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-extrabold text-white group-hover:text-amber-200 transition-colors tracking-wide">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider font-extrabold">
                    {sponsor.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Right-to-Left Row 2 (Past Sponsors - Silver Steel Cards) */}
        <div
          className="w-full overflow-hidden relative z-10 max-w-7xl mx-auto"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div
            ref={sponsorsRow2Ref}
            className="flex gap-6 whitespace-nowrap min-w-max will-change-transform"
          >
            {[
              ...PAST_SPONSORS,
              ...PAST_SPONSORS,
              ...PAST_SPONSORS,
              ...PAST_SPONSORS,
              ...PAST_SPONSORS,
              ...PAST_SPONSORS,
            ].map((sponsor, idx) => (
              <div
                key={`past-${idx}`}
                className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl border border-sky-300/40 bg-[#082f49]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] shadow-[0_0_25px_rgba(56,189,248,0.2)] group hover:border-sky-300 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl border border-sky-300/40 bg-[#041d36] flex items-center justify-center font-mono font-bold text-sky-300 text-base group-hover:scale-110 transition-transform shadow-inner">
                  ✦
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-bold text-sky-100 group-hover:text-white transition-colors tracking-wide">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider font-bold">
                    {sponsor.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: ABOUT RENAISSANCE (VIBRANT OCEAN SKY BG & GLOW)  */}
      {/* ============================================================ */}
      <section
        ref={aboutSectionRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 bg-transparent py-20 overflow-hidden"
      >
        {/* Expanding Light Sky Blue Ambient Glow Aura (Animates with Scroll) */}
        <div
          ref={aboutAuraRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-400/30 rounded-full blur-[160px] pointer-events-none"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-300/25 rounded-full blur-[130px] pointer-events-none animate-pulse" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <div
            ref={aboutBadgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-300/60 bg-sky-400/15 text-sky-200 text-xs font-mono mb-8 uppercase tracking-widest font-extrabold shadow-[0_0_25px_rgba(56,189,248,0.4)] z-10"
          >
            <Wind className="w-3.5 h-3.5 text-sky-300" />
            <span>The Odyssey • Genesis</span>
          </div>

          {/* Title */}
          <h2
            ref={aboutTitleRef}
            className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white mb-8 z-10 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-cyan-200">
              Renaissance
            </span>
          </h2>

          {/* Description */}
          <p
            ref={aboutDescRef}
            className="text-base sm:text-2xl text-sky-100 font-extrabold leading-relaxed mb-8 max-w-3xl z-10 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]"
          >
            Renaissance is the flagship annual entrepreneurship summit of MNNIT Allahabad. Over a decade of voyages, it has served as the launchpad for visionary founders, researchers, and creators charting uncharted waters in deep technology, decentralized systems, and high-impact enterprise.
          </p>

          {/* Scroll CTA */}
          <p
            ref={aboutCtaRef}
            className="text-xs sm:text-sm text-sky-300 font-mono tracking-widest uppercase font-black z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] flex items-center gap-2"
          >
            <span>Descend into the keynote voyagers abyss</span>
            <span className="animate-bounce">↓</span>
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: FEATURED SPEAKERS (FULL-SCREEN LIGHT CYAN ABYSS)  */}
      {/* ============================================================ */}
      <section
        ref={speakersSectionRef}
        className="relative h-screen w-full bg-gradient-to-b from-[#03172e] via-[#052646] to-[#021020] border-t border-sky-300/30 flex flex-col items-center justify-center px-6 overflow-hidden select-none z-20"
      >
        {/* Dual Light Sky Blue & Cyan Background Blur Auras */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-300/30 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[650px] h-[650px] bg-cyan-400/25 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        {/* Animated Sonar Radar Pulse Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-sky-300/30 rounded-full animate-ping pointer-events-none opacity-30" />

        <div className="max-w-4xl w-full mx-auto flex flex-col items-center relative z-10">
          {/* Header */}
          <div className="speakers-header text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-300/50 bg-sky-400/15 text-sky-200 text-xs font-mono mb-2 uppercase tracking-widest shadow-md">
              <Navigation className="w-3.5 h-3.5 -rotate-45 text-sky-300" />
              <span>Eminent Voyagers</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Keynote Speakers
            </h2>
            <p className="text-xs sm:text-sm font-mono text-sky-300 mt-1.5 font-semibold">
              Voices emerging from the deep azure horizon
            </p>
          </div>

          {/* 2x2 Grid of Voyager Cards (2 Top, 2 Bottom) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full">
            {SPEAKERS.map((speaker, sIdx) => (
              <div
                key={speaker.id}
                className={`${
                  sIdx < 2 ? "speaker-card-top" : "speaker-card-bottom"
                } group relative rounded-2xl border border-sky-300/40 bg-[#072c50]/85 backdrop-blur-2xl p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-500 hover:border-sky-300 hover:bg-[#0b3d6f]/95 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(56,189,248,0.45)] hover:-translate-y-1 cursor-pointer`}
              >
                {/* Silhouette Frame with Compass Emblem Overlay */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-sky-300/50 bg-[#041d36] flex items-center justify-center mb-3 sm:mb-4 overflow-hidden group-hover:border-sky-300 transition-colors shadow-inner">
                  {sIdx === 0 ? (
                    <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-sky-300 group-hover:scale-110 group-hover:rotate-45 transition-all duration-500" />
                  ) : sIdx === 1 ? (
                    <Navigation className="w-8 h-8 sm:w-10 sm:h-10 text-sky-300 -rotate-45 group-hover:scale-110 transition-all duration-500" />
                  ) : sIdx === 2 ? (
                    <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-sky-300 group-hover:scale-110 transition-all duration-500" />
                  ) : (
                    <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-sky-300 group-hover:scale-110 transition-all duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021020]/80 to-transparent pointer-events-none" />
                </div>

                <span className="text-[10px] font-mono text-sky-300 uppercase tracking-widest mb-1 font-semibold">
                  {speaker.org}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-1">
                  {speaker.role}
                </h3>
                <p className="text-xs text-sky-100/90 font-light leading-relaxed">
                  {speaker.topic}
                </p>
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
