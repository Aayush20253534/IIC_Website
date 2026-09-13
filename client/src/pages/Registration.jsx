import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EVENTS_DATA } from "../data/eventsData";
import {
  getStoredProfile,
  getStoredTeams,
  saveStoredTeams,
  getStoredRegistrations,
  saveStoredRegistrations,
  generateTeamCode,
} from "../utils/mockStore";
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

  const activeEvent =
    EVENTS_DATA.find((event) => event.id === selectedEventId) || EVENTS_DATA[0];

  const handleSoloRegister = () => {
    const registrations = getStoredRegistrations();

    saveStoredRegistrations([
      {
        eventId: activeEvent.id,
        eventName: activeEvent.name,
        type: "Solo",
        registeredAt: "2026-03-20",
      },
      ...registrations,
    ]);

    alert(`Registered solo for ${activeEvent.name}!`);

    if (!embedded) {
      navigate("/dashboard");
    }
  };

  const handleCreateCrew = (event) => {
    event.preventDefault();

    if (!teamName.trim()) {
      return;
    }

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

    const updatedTeams = [newTeam, ...teams];

    saveStoredTeams(updatedTeams);
    setTeams(updatedTeams);
    setGeneratedCode(code);
    setTeamName("");
  };

  const handleJoinCrew = (event) => {
    event.preventDefault();

    if (!joinCode.trim()) {
      return;
    }

    alert(`Joined team with code: ${joinCode.trim().toUpperCase()}`);

    if (!embedded) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className={`${
        embedded ? "py-16" : "min-h-screen pt-28 pb-12"
      } bg-transparent text-[#F4EBD9] flex flex-col justify-between`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full mb-16">
        <div className="text-center mb-8 p-6 sm:p-8 rounded-3xl bg-[#020610]/80 backdrop-blur-xl border border-[#C5A25F]/25 shadow-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#041021] border border-[#C5A25F]/30 uppercase mb-3 font-semibold">
            Registration Desk
          </span>

          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Summit Registration
          </h1>

          <div className="w-16 h-[2px] bg-[#C5A25F] mx-auto mb-4" />

          <p className="font-montserrat text-xs text-[#E2E8F0] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Selected Challenge:{" "}
            <span className="text-[#C5A25F] font-semibold">
              {activeEvent.name}
            </span>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#041021]/85 backdrop-blur-xl border border-[#D4AF37]/30 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xl">
          <span className="text-xs font-montserrat text-[#E2E8F0] font-medium">
            Select Event:
          </span>

          <select
            value={selectedEventId}
            onChange={(event) => {
              setSelectedEventId(event.target.value);
              setGeneratedCode(null);
            }}
            className="w-full sm:w-auto bg-[#020610] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-xs text-[#F4EBD9] outline-none focus:border-[#D4AF37]/80"
          >
            {EVENTS_DATA.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 rounded-2xl bg-[#041021]/85 backdrop-blur-xl border border-[#D4AF37]/30 shadow-xl flex flex-col justify-between min-h-[250px] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/55 hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#F4EBD9] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Solo Entry
              </h3>

              <p className="font-montserrat text-xs text-[#94A3B8] leading-relaxed">
                Register as{" "}
                <span className="font-semibold text-[#F4EBD9]">
                  {profile.name}
                </span>{" "}
                for {activeEvent.name}.
              </p>
            </div>

            <button
              onClick={handleSoloRegister}
              className="w-full py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-montserrat text-xs font-bold uppercase cursor-pointer transition-colors shadow-lg"
            >
              Register Solo
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#041021]/85 backdrop-blur-xl border border-[#D4AF37]/30 shadow-xl flex flex-col justify-between min-h-[250px] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/55 hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#D4AF37] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Create Team
              </h3>

              <p className="font-montserrat text-xs text-[#94A3B8] leading-relaxed mb-5">
                Create a new crew and share the generated code with your
                teammates.
              </p>
            </div>

            {!generatedCode ? (
              <form onSubmit={handleCreateCrew} className="space-y-3">
                <input
                  type="text"
                  placeholder="Team Name..."
                  value={teamName}
                  onChange={(event) => setTeamName(event.target.value)}
                  required
                  className="w-full bg-[#020610] border border-[#D4AF37]/40 rounded-lg px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-500 focus:border-[#D4AF37]/80"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#B8952B] text-[#020610] font-montserrat text-xs font-bold uppercase cursor-pointer transition-colors shadow-lg"
                >
                  Generate Code
                </button>
              </form>
            ) : (
              <div className="rounded-xl border border-[#D4AF37]/55 bg-[#020610]/80 p-4 text-center shadow-inner shadow-black/20">
                <span className="text-[10px] text-[#94A3B8] block mb-1">
                  Team Code:
                </span>

                <span className="font-mono text-xl text-[#D4AF37] font-bold tracking-widest">
                  {generatedCode}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-[#041021]/85 backdrop-blur-xl border border-[#D4AF37]/30 shadow-xl flex flex-col justify-between min-h-[250px] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/55 hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-[#F4EBD9] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Join Team
              </h3>

              <p className="font-montserrat text-xs text-[#94A3B8] leading-relaxed mb-5">
                Enter a valid crew code to join an existing team for this
                challenge.
              </p>
            </div>

            <form onSubmit={handleJoinCrew} className="space-y-3">
              <input
                type="text"
                placeholder="Enter Code..."
                value={joinCode}
                onChange={(event) => setJoinCode(event.target.value)}
                required
                className="w-full bg-[#020610] border border-[#D4AF37]/40 rounded-lg px-3 py-2.5 text-xs font-mono uppercase text-white outline-none placeholder:text-slate-500 focus:border-[#D4AF37]/80"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg border border-[#C5A25F]/75 bg-[#0A192F]/50 text-[#C5A25F] hover:bg-[#C5A25F] hover:text-[#050B14] font-montserrat text-xs font-bold uppercase cursor-pointer transition-colors"
              >
                Join Team
              </button>
            </form>
          </div>
        </div>
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
