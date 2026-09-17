import  { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { Compass, Anchor, Calendar, Users, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: Compass },
    { name: "Sponsors", path: "/sponsors", icon: Anchor },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Teams", path: "/teams", icon: Users },
    { name: "Gallery", path: "/gallery", icon: Image },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/udbhav";
    }
    return location.pathname.startsWith(path) || location.pathname.startsWith(`/udbhav${path}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-white/10 px-4 sm:px-6 py-4">
        {/* Top Edge Ambient Marine Vignette Guard - Seamless Alpha Blend */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020610]/80 via-[#020610]/30 to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          {/* 10th Edition Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-[#030d1c]/90 border border-[#C5A25F]/40 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.7)] hover:border-[#C5A25F] transition-all"
          >
            <img
              src="/renaissance-logo-clean.png"
              alt="Renaissance Logo"
              onError={(e) => {
                e.currentTarget.src = "/renaissance-logo-transparent.png";
              }}
              className="h-9 sm:h-10 w-auto object-contain bg-gray-200 rounded-full px-4 py-1.5 shadow-lg border border-gray-300 hover:bg-gray-100 transition-all duration-300"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 px-5 py-2 rounded-full backdrop-blur-xl bg-[#030d1c]/80 border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.6)] font-light text-xs tracking-widest">
            {navLinks.map((link) => {
              const current = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 ${
                    current
                      ? "text-[#F4EBD9] bg-[#C5A25F]/25 px-3.5 py-1 rounded-full border border-[#C5A25F]/60 shadow-[0_0_16px_rgba(197,162,95,0.4)] font-extrabold drop-shadow-[0_0_8px_rgba(197,162,95,0.5)]"
                      : "text-[#94A3B8] hover:text-[#F8FAFC] px-2 py-1 font-semibold"
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${current ? "text-[#C5A25F]" : "opacity-90"}`} />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              to="/register"
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#C5A25F]/60 bg-gradient-to-r from-[#F4EBD9] via-[#EBDDC8] to-[#C5A25F]/30 text-[#0C2B3D] hover:border-[#C5A25F] hover:shadow-[0_0_20px_rgba(197,162,95,0.45)] text-xs font-mono font-bold tracking-wider transition-all duration-300 transform hover:scale-[1.03]"
            >
              <span>SIGN IN</span>
              <span className="bg-[#0C2B3D] text-[#F4EBD9] rounded-full p-1 flex items-center justify-center w-5 h-5 shadow-sm">
                <FiArrowUpRight size={12} className="stroke-[3]" />
              </span>
            </Link>
          </div>

          {/* Mobile Animated Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden relative z-50 p-2.5 rounded-xl bg-[#040f21]/80 border border-[#C5A25F]/40 text-[#F4EBD9] hover:text-[#C5A25F] shadow-[0_0_15px_rgba(197,162,95,0.15)] transition-all active:scale-95"
          >
            {isOpen ? <FiX size={22} className="text-[#C5A25F]" /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#020610]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 pb-8 overflow-y-auto md:hidden"
          >
            {/* Ambient Background Gold Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#C5A25F]/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-sm mx-auto w-full my-auto">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A25F] font-bold block mb-1">
                  Renaissance X Edition
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Expedition Navigation
                </h2>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2.5">
                {navLinks.map((link, index) => {
                  const current = isActive(link.path);
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.1, duration: 0.2 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`w-full px-5 py-3.5 rounded-2xl flex items-center justify-between font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                          current
                            ? "bg-gradient-to-r from-[#C5A25F]/30 via-[#C5A25F]/15 to-transparent border border-[#C5A25F]/60 text-[#F4EBD9] shadow-[0_0_20px_rgba(197,162,95,0.25)] font-bold"
                            : "bg-[#040f21]/60 border border-white/10 text-[#94A3B8] hover:text-white hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && (
                            <div className={`p-1.5 rounded-lg ${current ? "bg-[#C5A25F] text-[#0C2B3D]" : "bg-white/5 text-[#94A3B8]"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                          )}
                          <span className="text-sm font-semibold">{link.name}</span>
                        </div>
                        {current && (
                          <span className="w-2 h-2 rounded-full bg-[#C5A25F] shadow-[0_0_8px_#C5A25F]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Sign In / Register CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.2 }}
                className="pt-4"
              >
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F4EBD9] via-[#EBDDC8] to-[#C5A25F] text-[#0C2B3D] font-mono text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(197,162,95,0.4)] border border-[#C5A25F]/60 active:scale-[0.98] transition-all"
                >
                  <span>SIGN IN TO ENLIST</span>
                  <FiArrowUpRight size={16} className="stroke-[3]" />
                </Link>
              </motion.div>
            </div>

            {/* Footer Badge */}
            <div className="relative z-10 text-center pt-4 border-t border-white/10 max-w-sm mx-auto w-full">
              <p className="text-[10px] font-mono text-[#94A3B8] tracking-widest uppercase">
                E-CELL MNNIT • ALL RIGHTS RESERVED
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

