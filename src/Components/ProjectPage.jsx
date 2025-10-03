import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { projects } from '../assets/assets'  // ✅ import directly
import { FaArrowRightToBracket, FaArrowUpRightFromSquare } from 'react-icons/fa6'
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
import { ArrowLeft } from 'lucide-react';


const ProjectPage = () => {
    const { _id } = useParams()
    const project = projects.find(p => p._id === _id)
    const navigate = useNavigate();

    if (!project) return <p>Project not found</p>
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

    return (

        <div className='w-full min-h-screen   '>

            <div className='w-full h-full  flex items-start md:flex-row flex-col-reverse pb-10 justify-center md:justify-between  px-[3vw] xl:px-[2vw]  '>

                <div className='overflow-hidden max-w-3xl mt-[20vw] xl:mt-[10vw]'>
                    <div onClick={()=>{navigate(-1)}} className='w-50 h-10 cursor-pointer gap-3 flex items-center font-[Helvetica]  justify-center'>
                       <span><ArrowLeft/></span> <span>Back to Projects</span>
                    </div>
                    
                    <div className='overflow-hidden xl:max-w-3xl mt-[3vw] font-[Helvetica] '>
                        <div className='xl:text-[5vw] md:text-[5vw] md:leading-[5vw] text-[8vw] leading-[8vw] xl:leading-[5vw]'>
                            <h1>{project.title}</h1>
                        </div>
                    </div>
                    <div className='overflow-hidden max-w-xl mt-[2vw] font-[Helvetica]'>
                        <div className='xl:text-[1.2vw] md:text-[2vw] md:leading-[1.8vw] text-[4vw] leading-[4vw] md:text-justify xl:leading-[1vw]'>
                            <p>{project.description}</p>
                        </div>
                    </div>
                    <div className='overflow-hidden xl:max-w-3xl mt-[2vw] font-[Helvetica] '>
                        <div className='xl:text-[1.2vw] text-black/60 text-[4vw] md:text-[2.2vw] leading-[4vw] xl:leading-[1vw]'>
                            <h1>Role:</h1>
                        </div>
                        <div className='xl:text-[1.5vw] text-[4vw] md:text-[2.5vw] md:leading-[2.2vw] leading-[4vw] xl:leading-[1.5vw]'>
                            <h1>{project.role}</h1>
                        </div>
                    </div>
                    <div className='overflow-hidden max-w-xl mt-[5vw] font-[Helvetica]'>
                        <div className='xl:text-[1.2vw] md:text-[3vw] md:leading-[3vw] text-[5vw] text-justify xl:leading-[1.5vw]'>
                            <p>Stacks used:</p>
                        </div>
                        <div className="flex flex-wrap gap-4  mb-6">
                            {project.stacks.map((stack, index) => (
                                <div
                                    key={index}
                                    className="bg-black/20 backdrop-blur-sm rounded-full gap-1 xl:gap-3 h-[1vw] text-[2.2vw] xl:h-[2vw] md:h-[4vw] md:text-[1.5vw] xl:text-[0.7vw] p-3 flex items-center justify-center"
                                >
                                    {getStackIcon && getStackIcon(stack.name)}{stack.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='overflow-hidden max-w-xl mt-[5vw] font-[Helvetica]'>
                        <div className='xl:text-[2vw] text-[7vw] md:text-[4vw] py-2 text-justify xl:leading-[1.5vw]'>
                            <p>Description:</p>
                        </div>
                        <div className='xl:text-[1.2vw] text-[3vw] leading-[3vw] md:text-[2vw] md:leading-[2vw] text-justify xl:leading-[1vw]'>
                            <p>{project.maindesc}</p>
                        </div>
                    </div>

                    <div className='overflow-hidden max-w-xl mt-[5vw] font-[Helvetica]'>

                    </div>
                    <div className='overflow-hidden my-[2vw] w-[30%] md:w-[20%] xl:w-[18%]  '>
                        <div className='xl:text-[2vw] xl:leading-[2vw] w-full bg-black/50 py-2 px-3 rounded-sm  '>
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className='flex items-center md:text-[2vw] justify-start gap-5 font-[font2] '>Visit <FaArrowUpRightFromSquare className='inline-block ' /></a>
                        </div>
                    </div>
                </div>
                <div className='overflow-hidden h-full mt-[10vw] '>
                    <div className=' '>
                        <img src={project.image} alt="project-image" />
                    </div>
                </div>
            </div>




        </div>
    )
}

export default ProjectPage
