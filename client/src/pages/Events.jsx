import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Events({ embedded = false }) {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedEventModal, setSelectedEventModal] = useState(null);
  const navigate = useNavigate();

  // Structured 2-Day event dataset with clean placeholder copy
  const timelineData = {
    1: {
      dayNumber: 1,
      bannerTitle: "DAY 1",
      subtitle: "NEW SHORES • INAUGURAL & SPRINTS",
      nodePos: { x: 220, y: 220 },
      events: [
        {
          id: "event-1-keynote",
          title: "Summit Keynote & Inaugural",
          category: "Flagship Session",
          time: "09:30 AM",
          location: "Main Auditorium",
          icon: "compass",
          prize: "Summit Access",
          tag: "Flagship",
          description:
            "Placeholder description: The grand inaugural ceremony bringing together visionaries, innovators, and industry leaders to kickstart the summit journey.",
          teamSize: "Individual / Open",
          rules: [
            "Placeholder rule: Valid summit entry credentials required at entrance.",
            "Placeholder rule: Seating is allocated on a first-come, first-served basis.",
          ],
        },
        {
          id: "event-1-hackathon",
          title: "Hackathon Sprint: Round 1",
          category: "Technical Challenge",
          time: "11:30 AM",
          location: "Innovation Hub",
          icon: "swords",
          prize: "₹2,50,000 Bounty",
          tag: "Team (2-4)",
          description:
            "Placeholder description: High-intensity prototype development marathon across deep tech, AI, and startup domain problem statements.",
          teamSize: "2 - 4 Members",
          rules: [
            "Placeholder rule: All source code must be built during the allotted time.",
            "Placeholder rule: Live functional demo required for jury review.",
          ],
        },
      ],
    },
    2: {
      dayNumber: 2,
      bannerTitle: "DAY 2",
      subtitle: "BIGGER WAVES • GRAND FINALS",
      nodePos: { x: 460, y: 220 },
      events: [
        {
          id: "event-2-finals",
          title: "Hackathon Finals & Pitch",
          category: "Product Pitch",
          time: "10:00 AM",
          location: "Main Auditorium",
          icon: "swords",
          prize: "₹2,50,000 Bounty",
          tag: "Jury Round",
          description:
            "Placeholder description: Qualifying finalist teams demonstrate working products and pitch before venture capitalists and technical architects.",
          teamSize: "Finalist Teams",
          rules: [
            "Placeholder rule: 5-minute product presentation followed by 3-minute jury Q&A.",
            "Placeholder rule: Working deployment link mandatory.",
          ],
        },
        {
          id: "event-2-startup-arena",
          title: "Startup Arena & Angel Pitch",
          category: "Venture Capital",
          time: "01:30 PM",
          location: "Exhibition Concourse",
          icon: "anchor",
          prize: "₹10,00,000+ Deals",
          tag: "Pitch Battle",
          description:
            "Placeholder description: Early-stage startup founders present their business models to angel investors and institutional venture funds.",
          teamSize: "Founder Teams",
          rules: [
            "Placeholder rule: Pitch deck submission required prior to slot.",
            "Placeholder rule: Investment term sheets subject to due diligence.",
          ],
        },
        {
          id: "event-2-valedictory",
          title: "Valedictory & Awards Gala",
          category: "Grand Ceremony",
          time: "05:00 PM",
          location: "Main Auditorium",
          icon: "trophy",
          prize: "Trophies & Honors",
          tag: "Grand Finale",
          description:
            "Placeholder description: The official summit closing ceremony celebrating winners, fellowship honors, and distribution of trophies.",
          teamSize: "All Attendees",
          rules: [
            "Placeholder rule: Open to all summit delegates and participants.",
            "Placeholder rule: Winners must present verified credentials.",
          ],
        },
      ],
    },
  };

  const activeDayData = timelineData[activeDay] || timelineData[1];

  const renderBadgeIcon = (iconType) => {
    switch (iconType) {
      case "swords":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-[#fbbf24] filter drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 4.5l5 5L8 21l-5-5L14.5 4.5z" />
            <path d="M18.5 8.5l-4-4" />
            <path d="M5.5 18.5l-2 2" />
            <path d="M9.5 4.5l-5 5L16 21l5-5L9.5 4.5z" />
            <path d="M5.5 8.5l4-4" />
            <path d="M18.5 18.5l2 2" />
          </svg>
        );
      case "trophy":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-[#fbbf24] filter drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
            <path
              d="M6 4h12v6c0 3.31-2.69 6-6 6s-6-2.69-6-6V4z"
              fill="rgba(251,191,36,0.25)"
            />
          </svg>
        );
      case "compass":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-[#fbbf24] filter drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
              fill="#fbbf24"
            />
          </svg>
        );
      case "anchor":
      default:
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-[#fbbf24] filter drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="3" />
            <line x1="12" y1="22" x2="12" y2="8" />
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative w-full min-h-screen text-slate-100 select-none ${
        embedded ? "pt-2 pb-2" : "pt-24 sm:pt-28 pb-16"
      } px-4 sm:px-6 flex flex-col justify-start items-center overflow-x-hidden`}
      style={{
        background:
          "radial-gradient(ellipse 95% 75% at 50% 18%, #030b17 0%, #020710 45%, #000205 100%)",
      }}
    >
      {/* 1. Cinematic Noise & Nautical Chart Overlays */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(251, 191, 36, 0.18) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00040a]/20 to-black/90 z-0" />

      {/* 2. Top Header & Day Switcher */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-5xl mx-auto shrink-0 mb-1">
        {/* Left Simple Text Regarding Page */}
        <div className="flex flex-col text-left">
          <h1 className="font-cinzel text-sm sm:text-base md:text-lg font-bold tracking-widest text-[#fbbf24] flex items-center gap-1.5 uppercase">
            <span className="text-xs">✦</span> EVENTS
          </h1>
          <p className="text-[9px] sm:text-[10px] font-mono text-slate-400 tracking-wider uppercase mt-0.5">
            SUMMIT SCHEDULE & TIMELINE
          </p>
        </div>

        {/* Center Day Switcher Tabs (Strictly 2 Days) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 mx-auto md:mx-0 bg-slate-950/80 p-1 sm:p-1.5 rounded-2xl border border-[#fbbf24]/25 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          {[1, 2].map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`px-4 sm:px-6 py-1 sm:py-1.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                activeDay === d
                  ? "bg-gradient-to-r from-[#fbbf24]/25 to-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/60 shadow-[0_0_15px_rgba(251,191,36,0.35)] scale-105"
                  : "text-slate-400 hover:text-slate-200 hover:border-white/20 border border-transparent"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeDay === d
                    ? "bg-[#fbbf24] shadow-[0_0_6px_#fbbf24]"
                    : "bg-slate-600"
                }`}
              />
              <span>Day {d}</span>
            </button>
          ))}
        </div>

        {/* Right Balancing Spacer (Empty, balances center alignment) */}
        <div className="hidden md:block w-28" />
      </div>

      {/* 3. Central Interactive Marine Stage (Spacious 2-Day Layout with Zero Overlap) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto h-[400px] sm:h-[440px] md:h-[470px] my-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[#fbbf24]/20 shadow-[0_20px_70px_rgba(0,0,0,0.95)] bg-[#030914]/50 backdrop-blur-md shrink-0">
        {/* Subtle Marine Backlight Orbs */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-blue-900/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[320px] h-[180px] bg-[#fbbf24]/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Background Astrolabe & Rhumb Lines (Pure Fine SVG, No Compass Rose) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 450"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="goldBeam" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Nautical Grid Arcs & Astrolabe Markings */}
          <g stroke="#fbbf24" strokeWidth="0.6" opacity="0.12" fill="none">
            <circle cx="350" cy="225" r="140" strokeDasharray="3 6" />
            <circle cx="350" cy="225" r="260" strokeDasharray="4 8" />
            <circle cx="350" cy="225" r="380" strokeDasharray="2 5" />
            <line x1="0" y1="225" x2="1000" y2="225" strokeDasharray="3 6" />
            <line x1="350" y1="0" x2="350" y2="450" strokeDasharray="3 6" />
            <line x1="50" y1="0" x2="650" y2="450" strokeDasharray="2 7" />
            <line x1="650" y1="0" x2="50" y2="450" strokeDasharray="2 7" />
          </g>

          {/* Primary Clean Golden Dashed Trajectory Line connecting Day 1 -> Day 2 */}
          <path
            d="M 200 225 C 270 175, 390 275, 460 225"
            stroke="#fbbf24"
            strokeWidth="2.4"
            strokeDasharray="6 6"
            fill="none"
            filter="url(#goldBeam)"
            opacity="0.85"
          />

          {/* Active Glowing Trajectory Connector to Right-Side Event Dossier */}
          {activeDay === 1 && (
            <path
              d="M 200 225 C 280 130, 480 150, 640 225"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
              filter="url(#goldBeam)"
              opacity="0.8"
            />
          )}
          {activeDay === 2 && (
            <path
              d="M 460 225 C 520 180, 580 260, 640 225"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
              filter="url(#goldBeam)"
              opacity="0.85"
            />
          )}
        </svg>

        {/* Interactive Waypoint Nodes (Day 1 & Day 2 Only - Zero Overlap with Cards) */}
        {/* DAY 1 Node */}
        <div
          onClick={() => setActiveDay(1)}
          style={{ left: "20%", top: "50%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group flex flex-col items-center"
        >
          {activeDay === 1 && (
            <div className="absolute -inset-4 rounded-full border border-[#fbbf24] animate-ping opacity-75 pointer-events-none" />
          )}
          {/* Astrolabe Circular Ring when active */}
          {activeDay === 1 && (
            <div className="absolute -inset-3 rounded-full border border-[#fbbf24]/50 border-dashed animate-spin-slow pointer-events-none" />
          )}
          <div
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
              activeDay === 1
                ? "bg-[#040e1f] border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.7)] scale-110"
                : "bg-[#020612]/90 border-[#fbbf24]/40 group-hover:border-[#fbbf24] group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            }`}
          >
            <span className="font-cinzel text-xs font-black text-[#fbbf24]">
              01
            </span>
          </div>
          <div className="mt-2 text-center pointer-events-none">
            <h3 className="font-cinzel text-xs font-bold text-white tracking-wider group-hover:text-[#fbbf24] transition-colors">
              DAY 1
            </h3>
            <p className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider uppercase mt-0.5">
              NEW SHORES
            </p>
          </div>
        </div>

        {/* DAY 2 Node */}
        <div
          onClick={() => setActiveDay(2)}
          style={{ left: "46%", top: "50%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group flex flex-col items-center"
        >
          {activeDay === 2 && (
            <div className="absolute -inset-4 rounded-full border border-[#fbbf24] animate-ping opacity-75 pointer-events-none" />
          )}
          {activeDay === 2 && (
            <div className="absolute -inset-3 rounded-full border border-[#fbbf24]/50 border-dashed animate-spin-slow pointer-events-none" />
          )}
          <div
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
              activeDay === 2
                ? "bg-[#040e1f] border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.7)] scale-110"
                : "bg-[#020612]/90 border-[#fbbf24]/40 group-hover:border-[#fbbf24] group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            }`}
          >
            <span className="font-cinzel text-xs font-black text-[#fbbf24]">
              02
            </span>
          </div>
          <div className="mt-2 text-center pointer-events-none">
            <h3 className="font-cinzel text-xs font-bold text-white tracking-wider group-hover:text-[#fbbf24] transition-colors">
              DAY 2
            </h3>
            <p className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider uppercase mt-0.5">
              GRAND FINALE
            </p>
          </div>
        </div>

        {/* 4. Event Cards (Dedicated Right Column - Zero Overlap with Waypoints) */}
        <div className="absolute right-[3%] sm:right-[4%] top-1/2 -translate-y-1/2 w-[38%] sm:w-[35%] lg:w-[33%] max-w-[370px] flex flex-col gap-2.5 z-30">
          {activeDayData.events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEventModal(event)}
              className="relative p-3 sm:p-3.5 rounded-2xl bg-[#040e1f]/85 backdrop-blur-xl border border-[#fbbf24]/30 shadow-[0_12px_36px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(251,191,36,0.15)] hover:border-[#fbbf24]/70 hover:shadow-[0_16px_40px_rgba(251,191,36,0.25)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group flex items-center gap-3"
            >
              {/* Gold Anchor Connector Point */}
              <div className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 items-center pointer-events-none">
                <div className="w-2.5 h-2.5 rounded-full bg-[#020612] border border-[#fbbf24] flex items-center justify-center shadow-[0_0_8px_#fbbf24]">
                  <div className="w-1 h-1 rounded-full bg-[#fbbf24]" />
                </div>
              </div>

              {/* Metallic Coin Emblem Badge */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#020712] border border-[#fbbf24]/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(251,191,36,0.25)] group-hover:scale-105 group-hover:border-[#fbbf24] transition-all">
                {renderBadgeIcon(event.icon)}
              </div>

              {/* Text Meta Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-[#fbbf24] bg-[#fbbf24]/10 px-1.5 py-0.5 rounded border border-[#fbbf24]/25">
                    {event.tag}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                    🕒 {event.time}
                  </span>
                </div>
                <h3 className="font-cinzel text-xs sm:text-[13px] font-bold text-white tracking-wide truncate group-hover:text-[#fbbf24] transition-colors">
                  {event.title}
                </h3>
                <p className="text-[9px] sm:text-[10px] font-montserrat text-slate-300 mt-0.5 truncate flex items-center gap-1">
                  <span>📍</span>
                  <span className="text-slate-200">{event.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Horizon Inscription */}
      <div className="relative z-10 flex items-center justify-center gap-3 text-center shrink-0 pointer-events-none select-none py-0.5 mb-1">
        <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-[#fbbf24]/40" />
        <span className="font-cinzel text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#fbbf24] uppercase">
          DIFFERENT CREWS ✦ SAME HORIZON
        </span>
        <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-[#fbbf24]/40" />
      </div>

      {/* 5. Dark Glassmorphic Event Dossier Modal */}
      {selectedEventModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedEventModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#030914]/95 border border-[#fbbf24]/40 backdrop-blur-2xl text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(251,191,36,0.2)]"
          >
            {/* Ghost Close Button */}
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-[#fbbf24] hover:border-[#fbbf24]/50 flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-5 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#fbbf24]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.25)]">
                {renderBadgeIcon(selectedEventModal.icon)}
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20">
                  {selectedEventModal.tag}
                </span>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1 leading-tight">
                  {selectedEventModal.title}
                </h2>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5 text-xs font-montserrat">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">
                  Time & Slot
                </span>
                <span className="text-slate-200 font-semibold">🕒 {selectedEventModal.time}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">
                  Location
                </span>
                <span className="text-slate-200 font-semibold">📍 {selectedEventModal.location}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">
                  Bounty / Honors
                </span>
                <span className="text-[#fbbf24] font-semibold">💰 {selectedEventModal.prize}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">
                  Participation
                </span>
                <span className="text-slate-200 font-semibold">👥 {selectedEventModal.teamSize}</span>
              </div>
            </div>

            {/* Description / Briefing */}
            <div className="mb-5">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#fbbf24] font-bold mb-1">
                Voyage Briefing
              </h4>
              <p className="font-montserrat text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedEventModal.description}
              </p>
            </div>

            {/* Directives & Rules */}
            {selectedEventModal.rules && (
              <div className="mb-6">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#fbbf24] font-bold mb-1.5">
                  Directives & Rules
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs font-montserrat text-slate-400">
                  {selectedEventModal.rules.map((rule, rIdx) => (
                    <li key={rIdx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedEventModal(null);
                  navigate(`/events/${selectedEventModal.id}/register`);
                }}
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-[#fbbf24] hover:text-white border border-[#fbbf24]/40 hover:border-[#fbbf24] font-cinzel text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]"
              >
                Register For Voyage ➔
              </button>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200 font-montserrat text-xs font-bold uppercase tracking-wider border border-white/10 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}