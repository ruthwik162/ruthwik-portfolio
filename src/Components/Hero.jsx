import React, { useRef, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Model } from "./Model";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Service from "./Service";

gsap.registerPlugin(ScrollTrigger);

// Rotating 3D Model component
const RotatingModel = forwardRef((props, ref) => {
  const modelRef = useRef();
  React.useImperativeHandle(ref, () => modelRef.current);

  // Continuous rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.1;
    }
  });

  return <Model ref={modelRef} {...props} />;
});

const Hero = () => {
  const modelRef = useRef();
  const modelDiv = useRef();
  const mobile = useMediaQuery({ maxWidth: 853 });

  useGSAP(() => {
    const tl = gsap.timeline();

    // Text animation
    tl.from(".textL", {
      y: -300,
      duration: 3,
      stagger: 0.3,
      ease: "power3.inOut",
    });

    tl.to(modelDiv.current, {})

    // Pin the model section
    ScrollTrigger.create({
      trigger: modelDiv.current,
      start: "top top",
      end: `${mobile ? "bottom+=120% top" : "bottom+=180% top"}`,
      pin: true,
      pinSpacing: true,
      scrub: 1, // smooth animation
    });
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Section 1: Hero with 3D model */}
      <section className="w-full h-screen overflow-hidden relative">
        <figure
          ref={modelDiv}
          className="w-full model-wrapper z-[10] relative h-full -top-[10vh] overflow-hidden md:left-1/4" >
          <div className="w-full h-full -right-[14vh] -top-20 md:right-0 absolute">
            <Canvas
              shadows
              camera={{ position: [4, -5, 10], fov: 35 }}
              className="absolute inset-0"
            >
              {/* Ambient light for soft overall illumination */}
              <ambientLight intensity={0.4} color="#ffffff" />

              {/* Key directional light (main light source) */}
              <directionalLight
                position={[10, 10, 10]}
                intensity={3}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={1}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />

              {/* Fill light to soften shadows */}
              <directionalLight
                position={[-5, 4, -4]}
                intensity={0.8}
                color="#a0c4ff"
              />

              {/* Rim/back light to highlight edges */}
              <spotLight
                position={[0, 5, -10]}
                intensity={0.8}
                angle={0.3}
                penumbra={0.5}
                castShadow
                color="#ffffff"
              />

              {/* Optional point lights for sparkle/highlights */}
              <pointLight position={[5, 2, 5]} intensity={0.6} color="#ffd6a5" />
              <pointLight position={[-5, -2, 5]} intensity={0.4} color="#ffadad" />

              {/* 3D Model */}
              <Float speed={1} >
                <Model
                  containerRef={modelDiv}
                  scale={mobile ? 0.007 : 0.01}
                  position={[0, -0.5, 0]}
                />
              </Float>

              {/* Optional environment */}
              <OrbitControls enablePan={false} enableZoom={false} />
              <Environment preset="studio" resolution={512} />

            </Canvas>
          </div>
        </figure>
      </section >

    </div >
  );
};

export default Hero;
