import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EVENTS_DATA } from "../data/eventsData";
import { getStoredProfile, getStoredTeams, saveStoredTeams, getStoredRegistrations, saveStoredRegistrations, generateTeamCode } from "../utils/mockStore";
import ContactFooter from "../components/ContactFooter";

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
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-[#050B14] text-[#F4EBD9] flex flex-col justify-between`}>
      <div className="max-w-4xl mx-auto px-6 w-full mb-16">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/30 uppercase mb-3 font-semibold">
            Registration Desk
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold mb-2">
            Summit Registration
          </h1>
          <div className="w-16 h-[2px] bg-[#C5A25F] mx-auto mb-4" />
          <p className="font-montserrat text-xs text-[#94A3B8]">
            Selected Challenge: <span className="text-[#C5A25F] font-semibold">{activeEvent.name}</span>
          </p>
        </div>

        {/* Event Selector */}
        <div className="p-4 rounded-xl bg-[#0A192F]/50 border border-[#D4AF37]/20 mb-8 flex items-center justify-between">
          <span className="text-xs font-montserrat text-[#94A3B8]">Select Event:</span>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-[#050B14] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs text-[#F4EBD9]"
          >
            {EVENTS_DATA.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>

        {/* 3 Simple Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Solo */}
          <div className="p-6 rounded-xl bg-[#0A192F]/40 border border-[#D4AF37]/20 flex flex-col justify-between">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#F4EBD9] mb-2">Solo Entry</h3>
              <p className="font-montserrat text-xs text-[#94A3B8] mb-6">
                Register as {profile.name}.
              </p>
            </div>
            <button
              onClick={handleSoloRegister}
              className="w-full py-2.5 rounded-lg bg-[#0EA5E9] text-[#050B14] font-montserrat text-xs font-bold uppercase cursor-pointer"
            >
              Register Solo
            </button>
          </div>

          {/* Create Team */}
          <div className="p-6 rounded-xl bg-[#0A192F]/40 border border-[#D4AF37]/20 flex flex-col justify-between">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#D4AF37] mb-2">Create Team</h3>
              {!generatedCode ? (
                <form onSubmit={handleCreateCrew} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Team Name..."
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                    className="w-full bg-[#050B14] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#D4AF37] text-[#050B14] font-montserrat text-xs font-bold uppercase cursor-pointer"
                  >
                    Generate Code
                  </button>
                </form>
              ) : (
                <div className="text-center p-3 bg-[#050B14] rounded-lg border border-[#D4AF37]">
                  <span className="text-[10px] text-[#94A3B8] block">Team Code:</span>
                  <span className="font-mono text-xl text-[#D4AF37] font-bold">{generatedCode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Join Team */}
          <div className="p-6 rounded-xl bg-[#0A192F]/40 border border-[#D4AF37]/20 flex flex-col justify-between">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#F4EBD9] mb-2">Join Team</h3>
              <form onSubmit={handleJoinCrew} className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter Code..."
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  required
                  className="w-full bg-[#050B14] border border-[#C5A25F]/30 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg border border-[#C5A25F] text-[#C5A25F] font-montserrat text-xs font-bold uppercase cursor-pointer hover:bg-[#C5A25F] hover:text-[#050B14] transition-colors"
                >
                  Join Team
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
