// Components/Text.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText"; // use official plugin path

gsap.registerPlugin(ScrollTrigger, SplitText);

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

    element.innerHTML = text;

    // Split text into chars (nested spans: wrapper + inner)
    const split = new SplitText(element, {
      type: "chars",
      charsClass: "char-inner",
      tag: "span",
    });

    // Wrap chars in overflow-hidden containers
    split.chars.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "inline-block";

      char.parentNode.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    // Initial state
    gsap.set(split.chars, { opacity: 0.1, x: -10, color: "#000" });

    // Trigger element
    const triggerElement = triggerParent || element.parentElement;

    // Animate
    gsap.to(split.chars, {
      x: 0,
      opacity: 1,
      stagger,
      ease: "power4.out",
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub: 1,
        // markers: true,
      },
    });

    return () => {
      split.revert(); // clean up SplitText
    };
  }, [text, stagger, start, end, triggerParent]);

  return <span ref={textRef} className={className}></span>;
};

export default Text;
