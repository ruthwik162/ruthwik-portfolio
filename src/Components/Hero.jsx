import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowRight, ArrowUpRight, Download, MouseIcon } from "lucide-react";
import { Model } from "../Components/Model";
import Profile from "../Pages/Profile";
import Architecture from "../Components/Architecture";
import Buttons from "./Buttons";
import GsapMarquee from "./GsapMarquee";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import LiquidErase from "./LiquidErase";

gsap.registerPlugin(ScrollTrigger, SplitText);

const expert = [
    { name: "Web Design", desc: "Crafting stunning layouts that catch the eye." },
    { name: "Web Development", desc: "Turning ideas into fast, functional websites." },
    { name: "UX Design", desc: "Designing smooth, intuitive user journeys." },
    { name: "Brand Identity", desc: "Building visuals that make brands unforgettable." },
    { name: "Art Direction", desc: "Shaping the mood, style, and creative vision." }
];

const FollowCursorModel = ({ mobile, ...props }) => {
    const modelRef = useRef();
    const target = useRef({ x: 0, y: 0 });
    const raf = useRef(null);
    const last = useRef(0);

    // ✅ Throttled mousemove with requestAnimationFrame
    useEffect(() => {
        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - last.current < 16) return; // ~60fps
            last.current = now;

            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            gsap.to(target.current, {
                x,
                y,
                duration: 0.6,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // ✅ Smooth rotation tied to GPU compositing
    useFrame(() => {
        if (!modelRef.current) return;
        const rot = modelRef.current.rotation;
        rot.y += (target.current.x * 0.8 - rot.y) * 0.08;
        rot.x += (target.current.y * 0.5 - rot.x) * 0.08;
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
    const rolesRef = useRef([]);
    const containerRef = useRef(null);
    const slideRef = useRef([]);
    const button1Ref = useRef(null);
    const circleRef = useRef(null);
    const button2Ref = useRef(null);
    const circle2Ref = useRef(null);
    const textRef = useRef(null);
    const text2Ref = useRef(null);
    const navigate = useNavigate();

    const bottom = [
        { name: "+", icon: "" },
        { name: "+", icon: "" },
        { name: "Scroll Down", icon: <MouseIcon /> },
        { name: "+", icon: "" },
        { name: "+", icon: "" }
    ];

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Hero text animation
        tl.from(".textL", {
            y: -200,
            duration: 1.8,
            stagger: 0.1,
            ease: "power3.inOut",
            willChange: "transform"
        });

        gsap.from(lineRef.current, {
            width: 0,
            delay: 1.5,
            duration: 1.5,
            ease: "expo.out",
            willChange: "width"
        });

        gsap.from(".text2", {
            y: 100,
            duration: 1.5,
            delay: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            willChange: "transform"
        });

        // Bottom fade-out
        gsap.utils.toArray(".bottom").forEach((item) => {
            gsap.fromTo(
                item,
                { opacity: 1 },
                {
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 98%",
                        end: "top 60%",
                        scrub: true
                    }
                }
            );
        });

        // Number animations
        const animateNum = (selector, yStart, start, end) => {
            gsap.utils.toArray(selector).forEach((num) => {
                gsap.fromTo(
                    num,
                    { y: yStart, opacity: 1, willChange: "transform" },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2,
                        ease: "power3.out",
                        scrollTrigger: { trigger: num, start, end, scrub: true }
                    }
                );
            });
        };
        animateNum(".num1", -180, "top 3%", "top -5%");
        animateNum(".num2", 180, "top 43%", "top 35%");

        // Hover animation for capabilities
        rolesRef.current.forEach((el) => {
            if (!el) return;
            const fill = el.querySelector(".fill");
            const text = el.querySelector(".role-text");
            const icon = el.querySelector(".role-icon");
            gsap.set(fill, { scaleY: 0, transformOrigin: "bottom" });

            el.addEventListener("mouseenter", () => {
                gsap.to(fill, { scaleY: 1, duration: 0.4, ease: "power2.out" });
                gsap.to([text, icon], {
                    marginRight: "2vw",
                    marginLeft: "2vw",
                    color: "#fff",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            el.addEventListener("mouseleave", () => {
                gsap.to(fill, { scaleY: 0, duration: 0.4, ease: "power3.out" });
                gsap.to([text, icon], {
                    color: "#000",
                    marginRight: 0,
                    marginLeft: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Text line reveal (SplitText)
        // Text line reveal (SplitText) - wait for fonts to load
        document.fonts.ready.then(() => {
            const selectors = [".do-text"];
            selectors.forEach((selector) => {
                const split = new SplitText(selector, { type: "lines" });
                const lines = split.lines.map((line) => {
                    const inner = document.createElement("span");
                    inner.className = "inline-block";
                    inner.textContent = line.textContent;
                    const wrapper = document.createElement("span");
                    wrapper.className = "overflow-hidden py-1 block";
                    wrapper.appendChild(inner);
                    line.textContent = "";
                    line.appendChild(wrapper);
                    return inner;
                });

                gsap.from(lines, {
                    y: 100,
                    opacity: 0,
                    duration: 1.8,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: selector,
                        start: "top 85%"
                    }
                });
            });
        });











        // Animate each word with GSAP
        gsap.from(".textD", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: {
                trigger: ".textD",
                start: "top 80%"
            }
        });


        // Slide animation reveal
        slideRef.current.forEach((slide, i) => {
            gsap.set(slide, {
                yPercent: i % 2 === 0 ? 100 : -100,
                willChange: "transform"
            });
        });
        gsap.to(slideRef.current, {
            yPercent: 0,
            duration: 1.6,
            ease: "power4.inOut",
            stagger: 0.1
        });

        gsap.from(containerRef.current, {
            rotate: 15,
            scale: 0.7,
            duration: 1.2,
            ease: "expo.inOut"
        })
    }, []);

    useEffect(() => {
        if (!button1Ref.current || !circleRef.current || !textRef.current) return;
        if (!button2Ref.current || !circle2Ref.current || !text2Ref.current) return;

        // Function to create hover animation
        const addHoverEffect = (button, circle, text) => {
            const tl = gsap.timeline({ paused: true });

            tl.to(circle, {
                scale: 35, // Circle expansion
                duration: 0.6,
                backgroundColor: "#6565FB",
                ease: "power3.out"
            })
                .to(
                    text,
                    {
                        x: "-0.5vw", // Text moves slightly
                        color: "#FFFFFF",
                        duration: 0.4,
                        ease: "power2.out"
                    },
                    "<" // start simultaneously
                );

            // Hover in
            button.addEventListener("mouseenter", () => tl.play());
            // Hover out
            button.addEventListener("mouseleave", () => tl.reverse());
        };

        addHoverEffect(button1Ref.current, circleRef.current, textRef.current);
        addHoverEffect(button2Ref.current, circle2Ref.current, text2Ref.current);

        // Ripple effect on click
        const addRippleEffect = (button) => {
            button.addEventListener("click", (e) => {
                const ripple = document.createElement("span");
                ripple.className = "ripple";
                ripple.style.left = `${e.offsetX}px`;
                ripple.style.top = `${e.offsetY}px`;
                button.appendChild(ripple);

                gsap.fromTo(
                    ripple,
                    { scale: 0, opacity: 0.5 },
                    {
                        scale: 10,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        onComplete: () => ripple.remove()
                    }
                );
            });
        };

        addRippleEffect(button1Ref.current);
        addRippleEffect(button2Ref.current);

    }, []);


    return (
        <div className="w-full main overflow-x-hidden relative  main  will-change-transform will-change-opacity">

            <section data-scroll data-scroll-speed="0.9" className="w-full h-full flex items-center md:flex-row flex-col-reverse justify-center z-0">
                <div className="overflow-hidden px-5 md:px-2  w-full h-full ">
                    <div className="  mt-[2vw] flex flex-col items-start ">
                        <div className="  overflow-hidden">
                            <div className="textL text-[12vw] will-change-transform   leading-[11vw] xl:text-[8vw] xl:leading-[7vw] lg:text-[10vw] lg:leading-[8vw] md:text-[9vw] md:leading-[8vw] uppercase font-poppins font-poppins-500  text-black ">
                                <span className="font-[font3]  relative inline-block  ">N</span>aga
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="textL text-[15vw] will-change-transform xl:text-[7vw] md:text-[10vw] md:leading-[10vw] lg:text-[10vw] lg:leading-[10vw] uppercase  font-poppins font-poppins-500 text-black leading-[12vw] xl:leading-[6vw]">
                                Ruthwik
                            </div>
                        </div>
                        <div className="overflow-hidden  flex flex-col items-start">
                            <div className="flex">
                                <div className="textL text-[10vw] will-change-transform xl:text-[4.5vw] leading-[10vw] xl:leading-[4vw] md:text-[7vw] md:leading-[7vw]  uppercase  font-[aeonik1] text-black ">
                                    Merugu.
                                </div>
                            </div>
                            <span ref={lineRef} className="h-0.5 w-full ml-1  bg-black flex items-start justify-start"></span>
                        </div>
                    </div>
                    <div className="overflow-hidden gap-0 will-change-transform md:text-black text-gray-500 ml-[5vh] lg:ml-[20vw] md:ml-[7vw] xl:ml-[25vh]">
                        <div className="overflow-hidden">
                            <div className="xl:text-[2vw] lg:text-[2.1vw] lg:leading-[3vw] mt-[2vh] text-[3.5vw] md:text-[3vw] md:leading-[4vw] leading-[3vw] xl:leading-[3vh]">
                                <p className="text2 font-[font2]">An Interactive Developer</p>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="xl:ml-[15vh] lg:ml-[1vw] md:ml-[3vw] ml-[9vh] xl:text-[2vw] md:text-[3vw] md:leading-[3vw] lg:text-[2.1vw] lg:leading-[2.5vw]  md:mt-0 xl:mt-[0vw] text-[3.5vw] leading-[3vw] xl:leading-[3vh]">
                                <p className="text2 font-[font2]">Based in Hyderabad, India</p>
                            </div>
                        </div>
                    </div>

                    <div className="overlflow-hidden md:mx-[3vw] will-change-transform xl:w-[60%] px-2 mt-[5vw] xl:mt-[2vw]  ">
                        <div className=" md:text-[2vw] md:leading-[2vw] xl:text-[1.5vw] w-full xl:leading-[1.1vw] leading-[3vw] text-[3.5vw] font-[Helvetica]">
                            <p className="do-text">I create digital experiences that spark</p>
                        </div>
                        <div className="do-text md:text-[2vw] md:leading-[2vw] xl:text-[1.5vw] w-full xl:leading-[1.1vw] leading-[3vw] text-[3.5vw] font-[Helvetica]">
                            <p> curiosity and leave a mark.Every  interface</p>
                        </div>
                        <div className="do-text md:text-[2vw] md:leading-[2vw] xl:text-[1.5vw] w-full xl:leading-[1.1vw] leading-[3vw] text-[3.5vw] font-[Helvetica]">
                            <p>  I design is a space where creativity and </p>
                        </div>
                        <div className="do-text md:text-[2vw] md:leading-[2vw] xl:text-[1.5vw] w-full xl:leading-[1.1vw] leading-[3vw] text-[3.5vw] font-[Helvetica]">
                            <p>functionality meet to tell unique stories.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center xl:w-1/2 p-5 will-change-transform will-change-opacity gap-2 overflow-hidden ">
                        <div onClick={() => { navigate("/contact") }} ref={button1Ref} className="xl:w-39 md:w-39 w-39 rounded-full h-12 shadow-md flex overflow-hidden items-center justify-center">
                            <button className="flex items-center justify-center font-[font2] gap-2 xl:text-[1.1vw] "> <span ref={circleRef} className="w-2 h-2 z-0 bg-black rounded-full "></span> <span ref={textRef} className="z-50 text-black flex items-center justify-center gap-2 ">Contact me <ArrowRight /> </span></button>
                        </div>
                        <div ref={button2Ref} className="xl:w-39 md:w-39 w-39 rounded-full h-12 shadow-md flex overflow-hidden items-center justify-center">
                            <a
                                href={assets.resume_fullstack} // path to your resume in the public folder
                                download={assets.resume_fullstack}
                                className="flex items-center justify-center font-[font2] gap-2 xl:text-[1.1vw] "> <span ref={circle2Ref} className="w-2 h-2 z-0 bg-black rounded-full "></span> <span ref={text2Ref} className="z-50 text-black flex items-center justify-center gap-2">Resume <Download /> </span></a>
                        </div>
                    </div>
                </div>
                <div className=" xl:w-[70vw] w-full md:w-full h-full  md:h-screen overflow-hidden flex z-0 items-center md:p-10 px-3 pt-15 justify-center xl:h-screen">
                    <div ref={containerRef} className="w-full xl:w-[90%] md:px-5  h-[35vh] md:h-[40vw] xl:h-[30vw] overflow-hidden relative p-2  z-0 bg-black rounded-3xl">


                        <h1 className="blend-text absolute top-0 left-3 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center text-[18vw] leading-[15vw] xl:text-[7vw] md:text-[10vw] lg:text-[9vw] lg:leading-[9vw] md:leading-[9vw]  xl:leading-[7vw] font-[aeonik1] text-white mix-blend-difference tracking-tight z-20 select-none pointer-events-none">
                            Rightfull <br /> Thoughts
                        </h1>
                        <div className="blend-text absolute bottom-1 md:bottom-0 md:pb-10 flex flex-col items-center justify-center  z-30 mix-blend-difference text-center">
                            <h2 className="text-[5vw] md:text-[4vw] lg:text-[3vw] xl:text-[2vw]  font-[aeonik2] text-red-200 leading-[3vw]  ">
                                Crafting Interactive Experiences
                            </h2>
                            <h3 className="text-[4vw] md:text-[2.5vw] md:leading-[2vw] lg:text-[2vw] xl:text-[1.3vw] font-[font2] text-gray-200">
                                Where design meets emotion and motion tells stories.
                            </h3>
                            <p className="text-[2.8vw] md:text-[2vw] lg:text-[1.8vw] md:leading-[1.5vw] xl:text-[1.2vw] font-[Helvetica] mix-blend-difference text-white ">
                                “Every pixel has a purpose — every animation, a mindgame.”
                            </p>
                        </div>

                        <div className="absolute top-0 left-0  flex items-center justify-center rounded-4xl h-full w-full ">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    ref={(el) => (slideRef.current[i] = el)}
                                    className="w-1/5 h-full border border-red-600 bg-red-600"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            <div className="bottom  font-[font4] md:-mt-[2vw] mt-[13vw]">
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

            <section className="sec2">
                <div className='overflow-hidden md:mt-0 xl:mt-[10vh]'>
                    <div className='text-center xl:text-[2.5vw] xl:leading-[3vw] leading-[6vw] md:text-[3.3vw] text-[7vw] font-[font2] text-gray-400'>
                        <h1 className="textD">Designing for <span className='text-black'>clarity</span>, <span className='text-black'>impact</span>, and delight—one project at a time.</h1>
                    </div>
                </div>
            </section>

            <section className="w-full h-full md:mt-[15vw] mt-[15vw] lg:mt-[8vw] xl:mt-[5vw] font-poppins page2 md:px-[2vw] tracking-tighter relative">
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
