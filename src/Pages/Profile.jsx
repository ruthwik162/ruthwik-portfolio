import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";
import Image from "../Components/Image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { Book, Code2, Heart, LightbulbIcon, MouseIcon, Projector, RocketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Text from "../Text Animation/Text";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Briefcase } from "lucide-react";
import GsapMarquee from "../Components/GsapMarquee";
import { FaDiamond, FaShapes } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { GiSpain } from "react-icons/gi";
import { RiSearch2Fill } from "@remixicon/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const bottom = [
    { name: "", icon: "" },
    { name: "Scroll Down", icon: <MouseIcon /> },
    { name: "", icon: "" },
];

const Aboutme = () => {
    const imageDivRef = useRef(null);
    const mobile = useMediaQuery({ maxWidth: 853 });
    const naviaget = useNavigate();

    useGSAP(() => {


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

        // ✅ Animate "About me" heading
        const splitHeading = new SplitText(".heading-text", { types: "chars" });
        gsap.from(splitHeading.chars, {
            y: -180,
            duration: 1,
            stagger: 0.05,
            ease: "power3.inOut",
        });

        // ✅ Animate ALL paragraphs (split into lines)
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

        gsap.from(".expo", {
            x: mobile ? -100 : -700,
            duration: 2,
            scrollTrigger: {
                trigger: ".expo",
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            }
        })
    });

    return (
        <div className="w-full min-h-screen bg-white/90 relative overflow-x-hidden">
            <section className="w-full min-h-screen relative">
                {/* Pinned Image */}
                <div
                    ref={imageDivRef}
                    className="absolute overflow-hidden lg:h-[40vw] xl:h-[40vw] md:z-5 z-0 md:h-[60vw] h-[85vw] w-[65vw] lg:rounded-3xl rounded-xl xl:w-[25vw] lg:w-[40vw]  md:top-[25vh] lg:top-[10vh] xl:left-[10vw] lg:-left-[2vw] top-[5vh] md:-left-[15vw] left-[3vw]"
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
                <div className="overflow-hidden ml-[12%] md:ml-[40%] z-50 md:px-5 flex flex-col">
                    <p className="about-para md:text-[2vw] text-[5vw] text-justify font-poppins font-poppins-500 text-black/70 mt-[0vh] md:mt-[0vh] leading-[2vh] md:leading-[4vh]  md:px-0">
                        I'm Ruthwik <Heart className="inline" /> , a passionate web developer dedicated to
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
                        <h1 className="md:text-[4vw] border-b-2 flex items-center justify-end border-gray-200  text-[7vw] text-black textMd text-end md:text-end uppercase md:leading-[7vw] leading-[9vw]">
                            <Book className="md:w-10 md:h-10" /> 10th + 2
                        </h1>
                    </div>
                </div>

                <div className="lg:mr-[55%] p-3 text-justify tracking-tighter  mt-4 md:mr-[40%] overflow-hidden">
                    <Text
                        className="lg:text-[2vw] text-md  font-poppins font-poppins-600 md:leading-[4.5vh]"
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

                <div className="lg:ml-[50%] tracking-tighter p-3 mt-4 md:ml-[40%] overflow-hidden">
                    <Text
                        className="lg:text-[2vw] text-md text-justify font-poppins font-poppins-600 md:leading-[4.5vh]"
                        text={`Currently, I'm in my 4-1 semester at Malla Reddy University, pursuing my B.Tech in Computer Science and Engineering. Throughout my undergraduate studies, I have been actively involved in hands-on projects and technical learning, which have enhanced my understanding of both theoretical concepts and real-world applications. I am constantly seeking opportunities to improve my skills, explore new technologies, and contribute meaningfully to projects in the field of computer science.`}
                    />
                </div>
            </section>

            <div className="z-0 mt-[10vh]  ">
                <GsapMarquee speed={40} direction="left">
                    <span className="flex items-center justify-center gap-2">
                        <Code2 className="md:w-15 md:h-15 h-5 w-5 " />Full Stack Web Developer
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <LightbulbIcon className="md:w-15 md:h-15 h-5 w-5" />Think
                    </span>
                    <span className="flex justify-center items-center gap-2">
                        <RiSearch2Fill className="md:w-15 md:h-15 h-5 w-5" /> Impact
                    </span>
                </GsapMarquee>
            </div>

            {/* Experience Section */}
            <section className="w-full  z-10 relative min-h-screen">
                {/* 3D Floating Background */}
                <div className="absolute inset-0 -z-10">
                    <Canvas camera={{ position: [0, 0, 8] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} />
                        {/* Floating Sphere */}
                        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                            <Sphere args={[1, 64, 64]} scale={1.2} position={[-3, 2, -3]}>
                                <MeshDistortMaterial color="#60a5fa" distort={0.3} speed={2} />
                            </Sphere>
                        </Float>
                        {/* Floating Cube */}

                        <OrbitControls enableZoom={false} />
                    </Canvas>

                </div>

                {/* Experience Title */}
                <div className="leading-[2vw] font-poppins font-poppins-500 overflow-hidden">
                    <div className="lg:mt-[15vh] mt-[16vh]">
                        <h1 className="md:text-[8vw] text-[11vw] text text-start md:text-start uppercase md:leading-[7vw] leading-[10vw]">
                            Experience
                        </h1>
                    </div>
                </div>



                {/* Experience Card */}
                <div className="expo lg:mr-[35%] mx-5 md:mx-10 p-6 mt-6 md:mr-[40%] bg-white/10 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-200 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-8 h-8 text-blue-600" />
                        <h3 className="md:text-[3vw] text-[5vw] font-poppins font-semibold text-gray-900">
                            Fullstack Developer
                        </h3>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        3 months
                    </span>
                    <p className="text-blue-600 mt-2 font-medium">
                        UnifiedMentor Private Limited
                    </p>
                    <p className="text-gray-500 text-sm">May 2023 - July 2023</p>

                    <p className="lg:text-[1.5vw] text-md text-justify font-[font2] leading-[3.5vh] mt-4">
                        During my internship at UnifiedMentor, I worked on developing and maintaining fullstack
                        applications using modern technologies like React, Node.js, and MongoDB. I collaborated
                        with the development team to implement new features, fix bugs, and optimize application
                        performance.
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {["React", "Node.js", "MongoDB", "Express", "REST APIs"].map((tech, i) => (
                            <span
                                key={i}
                                className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-lg shadow-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="w-full md:px-10 flex flex-col items-center justify-center h-screen">
                <div className="leading-[2vw] font-poppins font-poppins-500 overflow-hidden text-center">
                    <h1 className="md:text-[8vw] text-[11vw] uppercase md:leading-[7vw] leading-[10vw] text-black">
                        Explore My Projects
                    </h1>
                    <p className="mt-4 md:text-[1.6vw] leading-[2vh] text-[3.5vw] text-gray-600 max-w-2xl">
                        Take a look at the projects I've built — each crafted with attention to detail and a
                        focus on user experience.
                    </p>
                </div>

                <div className="mt-8">
                    <button onClick={() => {
                        naviaget("/projects");
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
