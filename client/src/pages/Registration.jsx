import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EVENTS_DATA } from "../data/eventsData";
import { getStoredProfile, getStoredTeams, saveStoredTeams, getStoredRegistrations, saveStoredRegistrations, generateTeamCode } from "../utils/mockStore";

export default function Registration({ embedded = false }) {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [selectedEventId, setSelectedEventId] = useState(eventId || "event-1");
  const [profile] = useState(getStoredProfile());
  const [teams, setTeams] = useState(getStoredTeams());
  const [teamName, setTeamName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);

  const activeEvent = EVENTS_DATA.find((e) => e.id === selectedEventId) || EVENTS_DATA[0];



  const handleSoloRegister = () => {
    const regs = getStoredRegistrations();
    saveStoredRegistrations([
      { eventId: activeEvent.id, eventName: activeEvent.name, type: "Solo", registeredAt: "2026-03-20" },
      ...regs,
    ]);
    alert(`Registered solo for ${activeEvent.name}!`);
    if (!embedded) navigate("/dashboard");
  };

  const handleCreateCrew = (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    const code = generateTeamCode();
    const newTeam = {
      id: `team-${Date.now()}`,
      name: teamName.trim(),
      eventId: activeEvent.id,
      eventName: activeEvent.name,
      teamCode: code,
      leaderName: profile.name,
      members: [],
      status: "Registered",
    };
    saveStoredTeams([newTeam, ...teams]);
    setTeams([newTeam, ...teams]);
    setGeneratedCode(code);
    setTeamName("");
  };

  const handleJoinCrew = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    alert(`Joined team with code: ${joinCode.trim().toUpperCase()}`);
    if (!embedded) navigate("/dashboard");
  };

  return (
    <div className={`${embedded ? "py-4" : "min-h-[calc(100vh-4rem)] pt-18 pb-4"} bg-transparent text-[#1B120C] flex flex-col justify-center items-center overflow-hidden`}>
      <div className="max-w-4xl mx-auto px-3 sm:px-6 w-full relative flex flex-col justify-center my-auto">
        
        {/* Authentic Aged Wrinkled Pirate Scroll Frame */}
        <div className="relative flex flex-col items-center select-none">
          
          {/* Top Wooden Roller Dowel with Brass Finials */}
          <div className="w-[98%] sm:w-[99%] h-6 sm:h-7 bg-gradient-to-r from-[#201007] via-[#4a2814] to-[#201007] rounded-full shadow-[0_6px_14px_rgba(0,0,0,0.9)] border-y border-[#D4AF37]/70 flex items-center justify-between px-3 z-30 relative">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-[#FFE79A] via-[#D4AF37] to-[#78350F] shadow-sm border border-[#FDE68A]" />
            <div className="h-[2px] flex-1 mx-3 bg-[#D4AF37]/50" />
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-[#FFE79A] via-[#D4AF37] to-[#78350F] shadow-sm border border-[#FDE68A]" />
          </div>

          {/* Main Aged Wrinkled Parchment Body (Static Open) */}
          <div className="w-full bg-gradient-to-b from-[#F9EED9] via-[#EED4A2] to-[#DFBC86] text-[#1B120C] shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_0_60px_rgba(120,53,15,0.25)] border-x-[5px] border-[#78350F]/70 -my-1 py-5 sm:py-6 px-4 sm:px-8 z-20 relative rounded-sm overflow-hidden">
            {/* Antique Wrinkled Crease Shading & Burnt Deckle Watermark */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#2E1A0A_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Subtle Aged Parchment Crease Folds (CSS linear gradients) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/5 via-transparent to-black/5" />
            <div className="absolute top-1/3 inset-x-0 h-12 pointer-events-none bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.04]" />

            {/* Decree Content Layer */}
            <div className="relative z-10">
              {/* Header Decree Stamp */}
              <div className="text-center mb-4 pb-3 border-b-2 border-[#8C6239]/35">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[9px] font-mono tracking-[0.2em] text-[#78350F] bg-[#8C6239]/15 border border-[#8C6239]/40 uppercase mb-1 font-bold">
                  <span>⚓</span>
                  <span>Grand Voyage Manifest</span>
                  <span>⚓</span>
                </div>
                <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-[#241408] tracking-wide drop-shadow-sm">
                  Official Summit Enlistment
                </h1>
                <p className="font-montserrat text-[11px] sm:text-xs text-[#52341A] font-medium max-w-md mx-auto line-clamp-1">
                  Enter your name into the voyage ledger and chart your course for Renaissance 2026.
                </p>
              </div>

              {/* Compact Event Selector Banner */}
              <div className="p-2.5 sm:p-3 rounded-lg bg-[#FAF1DF]/90 border border-[#8C6239]/45 mb-4 flex flex-row items-center justify-between gap-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-cinzel font-bold text-[#241408]">Expedition Track:</span>
                  <span className="text-xs text-[#0284C7] font-semibold hidden sm:inline">{activeEvent.name}</span>
                </div>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="bg-[#FFF9EE] border border-[#8C6239]/70 rounded-md px-2.5 py-1 text-xs text-[#241408] font-montserrat font-bold shadow-inner focus:outline-none focus:border-[#0284C7]"
                >
                  {EVENTS_DATA.map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>

              {/* 3 Balanced Enlistment Action Columns (Viewport Fit) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                
                {/* 1. Solo Entry */}
                <div className="p-4 sm:p-4.5 rounded-xl bg-[#FFF9EE]/90 border border-[#8C6239]/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/40 flex items-center justify-center text-[#0284C7] font-cinzel font-black text-xs">
                        Ⅰ
                      </span>
                      <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#241408]">Solo Navigator</h3>
                    </div>
                    <p className="font-montserrat text-[11px] text-[#5C3A21] mb-3 leading-tight">
                      Enlist individually as <span className="font-bold text-[#1B120C]">{profile.name}</span>.
                    </p>
                  </div>
                  <button
                    onClick={handleSoloRegister}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-montserrat text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all shadow-sm active:scale-95"
                  >
                    Register Solo
                  </button>
                </div>

                {/* 2. Create Crew */}
                <div className="p-4 sm:p-4.5 rounded-xl bg-[#FFF9EE]/90 border border-[#C5A25F]/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#D4AF37]/25 border border-[#D4AF37]/60 flex items-center justify-center text-[#78350F] font-cinzel font-black text-xs">
                        Ⅱ
                      </span>
                      <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#78350F]">Found a Crew</h3>
                    </div>
                    
                    {!generatedCode ? (
                      <form onSubmit={handleCreateCrew} className="space-y-2">
                        <input
                          type="text"
                          placeholder="Enter Crew Name..."
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          required
                          className="w-full bg-[#FAF3E3] border border-[#8C6239]/50 rounded-md px-2.5 py-1.5 text-xs text-[#241408] placeholder-[#8C6239]/60 font-montserrat font-medium focus:outline-none focus:border-[#8C6239]"
                        />
                        <button
                          type="submit"
                          className="w-full py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A25F] hover:from-[#C5A25F] hover:to-[#B38F4D] text-[#1B120C] font-montserrat text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all shadow-sm active:scale-95"
                        >
                          Generate Code
                        </button>
                      </form>
                    ) : (
                      <div className="text-center p-2 bg-[#FAF1DF] rounded-md border-2 border-dashed border-[#8C6239]">
                        <span className="text-[9px] text-[#5C3A21] font-mono uppercase block font-semibold">Your Crew Code:</span>
                        <span className="font-mono text-base text-[#8C6239] font-extrabold tracking-wider">{generatedCode}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Join Crew */}
                <div className="p-4 sm:p-4.5 rounded-xl bg-[#FFF9EE]/90 border border-[#8C6239]/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#8C6239]/20 border border-[#8C6239]/40 flex items-center justify-center text-[#78350F] font-cinzel font-black text-xs">
                        Ⅲ
                      </span>
                      <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#241408]">Join a Crew</h3>
                    </div>

                    <form onSubmit={handleJoinCrew} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Enter Code (e.g. VOYAGE-89)..."
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                        required
                        className="w-full bg-[#FAF3E3] border border-[#8C6239]/50 rounded-md px-2.5 py-1.5 text-xs text-[#241408] placeholder-[#8C6239]/60 font-mono uppercase tracking-wider font-semibold focus:outline-none focus:border-[#8C6239]"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg border-2 border-[#8C6239] text-[#78350F] hover:bg-[#8C6239] hover:text-white font-montserrat text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all shadow-sm active:scale-95"
                      >
                        Join Crew
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Wooden Roller Dowel with Brass Finials (Static Open) */}
          <div className="w-[98%] sm:w-[99%] h-6 sm:h-7 bg-gradient-to-r from-[#201007] via-[#4a2814] to-[#201007] rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.9)] border-y border-[#D4AF37]/70 flex items-center justify-between px-3 z-30 relative">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-[#FFE79A] via-[#D4AF37] to-[#78350F] shadow-sm border border-[#FDE68A]" />
            <div className="h-[2px] flex-1 mx-3 bg-[#D4AF37]/50" />
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-[#FFE79A] via-[#D4AF37] to-[#78350F] shadow-sm border border-[#FDE68A]" />
          </div>

        </div>

        {/* Subtle Nautical Seal Footer Note */}
        <div className="text-center mt-3 text-[10px] font-mono text-[#C5A25F]/60 tracking-wider">
          ✦ RENAISSANCE SUMMIT • EXPEDITION DESK ✦
        </div>

      </div>
    </div>
  );
}


