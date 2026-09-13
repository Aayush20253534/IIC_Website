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
    <main className="relative min-h-screen bg-transparent text-[#F4EBD9] selection:bg-[#C5A25F] selection:text-[#050B14]">
      {/* Side rails */}
      <SocialSideRail />
      <ScrollIndicatorRail />

      {/* 1. Home */}
      <section id="home" className="relative scroll-mt-20">
        <Hero />
        <SlidingBar />
        <About />
      </section>

      {/* 2. Sponsors */}
      <section
        id="sponsors"
        className="relative scroll-mt-20 border-t border-[#C5A25F]/15"
      >
        <Sponsors embedded />
      </section>

      {/* 3. Registration */}
      <section
        id="register"
        className="relative scroll-mt-20 border-t border-[#C5A25F]/15 bg-[#030912]/80"
      >
        <Registration embedded />
      </section>

      {/* 4. Events */}
      <section
        id="events"
        className="relative scroll-mt-20 border-t border-[#C5A25F]/15"
      >
        <Events embedded />
        <EventTimeline />
      </section>

      {/* 5. Dashboard */}
      <section
        id="dashboard"
        className="relative scroll-mt-20 border-t border-[#C5A25F]/15 bg-[#030912]/80"
      >
        <Dashboard embedded />
      </section>

      {/* 6. Teams */}
      <section
        id="teams"
        className="relative scroll-mt-20 border-t border-[#C5A25F]/15"
      >
        <Teams embedded />
      </section>

      {/* 7. Gallery + Speakers */}
      <section
        id="gallery"
        className="relative scroll-mt-20 border-t border-[#C5A25F]/15 bg-[#030912]/80"
      >
        <Gallery embedded />
        <Speakers />
      </section>

      {/* 8. Contact */}
      <section id="contact" className="relative">
        <ContactFooter />
      </section>
    </main>
  );
}
