import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useEffect } from "react";
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

  // Smooth cursor
  useGSAP(() => {
    mainRef.current.addEventListener("mousemove", function (e) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1, // shorter duration = snappier
        ease: "expo.out",
        srcub:true
      });
    });
  });

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3, // scroll duration
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
      
      <div ref={cursorRef} className="cursor hidden md:block fixed w-3 h-3 rounded-full z-[9999] bg-indigo-700 pointer-events-none -top-1.5 -left-1.5" />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-me" element={<Aboutme/>}/>
          <Route path="projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
          {/* add other routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
