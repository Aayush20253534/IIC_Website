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
  const aboutTitleRef = useRef(null);
  const aboutDescRef = useRef(null);
  const statCard1Ref = useRef(null);
  const statCard2Ref = useRef(null);
  const statCard3Ref = useRef(null);
  const statCard4Ref = useRef(null);
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
            { opacity: 0, scale: 0.8, pointerEvents: "none" },
            { opacity: 1, scale: 1.0, pointerEvents: "auto", duration: 1.5, ease: "power2.out" }
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
                scale: 1.05,
                y: -30,
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
            end: "+=3500",
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
            { opacity: 0, y: 60, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 2, stagger: 0.25, ease: "power2.out" },
            0
          );
        }

        if (sponsorsCyanAuraRef.current) {
          sponsorsTl.fromTo(
            sponsorsCyanAuraRef.current,
            { scale: 0.4, opacity: 0.1 },
            { scale: 1.5, opacity: 0.85, duration: 8, ease: "none" },
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
            { opacity: 0, y: -50, scale: 0.95, duration: 2, ease: "power2.inOut" },
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
            end: "+=2400",
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

        // 2. Giant "About Renaissance" Title reveals with hardware-accelerated zoom
        if (aboutTitleRef.current) {
          aboutTl.fromTo(
            aboutTitleRef.current,
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1.15, ease: "power2.out" },
            0.1
          );
        }

        // 3. Detailed Description text floats up smoothly
        if (aboutDescRef.current) {
          aboutTl.fromTo(
            aboutDescRef.current,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1.0, ease: "power2.out" },
            0.25
          );
        }

        // 5. Stat Card 1 (Footfall) drops down
        if (statCard1Ref.current) {
          aboutTl.fromTo(
            statCard1Ref.current,
            { opacity: 0, y: -60, scale: 0.88 },
            { opacity: 1, y: 0, scale: 1.0, ease: "power2.out" },
            0.48
          );
        }

        // 6. Stat Card 2 (Prize Pool) drops down
        if (statCard2Ref.current) {
          aboutTl.fromTo(
            statCard2Ref.current,
            { opacity: 0, y: -60, scale: 0.88 },
            { opacity: 1, y: 0, scale: 1.0, ease: "power2.out" },
            0.58
          );
        }

        // 7. Stat Card 3 (Startups & VCs) drops down
        if (statCard3Ref.current) {
          aboutTl.fromTo(
            statCard3Ref.current,
            { opacity: 0, y: -60, scale: 0.88 },
            { opacity: 1, y: 0, scale: 1.0, ease: "power2.out" },
            0.68
          );
        }

        // 8. Stat Card 4 (Edition) drops down
        if (statCard4Ref.current) {
          aboutTl.fromTo(
            statCard4Ref.current,
            { opacity: 0, y: -60, scale: 0.88 },
            { opacity: 1, y: 0, scale: 1.0, ease: "power2.out" },
            0.78
          );
        }

        // 9. Scroll CTA prompt slides in
        if (aboutCtaRef.current) {
          aboutTl.fromTo(
            aboutCtaRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.88
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
          <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mb-6 sm:mb-8 flex items-center justify-center overflow-visible">
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
            E-Cell MNNIT Allahabad • Annual Entrepreneurship Summit
          </p>

          {/* Action CTAs: Register Now + Begin Voyage */}
          <div className="overflow-visible flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/register"
              className="group relative flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#F4EBD9] via-[#EBDDC8] to-[#C5A25F] text-[#0C2B3D] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(197,162,95,0.6)] transition-all duration-300 transform hover:scale-[1.03] overflow-visible cursor-pointer border border-[#C5A25F]/60 w-full sm:w-auto"
            >
              <UserCheck className="w-4 h-4 text-[#0C2B3D] overflow-visible" />
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
              className="group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#38BDF8]/50 bg-[#031d33]/80 backdrop-blur-md text-[#CBD5E1] hover:text-white hover:border-[#38BDF8] hover:bg-[#042542]/90 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] overflow-visible cursor-pointer w-full sm:w-auto"
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
      {/* SECTION 2: FLAGSHIP EVENTS WHEEL (GRADIENT BRIDGE TO NAVY)   */}
      {/* ============================================================ */}
      <section
        id="sponsors"
        ref={sponsorsSectionRef}
        className="relative w-full min-h-screen sm:h-screen bg-gradient-to-b from-[#020610]/95 via-[#04192d]/90 to-[#072545]/90 border-y border-[#38BDF8]/20 flex flex-col justify-between pt-28 sm:pt-32 pb-6 px-4 sm:px-12 overflow-hidden select-none"
      >
        {/* Dynamic Mariana Blue Gaussian Blur Aura */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#0284C7]/25 rounded-full blur-[100px] pointer-events-none animate-pulse" />

        {/* Giant Rotating Nautical Wheel (Behind cards on mobile/tablets, side wheel on desktop) */}
        <div
          ref={wheelContainerRef}
          className="absolute left-1/2 md:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[65vh] h-[65vh] sm:w-[85vh] sm:h-[85vh] md:w-[100vh] md:h-[100vh] pointer-events-none z-0 md:z-10 flex items-center justify-center opacity-25 md:opacity-100 overflow-visible"
        >
          {/* Subtle Astrolabe Gold & Cyan Radial Glow Aura */}
          <div className="absolute w-[68%] h-[68%] rounded-full bg-[radial-gradient(circle_at_center,rgba(197,162,95,0.18)_0%,rgba(217,119,6,0.08)_35%,rgba(56,189,248,0.08)_60%,transparent_75%)] blur-2xl pointer-events-none" />

          <img
            ref={wheelImgRef}
            src="/pirate-wheel-transparent.png"
            alt="Nautical Wheel"
            className="w-full h-full object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] drop-shadow-[0_0_50px_rgba(56,189,248,0.45)] select-none pointer-events-none will-change-transform overflow-visible"
          />
        </div>

        {/* Right Half Container: Section Header & Stacked Absolute Event Containers */}
        <div className="max-w-7xl w-full mx-auto flex flex-col items-end justify-center my-auto relative z-20">
          <div className="w-full max-w-lg sm:max-w-xl ml-auto flex flex-col gap-3 sm:gap-4">

            {/* Clean Section Header (Right Aligned) */}
            <div
              ref={sponsorsHeaderRef}
              className="w-full flex items-end justify-between pb-2 border-b border-white/10"
            >
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#38BDF8] uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Summit Flagships</span>
                </span>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Featured Events
                </h2>
              </div>
            </div>

            {/* Stacked Absolute Containers for Event Visual & Floating Details Panel */}
            <div className="relative w-full h-[410px] sm:h-[450px] md:h-[480px]">
              {EVENTS.map((event, idx) => (
                <div
                  key={event.id}
                  className="absolute inset-0 w-full h-full flex flex-col gap-3 sm:gap-4 pointer-events-none"
                >
                  {/* 1. Event Visual Card (Harmonized Sand Parchment Panel) */}
                  <div
                    ref={(el) => (visualsRef.current[idx] = el)}
                    className="w-full p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-[#C5A25F]/50 bg-[#F4EBD9]/95 text-[#0C2B3D] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] shadow-[0_0_30px_rgba(197,162,95,0.25)] flex flex-col gap-2.5 sm:gap-3 overflow-hidden will-change-transform pointer-events-auto shrink-0"
                  >
                    {/* Header Bar */}
                    <div className="w-full flex items-center justify-between pb-2 border-b border-[#0C2B3D]/15">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-[#0C2B3D] tracking-widest uppercase">
                        EVENT {event.id} / 03
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-[#C5A25F]/60 bg-[#C5A25F]/20 text-[#0C2B3D] uppercase tracking-wider font-extrabold">
                        {event.category}
                      </span>
                    </div>

                    {/* Mystery '?' Showcase Badge */}
                    <div className="w-full p-3 sm:p-4 bg-[#EBDDC8] rounded-xl sm:rounded-2xl border border-[#C5A25F]/40 flex flex-row items-center gap-3 sm:gap-5 shadow-inner">
                      <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl border border-[#C5A25F]/70 bg-gradient-to-br from-[#0C2B3D] via-[#081f2d] to-[#040e17] flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(197,162,95,0.4)] overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:10px_10px] opacity-25 pointer-events-none" />
                        <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#38BDF8] drop-shadow-[0_0_12px_rgba(56,189,248,0.9)] z-10 font-mono">
                          ?
                        </span>
                        <span className="text-[7px] sm:text-[8px] font-mono text-[#C5A25F] uppercase tracking-widest mt-0.5 z-10 font-bold">
                          FLAGSHIP
                        </span>
                      </div>

                      <div className="flex flex-col text-left">
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#0C2B3D] tracking-wide">
                          {event.name}
                        </h3>
                        <span className="text-[11px] sm:text-xs font-mono text-[#9A7432] font-extrabold tracking-wider mt-0.5">
                          {event.prize}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Floating Deep Nautical Navy Details Panel */}
                  <div
                    ref={(el) => (detailsRef.current[idx] = el)}
                    className="w-full p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#38BDF8]/60 bg-[#0C2B3D]/95 text-white backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] shadow-[0_0_35px_rgba(56,189,248,0.35)] flex flex-col gap-2.5 sm:gap-3.5 will-change-transform pointer-events-auto z-30"
                  >
                    {/* Time & Schedule Badge */}
                    <div className="flex items-center justify-between pb-1.5 sm:pb-2 border-b border-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#38BDF8] font-bold uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{event.time}</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#C5A25F] border border-[#C5A25F]/40 bg-[#C5A25F]/15 px-2 sm:px-2.5 py-0.5 rounded-full font-semibold">
                        Phase 2 Active
                      </span>
                    </div>

                    {/* Overview Description */}
                    <p className="text-[11px] sm:text-xs md:text-sm text-[#CBD5E1] font-mono leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {event.desc}
                    </p>

                    {/* Action Bar with 'Register' CTA Button */}
                    <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
                      <Link
                        to="/register"
                        className="group relative flex items-center justify-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#F4EBD9] via-[#EBDDC8] to-[#C5A25F] text-[#0C2B3D] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest hover:shadow-[0_0_30px_rgba(197,162,95,0.7)] transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-[#C5A25F]/60 w-full sm:w-auto whitespace-nowrap shrink-0"
                      >
                        <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C2B3D] shrink-0" />
                        <span>Register Now</span>
                      </Link>

                      <Link to="/events" className="text-[11px] sm:text-xs font-mono text-[#38BDF8] font-bold hover:underline whitespace-nowrap py-0.5">
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
          <span className="text-[#38BDF8]/80">Scroll to zoom event visual & reveal details panel</span>
          <span className="hidden sm:inline text-[#64748B]">10th Edition Summit</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: SPONSORS (EXPOSED WEBGL WATER CANVAS + GOLD AURA) */}
      {/* ============================================================ */}
      <section
        ref={sponsorsPinnedSectionRef}
        className="relative min-h-screen w-full bg-transparent border-t border-[#C5A25F]/30 flex flex-col items-center justify-center px-6 overflow-hidden select-none z-20"
      >
        {/* Dynamic Cartographer Gold & Cyan Animated Color Aura */}
        <div
          ref={sponsorsCyanAuraRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[radial-gradient(ellipse_at_center,rgba(197,162,95,0.14)_0%,rgba(245,158,11,0.08)_35%,rgba(56,189,248,0.08)_65%,transparent_85%)] rounded-full blur-[160px] pointer-events-none animate-pulse"
        />

        {/* Header (No top pill badge; re-formatted vertical spacing) */}
        <div
          ref={sponsorsHeaderRef}
          className="max-w-7xl mx-auto flex flex-col items-center mb-6 sm:mb-8 text-center relative z-10"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Current & Past{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#C5A25F] to-[#38BDF8]">
              Sponsors
            </span>
          </h2>
        </div>

        {/* Fast Left-to-Right Row 1 (Current Sponsors - Warm Beige Cards) */}
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
                className="inline-flex items-center gap-3 sm:gap-4 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl border border-[#C5A25F]/50 bg-[#F4EBD9] text-[#0C2B3D] shadow-[0_4px_15px_rgba(0,0,0,0.22)] group hover:border-[#C5A25F] hover:shadow-[0_0_25px_rgba(197,162,95,0.45)] transition-all cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl border border-[#C5A25F]/50 bg-[#0C2B3D] flex items-center justify-center font-mono font-bold text-[#C5A25F] text-xs sm:text-base group-hover:scale-110 transition-transform shadow-inner">
                  ★
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm sm:text-base font-extrabold text-[#0C2B3D] group-hover:text-[#9A7432] transition-colors tracking-wide">
                    {sponsor.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#9A7432] uppercase tracking-wider font-extrabold">
                    {sponsor.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Right-to-Left Row 2 (Past Sponsors - Light Blue Steel Cards) */}
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
                className="inline-flex items-center gap-3 sm:gap-4 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl border border-[#166E94]/45 bg-[#D8ECEE] text-[#0C2B3D] shadow-[0_4px_15px_rgba(0,0,0,0.22)] group hover:border-[#166E94] hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] transition-all cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl border border-[#166E94]/50 bg-[#0C2B3D] flex items-center justify-center font-mono font-bold text-[#38BDF8] text-xs sm:text-base group-hover:scale-110 transition-transform shadow-inner">
                  ✦
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-extrabold text-[#0C2B3D] group-hover:text-[#166E94] transition-colors tracking-wide">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#166E94] uppercase tracking-wider font-extrabold">
                    {sponsor.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: ABOUT RENAISSANCE (WEBGL BG + FROSTED BACKDROP)  */}
      {/* ============================================================ */}
      <section
        ref={aboutSectionRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 bg-transparent py-20 overflow-hidden"
      >
        {/* Expanding Deep Mariana Ambient Glow Aura (Animates with Scroll) */}
        <div
          ref={aboutAuraRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(ellipse_at_center,rgba(197,162,95,0.12)_0%,rgba(2,132,199,0.18)_50%,transparent_80%)] rounded-full blur-[150px] pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10 px-4">
          {/* Title */}
          <h2
            ref={aboutTitleRef}
            className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white mb-6 z-10 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(0,0,0,0.95)]"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4EBD9] to-[#C5A25F]">
              Renaissance
            </span>
          </h2>

          {/* Original Description from About.jsx */}
          <p
            ref={aboutDescRef}
            className="text-base sm:text-xl text-[#F4EBD9] font-light leading-relaxed mb-8 max-w-3xl z-10 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]"
          >
            The Institution’s Innovation Council and Entrepreneurship Cell at MNNIT Allahabad present the 10th edition of Renaissance. The summit brings together students, founders, and leaders to foster entrepreneurship and innovation across diverse disciplines.
          </p>

          {/* Original Summit Statistics Grid from About.jsx (Each card animates sequentially on scroll) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full my-6 z-10">
            {/* Card 1: Footfall */}
            <div
              ref={statCard1Ref}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#020610]/85 to-[#041021]/90 border border-[#C5A25F]/35 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm min-w-0 w-full overflow-hidden"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold font-mono text-[#C5A25F] drop-shadow-[0_0_12px_rgba(197,162,95,0.5)] tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                15,000+
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-[#E2E8F0] uppercase tracking-wider font-semibold mt-1.5 whitespace-nowrap">
                Footfall
              </span>
            </div>

            {/* Card 2: Prize Pool (Fixed Overflow with tracking-tighter & responsive text sizing) */}
            <div
              ref={statCard2Ref}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#020610]/85 to-[#041021]/90 border border-[#C5A25F]/35 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm min-w-0 w-full overflow-hidden"
            >
              <span className="text-lg sm:text-2xl md:text-3xl font-extrabold font-mono text-[#C5A25F] drop-shadow-[0_0_12px_rgba(197,162,95,0.5)] tracking-tighter sm:tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                ₹5,00,000+
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-[#E2E8F0] uppercase tracking-wider font-semibold mt-1.5 whitespace-nowrap">
                Prize Pool
              </span>
            </div>

            {/* Card 3: Startups & VCs */}
            <div
              ref={statCard3Ref}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#020610]/85 to-[#041021]/90 border border-[#C5A25F]/35 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm min-w-0 w-full overflow-hidden"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold font-mono text-[#C5A25F] drop-shadow-[0_0_12px_rgba(197,162,95,0.5)] tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                40+
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-[#E2E8F0] uppercase tracking-wider font-semibold mt-1.5 whitespace-nowrap">
                Startups & VCs
              </span>
            </div>

            {/* Card 4: Edition */}
            <div
              ref={statCard4Ref}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#020610]/85 to-[#041021]/90 border border-[#C5A25F]/35 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm min-w-0 w-full overflow-hidden"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold font-mono text-[#C5A25F] drop-shadow-[0_0_12px_rgba(197,162,95,0.5)] tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                10th
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-[#E2E8F0] uppercase tracking-wider font-semibold mt-1.5 whitespace-nowrap">
                Edition
              </span>
            </div>
          </div>

          {/* Scroll CTA */}
          <p
            ref={aboutCtaRef}
            className="text-xs sm:text-sm text-[#C5A25F] font-mono tracking-widest uppercase font-bold z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] flex items-center gap-2 mt-4"
          >
            <span>Descend into the keynote voyagers abyss</span>
            <span className="animate-bounce">↓</span>
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: FEATURED SPEAKERS (FULL-SCREEN MARIANA ABYSS)    */}
      {/* ============================================================ */}
      <section
        ref={speakersSectionRef}
        className="relative min-h-screen sm:h-screen w-full bg-gradient-to-b from-[#062038]/90 via-[#082947]/85 to-[#031324]/95 border-t border-[#C5A25F]/30 flex flex-col items-center justify-between pt-28 sm:pt-32 pb-8 px-4 sm:px-8 overflow-hidden select-none z-20"
      >
        {/* Dual Mariana Blue Background Blur Auras */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#0284C7]/20 rounded-full blur-[130px] pointer-events-none animate-pulse" />

        {/* Animated Sonar Radar Pulse Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] border border-[#38BDF8]/15 rounded-full animate-ping pointer-events-none opacity-20" />

        <div className="max-w-4xl w-full mx-auto flex flex-col items-center my-auto relative z-10">
          {/* Header */}
          <div className="speakers-header text-center mb-4 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-[#C5A25F]/50 bg-[#C5A25F]/15 text-[#C5A25F] text-[10px] sm:text-xs font-mono mb-1.5 sm:mb-2 uppercase tracking-widest shadow-md">
              <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5 -rotate-45 text-[#C5A25F]" />
              <span>Eminent Voyagers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured Keynote Speakers
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm font-mono text-[#38BDF8]/80 mt-1">
              Voices emerging from the deepest depths of the ocean
            </p>
          </div>

          {/* 2x2 Grid of Voyager Cards (2 Top, 2 Bottom on both Mobile & Desktop) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-6 w-full">
            {SPEAKERS.map((speaker, sIdx) => (
              <div
                key={speaker.id}
                className={`${
                  sIdx < 2 ? "speaker-card-top" : "speaker-card-bottom"
                } group relative rounded-xl sm:rounded-2xl border border-[#C5A25F]/40 bg-[#F4EBD9]/95 text-[#0C2B3D] backdrop-blur-xl p-3 sm:p-5 md:p-6 flex flex-col items-center text-center transition-all duration-500 hover:border-[#C5A25F] hover:shadow-[0_0_35px_rgba(197,162,95,0.35)] hover:-translate-y-1 cursor-pointer`}
              >
                {/* Silhouette Frame with Compass Emblem Overlay */}
                <div className="relative w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border border-[#C5A25F]/50 bg-[#0C2B3D] flex items-center justify-center mb-1.5 sm:mb-4 overflow-hidden group-hover:border-[#C5A25F] transition-colors shadow-inner shrink-0">
                  {sIdx === 0 ? (
                    <Compass className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#38BDF8] group-hover:scale-110 group-hover:rotate-45 transition-all duration-500" />
                  ) : sIdx === 1 ? (
                    <Navigation className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#38BDF8] -rotate-45 group-hover:scale-110 transition-all duration-500" />
                  ) : sIdx === 2 ? (
                    <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#38BDF8] group-hover:scale-110 transition-all duration-500" />
                  ) : (
                    <UserCheck className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#38BDF8] group-hover:scale-110 transition-all duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C2B3D]/80 to-transparent pointer-events-none" />
                </div>

                <span className="text-[8px] sm:text-[10px] font-mono text-[#9A7432] uppercase tracking-widest mb-0.5 font-bold line-clamp-1">
                  {speaker.org}
                </span>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#0C2B3D] group-hover:text-[#9A7432] transition-colors mb-0.5 sm:mb-1 leading-snug">
                  {speaker.role}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#334155] font-light leading-tight line-clamp-2 sm:line-clamp-none">
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
