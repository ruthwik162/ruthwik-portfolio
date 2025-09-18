import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomScrollbar() {
  const barRef = useRef();

  useEffect(() => {
    const updateScrollbar = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      gsap.to(barRef.current, {
        scaleY: scrollPercent,
        transformOrigin: "top",
        ease: "power3.out",
        duration: 0.2
      });
    };

    window.addEventListener("scroll", updateScrollbar);
    return () => window.removeEventListener("scroll", updateScrollbar);
  }, []);

  return (
    <div className="fixed top-0 right-2 h-full w-2 bg-gray-800/30 rounded-full">
      <div
        ref={barRef}
        className="w-full h-full bg-gradient-to-b from-pink-500 to-orange-500 rounded-full scale-y-0"
      />
    </div>
  );
}
