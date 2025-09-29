import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Book, Briefcase, BriefcaseBusiness, Code2, Heart,
    LightbulbIcon, MouseIcon, Projector,
    Rocket,
    RocketIcon,
    Send,
    Sparkle,
    Star
} from "lucide-react";
import { RiSearch2Fill } from "react-icons/ri";
import Image from '../Components/Image';
import Text from '../Text Animation/Text';
import { useNavigate } from 'react-router-dom';
import { Model2 } from '../Components/Model2';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import ParellaxImage from '../Components/ParellaxImage';
import { IoSparklesSharp } from 'react-icons/io5';
import Footer from '../Components/Footer';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Aboutme = () => {
    const imageDivRef = useRef(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const isMobile = window.innerWidth <= 853;
    const navigate = useNavigate();
    const fillRef = useRef(null);
    const boxRef = useRef(null)

    // Check if fonts are loaded
    useEffect(() => {
        document.fonts.ready.then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useGSAP(() => {
        if (!fontsLoaded) return;

        // Bottom section animation
        gsap.utils.toArray(".bottom").forEach((item) => {
            gsap.fromTo(
                item,
                { opacity: 1 },
                {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 95%",
                        end: "top 60%",
                        scrub: true,
                    },
                }
            );
        });

        // Animate "About me" heading
        const splitHeading = new SplitText(".heading-text", { types: "chars" });
        gsap.from(splitHeading.chars, {
            y: -180,
            duration: 1,
            stagger: 0.05,
            ease: "power3.inOut",
        });

        // Animate paragraphs

        gsap.utils
            .toArray([
                ".about-para",
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
                        duration: 1,
                        ease: "power3.out",
                        stagger: 0.1,

                    }
                );
            });

        gsap.utils
            .toArray([
                ".education-text",
                ".btech-text",
                ".skills-text",
                ".experience-text",
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
                        duration: 1,
                        ease: "power3.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: selector,
                            start: "top 50%"
                        }
                    }
                );
            });

        // Animate "What I Can Do" section
        gsap.utils.toArray([".do-para"]).forEach((selector) => {
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
                    y: -100,

                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: selector,
                        start: "top 80%",
                        end: "top 28%",
                        scrub: true,
                    }
                }
            );
        });

        // Title animations
        gsap.utils.toArray(".text").forEach((title) => {
            gsap.fromTo(
                title,
                { y: 150, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 90%",

                    },
                }
            );
        });

        gsap.utils.toArray(".textMd").forEach((title) => {
            gsap.fromTo(
                title,
                { y: 150, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",

                    },
                }
            );
        });

        gsap.set(fillRef.current, { yPercent: 100 });

        boxRef.current.onmouseenter = () => {
            gsap.to(fillRef.current, {
                yPercent: 0,
                duration: 0.4,
                ease: "power3.inOut"
            });
        };

        boxRef.current.onmouseleave = () => {
            gsap.to(fillRef.current, {
                yPercent: 100,
                duration: 0.4,
                ease: "power3.inOut"
            });
        };

        // Only animate .expo if it exists
        const expoElement = document.querySelector(".expo");
        if (expoElement) {
            gsap.from(".expo", {
                x: isMobile ? -100 : -700,
                duration: 2,
                scrollTrigger: {
                    trigger: ".expo",
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true,
                }
            });
        }
    }, { dependencies: [fontsLoaded] });

    // Marquee component
    const GsapMarquee = ({ speed, direction, children }) => {
        return (
            <div className="overflow-hidden whitespace-nowrap">
                <div
                    className="inline-block whitespace-nowrap"
                    style={{
                        animation: `marquee-${direction} ${speed}s linear infinite`,
                    }}
                >
                    {React.Children.map(children, (child, index) => (
                        <span key={index} className="mx-8 inline-block">
                            {child}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    gsap.from(".end", {
        y: 100,
        duration: 1.2,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".end",
            start: "top 60%",
        }
    })

    const bottom = [
        { name: "", icon: "" },
        { name: "Scroll Down", icon: <MouseIcon /> },
        { name: "", icon: "" },
    ];

    return (
        <div className="w-full min-h-screen  relative overflow-x-hidden">
            <section className="w-full min-h-screen  relative">




                {/* About me heading */}
                <div className='flex items-center justify-center md:justify-around md:gap-[10vw] md:mt-[10vw] md:flex-row flex-col'>
                    <div className='xl:w-[30%] lg:w-[45%] md:w-[70%] '>
                        <Image />
                    </div>
                    <div className='overflow-hidden px-3 mt-[2vw] w-full lg:w-1/2'>
                        <div className="overflow-hidden md:px-[5vh]   z-20 px-4">
                            <div className="overflow-hidden  ">
                                <div className="heading-text  leading-[9vw] tracking-tight text-[12vw] xl:leading-[4vw] xl:text-[6vw] lg:text-[9vw] lg:leading-[7vw] md:text-[10vw] md:leading-[8vw] text-black/50 font-[font2]  text-end   py-1">
                                    About
                                </div>
                            </div>
                            <div className="overflow-hidden ">
                                <div className="heading-text  leading-[9vw] tracking-tight text-[12vw] xl:leading-[4vw] xl:text-[6vw] lg:text-[9vw] lg:leading-[7vw] md:text-[10vw] md:leading-[6vw] text-black/50 font-[font2]  text-end   py-1">
                                    me
                                </div>
                            </div>
                        </div>

                        {/* About Paragraph */}
                        <div className="overflow-hidden  z-50 md:px-5 flex flex-col">
                            <p className="about-para xl:text-[2vw] xl:leading-[1.8vw] lg:text-[2vw] lg:leading-[1.5vw] md:text-[2.2vw] md:leading-[2vw] text-[5vw] text-justify break-words hyphens-auto font-[font2] text-black/50 mt-[0vh] md:mt-[5vh] leading-[2vh]   md:px-0">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I'm Nagaruthwik , a passionate web developer dedicated to
                                crafting engaging and user-friendly digital experiences. With a strong foundation in
                                both front-end and back-end technologies, I specialize in creating responsive websites
                                and applications that not only look great but also perform seamlessly across all devices.
                            </p>
                        </div>
                    </div>
                </div>


                {/* Education Section */}
                <div className=" md:w-1/2 md:mt-[2vw] mt-[10vw]  md:mx-[5vw]  md:mr-[50%] font-[aeonik2] overflow-hidden">
                    <div className="">
                        <h1 className="xl:text-[5vw] xl:leading-[4vw] lg:text-[7vw] lg:leading-[6vw] md:text-[9vw] md:leading-[8vw]  md:text-start text-[10vw] text text-start  text-gray-700  leading-[10vw]">
                            Education
                        </h1>
                    </div>
                </div>

                <div className="leading-[2vw] md:w-1/2 md:mt-[2vw] md:mx-[5vw] md:mr-[50%] text-start font-poppins font-poppins-500  overflow-hidden">
                    <div className="lg:mt-[1vh] flex items-center justify-start  mt-[4vh]">
                        <h1 className="xl:text-[3vw] xl:leading-[4vw] lg:text-[4vw] lg:leading-[3vw] md:text-[5vw] md:leading-[4vw]  flex items-center justify-end  text-[7vw] text-black/50 textMd text-end md:text-start  leading-[9vw]">
                            High School
                        </h1>
                    </div>
                </div>

                <div className='px-2 p-3  flex-col-reverse md:flex-row flex items-start w-full h-full justify-between md:px-[4vw]'>
                    <div className="p-3 text-justify lg:w-[65%] xl:w-[50%] md:w-[60%] break-words hyphens-auto  tracking-tighter  md:p-5 overflow-hidden">
                        <p
                            className="education-text lg:text-[2vw] lg:leading-[1.8vw] xl:text-[1.2vw] xl:leading-[1vw] md:text-[2.5vw] md:leading-[2.1vw] text-sm text-gray-600 text-justify  font-poppins font-poppins-500  leading-[3.5vw] ">
                            I completed my schooling at ZPHS School at Challagariga, where I consistently focused on academics and extracurricular activities. I am proud to mention that I secured a perfect GPA of ' 9.8 ' in my 10th board examinations. Following that, I pursued my intermediate studies in the MPC stream at Vidwan Junior College, Telangana, where I scored an impressive 80.05% in the Intermediate Public Exams. These early educational achievements laid a solid foundation for my journey in higher education.
                        </p>
                    </div>

                </div>

                <div className="leading-[2vw] md:mt-[vw] w-1/2 md:px-[4vw] tracking-tight font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[1vw]  mt-[4vh]">
                        <h1 className="xl:text-[4vw] xl:leading-[3vw] lg:leading-[5vw] lg:text-[6vw] md:text-[8vw] md:leading-[7vw] text-[7vw] text-black/50 textMd text-start px-5 md:text-start   leading-[9vw]">
                            Bachelors
                        </h1>
                    </div>
                </div>



                <div className='px-2  flex  flex-col-reverse md:flex-row items-start justify-between md:px-[4vw]'>
                    <div className="p-3 text-justify w-full lg:w-[65%] xl:w-[50%] md:w-[60%] break-words hyphens-auto  tracking-tighter   md:p-5 overflow-hidden">
                        <p
                            className="btech-text lg:text-[2vw] lg:leading-[1.8vw] xl:text-[1.2vw] xl:leading-[1vw] md:text-[2.5vw] md:leading-[2.1vw] text-sm text-justify text-gray-600 font-poppins font-poppins-500  leading-[3.5vw] ">
                            Currently, I'm in my 4-1 semester at Malla Reddy University, pursuing my B.Tech in Computer Science and Engineering. Throughout my undergraduate studies, I have been actively involved in hands-on projects and technical learning, which have enhanced my understanding of both theoretical concepts and real-world applications. I am constantly seeking opportunities to improve my skills, explore new technologies, and contribute meaningfully to projects in the field of computer science.
                        </p>
                    </div>

                </div>


                <div className="leading-[2vw] lg:mt-[15vh] font-[aeonik2] overflow-hidden">
                    <div className="lg:mt-[5vh] md:mx-[3vh] md:w-2/3 mt-[6vh]">
                        <h1 className="md:text-[6vw]   md:text-start text-gray-400  text-[11vw] text  text-justify  md:leading-[5vw] leading-[10vw]">
                            What I <span className='text-black'>Can</span> Do!!
                        </h1>
                    </div>
                </div>
                <div className='md:px-0 px-2'>
                    <div className="overflow-hidden ml-[3%] md:ml-[40%] z-50 md:px-5  flex flex-col">
                        <p className="skills-text lg:text-[2.2vw] lg:leading-[1.8vw] xl:text-[1.5vw] xl:leading-[1vw] md:text-[2.5vw] md:leading-[2.1vw] text-justify text-gray-600 break-words hyphens-auto font-[font2]  p-5 leading-[2vh]   md:px-0">
                            I primarily work with custom  and JavaScript, with both Library & FrameWork having developed a well-structured and maintainable front-end architecture . I also have experience with frameworks like Vue and React. I strive to make the most of CSS for styling, layout and even for animations. I also mainly rely on GSAP to create smooth and dynamic interactions.
                        </p>
                    </div>
                </div>

            </section>


            <section className='w-full flex end-section items-start flex-col justify-center min-h-screen'>
                <div className='overflow-hidden px-10'>
                    <div className='xl:text-[5vw] end text-[7vw] leading-[7vw] lg:text-[8vw] lg:leading-[8vw] xl:leading-[5vw] font-[font2] '>
                        <h1>The <span className='text-gray-400 font-[font3]'>End</span>...</h1>
                    </div>
                    <div className='xl:text-[2vw] end text-[4vw] leading-[4vw] lg:text-[3vw] lg:leading-[3vw] xl:leading-[2vw] font-[font2] '>
                        <h1>Come on, Let’s Build Something Great</h1>
                    </div>
                    <div className="leading-[2vw] end font-poppins font-poppins-500 overflow-hidden text-center">
                        <h1 className="xl:text-[4vw] lg:text-[5vw] lg:leading-[5vw] md:text-[5vw] md:leading-[5vw] text-[6vw] text-start  tracking-tighter xl:leading-[5vw] leading-[6vw] text-gray-300">
                            Explore My <span className='text-black'>Projects</span>
                        </h1>
                    </div>
                    <div className='xl:text-[1.2vw] end text-[3vw] leading-[3vw] lg:text-[3vw] lg:leading-[3vw] xl:leading-[1.5vw] font-[font2] '>
                        <h1>Take a look at the projects I've built — each crafted with attention to detail and a
                            focus on user experience.</h1>
                    </div>

                </div>
                <div className='overflow-hidden w-full mx-[3vw]'>
                    <div className="overflow-hidden relative bg-black w-[45%] md:w-[45%] lg:w-[30%] xl:w-[20%] lg:h-[5vw] md:h-[5vw] xl:h-[3vw] h-[10vw] mt-5 flex items-center border  justify-center border-b-black   rounded-full ">
                        <button
                            onClick={() => {
                                navigate("/projects");
                                scrollTo(0, 0);
                            }}
                            ref={boxRef}
                            type="submit"
                            className="  px-3 md:px-2 py-5 md:py-10 lg:text-[2vw] lg:leading-[3vw] md:text-[2vw] xl:leading-[2vw] xl:text-[1.2vw] text-[2.5vw] w-full flex items-center justify-center   text-white font-[font2]   transform">
                            <div ref={fillRef} className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-red-600 text-black">
                                <h1 className="text-[2.5vw] flex items-center justify-center mt-1 lg:text-[2vw] lg:leading-[3vw] md:text-[2vw] xl:leading-[2vw] xl:text-[1.2vw] font-[font2] text-black">
                                    Let’s Build Something Great <RocketIcon />
                                </h1>
                            </div>
                            Let’s Build Something Great <RocketIcon />
                        </button>
                    </div>
                </div>

                <div className='w-full'>
                    <Footer />
                </div>

            </section>
        </div>
    );
};

export default Aboutme;