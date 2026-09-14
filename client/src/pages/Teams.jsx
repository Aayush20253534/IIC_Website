import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import ContactFooter from "../components/ContactFooter";

// Replace this path with each member's photo when it is available.
const DUMMY_MEMBER_PHOTO = "/placeholder-speaker.svg";
const MAIN_SECTION_HEADING_CLASS =
  "group mx-auto mb-9 flex w-fit cursor-default flex-col items-center font-cinzel text-3xl font-bold tracking-[0.06em] text-[#166E94] sm:text-5xl";

const facultyIncharges = [
  {
    name: "Faculty Incharge 1",
    image_url: DUMMY_MEMBER_PHOTO,
    linkedin: "https://www.linkedin.com/in/faculty-incharge-1/",
  },
  {
    name: "Faculty Incharge 2",
    image_url: DUMMY_MEMBER_PHOTO,
    linkedin: "https://www.linkedin.com/in/faculty-incharge-2/",
  },
];

const finalYearMembers = Array.from({ length: 10 }, (_, index) => ({
  name: `Final Year Member ${index + 1}`,
  position: "Final Year",
  image_url: DUMMY_MEMBER_PHOTO,
  linkedin: `https://www.linkedin.com/in/final-year-member-${index + 1}/`,
}));

const thirdYearTeams = [
  "Web Team",
  "Marketing Team",
  "Design Team",
  "Content Team",
  "Video Team",
].map((teamName) => ({
  name: teamName,
  members: Array.from({ length: 10 }, (_, index) => ({
    name: `${teamName} Member ${index + 1}`,
    position: "Third Year",
    image_url: DUMMY_MEMBER_PHOTO,
    linkedin: `https://www.linkedin.com/in/${teamName
      .toLowerCase()
      .replace(/\s/g, "-")}-member-${index + 1}/`,
  })),
}));

const secondYearTeams = [
  "Web Team",
  "Marketing Team",
  "Design Team",
  "Content Team",
  "Video Team",
].map((teamName) => ({
  name: teamName,
  members: Array.from({ length: 10 }, (_, index) => ({
    name: `${teamName} Member ${index + 1}`,
    registration_no: `2024${String(index + 1).padStart(4, "0")}`,
    linkedin: `https://www.linkedin.com/in/second-year-${teamName
      .toLowerCase()
      .replace(/\s/g, "-")}-member-${index + 1}/`,
  })),
}));

const MemberCard = ({ member, compact = false }) => (
  <div className={`teams-member-card group relative rounded-2xl bg-[#FDF3DF] border border-[#78C8ED] hover:border-[#238BBB] shadow-[0_8px_22px_rgba(35,93,119,0.16)] hover:shadow-[0_12px_28px_rgba(35,93,119,0.22)] transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer ${compact ? "min-h-[210px] justify-center px-6 py-8" : "p-6"}`}>

    {!compact && (
      <div className="relative w-24 h-24 rounded-full p-1 bg-[#78C8ED] mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full rounded-full overflow-hidden bg-[#FDF3DF] p-0.5 border border-[#238BBB]">
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
    )}

    <h3 className={`font-cinzel font-bold text-[#173F56] mb-1.5 tracking-wide group-hover:text-[#238BBB] transition-colors ${compact ? "text-lg" : "text-sm sm:text-base"}`}>
      {member.name}
    </h3>

    {!compact && member.position && (
      <p className="text-[11px] text-[#166E94] font-montserrat font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#C7EBFA] border border-[#78C8ED] shadow-sm">
        {member.position}
      </p>
    )}

    {compact && member.registration_no && (
      <p className="mt-4 text-xs font-montserrat font-semibold tracking-wider text-[#7A6A58] uppercase">
        Reg: {member.registration_no}
      </p>
    )}

    {member.team && (
      <p className="text-[10px] text-[#9A6B27] font-mono mt-2 tracking-widest uppercase">
        {member.team}
      </p>
    )}

    {member.linkedin && (
      <a
        href={member.linkedin}
        target="_blank"
        rel="noreferrer"
        className={`mt-3 inline-flex items-center justify-center gap-2 font-montserrat font-bold uppercase tracking-wider text-[#7A6A58] transition-colors hover:text-[#173F56] ${compact ? "w-full rounded-lg border border-[#D8C4A8] bg-[#F1E0C9] px-4 py-3 text-xs" : "text-[10px] underline underline-offset-4"}`}
      >
        <FaLinkedin className="text-base" aria-hidden="true" />
        <span>LinkedIn</span>
      </a>
    )}
  </div>
);

