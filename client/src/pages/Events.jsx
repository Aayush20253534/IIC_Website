import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS_DATA } from "../data/eventsData";
import ContactFooter from "../components/ContactFooter";
import WaterButton from "../components/WaterButton";

export default function Events({ embedded = false }) {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Technical", "Flagship", "Management", "Design"];

  const filtered =
    category === "All"
      ? EVENTS_DATA
      : EVENTS_DATA.filter((e) => e.category === category);

  return (
    <div className={`${embedded ? "py-16" : "min-h-screen pt-28 pb-12"} bg-transparent text-[#F4EBD9] flex flex-col justify-between`}>
      <div className="max-w-6xl mx-auto px-6 w-full mb-16">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#C5A25F] bg-[#0A192F] border border-[#C5A25F]/30 uppercase mb-3 font-semibold">
            Competitions & Dockets
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold mb-3">
            Summit Events
          </h1>
          <div className="w-16 h-[2px] bg-[#C5A25F] mx-auto mb-4" />
          <p className="font-montserrat text-sm font-semibold text-[#94A3B8]">
            Browse all competitions, hackathons, and case study challenges.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-montserrat uppercase transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(197,162,95,0.28)] ${
                category === cat
                  ? "bg-[#C5A25F] text-[#050B14] font-bold"
                  : "bg-[#0A192F] text-[#94A3B8] border border-[#C5A25F]/20 hover:border-[#C5A25F]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="events-glass-grid grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="event-glass-card p-6 flex flex-col justify-between transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono text-[#0EA5E9] font-bold uppercase block mb-1">
                  {event.category} • {event.eventType}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#F4EBD9] mb-2">
                  {event.name}
                </h3>
                <p className="font-montserrat text-xs text-[#94A3B8] mb-6 font-light leading-relaxed">
                  {event.description}
                </p>
              </div>

              <WaterButton
                onClick={() => navigate(`/events/${event.id}/register`)}
                variant="primary"
                className="w-full !px-4 !py-2 text-xs"
              >
                Register
              </WaterButton>
            </div>
          ))}
        </div>
      </div>

      {!embedded && <ContactFooter />}
    </div>
  );
}
