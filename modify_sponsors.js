const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Sponsors.jsx', 'utf8');

// 1. Replace root div classes
content = content.replace(
  /className=\{`\s*relative\s*min-h-screen\s*w-full\s*overflow-hidden\s*bg-\[#F4EBD8\]\s*text-\[#173D51\]\s*selection:bg-\[#C5A25F\]\s*selection:text-white\s*`\}/g,
  `className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#EAF5F4] via-[#F2F4E9] to-[#E7F0EC] text-[#173D51] selection:bg-[#C5A25F] selection:text-white"`
);

// 2. Replace the paper texture background with the ocean atmosphere
const oldPaperTexture = `{/* =========================================================
          GLOBAL PAPER TEXTURE
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: \`
              radial-gradient(
                circle at 20% 20%,
                rgba(126, 91, 39, 0.12) 0 1px,
                transparent 1px
              ),
              radial-gradient(
                circle at 80% 70%,
                rgba(126, 91, 39, 0.08) 0 1px,
                transparent 1px
              )
            \`,
            backgroundSize: "46px 46px, 62px 62px",
          }}
        />

        <div className="absolute -right-60 top-[25%] h-[650px] w-[650px] rounded-full bg-[#70B6C9]/10 blur-3xl" />

        <div className="absolute -left-60 top-[65%] h-[550px] w-[550px] rounded-full bg-[#C5A25F]/10 blur-3xl" />
      </div>`;

const newAtmosphere = `{/* =========================================================
          GLOBAL BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Ocean blue atmosphere */}
        <div className="absolute right-[-15%] top-[20%] h-[700px] w-[700px] rounded-full bg-[#6BB7C8]/10 blur-[100px]" />
        <div className="absolute left-[-20%] top-[55%] h-[650px] w-[650px] rounded-full bg-[#4F9FB5]/10 blur-[110px]" />
        {/* Soft sunlight */}
        <div className="absolute left-[25%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#F6D991]/10 blur-[120px]" />
      </div>
      
      <NauticalSideDecorations />`;

content = content.replace(oldPaperTexture, newAtmosphere);

// 3. Add the sailing ship to the hero
const oldHeroEnd = `          {/* Small wave decoration */}
          <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 opacity-50 md:flex">
            <span className="h-px w-16 bg-[#B38A3C]" />

            <Waves
              className="h-5 w-5 text-[#A97B2E]"
              strokeWidth={1.2}
            />

            <span className="h-px w-16 bg-[#B38A3C]" />
          </div>
        </section>`;

const newHeroEnd = `          {/* Small wave decoration */}
          <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 opacity-50 md:flex">
            <span className="h-px w-16 bg-[#B38A3C]" />
            <Waves className="h-5 w-5 text-[#A97B2E]" strokeWidth={1.2} />
            <span className="h-px w-16 bg-[#B38A3C]" />
          </div>
          
          <div className="pointer-events-none absolute bottom-[18%] left-0 z-[4] hidden w-full md:block">
            <div className="sponsor-ship-sail">
              <div className="sponsor-ship-bob">
                <Ship
                  className="w-40 h-40 text-[#A67627] opacity-60 drop-shadow-[0_12px_12px_rgba(23,61,81,0.18)] lg:w-52 lg:h-52"
                  strokeWidth={0.5}
                />
              </div>
            </div>
          </div>
        </section>`;

content = content.replace(oldHeroEnd, newHeroEnd);


