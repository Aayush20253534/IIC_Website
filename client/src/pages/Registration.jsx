import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Users, UserPlus, Sparkles, CheckCircle2, Shield } from "lucide-react";
import { EVENTS_DATA } from "../data/eventsData";
import {
  generateTeamCode,
  getStoredProfile,
  getStoredRegistrations,
  getStoredTeams,
  saveStoredRegistrations,
  saveStoredTeams,
} from "../utils/mockStore";

export default function Registration({ embedded = false }) {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [selectedEventId, setSelectedEventId] = useState(
    eventId || "event-1"
  );
  const [profile] = useState(getStoredProfile());
  const [teams, setTeams] = useState(getStoredTeams());
  const [teamName, setTeamName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [activeTab, setActiveTab] = useState("solo"); // "solo" | "create" | "join"

  const activeEvent =
    EVENTS_DATA.find((event) => event.id === selectedEventId) ||
    EVENTS_DATA[0];

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

    alert(`Successfully registered solo for ${activeEvent.name}!`);

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

  const handleEventChange = (event) => {
    setSelectedEventId(event.target.value);
    setGeneratedCode(null);
  };

  return (
    <div
      className={`${
        embedded ? "py-6" : "min-h-screen pt-24 pb-16"
      } bg-transparent text-white flex flex-col justify-center items-center relative overflow-hidden`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto">
        {/* Sleek Glassmorphic Oceanic Manifest Card */}
        <div className="relative rounded-3xl border border-[#38BDF8]/30 bg-[#040f21]/85 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] shadow-[0_0_30px_rgba(56,189,248,0.15)] overflow-hidden">
          {/* Header Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent" />

          {/* Title Header */}
          <div className="text-center mb-8 pb-6 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#38BDF8]/40 bg-[#04142b]/80 text-[#38BDF8] text-xs font-mono uppercase tracking-widest mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Official Expedition Ledger</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Summit Enlistment
            </h1>

            <p className="text-xs sm:text-sm text-[#94A3B8] font-light max-w-md mx-auto mt-2">
              Chart your course for Renaissance 2026. Register solo or form your voyage crew.
            </p>
          </div>

          {/* Track / Event Selector */}
          <div className="p-4 rounded-2xl bg-[#020713]/80 border border-white/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                <Navigation className="w-4 h-4 -rotate-45" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#38BDF8]">
                  Select Target Challenge
                </span>
                <h3 className="text-sm font-semibold text-white">
                  {activeEvent.name}
                </h3>
              </div>
            </div>

            <select
              value={selectedEventId}
              onChange={handleEventChange}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#040f21] border border-white/15 text-xs text-[#E2E8F0] font-mono focus:outline-none focus:border-[#38BDF8] cursor-pointer"
            >
              {EVENTS_DATA.map((event) => (
                <option key={event.id} value={event.id} className="bg-[#040f21] text-white">
                  {event.name} ({event.category})
                </option>
              ))}
            </select>
          </div>

          {/* Registration Mode Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#020713]/80 border border-white/10 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("solo")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "solo"
                  ? "bg-[#38BDF8] text-[#020610] shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Solo Navigator</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "create"
                  ? "bg-[#38BDF8] text-[#020610] shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Crew</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("join")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "join"
                  ? "bg-[#38BDF8] text-[#020610] shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Join Crew</span>
            </button>
          </div>

          {/* Mode Tab Content */}
          <div className="space-y-6">
            {/* Solo Registration */}
            {activeTab === "solo" && (
              <div className="p-6 rounded-2xl bg-[#020713]/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Solo Entry Manifest
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Enlist individually as a single voyager for {activeEvent.name}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSoloRegister}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#38BDF8] to-sky-400 text-[#020610] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all cursor-pointer shrink-0"
                >
                  Enlist Solo Now
                </button>
              </div>
            )}

            {/* Create Crew */}
            {activeTab === "create" && (
              <form onSubmit={handleCreateCrew} className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#020713]/60 border border-white/10 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#38BDF8] uppercase tracking-wider mb-2">
                      Voyage Crew Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mariana Pioneers"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#040f21] border border-white/15 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#38BDF8] to-sky-400 text-[#020610] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all cursor-pointer"
                  >
                    Commission New Crew
                  </button>

                  {generatedCode && (
                    <div className="mt-4 p-4 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                        <span className="text-xs text-white">Crew Code Generated:</span>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#38BDF8] bg-[#020713] px-3 py-1 rounded-lg border border-[#38BDF8]/30">
                        {generatedCode}
                      </span>
                    </div>
                  )}
                </div>
              </form>
            )}

            {/* Join Crew */}
            {activeTab === "join" && (
              <form onSubmit={handleJoinCrew} className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#020713]/60 border border-white/10 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#38BDF8] uppercase tracking-wider mb-2">
                      Enter Crew Access Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. REN-9X42"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#040f21] border border-white/15 text-sm text-white font-mono placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] uppercase"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#38BDF8] to-sky-400 text-[#020610] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all cursor-pointer"
                  >
                    Join Existing Crew
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}