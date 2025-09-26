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
    FaMobile,
    FaRocket,
    FaShieldAlt,
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
    SiSvelte,      // ✅ fixed
    SiGraphql,
    SiTensorflow,  // ✅ fixed
    SiGoogleanalytics
} from "react-icons/si";
import { MdBarChart } from "react-icons/md";
import ProjectCard from "../Components/ProjectCard";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const Projects = () => {
    const containerRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    const navigate = useNavigate();

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
            "Svelte": SiSvelte,         // ✅ fixed
            "GraphQL": SiGraphql,
            "AWS": FaAws,
            "TensorFlow": SiTensorflow  // ✅ fixed
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

        // Animate each project card with scrub and rotation
        gsap.utils.toArray(".project-card").forEach((card, i) => {
            gsap.fromTo(card,
                {
                    opacity: 1,
                    y: -200,
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 50%",
                        scrub: 1.5,
                    }
                }
            );
        });

        // Animate contact section
        gsap.from(".contact-item", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".contact-section",
                start: "top 85%",
                end: "top 50%",
                scrub: 1,
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-white md:mt-[10vh] mt-[30vh]">
            {/* Title with pin container */}
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

            <div>
                {/* Projects Grid */}
                <div className="px-6 lg:px-16 mt-[20vh] md:mt-[10vh] flex-col md:grid md:grid-cols-1 md:gap-10">
                    {projects.map((project, idx) => (
                        <div className="border-t-2 border-gray-400 ">
                            <div className="flex items-start pb-0 mt-[4vw] md:mt-[1vw] flex-col-reverse  md:flex-row gap-10 justify-center">
                                <div className="md:leading-[1.9vw] flex gap-5 leading-[1vw] pb-10 md:pb-0 md:mt-0 tracking-tighter text-[4vw] md:text-[2.1vw] font-[font2] ">
                                    <span className="md:text-[1.5vw] ">[{idx + 1}]</span><h1> {project.title}</h1>
                                </div>
                                <div className="md:leading-[1.5vw] md:block hidden  md:text-[1.5vw] tracking-tight text-[2.5vw] font-[font2]">
                                    <h1>{project.description}</h1>
                                    <div className="flex gap-2 md:mt-[3vh] flex-wrap">
                                        {project.stacks.slice(0, 4).map((stack, index) => (
                                            <span key={index} className="text-xs text-white flex items-center justify-center bg-black px-3 py-2 gap-1 border rounded-full">
                                                {getStackIcon(stack.name)}{stack.name}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=" text-black rounded-xl p-3 md:text-[1.8vw]  transform flex items-center gap-3 justify-start transition-all duration-500 ease-out "
                                        style={{ transitionDelay: `${project.stacks.length * 100}ms` }}
                                    >
                                        <FaArrowUpRightFromSquare className="w-5 h-5" /> Link
                                    </a>
                                </div>
                                <div className="w-full md:w-[50%] flex justify-center items-center">
                                    <div className="">
                                        <div key={idx} className="project-card tracking-tighter">
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="contact-section min-h-screen flex flex-col items-center justify-center gap-8 px-6">
                <div className="text-start  ">
                    <h2 className="contact-item text-4xl text-start font-[font2] md:text-[9vw] md:leading-[9vw] font-bold text-black mb-6">
                        Ready to Start Your Next Project?
                    </h2>
                    <p className="contact-item max-w-5xl text-start font-[font2] text-lg md:text-3xl text-gray-600 mb-8">
                        Let's collaborate to bring your vision to life with innovative solutions and cutting-edge technology.
                    </p>
                </div>

                <div className="contact-item flex flex-col sm:flex-row gap-4">
                    <button onClick={() => { navigate("/contact"); scrollTo(0, 0) }} className="px-8 py-4 bg-black text-white rounded-full font-poppins font-poppins-300 uppercase flex items-center gap-2 hover:bg-gray-800 transition-colors">
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