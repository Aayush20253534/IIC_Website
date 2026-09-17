import { useSmoothScroll } from "../lib/smoothScroll";

export default function ScrollIndicatorRail() {
  const { scrollTo } = useSmoothScroll();

  const handleScrollDown = () => {
    scrollTo(window.scrollY + window.innerHeight * 0.85);
  };

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none">
      {/* Top Accent Line */}
      <div className="w-[1px] h-14 bg-gradient-to-b from-transparent to-[#d4af37]/60 mb-4" />

      {/* Rotated Vertical Scroll Text */}
      <button
        onClick={handleScrollDown}
        className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.35em] text-[#d4af37]/80 hover:text-[#f3e5ab] transition-colors py-3 cursor-pointer group"
      >
        <span className="group-hover:translate-x-[2px] transition-transform">SCROLL DOWN →</span>
      </button>

      {/* Bottom Accent Line */}
      <div className="w-[1px] h-14 bg-gradient-to-t from-transparent to-[#d4af37]/60 mt-4" />
    </div>
  );
}
