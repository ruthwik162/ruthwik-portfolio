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

const Projects = () => {
    const containerRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    const navigate = useNavigate();
    const projectRef = useRef(null);
    const mobile = window.innerWidth < 850;

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
            image: assets.mainbanner,
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
            image: assets.otSchedular,
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
            image: assets.hostel,
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
            <div className="contact-section min-h-screen flex flex-col items-center justify-center gap-8 px-6">
                <div className="text-start">
                    <h2 className="contact-item text-4xl font-[font2] md:text-[6vw] md:leading-[9vw] font-bold text-start text-gray-400 mb-6">
                        Ready to <span className="text-black">Start</span> Your <span className="text-black">Next Project?</span>
                    </h2>
                    <p className="contact-item max-w-5xl font-[font2] text-lg md:text-3xl text-gray-600 mb-8">
                        Let's collaborate to bring your vision to life with innovative solutions and cutting-edge technology.
                    </p>
                </div>

                <div className="contact-item flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => { navigate("/contact"); scrollTo(0, 0); }}
                        className="px-8 py-4 bg-black text-white rounded-full font-poppins uppercase flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        Start a Project
                        <FaArrowRight />
                    </button>
                </div>

                <div className="contact-item mt-12 text-center">
                    <p className="text-gray-500 mb-4">Get in touch</p>
                    <div className="flex justify-center gap-6">
                        <a href="mailto:nagaruthwikmerugu162@gmail.com" className="text-black hover:text-blue-800">
                            <FaEnvelope className="text-2xl" />
                        </a>
                        <a href="https://linkedin.com/in/nagaruthwikmerugu/" className="text-black hover:text-blue-800">
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a href="https://github.com/ruthwik162" className="text-black hover:text-blue-800">
                            <FaGithub className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
