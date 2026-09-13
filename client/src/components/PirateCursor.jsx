import React, { useEffect, useState, useRef } from "react";

export default function PirateCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animFrameId = null;

    const handleMouseMove = (e) => {
      if (!visible) setVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const renderLoop = () => {
      currentX += (mouseX - currentX) * 0.8;
      currentY += (mouseY - currentY) * 0.8;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      animFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] hidden md:block select-none"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
    >
      <div
        className={`relative -ml-1 -mt-1 transition-transform duration-150 ease-out origin-top-left ${
          isMouseDown
            ? "scale-90 rotate-[-6deg]"
            : isHovered
            ? "scale-115 rotate-[-4deg]"
            : "scale-100 rotate-0"
        }`}
      >
        <img
          src={isHovered ? "/steampunk-cursor-hover.png" : "/steampunk-cursor.png"}
          alt="Steampunk Cursor"
          className="w-6 h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] drop-shadow-[0_0_6px_rgba(217,119,6,0.35)] select-none pointer-events-none"
        />

        {/* Dynamic golden steampunk steam / glint pulse on hover */}
        {isHovered && (
          <div className="absolute top-0 left-0 w-3 h-3 bg-[#FFE79A] rounded-full filter blur-[2px] animate-ping opacity-75 pointer-events-none" />
        )}
      </div>
    </div>
  );
}
