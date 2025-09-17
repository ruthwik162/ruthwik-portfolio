import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Lenis from "@studio-freight/lenis";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const cursorRef = useRef(null);
  const mainRef = useRef(null);

  // Smooth cursor
  useGSAP(() => {
    mainRef.current.addEventListener("mousemove", function (e) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 2.2, // shorter duration = snappier
        ease: "expo.out",
      });
    });
  });

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // scroll duration
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={mainRef} className="main relative bg-white w-full min-h-screen overflow-x-hidden">
      <div ref={cursorRef} className="cursor hidden md:block fixed w-5 h-5 rounded-full z-[9999] bg-black pointer-events-none -top-2 -left-2" />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          {/* add other routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
