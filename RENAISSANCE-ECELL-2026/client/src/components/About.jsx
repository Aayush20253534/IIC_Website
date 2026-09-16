import React from "react";

export default function About() {
  return (
    <section className="py-20 px-6 bg-transparent">
      <div className="max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-[#020610]/80 backdrop-blur-xl border border-[#C5A25F]/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#F4EBD9] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          About Renaissance
        </h2>
        <div className="w-20 h-[2px] bg-[#C5A25F] mx-auto mb-6" />
        
        <p className="font-montserrat text-base sm:text-lg text-[#E2E8F0] leading-relaxed font-light mb-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          The Institution’s Innovation Council and Entrepreneurship Cell at MNNIT Allahabad present the 10th edition of Renaissance. The summit brings together students, founders, and leaders to foster entrepreneurship and innovation across diverse disciplines.
        </p>

        {/* Simple Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Footfall", value: "15,000+" },
            { label: "Prize Pool", value: "₹5,00,000+" },
            { label: "Startups & VCs", value: "40+" },
            { label: "Edition", value: "10th" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#041021]/90 border border-[#C5A25F]/25 backdrop-blur-md shadow-lg">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#C5A25F] block drop-shadow-[0_0_8px_rgba(197,162,95,0.3)]">
                {item.value}
              </span>
              <span className="text-xs font-montserrat uppercase text-[#94A3B8] tracking-wider mt-1 block">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
