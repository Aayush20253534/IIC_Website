import React, { useState } from "react";
import { getStoredProfile, saveStoredProfile, getStoredTeams, getStoredRegistrations } from "../utils/mockStore";
import ContactFooter from "../components/ContactFooter";

export default function Dashboard({ embedded = false }) {
  const [profile, setProfile] = useState(getStoredProfile());
  const [teams] = useState(getStoredTeams());
  const [registrations] = useState(getStoredRegistrations());
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveStoredProfile(profile);
    setIsEditing(false);
    alert("Profile saved successfully!");
  };

  return (
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-[#050B14] text-[#F4EBD9] flex flex-col justify-between`}>
      <div className="max-w-5xl mx-auto px-6 w-full mb-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C5A25F]/20">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/30 uppercase mb-2 font-semibold">
              Participant Docket
            </span>
            <h1 className="font-cinzel text-3xl font-bold mb-1">User Dashboard</h1>
            <p className="font-mono text-xs text-[#94A3B8]">ID: {profile.studentId} • {profile.collegeName}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-lg border border-[#C5A25F] text-[#C5A25F] font-montserrat text-xs font-bold uppercase cursor-pointer hover:bg-[#C5A25F] hover:text-[#050B14] transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Details Form */}
        <div className="p-6 rounded-xl bg-[#0A192F]/40 border border-[#C5A25F]/20 mb-8">
          <h3 className="font-cinzel text-lg font-bold text-[#C5A25F] mb-4">Profile Information</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#94A3B8] mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-[#050B14] border border-[#D4AF37]/20 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-[#050B14] border border-[#D4AF37]/20 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-[#050B14] border border-[#D4AF37]/20 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-[#94A3B8] mb-1">Registration No.</label>
              <input
                type="text"
                name="studentId"
                value={profile.studentId}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-[#050B14] border border-[#D4AF37]/20 rounded px-3 py-2 text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[#94A3B8] mb-1">College</label>
              <input
                type="text"
                name="collegeName"
                value={profile.collegeName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-[#050B14] border border-[#D4AF37]/20 rounded px-3 py-2 text-white"
              />
            </div>
            {isEditing && (
              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-[#D4AF37] text-[#050B14] font-bold uppercase"
                >
                  Save Profile
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Registrations & Teams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#0A192F]/40 border border-[#C5A25F]/20">
            <h3 className="font-cinzel text-lg font-bold text-[#F4EBD9] mb-4">
              Registered Events ({registrations.length})
            </h3>
            <div className="space-y-3">
              {registrations.map((r, i) => (
                <div key={i} className="p-3 bg-[#050B14] rounded border border-[#C5A25F]/15 flex justify-between text-xs">
                  <span>{r.eventName}</span>
                  <span className="text-[#0EA5E9] font-mono font-bold">{r.type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0A192F]/40 border border-[#C5A25F]/20">
            <h3 className="font-cinzel text-lg font-bold text-[#F4EBD9] mb-4">
              My Teams ({teams.length})
            </h3>
            <div className="space-y-3">
              {teams.map((t, i) => (
                <div key={i} className="p-3 bg-[#050B14] rounded border border-[#C5A25F]/15 flex justify-between text-xs">
                  <div>
                    <span className="font-bold block">{t.name}</span>
                    <span className="text-[10px] text-[#94A3B8]">{t.eventName}</span>
                  </div>
                  <span className="text-[#C5A25F] font-mono font-bold">{t.teamCode}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
