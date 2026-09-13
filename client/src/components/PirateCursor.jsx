import React, { useEffect, useRef } from "react";

export default function PirateCursor() {
  const cursorRef = useRef(null);
  const iconRef = useRef(null);
  const glintRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursorEl = cursorRef.current;
    const iconEl = iconRef.current;
    const glintEl = glintRef.current;
    if (!cursorEl) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animFrameId = null;
    let isVisible = false;
    let isHovered = false;
    let isMouseDown = false;

    const updateTransform = () => {
      if (!iconEl) return;
      if (isMouseDown) {
        iconEl.style.transform = "scale(0.9) rotate(-6deg)";
      } else if (isHovered) {
        iconEl.style.transform = "scale(1.15) rotate(-4deg)";
      } else {
        iconEl.style.transform = "scale(1) rotate(0deg)";
      }
    };

    const renderLoop = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;

      // If cursor has caught up to mouse position, snap and sleep loop (0% idle CPU)
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        currentX = mouseX;
        currentY = mouseY;
        cursorEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        animFrameId = null;
        return;
      }

      currentX += dx * 0.85;
      currentY += dy * 0.85;

      cursorEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      animFrameId = requestAnimationFrame(renderLoop);
    };

    const handleMouseMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        cursorEl.style.opacity = "1";
      }
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Wake up render loop if asleep
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      updateTransform();
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      updateTransform();
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !target.tagName) return;
      const tag = target.tagName;
      const interactive =
        tag === "BUTTON" ||
        tag === "A" ||
        tag === "INPUT" ||
        tag === "SELECT" ||
        tag === "TEXTAREA" ||
        Boolean(target.closest && target.closest("a, button, [role='button'], .cursor-pointer"));

      if (interactive !== isHovered) {
        isHovered = interactive;
        if (iconEl) {
          iconEl.src = isHovered ? "/steampunk-cursor-hover.png" : "/steampunk-cursor.png";
        }
        if (glintEl) {
          glintEl.style.display = isHovered ? "block" : "none";
        }
        updateTransform();
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (cursorEl) cursorEl.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (cursorEl) cursorEl.style.opacity = "1";
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
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] hidden md:block select-none opacity-0 transition-opacity duration-200"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
    >
      <div className="relative -ml-1 -mt-1 origin-top-left transition-transform duration-150 ease-out">
        <img
          ref={iconRef}
          src="/steampunk-cursor.png"
          alt="Steampunk Cursor"
          className="w-6 h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] drop-shadow-[0_0_6px_rgba(217,119,6,0.35)] select-none pointer-events-none origin-top-left transition-transform duration-150 ease-out"
        />

        {/* Dynamic golden steampunk steam / glint pulse on hover */}
        <div
          ref={glintRef}
          className="absolute top-0 left-0 w-3 h-3 bg-[#FFE79A] rounded-full filter blur-[2px] animate-ping opacity-75 pointer-events-none hidden"
        />
      </div>
    </div>
  );
}

