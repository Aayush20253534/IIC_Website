import React from "react";
import { Link } from "react-router-dom";

export default function SlidingBar() {
  return (
    <div className="bg-[#0A192F] py-2 overflow-hidden border-y border-[#C5A25F]/25">
      <div className="flex w-max animate-marquee">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                to="/events"
                className="mx-10 text-[11px] text-[#C5A25F] font-montserrat tracking-widest uppercase flex items-center gap-3 hover:text-white transition-colors font-medium"
              >
                <span>◆</span>
                <span>
                  ✨ Renaissance (10th Edition) is <strong className="text-white">Live Now</strong> — Register for Competitions 🚀
                </span>
                <span>◆</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
