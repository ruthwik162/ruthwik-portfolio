import React, { useRef, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Model } from "./Model";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

// RotatingModel component
const RotatingModel = forwardRef((props, ref) => {
  const modelRef = useRef();
  React.useImperativeHandle(ref, () => modelRef.current);
  // Continuous rotation after landing
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.10;
    }
  });

  return <Model ref={modelRef} {...props} />;
});

const Hero = () => {
  const modelRef = useRef();

  const model = useRef();


  const mobile = useMediaQuery({ maxWidth: 853 })

  useGSAP(() => {
    const tl = gsap.timeline();

    // Text animation
    tl.from(".textL", {
      y: -300,
      duration: 3,
      stagger: 0.3,
      ease: "power3.inOut",
    });



  }, []);

  return (
    <div>
      <section className="w-full min-h-screen relative">
        <figure ref={model} className="w-full model-wrapper absolute h-full -top-[10vh] md:top-0 overflow-hidden  md:left-1/4 ">
          <Canvas shadows camera={{ position: [-3, -3, 10], fov: 35 }} className="absolute inset-0">
            {/* General soft light */}
            <ambientLight intensity={0.6} />

            {/* Directional light (sunlight-like) */}
            <directionalLight
              position={[5, -5, 5]}
              intensity={2}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
            />

            {/* Point light for front illumination */}
            <pointLight
              position={[10, 5, 5]}
              intensity={1.5}
              color={"#ffffff"}
              decay={2}
              distance={20}
            />

            {/* Optional spotlight for highlights */}
            <spotLight
              position={[-5, 5, 5]}
              intensity={1.2}
              angle={0.3}
              penumbra={0.5}
              castShadow
            />

            <Float speed={1.2}>
              <RotatingModel ref={modelRef} position={[0, -0.5, 0]} scale={mobile ? 0.0070 : 0.01} />
            </Float>

            <OrbitControls enablePan={false} enableZoom={false} />
            <Environment preset="studio" resolution={256} />
          </Canvas>

        </figure>

        {/* Text content */}
        <div className="absolute 50 w-1/2 top-1/3 flex flex-col items-start">
          <div className="overflow-hidden">
            <div className="textL text-[15vw] leading-[14vw] md:text-[10vw] uppercase font-bold text-cyan-700 md:leading-[9vw]">
              Naga
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="textL text-[20vw] md:text-[13vw] uppercase font-bold text-cyan-700 leading-[17vw] md:leading-[11vw]">
              Ruthwik
            </div>
          </div>
          <div className="overflow-hidden flex items-center ">

            <div className="flex">
              <div className="textL text-[15vw] m md:text-[7.6vw] uppercase font-bold text-cyan-700 leading-[15vw] md:leading-[7vw]">
                Merugu
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="  page2">
      </section>
    </div> 
  );
};

export default Hero;
