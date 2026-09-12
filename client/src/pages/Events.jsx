import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactFooter from "../components/ContactFooter";

export default function Events({ embedded = false }) {
  const [activeDay, setActiveDay] = useState(1);
  const navigate = useNavigate();

  const eventsSchedule = {
    1: {
      dayTitle: "DAY 1",
      daySubtitle: "NEW SHORES • NEW CHALLENGES",
      iconType: "compass",
      events: [
        {
          id: "event-1",
          title: "Keynote & Summit Orientation",
          category: "Inaugural Session",
          time: "09:30 AM - 11:00 AM",
          location: "Main Auditorium",
          tag: "Flagship",
          description:
            "Grand opening ceremony and inaugural address by distinguished industry pioneers setting the voyage course.",
        },
        {
          id: "event-2",
          title: "Hackathon Sprint: Round 1",
          category: "Technical",
          time: "11:30 AM - 04:30 PM",
          location: "Innovation Hub",
          tag: "Team (2-4)",
          description:
            "Problem statement unveil and high-intensity prototype development marathon across deep tech & AI domains.",
        },
        {
          id: "event-3",
          title: "Founder's Fireside Masterclass",
          category: "Leadership",
          time: "05:00 PM - 07:00 PM",
          location: "Seminar Hall A",
          tag: "Open Entry",
          description:
            "Intimate dialogue with veteran startup founders on product-market fit, fundraising, and resilient scaling.",
        },
      ],
    },
    2: {
      dayTitle: "DAY 2",
      daySubtitle: "BIGGER WAVES • BRIGHTER MINDS",
      iconType: "anchor",
      events: [
        {
          id: "event-2-finals",
          title: "Grand Hackathon Finals & Jury Pitch",
          category: "Technical",
          time: "10:00 AM - 01:00 PM",
          location: "Main Auditorium",
          tag: "Jury Round",
          description:
            "Shortlisted finalists demonstrate working functional prototypes before VC judges and enterprise technical heads.",
        },
        {
          id: "event-4",
          title: "Startup Arena & Live Angel Pitch",
          category: "Venture Capital",
          time: "01:30 PM - 04:00 PM",
          location: "Exhibition Concourse",
          tag: "Pitching",
          description:
            "High-stakes pitch battle where emerging college and student startups present for investment and grant funding.",
        },
        {
          id: "valedictory",
          title: "Valedictory & Awards Gala",
          category: "Awards Ceremony",
          time: "04:30 PM - 06:30 PM",
          location: "Main Auditorium",
          tag: "₹5,00,000+ Prizes",
          description:
            "Grand summit conclusion, championship trophy presentations, fellowship felicitations, and valediction.",
        },
      ],
    },
  };

  return (
    <div
      className={`relative w-full min-h-screen text-[#F4EBD9] select-none ${
        embedded ? "py-6" : "pt-24 pb-12"
      }`}
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 20%, #0f172a 0%, #020617 75%, #01040a 100%)",
      }}
    >
      {/* Stylized Dark Sea Wave / Maritime Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, #0369a1 0%, transparent 60%), radial-gradient(circle at 80% 80%, #0f766e 0%, transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none z-0" />

      {/* Side Decorative Maritime Typography (Left Rail - Desktop) */}
      <div className="hidden lg:flex flex-col justify-between fixed left-8 top-36 bottom-24 z-20 pointer-events-none select-none">
        <div className="text-[11px] font-mono tracking-[0.35em] text-[#94A3B8] opacity-60 uppercase [writing-mode:vertical-rl] rotate-180 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#fbbf24]/40 inline-block" />
          MORE THAN AN EVENT • A JOURNEY
        </div>
        <div className="text-[10px] font-mono tracking-[0.3em] text-[#C5A25F] opacity-50 uppercase [writing-mode:vertical-rl] rotate-180">
          RENAISSANCE MMXXVI
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-[11px] font-mono tracking-[0.3em] text-[#fbbf24] bg-[#020617]/90 border border-[#fbbf24]/30 uppercase mb-4 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            VOYAGE TIMELINE
          </span>
          <h1 className="font-cinzel text-5xl sm:text-7xl font-black text-[#F4EBD9] tracking-[0.2em] drop-shadow-[0_4px_24px_rgba(251,191,36,0.35)]">
            EVENTS
          </h1>
          <div className="flex items-center justify-center space-x-4 my-4">
            <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
            <span className="text-[#fbbf24] text-xs filter drop-shadow-[0_0_8px_#fbbf24]">✦</span>
            <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
          </div>
          <p className="text-xs sm:text-sm font-montserrat tracking-[0.4em] text-[#C5A25F] uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            TWO DAYS • A THOUSAND STORIES
          </p>
        </header>

        {/* Day Selector Buttons for Mobile & Quick Filter */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {[1, 2].map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`px-7 py-2.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg flex items-center gap-2 ${
                activeDay === d
                  ? "bg-gradient-to-r from-[#fbbf24] to-[#d97706] text-[#020617] border border-[#fef08a] shadow-[0_0_20px_rgba(251,191,36,0.4)] scale-105"
                  : "bg-[#0f172a]/80 text-[#94A3B8] border border-[#fbbf24]/20 hover:border-[#fbbf24]/50 hover:text-[#F4EBD9]"
              }`}
            >
              <span>{d === 1 ? "🧭" : "⚓"}</span>
              <span>Day {d}</span>
            </button>
          ))}
        </div>

        {/* Desktop Dual-Day Voyage Grid with Connecting Curved Golden Route */}
        <div className="relative">
          {/* Curved Golden Treasure Map Route SVG (Desktop Connected Line) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 700"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 260 90 C 380 90, 420 180, 500 180 C 580 180, 620 90, 740 90"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                className="opacity-75 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
              />
            </svg>
          </div>

          {/* Main 2-Day Voyage Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 relative z-10">
            {[1, 2].map((dayNum) => {
              const dayData = eventsSchedule[dayNum];
              const isCurrent = activeDay === dayNum;

              return (
                <div
                  key={dayNum}
                  onClick={() => setActiveDay(dayNum)}
                  className={`flex flex-col transition-all duration-300 rounded-3xl p-6 sm:p-8 ${
                    isCurrent
                      ? "bg-[#041021]/80 border border-[#fbbf24]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-[#fbbf24]/20"
                      : "bg-[#020617]/50 border border-[#1e293b] opacity-85 hover:opacity-100 hover:border-[#fbbf24]/30"
                  }`}
                >
                  {/* Pirate Voyage Node Header */}
                  <div className="flex flex-col items-center text-center mb-8">
                    {/* Glowing Circular Pirate Node */}
                    <div className="relative mb-3 group cursor-pointer">
                      <div className="w-16 h-16 rounded-full bg-[#020617] border-2 border-[#fbbf24] flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4),inset_0_0_12px_rgba(251,191,36,0.2)] transition-transform duration-300 group-hover:scale-110">
                        {dayData.iconType === "compass" ? (
                          /* Glowing Compass Icon */
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="filter drop-shadow-[0_0_6px_#fbbf24]"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#fbbf24" />
                          </svg>
                        ) : (
                          /* Glowing Anchor Icon */
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="filter drop-shadow-[0_0_6px_#fbbf24]"
                          >
                            <circle cx="12" cy="5" r="3" />
                            <line x1="12" y1="22" x2="12" y2="8" />
                            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Day Title & Subtitle */}
                    <h2 className="font-cinzel text-2xl sm:text-3xl font-black tracking-widest text-[#F4EBD9]">
                      {dayData.dayTitle}
                    </h2>
                    <p className="text-[11px] font-mono tracking-[0.25em] text-[#fbbf24] uppercase mt-1 font-semibold">
                      {dayData.daySubtitle}
                    </p>
                  </div>

                  {/* Strict Vertical Stack of Event Detail Cards (No Overlap) */}
                  <div className="flex flex-col gap-6 mt-2">
                    {dayData.events.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-[#fbbf24]/30 shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:border-[#fbbf24]/75 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Top Tag & Time */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-[#020617] bg-[#fbbf24]">
                              {item.tag}
                            </span>
                            <span className="text-[11px] font-mono text-[#fbbf24] font-semibold flex items-center gap-1.5">
                              🕒 {item.time}
                            </span>
                          </div>

                          {/* Event Title */}
                          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F4EBD9] tracking-wide mb-2 group-hover:text-[#fbbf24] transition-colors">
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="font-montserrat text-xs text-[#94A3B8] leading-relaxed mb-4 font-light">
                            {item.description}
                          </p>
                        </div>

                        {/* Card Bottom Meta (Location & Register Action) */}
                        <div className="pt-3 border-t border-[#334155]/60 flex items-center justify-between gap-3">
                          <span className="text-xs font-montserrat text-[#E2E8F0] font-medium flex items-center gap-1.5">
                            📍 <span className="text-[#38bdf8] font-semibold">{item.location}</span>
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/events/${item.id}/register`);
                            }}
                            className="px-4 py-1.5 rounded-lg bg-[#fbbf24]/10 hover:bg-[#fbbf24] text-[#fbbf24] hover:text-[#020617] border border-[#fbbf24]/40 font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                          >
                            Register ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summit Footer */}
      {!embedded && <ContactFooter />}
    </div>
  );
}