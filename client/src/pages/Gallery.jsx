import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import ContactFooter from "../components/ContactFooter";

/* =================================================================
   GLOBAL SANDY + OCEANIC ATMOSPHERE (No White, Warm Beach & Sea)
================================================================= */
function GalleryOceanAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#EBDDC8] via-[#D8ECEE] to-[#E6D4BC]">
      {/* Soft Caribbean Blue Depth Wash */}
      <div className="absolute right-[-10%] top-[16%] h-[600px] w-[600px] rounded-full bg-[#5FB0C3]/12 blur-[90px]" />
      <div className="absolute left-[-10%] top-[50%] h-[550px] w-[550px] rounded-full bg-[#3F95A9]/10 blur-[90px]" />

      {/* Warm sunlight sand glow */}
      <div className="absolute left-[28%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[#E8C87A]/15 blur-[100px]" />

      {/* Fine sand parchment grain texture */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(20,65,80,.25) 0 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(165,120,45,.22) 0 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px, 58px 58px",
        }}
      />
    </div>
  );
}



const EVENTS = [
  { 
    id: 1, title: "INAUGURAL", date: "APR 12, 2026", 
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600", 
    category: "Flagship",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1600"
    ]
  },
  { 
    id: 2, title: "HACKATHON", date: "APR 13, 2026", 
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600", 
    category: "Competition",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
    ]
  },
  { 
    id: 3, title: "PITCH DESK", date: "APR 14, 2026", 
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=1600", 
    category: "Workshop",
    images: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=1600"
    ]
  },
  { 
    id: 4, title: "CLOSING", date: "APR 15, 2026", 
    img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1600", 
    category: "Ceremony",
    images: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1533174000243-7826359f1c7d?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600"
    ]
  },
  { 
    id: 5, title: "NETWORKING", date: "APR 16, 2026", 
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600", 
    category: "Networking",
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=1600"
    ]
  },
  { 
    id: 6, title: "WORKSHOP", date: "APR 17, 2026", 
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600", 
    category: "Learning",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1600"
    ]
  },
];

