import React, { useState } from "react";

export default function EventTimeline() {
  const [day, setDay] = useState(1);

  const schedule = {
    1: [
      { time: "09:30 AM", title: "Inaugural Ceremony", venue: "Auditorium" },
      { time: "11:30 AM", title: "Keynote Session 1", venue: "Auditorium" },
      { time: "02:00 PM", title: "Event 1 Kickoff", venue: "MNNIT Campus" },
    ],
    2: [
      { time: "10:00 AM", title: "Event 2 Rounds", venue: "Seminar Hall" },
      { time: "02:00 PM", title: "Pitching Sessions", venue: "Auditorium" },
      { time: "05:00 PM", title: "Workshop / Masterclass", venue: "Hall 1" },
    ],
    3: [
      { time: "10:30 AM", title: "Event 3 Finals", venue: "Campus Venue" },
      { time: "04:00 PM", title: "Valedictory & Awards", venue: "Auditorium" },
    ],
  };

  return (
    <section className="py-20 px-6 bg-[#050B14]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-cinzel text-3xl font-bold text-[#f3e5ab] mb-2">
            Timeline
          </h2>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto" />
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-6 py-2 rounded-lg font-montserrat text-xs uppercase font-bold transition-all cursor-pointer ${
                day === d
                  ? "bg-[#D4AF37] text-[#050B14]"
                  : "bg-[#0A192F] text-[#94A3B8] border border-[#D4AF37]/20"
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {schedule[day].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0A192F]/50 border border-[#D4AF37]/20 flex items-center justify-between"
            >
              <div>
                <h4 className="font-montserrat font-bold text-sm text-[#f3e5ab]">
                  {item.title}
                </h4>
                <span className="text-xs text-[#94A3B8] font-mono">{item.venue}</span>
              </div>
              <span className="text-xs font-mono text-[#D4AF37] font-bold">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
