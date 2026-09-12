import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "Sponsors", id: "sponsors", path: "/sponsors" },
    { name: "Register", id: "register", path: "/register" },
    { name: "Events", id: "events", path: "/events" },
    { name: "Dashboard", id: "dashboard", path: "/dashboard" },
    { name: "Teams", id: "teams", path: "/teams" },
    { name: "Gallery", id: "gallery", path: "/gallery" },
  ];

  // Scroll Spy for Home page
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavClick = (link, e) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(link.id);
      if (el) {
        const targetY = el.getBoundingClientRect().top + window.pageYOffset - 75;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setActiveSection(link.id);
      }
    } else {
      // Navigate to home and then scroll
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) {
          const targetY = el.getBoundingClientRect().top + window.pageYOffset - 75;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050B14]/90 border-b border-[#C5A25F]/20 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={(e) => handleNavClick({ id: "home", path: "/" }, e)} className="flex items-center gap-3">
          <img src="/renaissance-logo.png" alt="Renaissance Logo" className="h-9 w-auto" />
          <span className="font-cinzel text-sm font-bold tracking-widest text-[#F4EBD9]">
            RENAISSANCE
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 font-montserrat text-xs uppercase tracking-wider">
          {navLinks.map((link) => {
            const isCurrent =
              location.pathname === "/" ? activeSection === link.id : location.pathname.startsWith(link.path);

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link, e)}
                className={`transition-colors cursor-pointer py-1 ${
                  isCurrent
                    ? "text-[#C5A25F] font-bold border-b-2 border-[#C5A25F]"
                    : "text-[#94A3B8] hover:text-[#F4EBD9]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
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
        <div className="md:hidden pt-4 pb-2 border-t border-[#C5A25F]/20 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(link, e)}
              className={`px-4 py-2 font-montserrat text-xs uppercase tracking-wider cursor-pointer ${
                activeSection === link.id ? "text-[#C5A25F] font-bold" : "text-[#94A3B8]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
