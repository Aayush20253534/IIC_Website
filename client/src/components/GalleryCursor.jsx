import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GalleryCursor({ expanded, isHoveringProject }) {
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
      if (e.target.closest(".gallery-image-hover") || isHoveringProject) {
        setIsHovering(true);
        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "expo.out",
        });
      } else {
        setIsHovering(false);
        gsap.to(cursor, {
          scale: 0.2,
          opacity: 0,
          duration: 0.4,
          ease: "expo.out",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isHoveringProject]);

  if (expanded) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 rounded-full border border-[#C89B53] flex items-center justify-center pointer-events-none z-50 transition-all duration-500 ease-out ${isHoveringProject ? 'w-32 h-32 bg-[#0A2239]/15 backdrop-blur-md' : 'w-24 h-24 bg-[#0A2239]/5 backdrop-blur-sm'}`}
      style={{
        transform: "translate(-50%, -50%) scale(0.2)",
        opacity: 0,
      }}
    >
      <span
        ref={textRef}
        className={`font-mono text-xs tracking-widest text-[#0A2239] transition-all duration-300 ${
          isHovering || isHoveringProject ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        {isHoveringProject ? "EXPLORE" : "VIEW"}
      </span>
    </div>
  );
}
