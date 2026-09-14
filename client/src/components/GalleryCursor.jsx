import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GalleryCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Smoothly follow the mouse
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest(".gallery-image-hover")) {
        setIsHovering(true);
        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        setIsHovering(false);
        gsap.to(cursor, {
          scale: 0.2,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-24 h-24 rounded-full border border-[#C5A25F] bg-[#020610]/40 backdrop-blur-sm pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      style={{
        transform: "translate(-50%, -50%) scale(0.2)",
        opacity: 0,
      }}
    >
      <span
        ref={textRef}
        className={`font-mono text-xs tracking-widest text-[#F4EBD9] transition-opacity duration-200 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      >
        VIEW
      </span>
    </div>
  );
}
