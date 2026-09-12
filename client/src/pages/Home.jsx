import React from "react";
import Hero from "../components/Hero";
import SlidingBar from "../components/SlidingBar";
import About from "../components/About";
import Sponsors from "./Sponsors";
import Registration from "./Registration";
import Events from "./Events";
import EventTimeline from "../components/EventTimeline";
import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Gallery from "./Gallery";
import Speakers from "../components/Speakers";
import ContactFooter from "../components/ContactFooter";
import SocialSideRail from "../components/SocialSideRail";
import ScrollIndicatorRail from "../components/ScrollIndicatorRail";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050B14] text-[#F4EBD9] relative selection:bg-[#C5A25F] selection:text-[#050B14]">
      {/* IIT Kanpur Reference Side Rails */}
      <SocialSideRail />
      <ScrollIndicatorRail />

      {/* 1. HOME SECTION */}
      <section id="home" className="relative scroll-mt-20">
        <Hero />
        <SlidingBar />
        <About />
      </section>

      {/* 2. SPONSORS SECTION (2nd) */}
      <section id="sponsors" className="relative scroll-mt-20 border-t border-[#C5A25F]/15">
        <Sponsors embedded={true} />
      </section>

      {/* 3. REGISTER SECTION (3rd) */}
      <section id="register" className="relative scroll-mt-20 border-t border-[#C5A25F]/15 bg-[#030912]">
        <Registration embedded={true} />
      </section>

      {/* 4. EVENTS SECTION (4th) */}
      <section id="events" className="relative scroll-mt-20 border-t border-[#C5A25F]/15">
        <Events embedded={true} />
        <EventTimeline />
      </section>

      {/* 5. DASHBOARD SECTION (5th) */}
      <section id="dashboard" className="relative scroll-mt-20 border-t border-[#C5A25F]/15 bg-[#030912]">
        <Dashboard embedded={true} />
      </section>

      {/* 6. TEAMS SECTION (6th - 100% Placeholders) */}
      <section id="teams" className="relative scroll-mt-20 border-t border-[#C5A25F]/15">
        <Teams embedded={true} />
      </section>

      {/* 7. GALLERY & KEYNOTE SPEAKERS SECTION (7th) */}
      <section id="gallery" className="relative scroll-mt-20 border-t border-[#C5A25F]/15 bg-[#030912]">
        <Gallery embedded={true} />
        <Speakers />
      </section>

      {/* 8. CONTACT FOOTER */}
      <section id="contact" className="relative">
        <ContactFooter />
      </section>
    </main>
  );
}
