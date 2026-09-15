import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navigation,
  Wind,
  ShieldCheck,
  UserCheck,
  Clock,
  ChevronRight,
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
    name: "E-Summit Hackathon",
    category: "Flagship 36-Hour Sprint",
    time: "Day 1 • 09:00 AM • 36 Hours",
    desc: "Build autonomous subsea systems, AI agents, and deep-tech prototypes in a 36-hour continuous build sprint.",
    prize: "₹2,50,000 Pool",
  },
  {
    id: "02",
    name: "Pitchers 10.0",
    category: "Venture Capital Arena",
    time: "Summit Day 1 • 02:00 PM",
    desc: "Present your high-impact startup to top syndicate investors, angel funds, and tier-1 venture cartographers.",
    prize: "₹5,00,000 Pool",
  },
  {
    id: "03",
    name: "Case Odyssey",
    category: "Corporate Strategy Battle",
    time: "Day 1 • 10:00 AM • Boardroom Pitch",
    desc: "Solve high-stakes strategic challenges and market disruption problems presented by global industry leaders.",
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
  const [activeSubStep, setActiveSubStep] = useState(0);
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
      // Section 2: Flagship Events Radial Clock Rotation & Unrolling Dropdown
      // -------------------------------------------------------------
      if (sponsorsSectionRef.current) {
        const totalSubSteps = 6; // 6 sub-steps across 3 events

        // Entrance Animation
        const entranceTargets = [
          sponsorsHeaderRef.current,
          wheelContainerRef.current,
          sponsorCardRef.current,
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

        // Pinned ScrollTrigger with Radial Clock Arc Sweep
        ScrollTrigger.create({
          trigger: sponsorsSectionRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const rawProgress = self.progress;

            // Rotate transparent pirate wheel smoothly
            if (wheelImgRef.current) {
              gsap.set(wheelImgRef.current, {
                rotation: rawProgress * 720,
              });
            }

            // Entrance Hold Buffer (12% hold buffer at top)
            const holdThreshold = 0.12;
            let normalizedProgress = 0;
            if (rawProgress > holdThreshold) {
              normalizedProgress = (rawProgress - holdThreshold) / (1 - holdThreshold);
            }

            const newSubStep = Math.min(
              totalSubSteps - 1,
              Math.floor(normalizedProgress * totalSubSteps)
            );

            setActiveSubStep((prevSubStep) => {
              if (prevSubStep !== newSubStep) {
                if (sponsorCardRef.current) {
                  // Radial clock arc sweep animation
                  gsap.fromTo(
                    sponsorCardRef.current,
                    { opacity: 0, rotation: -20, transformOrigin: "-50% 50%", scale: 0.94, filter: "blur(10px)" },
                    { opacity: 1, rotation: 0, transformOrigin: "-50% 50%", scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }
                  );
                }
                return newSubStep;
              }
              return prevSubStep;
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

  const activeEventIdx = Math.floor(activeSubStep / 2);
  const isDeepDive = activeSubStep % 2 === 1;
  const activeEvent = EVENTS[activeEventIdx] || EVENTS[0];

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
      {/* SECTION 2: FLAGSHIP EVENTS WHEEL + RADIAL CLOCK ARC ROTATION */}
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

        {/* Right Half Container: Section Header & Radial Clock Event Stream */}
        <div className="max-w-7xl w-full mx-auto flex flex-col items-end justify-center my-auto relative z-20">
          <div className="w-full max-w-lg sm:max-w-xl ml-auto flex flex-col gap-5">

            {/* Clean Section Header (Right Aligned) */}
            <div
              ref={sponsorsHeaderRef}
              className="w-full flex items-end justify-between pb-1 border-b border-white/10"
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

              <div className="flex items-center gap-2 bg-[#030914]/90 px-3.5 py-1.5 rounded-xl border border-[#38BDF8]/40 font-mono text-xs shadow-lg">
                <span className="text-[#94A3B8]">Event:</span>
                <span className="text-[#38BDF8] font-bold text-sm">
                  {String(activeEventIdx + 1).padStart(2, "0")} / 03
                </span>
              </div>
            </div>

            {/* Radial Clock Rotation Container */}
            <div
              ref={sponsorCardRef}
              className="w-full flex flex-col gap-4 bg-transparent p-0 border-none transition-all duration-300 relative will-change-transform"
            >
              {/* Event Main Badge (Always Visible, Framed Image + Title) */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-5 p-5 sm:p-6 rounded-2xl border border-[#38BDF8]/40 bg-[#040f21]/90 backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.25)] shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                {/* '?' Mystery Badge Image Frame */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-[#38BDF8]/50 bg-gradient-to-b from-[#04152e] via-[#020914] to-[#020610] flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.3)] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:10px_10px] opacity-20 pointer-events-none" />
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#38BDF8] drop-shadow-[0_0_12px_rgba(56,189,248,0.9)] z-10 font-mono">
                    ?
                  </span>
                  <span className="text-[8px] font-mono text-[#38BDF8]/80 uppercase tracking-widest mt-0.5 z-10 font-bold">
                    FLAGSHIP
                  </span>
                </div>

                {/* Title & Prize */}
                <div className="flex flex-col text-center sm:text-left flex-1">
                  <span className="text-[10px] font-mono font-semibold text-[#38BDF8] uppercase tracking-widest mb-1">
                    {activeEvent.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    {activeEvent.name}
                  </h3>
                  <span className="text-xs font-mono text-[#38BDF8] font-bold tracking-wider mt-1">
                    {activeEvent.prize}
                  </span>
                </div>

                {/* Dropdown State Cue */}
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#38BDF8]/90 bg-[#38BDF8]/10 px-3 py-1.5 rounded-full border border-[#38BDF8]/30 shrink-0">
                  <span>{isDeepDive ? "Details Unrolled" : "Scroll for Details"}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transform transition-transform duration-300 ${isDeepDive ? "rotate-90" : ""}`} />
                </div>
              </div>

              {/* Animated Accordion Dropdown Drawer (Unrolls below card on scroll) */}
              <div
                className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
                  isDeepDive ? "max-h-[300px] opacity-100 mt-1" : "max-h-0 opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="p-5 sm:p-6 rounded-2xl border border-[#38BDF8]/40 bg-[#020610]/95 backdrop-blur-2xl shadow-inner flex flex-col gap-4">
                  {/* Time Badge */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] font-bold uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-[#38BDF8]" />
                      <span>{activeEvent.time}</span>
                    </div>

                    <span className="text-[10px] font-mono text-amber-400 border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 rounded-full font-semibold">
                      Phase 2 Active
                    </span>
                  </div>

                  {/* Overview Description */}
                  <p className="text-xs sm:text-sm text-[#CBD5E1] font-mono leading-relaxed">
                    {activeEvent.desc}
                  </p>

                  {/* Action CTA Bar */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#CBD5E1] font-mono">
                      <FileText className="w-4 h-4 text-[#38BDF8]" />
                      <span>Official Summit Rulebook Applies</span>
                    </div>

                    <Link
                      to="/register"
                      className="group relative flex items-center justify-center gap-2.5 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#38BDF8] via-sky-400 to-[#38BDF8] text-[#020610] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(56,189,248,0.7)] transition-all transform hover:scale-[1.03] cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-[#020610]" />
                      <span>Register For Event</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sub-step Progress Dots */}
              <div className="w-full pt-2 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3, 4, 5].map((step) => {
                    const isCurrent = activeSubStep === step;
                    const isPast = activeSubStep > step;
                    return (
                      <div
                        key={step}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? "w-6 bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
                            : isPast
                            ? "w-3 bg-[#38BDF8]/50"
                            : "w-3 bg-white/20"
                        }`}
                      />
                    );
                  })}
                </div>

                <Link to="/events" className="text-[#38BDF8] font-bold hover:underline text-xs">
                  View Full Schedule →
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Clean Bottom Status Bar */}
        <div
          ref={sponsorsFooterRef}
          className="max-w-7xl w-full mx-auto flex items-center justify-between text-xs font-mono text-[#64748B] relative z-20"
        >
          <span className="text-[#38BDF8]/80">Scroll to rotate events along clock arc & unroll details</span>
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
        {/* Section 3: About Renaissance (BOUNDARYLESS INTENSE BACKDROP BLUR WITH DEEP MARINE TYPOGRAPHY) */}
        <section className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 text-center z-10 bg-transparent">
          <div
            ref={aboutTextRef}
            className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center p-6 sm:p-10 rounded-[40px] bg-[#020610]/40 backdrop-blur-3xl shadow-[0_0_80px_rgba(2,6,16,0.6)]"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0284C7]/60 bg-[#0284C7]/20 text-[#0284C7] text-xs font-mono mb-6 uppercase tracking-widest font-extrabold shadow-sm">
              <Wind className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>The Odyssey • Genesis</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#020610] mb-6 drop-shadow-[0_1px_3px_rgba(255,255,255,0.7)]">
              About{" "}
              <span className="text-[#0284C7] underline decoration-[#0284C7]/50 underline-offset-8">
                Renaissance
              </span>
            </h2>

            <p className="text-base sm:text-xl text-[#011627] font-extrabold leading-relaxed mb-6 max-w-2xl drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              Renaissance is the flagship annual entrepreneurship summit of MNNIT Allahabad. Over a decade of voyages, it has served as the launchpad for visionary founders, researchers, and creators charting uncharted waters in deep technology, decentralized systems, and high-impact enterprise.
            </p>

            <p className="text-xs text-[#0284C7] font-mono tracking-widest uppercase font-black">
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
                  <h3 className="text-base font-semibold text-[#FFFFFF] group-hover:text-[#38BDF8] transition-colors mb-2">
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
