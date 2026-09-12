import React, { useState } from "react";
import facultyData from "../data/faculty.json";
import fourthYear from "../data/fourth_year.json";
import thirdYear from "../data/third_year.json";
import secondYear from "../data/second_year.json";
import ContactFooter from "../components/ContactFooter";

const MemberCard = ({ member }) => (
  <div className="group relative p-6 rounded-2xl bg-[#0A192F]/40 backdrop-blur-xl border border-[#C5A25F]/20 hover:border-[#C5A25F]/60 shadow-[0_8px_32px_0_rgba(5,11,20,0.37)] hover:shadow-[0_0_25px_rgba(197,162,95,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer">

    <div className="absolute inset-0 bg-gradient-to-b from-[#C5A25F]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-b from-[#C5A25F]/50 to-[#0EA5E9]/30 mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
      <div className="w-full h-full rounded-full overflow-hidden bg-[#050B14] p-0.5 border border-[#050B14]">
        <img
          src={member.image_url || "/placeholder-speaker.svg"}
          alt={member.name}
          className="w-full h-full object-cover rounded-full filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          onError={(e) => {
            e.target.src = "/placeholder-speaker.svg";
          }}
        />
      </div>
    </div>

    <h3 className="font-cinzel font-bold text-sm sm:text-base text-[#F4EBD9] mb-1.5 tracking-wide group-hover:text-[#C5A25F] transition-colors">
      {member.name}
    </h3>

    {member.position && (
      <p className="text-[11px] text-[#0EA5E9] font-montserrat font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 shadow-sm">
        {member.position}
      </p>
    )}

    {member.team && (
      <p className="text-[10px] text-[#C5A25F] font-mono mt-2 tracking-widest uppercase">
        {member.team}
      </p>
    )}
  </div>
);

export default function Teams({ embedded = false }) {
  const [tab, setTab] = useState("faculty");

  const tabs = [
    { id: "faculty", label: "Faculty (Placeholder)" },
    { id: "fourth", label: "Final Year (Placeholder)" },
    { id: "third", label: "Third Year (Placeholder)" },
    { id: "second", label: "Second Year (Placeholder)" },
  ];

  return (
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-[#050B14] text-[#F4EBD9] flex flex-col justify-between`}>
      <div className="max-w-6xl mx-auto px-6 w-full mb-16">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/30 uppercase mb-3 font-semibold">
            The Organizing Guild
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold mb-2">The Team</h1>
          <div className="w-16 h-[2px] bg-[#C5A25F] mx-auto mb-4" />
          <p className="font-montserrat text-xs text-[#94A3B8]">The organizing committee behind Renaissance 2026 (Placeholders).</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-xs font-montserrat uppercase transition-all cursor-pointer ${tab === t.id
                  ? "bg-[#C5A25F] text-[#050B14] font-bold"
                  : "bg-[#0A192F] text-[#94A3B8] border border-[#C5A25F]/20"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "faculty" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {facultyData.faculty.map((m, i) => (
              <MemberCard key={i} member={m} />
            ))}
          </div>
        )}

        {tab === "fourth" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {fourthYear.fourth_year.map((m, i) => (
              <MemberCard key={i} member={m} />
            ))}
          </div>
        )}

        {tab === "third" && (
          <div className="space-y-8">
            {Object.entries(thirdYear.third_year).map(([teamName, members]) => (
              <div key={teamName}>
                <h3 className="font-cinzel text-lg font-bold text-[#0EA5E9] uppercase mb-4 text-center">
                  {teamName.replace("_", " ")}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {members.map((m, i) => (
                    <MemberCard key={i} member={m} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "second" && (
          <div className="space-y-8">
            {Object.entries(secondYear.second_year).map(([teamName, members]) => (
              <div key={teamName}>
                <h3 className="font-cinzel text-lg font-bold text-[#10B981] uppercase mb-4 text-center">
                  {teamName.replace("_", " ")}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {members.map((m, i) => (
                    <MemberCard key={i} member={m} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ContactFooter />
    </div>
  );
}