function ProjectItem({ event, index, setSelectedImage, hoveredIndex, setHoveredIndex }) {
  const ref = useRef(null);
  
  // Viewport scroll progress for this specific project section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Image parallax and scale effect
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  
  // Title reveal effect
  const titleY = useTransform(scrollYProgress, [0.1, 0.4], ["120%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <div 
      ref={ref}
      className="relative min-h-[120vh] w-full flex items-center justify-center py-32 px-4 sm:px-12 lg:px-24"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="relative w-full max-w-[1400px] flex flex-col justify-center">
        
        {/* Massive Background Number */}
        <motion.div 
          className="absolute -top-32 -left-12 lg:-left-24 text-[20vw] font-cinzel font-bold text-[#0A2239] opacity-5 pointer-events-none select-none leading-none z-0"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]) }}
        >
          0{index + 1}
        </motion.div>

        {/* Project Content */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Title Area */}
          <div className={`w-full lg:w-1/2 flex flex-col mt-8 lg:mt-0 ${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
            <div className="flex items-center gap-4 mb-6 overflow-hidden">
              <motion.span 
                className="font-mono text-xs tracking-[0.3em] text-[#8E6422] uppercase font-bold"
                style={{ y: titleY }}
              >
                {event.category}
              </motion.span>
              <motion.div 
                className="h-px bg-[#C5A25F] flex-1 opacity-60 origin-left"
                style={{ scaleX: useTransform(scrollYProgress, [0.2, 0.4], [0, 1]) }}
              />
              <motion.span 
                className="font-mono text-xs text-[#125D73] font-bold"
                style={{ y: titleY }}
              >
                {event.date}
              </motion.span>
            </div>
            
            <div className="overflow-hidden pb-4">
              <motion.h2 
                className={`font-cinzel text-5xl sm:text-7xl lg:text-[7vw] font-bold text-[#0C2B3D] leading-[0.9] uppercase tracking-tight transition-all duration-700 ${isOtherHovered ? 'opacity-30 blur-sm' : 'opacity-100'} ${isHovered ? 'text-[#8E6422]' : ''}`}
                style={{ y: titleY, opacity: titleOpacity }}
              >
                {event.title}
              </motion.h2>
            </div>
          </div>

          {/* Image Area */}
          <div className={`w-full lg:w-1/2 flex ${index % 2 === 0 ? 'order-1 lg:order-2 justify-end' : 'order-1 lg:order-1 justify-start'}`}>
            <motion.div 
              className={`group relative w-full lg:w-[85%] aspect-[4/5] overflow-hidden cursor-pointer gallery-image-hover transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isHovered ? 'scale-[1.03] shadow-2xl' : 'scale-100 shadow-lg'} ${isOtherHovered ? 'opacity-40 scale-[0.98]' : 'opacity-100'} hover:scale-[1.06] hover:shadow-2xl`}
              onClick={() => setSelectedImage(event)}
              layoutId={`project-image-${event.id}`}
            >
              <motion.div
                className="absolute -inset-[10%] w-[120%] h-[120%]"
                style={{ y, scale }}
              >
                <img 
                  src={event.img} 
                  alt={event.title}
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02]"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-[#0A2239] opacity-[0.05] mix-blend-overlay pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <main className="relative w-full min-h-screen text-[#0C2B3D] overflow-x-hidden font-montserrat selection:bg-[#C5A25F] selection:text-white">
      <GalleryOceanAtmosphere />
      
      {/* Intro Header */}
      <section className="relative z-10 w-full min-h-[60vh] flex flex-col justify-end px-6 lg:px-24 pb-24 overflow-hidden">
        
        {/* Ocean Image Background just like Sponsors */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <img
            src="/bg_images/events.png"
            alt="Renaissance Ocean Voyage"
            aria-hidden="true"
            className="sponsor-hero-raster h-full w-full object-cover object-top opacity-90"
            draggable="false"
          />
          {/* Subtle marine depth tint */}
          <div className="absolute inset-0 bg-[#062538]/20 mix-blend-multiply" />
          {/* Bright oceanic sea wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D2E9ED]/30 via-transparent to-[#EBDDC8]/95" />
          {/* Warm morning sunlight sand wash */}
          <div className="absolute left-0 top-0 h-full w-[72%] bg-gradient-to-r from-[#EBDDC8]/92 via-[#EBDDC8]/50 to-transparent" />
          {/* Bottom sandy shoreline blend into the page */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#EBDDC8] via-[#EBDDC8]/85 to-transparent" />
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

      {/* Projects List */}
      <section className="relative z-10 w-full flex flex-col pb-32">
        {EVENTS.map((event, index) => (
          <ProjectItem 
            key={event.id}
            event={event}
            index={index}
            setSelectedImage={setSelectedImage}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </section>

      {/* Elegant Modal Transition */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-[#EBDDC8] via-[#D8ECEE] to-[#E6D4BC] overflow-y-auto"
          >
            {/* Modal Texture Base */}
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(20,65,80,.3) 0 1px, transparent 1px),
                  radial-gradient(circle at 75% 75%, rgba(165,120,45,.25) 0 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px, 58px 58px",
              }}
            />

            <div className="relative min-h-screen w-full flex flex-col">
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4 }}
                onClick={() => setSelectedImage(null)}
                className="fixed top-24 right-6 sm:top-28 sm:right-8 z-[110] flex items-center gap-3 text-[#0C2B3D] hover:text-[#8E6422] transition-colors group cursor-pointer"
              >
                <span className="font-mono text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity bg-[#EBDDC8]/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm font-bold">Close</span>
                <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center bg-[#EBDDC8]/80 backdrop-blur-sm shadow-lg">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 1L1 13M1 1L13 13" />
                  </svg>
                </div>
              </motion.button>

              {/* Massive Layout Image with Slider */}
              <div className="relative w-full h-[70vh] sm:h-[85vh] group/slider">
                <motion.div 
                  layoutId={`project-image-${selectedImage.id}`}
                  className="absolute inset-0 w-full h-full overflow-hidden"
                >
                  <AnimatePresence mode="popLayout">
                    <motion.img 
                      key={currentImageIndex}
                      src={selectedImage.images[currentImageIndex]} 
                      alt={`${selectedImage.title} ${currentImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
                    />
                  </AnimatePresence>
                  {/* Subtle vignette/fade into background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E6D4BC] pointer-events-none z-10 opacity-90" />
                </motion.div>

                {/* Slider Controls */}
                {selectedImage.images.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedImage.images.length - 1));
                      }}
                      className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#EBDDC8]/80 border border-[#C2A169]/30 backdrop-blur-md text-[#0C2B3D] hover:bg-[#EBDDC8] hover:border-[#8E6422] transition-all opacity-0 group-hover/slider:opacity-100 shadow-[0_10px_30px_rgba(20,55,70,0.15)] z-50 cursor-pointer"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev < selectedImage.images.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#EBDDC8]/80 border border-[#C2A169]/30 backdrop-blur-md text-[#0C2B3D] hover:bg-[#EBDDC8] hover:border-[#8E6422] transition-all opacity-0 group-hover/slider:opacity-100 shadow-[0_10px_30px_rgba(20,55,70,0.15)] z-50 cursor-pointer"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-50">
                      {selectedImage.images.map((_, i) => (
                        <button 
                          key={i} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(i);
                          }}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${i === currentImageIndex ? 'bg-[#8E6422] w-8' : 'bg-[#EBDDC8]/60 hover:bg-[#EBDDC8] w-2'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Detailed Project Info */}
              <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-12 -mt-24 pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                  <div>
                    <span className="mb-4 inline-block font-mono text-xs tracking-[0.2em] text-[#8E6422] uppercase font-bold">
                      {selectedImage.category} // {selectedImage.date}
                    </span>
                    <h1 className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-extrabold text-[#0C2B3D] leading-none uppercase tracking-tight">
                      {selectedImage.title}
                    </h1>
                  </div>
                  
                  <div className="max-w-sm text-sm sm:text-base text-[#125D73] leading-relaxed font-semibold">
                    A defining moment captured during our {selectedImage.category.toLowerCase()} event. This photograph represents the spirit of innovation and collaboration that drives our community forward.
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ContactFooter />
    </main>
  );
}