// 4. Add NauticalSideDecorations component and replace SponsorCard component
const oldSponsorCardRegex = /\/\* ===============================================================\n   SPONSOR CARD\n=============================================================== \*\/\n\nfunction SponsorCard\(\{[\s\S]*\}\) \{\n  const isLarge = size === "large";[\s\S]*$/;

const newComponents = `/* ===============================================================
   SPONSOR CARD
=============================================================== */

function NauticalSideDecorations() {
  return (
    <>
      {/* LEFT SIDE */}

      <div className="pointer-events-none absolute left-0 top-[38%] z-[5] hidden xl:block">
        <div className="relative -translate-x-8">

          {/* Rope */}
          <div className="absolute -top-36 left-14 h-44 w-[3px] rounded-full bg-gradient-to-b from-[#8B6736] via-[#B68A4A] to-[#80602F] opacity-70" />

          {/* Lantern */}
          <div className="sponsor-rope">
            <div className="flex h-24 w-16 items-center justify-center rounded-[45%_45%_35%_35%] border-2 border-[#74562E] bg-[#C79645]/20 shadow-[0_0_35px_rgba(236,190,91,0.18)]">
              <div className="h-12 w-8 rounded-full bg-[#FFD989]/25 blur-[1px]" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE COMPASS */}

      <div className="sponsor-floating pointer-events-none absolute right-[-45px] top-[46%] z-[4] hidden xl:block">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-[7px] border-[#9B7334]/70 bg-[#F4E5C6]/70 shadow-[0_15px_30px_rgba(33,67,81,.15)] backdrop-blur-sm">
          <Compass className="sponsor-compass h-28 w-28 text-[#80602E]" strokeWidth={0.8} />
        </div>
      </div>

      {/* LEFT LOWER TREASURE / MAP ELEMENT */}

      <div className="pointer-events-none absolute bottom-[15%] left-[-60px] z-[4] hidden xl:block">
        <div className="rotate-[8deg] rounded-xl border border-[#9A743A]/40 bg-[#E9D5AA]/60 px-16 py-12 shadow-[0_15px_35px_rgba(33,67,81,.10)]">
          <Anchor className="h-16 w-16 text-[#8C6934]/50" strokeWidth={0.8} />
        </div>
      </div>
    </>
  );
}


function SponsorCard({
  sponsor,
  size = "medium",
}) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <article className="group relative overflow-visible transition-all duration-500 hover:-translate-y-2">

      {/* Rope-style upper corners */}

      <div className="pointer-events-none absolute -left-1 -top-1 z-20 h-10 w-10 rounded-tl-[18px] border-l-[3px] border-t-[3px] border-[#A27A3B]/60" />

      <div className="pointer-events-none absolute -right-1 -top-1 z-20 h-10 w-10 rounded-tr-[18px] border-r-[3px] border-t-[3px] border-[#A27A3B]/60" />

      {/* MAIN CARD */}

      <div className="relative overflow-hidden rounded-[20px] border border-[#C3A568]/70 bg-[#FFFDF7] shadow-[0_9px_25px_rgba(27,67,83,.12)] transition-all duration-500 group-hover:border-[#9B7332] group-hover:shadow-[0_22px_50px_rgba(27,67,83,.19)]">

        {/* GOLD HEADER LINE */}

        <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-transparent via-[#C8A351] to-transparent" />

        {/* =================================================
            SPONSOR VISUAL
        ================================================= */}

        <div className={\`relative overflow-hidden border-b border-[#C3A568]/35 bg-gradient-to-b from-[#DCEDEF] via-[#E8F1ED] to-[#E8D7B4] \${
              isLarge ? "h-[250px]" : isSmall ? "h-[130px]" : "h-[190px]"
            }\`}>

          {/* SKY GLOW */}

          <div className="pointer-events-none absolute left-[15%] top-[-40%] h-40 w-40 rounded-full bg-white/70 blur-3xl" />

          {/* MAP LINES */}

          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 500 250" preserveAspectRatio="none">
            <path d="M-20 190 C80 120 150 220 250 150 C350 80 430 150 540 80" fill="none" stroke="#77592B" strokeWidth="2" strokeDasharray="7 8" />
            <circle cx="350" cy="90" r="45" fill="none" stroke="#77592B" />
            <circle cx="350" cy="90" r="30" fill="none" stroke="#77592B" />
          </svg>

          {/* COMPASS */}

          <Compass className="sponsor-compass pointer-events-none absolute -right-7 -top-7 h-32 w-32 text-[#8E6B32] opacity-[0.08]" strokeWidth={0.7} />

          {/* LOGO */}

          <div className="absolute inset-0 flex items-center justify-center p-7">
            <div className="relative flex h-[75%] w-[78%] items-center justify-center rounded-xl border border-white/70 bg-white/55 p-5 shadow-[0_6px_20px_rgba(30,66,80,.08)] backdrop-blur-sm transition-all duration-500 group-hover:bg-white/75">
              <img src={sponsor.image} alt={sponsor.name} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>

          {/* TIER BADGE */}

          <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#B58B3D]/55 bg-[#FFF6DC]/95 px-4 py-1.5 shadow-sm">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#805E26]">
              {isLarge ? "Captain's Ally" : isSmall ? "Voyage Ally" : "Fleet Partner"}
            </span>
          </div>
        </div>

        {/* =================================================
            CARD INFORMATION
        ================================================= */}

        <div className={\`relative bg-[#FFFCF5] \${isLarge ? "p-7" : isSmall ? "p-4" : "p-6"}\`}>

          {/* Compass / title */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-[#B28B43]" />
                <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-[#98702E]">
                  Renaissance Voyage
                </span>
              </div>
              <h3 className={\`font-cinzel font-bold uppercase tracking-wide text-[#173D51] transition-colors duration-300 group-hover:text-[#9D7228] \${
                    isLarge ? "text-xl sm:text-2xl" : isSmall ? "text-sm" : "text-lg"
                  }\`}>
                {sponsor.name}
              </h3>
            </div>
            {!isSmall && (
              <Anchor className="mt-1 h-5 w-5 shrink-0 text-[#A27B37]/50 transition-transform duration-500 group-hover:-rotate-12" strokeWidth={1} />
            )}
          </div>

          {sponsor.category && (
            <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-[#6F858D]">
              {sponsor.category}
            </p>
          )}

          {!isSmall && (
            <div className="mt-5 flex items-center justify-between border-t border-[#C9AE74]/30 pt-4">
              <div className="flex items-center gap-2">
                <Ship className="h-4 w-4 text-[#9B7332]" strokeWidth={1.2} />
                <span className="font-montserrat text-[10px] text-[#647A82]">
                  Sailing with Renaissance
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#9B7332] transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          )}

        </div>

        {/* BOTTOM GOLD */}

        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[#C7A052] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </article>
  );
}
`;

content = content.replace(oldSponsorCardRegex, newComponents);

fs.writeFileSync('client/src/pages/Sponsors.jsx', content);

