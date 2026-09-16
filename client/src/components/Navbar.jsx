import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import {
  Anchor,
  CalendarDays,
  Compass,
  Images,
  Users,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Compass,
    },
    {
      name: "Sponsors",
      path: "/sponsors",
      icon: Anchor,
    },
    {
      name: "Events",
      path: "/events",
      icon: CalendarDays,
    },
    {
      name: "Teams",
      path: "/teams",
      icon: Users,
    },
    {
      name: "Gallery",
      path: "/gallery",
      icon: Images,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return (
        location.pathname === "/" ||
        location.pathname === "/udbhav"
      );
    }

    return (
      location.pathname.startsWith(path) ||
      location.pathname.startsWith(`/udbhav${path}`)
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-white/10 px-6 py-4">
      {/* Top Edge Ambient Marine Vignette Guard - Seamless Alpha Blend */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020610]/50 via-[#020610]/15 to-transparent pointer-events-none -z-10" />

      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-[#F4EBD9]/90 via-[#F4EBD9]/50 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between">
        {/* ============================================================
            LOGO
        ============================================================ */}

        <Link
          to="/"
          className="group relative flex items-center gap-3 pointer-events-auto"
          onClick={() => setIsOpen(false)}
        >
          {/* Soft glow */}
          <div className="absolute inset-0 rounded-full bg-[#F4EBD9]/40 blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

          <div
            className="
              relative
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-[#C5A25F]/40
              bg-[#F4EBD9]/95
              px-4
              py-2
              shadow-lg
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:border-[#C5A25F]/60
              group-hover:shadow-[0_10px_30px_rgba(197,162,95,0.22)]
              sm:rounded-2xl
            "
          >
            <img
              src="/renaissance-logo-clean.png"
              alt="Renaissance Logo"
              onError={(event) => {
                const image = event.currentTarget;

                if (!image.src.includes("renaissance-logo-transparent.png")) {
                  image.src = "/renaissance-logo-transparent.png";
                }
              }}
              className="
                h-8
                w-auto
                object-contain
                drop-shadow-[0_2px_6px_rgba(18,59,82,0.12)]
                md:h-10
              "
            />
          </div>
        </Link>

        {/* ============================================================
            DESKTOP NAVIGATION
        ============================================================ */}

        <div
          className="
            hidden
            items-center
            gap-7
            rounded-full
            border
            border-[#C5A25F]/20
            bg-[#F4EBD9]/80
            px-8
            py-3
            shadow-lg
            shadow-[#0A2239]/5
            backdrop-blur-md
            pointer-events-auto
            md:flex
          "
        >
          {navLinks.map((link) => {
            const current = isActive(link.path);
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  group/nav
                  relative
                  inline-flex
                  items-center
                  gap-1.5
                  font-mono
                  text-xs
                  uppercase
                  tracking-widest
                  transition-all
                  duration-300
                  ${
                    current
                      ? "font-bold text-[#0A2239]"
                      : "text-[#4A6B7C] hover:text-[#B47A32]"
                  }
                `}
              >
                {Icon && (
                  <Icon
                    className={`
                      h-3.5
                      w-3.5
                      text-current
                      transition-all
                      duration-300
                    `}
                    strokeWidth={1.6}
                  />
                )}

                <span>{link.name}</span>

                {current && (
                  <span
                    className="
                      absolute
                      -bottom-2
                      left-1/2
                      h-1.5
                      w-1.5
                      -translate-x-1/2
                      rounded-full
                      bg-[#C89B53]
                      shadow-[0_0_8px_rgba(200,155,83,0.45)]
                    "
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ============================================================
            DESKTOP SIGN IN
        ============================================================ */}

        <div className="hidden items-center pointer-events-auto md:flex">
          <Link
            to="/register"
            className="
              group
              flex
              items-center
              gap-2
              rounded-full
              border-2
              border-[#0A2239]
              px-6
              py-2.5
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-[#0A2239]
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#0A2239]
              hover:text-[#F4EBD9]
              hover:shadow-lg
            "
          >
            <span>SIGN IN</span>

            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-[#0A2239]
                p-1
                text-[#F4EBD9]
                transition-all
                duration-300
                group-hover:bg-[#F4EBD9]
                group-hover:text-[#0A2239]
              "
            >
              <FiArrowUpRight
                size={12}
                className="stroke-[3]"
              />
            </span>
          </Link>
        </div>

        {/* ============================================================
            MOBILE MENU BUTTON
        ============================================================ */}

        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="
            rounded-full
            border
            border-[#C5A25F]/30
            bg-[#F4EBD9]/90
            p-2.5
            text-[#0A2239]
            shadow-md
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-[#C5A25F]/60
            hover:text-[#B47A32]
            pointer-events-auto
            md:hidden
          "
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FiX size={22} />
          ) : (
            <FiMenu size={22} />
          )}
        </button>
      </div>

      {/* ============================================================
          MOBILE NAVIGATION DRAWER
      ============================================================ */}

      {isOpen && (
        <div
          className="
            mx-auto
            mt-4
            flex
            max-w-[calc(100%-2rem)]
            flex-col
            gap-2
            rounded-3xl
            border
            border-[#C5A25F]/25
            bg-[#F4EBD9]/95
            p-5
            shadow-[0_18px_55px_rgba(10,34,57,0.18)]
            backdrop-blur-xl
            pointer-events-auto
            md:hidden
          "
        >
          {navLinks.map((link) => {
            const current = isActive(link.path);
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`
                  relative
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  font-mono
                  text-xs
                  uppercase
                  tracking-widest
                  transition-all
                  duration-300
                  ${
                    current
                      ? "bg-[#0A2239]/5 font-bold text-[#0A2239]"
                      : "text-[#4A6B7C] hover:bg-[#0A2239]/5 hover:text-[#B47A32]"
                  }
                `}
              >
                {current && (
                  <span
                    className="
                      absolute
                      left-1.5
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#C89B53]
                    "
                  />
                )}

                {Icon && (
                  <Icon
                    className={`
                      h-4
                      w-4
                      shrink-0
                      text-current
                    `}
                    strokeWidth={1.5}
                  />
                )}

                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-2 h-px bg-gradient-to-r from-transparent via-[#C5A25F]/40 to-transparent" />

          {/* Mobile Sign In */}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="
              group
              mt-1
              flex
              items-center
              justify-center
              gap-2
              rounded-full
              border-2
              border-[#0A2239]
              bg-transparent
              px-5
              py-3
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-[#0A2239]
              transition-all
              duration-300
              hover:bg-[#0A2239]
              hover:text-[#F4EBD9]
            "
          >
            <span>SIGN IN</span>

            <FiArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      )}
    </nav>
  );
}