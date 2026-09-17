import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function SocialSideRail() {
  const socials = [
    { icon: <FaFacebookF size={12} />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaLinkedinIn size={12} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaInstagram size={12} />, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-5 select-none">
      {/* Top Accent Line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#165D73]/40" />

      {/* Social Icons */}
      <div className="flex flex-col gap-4 text-[#165D73]">
        {socials.map((s, idx) => (
          <a
            key={idx}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-7 h-7 rounded-full bg-[#DFECEE]/60 border border-[#68A5B3]/40 flex items-center justify-center hover:text-white hover:border-[#165D73] hover:bg-[#165D73] transition-all duration-300 shadow-[0_2px_8px_rgba(20,50,65,0.1)] group backdrop-blur-sm"
          >
            <span className="group-hover:scale-110 transition-transform">{s.icon}</span>
          </a>
        ))}
      </div>

      {/* Bottom Accent Line */}
      <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-[#165D73]/40" />
    </div>
  );
}
