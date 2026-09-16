import React from "react";
import { motion } from "framer-motion";
import ContactFooter from "../components/ContactFooter";

const MASONRY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[4/5]", delay: 0.1 },
  { id: 2, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[3/4]", delay: 0.2 },
  { id: 3, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[4/3]", delay: 0.15 },
  { id: 4, src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[4/5]", delay: 0.25 },
  { id: 5, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-square", delay: 0.1 },
  { id: 6, src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[16/9]", delay: 0.2 },
  { id: 7, src: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[3/4]", delay: 0.3 },
  { id: 8, src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[4/5]", delay: 0.15 },
  { id: 9, src: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-square", delay: 0.25 },
  { id: 10, src: "https://images.unsplash.com/photo-1533174000243-7826359f1c7d?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[3/4]", delay: 0.1 },
  { id: 11, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[16/9]", delay: 0.3 },
  { id: 12, src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[4/5]", delay: 0.15 },
  { id: 13, src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[3/4]", delay: 0.2 },
  { id: 14, src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-square", delay: 0.1 },
  { id: 15, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600", aspect: "aspect-[4/5]", delay: 0.25 }
];

export default function Gallery() {
  return (
    <main className="relative w-full min-h-screen bg-fixed bg-gradient-to-br from-[#9AC8DB] via-[#D3E3DD] to-[#F4EBD9] text-[#0C2B3D] overflow-x-hidden font-montserrat selection:bg-[#C5A25F] selection:text-white">
      
      {/* Intro Header */}
      <section className="relative z-10 w-full min-h-[60vh] flex flex-col justify-end px-6 lg:px-24 pb-24 overflow-hidden">
        {/* Ocean Image Background fading into transparent */}
        <div className="absolute inset-0 pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]">
          <img
            src="/bg_images/events.png"
            alt="Renaissance Ocean Voyage"
            aria-hidden="true"
            className="h-full w-full object-cover object-top opacity-60 mix-blend-multiply"
            draggable="false"
          />
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            className="font-cinzel text-6xl md:text-[8vw] font-extrabold text-[#0C2B3D] leading-none uppercase tracking-tight"
          >
            Archive
          </motion.h1>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="mt-8 flex items-center gap-6"
        >
          <div className="h-px w-24 sm:w-48 bg-[#C5A25F] opacity-60"></div>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#8E6422] uppercase font-bold">
            A visual documentation of past expeditions
          </p>
        </motion.div>
      </section>

      {/* Masonry Grid Layout */}
      <section className="relative z-10 w-full px-4 sm:px-8 lg:px-24 pb-32">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6">
          {MASONRY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.19, 1, 0.22, 1],
                delay: img.delay 
              }}
              className={`relative mb-4 sm:mb-6 overflow-hidden rounded-xl break-inside-avoid shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-[#E8D7C2]/30 ${img.aspect} group`}
            >
              <img
                src={img.src}
                alt={`Archive capture ${index + 1}`}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle ambient overlay to blend with theme */}
              <div className="absolute inset-0 bg-[#0A2239] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
