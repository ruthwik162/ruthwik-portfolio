import gsap from "gsap";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Lenis from "@studio-freight/lenis";
import { Route, Routes, useLocation } from "react-router-dom";
import Projects from "./Pages/Projects";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Capability from "./Pages/Capability";
import ProjectPage from "./Components/ProjectPage";

const App = () => {
  const cursorRef = useRef(null);
  const mainRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);
  const location = useLocation(); // to track current route

  // Smooth cursor movement
  useEffect(() => {
    if (!mainRef.current || !cursorRef.current) return;

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
  }, []);

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId;
    const animate = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Handle click
  const handleClick = () => {
    if (!soundEnabled) setSoundEnabled(true);

    gsap.fromTo(
      cursorRef.current,
      { scale: 0.9, backgroundColor: "#4338ca" },
      { scale: 1.6, backgroundColor: "#22c55e", duration: 0.3, yoyo: true, repeat: 1 }
    );

    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
    }
  };

  // Optional: log current route only once per navigation
  useEffect(() => {
    console.log(`Navigated to ${location.pathname}`);
  }, [location.pathname]);

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
        <div className="w-3 h-3 rounded-full bg-black" />
        {!soundEnabled && (
          <p className="font-[font2] text-sm text-black whitespace-nowrap">
            [ click to enable sound ]
          </p>
        )}
      </div>

      <audio ref={audioRef} src="/click.mp3" preload="auto" />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/capability" element={<Capability />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:_id" element={<ProjectPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
