import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Text = ({ sections }) => {
  function paraAnima(tag, parent) {
    let element = document.querySelector(tag);
    if (!element) return;

    let clutter = "";
    element.textContent.split(" ").forEach((char) => {
      if (char === " ") {
        clutter += `<span>&nbsp;</span>`;
      } else {
        clutter += `<span>${char} </span>`;
      }
    });
    element.innerHTML = clutter;

    // Initial styles
    gsap.set(`${tag} span`, {
      opacity: 0.1,
      color: "#aaa", // dull grey before animation
    });

    // Animate
    gsap.to(`${tag} span`, {
      scrollTrigger: {
        trigger: parent,
        start: "top 30%",
        end: "bottom 70%",
        scrub: 1,
        // markers: true, // debug only
      },
      opacity: 1,
      color: "#000",
      stagger: 0.03,
      ease: "power4.out",
    });
  }

  useEffect(() => {
    sections.forEach((_, i) => {
      paraAnima(`.textpara${i}`, `.para${i}`);
    });
  }, [sections]);

  return (
    <div
      data-scroll
      data-scroll-speed="-.7"
      className="h-auto w-full overflow-hidden"
    >
      {sections.map((section, i) => (
        <div
          key={i}
          data-color="white"
          className={`para${i} section w-full h-[70vh] flex items-center justify-center mt-32`}
        >
          <div className="text w-[70%] flex flex-col items-center justify-center">
            <p
              className={`textpara${i} ${
                section.type === "h3" ? "text-5xl" : "text-2xl"
              } font-light text-center leading-[2.8rem]`}
            >
              {section.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Text;
