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
                        rotate: 7,
                        duration: 1,
                        ease: "power3.out",
                        stagger: 0.2,
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
        <div className="w-full min-h-screen bg-white/90 relative overflow-x-hidden">
            <section className="w-full min-h-screen relative">


                {/* Pinned Image */}
                <div
                    ref={imageDivRef}
                    className="absolute overflow-hidden lg:h-[40vw] rounded-md xl:h-[35vw]  md:z-5 z-0 md:h-[60vw] h-[85vw] w-[65vw]   xl:w-[35vw] lg:w-[40vw]  md:top-[25vh] lg:top-[20vh] xl:left-[5vw] lg:-left-[2vw] top-[12vh] md:-left-[15vw] left-[3vw]"
                >
                    <Image className="object-cover" />
                </div>

                {/* About me heading */}
                <div className="overflow-hidden md:px-[5vh] ml-[50%] w-1/2 z-20 px-2">
                    <div className="overflow-hidden  md:mt-[25vh] mt-[52vh]">
                        <div className="heading-text border-b-2 border-gray-200 leading-[9vw] tracking-tighter text-[12vw] md:text-[12vw] text-black/80 font-poppins font-poppins-500 uppercase text-end  md:leading-[9vw] py-1">
                            About
                        </div>
                    </div>
                    <div className="overflow-hidden md:w-1/2 md:ml-[50%]">
                        <div className="heading-text border-b-2 border-gray-200 leading-[9vw] tracking-tighter text-[12vw] md:text-[12vw] text-black/80 font-poppins font-poppins-500 uppercase text-end  md:leading-[9vw] py-1">
                            me
                        </div>
                    </div>
                </div>

                {/* About Paragraph */}
                <div className="overflow-hidden ml-[3%] md:ml-[45%] z-50 md:px-5 flex flex-col">
                    <p className="about-para md:text-[1.6vw] text-[5vw] text-justify break-words hyphens-auto font-poppins  font-poppins-500 text-black/70 mt-[0vh] md:mt-[5vh] leading-[2vh] md:leading-[2.5vh]  md:px-0">
                        I'm NagaRuthwik , a passionate web developer dedicated to
                        crafting engaging and user-friendly digital experiences. With a strong foundation in
                        both front-end and back-end technologies, I specialize in creating responsive websites
                        and applications that not only look great but also perform seamlessly across all devices.
                    </p>
                </div>

                {/* Scroll Down */}
                <div className="bottom md:mt-[5vh] mt-[0.5vh] ">
                    <div className="flex items-center justify-around">
                        {bottom.map((items, index) => (
                            <div key={index} className="between">
                                <h1 className="text-[3vw] md:text-[2.2vh] opacity-85 font-[font2] flex ">
                                    {items.name}{" "}
                                    {items.name === "Scroll Down" ? (
                                        <span className="animate-bounce [animation-duration:2s]">
                                            {items.icon}
                                        </span>
                                    ) : (
                                        items.icon
                                    )}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <div className="leading-[2vw] md:w-1/2 md:mr-[50%] font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[5vh] mt-[6vh]">
                        <h1 className="md:text-[8vw] py-1 border-b-2 md:text-start border-gray-200 text-[15vw] text text-start  uppercase md:leading-[7vw] leading-[10vw]">
                            Education
                        </h1>
                    </div>
                </div>

                <div className="leading-[2vw] md:w-1/2 md:mr-[50%] text-start font-poppins font-poppins-500  overflow-hidden">
                    <div className="lg:mt-[1vh] flex items-center justify-start  mt-[4vh]">
                        <Book className="md:w-10 textMd md:h-10" strokeWidth={1.2} />
                        <h1 className="md:text-[4vw] border-b-2 flex items-center justify-end border-gray-200  text-[7vw] text-black textMd text-end md:text-end uppercase md:leading-[5vw] leading-[9vw]">
                            10th + 2
                        </h1>
                    </div>
                </div>

                <div className="lg:mr-[40%] p-3 text-justify tracking-tighter  mt-4 md:mr-[40%] overflow-hidden">
                    <Text
                        className="lg:text-[2vw] text-md  font-poppins font-poppins-500 md:leading-[4vh] text-justify break-words hyphens-auto"
                        text={` I completed my schooling at ZPHS School at Challagariga, where I consistently focused on academics and extracurricular activities. I am proud to mention that I secured a perfect GPA of ' 9.8 ' in my 10th board examinations. Following that, I pursued my intermediate studies in the MPC stream at Vidwan Junior College, Telangana, where I scored an impressive 80.05% in the Intermediate Public Exams. These early educational achievements laid a solid foundation for my journey in higher education. `}
                    />
                </div>

                <div className="leading-[2vw] w-1/2 ml-[50%] font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[1vh] border-b-2 border-gray-200 mt-[4vh]">
                        <h1 className="md:text-[4vw]  text-[7vw] text-black textMd text-end md:text-end uppercase md:leading-[7vw] leading-[9vw]">
                            Bachelors
                        </h1>
                    </div>
                </div>

                <div className="lg:ml-[40%] tracking-tighter p-3 mt-4 md:ml-[40%] text-justify break-words hyphens-auto overflow-hidden">
                    <Text
                        className="lg:text-[2vw] text-md  font-poppins font-poppins-500 md:leading-[4vh] text-justify break-words hyphens-auto"
                        text={`Currently, I'm in my 4-1 semester at Malla Reddy University, pursuing my B.Tech in Computer Science and Engineering. Throughout my undergraduate studies, I have been actively involved in hands-on projects and technical learning, which have enhanced my understanding of both theoretical concepts and real-world applications. I am constantly seeking opportunities to improve my skills, explore new technologies, and contribute meaningfully to projects in the field of computer science.`}
                    />
                </div>


                <div className="leading-[2vw] lg:mt-[15vh] font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[5vh] md:mx-[3vh] md:w-2/3 mt-[6vh]">
                        <h1 className="md:text-[6vw] py-1 border-b-2 md:text-start border-gray-200 text-[11vw] text  text-justify uppercase md:leading-[7vw] leading-[10vw]">
                            What I Can Do!!
                        </h1>
                    </div>
                </div>
                <div className="overflow-hidden ml-[3%] md:ml-[30%] z-50 md:px-5 flex flex-col">
                    <p className="do-para md:text-[2vw] text-[5vw] text-justify break-words hyphens-auto font-poppins  font-poppins-500 text-black/70 mt-[0vh] md:mt-[8vh] leading-[2vh] md:leading-[3.5vh]  md:px-0">
                        I primarily work with custom  and JavaScript, with both Library & FrameWork having developed a well-structured and maintainable front-end architecture . I also have experience with frameworks like Vue and React. I strive to make the most of CSS for styling, layout and even for animations. I also mainly rely on GSAP to create smooth and dynamic interactions.
                    </p>
                </div>

            </section>




            {/* Experience Section */}
            <section className="w-full  z-10 relative min-h-screen">

                {/* Experience Title */}
                <div className="leading-[2vw]  font-poppins font-poppins-500 overflow-hidden">


                    <div className="lg:mt-[15vh] md:mx-[2vw] mt-[16vh] overflow-hidden">
                        <div className=" uppercase md:leading-[7vw] leading-[10vw] ">
                            <h1 className="md:text-[8vw] text-[12vw] text text-center md:text-start ">
                                Experience
                            </h1>
                        </div>
                    </div>

                    <div className="lg:mr-[35%] md:mx-[2vw] md:mr-[40%]  mt-[5vh] p-8 md:border-2 md:border-gray-300 rounded-sm ">

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <BriefcaseBusiness className="w-8 h-8 text-black" strokeWidth={1} />
                            <h3 className="md:text-[3vw] text-[6vw] font-semfibold leading-tight">
                                Fullstack Developer
                            </h3>
                        </div>

                        {/* Company Info */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <span className="text-xs uppercase tracking-widest bg-black text-white px-3 py-1 rounded-full">
                                3 Months
                            </span>
                            <div className="text-sm mt-2 md:mt-0 text-right">
                                <p className="font-medium">UnifiedMentor Private Limited</p>
                                <p className="text-gray-600">May 2023 - July 2023</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className=" lg:text-[1.3vw] text-base text-justify leading-[3vh] mt-6 text-gray-800">
                            During my internship at UnifiedMentor, I worked on developing and maintaining fullstack
                            applications using modern technologies like React, Node.js, and MongoDB. I collaborated
                            with the development team to implement new features, fix bugs, and optimize application
                            performance.
                        </p>

                        {/* Tech Stack */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {["React", "Node.js", "MongoDB", "Express", "REST APIs"].map((tech, i) => (
                                <span
                                    key={i}
                                    className="border border-black text-black text-xs font-medium px-3 py-1 rounded-full hover:bg-black hover:text-white transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Experience Card */}

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