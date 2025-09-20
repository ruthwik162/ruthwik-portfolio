import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const GsapMarquee = ({
  speed = 5,
  direction = "left",
  children,
}) => {
  const marqueeRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    const distance = el.scrollWidth / 2; // half, since duplicated

    tweenRef.current = gsap.to(el, {
      x: direction === "left" ? -distance : 0,
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

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed, direction]);



  return (
    <div className="overflow-hidden w-full bg-white cursor-default border">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap uppercase text-[7vw] md:text-[4.5vw]  md:gap-[7vh] font-poppins font-poppins-400 tracking-tight"
      >
        <div className="flex items-center justify-center gap-2 md:gap-8">{children}</div>
        <div className="flex items-center justify-center gap-2 md:gap-8">{children}</div>
      </div>
    </div>
  );
};

export default GsapMarquee;
