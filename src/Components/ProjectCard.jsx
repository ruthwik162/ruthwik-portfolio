import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ _id, image, title, description, stacks, url, getStackIcon }) => {
  const navigate = useNavigate();
  const fillRef = useRef();
  const boxRef = useRef();

  useGSAP(() => {
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

  })

  return (
    <div
      onClick={() => { navigate(`/projects/${_id}`); scrollTo(0, 0) }}
      className="group relative w-full h-[400px] md:w-[45vw] md:h-[30vw] lg:w-[50vw] lg:h-[30vw] xl:w-[30vw] xl:h-[20vw] overflow-hidden shadow-lg cursor-pointer"
    >
      {/* Project image */}
      <img
        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        src={image}
        alt={title}
      />

      {/* Overlay */}
      <div ref={boxRef} className="absolute inset-0   duration-700 flex flex-col justify-between ">
        {/* Tech stack icons */}
        <div  className="w-30 h-10 flex items-center justify-center bg-yellow-50">
          <h1 className="text-center font-[Helvetica] flex items-center justify-center">Open <ArrowRight className="-rotate-45" /></h1>
        </div>


        {/* Content at bottom */}
        <div ref={fillRef} className="transform px-6 bg-teal-500 transition-transform duration-500 ease-out">
          <h2 className="text-3xl xl:text-[2.5vw] lg:text-[2vw] md:text-[2vw] mt-[2vw] font-poppins-500 text-white mb-3 tracking-tighter">
            {title}
          </h2>


          <div className="flex items-center p-2 gap-4">
            


            {/* External link */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto bg-white text-black  p-3 flex items-center gap-2 justify-center duration-500 ease-out hover:bg-gray-200 hover:scale-110"
              style={{ transitionDelay: `${stacks.length * 100}ms` }}
              onClick={(e) => e.stopPropagation()} // ✅ prevent opening detail when clicking link
            >
               <span className="xl:text-[1.5vw] md:text-[2vw] text-[4vw] font-[Helvetica]  ">Visit</span><span><FaArrowUpRightFromSquare className="w-5 h-5" /></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
