import React, { useState, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import GalleryCursor from "../components/GalleryCursor";

gsap.registerPlugin(CustomEase);

// Register the custom "hop" ease that defines Aristide's signature feel
CustomEase.create("hop", "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1");

// Mock Data - visually striking images matching an event theme
const EVENTS = [
  { id: 1, title: "INAUGURAL", date: "APR 12, 2026", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000" },
  { id: 2, title: "HACKATHON", date: "APR 13, 2026", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000" },
  { id: 3, title: "PITCH DESK", date: "APR 14, 2026", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=2000" },
  { id: 4, title: "CLOSING", date: "APR 15, 2026", img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=2000" },
  { id: 5, title: "NETWORKING", date: "APR 16, 2026", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2000" },
];

// Dark marine colors for background tweens
const BG_COLORS = [
  "#020610", // bg-marine
  "#041021", // bg-marine-surface
  "#061936", // bg-marine-card
  "#010811", // darker marine
  "#0a1424", // muted marine
];

// Ensure the max word length we can display fits within our slots.
const MAX_LETTERS = 10; 

export default function Gallery() {
  const containerRef = useRef(null);
  const slidesRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // We want to handle the animation imperatively using useGSAP when activeIndex changes,
  // but since we want the letters to physically change in the DOM *before* we animate them in,
  // we need to be careful. The reference uses manual DOM manipulation for the text to split it.
  
  // We'll manage the text directly in the DOM via GSAP to ensure seamless character-by-character transitions
  // instead of relying entirely on React state which might cause a flash.

  const { contextSafe } = useGSAP({ scope: containerRef });

  const slideTo = contextSafe((newIndex) => {
    if (newIndex === activeIndex) return;

    const direction = newIndex > activeIndex ? 1 : -1;
    
    // 1. Slide the track
    gsap.to(slidesRef.current, {
      x: `-${newIndex * 100}vw`,
      duration: 1.5,
      ease: "hop",
    });

    // 2. Tween background color
    gsap.to(bgOverlayRef.current, {
      backgroundColor: BG_COLORS[newIndex % BG_COLORS.length],
      duration: 1.5,
      ease: "hop",
    });

    // 3. Animate the Title Letters
    // First, animate the *current* letters out
    gsap.to(".slide-title .letter span", {
      y: direction > 0 ? "-100%" : "100%",
      duration: 0.5,
      ease: "power2.in",
      stagger: 0.02,
      onComplete: () => {
        // Change text content directly in DOM to avoid React re-render flash during animation
        const newTitle = EVENTS[newIndex].title;
        const newDate = EVENTS[newIndex].date;
        
        // Update DOM
        const rows = document.querySelectorAll(".slide-title-row");
        if (rows.length >= 2) {
           updateRow(rows[0], newTitle);
           updateRow(rows[1], newDate, true);
        }

        // Animate the *new* letters in
        gsap.fromTo(".slide-title .letter span", 
          { y: direction > 0 ? "100%" : "-100%" },
          { y: "0%", duration: 1, ease: "power2.out", stagger: 0.03 }
        );
      }
    });

    setActiveIndex(newIndex);
  });

  const updateRow = (row, text, isDate = false) => {
    const letters = row.querySelectorAll(".letter");
    letters.forEach((letterBox, i) => {
      const span = letterBox.querySelector("span");
      if (span) {
        if (i < text.length) {
          span.textContent = text[i] === " " ? "\u00A0" : text[i];
          if (isDate) {
             span.style.fontSize = "clamp(0.8rem, 1.5vw, 1.2rem)";
             span.style.fontFamily = "var(--font-mono)";
             span.style.letterSpacing = "0.1em";
             span.style.color = "#C5A25F";
          } else {
             span.style.fontSize = "clamp(3rem, 8vw, 8rem)";
             span.style.fontFamily = "var(--font-cinzel)";
             span.style.letterSpacing = "-0.02em";
             span.style.color = "#F4EBD9";
          }
        } else {
          span.textContent = "";
        }
      }
    });
  };

  // Initial setup for the first title
  useGSAP(() => {
    const rows = document.querySelectorAll(".slide-title-row");
    if (rows.length >= 2) {
      updateRow(rows[0], EVENTS[0].title);
      updateRow(rows[1], EVENTS[0].date, true);
      
      // Initial animate in
      gsap.fromTo(".slide-title .letter span", 
        { y: "100%" },
        { y: "0%", duration: 1, ease: "power2.out", stagger: 0.03, delay: 0.2 }
      );
    }
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-screen h-screen overflow-hidden bg-[#020610] text-[#F4EBD9]"
      style={{ isolation: "isolate" }}
    >
      <GalleryCursor />

      {/* Background Color Wash */}
      <div 
        ref={bgOverlayRef}
        className="absolute inset-0 z-0 opacity-80"
        style={{ backgroundColor: BG_COLORS[0], transition: 'none' }}
      />

      {/* Segmented Top Navigation */}
      <div className="absolute top-28 left-0 right-0 z-50 flex items-center justify-center gap-1 sm:gap-2 px-8 h-8 max-w-5xl mx-auto">
        {EVENTS.map((_, i) => (
          <div 
            key={i}
            onClick={() => slideTo(i)}
            className={`h-full flex items-center cursor-pointer transition-all duration-[1.5s] ease-[cubic-bezier(0.071,0.505,0.192,0.726)] ${
              i === activeIndex ? "flex-grow" : "w-2 sm:w-4"
            }`}
          >
            <div 
              className={`h-[2px] w-full transition-colors duration-500 ${
                i === activeIndex ? "bg-[#C5A25F]" : "bg-[#F4EBD9]/20 hover:bg-[#F4EBD9]/50"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Title / Kinetic Typography Layer */}
      {/* Absolute positioning in center, pointer-events-none so we can hover images */}
      <div className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center mix-blend-difference">
        <div className="slide-title flex flex-col items-center gap-4">
          <div className="slide-title-row flex overflow-hidden">
            {/* 10 slots for the main title */}
            {Array.from({ length: MAX_LETTERS }).map((_, i) => (
              <div key={`title-${i}`} className="letter relative overflow-hidden flex items-center justify-center">
                <span className="block translate-y-[100%] leading-[0.9] font-cinzel text-5xl sm:text-8xl lg:text-[140px] tracking-tight drop-shadow-2xl font-bold">
                  {/* injected via JS */}
                </span>
              </div>
            ))}
          </div>
          <div className="slide-title-row flex overflow-hidden mt-4">
            {/* 15 slots for the date */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`date-${i}`} className="letter relative overflow-hidden flex items-center justify-center">
                <span className="block translate-y-[100%] leading-[1] font-mono text-sm sm:text-lg text-[#C5A25F] tracking-widest drop-shadow-md">
                  {/* injected via JS */}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Slides Track */}
      <div 
        ref={slidesRef}
        className="absolute inset-0 z-10 flex w-max h-full"
      >
        {EVENTS.map((event) => (
          <div 
            key={event.id}
            className="w-screen h-screen flex items-center justify-center shrink-0 p-8 pt-32 pb-16"
          >
            <div className="relative w-full max-w-4xl max-h-[70vh] aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-sm gallery-image-hover group cursor-none">
              {/* Image Container with scale transition for hover */}
              <div className="w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105">
                <img 
                  src={event.img} 
                  alt={event.title}
                  className="w-full h-full object-cover filter saturate-50 contrast-125 brightness-90 group-hover:saturate-100 transition-all duration-1000"
                />
              </div>
              
              {/* Decorative corner accents to match marine/gold theme */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#C5A25F]/40 z-20 pointer-events-none transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-[#C5A25F]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#C5A25F]/40 z-20 pointer-events-none transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-[#C5A25F]" />
              
              <div className="absolute inset-0 border border-[#C5A25F]/10 z-10 pointer-events-none" />
              
              {/* Overlay gradient to blend into dark background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020610]/80 via-transparent to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
