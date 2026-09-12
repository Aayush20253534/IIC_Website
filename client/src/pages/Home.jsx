import React from "react";
import Hero from "../components/Hero";
import SlidingBar from "../components/SlidingBar";
import About from "../components/About";
import Speakers from "../components/Speakers";
import ContactFooter from "../components/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-[#F4EBD9] selection:bg-[#C5A25F] selection:text-[#050B14]">
      {/* 1. Hero Section with Navigation Buttons */}
      <Hero />

      {/* 2. Sliding Ticker Bar */}
      <SlidingBar />

      {/* 3. About Section & Metrics */}
      <About />

      {/* 4. Keynote Speakers */}
      <Speakers />

      {/* 5. Contact Footer */}
      <ContactFooter />
    </main>
  );
}
