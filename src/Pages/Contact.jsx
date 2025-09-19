import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Decorative 3D shapes
const FloatingSphere = ({ position, color }) => (
  <Float speed={3} rotationIntensity={1} floatIntensity={2}>
    <mesh position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.3} />
    </mesh>
  </Float>
);

const FloatingRing = ({ position, color }) => (
  <Float speed={2} rotationIntensity={2} floatIntensity={1}>
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.7, 0.15, 16, 100]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
    </mesh>
  </Float>
);

const Contact = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".contact-title", {
      y: 80,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    gsap.from(".contact-form", {
      y: 100,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen flex flex-col items-center justify-center relative font-poppins"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <pointLight position={[-5, -3, -5]} intensity={1.2} color="#ffadad" />

          {/* Floating shapes */}
          <FloatingSphere position={[-2, 1, -1]} color="#ffb703" />
          <FloatingSphere position={[2, -1, -2]} color="#8ecae6" />
          <FloatingRing position={[0, 2, -3]} color="#fb8500" />

          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="sunset" />
        </Canvas>
      </div>

      {/* Content */}
      <h1 className="contact-title text-4xl md:text-6xl font-bold text-black mb-8">
        Get in Touch
      </h1>

      {/* Contact Form */}
      <form className="contact-form bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-[90%] md:w-[40%] flex flex-col gap-5">
        <input
          type="text"
          placeholder="Your Name"
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black font-poppins font-light"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black font-poppins font-normal"
        />
        <input
          type="text"
          placeholder="Subject"
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black font-poppins font-medium"
        />
        <textarea
          placeholder="Message"
          rows="4"
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black font-poppins font-light"
        ></textarea>
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all font-poppins font-semibold"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
