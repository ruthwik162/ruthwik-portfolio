import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Lenis from "@studio-freight/lenis";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./Projects";
import Aboutme from "./Pages/Profile";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";

const App = () => {
  const cursorRef = useRef(null);
  const mainRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  // Smooth cursor movement
  useGSAP(() => {
    const handleMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "expo.out",
      });
    };

    mainRef.current.addEventListener("mousemove", handleMove);
    return () => mainRef.current.removeEventListener("mousemove", handleMove);
  });

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

  // Handle click
  const handleClick = () => {
    // First click → enable sound
    if (!soundEnabled) {
      setSoundEnabled(true);
    }

    // Animate cursor pulse
    gsap.fromTo(
      cursorRef.current,
      { scale: 0.9, backgroundColor: "#4338ca" }, // indigo-700
      {
        scale: 1.6,
        backgroundColor: "#22c55e", // green pulse
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      }
    );

    // Play click sound if enabled
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
    }
  };

  return (
    <div
      ref={mainRef}
      onClick={handleClick}
      className="main relative bg-white w-full min-h-screen overflow-x-hidden"
    >
      <div
        ref={cursorRef}
        className="cursor hidden fixed md:flex items-center rounded-full -top-1.5 -left-1.5 gap-2 z-[9999] pointer-events-none"
      >
        {/* Dot (relative to flex, not fixed) */}
        <div className="w-3 h-3 rounded-full bg-black" />

        {/* Enable sound text */}
        {!soundEnabled && (
          <p className="font-[font2] text-sm text-black whitespace-nowrap">
            [ click to enable sound ]
          </p>
        )}
      </div>





      <audio ref={audioRef} src="/click.mp3" preload="auto" />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-me" element={<Aboutme />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
