import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Anchor,
  ArrowRight,
  Sparkles,
  Ship,
  Star,
  Navigation,
} from "lucide-react";

import OceanHeroBackground from "../components/OceanHeroBackground";
import ContactFooter from "../components/ContactFooter";
import SocialSideRail from "../components/SocialSideRail";
import ScrollIndicatorRail from "../components/ScrollIndicatorRail";
import { SPONSOR_TIERS } from "../data/sponsorsData";

/* ================================================================
   SPONSORS PAGE
   Renaissance — Oceanic Expedition Theme
================================================================ */

export default function Sponsors({ embedded = false }) {
  const presentingSponsor = SPONSOR_TIERS?.[0]?.sponsors?.[0];

  const principalAllies =
    SPONSOR_TIERS?.[0]?.sponsors?.slice(1) || [];

  const goldenFleet =
    SPONSOR_TIERS?.[1]?.sponsors || [];

  const voyageFellowship =
    SPONSOR_TIERS?.[2]?.sponsors || [];

  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#EAF4F5]
        text-[#123B52]
        selection:bg-[#C5A25F]
        selection:text-white
      "
    >
      {/* ============================================================
          GLOBAL ATMOSPHERE
      ============================================================ */}

      <OceanAtmosphere />

      {!embedded && <SocialSideRail />}
      {!embedded && <ScrollIndicatorRail />}

      {/* ============================================================
          HERO
      ============================================================ */}

      {!embedded && (
        <section className="relative z-10 min-h-[82vh] overflow-hidden">

          {/* Ocean background */}
          <div className="absolute inset-0">

            <OceanHeroBackground />

            {/* Bright ocean wash */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#DDF0F3]/15 via-transparent to-[#EAF4F5]/90" />

            {/* Warm sunlight */}
            <div className="absolute left-0 top-0 h-full w-[70%] bg-gradient-to-r from-[#EAF4F5]/90 via-[#EAF4F5]/45 to-transparent" />

            {/* Bottom sea mist */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#EAF4F5] via-[#EAF4F5]/80 to-transparent" />
          </div>

          {/* Decorative horizon */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[17%] z-[2]">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#6BAABA]/35 to-transparent" />
          </div>

          {/* Animated ship */}
          <AnimatedVoyageShip />

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
                    font-semibold
                    uppercase
                    tracking-[0.35em]
                    text-[#8E682B]
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
                  font-bold
                  uppercase
                  leading-[1.02]
                  tracking-[0.015em]
                  text-[#123B52]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[72px]
                "
              >
                The Allies
                <br />

                <span className="text-[#17647D]">
                  Behind The
                </span>

                <br />

                <span className="text-[#A97827]">
                  Expedition
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="
                  mt-7
                  max-w-2xl
                  font-montserrat
                  text-sm
                  leading-7
                  text-[#405F6D]
                  sm:text-base
                  md:text-lg
                "
              >
                Great journeys are never sailed alone. Meet the
                organizations, visionaries and partners helping
                Renaissance venture beyond the known.
              </p>

              {/* Navigation-style line */}
              <div className="mt-9 flex flex-wrap items-center gap-4">

                <div className="h-px w-20 bg-[#B58B3E]/65" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.28em]
                    text-[#8D6A31]
                  "
                >
                  Different Minds · Same Destination
                </span>
              </div>
            </div>
          </div>

          {/* Large compass watermark */}
          <div
            className="
              sponsor-compass-slow
              pointer-events-none
              absolute
              bottom-[13%]
              right-[7%]
              z-[3]
              hidden
              opacity-20
              lg:block
            "
          >
            <Compass
              className="h-48 w-48 text-[#174F67]"
              strokeWidth={0.6}
            />
          </div>

          {/* Small navigation coordinate */}
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
              uppercase
              tracking-[0.25em]
              text-[#527783]
              lg:block
            "
          >
            25° 12′ N · 71° 04′ W
          </div>

        </section>
      )}

      {/* ============================================================
          PARTNER NAVIGATION BAR
      ============================================================ */}

      <section className="relative z-30 mx-auto -mt-7 max-w-[1280px] px-5 sm:px-8">

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#A9C8CE]/70
            bg-[#FBFEFC]/90
            shadow-[0_14px_40px_rgba(32,74,89,0.13)]
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

            <PartnerStripItem
              icon={<Star className="h-4 w-4" />}
              text="Principal Allies"
            />

            <div className="hidden h-5 w-px bg-[#A8C6CC] sm:block" />

            <PartnerStripItem
              icon={<Sparkles className="h-4 w-4" />}
              text="Strategic Partners"
            />

            <div className="hidden h-5 w-px bg-[#A8C6CC] sm:block" />

            <PartnerStripItem
              icon={<Anchor className="h-4 w-4" />}
              text="Voyage Fellowship"
            />

          </div>
        </div>
      </section>

      {/* ============================================================
          PRESENTING PARTNER
      ============================================================ */}

      {presentingSponsor && (
        <section className="relative z-10 mx-auto max-w-[1280px] px-5 pb-20 pt-24 sm:px-8 lg:pt-28">

          <SectionHeading
            icon={<Star className="h-5 w-5" />}
            eyebrow="The Flagship"
            title="Presenting Partner"
            subtitle="The principal ally helping lead the expedition."
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
              border
              border-[#A9C5CA]
              bg-[#FCFEFA]
              shadow-[0_22px_70px_rgba(29,73,87,0.14)]
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
            <div className="pointer-events-none absolute inset-0 opacity-[0.055]">
              <NauticalChart />
            </div>

            {/* Decorative compass */}
            <div className="pointer-events-none absolute -right-24 -top-24 opacity-[0.055]">
              <Compass
                className="h-80 w-80 text-[#14556C]"
                strokeWidth={0.6}
              />
            </div>

            <div className="relative grid items-center gap-10 p-6 sm:p-10 md:grid-cols-[1fr_1.05fr] md:p-14">

              {/* Logo plaque */}
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
                  border-[#A9C5CA]
                  bg-gradient-to-br
                  from-[#E8F3F3]
                  via-[#F8F6EC]
                  to-[#E4EFF0]
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
                    border-[#B7964F]/30
                  "
                />

                <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-[#A47A30]/45" />

                <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#A47A30]/45" />

                <Compass
                  className="
                    sponsor-compass-slow
                    pointer-events-none
                    absolute
                    -bottom-10
                    -left-10
                    h-36
                    w-36
                    text-[#2A7187]
                    opacity-[0.07]
                  "
                  strokeWidth={0.7}
                />

                <img
                  src={presentingSponsor.image}
                  alt={presentingSponsor.name}
                  className="
                    relative
                    z-10
                    max-h-44
                    max-w-[82%]
                    object-contain
                    drop-shadow-[0_5px_9px_rgba(20,61,77,0.12)]
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Information */}
              <div className="text-center md:text-left">

                <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">

                  <span className="h-px w-8 bg-[#B58B3E]" />

                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.3em]
                      text-[#926D2C]
                    "
                  >
                    Presenting Partner
                  </span>
                </div>

                <h3
                  className="
                    font-cinzel
                    text-3xl
                    font-bold
                    uppercase
                    tracking-wide
                    text-[#143E54]
                    sm:text-4xl
                  "
                >
                  {presentingSponsor.name}
                </h3>

                <p
                  className="
                    mt-5
                    max-w-xl
                    font-montserrat
                    text-sm
                    leading-7
                    text-[#536D77]
                  "
                >
                  Our flagship partner in this journey of
                  ideas, collaboration, innovation and discovery.
                </p>

                <div className="mt-7 flex items-center justify-center gap-3 md:justify-start">

                  <Ship
                    className="h-5 w-5 text-[#A97827]"
                    strokeWidth={1.1}
                  />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.22em]
                      text-[#71838A]
                    "
                  >
                    Sailing With Renaissance
                  </span>

                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          PRINCIPAL ALLIES
      ============================================================ */}

      {principalAllies.length > 0 && (
        <SponsorSection
          eyebrow="Our Principal Allies"
          title="Those At The Helm"
          subtitle="The partners helping chart the course for Renaissance."
          sponsors={principalAllies}
          size="large"
        />
      )}

      {/* ============================================================
          STRATEGIC PARTNERS
      ============================================================ */}

      {goldenFleet.length > 0 && (
        <SponsorSection
          eyebrow="The Golden Fleet"
          title="Strategic Partners"
          subtitle="Organizations sailing alongside us to turn ideas into impact."
          sponsors={goldenFleet}
          size="medium"
          alternate
        />
      )}

      {/* ============================================================
          VOYAGE FELLOWSHIP
      ============================================================ */}

      {voyageFellowship.length > 0 && (
        <SponsorSection
          eyebrow="The Voyage Fellowship"
          title="Our Wider Fellowship"
          subtitle="Media, community and event partners carrying the voyage further."
          sponsors={voyageFellowship}
          size="small"
        />
      )}

      {/* ============================================================
          JOIN THE VOYAGE
      ============================================================ */}

      {!embedded && (
        <section
          className="
            relative
            z-10
            overflow-hidden
            border-t
            border-[#7DAFBA]/35
            bg-[#123F55]
          "
        >

          {/* Ocean glow */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-44
              bg-gradient-to-b
              from-[#5DAEC1]/15
              to-transparent
            "
          />

          {/* Compass */}
          <div
            className="
              pointer-events-none
              absolute
              -left-24
              top-1/2
              hidden
              -translate-y-1/2
              opacity-[0.07]
              md:block
            "
          >
            <Compass
              className="h-80 w-80 text-[#E2D09A]"
              strokeWidth={0.6}
            />
          </div>

          {/* Anchor */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              bottom-[-100px]
              opacity-[0.06]
            "
          >
            <Anchor
              className="h-80 w-80 text-[#E2D09A]"
              strokeWidth={0.7}
            />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 py-28 text-center sm:px-8">

            <Anchor
              className="mx-auto mb-7 h-10 w-10 text-[#D7B86D]"
              strokeWidth={1.1}
            />

            <p
              className="
                mb-4
                font-mono
                text-[9px]
                uppercase
                tracking-[0.35em]
                text-[#D7B86D]
              "
            >
              Chart A New Course
            </p>

            <h2
              className="
                font-cinzel
                text-3xl
                font-bold
                uppercase
                tracking-wide
                text-[#FFF9ED]
                sm:text-4xl
                md:text-5xl
              "
            >
              Join The Voyage
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                font-montserrat
                text-sm
                leading-7
                text-[#D4E1E4]
                sm:text-base
              "
            >
              Every meaningful expedition begins with those
              willing to explore beyond the familiar. Become a
              partner and help us shape the next horizon.
            </p>

            <Link
              to="/contact"
              className="
                group
                mt-9
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#D5B66B]
                bg-[#D5B66B]
                px-7
                py-4
                font-cinzel
                text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#123F55]
                shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#E5CA88]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
              "
            >
              <span>Become a Partner</span>

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </section>
      )}

      {/* ============================================================
          FOOTER
      ============================================================ */}

      {!embedded && (
        <div className="relative z-10 bg-[#EAF4F5]">
          <ContactFooter />
        </div>
      )}

      {/* ============================================================
          PAGE ANIMATIONS
      ============================================================ */}

      <style>{`
        @keyframes renaissanceShipSail {
          0% {
            transform: translateX(-18vw) translateY(3px);
          }

          45% {
            transform: translateX(42vw) translateY(-4px);
          }

          100% {
            transform: translateX(108vw) translateY(2px);
          }
        }

        @keyframes renaissanceShipBob {
          0%,
          100% {
            transform: translateY(0px) rotate(-0.5deg);
          }

          50% {
            transform: translateY(-6px) rotate(0.5deg);
          }
        }

        @keyframes renaissanceCompass {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes renaissanceFloat {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes renaissanceWave {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-80px);
          }
        }

        .sponsor-ship-sail {
          animation: renaissanceShipSail 34s linear infinite;
        }

        .sponsor-ship-bob {
          animation: renaissanceShipBob 3.5s ease-in-out infinite;
        }

        .sponsor-compass-slow {
          animation: renaissanceCompass 55s linear infinite;
        }

        .sponsor-floating {
          animation: renaissanceFloat 5s ease-in-out infinite;
        }

        .sponsor-wave {
          animation: renaissanceWave 12s linear infinite;
        }

        .sponsor-card {
          transform: translateZ(0);
        }

        .sponsor-card:hover {
          transform: translateY(-7px);
        }

        @media (prefers-reduced-motion: reduce) {
          .sponsor-ship-sail,
          .sponsor-ship-bob,
          .sponsor-compass-slow,
          .sponsor-floating,
          .sponsor-wave {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

/* =================================================================
   GLOBAL ATMOSPHERE
================================================================= */

function OceanAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Ocean blue atmosphere */}
      <div
        className="
          absolute
          -right-72
          top-[18%]
          h-[700px]
          w-[700px]
          rounded-full
          bg-[#63B4C7]/10
          blur-[110px]
        "
      />

      <div
        className="
          absolute
          -left-72
          top-[52%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#4C9EB3]/10
          blur-[120px]
        "
      />

      {/* Sunlight */}
      <div
        className="
          absolute
          left-[30%]
          top-[-10%]
          h-[550px]
          w-[550px]
          rounded-full
          bg-[#F4D58B]/10
          blur-[130px]
        "
      />

      {/* Fine paper grain */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at 20% 20%,
              rgba(27,77,93,.3) 0 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(175,135,58,.25) 0 1px,
              transparent 1px
            )
          `,
          backgroundSize: "52px 52px, 70px 70px",
        }}
      />
    </div>
  );
}

/* =================================================================
   ANIMATED VOYAGE SHIP
================================================================= */

function AnimatedVoyageShip() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        bottom-[17%]
        left-0
        z-[5]
        hidden
        w-full
        md:block
      "
    >
      <div className="sponsor-ship-sail">

        <div className="sponsor-ship-bob">

          <div className="relative h-28 w-52 lg:h-36 lg:w-64">

            {/* Ship shadow */}
            <div
              className="
                absolute
                bottom-1
                left-4
                h-2
                w-48
                rounded-full
                bg-[#17485C]/15
                blur-md
                lg:w-60
              "
            />

            {/* Hull */}
            <div
              className="
                absolute
                bottom-5
                left-4
                h-9
                w-44
                rounded-b-[45%]
                rounded-t-[10%]
                border
                border-[#6E5430]
                bg-gradient-to-b
                from-[#815E35]
                via-[#5C442B]
                to-[#382A20]
                lg:left-5
                lg:h-11
                lg:w-56
              "
            />

            {/* Hull highlight */}
            <div
              className="
                absolute
                bottom-11
                left-8
                h-px
                w-36
                bg-[#D2B36D]/60
                lg:left-10
                lg:w-44
              "
            />

            {/* Mast */}
            <div
              className="
                absolute
                bottom-11
                left-[48%]
                h-20
                w-[3px]
                bg-[#543E29]
                lg:h-28
              "
            />

            {/* Main sail */}
            <div
              className="
                absolute
                bottom-[4.1rem]
                left-[50%]
                h-16
                w-16
                origin-bottom-left
                -skew-y-[5deg]
                border
                border-[#6C7B7B]/40
                bg-gradient-to-br
                from-[#F8FBF5]
                via-[#E5EFF0]
                to-[#BFD6DA]
                shadow-sm
                lg:bottom-[5.1rem]
                lg:h-24
                lg:w-24
              "
            />

            {/* Secondary sail */}
            <div
              className="
                absolute
                bottom-[4rem]
                left-[23%]
                h-12
                w-12
                -skew-y-[12deg]
                border
                border-[#6C7B7B]/30
                bg-[#EEF4F1]
                lg:bottom-[5rem]
                lg:h-18
                lg:w-18
              "
            />

            {/* Bow flag */}
            <div
              className="
                absolute
                bottom-[5rem]
                left-[48%]
                h-2
                w-6
                rounded-r-full
                bg-[#1A667D]
                lg:bottom-[6.5rem]
              "
            />

            {/* Small gold detail */}
            <div
              className="
                absolute
                bottom-7
                left-12
                h-1
                w-1
                rounded-full
                bg-[#D5B66A]
                shadow-[20px_0_0_#D5B66A,40px_0_0_#D5B66A]
              "
            />

          </div>
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   PARTNER STRIP ITEM
================================================================= */

function PartnerStripItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2">

      <span className="text-[#A97827]">
        {icon}
      </span>

      <span
        className="
          font-mono
          text-[9px]
          font-medium
          uppercase
          tracking-[0.2em]
          text-[#526D77]
        "
      >
        {text}
      </span>

    </div>
  );
}

/* =================================================================
   SECTION HEADING
================================================================= */

function SectionHeading({
  icon,
  eyebrow,
  title,
  subtitle,
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <div className="mb-4 flex items-center justify-center gap-3">

        <span className="h-px w-12 bg-[#B58B3E]/60" />

        <span className="text-[#A97827]">
          {icon}
        </span>

        <span className="h-px w-12 bg-[#B58B3E]/60" />

      </div>

      <p
        className="
          font-mono
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.32em]
          text-[#926C2D]
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
          text-[#143E54]
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
          text-[#647A83]
        "
      >
        {subtitle}
      </p>

      <div className="mx-auto mt-7 flex items-center justify-center gap-3">

        <span className="h-px w-14 bg-[#AFC6CA]" />

        <span className="h-1.5 w-1.5 rotate-45 border border-[#B58B3E]" />

        <span className="h-px w-14 bg-[#AFC6CA]" />

      </div>
    </div>
  );
}

/* =================================================================
   SPONSOR SECTION
================================================================= */

function SponsorSection({
  eyebrow,
  title,
  subtitle,
  sponsors,
  size,
  alternate = false,
}) {
  return (
    <section
      className={`
        relative
        z-10
        border-t
        border-[#9FC0C7]/30
        ${
          alternate
            ? "bg-[#DDEEEF]/40"
            : "bg-transparent"
        }
      `}
    >

      {/* Section ocean line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#76AEBB]/25 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 lg:py-28">

        <SectionHeading
          icon={<Compass className="h-5 w-5" />}
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        <div
          className={`
            mx-auto
            mt-14
            grid
            max-w-6xl

            ${
              size === "large"
                ? "grid-cols-1 gap-8 md:grid-cols-2"
                : size === "medium"
                ? "grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            }
          `}
        >

          {sponsors.map((sponsor, index) => (
            <SponsorCard
              key={`${sponsor.name}-${index}`}
              sponsor={sponsor}
              size={size}
            />
          ))}

        </div>
      </div>
    </section>
  );
}

/* =================================================================
   SPONSOR CARD
================================================================= */

function SponsorCard({
  sponsor,
  size = "medium",
}) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <article
      className="
        sponsor-card
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#AFC8CC]
        bg-[#FCFEFA]
        shadow-[0_8px_28px_rgba(31,72,86,0.10)]
        transition-all
        duration-500
        hover:border-[#9C7937]
        hover:shadow-[0_20px_48px_rgba(31,72,86,0.17)]
      "
    >

      {/* ==========================================================
          GOLD TOP EDGE
      ========================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          z-30
          h-[3px]
          bg-gradient-to-r
          from-transparent
          via-[#C5A25F]
          to-transparent
          opacity-70
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* ==========================================================
          DECORATIVE CORNERS
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-3
          top-3
          z-30
          h-8
          w-8
          border-l
          border-t
          border-[#B38A3C]/40
          transition-all
          duration-500
          group-hover:h-10
          group-hover:w-10
          group-hover:border-[#B38A3C]/70
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-3
          top-3
          z-30
          h-8
          w-8
          border-r
          border-t
          border-[#B38A3C]/40
          transition-all
          duration-500
          group-hover:h-10
          group-hover:w-10
          group-hover:border-[#B38A3C]/70
        "
      />

      {/* ==========================================================
          VISUAL / LOGO AREA
      ========================================================== */}

      <div
        className={`
          relative
          overflow-hidden
          border-b
          border-[#AFC8CC]/60
          bg-gradient-to-b
          from-[#D9EDF0]
          via-[#EDF4F1]
          to-[#E9DEC5]

          ${
            isLarge
              ? "h-[260px]"
              : isSmall
              ? "h-[135px]"
              : "h-[195px]"
          }
        `}
      >

        {/* Ocean horizon */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-[20%]
            h-px
            bg-[#4B9AAE]/15
          "
        />

        {/* Sky glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-[20%]
            top-[-30%]
            h-40
            w-40
            rounded-full
            bg-white/80
            blur-3xl
          "
        />

        {/* Nautical map */}
        <svg
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
            opacity-[0.065]
            transition-opacity
            duration-500
            group-hover:opacity-[0.11]
          "
          viewBox="0 0 500 250"
          preserveAspectRatio="none"
        >
          <path
            d="
              M-20 185
              C70 125
              135 220
              220 165
              C315 105
              400 170
              530 75
            "
            fill="none"
            stroke="#174F67"
            strokeWidth="1.4"
            strokeDasharray="7 8"
          />

          <path
            d="
              M20 65
              C100 100
              165 55
              245 105
              C325 155
              405 90
              510 135
            "
            fill="none"
            stroke="#9A7435"
            strokeWidth="1"
            strokeDasharray="4 7"
          />

          <circle
            cx="365"
            cy="85"
            r="42"
            fill="none"
            stroke="#174F67"
            strokeWidth="1"
          />

          <circle
            cx="365"
            cy="85"
            r="28"
            fill="none"
            stroke="#174F67"
            strokeWidth="0.8"
          />

          <path
            d="M365 35 L365 135 M315 85 L415 85"
            stroke="#174F67"
            strokeWidth="0.7"
          />
        </svg>

        {/* Compass watermark */}
        <Compass
          className="
            sponsor-compass-slow
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-32
            w-32
            text-[#18566D]
            opacity-[0.075]
          "
          strokeWidth={0.7}
        />

        {/* Logo plaque */}
        <div className="absolute inset-0 flex items-center justify-center p-7">

          <div
            className="
              relative
              flex
              h-[70%]
              w-[78%]
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-white/80
              bg-[#FFFFFF]/55
              p-5
              shadow-[0_7px_22px_rgba(31,74,88,0.08)]
              backdrop-blur-[2px]
              transition-all
              duration-500
              group-hover:bg-white/75
            "
          >

            {/* Inner frame */}
            <div
              className="
                pointer-events-none
                absolute
                inset-2
                rounded-lg
                border
                border-[#C5A25F]/20
              "
            />

            <img
              src={sponsor.image}
              alt={sponsor.name}
              loading="lazy"
              className="
                relative
                z-10
                max-h-full
                max-w-[82%]
                object-contain
                drop-shadow-[0_4px_8px_rgba(18,59,82,0.10)]
                transition-transform
                duration-500
                ease-out
                group-hover:scale-105
              "
            />

          </div>
        </div>

        {/* Tier badge */}
        <div
          className="
            absolute
            bottom-3
            left-1/2
            z-20
            -translate-x-1/2
            whitespace-nowrap
            rounded-full
            border
            border-[#B9934A]/55
            bg-[#FFF8E5]/95
            px-4
            py-1.5
            shadow-[0_3px_10px_rgba(47,67,72,0.08)]
          "
        >
          <span
            className="
              font-mono
              text-[7px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#80602A]
            "
          >
            {isLarge
              ? "Captain's Ally"
              : isSmall
              ? "Voyage Ally"
              : "Fleet Partner"}
          </span>
        </div>
      </div>

      {/* ==========================================================
          CARD INFORMATION
      ========================================================== */}

      <div
        className={`
          relative
          bg-[#FFFEF9]

          ${
            isLarge
              ? "p-7 sm:p-8"
              : isSmall
              ? "p-4 sm:p-5"
              : "p-6"
          }
        `}
      >

        {/* Small navigation marker */}
        <div className="mb-4 flex items-center gap-2">

          <span className="h-px w-7 bg-[#B38A3C]" />

          <span className="h-1.5 w-1.5 rotate-45 bg-[#B38A3C]" />

          <span className="h-px w-7 bg-[#B38A3C]" />

        </div>

        {/* Name + anchor */}
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <h3
              className={`
                font-cinzel
                font-bold
                uppercase
                tracking-wide
                text-[#143E54]
                transition-colors
                duration-300
                group-hover:text-[#A97827]

                ${
                  isLarge
                    ? "text-xl sm:text-2xl"
                    : isSmall
                    ? "text-sm sm:text-base"
                    : "text-lg sm:text-xl"
                }
              `}
            >
              {sponsor.name}
            </h3>

            {sponsor.category && (
              <p
                className="
                  mt-2
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-[#70838A]
                "
              >
                {sponsor.category}
              </p>
            )}

          </div>

          {!isSmall && (
            <Anchor
              className="
                mt-1
                h-5
                w-5
                shrink-0
                text-[#A37A32]/45
                transition-transform
                duration-500
                group-hover:-rotate-12
              "
              strokeWidth={1}
            />
          )}

        </div>

        {/* Bottom information */}
        {!isSmall && (
          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              border-t
              border-[#AFC6CA]/40
              pt-4
            "
          >

            <div className="flex items-center gap-2">

              <Navigation
                className="h-3.5 w-3.5 text-[#A27B37]"
                strokeWidth={1.2}
              />

              <span
                className="
                  font-montserrat
                  text-[9px]
                  text-[#667A82]
                "
              >
                Sailing with Renaissance
              </span>

            </div>

            <ArrowRight
              className="
                h-4
                w-4
                text-[#9B7332]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </div>
        )}
      </div>

      {/* Bottom gold hover line */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-30
          h-[3px]
          bg-gradient-to-r
          from-transparent
          via-[#C5A25F]
          to-transparent
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

    </article>
  );
}

/* =================================================================
   NAUTICAL CHART
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
        stroke="#15536B"
        strokeWidth="1"
        strokeDasharray="8 10"
      />

      <path
        d="
          M0 150
          C150 200 210 100 360 180
          C500 255 620 125 900 310
        "
        fill="none"
        stroke="#9A7435"
        strokeWidth="1"
        strokeDasharray="5 8"
      />

      <circle
        cx="680"
        cy="150"
        r="80"
        fill="none"
        stroke="#15536B"
        strokeWidth="1"
      />

      <circle
        cx="680"
        cy="150"
        r="50"
        fill="none"
        stroke="#15536B"
        strokeWidth="0.8"
      />

      <path
        d="M680 65 L680 235 M595 150 L765 150"
        stroke="#15536B"
        strokeWidth="0.7"
      />

      <path
        d="M180 390 L280 280 L360 350 L440 250"
        fill="none"
        stroke="#15536B"
        strokeWidth="0.8"
      />

      <circle
        cx="180"
        cy="390"
        r="4"
        fill="#9A7435"
      />

      <circle
        cx="440"
        cy="250"
        r="4"
        fill="#9A7435"
      />
    </svg>
  );
}
