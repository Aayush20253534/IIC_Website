import React from "react";

export default function About() {
  return (
    <section className="py-20 px-6 bg-[#050B14]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#F4EBD9] mb-4">
          About Renaissance
        </h2>
        <div className="w-16 h-[2px] bg-[#C5A25F] mx-auto mb-6" />
        
        <p className="font-montserrat text-sm sm:text-base text-[#94A3B8] leading-relaxed font-light mb-8">
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
            <div key={idx} className="p-4 rounded-xl bg-[#0A192F]/50 border border-[#C5A25F]/20">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#C5A25F] block">
                {item.value}
              </span>
              <span className="text-[10px] font-montserrat uppercase text-[#94A3B8]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
