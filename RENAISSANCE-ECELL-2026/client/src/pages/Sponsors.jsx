import React from "react";
import {
  Compass,
  Anchor,
  Sparkles,
  Star,
  Navigation,
  Ship,
} from "lucide-react";

import ContactFooter from "../components/ContactFooter";
import { SPONSOR_TIERS } from "../data/sponsorsData";

/* ================================================================
   SPONSORS PAGE — RENAISSANCE OCEANIC EXPEDITION
   Theme: Consistent Warm Beach Sand & Vintage Maritime Parchment
================================================================ */

export default function Sponsors({ embedded = false }) {
  const presentingSponsor = SPONSOR_TIERS?.[0]?.sponsors?.[0];
  const principalAllies = SPONSOR_TIERS?.[0]?.sponsors?.slice(1) || [];
  const goldenFleet = SPONSOR_TIERS?.[1]?.sponsors || [];
  const voyageFellowship = SPONSOR_TIERS?.[2]?.sponsors || [];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#EBDDC8]
        via-[#E5D7C2]
        to-[#DFCEB7]
        text-[#0C2B3D]
        selection:bg-[#C5A25F]
        selection:text-white
      "
    >
      {/* ============================================================
          GLOBAL SANDY + PARCHMENT ATMOSPHERE (Consistent Theme)
      ============================================================ */}
      <SandyOceanAtmosphere />

      {/* ============================================================
          HERO: Previous bg image + background drift animation KEPT
                Boat thing REMOVED
      ============================================================ */}
      {!embedded && (
        <section className="relative z-10 min-h-[82vh] overflow-hidden">
          {/* Previous Ocean Background Image with animation kept */}
          <div className="absolute inset-0">
            <img
              src="/bg_images/events.png"
              alt="Renaissance Ocean Voyage"
              aria-hidden="true"
              className="sponsor-hero-raster h-full w-full object-cover object-top select-none pointer-events-none"
              draggable="false"
            />

            {/* Subtle marine depth tint */}
            <div className="absolute inset-0 bg-[#062538]/20 mix-blend-multiply" />

            {/* Bright oceanic sea wash */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#D2E9ED]/30 via-transparent to-[#EBDDC8]/95" />

            {/* Warm morning sunlight sand wash */}
            <div className="absolute left-0 top-0 h-full w-[72%] bg-gradient-to-r from-[#EBDDC8]/92 via-[#EBDDC8]/50 to-transparent" />

            {/* Bottom sandy shoreline blend into the page */}
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#EBDDC8] via-[#EBDDC8]/85 to-transparent" />
          </div>

          {/* Decorative horizon line */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[17%] z-[2]">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5FA5B5]/45 to-transparent" />
          </div>

          {/* NOTE: Boat thing (<AnimatedVoyageShip />) is REMOVED completely */}

          {/* Hero text */}
          <div
            className="
              relative
              z-10
              mx-auto
              flex
              min-h-[82vh]
              max-w-[1500px]
              items-center
              px-6
              pb-20
              pt-32
              sm:px-10
              lg:px-16
            "
          >
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#A37A32]" />
                <span
                  className="
                    font-mono
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.35em]
                    text-[#8E6422]
                    sm:text-[10px]
                  "
                >
                  Our Voyage Partners
                </span>
                <Compass
                  className="h-5 w-5 text-[#A37A32]"
                  strokeWidth={1.3}
                />
              </div>

              {/* Heading */}
              <h1
                className="
                  font-cinzel
                  text-[40px]
                  font-extrabold
                  uppercase
                  leading-[1.02]
                  tracking-[0.015em]
                  text-[#0C2B3D]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[72px]
                "
              >
                The Allies
                <br />
                <span className="text-[#165D73]">Behind The</span>
                <br />
                <span className="text-[#9E6D1F]">Expedition</span>
              </h1>

              {/* Subtitle */}
              <p
                className="
                  mt-7
                  max-w-2xl
                  font-montserrat
                  text-sm
                  leading-7
                  text-[#2C5263]
                  sm:text-base
                  md:text-lg
                  font-medium
                "
              >
                Great journeys are never sailed alone. Meet the organizations,
                visionaries and partners helping Renaissance venture beyond the
                known.
              </p>

              {/* Navigation-style line */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <div className="h-px w-20 bg-[#B58B3E]/70" />
                <span
                  className="
                    font-mono
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#855D1E]
                  "
                >
                  Different Minds · Same Destination
                </span>
              </div>
            </div>
          </div>

          {/* Large decorative compass watermark */}
          <div
            className="
              sponsor-compass-slow
              pointer-events-none
              absolute
              bottom-[13%]
              right-[7%]
              z-[3]
              hidden
              opacity-25
              lg:block
            "
          >
            <Compass
              className="h-48 w-48 text-[#144F63]"
              strokeWidth={0.7}
            />
          </div>

          {/* Navigation coordinate */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-[8%]
              right-[8%]
              z-[5]
              hidden
              font-mono
              text-[8px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#3D6B7C]
              lg:block
            "
          >
            25° 12′ N · 71° 04′ W
          </div>
        </section>
      )}

      {/* ============================================================
          PARTNER NAVIGATION BAR (Warm Sand + Lagoon Glass Strip)
      ============================================================ */}
      <section className="relative z-30 mx-auto -mt-7 max-w-[1280px] px-5 sm:px-8">
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#C2A169]/55
            bg-[#EBDDC8]/95
            shadow-[0_14px_40px_rgba(20,50,65,0.12)]
            backdrop-blur-md
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-8
              gap-y-4
              px-5
              py-4
              sm:justify-between
              sm:px-8
            "
          >
            <button
              type="button"
              onClick={() => scrollToSection("presenting-partner")}
              className="cursor-pointer"
            >
              <PartnerStripItem
                icon={<Star className="h-4 w-4 text-[#9E6D1F]" />}
                text="The Flagship"
              />
            </button>

            <div className="hidden h-5 w-px bg-[#C2A169]/40 sm:block" />

            <button
              type="button"
              onClick={() => scrollToSection("principal-allies")}
              className="cursor-pointer"
            >
              <PartnerStripItem
                icon={<Navigation className="h-4 w-4 text-[#165D73]" />}
                text="Principal Allies"
              />
            </button>

            <div className="hidden h-5 w-px bg-[#C2A169]/40 sm:block" />

            <button
              type="button"
              onClick={() => scrollToSection("golden-fleet")}
              className="cursor-pointer"
            >
              <PartnerStripItem
                icon={<Sparkles className="h-4 w-4 text-[#9E6D1F]" />}
                text="Strategic Partners"
              />
            </button>

            <div className="hidden h-5 w-px bg-[#C2A169]/40 sm:block" />

            <button
              type="button"
              onClick={() => scrollToSection("voyage-fellowship")}
              className="cursor-pointer"
            >
              <PartnerStripItem
                icon={<Anchor className="h-4 w-4 text-[#165D73]" />}
                text="Voyage Fellowship"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          PRESENTING PARTNER (Sandy-Oceanic Sovereign Vault)
      ============================================================ */}
      {presentingSponsor && (
        <section
          id="presenting-partner"
          className="relative z-10 mx-auto max-w-[1280px] px-5 pb-20 pt-24 sm:px-8 lg:pt-28"
          style={{ contentVisibility: "auto", containIntrinsicSize: "500px" }}
        >
          <SectionHeading
            icon={<Star className="h-5 w-5" />}
            eyebrow="The Flagship"
            title="Presenting Partner"
            subtitle="The principal ally helping lead the expedition across uncharted horizons."
          />

          <div
            className="
              sponsor-feature-card
              group
              relative
              mx-auto
              mt-12
              max-w-5xl
              overflow-hidden
              rounded-[28px]
              border-2
              border-[#C5A25F]/70
              bg-gradient-to-br
              from-[#EEDFCA]
              via-[#E6D6C0]
              to-[#DCECEE]
              shadow-[0_22px_70px_rgba(20,55,70,0.15)]
              transition-all
              duration-500
              hover:border-[#B58B3E]
            "
          >
            {/* Gold edge */}
            <div
              className="
                absolute
                inset-x-0
                top-0
                z-20
                h-[3px]
                bg-gradient-to-r
                from-transparent
                via-[#C7A052]
                to-transparent
              "
            />

            {/* Nautical chart background */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
              <NauticalChart />
            </div>

            {/* Decorative compass watermark */}
            <div className="pointer-events-none absolute -right-24 -top-24 opacity-[0.06]">
              <Compass
                className="h-80 w-80 text-[#0F4356]"
                strokeWidth={0.6}
              />
            </div>

            <div className="relative grid items-center gap-10 p-6 sm:p-10 md:grid-cols-[1fr_1.05fr] md:p-14">
              {/* Logo plaque in sandy parchment tone */}
              <div
                className="
                  relative
                  flex
                  min-h-[235px]
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#BFA275]/60
                  bg-[#F2E5D4]
                  p-8
                  shadow-inner
                  sm:min-h-[285px]
                "
              >
                {/* Inner navigation frame */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-4
                    rounded-xl
                    border
                    border-[#A87E35]/35
                  "
                />

                <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-[#9E6D1F]/55" />
                <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#9E6D1F]/55" />

                <img
                  src={presentingSponsor.image}
                  alt={presentingSponsor.name}
                  className="
                    relative
                    z-10
                    max-h-44
                    max-w-[82%]
                    object-contain
                    drop-shadow-[0_4px_10px_rgba(20,55,70,0.15)]
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Information - Centre aligned */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-[#B58B3E]" />
                  <span
                    className="
                      font-mono
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.3em]
                      text-[#8A5F1C]
                    "
                  >
                    Presenting Partner
                  </span>
                  <span className="h-px w-8 bg-[#B58B3E]" />
                </div>

                <h3
                  className="
                    font-cinzel
                    text-3xl
                    font-bold
                    uppercase
                    tracking-wide
                    text-[#0C2B3D]
                    sm:text-4xl
                  "
                >
                  {presentingSponsor.name}
                </h3>

                <span className="mt-2 inline-block rounded-full border border-[#C5A25F]/50 bg-[#E8D7C2] px-4 py-1 font-mono text-[10px] font-bold text-[#14556C]">
                  {presentingSponsor.category}
                </span>

                <p
                  className="
                    mt-5
                    max-w-xl
                    font-montserrat
                    text-sm
                    leading-7
                    text-[#2C5263]
                    font-medium
                    mx-auto
                  "
                >
                  {presentingSponsor.description ||
                    "Our flagship partner in this journey of ideas, collaboration, innovation and maritime discovery. Archiving uncharted archipelagos and powering Renaissance 2026."}
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-[#C5A25F]/60 bg-[#E8D7C2]/70 px-5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7A5418] shadow-sm">
                    <Ship
                      className="h-4 w-4 text-[#9E6D1F]"
                      strokeWidth={1.3}
                    />
                    <span>Flagship Ally · Sailing With Renaissance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          PRINCIPAL ALLIES (Those At The Helm — Sandy Paper Tone)
      ============================================================ */}
      {principalAllies.length > 0 && (
        <SponsorSection
          id="principal-allies"
          eyebrow="Our Principal Allies"
          title="Those At The Helm"
          subtitle="The partners helping chart the course for Renaissance."
          sponsors={principalAllies}
          size="large"
          theme="sandy"
        />
      )}

      {/* ============================================================
          STRATEGIC PARTNERS (The Golden Fleet)
      ============================================================ */}
      {goldenFleet.length > 0 && (
        <SponsorSection
          id="golden-fleet"
          eyebrow="The Golden Fleet"
          title="Strategic Partners"
          subtitle="Organizations sailing alongside us to turn ideas into impact."
          sponsors={goldenFleet}
          size="medium"
        />
      )}

      {/* ============================================================
          VOYAGE FELLOWSHIP (Our Wider Fellowship)
      ============================================================ */}
      {voyageFellowship.length > 0 && (
        <SponsorSection
          id="voyage-fellowship"
          eyebrow="The Voyage Fellowship"
          title="Our Wider Fellowship"
          subtitle="Media, community and event partners carrying the voyage further."
          sponsors={voyageFellowship}
          size="small"
        />
      )}



      {/* ============================================================
          FOOTER (Matching Warm Beach Sand Tone)
      ============================================================ */}
      {!embedded && (
        <div className="relative z-10 bg-[#E2D2BC]">
          <ContactFooter />
        </div>
      )}


      {/* ============================================================
          PAGE ANIMATIONS (Hero Drift & Compass Kept, Boat Removed)
      ============================================================ */}
      <style>{`
        @keyframes renaissanceCompass {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes renaissanceHeroDrift {
          0%, 100% {
            transform: scale(1.05) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.09) translate3d(-1.2%, -0.6%, 0);
          }
        }

        .sponsor-hero-raster {
          animation: renaissanceHeroDrift 20s ease-in-out infinite;
          will-change: transform;
        }

        .sponsor-compass-slow {
          animation: renaissanceCompass 55s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sponsor-hero-raster,
          .sponsor-compass-slow {
            animation: none !important;
            transform: scale(1.05);
          }
        }
      `}</style>
    </main>
  );
}

/* =================================================================
   PARTNER STRIP ITEM
================================================================= */

function PartnerStripItem({ icon, text }) {
  return (
    <div className="group flex items-center gap-2.5 transition-colors hover:text-[#8E6422]">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#BFA275]/50 bg-[#E2CEB3] transition-colors group-hover:border-[#9E6D1F] group-hover:bg-[#DAC4A5]">
        {icon}
      </span>
      <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#0C2B3D] group-hover:text-[#8E6422]">
        {text}
      </span>
    </div>
  );
}

/* =================================================================
   SECTION HEADING
================================================================= */

function SectionHeading({ icon, eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-[#B58B3E]/60" />
        <span className="text-[#8E6422]">{icon}</span>
        <span className="h-px w-12 bg-[#B58B3E]/60" />
      </div>

      <p
        className="
          font-mono
          text-[9px]
          font-bold
          uppercase
          tracking-[0.32em]
          text-[#8E6422]
        "
      >
        {eyebrow}
      </p>

      <h2
        className="
          mt-3
          font-cinzel
          text-3xl
          font-bold
          uppercase
          tracking-wide
          text-[#0C2B3D]
          sm:text-4xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mx-auto
          mt-4
          max-w-xl
          font-montserrat
          text-sm
          leading-6
          text-[#2C5263]
          font-medium
        "
      >
        {subtitle}
      </p>

      <div className="mx-auto mt-7 flex items-center justify-center gap-3">
        <span className="h-px w-14 bg-[#C2A169]/50" />
        <span className="h-1.5 w-1.5 rotate-45 border border-[#8E6422]" />
        <span className="h-px w-14 bg-[#C2A169]/50" />
      </div>
    </div>
  );
}

/* =================================================================
   SPONSOR SECTION (Sandy + Oceanic Variants, Zero Stark White)
================================================================= */

function SponsorSection({
  id,
  eyebrow,
  title,
  subtitle,
  sponsors,
  size,
}) {
  return (
    <section
      id={id}
      className="
        relative
        z-10
        border-t
        border-[#C2A169]/35
        bg-[#EADDC9]/50
      "
      style={{ contentVisibility: "auto", containIntrinsicSize: "400px" }}
    >
      {/* Section horizon line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A169]/50 to-transparent"
      />

      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 lg:py-28">
        <SectionHeading
          icon={<Compass className="h-5 w-5" />}
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        <div
          className="
            mx-auto
            mt-14
            flex
            flex-wrap
            items-stretch
            justify-center
            gap-7
            sm:gap-8
            max-w-6xl
          "
        >
          {sponsors.map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className={`
                flex
                justify-center
                w-full
                ${
                  size === "large"
                    ? "sm:w-[calc(50%-1.25rem)] max-w-[480px]"
                    : size === "medium"
                    ? "sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[430px]"
                    : "w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[400px]"
                }
              `}
            >
              <SponsorCard
                sponsor={sponsor}
                size={size}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================
   SPONSOR CARD (Authentic Pirate Parchment Frame & Maritime Assets)
================================================================= */

function SponsorCard({ sponsor, size = "medium" }) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <article
      className="
        sponsor-card
        group
        relative
        w-full
        aspect-[4/3]
        min-h-[290px]
        overflow-hidden
        rounded-[18px]
        border-2
        border-[#A87E35]/65
        bg-[#DCCBB4]
        shadow-[0_14px_38px_rgba(12,38,50,0.20)]
        transition-all
        duration-400
        hover:shadow-[0_22px_55px_rgba(12,38,50,0.32)]
        hover:-translate-y-1.5
        hover:border-[#D5B66B]
      "
    >
      {/* Authentic Pirate Parchment Background Image */}
      <img
        src="/sponsor-parchment-card.webp"
        alt="Nautical Chart Frame"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none select-none transition-transform duration-700 group-hover:scale-[1.025]"
        loading="lazy"
      />

      {/* Subtle Warm Sheen on Hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-[#C5A25F]/0 to-[#C5A25F]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Central Parchment Content Area (Carefully framed between the compass, ship and sextant) */}
      <div
        className="
          absolute
          inset-0
          left-[25%]
          right-[7%]
          top-[8%]
          bottom-[12%]
          flex
          flex-col
          items-center
          justify-between
          text-center
          p-2.5
          sm:p-3
          z-10
        "
      >
        {/* Tier badge (Captain's Ally / Golden Fleet / Voyage Ally) */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="h-px w-3 bg-[#8E6422]/60" />
          <span className="font-mono text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.22em] text-[#7A4E15]">
            {isLarge
              ? "Captain's Ally"
              : isSmall
              ? "Voyage Ally"
              : "Golden Fleet"}
          </span>
          <span className="h-px w-3 bg-[#8E6422]/60" />
        </div>

        {/* Sponsor Emblem / Logo with frosted parchment backing */}
        <div
          className="
            relative
            flex
            h-[52px]
            sm:h-[64px]
            w-full
            max-w-[190px]
            items-center
            justify-center
            rounded-xl
            bg-[#FAF2E3]/85
            border
            border-[#C5A25F]/50
            px-3
            py-1.5
            shadow-[inset_0_1px_3px_rgba(0,0,0,0.06),0_3px_8px_rgba(20,45,60,0.08)]
            backdrop-blur-[1px]
            transition-transform
            duration-300
            group-hover:scale-105
          "
        >
          <img
            src={sponsor.image}
            alt={sponsor.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_2px_4px_rgba(15,35,45,0.12)]"
          />
        </div>

        {/* Text Details Area */}
        <div className="flex flex-col items-center justify-center text-center w-full px-1">
          <h3 className="font-cinzel text-xs sm:text-sm md:text-base font-bold text-[#0C2B3D] leading-tight tracking-wide group-hover:text-[#8E6422] transition-colors line-clamp-1">
            {sponsor.name}
          </h3>

          <span className="mt-0.5 inline-block font-mono text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-[#14556C] line-clamp-1">
            {sponsor.category}
          </span>

          {sponsor.description && (
            <p className="mt-1 font-montserrat text-[8.5px] sm:text-[9.5px] md:text-[10px] leading-tight sm:leading-snug text-[#2C4855] font-medium line-clamp-2 max-w-[240px]">
              {sponsor.description}
            </p>
          )}
        </div>

        {/* Bottom Parchment Seal */}
        <div className="flex items-center justify-center gap-1.5 border-t border-[#A87E35]/35 pt-1 w-full text-[7.5px] sm:text-[8.5px] font-mono font-bold text-[#8E6422]">
          <Anchor className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#8E6422]" />
          <span>Official Fleet Partner</span>
        </div>
      </div>
    </article>
  );
}

/* =================================================================
   GLOBAL SANDY + PARCHMENT ATMOSPHERE (Consistent Theme)
================================================================= */

function SandyOceanAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Warm sunlight sand glow */}
      <div className="absolute right-[-10%] top-[16%] h-[600px] w-[600px] rounded-full bg-[#E8C87A]/10 blur-[120px]" />
      <div className="absolute left-[-10%] top-[50%] h-[550px] w-[550px] rounded-full bg-[#E2B766]/8 blur-[120px]" />
      <div className="absolute left-[28%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[#E8C87A]/12 blur-[120px]" />

      {/* Fine sand parchment grain texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(20,65,80,.18) 0 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(165,120,45,.15) 0 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px, 58px 58px",
        }}
      />
    </div>
  );
}

/* =================================================================
   NAUTICAL CHART (Static Vector Background Graphic)
================================================================= */

function NauticalChart() {
  return (
    <svg
      viewBox="0 0 900 500"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <path
        d="
          M0 380
          C120 300 180 440 320 330
          C450 230 540 360 690 250
          C770 195 840 245 900 180
        "
        fill="none"
        stroke="#124A5E"
        strokeWidth="1.1"
        strokeDasharray="8 10"
      />
      <path
        d="
          M0 150
          C150 200 210 100 360 180
          C500 255 620 125 900 310
        "
        fill="none"
        stroke="#8A5F1C"
        strokeWidth="1.1"
        strokeDasharray="5 8"
      />
      <circle
        cx="680"
        cy="150"
        r="80"
        fill="none"
        stroke="#124A5E"
        strokeWidth="1"
      />
      <circle
        cx="680"
        cy="150"
        r="50"
        fill="none"
        stroke="#124A5E"
        strokeWidth="0.8"
      />
      <path
        d="M680 65 L680 235 M595 150 L765 150"
        stroke="#124A5E"
        strokeWidth="0.7"
      />
      <path
        d="M180 390 L280 280 L360 350 L440 250"
        fill="none"
        stroke="#124A5E"
        strokeWidth="0.8"
      />
      <circle cx="180" cy="390" r="4" fill="#8A5F1C" />
      <circle cx="440" cy="250" r="4" fill="#8A5F1C" />
    </svg>
  );
}
