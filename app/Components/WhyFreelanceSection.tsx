"use client";

import { useRef } from "react";

const WhyFreelanceSection = () => {
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuredCardRef = useRef<HTMLDivElement>(null);
  const principleCardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 min-h-screen bg-[#fafafa] py-32 px-6 md:px-10 overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6  md:gap-8">
          
          {/* ═══════════════════════════════════════════════════════ */}
          {/* PINNED LABEL */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div className="col-span-12 mb-12 md:mb-0 md:col-span-3">
            <div ref={labelRef} className="md:sticky md:top-32">
              <span className="text-[6.5vw] lg:text-[1.1vw]  font-semibold md:font-bold font-[PPNeueMontreal] text-black ">
                Why Freelance
              </span>
              <div className="mt-1 w-12 h-[2px] bg-black/20" />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAIN TITLE */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div ref={titleRef} className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-4">
            <h2 className="text-[8vw] md:text-[4vw] lg:text-[3.2vw] font-bold leading-[0.95] tracking-tight text-black mb-4">
              Learning what university couldn't teach
            </h2>
            <p className="text-[4vw] md:text-[1.5vw] lg:text-[1.2rem] leading-relaxed text-black/60 font-[PPNeueMontreal]">
              While my peers were building projects for grades, I was building systems for businesses. The difference? Real stakes. Real feedback. Real growth.
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FEATURED OPENING STATEMENT */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div ref={featuredCardRef} className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-10 lg:col-start-4 mb-16">
            <div className="bg-white border border-black/5 p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500">
              <p className="text-[5vw] md:text-[2.5vw] lg:text-[2.2vw] indent-[15%] leading-[1.25] font-semibold text-black/90 font-[PPNeueMontreal]">
                Freelancing wasn't a side hustle—it was my accelerated MBA in building, shipping, and sustaining digital products under real market pressure.
              </p>
              
              <div className="mt-10 pt-10 border-t border-black/5">
                <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1.05rem] leading-[1.7] text-black/70">
                  I started taking client work in my third year, not because I needed the money (though it helped), but because classroom assignments felt disconnected from reality. Building a CRUD app for a professor is one thing. Building an eCommerce platform that needs to handle inventory, payments, and actual customer complaints at 11 PM—that's a different education entirely.
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* WHAT I GAINED - PRINCIPLE CARDS */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div ref={principleCardsRef} className="col-span-12 bg-green-100 p-5 rounded md:col-span-8 md:col-start-5 lg:col-span-9 lg:col-start-4 mb-20">
            <div className="mb-12">
              <h3 className="text-[6vw] md:text-[2.5vw] lg:text-[1.8rem] font-bold text-black/90 mb-3">
                What Freelancing Actually Taught Me
              </h3>
              <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[0.95rem] text-black/50 italic">
                Skills no textbook chapter could explain
              </p>
            </div>

            <div className="space-y-8">
              {/* Principle 01 */}
              <div className="group relative">
                <div className="absolute -left-4 top-0 w-[2px] h-full bg-gradient-to-b from-black/20 via-black/10 to-transparent group-hover:from-black/40 transition-colors duration-500" />
                <div className="pl-8 pb-8 border-b border-black/5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-black/30 font-bold block mb-3">
                    01
                  </span>
                  <h4 className="text-[4.5vw] md:text-[1.8vw] lg:text-[1.4rem] font-bold text-black mb-3 group-hover:text-black/70 transition-colors">
                    Client communication is a technical skill
                  </h4>
                  <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1rem] leading-[1.7] text-black/60">
                    Translating "I want something modern" into actionable design decisions. Managing expectations when a feature takes 3 days, not 3 hours. Explaining why their homepage shouldn't auto-play music without sounding condescending. These conversations taught me more about product thinking than any framework documentation.
                  </p>
                </div>
              </div>

              {/* Principle 02 */}
              <div className="group relative">
                <div className="absolute -left-4 top-0 w-[2px] h-full bg-gradient-to-b from-black/20 via-black/10 to-transparent group-hover:from-black/40 transition-colors duration-500" />
                <div className="pl-8 pb-8 border-b border-black/5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-black/30 font-bold block mb-3">
                    02
                  </span>
                  <h4 className="text-[4.5vw] md:text-[1.8vw] lg:text-[1.4rem] font-bold text-black mb-3 group-hover:text-black/70 transition-colors">
                    Deployment isn't the finish line—it's mile one
                  </h4>
                  <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1rem] leading-[1.7] text-black/60">
                    University projects end with a demo. Real projects start with deployment. I learned about production monitoring, database backups, SSL certificates, DNS propagation, and why you never push to main on Friday afternoon. I became the person clients call when things break—which made me write better code from the start.
                  </p>
                </div>
              </div>

              {/* Principle 03 */}
              <div className="group relative">
                <div className="absolute -left-4 top-0 w-[2px] h-full bg-gradient-to-b from-black/20 via-black/10 to-transparent group-hover:from-black/40 transition-colors duration-500" />
                <div className="pl-8 pb-8 border-b border-black/5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-black/30 font-bold block mb-3">
                    03
                  </span>
                  <h4 className="text-[4.5vw] md:text-[1.8vw] lg:text-[1.4rem] font-bold text-black mb-3 group-hover:text-black/70 transition-colors">
                    Scope creep teaches you to say no professionally
                  </h4>
                  <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1rem] leading-[1.7] text-black/60">
                    "Just one more feature" sounds harmless until it's the tenth one. Freelancing taught me to document requirements, write clear proposals, and explain why adding a full CMS to a landing page project changes the timeline and budget. Saying no while keeping the client happy is an art form—and it's essential for sustainable work.
                  </p>
                </div>
              </div>

              {/* Principle 04 */}
              <div className="group relative">
                <div className="absolute -left-4 top-0 w-[2px] h-full bg-gradient-to-b from-black/20 via-black/10 to-transparent group-hover:from-black/40 transition-colors duration-500" />
                <div className="pl-8 pb-8 border-b border-black/5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-black/30 font-bold block mb-3">
                    04
                  </span>
                  <h4 className="text-[4.5vw] md:text-[1.8vw] lg:text-[1.4rem] font-bold text-black mb-3 group-hover:text-black/70 transition-colors">
                    Business context changes everything
                  </h4>
                  <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1rem] leading-[1.7] text-black/60">
                    A saree retailer needs different UX than a jewellery store. A hospital booking system has different priorities than an eCommerce checkout. Understanding the business behind the code meant better decisions about performance, features, and user flows. I stopped building "cool" and started building "effective."
                  </p>
                </div>
              </div>

              {/* Principle 05 */}
              <div className="group relative">
                <div className="absolute -left-4 top-0 w-[2px] h-full bg-gradient-to-b from-black/20 via-black/10 to-transparent group-hover:from-black/40 transition-colors duration-500" />
                <div className="pl-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-black/30 font-bold block mb-3">
                    05
                  </span>
                  <h4 className="text-[4.5vw] md:text-[1.8vw] lg:text-[1.4rem] font-bold text-black mb-3 group-hover:text-black/70 transition-colors">
                    You learn to ship imperfect
                  </h4>
                  <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1rem] leading-[1.7] text-black/60">
                    The client needs the store live by Diwali. They don't care if your CSS architecture isn't perfectly semantic or if you're using MongoDB instead of PostgreSQL. Freelancing cured me of perfectionism. Good enough, shipped, and iterated beats perfect, delayed, and theoretical every single time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* STATS / METRICS */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div ref={statsRef} className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-9 lg:col-start-4 mb-20">
            <div className="bg-black text-white p-10 md:p-14">
              <p className="text-[3vw] md:text-[1.2vw] lg:text-[0.9rem] uppercase tracking-[0.2em] text-white/50 mb-8">
                The Numbers Tell a Story
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="border-l-2 border-white/20 pl-6">
                  <p className="text-[10vw] md:text-[4vw] lg:text-[3.5rem] font-bold leading-none mb-2">
                    5+
                  </p>
                  <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[0.95rem] text-white/70">
                    Live client websites in production
                  </p>
                </div>
                
                <div className="border-l-2 border-white/20 pl-6">
                  <p className="text-[10vw] md:text-[4vw] lg:text-[3.5rem] font-bold leading-none mb-2">
                    100%
                  </p>
                  <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[0.95rem] text-white/70">
                    Client retention rate across all projects
                  </p>
                </div>
                
                <div className="border-l-2 border-white/20 pl-6">
                  <p className="text-[10vw] md:text-[4vw] lg:text-[3.5rem] font-bold leading-none mb-2">
                    2 AM
                  </p>
                  <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[0.95rem] text-white/70">
                    Latest debugging session (worth every minute)
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1rem] leading-relaxed text-white/80">
                  Each project taught me something new. Each client pushed me to solve problems I hadn't encountered in coursework. Each deployment made me a better engineer. This wasn't just work—it was compound learning at scale.
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* THE REAL GAIN */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-5 mb-16">
            <div className="border-l-4 border-black/10 pl-8 py-2">
              <p className="text-[5vw] md:text-[2vw] lg:text-[1.5rem] leading-[1.3] font-semibold text-black/80 italic">
                "The real gain wasn't the money or the portfolio pieces. It was discovering that I could take an idea from a client's napkin sketch to a production system serving real users—and do it reliably, repeatedly, professionally."
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* CLOSING STATEMENT */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div ref={closingRef} className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7 mb-20">
            <div className="border-t border-black/10 pt-12">
              <p className="text-[6vw] md:text-[3vw] lg:text-[2.2vw] font-bold leading-[1.1] text-black/90">
                I graduated with a degree in Computer Science. But I learned to be a developer by freelancing.
              </p>
              
              <div className="mt-10">
                <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1rem] leading-relaxed text-black/60">
                  Now I'm seeking a corporate role where I can bring this combination: academic foundations plus battle-tested practical experience. I know how to ship code that matters. I know how to communicate with stakeholders who don't speak JavaScript. I know how to own a product from conception to maintenance.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4 text-black/40">
                <div className="h-[1px] flex-1 bg-black/10" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Nothing2Real Studio
                </span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* LARGE BRAND NAME - VISUAL ANCHOR */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div ref={brandNameRef} className="col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="relative overflow-hidden py-12">
              <h1 className="text-[15vw] lg:text-[12vw] tracking-[-0.02em] font-bold text-black/5 leading-none select-none">
                FREELANCE
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent transform -skew-x-12" />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FINAL CTA - OPTIONAL */}
          {/* ═══════════════════════════════════════════════════════ */}
          
          <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-4">
            <div className="bg-white border-2 border-black p-8 text-center hover:bg-black hover:text-white transition-all duration-500 group cursor-pointer">
              <p className="text-[3vw] md:text-[1.5vw] lg:text-[1.2rem] font-bold mb-4">
                Want to see what I built during those 2 AM sessions?
              </p>
              <a 
                href="#works" 
                className="inline-flex items-center gap-2 text-[3vw] md:text-[1.2vw] lg:text-[0.9rem] uppercase tracking-[0.15em] font-bold group-hover:underline underline-offset-4"
              >
                View Projects
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyFreelanceSection;