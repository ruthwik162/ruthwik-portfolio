import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Model } from "../Components/Model";
import Hero from "../Components/Hero";
import Service from "../Components/Service";

gsap.registerPlugin(ScrollTrigger);


const Home = () => {
    const modelRef = useRef();
    const modelDiv = useRef();
    const mobile = useMediaQuery({ maxWidth: 853 });
    const lineRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Text animation


        tl.from(".textL", {
            y: -300,
            delay: 0,
            duration: 2,
            stagger: 0.2,
            ease: "power3.inOut",
        })
        gsap.from(lineRef.current, {
            width: 0,
            delay: 2,
            duration: 1.7,
            ease: "expo.out"
        })

        gsap.from(".text2", {
            y: 100,
            duration: 1.8,
            delay: 1,
            stagger: 0.3,
            ease: "power3.out",
        })

        gsap.utils.toArray(".num1").forEach((num) => {
            gsap.fromTo(
                num,
                { y: -180, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: num,
                        start: "top 15%",
                        end: "top 1%",
                        scrub: true,
                        markers: true
                    },
                }
            );
        });
        gsap.utils.toArray(".num2").forEach((num) => {
            gsap.fromTo(
                num,
                { y: 180, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: num,
                        start: "top 43%",
                        end: "top 30%",
                        scrub: true,
                        markers: true
                    },
                }
            );
        });




        // Pin the model section
        ScrollTrigger.create({
            trigger: modelDiv.current,
            start: "top top",
            end: `${mobile ? "bottom+=120% top" : "bottom+=60% 80%"}`,
            pin: true,
            pinSpacing: true,
            scrub: 1, // smooth animation
            onUpdate: (self) => {
                if (modelRef.current) {
                    // Rotate in X as we scroll
                    modelRef.current.rotation.x = self.progress * Math.PI * 2;
                    // self.progress goes 0 → 1 between start and end
                    // Math.PI * 2 = full 360° rotation
                }
            },
        });
    }, []);

    return (
        <div className="w-full main overflow-x-hidden relative">
            <div className="relative">
                <section ref={modelDiv} className="w-full  h-screen overflow-hidden absolute  z-0 md:top-0 top-[0vh] md:left-0 left-[0vh]">
                    <figure className="w-full model-wrapper z-0 relative h-full left-10 -top-[20vh] md:top-0  overflow-hidden md:left-1/4" >
                        <div className="w-full h-full absolute ">
                            <Canvas
                                shadows
                                camera={{ position: [-5, -5, 10], fov: 35 }}
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
            </div>

            <section className="w-full h-screen z-50">
                <div className="md:ml-[4.5vh] w-1/2 flex flex-col items-start ">
                    <div className="mt-[25vh] overflow-hidden">
                        <div className="textL text-[15vw] leading-[14vw] md:text-[10vw] uppercase font-poppins font-poppins-400  text-black md:leading-[9vw]">
                            Naga
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="textL text-[20vw] md:text-[13vw] uppercase  font-poppins font-poppins-600 text-black leading-[17vw] md:leading-[10vw]">
                            Ruthwik
                        </div>
                    </div>
                    <div className="overflow-hidden  flex flex-col items-start">
                        <div className="flex">
                            <div className="textL text-[15vw] md:text-[7.6vw] uppercase  font-poppins font-poppins-300 text-black leading-[15vw] md:leading-[7vw]">
                                Merugu.
                            </div>
                        </div>
                        <span ref={lineRef} className="h-0.5 w-full ml-3 z-50 bg-black flex items-start justify-start"></span>
                    </div>
                </div>
                <div className="overflow-hidden gap-0 ml-[5vh] md:ml-[25vh]">
                    <div className="overflow-hidden">
                        <div className="md:text-[2vw] mt-[2vh] text-[5vw] leading-[3vh] md:leading-[3vh]">
                            <p className="text2 font-[font2]">An Interactive Developer</p>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="md:ml-[15vh] ml-[9vh] md:text-[2vw] text-[5vw] leading-[3vh] md:leading-[4vh]">
                            <p className="text2 font-[font2]">Based in Hyderabad, India</p>
                        </div>
                    </div>
                </div>

                <div className=" mt-[13vh]">
                    <div className="flex items-center justify-around">
                        {["", "Scroll Down", "Welcome"].map((items) => (
                            <div className="between ">
                                <h1 className="text-[1.1vw] font-[font2] opacity-50">{items}</h1>
                            </div>
                        ))}
                    </div>
                </div>


            </section>
            <section className="w-full h-screen font-poppins tracking-tighter">
                <div className=" overflow-hidden flex  ">
                    <div className="overflow-hidden mt-[15vh] ">
                        <div className="md:ml-[5vh]  ml-[3vh]  font-poppins-400 text-[5vh] text-center md:text-[4vw]">
                            <h1 className="num1  md:leading-[3.2vw]  tracking-tighter ">.02</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="overflow-hidden md:ml-[5vh] ml-[3vh] md:mt-[15vh] text-[5vh] text-start md:text-[4vw]">
                            <h1 className="num2  md:leading-[3.5vw] tracking-tighter ">Architecture</h1>
                        </div>
                    </div>

                </div>
            </section>


        </div >
    );
};

export default Home;
