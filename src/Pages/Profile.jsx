import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";
import Image from "../Components/Image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { MouseIcon, RocketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(SplitText, ScrollTrigger);

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

const Aboutme = () => {
    const imageDivRef = useRef(null);
    const mobile = useMediaQuery({ maxWidth: 853 });
    const naviaget = useNavigate()


    useGSAP(() => {
        // ✅ Pin the image
        gsap.to(imageDivRef.current, {
            scrollTrigger: {
                trigger: imageDivRef.current,
                start: mobile ? "top 13%" : "top 18%",
                end: mobile ? "top -90%" : "top -120%",
                pin: true,
                pinSpacing: true,
                pinReparent: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                // markers: true,
            },
        });

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

        // ✅ Animate "About me" heading
        const splitHeading = new SplitText(".heading-text", {
            types: "chars",
        });

        gsap.from(splitHeading.chars, {
            y: -180,
            duration: 1,
            stagger: 0.05,
            ease: "power3.inOut",
        });

        // ✅ Animate ALL paragraphs (split into lines)
        gsap.utils
            .toArray([".education-text", ".btech-text", ".skills-text", ".experience-text"])
            .forEach((selector) => {
                const split = new SplitText(selector, { type: "lines" });

                // Wrap each line with nested spans
                split.lines.forEach((line) => {
                    const inner = document.createElement("span");
                    inner.className = "inline-block";
                    inner.textContent = line.textContent;

                    const wrapper = document.createElement("span");
                    wrapper.className = "overflow-hidden block"; // block so lines stack vertically
                    wrapper.appendChild(inner);

                    line.textContent = ""; // clear old content
                    line.appendChild(wrapper);
                });

                // Animate each line’s inner span
                gsap.from(split.lines.map((l) => l.querySelector("span.inline-block")), {
                    y: 100,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: selector,
                        start: mobile ? "top 50%" : "top 80%",
                        end: mobile ? "top 20%" : "top 35%",
                        scrub: true,
                    }
                });
            });
        // Title animations
        gsap.utils.toArray('.text').forEach(title => {
            gsap.fromTo(title,
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
                    }
                }
            );
        });

        gsap.utils.toArray('.textMd').forEach(title => {
            gsap.fromTo(title,
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
                    }
                }
            );
        });
    });

    return (
        <div className="w-full min-h-screen bg-white/90 relative overflow-x-hidden">
            <section className="w-full min-h-screen relative">
                {/* Pinned Image */}
                <div ref={imageDivRef} className="absolute overflow-hidden lg:h-[40vw] xl:h-[40vw] md:z-5 z-0 md:h-[60vw] h-[85vw] w-[65vw] lg:rounded-3xl rounded-xl xl:w-[25vw] lg:w-[40vw]  md:top-[25vh] lg:-top-[10vh] xl:left-[10vw] lg:-left-[2vw] -top-[30vh] md:-left-[15vw] left-[3vw]" >
                    <Image className="object-cover" />
                </div>

                {/* About me heading */}
                <div className="overflow-hidden z-20 px-2">
                    <div className="overflow-hidden md:mt-[25vh] mt-[49vh]">
                        <div className="heading-text leading-[9vw] tracking-tighter text-[12vw] md:text-[12vw] text-black/80 font-poppins font-poppins-500 uppercase text-end md:px-[5vh] md:leading-[8vw] py-1">
                            About
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="heading-text leading-[9vw] tracking-tighter text-[12vw] md:text-[12vw] text-black/80 font-poppins font-poppins-500 uppercase text-end md:px-[5vh] md:leading-[8vw] py-1">
                            me
                        </div>
                    </div>
                </div>

                {/* About Paragraph */}
                <div className="overflow-hidden ml-[12%] md:ml-[40%] z-50 md:px-5 flex flex-col">
                    <p className="about-para md:text-[2vw] text-[5vw] md:text-justify font-poppins font-poppins-500 text-black/70 mt-[5vh] md:mt-[0vh] leading-[3vh] md:leading-[4vh] px-2 md:px-0">
                        I'm Ruthwik, a passionate web developer dedicated to crafting engaging
                        and user-friendly digital experiences. With a strong foundation in both
                        front-end and back-end technologies, I specialize in creating responsive
                        websites and applications that not only look great but also perform
                        seamlessly across all devices.
                    </p>
                </div>

                <div className="bottom md:mt-[13vh] ">
                    <div className="flex items-center justify-around">
                        {bottom.map((items, index) => (
                            <div key={index} className="between">
                                <h1 className="text-[3vw] md:text-[2vh] font-[font2] flex ">
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

                {/* Education Section */}
                <div className="leading-[2vw] font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[5vh] mt-[6vh]">
                        <h1 className="md:text-[8vw] text-[15vw] text text-start md:text-end uppercase md:leading-[7vw] leading-[10vw]">
                            Education
                        </h1>
                    </div>
                </div>

                <div className='leading-[2vw] font-poppins font-poppins-500  overflow-hidden'>
                    <div className='lg:mt-[1vh] mt-[4vh]'>
                        <h1 className='md:text-[4vw] text-[7vw] text-black textMd text-end md:text-end uppercase md:leading-[7vw] leading-[9vw]'>10th & Inter</h1>
                    </div>
                </div>

                <div className="lg:ml-[38%] p-3  mt-4 md:ml-[40%] overflow-hidden">
                    <p className="lg:text-[1.6vw] text-md text-justify font-poppins font-poppins-500 leading-[3.5vh] education-text">
                        I completed my schooling at ZPHS School at Challagariga, where I
                        consistently focused on academics and extracurricular activities. I am
                        proud to mention that I secured a perfect GPA of <span className="text-red-600">' 9.8 '</span> in my 10th board
                        examinations. Following that, I pursued my intermediate studies in the
                        MPC stream at Vidwan Junior College, Telangana, where I scored an
                        impressive 80.05% in the Intermediate Public Exams. These early educational
                        achievements laid a solid foundation for my journey in higher education.
                    </p>
                </div>

                <div className='leading-[2vw]  font-poppins font-poppins-500 overflow-hidden'>
                    <div className='lg:mt-[1vh] mt-[4vh]'>
                        <h1 className='md:text-[4vw] text-[7vw] text-black textMd text-end md:text-end uppercase md:leading-[7vw] leading-[9vw]'>Bachelors</h1>
                    </div>
                </div>

                <div className="lg:ml-[31%] p-3  mt-4 md:ml-[40%] overflow-hidden">
                    <p className="lg:text-[1.6vw] text-md text-justify font-poppins font-poppins-500 leading-[3.5vh] btech-text">
                        Currently, I am in my 4-1 semester at <span className="text-indigo-800">Malla Reddy University</span>, pursuing my B.Tech in Computer Science and Engineering. Throughout my undergraduate
                        studies, I have been actively involved in hands-on projects and technical
                        learning, which have enhanced my understanding of both theoretical
                        concepts and real-world applications. I am constantly seeking
                        opportunities to improve my skills, explore new technologies, and
                        contribute meaningfully to projects in the field of computer science.
                    </p>
                </div>


            </section>
            <section className="w-full md:px-10 min-h-screen">
                <div className="leading-[2vw] font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[15vh] mt-[16vh]">
                        <h1 className="md:text-[8vw] text-[11vw] text text-start md:text-start uppercase md:leading-[7vw] leading-[10vw]">
                            Experience
                        </h1>
                    </div>
                </div>
                <div className="lg:mr-[35%] p-3 mt-4 md:mr-[40%]  overflow-hidden">
                    <div className="timeline-item  py-2">
                        <div className="flex font-poppins font-poppins-600 justify-between items-center">
                            <h3 className="md:text-[3vw] text-[5vw] font-poppins font-poppins-600 text-gray-800">Fullstack Developer</h3>
                            <span className="bg-blue-100 experience-text text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                3 months
                            </span>
                        </div>
                        <p className="text-blue-600 experience-text font-medium">UnifiedMentor Private Limited</p>
                        <p className="text-gray-500 experience-text text-sm">May 2023 - July 2023</p>
                        <p className="lg:text-[1.6vw] text-md text-justify font-poppins font-poppins-500 leading-[3.5vh] experience-text mt-2">
                            During my internship at UnifiedMentor, I worked on developing and maintaining fullstack applications using modern technologies like React, Node.js, and MongoDB. I collaborated with the development team to implement new features, fix bugs, and optimize application performance. This experience helped me strengthen my skills in both frontend and backend development while working in a professional environment.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">React</span>
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Node.js</span>
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">MongoDB</span>
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Express</span>
                            <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">REST APIs</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full md:px-10 flex flex-col items-center justify-center h-screen">
                <div className="leading-[2vw] font-poppins font-poppins-500 overflow-hidden text-center">
                    <h1 className="md:text-[8vw] text-[11vw] uppercase md:leading-[7vw] leading-[10vw] text-black">
                        Explore My Projects
                    </h1>
                    <p className="mt-4 md:text-[1.6vw] text-[3.5vw] text-gray-600 max-w-2xl">
                        Take a look at the projects I've built — each crafted with attention to detail and a focus on user experience.
                    </p>
                </div>

                <div className="mt-8">
                    <button onClick={() => { naviaget("/projects"); scrollTo(0, 0) }} className="md:px-8 px-4 py-3 flex items-center justify-center gap-2 rounded-full bg-black text-white font-semibold hover:scale-105 hover:bg-gray-800 transition-all duration-300 text-lg md:text-xl shadow-xl">
                        View Projects <RocketIcon className="w-5 h-5" />
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Aboutme;
