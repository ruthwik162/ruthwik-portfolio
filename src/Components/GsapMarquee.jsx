import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const GsapMarquee = ({
  text = "Hello | Hello | Hello | Hello |",
  speed = 15,
  direction = "left",
  pauseOnHover = true,
}) => {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;

    // Duplicate content for seamless loop
    const content = el.innerHTML;
    el.innerHTML = content + content;

    // Direction: left (-x) or right (+x)
    const xPercent = direction === "left" ? -50 : 50;

    // Animate
    tweenRef.current = gsap.to(el, {
      xPercent: xPercent,
      duration: speed,
      ease: "linear",
      repeat: Infinity,
      modifiers: {
        xPercent: gsap.utils.wrap(-50, 0), // keeps loop seamless
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed, direction]);

  // Pause on hover
  useEffect(() => {
    if (!pauseOnHover) return;
    const el = marqueeRef.current;
    const tween = tweenRef.current;

    const handleEnter = () => tween?.pause();
    const handleLeave = () => tween?.resume();

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [pauseOnHover]);

  return (
    <div className="overflow-hidden border w-full bg-white cursor-default">
      <div
        ref={marqueeRef}
        className="whitespace-nowrap text-[5vw] font-bold tracking-tight"
      >
        {text}
      </div>
    </div>
  );
};

export default GsapMarquee;
