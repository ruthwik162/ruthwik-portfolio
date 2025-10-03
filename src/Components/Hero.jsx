import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Model } from "../Components/Model";
import Profile from '../Pages/Profile'

gsap.registerPlugin(ScrollTrigger);


import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { ArrowUpRight, Code, Diamond, Monitor, MouseIcon, Play, Shapes, Spade } from "lucide-react";
import Architecture from "../Components/Architecture";
import Buttons from "./Buttons";
import GsapMarquee from "./GsapMarquee";
import { FaDiamond, FaLeaf, FaShapes } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FiPlay } from "react-icons/fi";
import { GrPlayFill } from "react-icons/gr";
import { SplitText } from "gsap/SplitText";


const expert = [
    {
        name: "Web Design",
        desc: "Crafting stunning layouts that catch the eye."
    },
    {
        name: "Web Development",
        desc: "Turning ideas into fast, functional websites."
    },
    {
        name: "UX Design",
        desc: "Designing smooth, intuitive user journeys."
    },
    {
        name: "Brand Identity",
        desc: "Building visuals that make brands unforgettable."
    },
    {
        name: "Art Direction",
        desc: "Shaping the mood, style, and creative vision."
    }
];


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
    const lineRef = useRef(null);
    const rolesRef = useRef([])



    const bottom = [
        {
            name: "+",
            icon: ""
        },
        {
            name: "+",
            icon: ""
        },
        {
            name: "Scroll Down",
            icon: <MouseIcon />
        },
        {
            name: "+",
            icon: ""
        },
        {
            name: "+",
            icon: ""
        }
    ];

    useGSAP(() => {
        const tl = gsap.timeline();


        tl.from(".textL", {
            y: -200,
            duration: 1.8,
            stagger: 0.1,
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
                    start: "top 98%",
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


        rolesRef.current.forEach((el) => {
            if (!el) return;
            const fill = el.querySelector(".fill");
            const text = el.querySelector(".role-text");
            const icon = el.querySelector(".role-icon");

            gsap.set(fill, { scaleY: 0, transformOrigin: "bottom" });

            el.addEventListener("mouseenter", () => {
                gsap.to(fill, { scaleY: 1, duration: 0.5, ease: "power2.out" });
                gsap.to([text, icon], {
                    marginRight: "2vw",
                    marginLeft: "2vw",
                    color: "#ffffff",
                    duration: 0.3,
                    ease: "power2.out",
                });

            });

            el.addEventListener("mouseleave", () => {
                gsap.to(fill, { scaleY: 0, duration: 0.5, ease: "power3.out" });
                gsap.to([text, icon], {
                    color: "#000000",
                    marginRight: "0vw",
                    marginLeft: "0vw",
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });

        gsap.utils
            .toArray([
                ".do-text",
            ])
            .forEach((selector) => {
                const split = new SplitText(selector, { type: "lines" });
                split.lines.forEach((line) => {
                    const inner = document.createElement("span");
                    inner.className = "inline-block";
                    inner.textContent = line.textContent;

                    const wrapper = document.createElement("span");
                    wrapper.className = "overflow-hidden py-1 block";
                    wrapper.appendChild(inner);

                    line.textContent = "";
                    line.appendChild(wrapper);
                });

                gsap.from(
                    split.lines.map((l) => l.querySelector("span.inline-block")),
                    {
                        y: 100,
                        delay:0.2,
                        duration: 2,
                        ease: "power3.out",
                        stagger: 0.25,
                        scrollTrigger: {
                            trigger: selector,
                            start: "top 85%"
                        }
                    }
                );
            });

        gsap.from(".textD", {
            y: 100,
            duration: 1.2,
            scrollTrigger: {
                trigger: ".sec2",
                start: "top 80%"
            },
        })





    }, []);

    return (
        <div className="w-full main overflow-x-hidden relative">



            <section data-scroll data-scroll-speed="0.9" className="w-full h-full  z-50">
                <div className="md:ml-[4.5vh] w-1/2 flex flex-col items-start ">
                    <div className="mt-[15vh]  overflow-hidden">
                        <div className="textL text-[15vw] md:px-   leading-[14vw] xl:text-[8vw] xl:leading-[7vw] lg:text-[10vw] lg:leading-[8vw] md:text-[12vw] md:leading-[12vw] uppercase font-poppins font-poppins-500  text-black ">
                            <span className="font-[font3]  relative inline-block  ">N</span>aga
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="textL text-[20vw] xl:text-[7vw] md:text-[15vw] md:leading-[14vw] lg:text-[12vw] lg:leading-[10vw] uppercase  font-poppins font-poppins-500 text-black leading-[17vw] xl:leading-[6vw]">
                            Ruthwik
                        </div>
                    </div>
                    <div className="overflow-hidden  flex flex-col items-start">
                        <div className="flex">
                            <div className="textL text-[15vw] xl:text-[4.5vw] leading-[15vw] xl:leading-[4vw] md:text-[7vw] md:leading-[7vw]  uppercase  font-[aeonik1] text-black ">
                                Merugu.
                            </div>
                        </div>
                        <span ref={lineRef} className="h-0.5 w-full ml-1  bg-black flex items-start justify-start"></span>
                    </div>
                </div>
                <div className="overflow-hidden gap-0 md:text-black text-gray-500 ml-[5vh] lg:ml-[20vw] md:ml-[7vw] xl:ml-[25vh]">
                    <div className="overflow-hidden">
                        <div className="xl:text-[2vw] lg:text-[3vw] lg:leading-[3vw] mt-[2vh] text-[5vw] md:text-[4vw] md:leading-[4vw] leading-[3vh] xl:leading-[3vh]">
                            <p className="text2 font-[font2]">An Interactive Developer</p>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="xl:ml-[15vh] lg:ml-[10vw] md:ml-[7vw] ml-[9vh] xl:text-[2vw] md:text-[4vw] md:leading-[4vw] lg:text-[3vw] lg:leading-[3vw] mt-[2vh] md:mt-0 xl:mt-[0vw] text-[5vw] leading-[3vh] xl:leading-[3vh]">
                            <p className="text2 font-[font2]">Based in Hyderabad, India</p>
                        </div>
                    </div>
                </div>

                <div className="overlflow-hidden md:mx-[3vw] md:w-[60%] px-2 mt-[5vw]  ">
                    <div className=" md:text-[2.5vw] whitespace-pre-line w-full md:leading-[2.5vw] leading-[3vw] text-[3.5vw] font-[font2]">
                        <p className="do-text">I create digital experiences that spark</p>
                    </div>
                    <div className="do-text md:text-[2.5vw] w-full  md:leading-[2.5vw] leading-[3vw] text-[3.5vw] font-[font2]">
                        <p> curiosity and leave a mark.Every  interface</p>
                    </div>
                    <div className="do-text md:text-[2.5vw] w-full  md:leading-[2.5vw] leading-[3vw] text-[3.5vw] font-[font2]">
                        <p>  I design is a space where creativity and </p>
                    </div>
                    <div className="do-text md:text-[2.5vw] w-full  md:leading-[2.5vw] leading-[3vw] text-[3.5vw] font-[font2]">
                        <p>functionality meet to tell unique stories.</p>
                    </div>
                </div>

                <div className="bottom  font-[font4] md:mt-[10vh] mt-[15vh]">
                    <div className="flex items-center justify-around">
                        {bottom.map((items, index) => (
                            <div key={index} className="between">
                                <h1 className="text-[4vw] text-black md:text-[2vh] font-[font2] flex ">
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
            <section className="sec2">
                <div className='overflow-hidden md:mt-0 xl:mt-[10vh]'>
                    <div className='text-center xl:text-[2.5vw] md:text-[3.3vw] font-[font2] text-gray-400'>
                        <h1 className="textD">Designing for <span className='text-black'>clarity</span>, <span className='text-black'>impact</span>, and delight—one project at a time.</h1>
                    </div>
                </div>
            </section>

            <section className="w-full h-full md:mt-[15vw] lg:mt-[8vw] xl:mt-[5vw] font-poppins page2 md:px-[2vw] tracking-tighter relative">


                <div className='overflow-hidden  '>
                    <div className='text-[10vw] px-5 md:px-0 md:text-[3vw] text-gray-400 font-[aeonik.]'>
                        <h1>Capabilties</h1>
                    </div>
                    <div className="w-full md:p-0  p-5 md:py-5 font-[font2]">
                        {expert.map((role, i) => (
                            <div
                                key={i}
                                ref={(el) => (rolesRef.current[i] = el)}
                                className="relative  overflow-hidden border-b border-gray-200 cursor-pointer"
                            >
                                <div className="relative  md:gap-[20vh]  z-10">
                                    <span className="role-text textS flex items-center flex-row-reverse gap-3 justify-between text-[6.5vw] md:text-[4.8vw] lg:text-[4vw] xl:text-[3vw] text-black">
                                        <ArrowUpRight strokeWidth={0.5} className="md:w-20 md:h-15" />
                                        <span className="flex items-center gap-1">
                                            {role.name}
                                        </span>
                                    </span>
                                </div>
                                <div className="fill absolute inset-0 bg-black z-0"></div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
            


        </div >
    );
};

export default Home;
