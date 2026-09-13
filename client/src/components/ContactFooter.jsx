import React from "react";
import { Link } from "react-router-dom";

export default function ContactFooter() {
  return (
    <footer className="relative z-30 bg-[#020610] border-t border-[#C5A25F]/20 pt-16 pb-12 px-6 text-[#94A3B8] shadow-[0_1000px_0_1000px_#020610,0_-20px_60px_rgba(0,0,0,0.95)]">
      {/* Extended Seamless Ocean-to-Solid Gradient Transition Guard */}
      <div className="absolute -top-36 left-0 right-0 h-36 bg-gradient-to-b from-transparent via-[#020610]/80 to-[#020610] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-xs font-montserrat relative z-10">
        <div>
          <h4 className="font-cinzel text-sm font-bold text-[#F4EBD9] mb-3">
            Renaissance 2026
          </h4>
          <p className="leading-relaxed">
            The 10th Edition Annual Entrepreneurship Summit of MNNIT Allahabad.
          </p>
        </div>

        <div>
          <h4 className="font-cinzel text-sm font-bold text-[#F4EBD9] mb-3">
            Navigation
          </h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-[#C5A25F] transition-colors">Home</Link>
            <Link to="/events" className="hover:text-[#C5A25F] transition-colors">Events</Link>
            <Link to="/register" className="hover:text-[#C5A25F] transition-colors">Register</Link>
            <Link to="/dashboard" className="hover:text-[#C5A25F] transition-colors">Dashboard</Link>
            <Link to="/teams" className="hover:text-[#C5A25F] transition-colors">Teams</Link>
            <Link to="/sponsors" className="hover:text-[#C5A25F] transition-colors">Sponsors</Link>
            <Link to="/gallery" className="hover:text-[#C5A25F] transition-colors">Gallery</Link>
          </div>
        </div>

        <div>
          <h4 className="font-cinzel text-sm font-bold text-[#F4EBD9] mb-3">
            Contact
          </h4>
          <p>E-Cell, MNNIT Allahabad, Prayagraj - 211004</p>
          <p className="mt-2 text-[#C5A25F] font-mono">ecell@mnnit.ac.in</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-[#C5A25F]/10 text-center text-[11px] font-mono relative z-10">
        <p>© 2026 Renaissance (10th Edition) • E-Cell MNNIT Allahabad</p>
      </div>
    </footer>
  );
}
