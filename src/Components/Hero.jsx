import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Model } from "../Components/Model";

gsap.registerPlugin(ScrollTrigger);


import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { Code, Diamond, Monitor, MouseIcon, Shapes, Spade } from "lucide-react";
import Architecture from "../Components/Architecture";
import Buttons from "./Buttons";
import GsapMarquee from "./GsapMarquee";
import { FaDiamond, FaLeaf, FaShapes } from "react-icons/fa6";



const FollowCursorModel = ({ mobile, ...props }) => {
    const modelRef = useRef();
    const target = useRef({ x: 0, y: 0 });

    // Capture mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;   // -1 → 1
            const y = -(e.clientY / window.innerHeight) * 2 + 1; // -1 → 1
            gsap.to(target.current, {
                x,
                y,
                duration: 0.8,
                ease: "power3.out"
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Animate rotation smoothly
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y = target.current.x * 0.8; // horizontal
            modelRef.current.rotation.x = target.current.y * 0.5; // vertical
        }
    });

    return (
        <Model
            ref={modelRef}
            scale={mobile ? 0.007 : 0.0085}
            position={[0, -0.5, 0]}
            {...props}
        />
    );
};



const Home = () => {
    const modelRef = useRef();
    const modelDiv = useRef();
    const mobile = useMediaQuery({ maxWidth: 853 });
    const lineRef = useRef(null);


    const bottom = [
        {
            name: "",
            icon: ""
        },
        {
            name: "Scroll Down",
            icon: <MouseIcon />
        },
        {
            name: "",
            icon: ""
        }
    ];

    useGSAP(() => {
        const tl = gsap.timeline();

        // Text animation


        tl.from(".textL", {
            y: -200,
            duration: 2.5,
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
        gsap.utils.toArray(".bottom").forEach((item) => {
            gsap.fromTo(item, {
                opacity: 1
            }, {
                opacity: 0,
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: item,
                    start: "top 95%",
                    end: "top 60%",
                    scrub: true,
                }
            })

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
                        start: "top 3%",
                        end: "top -5%",
                        scrub: true,
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
                        end: "top 35%",
                        scrub: true,
                    },
                }
            );
        });




        // Pin the model section
        ScrollTrigger.create({
            trigger: modelDiv.current,
            start: "top top",
            end: `${mobile ? "bottom+=80% 80%" : "bottom+=88% 80%"}`,
            pin: true,
            pinSpacing: true,
            scrub: 1, // smooth animation
            onUpdate: (self) => {
                if (modelRef.current) {
                    // Rotate in X as we scroll
                    modelRef.current.rotation.x = self.progress * Math.PI * 10;
                    // self.progress goes 0 → 1 between start and end
                    // Math.PI * 2 = full 360° rotation
                }
            },
        });
    }, []);

    return (
        <div className="w-full main overflow-x-hidden relative">

            <h1 className="absolute md:top-[36vw] md:-right-[1vw] mx-3 md:mx-1 font-poppins font-poppins-200 text-[20vw] top-1/4 md:text-[13vw] uppercase text-black/50 tracking-tighter ">WelCome</h1>

            <div className="relative">
                <section ref={modelDiv} className="w-full  h-screen overflow-hidden absolute  z-0 md:top-0 top-[0vh] md:left-0 left-[0vh]">
                    <figure className="w-full model-wrapper z-0 relative h-full left-23 -top-[5vh] md:top-0  overflow-hidden md:left-1/4" >
                        <div className="w-full h-full absolute ">
                            <Canvas
                                shadows
                                camera={{ position: [-1, -3, 10], fov: 35 }}
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

                                <Float speed={mobile ? 3.5 : 2}>
                                    <FollowCursorModel mobile={mobile} />
                                </Float>


                                {/* Optional environment */}
                                <OrbitControls enablePan={false} enableZoom={false} />
                                <Environment preset="studio" resolution={512} />

                            </Canvas>
                        </div>
                    </figure>
                </section >
            </div>



            <section className="w-full h-screen  z-50">
                <div className="md:ml-[4.5vh] w-1/2 flex flex-col items-start ">
                    <div className="mt-[25vh]  overflow-hidden">
                        <div className="textL text-[15vw]   leading-[14vw] md:text-[10vw] uppercase font-poppins font-poppins-400  text-black md:leading-[9vw]">
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
                        <span ref={lineRef} className="h-0.5 w-full ml-3  bg-black flex items-start justify-start"></span>
                    </div>
                </div>
                <div className="overflow-hidden gap-0 md:text-black text-gray-500 ml-[5vh] md:ml-[25vh]">
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

                <div className="bottom md:mt-[13vh]  mt-[35vh]">
                    <div className="flex items-center justify-around">
                        {bottom.map((items, index) => (
                            <div key={index} className="between">
                                <h1 className="text-[4vw] text-black/50 md:text-[2vh] font-[font2] flex ">
                                    {items.name}{" "}
                                    {items.name === "Scroll Down" ? (
                                        <span className="animate-bounce [animation-duration:2s]">   {items.icon} </span>
                                    ) : (
                                        items.icon
                                    )}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
            <div className="z-0 mt-[10vh]  ">
                <GsapMarquee speed={40} direction="left">
                    <span className="flex items-center justify-center gap-2">
                        <FaDiamond className="md:w-15 md:h-15 h-5 w-5 " /> Web Developer
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <FaLeaf className="md:w-15 md:h-15 h-5 w-5" /> Interactive Developer
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <FaShapes className="md:w-15 md:h-15 h-5 w-5" /> 3D Enthusiast
                    </span>
                </GsapMarquee>
            </div>
            <section className="w-full min-h-screen font-poppins page2 tracking-tighter relative">
                <div className="relative z-10 flex">
                    <div className="overflow-hidden md:mt-[15vh] mt-[30vh] ">
                        <div className="md:ml-[5vh] ml-[3vh] font-poppins-400 text-[5vh] text-center md:text-[4vw]">
                            <h1 className="num1 md:leading-[3.2vw] tracking-tighter">.02</h1>
                        </div>
                    </div>

                </div>
                <div className="md:w-full md:mt-[0vh] mt-[5vh]  w-[80%]">
                    <Architecture />
                </div>


            </section>

        </div >
    );
};

export default Home;