const ScrollingMemberRow = ({ members, label, compact = false }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="-mx-4 -my-6 overflow-hidden rounded-2xl px-4 py-6"
      aria-label={`Automatically scrolling ${label} members`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-max"
        style={{
          animation: "teams-member-scroll 36s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {[...members, ...members].map((member, index) => (
          <div
            key={`${member.name}-${index}`}
            className={`${compact ? "w-[372px]" : "w-[312px]"} shrink-0 pr-8`}
            aria-hidden={index >= members.length}
          >
            <MemberCard
              member={member}
              compact={compact}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Teams({ embedded = false }) {
  return (
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-[#F3E3C6] text-[#173F56] flex flex-col justify-between`}>
      <style>{`
        @keyframes teams-member-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .teams-member-card {
          transform: perspective(900px) translateZ(0);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .teams-member-card:hover {
          transform: perspective(900px) translateZ(36px) scale(1.025);
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-6 w-full mb-36">
        <div className="text-center mb-8 p-6 sm:p-8 rounded-3xl bg-[#8ED3F4] border border-[#238BBB] shadow-[0_10px_26px_rgba(35,93,119,0.2)] max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#173F56] bg-[#FDF3DF] border border-[#238BBB]/40 uppercase mb-3 font-semibold">
            The Organizing Guild
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#173F56] mb-2">The Team</h1>
          <div className="w-16 h-[2px] bg-[#9A6B27] mx-auto mb-4" />
          <p className="font-montserrat text-xs text-[#173F56]">Meet the people behind Renaissance 2026.</p>
        </div>

        <div className="space-y-14">
          <section aria-labelledby="faculty-incharge-heading">
            <h2
              id="faculty-incharge-heading"
              className={MAIN_SECTION_HEADING_CLASS}
            >
              <span className="transition-transform duration-300 group-hover:scale-105">Faculty Incharge</span>
              <span className="mt-3 h-1 w-24 rounded-full bg-[#78C8ED] transition-all duration-300 group-hover:w-[70%]" />
            </h2>
            <div className="flex justify-center gap-8 overflow-x-auto px-1 pb-2">
              {facultyIncharges.map((member) => (
                <div key={member.name} className="w-[280px] shrink-0">
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="final-year-heading">
            <h2
              id="final-year-heading"
              className={MAIN_SECTION_HEADING_CLASS}
            >
              <span className="transition-transform duration-300 group-hover:scale-105">Final Year</span>
              <span className="mt-3 h-1 w-24 rounded-full bg-[#78C8ED] transition-all duration-300 group-hover:w-[70%]" />
            </h2>
            <ScrollingMemberRow members={finalYearMembers} label="final year" />
          </section>

          <section aria-labelledby="third-year-heading">
            <h2
              id="third-year-heading"
              className={MAIN_SECTION_HEADING_CLASS}
            >
              <span className="transition-transform duration-300 group-hover:scale-105">Third Year</span>
              <span className="mt-3 h-1 w-24 rounded-full bg-[#78C8ED] transition-all duration-300 group-hover:w-[70%]" />
            </h2>
            <div className="space-y-10">
              {thirdYearTeams.map(({ name, members }) => (
                <div key={name}>
                  <h3 className="group mx-auto mb-14 flex w-fit cursor-default flex-col items-center font-cinzel text-lg font-bold uppercase tracking-[0.06em] text-[#173F56]">
                    <span className="transition-transform duration-300 group-hover:scale-105">{name}</span>
                    <span className="mt-2 h-0.5 w-12 rounded-full bg-[#78C8ED] transition-all duration-300 group-hover:w-[70%]" />
                  </h3>
                  <ScrollingMemberRow members={members} label={name} />
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="second-year-heading">
            <h2
              id="second-year-heading"
              className={MAIN_SECTION_HEADING_CLASS}
            >
              <span className="transition-transform duration-300 group-hover:scale-105">Second Year</span>
              <span className="mt-3 h-1 w-24 rounded-full bg-[#78C8ED] transition-all duration-300 group-hover:w-[70%]" />
            </h2>
            <div className="space-y-10">
              {secondYearTeams.map(({ name, members }) => (
                <div key={name}>
                  <h3 className="group mx-auto mb-14 flex w-fit cursor-default flex-col items-center font-cinzel text-lg font-bold uppercase tracking-[0.06em] text-[#173F56]">
                    <span className="transition-transform duration-300 group-hover:scale-105">{name}</span>
                    <span className="mt-2 h-0.5 w-12 rounded-full bg-[#78C8ED] transition-all duration-300 group-hover:w-[70%]" />
                  </h3>
                  <ScrollingMemberRow members={members} label={name} compact />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
