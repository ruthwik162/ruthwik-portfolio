import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { RiExternalLinkLine } from "react-icons/ri";

const ProjectCard = ({ image, title, description, stacks, url, getStackIcon }) => {
  return (
    <div className="group relative w-full h-[400px] md:w-[30vw] lg:h-[20vw] rounded-xl  overflow-hidden md:rounded-md shadow-lg cursor-pointer">


      <img className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        src={image} alt={title} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-between p-6">

        <div className="flex flex-wrap gap-3 justify-end">
          {stacks.map((stack, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {getStackIcon(stack.name)}
            </div>
          ))}
        </div>

        {/* Content at bottom */}
        <div className="transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h2 className="uppercase text-3xl md:text-[1.6vw] font-poppins-500 font-poppins text-white mb-3 tracking-tighter">{title} </h2>
          <p className="text-white/90 text-sm md:text-[1vw] md:leading-[1vw] mb-4 font-poppins-200 tracking-tight font-poppins line-clamp-3">{description} </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {stacks.slice(0, 3).map((stack, index) => (
                <span key={index} className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full">
                  {stack.name}
                </span>
              ))}
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto bg-white text-black rounded-xl p-3 transform md:translate-y-[10px] md:opacity-0 md:group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-gray-200 hover:scale-110"
              style={{ transitionDelay: `${stacks.length * 100}ms` }}
            >
              <FaArrowUpRightFromSquare className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;