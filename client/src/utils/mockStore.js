// Mock Store for 100% Standalone Localhost Operation

const PROFILE_KEY = "renaissance_user_profile";
const TEAMS_KEY = "renaissance_user_teams";
const REGISTRATIONS_KEY = "renaissance_user_registrations";

export const getStoredProfile = () => {
  const saved = localStorage.getItem(PROFILE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return {
    name: "Aditya Shrivastava",
    email: "aditya.2025@mnnit.ac.in",
    phone: "+91 9876543210",
    collegeName: "MNNIT Allahabad",
    studentId: "20253534",
    branch: "Computer Science & Engineering",
    year: "2",
    isMnnit: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  };
};

export const saveStoredProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getStoredTeams = () => {
  const saved = localStorage.getItem(TEAMS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return [
    {
      id: "team-1",
      name: "Black Pearl Fleet",
      eventId: "hack-18",
      eventName: "Hack 18",
      teamCode: "BPEARL",
      leaderName: "Aditya Shrivastava",
      members: [
        { name: "Ayush Shrivastava", regNo: "20253535", role: "Frontend Navigator" },
        { name: "Rishav Kumar", regNo: "20253536", role: "Backend Gunner" }
      ],
      status: "Verified & Confirmed"
    }
  ];
};

export const saveStoredTeams = (teams) => {
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
};

export const getStoredRegistrations = () => {
  const saved = localStorage.getItem(REGISTRATIONS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return [
    {
      eventId: "hack-18",
      eventName: "Hack 18",
      type: "Team",
      teamName: "Black Pearl Fleet",
      registeredAt: "2026-03-20"
    },
    {
      eventId: "crypto-hunt",
      eventName: "Pirate's Cryptic Hunt",
      type: "Solo",
      registeredAt: "2026-03-21"
    }
  ];
};

export const saveStoredRegistrations = (regs) => {
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(regs));
};

export const generateTeamCode = () => {
  const words = ["CORSAIR", "PEARL", "KRAKEN", "VOYAGE", "COMPASS", "GALLEON", "ANCHOR", "TREASURE"];
  const word = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(10 + Math.random() * 90);
  return `${word}${num}`;
};
