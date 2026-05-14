"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  children: ReactNode;
}

export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    // Standard FAANG-level practice: update ScrollTrigger on every Lenis scroll frame
    gsap.registerPlugin(ScrollTrigger);

    function update(time: number) {
      ScrollTrigger.update();
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 1.1,        // Lower is smoother/floatier (0.1 is standard)
        duration: 0.6,    // Scroll duration
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 2
      }}
    >
      {children}
    </ReactLenis>
  );
}