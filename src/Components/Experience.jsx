import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Briefcase } from "lucide-react";

const Experience = () => {
  return (
    <section className="w-full md:px-10 relative min-h-screen">
      {/* 3D Floating Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Floating Distorted Sphere */}
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 64, 64]} scale={1.2} position={[-3, 2, -3]}>
              <MeshDistortMaterial color="#60a5fa" distort={0.4} speed={2} roughness={0.2} />
            </Sphere>
          </Float>

          {/* Floating Rotating Cube */}
          <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
            <mesh position={[3, -1, -4]} scale={1.5}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#f87171" metalness={0.6} roughness={0.3} />
            </mesh>
          </Float>

          {/* Floating Torus Ring */}
          <Float speed={2.5} rotationIntensity={2} floatIntensity={1.2}>
            <mesh position={[0, -2, -5]} scale={1.8}>
              <torusGeometry args={[1, 0.3, 16, 100]} />
              <meshStandardMaterial color="#34d399" metalness={0.7} roughness={0.2} />
            </mesh>
          </Float>

          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Experience Title */}
      <div className="leading-[2vw] font-poppins font-poppins-500 overflow-hidden">
        <div className="lg:mt-[15vh] mt-[16vh]">
          <h1 className="md:text-[8vw] text-[11vw] text-start uppercase md:leading-[7vw] leading-[10vw]">
            Experience
          </h1>
        </div>
      </div>

      {/* Experience Card */}
      <div className="lg:mr-[35%] p-6 mt-6 md:mr-[40%] bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <h3 className="md:text-[3vw] text-[5vw] font-poppins font-semibold text-gray-900">
            Fullstack Developer
          </h3>
        </div>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          3 months
        </span>
        <p className="text-blue-600 mt-2 font-medium">UnifiedMentor Private Limited</p>
        <p className="text-gray-500 text-sm">May 2023 - July 2023</p>

        <p className="lg:text-[1.5vw] text-md text-justify font-poppins font-medium leading-[3.5vh] mt-4">
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
  );
};

export default Experience;
