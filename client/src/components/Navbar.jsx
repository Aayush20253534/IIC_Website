import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Register", path: "/register" },
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
    <nav className="fixed top-0 left-0 right-0 z-50 border-[#C5A25F]/20 px-6 py-4">
      {/* Top Edge Ambient Marine Vignette Guard */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020610] via-[#020610]/70 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/renaissance-logo.png" alt="Renaissance Logo" className="h-9 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 px-6 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg font-light text-xs tracking-widest">
          {navLinks.map((link) => {
            const current = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors cursor-pointer font-bold ${
                  current
                    ? "text-[#C5A25F]"
                    : "text-[#94A3B8] hover:text-[#F4EBD9]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center">
          <Link
            to="/register"
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 hover:bg-[#0A192F] text-xs font-montserrat font-bold tracking-wider text-[#F4EBD9] transition-all duration-200 hover:border-[#C5A25F]/50"
          >
            <span>SIGN IN</span>
            <span className="bg-white text-black rounded-full p-1 flex items-center justify-center w-5 h-5">
              <FiArrowUpRight size={12} className="stroke-[3]" />
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F4EBD9] hover:text-[#C5A25F] p-2"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-[#C5A25F]/20 flex flex-col gap-3 bg-[#050B14]/95 backdrop-blur-xl mt-3 rounded-2xl p-4 border">
          {navLinks.map((link) => {
            const current = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 font-montserrat text-xs uppercase tracking-wider cursor-pointer ${
                  current ? "text-[#C5A25F] font-bold" : "text-[#94A3B8] hover:text-[#F4EBD9]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="mt-2 text-center py-2.5 rounded-xl bg-[#C5A25F] text-[#050B14] font-montserrat text-xs font-bold uppercase tracking-wider"
          >
            SIGN IN
          </Link>
        </div>
      )}
    </nav>
  );
}
