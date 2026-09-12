import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WaterButton({
  children,
  to,
  onClick,
  className = "",
  variant = "primary", // "primary" | "secondary"
  ...props
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth || 180);
    let height = (canvas.height = canvas.parentElement.clientHeight || 50);

    // Spring-based Water Physics Simulation
    const NUM_SPRINGS = 32;
    const springs = [];
    for (let i = 0; i < NUM_SPRINGS; i++) {
      springs.push({
        p: 0, // position (displacement from base water line)
        v: 0, // velocity
        target: 0,
      });
    }

    const K = 0.035; // Spring stiffness
    const DAMPING = 0.045; // Damping
    const SPREAD = 0.22; // Wave propagation to neighbors

    // Water level state (0 = bottom, 1 = filled)
    let currentWaterFill = 0;
    let targetWaterFill = 0;

    // Bubbles
    const bubbles = [];
    for (let i = 0; i < 8; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: height + Math.random() * 20,
        r: Math.random() * 2 + 1,
        speed: Math.random() * 1.5 + 0.8,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId;
    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      time += 0.05;

      // Update target fill based on hover state
      targetWaterFill = isHovered ? 1.0 : 0.0;
      currentWaterFill += (targetWaterFill - currentWaterFill) * 0.09;

      // Only draw if water is visible
      ctx.clearRect(0, 0, width, height);

      if (currentWaterFill > 0.01) {
        const baseWaterY = height - currentWaterFill * height;

        // Ambient sine wave perturbation
        for (let i = 0; i < NUM_SPRINGS; i++) {
          springs[i].target = Math.sin(time * 2 + (i / NUM_SPRINGS) * Math.PI * 3) * 2.5 * currentWaterFill;
          const force = -K * (springs[i].p - springs[i].target) - DAMPING * springs[i].v;
          springs[i].v += force;
          springs[i].p += springs[i].v;
        }

        // Neighbor Wave Propagation (2 passes for smooth fluid spread)
        for (let pass = 0; pass < 2; pass++) {
          for (let i = 0; i < NUM_SPRINGS; i++) {
            if (i > 0) {
              const leftDelta = SPREAD * (springs[i - 1].p - springs[i].p);
              springs[i - 1].v += leftDelta;
              springs[i - 1].p += leftDelta;
            }
            if (i < NUM_SPRINGS - 1) {
              const rightDelta = SPREAD * (springs[i + 1].p - springs[i].p);
              springs[i + 1].v += rightDelta;
              springs[i + 1].p += rightDelta;
            }
          }
        }

        const stepX = width / (NUM_SPRINGS - 1);

        // 1. Draw Deep Ocean Water Gradient Body
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseWaterY + springs[0].p);

        for (let i = 1; i < NUM_SPRINGS; i++) {
          const prevX = (i - 1) * stepX;
          const prevY = baseWaterY + springs[i - 1].p;
          const currX = i * stepX;
          const currY = baseWaterY + springs[i].p;
          const midX = (prevX + currX) / 2;
          const midY = (prevY + currY) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        }
        ctx.lineTo(width, baseWaterY + springs[NUM_SPRINGS - 1].p);
        ctx.lineTo(width, height);
        ctx.closePath();

        const waterGrad = ctx.createLinearGradient(0, baseWaterY, 0, height);
        waterGrad.addColorStop(0, "rgba(56, 189, 248, 0.85)"); // bright cyan crest
        waterGrad.addColorStop(0.3, "rgba(2, 132, 199, 0.9)"); // vivid ocean blue
        waterGrad.addColorStop(1, "rgba(5, 11, 20, 0.95)"); // deep sea navy
        ctx.fillStyle = waterGrad;
        ctx.fill();

        // 2. Draw Foam & Water Surface Crest Line
        ctx.beginPath();
        ctx.moveTo(0, baseWaterY + springs[0].p);
        for (let i = 1; i < NUM_SPRINGS; i++) {
          const prevX = (i - 1) * stepX;
          const prevY = baseWaterY + springs[i - 1].p;
          const currX = i * stepX;
          const currY = baseWaterY + springs[i].p;
          const midX = (prevX + currX) / 2;
          const midY = (prevY + currY) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        }
        ctx.lineTo(width, baseWaterY + springs[NUM_SPRINGS - 1].p);
        ctx.strokeStyle = "rgba(224, 242, 254, 0.95)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 3. Draw Rising Water Bubbles
        if (isHovered && currentWaterFill > 0.2) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          bubbles.forEach((b) => {
            b.y -= b.speed;
            b.wobble += 0.1;
            const bx = b.x + Math.sin(b.wobble) * 2;
            if (b.y < baseWaterY) {
              b.y = height + 5;
              b.x = Math.random() * width;
            }
            ctx.beginPath();
            ctx.arc(bx, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();
          });
        }
        ctx.restore();
      }
    };

    render();

    // Mouse Ripple Splashing on the Water Canvas
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const index = Math.floor((mouseX / width) * NUM_SPRINGS);
      if (index >= 0 && index < NUM_SPRINGS) {
        springs[index].v -= 5.0; // Push water down on mouse path
      }
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  const content = (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl font-montserrat font-bold text-xs uppercase tracking-widest transition-all duration-300 select-none shadow-lg cursor-pointer ${
        isHovered
          ? "border-2 border-[#8E5E32] bg-[#2E1A0F] shadow-[0_6px_20px_rgba(0,0,0,0.8)]"
          : variant === "primary"
          ? "bg-[#C5A25F] text-[#050B14] border-2 border-[#C5A25F] hover:text-[#F4EBD9]"
          : "bg-[#0A192F]/80 text-[#F4EBD9] border-2 border-[#C5A25F]/40 hover:border-[#C5A25F]"
      } ${className}`}
      {...props}
    >
      {/* Wooden Box Plank Background (Active on hover) */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(180deg, #4A2B15 0%, #30190B 50%, #201007 100%)",
        }}
      >
        {/* Wood Plank Grooves */}
        <div className="absolute inset-x-0 top-1/3 h-[1px] bg-[#1A0C04] opacity-70" />
        <div className="absolute inset-x-0 top-2/3 h-[1px] bg-[#1A0C04] opacity-70" />

        {/* Brass Corner Brackets & Rivets */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#C5A25F]" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#C5A25F]" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#C5A25F]" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#C5A25F]" />
        
        {/* Subtle Rivet Dots */}
        <div className="absolute top-1.5 left-3 w-1 h-1 rounded-full bg-[#C5A25F]/80" />
        <div className="absolute top-1.5 right-3 w-1 h-1 rounded-full bg-[#C5A25F]/80" />
        <div className="absolute bottom-1.5 left-3 w-1 h-1 rounded-full bg-[#C5A25F]/80" />
        <div className="absolute bottom-1.5 right-3 w-1 h-1 rounded-full bg-[#C5A25F]/80" />
      </div>

      {/* Realistic Physics Water Filling Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Button Content Label (Sits above water with subtle floating depth) */}
      <span
        className={`relative z-20 px-8 py-3.5 flex items-center gap-2 transition-transform duration-300 ${
          isHovered ? "text-[#F4EBD9] translate-y-[-1px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : ""
        }`}
      >
        {children}
      </span>
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return <button onClick={onClick}>{content}</button>;
}
