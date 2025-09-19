import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const buttons = ["CV", "About Me", "Contact"];

const Buttons = () => {
  const btnRefs = useRef([]);

  useGSAP(() => {
    btnRefs.current.forEach((btn) => {
      if (!btn) return;

      const underline = btn.querySelector(".underline");

      // Hover In
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.1, duration: 0.3, ease: "power3.out" });
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      });

      // Hover Out
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: "power3.inOut" });
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
      });
    });
  }, []);

  return (
    <div className="flex gap-8 justify-center mt-20">
      {buttons.map((label, i) => (
        <button
          key={i}
          ref={(el) => (btnRefs.current[i] = el)}
          className="relative text-black text-lg border rounded-full tracking-wide font-semibold px-4 py-2"
        >
          {label}
          <span className="underline absolute left-0 bottom-0 h-[2px] bg-black w-full scale-x-0 origin-left"></span>
        </button>
      ))}
    </div>
  );
};

export default Buttons;
