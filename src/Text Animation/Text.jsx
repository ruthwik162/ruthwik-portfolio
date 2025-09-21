// Components/Text.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Text = ({
  text,
  className = "text-justify break-words hyphens-auto",
  triggerParent = null,
  stagger = 0.03,
  start = "top 70%",
  end = "bottom 40%",
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into characters
    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      return span;
    });

    element.innerHTML = "";
    chars.forEach((c) => element.appendChild(c));

    // Initial state
    gsap.set(chars, { opacity: 0.1, color: "#000" });

    // Determine trigger: parent element if triggerParent is null
    const triggerElement = triggerParent || element.parentElement;

    // Animate characters
    gsap.to(chars, {
      opacity: 1,
      stagger,
      ease: "power4.out",
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub: 1,
        // markers: true, // enable for debugging
      },
    });
  }, [text, stagger, start, end, triggerParent]);

  return <span ref={textRef} className={className}></span>;
};

export default Text;
