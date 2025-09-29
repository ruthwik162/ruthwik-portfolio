import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
    FaReact,
    FaNodeJs,
    FaVuejs,
    FaPython,
    FaAngular,
    FaAws,
    FaEnvelope,
    FaLinkedin,
    FaGithub,
    FaArrowRight
} from "react-icons/fa";
import {
    SiMongodb,
    SiTailwindcss,
    SiPostgresql,
    SiThreedotjs,
    SiFirebase,
    SiTypescript,
    SiSvelte,
    SiGraphql,
    SiTensorflow
} from "react-icons/si";
import { MdBarChart } from "react-icons/md";
import ProjectCard from "../Components/ProjectCard";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { RocketIcon } from "lucide-react";
import Footer from "../Components/Footer";

const Projects = () => {
    const containerRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    const navigate = useNavigate();
    const projectRef = useRef(null);
    const boxRef = useRef(null);
    const fillRef = useRef(null);

    // Map stack names to React icons
    const getStackIcon = (name) => {
        const iconMap = {
            "React": FaReact,
            "Node.js": FaNodeJs,
            "MongoDB": SiMongodb,
            "Tailwind": SiTailwindcss,
            "Vue.js": FaVuejs,
            "Python": FaPython,
            "PostgreSQL": SiPostgresql,
            "Three.js": SiThreedotjs,
            "Angular": FaAngular,
            "Firebase": SiFirebase,
            "TypeScript": SiTypescript,
            "Chart.js": MdBarChart,
            "Svelte": SiSvelte,
            "GraphQL": SiGraphql,
            "AWS": FaAws,
            "TensorFlow": SiTensorflow
        };

        const IconComponent = iconMap[name] || FaReact;
        return <IconComponent className="text-white text-lg" />;
    };

    const projects = [
        {
            image: "https://plus.unsplash.com/premium_vector-1682298541598-7683a95289e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDc2fHx8ZW58MHx8fHx8",
            title: "Student-Teacher Appointment Scheduler",
            description: "Comprehensive appointment scheduling platform for educational institutions, enabling seamless booking and management of student-teacher meetings.",
            url: "https://teacher-student-appointment-a7hf.onrender.com/",
            stacks: [
                { name: "React" },
                { name: "Node.js" },
                { name: "MongoDB" },
                { name: "Tailwind" }
            ]
        },
        {
            image: "https://plus.unsplash.com/premium_vector-1682298570780-c416aa7b710f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDYzfHx8ZW58MHx8fHx8",
            title: "Operation Theatre Scheduler",
            description: "Operation theatre scheduling system with real-time updates, resource management, and analytics dashboard for optimized hospital workflows.",
            url: "https://operartion-theatre-schedular.vercel.app/",
            stacks: [
                { name: "React" },
                { name: "Node.js" },
                { name: "MongoDB" },
                { name: "Tailwind" }
            ]
        },
        {
            image: "https://media.istockphoto.com/id/2196521057/vector/hostel-check-in-isolated-cartoon-vector-illustrations.webp?a=1&b=1&s=612x612&w=0&k=20&c=DNzwPGcWP-ysAR8oKZSOhTsKaNKCP5VosdSMd_PKdEg=",
            title: "Mallareddy University Hostel",
            description: "Mallareddy university website with interactive campus map, event calendar, and integrated student portal for enhanced user experience.",
            url: "https://malla-reddy-university.vercel.app/",
            stacks: [
                { name: "React" },
                { name: "Node.js" },
                { name: "MongoDB" },
                { name: "Tailwind" }
            ]
        },
        {
            image: assets.ecommers,
            title: "e-Commerce Platform",
            description: "E-commerce platform with AI-driven product recommendations, dynamic pricing, and seamless checkout experience.",
            url: "https://e-commerce-ten-rose-60.vercel.app/",
            stacks: [
                { name: "React" },
                { name: "Node.js" },
                { name: "MongoDB" },
                { name: "Tailwind" }
            ]
        },
    ];

    const length = projects.length;

    useGSAP(() => {
        // Animate heading characters
        gsap.from(".char", {
            y: -200,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.05,
        });



        // ✅ Pin the left red box while scrolling project section
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.matchMedia({

            // Mobile (up to 849px)
            "(max-width: 849px)": function () {
                ScrollTrigger.create({
                    trigger: ".box",
                    start: "top 10%",
                    end: "bottom+=40% bottom",
                    pin: projectRef.current.querySelector(".box"),
                    pinSpacing: false,
                    markers: false,
                });
            },

            // Desktop (850px and up)
            "(min-width: 850px)": function () {
                ScrollTrigger.create({
                    trigger: ".box",
                    start: "top 10%",
                    end: "bottom+=90% bottom",
                    pin: projectRef.current.querySelector(".box"),
                    pinSpacing: false,
                    markers: false,
                });
            },

            // All devices (common settings)
            "all": function () {
                // Any ScrollTriggers or animations that apply to all
            }
        });


        // Animate contact section
        gsap.from(".contact-item", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            marginTop: "5vw",
            scrollTrigger: {
                trigger: ".contact-section",
                start: "top 85%",
                end: "top 50%",
                scrub: 1,
            },
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

        gsap.from(".end", {
            y: 100,
            duration: 1.2,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".end",
                start: "top 60%"
            }
        })
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-white md:mt-[10vh] mt-[30vh]">
            {/* Title */}
            <div className="title-container bg-white">
                <div className='bg-white mt-[10vh] md:mt-[40vh] overflow-hidden'>
                    <div className="overflow-hidden">
                        <div className='text-[15vw] md:text-[7vw] mx-[2vw] md:mx-[5vw] font-[font2] uppercase text-black'>
                            <div className="char relative">
                                Projects <span className="absolute top-[10%] md:right-[57%] text-[7vw] md:text-[2vw]">[{length}]</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div ref={projectRef} className="flex items-center md:items-start justify-center md:mt-[5vw] md:flex-row flex-col">
                <div className="  md:h-screen tracking-wide  gap-1 md:w-1/2 md:mt-[5vw] flex flex-col items-center justify-center md:justify-start">
                    <div className="box w-full h-full text-center">
                        <h1 className="md:text-[3vw] text-[6vw] font-[font2] md:leading-[3vw]">Selected Projects</h1>
                        <h1 className="md:text-[2vw] font-[font2] md:leading-[2vw]">[2024-2025]</h1>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="px-6 lg:px-16 mt-[20vh] md:mt-[0vh] flex-col md:gap-10">
                    {projects.map((project, idx) => (
                        <div key={idx} className="project-card">
                            <div className="flex items-center pb-0 mt-[4vw] md:mt-[1vw] flex-col-reverse md:flex-row gap-10 justify-center">
                                <div className="w-full flex justify-center items-center">
                                    <ProjectCard
                                        image={project.image}
                                        title={project.title}
                                        description={project.description}
                                        stacks={project.stacks}
                                        url={project.url}
                                        getStackIcon={getStackIcon}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="contact-section min-h-screen flex flex-col items-start justify-center gap-8 px-6">
                <div className="text-start">
                    <h2 className="contact-item text-4xl font-[font2] xl:text-[5vw] xl:leading-[5vw] lg:text-[6vw] lg:leading-[6vw] md:text-[7vw] md:leading-[7vw] font-bold text-start text-gray-400 mb-6">
                        Ready to <span className="text-black">Start</span> Your <span className="text-black">Next Project?</span>
                    </h2>
                    <p className="contact-item max-w-5xl font-[font2] text-[4vw] leading-[4vw] xl:text-[2vw] xl:leading-[1.5vw] lg:text-[2.5vw] lg:leading-[2vw] md:text-[3vw] md:leading-[2.5vw ] text-gray-600 mb-8">
                        Let's collaborate to bring your vision to life with innovative solutions and cutting-edge technology.
                    </p>
                </div>

                <div className="overflow-hidden relative bg-black w-[65%] md:w-[45%] lg:w-[35%] xl:w-[25%] lg:h-[5vw] md:h-[5vw] xl:h-[3vw] h-[10vw] mt-5 flex items-center border  justify-center border-red-600   rounded-full ">
                    <button
                        onClick={() => {
                            navigate("/contact");
                            scrollTo(0, 0);
                        }}
                        ref={boxRef}
                        type="submit"
                        className="  px-3 md:px-2 py-5 md:py-10 lg:text-[2vw] lg:leading-[3vw] md:text-[2vw] xl:leading-[2vw] xl:text-[1.2vw] text-[4vw] w-full flex items-center justify-center gap-2  text-white font-[font2]   transform">
                        <div ref={fillRef} className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-red-600 text-black">
                            <h1 className="text-[2vw] flex items-center gap-2 justify-center mt-1 lg:text-[2vw] lg:leading-[3vw] md:text-[2vw] xl:leading-[2vw] xl:text-[1.2vw] font-[font2] text-black">
                                Let’s Start Project <FaArrowRight />
                            </h1>
                        </div>
                        Wanna Start Project <FaArrowRight />
                    </button>
                </div>

            </div>

            <section className='w-full flex items-start flex-col justify-center min-h-screen'>
                <div className='overflow-hidden px-10'>
                    <div className='overflow-hidden'>
                        <div className='xl:text-[5vw] end text-[7vw] leading-[7vw] lg:text-[8vw] overflow-hidden lg:leading-[8vw] xl:leading-[5vw] font-[font2] '>
                            <h1>The <span className='text-gray-400 font-[font3]'>End</span>...</h1>
                        </div>
                    </div>
                    <div className='overflow-hidden'>
                        <div className='xl:text-[2vw] end text-[5vw] leading-[5vw] lg:text-[4vw] overflow-hidden lg:leading-[4vw] xl:leading-[3vw] font-[font2] '>
                            <h1>Great idea deserve great Collaboration</h1>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Footer />
                </div>
            </section>
        </div>
    );
};

export default Projects;
