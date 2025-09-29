import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const GsapMarquee = ({
  speed = 30,
  direction = "left",
  children,
}) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    const distance = el.scrollWidth / 2; // width of one duplicated set

    gsap.to(el, {
      x: direction === "left" ? -distance : distance,
      duration: speed,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const num = parseFloat(x);
          return direction === "left"
            ? `${num % -distance}px`
            : `${num % distance}px`;
        },
      },
    });
  }, [speed, direction]);

  return (
    <div className="overflow-hidden w-full cursor-default">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap uppercase text-[7vw] md:text-[4.5vw] md:gap-[7vh] font-poppins tracking-tight"
      >
        {/* duplicate at least twice for seamless loop */}
        <div className="flex items-center gap-2 md:gap-8">{children}</div>
        <div className="flex items-center gap-2 md:gap-8">{children}</div>
        <div className="flex items-center gap-2 md:gap-8">{children}</div>
      </div>
    </div>
  );
};

export default GsapMarquee;
