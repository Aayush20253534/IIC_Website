import React from "react";
import { Link } from "react-router-dom";

export default function ContactFooter() {
  return (
    <footer className="bg-[#02060D] border-t border-[#C5A25F]/20 py-12 px-6 text-[#94A3B8]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-xs font-montserrat">
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
            <Link to="/" className="hover:text-[#C5A25F]">Home</Link>
            <Link to="/events" className="hover:text-[#C5A25F]">Events</Link>
            <Link to="/register" className="hover:text-[#C5A25F]">Register</Link>
            <Link to="/dashboard" className="hover:text-[#C5A25F]">Dashboard</Link>
            <Link to="/teams" className="hover:text-[#C5A25F]">Teams</Link>
            <Link to="/sponsors" className="hover:text-[#C5A25F]">Sponsors</Link>
            <Link to="/gallery" className="hover:text-[#C5A25F]">Gallery</Link>
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

      <div className="max-w-6xl mx-auto pt-6 border-t border-[#C5A25F]/10 text-center text-[11px] font-mono">
        <p>© 2026 Renaissance (10th Edition) • E-Cell MNNIT Allahabad</p>
      </div>
    </footer>
  );
}
