import { useState } from "react";
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
    <div className={`${embedded ? "py-20" : "min-h-screen pt-32 pb-20"} bg-transparent text-[#F4EBD9] flex flex-col justify-between`}>
      <div className="mx-auto mb-20 w-full max-w-5xl px-6">
        <div className="mb-12 text-center sm:mb-14">
          <span className="mb-5 inline-block rounded-full border border-[#C5A25F]/40 bg-[#0A192F]/35 px-4 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#C5A25F] shadow-[0_8px_30px_rgba(3,24,46,0.25)] backdrop-blur-xl">
            Registration Desk
          </span>
          <h1 className="mb-4 font-cinzel text-3xl font-bold sm:text-4xl">
            Summit Registration
          </h1>
          <div className="mx-auto mb-5 h-[2px] w-16 bg-[#C5A25F]" />
          <p className="font-montserrat text-xs  font-semibold text-[#94A3B8] sm:text-sm">
            Selected Challenge: <span className="text-[#C5A25F] font-semibold">{activeEvent.name}</span>
          </p>
        </div>

        {/* Event Selector */}
        <div className="registration-hover-card mb-10 flex flex-col gap-4 rounded-2xl border border-white/15 bg-[#0A192F]/30 p-7 shadow-[0_12px_36px_rgba(3,24,46,0.28)] backdrop-blur-xl sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-montserrat text-sm  font-semibold text-[#94A3B8]">Select Event:</span>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-white/55 bg-[#050B14]/35 px-5 py-3.5 text-base font-medium text-[#F4EBD9] shadow-inner shadow-black/20 backdrop-blur-md sm:w-auto sm:min-w-[390px]"
          >
            {EVENTS_DATA.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>

        {/* 3 Simple Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Solo */}
          <div className="registration-hover-card relative flex min-h-[265px] flex-col rounded-2xl border border-white/15 bg-[#0A192F]/30 p-7 shadow-[0_14px_38px_rgba(3,24,46,0.3)] backdrop-blur-xl hover:border-[#D4AF37]/45">
            <h3 className="mb-4 text-center font-cinzel text-lg font-bold text-[#F4EBD9]">Solo Entry</h3>
            <div className="flex flex-1 flex-col">
              <p className="absolute inset-x-7 top-1/2 -translate-y-1/2 text-center font-montserrat text-xs leading-relaxed text-[#94A3B8]">
                Register as <span className="font-bold text-[#F4EBD9]">{profile.name}</span>.
              </p>
              <button
                onClick={handleSoloRegister}
                className="absolute inset-x-7 bottom-7 cursor-pointer rounded-lg bg-[#0EA5E9] py-3 font-montserrat text-xs font-bold uppercase text-[#050B14] shadow-lg shadow-sky-950/30"
              >
                Register Solo
              </button>
            </div>
          </div>

          {/* Create Team */}
          <div className="registration-hover-card relative flex min-h-[265px] flex-col rounded-2xl border border-white/15 bg-[#0A192F]/30 p-7 shadow-[0_14px_38px_rgba(3,24,46,0.3)] backdrop-blur-xl hover:border-[#D4AF37]/45">
            <h3 className="mb-4 text-center font-cinzel text-lg font-bold text-[#D4AF37]">Create Team</h3>
            <div className="flex flex-1 flex-col">
              {!generatedCode ? (
                <form onSubmit={handleCreateCrew}>
                  <input
                    type="text"
                    placeholder="Team Name..."
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                    className="absolute inset-x-7 top-1/2 -translate-y-1/2 rounded-lg border border-white/15 bg-[#050B14]/35 px-3 py-2.5 text-xs text-white shadow-inner shadow-black/20 backdrop-blur-md"
                  />
                  <button
                    type="submit"
                    className="absolute inset-x-7 bottom-7 cursor-pointer rounded-lg bg-[#D4AF37] py-3 font-montserrat text-xs font-bold uppercase text-[#050B14] shadow-lg shadow-amber-950/25"
                  >
                    Generate Code
                  </button>
                </form>
              ) : (
                <div className="mt-auto rounded-xl border border-[#D4AF37]/55 bg-[#050B14]/30 p-4 text-center shadow-inner shadow-black/20 backdrop-blur-md">
                  <span className="text-[10px] text-[#94A3B8] block">Team Code:</span>
                  <span className="font-mono text-xl text-[#D4AF37] font-bold">{generatedCode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Join Team */}
          <div className="registration-hover-card relative flex min-h-[265px] flex-col rounded-2xl border border-white/15 bg-[#0A192F]/30 p-7 shadow-[0_14px_38px_rgba(3,24,46,0.3)] backdrop-blur-xl hover:border-[#D4AF37]/45">
            <h3 className="mb-4 text-center font-cinzel text-lg font-bold text-[#F4EBD9]">Join Team</h3>
            <div className="flex flex-1 flex-col">
              <form onSubmit={handleJoinCrew}>
                <input
                  type="text"
                  placeholder="Enter Code..."
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  required
                  className="absolute inset-x-7 top-1/2 -translate-y-1/2 rounded-lg border border-white/15 bg-[#050B14]/35 px-3 py-2.5 text-xs font-mono uppercase text-white shadow-inner shadow-black/20 backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="absolute inset-x-7 bottom-7 cursor-pointer rounded-lg border border-[#C5A25F]/75 bg-[#0A192F]/20 py-3 font-montserrat text-xs font-bold uppercase text-[#C5A25F] backdrop-blur-sm transition-colors hover:bg-[#C5A25F] hover:text-[#050B14]"
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
