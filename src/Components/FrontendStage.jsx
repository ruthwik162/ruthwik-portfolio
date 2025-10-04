import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FrontendStage = () => {
  const containerRef = useRef(null);
  const slideRef = useRef([]);

  useGSAP(() => {
    // --- Setup slides entering from alternate directions ---
    slideRef.current.forEach((slide, i) => {
      gsap.set(slide, {
        yPercent: i % 2 === 0 ? 120 : -120,
        rotate: i % 2 === 0 ? 6 : -6,
        transformOrigin: "center",
      });
    });

    gsap.to(slideRef.current, {
      yPercent: 0,
      rotate: 0,
      duration: 1.8,
      ease: "power4.inOut",
      stagger: 0.15,
    });

    // --- Animate text blend fade-in ---
    gsap.from(".blend-text", {
      opacity: 0,
      y: 60,
      delay: 1.2,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.2,
    });

    // --- Floating grid lines motion ---
    gsap.to(".grid-line", {
      y: 20,
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "sine.inOut",
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="xl:w-[80vw] px-10 flex items-center justify-center xl:h-screen">
      <div
        ref={containerRef}
        className="relative w-full h-[70vh] overflow-hidden rounded-4xl  shadow-[0_0_30px_rgba(255,255,255,0.05)]"
      >
        {/* GRID OVERLAY */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Vertical Lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="grid-line absolute top-0 h-full w-[1px] bg-black"
              style={{ left: `${(i + 1) * 20}%` }}
            ></div>
          ))}

          {/* Horizontal Lines */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="grid-line absolute left-0 w-full h-[1px] bg-black"
              style={{ top: `${(i + 1) * 25}%` }}
            ></div>
          ))}
        </div>

        {/* MAIN BLEND TITLE */}
        <h1 className="blend-text absolute inset-0 flex items-center justify-center text-[8vw] md:text-[6vw] font-[aeonik1] text-white mix-blend-difference tracking-tight z-20 select-none pointer-events-none">
          Frontend
        </h1>

        {/* MEANING / SUBTEXT */}
        <div className="blend-text absolute inset-0 flex flex-col items-center justify-center gap-[2vw] z-30 mix-blend-difference text-center">
          <h2 className="text-[3vw] md:text-[2.5vw] font-[aeonik2] text-white/90 leading-[3vw] uppercase tracking-[0.2em]">
            Crafting Interactive Experiences
          </h2>
          <h3 className="text-[2vw] md:text-[1.5vw] font-[font2] text-gray-200/80">
            Where design meets emotion and motion tells stories.
          </h3>
          <p className="text-[1.2vw] md:text-[1vw] font-[Helvetica] text-gray-300/70 italic">
            “Every pixel has a purpose — every animation, a heartbeat.”
          </p>
        </div>

        {/* SLIDES */}
        <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (slideRef.current[i] = el)}
              className={`w-1/5 h-full ${
                i % 2 === 0 ? "bg-amber-100" : "bg-red-400"
              } border-l border-white/10`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontendStage;
