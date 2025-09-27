import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Book, Briefcase, BriefcaseBusiness, Code2, Heart,
    LightbulbIcon, MouseIcon, Projector
} from "lucide-react";
import { RiSearch2Fill } from "react-icons/ri";
import Image from '../Components/Image';
import Text from '../Text Animation/Text';
import { useNavigate } from 'react-router-dom';
import { Model2 } from '../Components/Model2';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import ParellaxImage from '../Components/ParellaxImage';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Aboutme = () => {
    const imageDivRef = useRef(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const isMobile = window.innerWidth <= 853;
    const navigate = useNavigate();

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
                        end: "top 60%",
                        scrub: true,
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
                        end: "top 60%",
                        scrub: true,
                    },
                }
            );
        });

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

    const bottom = [
        { name: "", icon: "" },
        { name: "Scroll Down", icon: <MouseIcon /> },
        { name: "", icon: "" },
    ];

    return (
        <div className="w-full min-h-screen  relative overflow-x-hidden">
            <section className="w-full min-h-screen  relative">


                {/* Pinned Image */}
                <div
                    ref={imageDivRef}
                    className="absolute overflow-hidden lg:h-[40vw] rounded-md xl:h-[35vw]  md:z-5 z-0 md:h-[60vw] h-[65vw] w-[65vw]   xl:w-[35vw] lg:w-[40vw]  md:top-[25vh] lg:top-[20vh] xl:left-[5vw] lg:-left-[2vw] top-[12vh] md:-left-[15vw] left-[3vw]"
                >
                    <Image className="object-cover" />
                </div>

                {/* About me heading */}
                <div className="overflow-hidden md:px-[5vh] ml-[50%] w-1/2 z-20 px-2">
                    <div className="overflow-hidden  md:mt-[25vh] mt-[52vh]">
                        <div className="heading-text  leading-[9vw] tracking-tighter text-[12vw] md:text-[12vw] text-black/50 font-poppins font-poppins-500 uppercase text-end  md:leading-[9vw] py-1">
                            About
                        </div>
                    </div>
                    <div className="overflow-hidden md:w-1/2 md:ml-[50%]">
                        <div className="heading-text  leading-[9vw] tracking-tighter text-[12vw] md:text-[12vw] text-black/50 font-poppins font-poppins-500 uppercase text-end  md:leading-[9vw] py-1">
                            me
                        </div>
                    </div>
                </div>

                {/* About Paragraph */}
                <div className="overflow-hidden ml-[3%] md:ml-[45%] z-50 md:px-5 flex flex-col">
                    <p className="about-para md:text-[1.8vw] text-[5vw] text-justify break-words hyphens-auto font-poppins  font-poppins-500 text-black/50 mt-[0vh] md:mt-[5vh] leading-[2vh] md:leading-[2vw]  md:px-0">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I'm NagaRuthwik , a passionate web developer dedicated to
                        crafting engaging and user-friendly digital experiences. With a strong foundation in
                        both front-end and back-end technologies, I specialize in creating responsive websites
                        and applications that not only look great but also perform seamlessly across all devices.
                    </p>
                </div>


                {/* Education Section */}
                <div className="leading-[2vw] md:w-1/2 md:mt-[10vw] md:mx-[5vw]  md:mr-[50%] font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[5vh] mt-[6vh]">
                        <h1 className="md:text-[8vw]  md:text-start  text-[15vw] text text-start  uppercase md:leading-[6vw] leading-[10vw]">
                            Education
                        </h1>
                    </div>
                </div>

                <div className="leading-[2vw] md:w-1/2 md:mt-[5vw] md:mx-[5vw] md:mr-[50%] text-start font-poppins font-poppins-500  overflow-hidden">
                    <div className="lg:mt-[1vh] flex items-center justify-start  mt-[4vh]">
                        <Book className="md:w-10 textMd md:h-10" strokeWidth={1.2} />
                        <h1 className="md:text-[3vw]  flex items-center justify-end  text-[7vw] text-black/50 textMd text-end md:text-end uppercase md:leading-[3vw] leading-[9vw]">
                            10th + 2
                        </h1>
                    </div>
                </div>

                <div className='px-2  flex-col-reverse md:flex-row-reverse flex items-start  justify-between md:px-[7vw]'>
                    <div className="p-3 text-justify md:w-[40%] break-words hyphens-auto  tracking-tighter  md:p-5 overflow-hidden">
                        <p
                            className="education-text lg:text-[1.1vw] text-md text-justify  font-poppins font-poppins-500 md:leading-[1vw] leading-[3.5vw] ">
                            I completed my schooling at ZPHS School at Challagariga, where I consistently focused on academics and extracurricular activities. I am proud to mention that I secured a perfect GPA of ' 9.8 ' in my 10th board examinations. Following that, I pursued my intermediate studies in the MPC stream at Vidwan Junior College, Telangana, where I scored an impressive 80.05% in the Intermediate Public Exams. These early educational achievements laid a solid foundation for my journey in higher education.
                        </p>
                    </div>
                    <div className='overflow-hidden  md:mt-0 mt-[5vh]'>
                        <div className='md:w-full w-[75vw] h-[50vw] md:h-full'>
                            <ParellaxImage className='w-full h-full object-center object-cover' src="https://plus.unsplash.com/premium_photo-1681487787308-52f293cd3bce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFjaGVsb3J8ZW58MHx8MHx8fDA%3D" alt="" />
                        </div>
                    </div>
                </div>

                <div className="leading-[2vw] md:mt-[10vw] w-1/2 md:px-[6vw] ml-[50%] font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[1vh]  mt-[4vh]">
                        <h1 className="md:text-[4vw]  text-[7vw] text-black/50 textMd text-end md:text-end uppercase md:leading-[7vw] leading-[9vw]">
                            Bachelors
                        </h1>
                    </div>
                </div>



                <div className='px-2  flex  flex-col-reverse md:flex-row items-start justify-between md:px-[7vw]'>
                    <div className="p-3 text-justify w-full md:w-[40%] break-words hyphens-auto  tracking-tighter   md:p-5 overflow-hidden">
                        <p
                            className="btech-text lg:text-[1.1vw] text-md text-justify font-poppins font-poppins-500 md:leading-[1vw] leading-[3.5vw] ">
                            Currently, I'm in my 4-1 semester at Malla Reddy University, pursuing my B.Tech in Computer Science and Engineering. Throughout my undergraduate studies, I have been actively involved in hands-on projects and technical learning, which have enhanced my understanding of both theoretical concepts and real-world applications. I am constantly seeking opportunities to improve my skills, explore new technologies, and contribute meaningfully to projects in the field of computer science.
                        </p>
                    </div>
                    <div className='overflow-hidden'>
                        <div className='md:w-full w-[75vw] mt-[5vh] md:mt-0 h-[50vw] md:h-full '>
                            <ParellaxImage className='w-full h-full object-center object-cover' src="https://images.unsplash.com/photo-1658235081483-8f06aa0882cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFjaGVsb3J8ZW58MHx8MHx8fDA%3D" alt="" />
                        </div>
                    </div>
                </div>


                <div className="leading-[2vw] lg:mt-[15vh] font-[aeonik2] overflow-hidden">
                    <div className="lg:mt-[5vh] md:mx-[3vh] md:w-2/3 mt-[6vh]">
                        <h1 className="md:text-[6vw]  border-b-2 md:text-start border-gray-200 text-[11vw] text  text-justify uppercase md:leading-[5vw] leading-[10vw]">
                            What I Can Do!!
                        </h1>
                    </div>
                </div>
                <div className='md:px-0 px-2'>
                    <div className="overflow-hidden ml-[3%] md:ml-[40%] z-50 md:px-5  flex flex-col">
                        <p className="skills-text md:text-[2vw] text-[5vw] text-justify break-words hyphens-auto font-[font2]  p-5 leading-[2vh] md:leading-[3.5vh]  md:px-0">
                            I primarily work with custom  and JavaScript, with both Library & FrameWork having developed a well-structured and maintainable front-end architecture . I also have experience with frameworks like Vue and React. I strive to make the most of CSS for styling, layout and even for animations. I also mainly rely on GSAP to create smooth and dynamic interactions.
                        </p>
                    </div>
                </div>

            </section>



            {/* Projects Section */}
            <section className="w-full md:px-10 flex flex-col items-center justify-center h-screen">
                <div className="leading-[2vw] font-poppins font-poppins-500 overflow-hidden text-center">
                    <h1 className="md:text-[11vw] text-[11vw] text-start uppercase tracking-tighter md:leading-[12vw] leading-[10vw] text-black">
                        Explore My Projects
                    </h1>
                    <p className="mt-4 md:text-[1.6vw] md:leading-[3.5vh] leading-[2vh] text-start text-[3.5vw] text-gray-600 max-w-2xl">
                        Take a look at the projects I've built — each crafted with attention to detail and a
                        focus on user experience.
                    </p>
                </div>

                <div className="mt-8">
                    <button onClick={() => {
                        navigate("/projects");
                        scrollTo(0, 0);
                    }}
                        className="md:px-8 px-4 py-3 flex items-center justify-center gap-2 rounded-full bg-black text-white font-semibold hover:scale-105 hover:bg-gray-800 transition-all duration-300 text-lg md:text-xl shadow-xl">
                        View Projects <Projector className="w-5 h-5" />
                    </button>
                </div>

            </section>
        </div>
    );
};

export default Aboutme;