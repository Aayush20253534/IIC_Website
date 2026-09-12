import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactFooter from "../components/ContactFooter";

export default function Events({ embedded = false }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const navigate = useNavigate();

  // 2-Day Timeline Configuration - Coordinates are in percentages
  const timelineDays = [
    {
      day: 1,
      title: "DAY 1",
      subtitle: "NEW SHORES\nNEW CHALLENGES",
      x: "28", // Used for both CSS left% and SVG path
      y: "38", // Used for CSS top%
    },
    {
      day: 2,
      title: "DAY 2",
      subtitle: "BIGGER WAVES\nBRIGHTER MINDS",
      x: "65", 
      y: "48", 
    },
  ];

  const day1Events = [
    {
      id: "event-1",
      title: "Keynote & Orientation",
      location: "Main Auditorium",
      time: "09:30 AM",
      icon: "🧭",
      x: "28%",
      y: "58%",
    },
  ];

  const day2Events = [
    {
      id: "event-2-finals",
      title: "Grand Hackathon Finals",
      location: "Campus Venue",
      time: "10:30 AM",
      icon: "⚔️",
      x: "65%",
      y: "65%",
    },
    {
      id: "valedictory",
      title: "Valedictory & Awards",
      location: "Auditorium",
      time: "04:00 PM",
      icon: "🏆",
      x: "65%",
      y: "80%",
    },
  ];

  return (
    <div
      className={`relative w-full min-h-screen bg-[#030914]/80 text-[#EAD8B1] font-serif overflow-hidden select-none ${
        embedded ? "py-8" : "pt-24 pb-12"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030914]/90 via-[#07172B]/80 to-[#02060E]/90 pointer-events-none z-0" />
      <div 
        className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none animate-pulse z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #003B6D 0%, transparent 60%), radial-gradient(circle at 20% 80%, #001F3F 0%, transparent 50%)`,
          animationDuration: "8s"
        }}
      />
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A25F_1px,transparent_1px)] [background-size:32px_32px] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030914]/40 to-[#030914]/90 pointer-events-none z-0" />

      {/* Header Section */}
      <header className="relative z-20 text-center mt-4 mb-8">
        <h1 className="text-5xl sm:text-7xl tracking-[0.2em] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D6] via-[#D4AF37] to-[#8B5A2B] drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
          EVENTS
        </h1>
        <div className="flex items-center justify-center space-x-4 my-3">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#D4AF37] text-sm filter drop-shadow-[0_0_5px_#D4AF37]">✦</span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
        <p className="text-[11px] tracking-[0.4em] text-[#C5A880] uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          TWO DAYS • A THOUSAND STORIES
        </p>
      </header>

      {/* Side Typography Decor */}
      <div className="hidden lg:block absolute left-12 top-1/3 text-[10px] tracking-[0.3em] text-[#9A8262] uppercase leading-loose font-mono z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <p>MORE</p>
        <p>THAN AN EVENT</p>
        <p>A JOURNEY</p>
      </div>
      <div className="hidden lg:block absolute left-16 bottom-24 text-[10px] tracking-[0.3em] text-[#9A8262] uppercase leading-loose font-mono z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <p>SET SAIL</p>
        <p>FOR GREATNESS</p>
      </div>

      {/* Main Map Viewport */}
      <main className="relative z-20 max-w-6xl mx-auto h-[650px] w-full">
        
        {/* Animated Pirate Galleon Ship */}
        <div className="absolute left-4 bottom-8 w-64 h-64 pointer-events-none z-10 opacity-90 transition-transform duration-1000 hover:scale-105">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
            <ellipse cx="100" cy="170" rx="70" ry="15" fill="#000" opacity="0.6" />
            <path d="M 30 140 Q 100 185 170 140 Q 180 125 150 125 Q 100 135 45 125 Z" fill="#1C1008" stroke="#5C3A21" strokeWidth="2" />
            <path d="M 40 132 Q 100 145 160 132" stroke="#8B5A2B" strokeWidth="1.5" fill="none" />
            <line x1="70" y1="130" x2="70" y2="40" stroke="#100A05" strokeWidth="3" />
            <line x1="115" y1="130" x2="115" y2="30" stroke="#100A05" strokeWidth="3.5" />
            <line x1="150" y1="130" x2="150" y2="55" stroke="#100A05" strokeWidth="2.5" />
            <path d="M 70 50 Q 95 65 70 95 Q 50 65 70 50 Z" fill="#D5C29D" opacity="0.85" />
            <path d="M 115 40 Q 145 60 115 100 Q 90 60 115 40 Z" fill="#E8D7B5" opacity="0.9" />
            <path d="M 150 65 Q 170 80 150 110 Q 135 80 150 65 Z" fill="#D5C29D" opacity="0.8" />
            <path d="M 115 30 L 135 35 L 115 40 Z" fill="#000" />
            <circle cx="123" cy="35" r="1.5" fill="#FFF" />
          </svg>
        </div>

        {/* Mountain Island 1 (Day 1 Peak) */}
        <div className="absolute left-[18%] top-[18%] w-56 h-40 pointer-events-none z-10">
          <svg viewBox="0 0 200 150" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
            <path d="M 10 130 Q 100 145 190 130 Q 160 80 120 40 Q 90 20 70 60 Q 40 90 10 130 Z" fill="#0E1A14" stroke="#2D4A3E" strokeWidth="1" />
            <path d="M 70 60 L 90 135 M 120 40 L 110 135 M 40 90 L 60 135" stroke="#070D0A" strokeWidth="1.5" />
            <ellipse cx="100" cy="132" rx="85" ry="8" fill="#C5A25F" opacity="0.2" />
          </svg>
        </div>

        {/* Mountain Island 2 (Day 2 Peak) */}
        <div className="absolute left-[55%] top-[28%] w-64 h-48 pointer-events-none z-10">
          <svg viewBox="0 0 200 150" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
            <path d="M 15 135 Q 100 150 185 135 Q 155 70 115 30 Q 85 10 65 50 Q 35 85 15 135 Z" fill="#141E18" stroke="#375747" strokeWidth="1" />
            <path d="M 115 30 L 130 140 M 65 50 L 80 140" stroke="#0A100C" strokeWidth="1.5" />
            <ellipse cx="100" cy="137" rx="80" ry="9" fill="#C5A25F" opacity="0.25" />
          </svg>
        </div>

        {/* Treasure Chest (Bottom Right) */}
        <div className="absolute right-8 bottom-8 w-36 h-28 pointer-events-none z-10 opacity-90">
          <svg viewBox="0 0 120 100" className="w-full h-full filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]">
            <rect x="20" y="45" width="80" height="40" rx="3" fill="#2A1810" stroke="#8B5A2B" strokeWidth="2" />
            <path d="M 18 45 Q 60 20 102 45 Z" fill="#3D2317" stroke="#8B5A2B" strokeWidth="2" />
            <ellipse cx="60" cy="45" rx="30" ry="5" fill="#FFD700" className="animate-pulse" />
            <rect x="35" y="45" width="6" height="40" fill="#D4AF37" />
            <rect x="79" y="45" width="6" height="40" fill="#D4AF37" />
          </svg>
        </div>

        {/* PERFECTLY CONNECTED DOTTED GOLDEN ROUTE */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path
            d="M 28 44 C 40 44, 50 54, 65 54"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeDasharray="6 6"
            vectorEffect="non-scaling-stroke"
            className="opacity-90 filter drop-shadow-[0_0_8px_#D4AF37]"
          />
        </svg>

        {/* Interactive UI Nodes */}
        {timelineDays.map((node) => (
          <div
            key={node.day}
            onClick={() => setSelectedDay(node.day)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30 flex flex-col items-center"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {/* Day Label - Rich Parchment Effect */}
            <div className={`relative px-6 py-2 transition-all duration-300 group-hover:scale-105 shadow-[0_15px_30px_rgba(0,0,0,0.9)] 
              ${selectedDay === node.day 
                ? "bg-gradient-to-br from-[#F5E6C8] via-[#E8D7B5] to-[#C2A878] border-[#8B5A2B] ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-transparent shadow-[inset_0_0_15px_rgba(139,90,43,0.3)]" 
                : "bg-gradient-to-br from-[#D4C3A3] to-[#B0986B] border-[#5C3A21] shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] opacity-90"}
              border-2 rounded-sm`}
            >
              <span className={`font-black text-sm tracking-widest block text-center ${selectedDay === node.day ? "text-[#2A1810]" : "text-[#1A0F0A]"}`}>
                {node.title}
              </span>
            </div>

            {/* Glowing Target Node (This sits right where the line connects) */}
            <div className="flex justify-center mt-3 z-10 bg-[#030914] rounded-full">
              <div className="w-6 h-6 rounded-full border-[3px] border-[#D4AF37] bg-[#0A0503] flex items-center justify-center shadow-[0_0_15px_#D4AF37,inset_0_0_5px_#D4AF37] transition-all group-hover:bg-[#D4AF37]/20">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFF5D6] shadow-[0_0_8px_#FFF]" />
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] tracking-widest text-[#D4C3A3] font-bold uppercase leading-tight whitespace-pre-line drop-shadow-[0_4px_6px_rgba(0,0,0,1)]">
              {node.subtitle}
            </div>
          </div>
        ))}

        {/* Day 1 Event Cards */}
        {day1Events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/events/${event.id}/register`)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4 cursor-pointer group z-40 transition-all duration-500 ${
              selectedDay === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
            style={{ left: event.x, top: event.y }}
          >
            <div className="w-64 bg-gradient-to-br from-[#F4E3C5] via-[#E6CDA3] to-[#C9A977] text-[#2C1A0E] p-3 border-2 border-[#8B5A2B] shadow-[inset_0_0_20px_rgba(139,90,43,0.2),0_15px_35px_rgba(0,0,0,0.8)] rounded-sm group-hover:brightness-110 group-hover:-translate-y-1 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#3D2314] border-2 border-[#D4AF37] flex items-center justify-center text-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                  {event.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-[13px] tracking-wide text-[#1A0F0A]">
                    {event.title}
                  </h4>
                  <div className="text-[10px] text-[#4A2F1D] mt-1 space-y-0.5 font-sans font-bold">
                    <p className="flex items-center gap-1">📍 {event.location}</p>
                    <p className="flex items-center gap-1">🕒 {event.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Day 2 Event Cards */}
        {day2Events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/events/${event.id}/register`)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4 cursor-pointer group z-40 transition-all duration-500 ${
              selectedDay === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
            style={{ left: event.x, top: event.y }}
          >
            <div className="w-64 bg-gradient-to-br from-[#F4E3C5] via-[#E6CDA3] to-[#C9A977] text-[#2C1A0E] p-3 border-2 border-[#8B5A2B] shadow-[inset_0_0_20px_rgba(139,90,43,0.2),0_15px_35px_rgba(0,0,0,0.8)] rounded-sm group-hover:brightness-110 group-hover:-translate-y-1 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#3D2314] border-2 border-[#D4AF37] flex items-center justify-center text-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                  {event.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-[13px] tracking-wide text-[#1A0F0A]">
                    {event.title}
                  </h4>
                  <div className="text-[10px] text-[#4A2F1D] mt-1 space-y-0.5 font-sans font-bold">
                    <p className="flex items-center gap-1">📍 {event.location}</p>
                    <p className="flex items-center gap-1">🕒 {event.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="relative z-20 text-center mt-4 text-[10px] tracking-[0.4em] text-[#9A8262] uppercase flex items-center justify-center space-x-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <span>DIFFERENT CREWS</span>
        <span className="text-[#D4AF37] filter drop-shadow-[0_0_4px_#D4AF37]">✦</span>
        <span>SAME HORIZON</span>
      </footer>

      {!embedded && <ContactFooter />}
    </div>
  );
}