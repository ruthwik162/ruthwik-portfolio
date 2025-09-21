import React from "react";
import { Briefcase } from "lucide-react";

const Experience = () => {
  return (
    <section className="w-full md:px-10 relative h-screen flex items-center bg-white text-black font-poppins">
      <div className="lg:mr-[35%] md:mr-[40%] p-8 border-2 border-gray-300 rounded-2xl  ">

        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Briefcase className="w-8 h-8 text-black" strokeWidth={1} />
          <h3 className="md:text-[3vw] text-[6vw] font-semibold leading-tight">
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
        <p className="lg:text-[1.3vw] text-base text-justify leading-[3vh] mt-6 text-gray-800">
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
    </section>
  );
};

export default Experience;
