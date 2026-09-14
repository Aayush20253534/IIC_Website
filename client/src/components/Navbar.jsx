import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sponsors", path: "/sponsors" },
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
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 sm:py-6 pointer-events-none">
      {/* Top Edge Light Ambient Vignette */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F4EBD9]/90 via-[#F4EBD9]/50 to-transparent pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative group pointer-events-auto">
          {/* Soft glow behind the logo for contrast */}
          <div className="absolute inset-0 bg-[#F4EBD9]/40 blur-xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative bg-[#F4EBD9] px-4 py-2 rounded-xl sm:rounded-2xl border border-[#C5A25F]/40 shadow-lg group-hover:shadow-[#C5A25F]/20 transition-all flex items-center justify-center">
            <img 
              src="/renaissance_logo_cropped.png" 
              alt="Renaissance Logo" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-[#F4EBD9]/80 backdrop-blur-md border border-[#C5A25F]/20 shadow-lg shadow-[#0A2239]/5 pointer-events-auto">
          {navLinks.map((link) => {
            const current = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  current
                    ? "font-bold text-[#0A2239]"
                    : "text-[#4A6B7C] hover:text-[#B47A32]"
                }`}
              >
                {link.name}
                {current && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C89B53] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center pointer-events-auto">
          <Link
            to="/register"
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#0A2239] text-[#0A2239] hover:bg-[#0A2239] hover:text-[#F4EBD9] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <span>SIGN IN</span>
            <span className="bg-[#0A2239] group-hover:bg-[#F4EBD9] text-[#F4EBD9] group-hover:text-[#0A2239] rounded-full p-1 flex items-center justify-center w-5 h-5 transition-colors">
              <FiArrowUpRight size={12} className="stroke-[3]" />
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#0A2239] hover:text-[#B47A32] p-2 bg-[#F4EBD9]/80 backdrop-blur-md rounded-full border border-[#C5A25F]/20 shadow-sm pointer-events-auto transition-colors"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden pt-6 pb-4 border border-[#C5A25F]/20 flex flex-col gap-4 bg-[#F4EBD9]/95 backdrop-blur-xl mt-4 rounded-3xl p-6 shadow-2xl pointer-events-auto mx-6">
          {navLinks.map((link) => {
            const current = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`relative px-4 py-2 font-mono text-xs uppercase tracking-widest cursor-pointer flex items-center ${
                  current ? "text-[#0A2239] font-bold" : "text-[#4A6B7C] hover:text-[#B47A32]"
                }`}
              >
                {current && <span className="absolute left-0 w-1.5 h-1.5 bg-[#C89B53] rounded-full"></span>}
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="mt-4 text-center py-3 rounded-full border-2 border-[#0A2239] bg-transparent hover:bg-[#0A2239] text-[#0A2239] hover:text-[#F4EBD9] font-mono text-xs font-bold uppercase tracking-widest transition-colors"
          >
            SIGN IN
          </Link>
        </div>
      )}
    </nav>
  );
}
