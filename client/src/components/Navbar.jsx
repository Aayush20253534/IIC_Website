import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { Compass, Anchor } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: Compass },
    { name: "Sponsors", path: "/sponsors", icon: Anchor },
    { name: "Events", path: "/events" },
    { name: "Teams", path: "/teams" },
    { name: "Gallery", path: "/gallery" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/udbhav";
    }
    return location.pathname.startsWith(path) || location.pathname.startsWith(`/udbhav${path}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-white/10 px-6 py-4">
      {/* Top Edge Ambient Marine Vignette Guard - Seamless Alpha Blend */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020610]/50 via-[#020610]/15 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* 10th Edition Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/renaissance-logo-clean.png"
            alt="Renaissance Logo"
            onError={(e) => {
              e.currentTarget.src = "/renaissance-logo-transparent.png";
            }}
            className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(56,189,248,0.3)]"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 px-6 py-2.5 rounded-full backdrop-blur-xl bg-[#030d1c]/80 border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.6)] font-light text-xs tracking-widest">
          {navLinks.map((link) => {
            const current = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all duration-200 cursor-pointer font-bold inline-flex items-center gap-1.5 ${
                  current
                    ? "text-[#38BDF8] drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 opacity-90" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center">
          <Link
            to="/register"
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-transparent hover:border-[#38BDF8]/60 hover:shadow-[0_0_16px_rgba(56,189,248,0.3)] text-xs font-montserrat font-bold tracking-wider text-[#F8FAFC] transition-all duration-200"
          >
            <span>SIGN IN</span>
            <span className="bg-white text-black rounded-full p-1 flex items-center justify-center w-5 h-5 shadow-sm">
              <FiArrowUpRight size={12} className="stroke-[3]" />
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F8FAFC] hover:text-[#38BDF8] p-2"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-white/15 flex flex-col gap-3 bg-[#030d1c]/95 backdrop-blur-2xl mt-3 rounded-2xl p-4 border shadow-2xl">
          {navLinks.map((link) => {
            const current = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 font-montserrat text-xs uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 ${
                  current ? "text-[#38BDF8] font-bold" : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 opacity-80" />}
                <span>{link.name}</span>
              </Link>
            );
          })}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="mt-2 text-center py-2.5 rounded-xl bg-[#38BDF8] text-[#020610] font-montserrat text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            SIGN IN
          </Link>
        </div>
      )}
    </nav>
  );
}
