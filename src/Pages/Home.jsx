import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight, Globe, Pen, PenTool, WholeWord } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from '../Components/Image'
import TextY from '../Components/TextY';
import { RiFileWordLine } from '@remixicon/react';
import Footer from '../Components/Footer';
gsap.registerPlugin(ScrollTrigger);




const Home = () => {

    const today = new Date().toLocaleDateString();
    const redFill = useRef(null);
    const blackFill = useRef(null);
    const lineRef = useRef(null);
    const imgRef = useRef(null);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date().toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(now);
        };

        updateTime(); // run once immediately
        const interval = setInterval(updateTime, 1000); // update every second
        return () => clearInterval(interval); // cleanup
    }, []);

    const rolesRef = useRef([]);
    const videoRef = useRef(null);
    const section1 = useRef(null);
    const section2 = useRef(null);
    const expert = [
        { name: "Web Design", desc: "Crafting stunning layouts that catch the eye." },
        { name: "Web Development", desc: "Turning ideas into fast, functional websites." },
        { name: "UX Design", desc: "Designing smooth, intuitive user journeys." },
        { name: "Brand Identity", desc: "Building visuals that make brands unforgettable." },
        { name: "Art Direction", desc: "Shaping the mood, style, and creative vision." }
    ];




    useGSAP(() => {
        gsap.from(".text-B", {
            xPercent: -150,
            duration: 1.8,
            stagger: -0.11,
            ease: "power4.out",
            force3D: true,
            transformOrigin: "center center",
            willChange: "transform , opacity"
        });
        gsap.from(".text-R", {
            yPercent: -150,
            opacity: 0,
            duration: 1.4,
            stagger: -0.11,
            ease: "power4.out",
            force3D: true,
            transformOrigin: "center center",
            willChange: "transform , opacity"
        });
        gsap.from(lineRef.current, {
            width: 0,
            delay: 1.5,
            duration: 1.5,
            ease: "expo.out",
            willChange: "width"
        });

        gsap.from(".text-I", {
            xPercent: 150,
            opacity: 0,
            duration: 1.6,
            stagger: 0.05,
            ease: "power4.out",
            force3D: true,
            transformOrigin: "center center",
        });
        gsap.from(".text-I2", {
            xPercent: -250,
            opacity: 0,
            duration: 1.7,
            stagger: -0.1,
            ease: "power4.out",
            force3D: true,
            transformOrigin: "center center",
        });



    })


    useEffect(() => {


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
    }, []);


    // Sticky Scroll Stack

    useGSAP(() => {
        // === Sticky Scroll Effect ===
        ScrollTrigger.create({
            trigger: section1.current,
            start: "top top",
            end: "+=100%", // controls how long section1 stays pinned
            pin: true,
            pinSpacing: false, // disables extra space after unpinning
            scrub: true,
        });

        gsap.to(imgRef.current, {
            scale: 1.1,
            transformOrigin: "center center",
            ease: "none",
            scrollTrigger: {
                trigger: section2.current,
                start: "top bottom", // when section2 starts entering viewport
                end: "top 20%",   // fade completes when section2 reaches middle
                scrub: true,
            },
        });
        gsap.to(section1.current, {
            scale: 1,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: section2.current,
                start: "top bottom", // when section2 starts entering viewport
                end: "top 20%",   // fade completes when section2 reaches middle
                scrub: true,
            },
        });

        // === Animate section2 rising over section1 ===
        gsap.fromTo(
            section2.current,
            { y: "10%" }, // start below viewport
            {
                y: "0%",
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: section2.current,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
            }
        );
    });



    return (
        <div className='w-full h-full bg-[#EFEFEF] '>
            <section ref={section1} className='w-full sticky section1 will-change-transform  will-change-opacity transform-gpu h-screen '>
                <div className='flex h-[92vh] w-full  items-center lg:justify-center xl:justify-between'>
                    <div className='flex h-full w-full flex-col items-start justify-center overflow-hidden'>
                        {/* Name */}
                        <div className=" h-[50%] mt-[10vw] mx-[3vw] flex flex-col  justify-center items-start ">
                            <div className="  overflow-hidden">
                                <div className="text-B text-[12vw] will-change-transform will-change-opacity   leading-[11vw] xl:text-[6vw] xl:leading-[7vw] lg:text-[9vw] lg:leading-[10.5vw] md:text-[9vw] md:leading-[8vw]  font-[Helvetica] font-[400]  text-black ">
                                    Naga
                                </div>
                            </div>
                            <div className="overflow-hidden md:-mt-[1.5vw]">
                                <div className="text-B text-[15vw] will-change-transform will-change-opacity xl:text-[8vw] md:text-[10vw] md:leading-[10vw] lg:text-[10vw] lg:leading-[9vw]   font-Helvetica font-poppins-500 text-black leading-[12vw] xl:leading-[7vw]">
                                    Ruthwik
                                </div>
                            </div>
                            <div className="overflow-hidden  flex flex-col items-start">
                                <div className="flex">
                                    <div className="text-B text-[10vw] will-change-transform xl:text-[4.5vw] leading-[10vw] xl:leading-[5vw] lg:text-[7vw] lg:leading-[9vw] md:text-[7vw] md:leading-[7vw]    font-[aeonik1] text-black ">
                                        Merugu.
                                    </div>
                                </div>
                                <span ref={lineRef} className="h-0.5 w-full ml-1 mt-[1vw] bg-black flex items-start justify-start"></span>
                            </div>
                            <div className="overflow-hidden gap-0 will-change-transform md:text-black text-gray-500 ml-[5vh] lg:ml-[20vw] md:ml-[7vw] xl:ml-[25vh]">
                                <div className="overflow-hidden">
                                    <div className="xl:text-[1.1vw] lg:text-[2.1vw] will-change-transform will-change-opacity lg:leading-[3vw] mt-[2vh] text-[3.5vw] md:text-[3vw] md:leading-[4vw] leading-[3vw] xl:leading-[1vw]">
                                        <p className="text-I font-[font2]">An Interactive Developer</p>
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <div className="  xl:text-[1.1vw] md:text-[3vw] will-change-transform will-change-opacity md:leading-[3vw] lg:text-[2.1vw] lg:leading-[2.5vw]  md:mt-0 xl:mt-[0vw] text-[3.5vw] leading-[3vw] xl:leading-[1vw]">
                                        <p className="text-I2 font-[font2]">Based in Hyderabad, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* intro */}
                        <div className='w-full h-[20%] flex mt-[2vw] overflow-hidden'>
                            <div className='h-full xl:w-2/3 lg:w-2/5 w-1/2 '>

                            </div>
                            <div className='h-full w-full flex-col  overflow-hidden font-[font2] text-black/50 flex items-end justify-end xl:text-[1.3vw] xl:leading-[1.2vw] lg:text-[2vw] text-end p-2'>
                                <TextY>
                                    <p>Crafting intuitive, human-focused interfaces — from <span className='text-black'>pixels</span> to <span className='text-black'>backend logic</span>.</p>
                                </TextY>
                                <div className='h-full w-full overflow-hidden font-[font2] text-black/50 flex items-end justify-end xl:text-[1.3vw] xl:leading-[1.5vw] lg:text-[2vw]  p-2'>
                                    <TextY>
                                        <p>Every inch. Every pixel. <span className='text-black'>Hand-crafted.</span></p>
                                    </TextY>
                                </div>
                            </div>


                        </div>

                        {/* Descriptio */}
                        <div className='w-full h-[35%]  flex items-start flex-col justify-end  overflow-hidden'>
                            <div className="overlflow-hidden md:mx-[3vw] font-[font2]  will-change-transform xl:w-[50%] lg:w-[80%] tracking-wider xl:text-[1.7vw] xl:leading-[1.5vw] lg:text-[2.5vw] lg:leading-[2.7vw] px-2 mt-[5vw] xl:mt-[2vw]  ">
                                <TextY>
                                    <p>I create digital experiences that spark curiosity and leave a mark. Every interface I design is a space where creativity and functionality meet to tell unique stories.
                                    </p>
                                </TextY>
                            </div>
                        </div>

                    </div>
                    <div className='xl:w-1/2 md:w-2/3 h-full mt-[2vw] flex items-center mx-auto justify-center '>
                        <div ref={imgRef} className='xl:w-[20vw] xl:h-[22vw] lg:w-[35vw] h-auto'>
                            <Image />
                        </div>
                    </div>
                </div>
                <div className='overflow-hidden w-full flex items-center justify-between h-[8vh] '>
                    <div className='w-full h-full  flex items-center justify-center font-[aeonik2]'>
                        [ Scroll To Explore <ArrowDown className='inline-block' /> ]

                    </div>
                    <div className='xl:w-1/2 md:w-[70%] font-[dbsharp] font-[500] xl:text-[0.8vw] items-center justify-center gap-5 h-full flex '>
                        <div className='flex items-center justify-center'>
                            <Globe className='inline-block xl:w-[1vw] xl:h-[1vw]' /> Hyderabad , India
                        </div>
                        <div style={{ fontStretch: '75%' }}>
                            {today}
                        </div>

                        <div style={{ fontStretch: '75%' }}>
                            {time}
                        </div>

                    </div>

                </div>



            </section>


            {/* page2 */}
            <section ref={section2} className='sticky w-full h-full transform-gpu will-change-transform bg-white will-change-opacity  flex flex-col '>

                <div className='overflow-hidden xl:mt-[3vw] xl:max-w-6xl lg:w-[85%] lg:mt-[5vw] xl:h-[45%] lg:h-[30%] xl:mx-[3vw]'>
                    <div className='xl:text-[4vw] lg:text-[6vw] lg:leading-[7.7vw] xl:leading-[4.5vw] text-black/50 font-[dbsharp] font-[500] lg:px-[2vw] p-2'>
                        <TextY>
                            <h1 className="textD">Designing for <span className='text-black'>clarity</span>, <span className='text-black'>impact</span>, and delight—one project at a time.</h1>

                        </TextY>
                    </div>
                </div>
                <div className='overflow-hidden xl:mt-[3vw] lg:mt-[5vw] xl:ml-[40%] lg:ml-[28%]   w-full h-full'>
                    <div className='xl:text-[2vw] font-[font2] xl:leading-[2vw] lg:text-[4vw] text-black/60'>
                        <TextY>
                            <h1>Purpose</h1>
                        </TextY>
                    </div>

                    <div className='overflow-hidden xl:max-w-4xl lg:w-[70%] lg:mt-[5vw] lg:text-[3vw] lg:leading-[3.5vw] xl:mt-[3vw] xl:text-[2vw] xl:leading-[2.8vw] font-[Helvetica] font-[200]'>
                        <TextY>
                            <h2>I believe every pixel holds meaning — every design, every interaction speaks with intention, connecting deeply and expressing with intensity.</h2>
                        </TextY>
                    </div>

                    <div className='overflow-hidden xl:max-w-4xl lg:w-[70%] lg:mt-[5vw] lg:text-[3vw] lg:leading-[3.5vw] xl:mt-[3vw] xl:text-[2vw] xl:leading-[2.8vw] font-[Helvetica] font-[200]'>
                        <TextY>
                            <h2>Design and development are just tools; I craft experiences where each pixel enhances utility, emotion, and connection.</h2>
                        </TextY>
                    </div>

                </div>

                <div className='w-full h-full md:mx-[5vw] md:mt-[5vw] overflow-hidden'>
                    <div className='xl:text-[2vw] font-[font2] xl:leading-[2vw] lg:text-[4vw] text-black/60'>
                        <TextY>
                            <h1>Capabilities</h1>
                        </TextY>
                    </div>
                    <div className="w-[60%] md:p-0  p-5 md:py-5 font-[font2]">
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
            <section className='w-full min-h-full'>
                <div className='w-full h-full xl:text-[3vw] font-[dbsharp] font-[500] md:mt-[5vw] md:mx-[3vw] xl:leading-[4vw] '>
                    <div className='md:max-w-2xl text-black/50 '>
                        <TextY>
                            <h1>End of this section but <span className='text-black'>Our Journey</span></h1>
                        </TextY>
                    </div>
                    <div className='xl:text-[1vw] xl:leading-[2vw]'>
                        <TextY>
                            <h1>Every Pixel and Hand <PenTool className='inline-block xl:w-[3vw] xl:h-[3vw] -rotate-90' strokeWidth={0.8} /> made</h1>
                        </TextY>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    )
}

export default Home
