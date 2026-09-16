import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function SocialSideRail() {
  const socials = [
    { icon: <FaFacebookF size={12} />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaLinkedinIn size={12} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaInstagram size={12} />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaTwitter size={12} />, href: "https://x.com", label: "Twitter / X" },
    { icon: <FaYoutube size={12} />, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <div className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-5 select-none">
      {/* Top Accent Line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#C5A25F]/60" />

      {/* Social Icons */}
      <div className="flex flex-col gap-4 text-[#94A3B8]">
        {socials.map((s, idx) => (
          <a
            key={idx}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-7 h-7 rounded-full bg-[#0A192F]/80 border border-[#C5A25F]/20 flex items-center justify-center hover:text-[#F4EBD9] hover:border-[#C5A25F] hover:bg-[#050B14] transition-all duration-300 shadow-md group"
          >
            <span className="group-hover:scale-110 transition-transform">{s.icon}</span>
          </a>
        ))}
      </div>

      {/* Bottom Accent Line */}
      <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-[#C5A25F]/60" />
    </div>
  );
}
