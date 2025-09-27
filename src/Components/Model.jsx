import React, { useRef, useEffect, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { useFrame } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

export const Model = forwardRef(({ containerRef, ...props }, ref) => {
  const { nodes, materials } = useGLTF("/model/ruthwik3d.glb");
  const modelRef = ref || useRef(); // use forwarded ref or fallback
  const target = useRef({ x: 0, y: 0 }); // cursor target
  const mobile = useMediaQuery({ maxWidth: 853 });

  useGSAP(() => {
    // Initial animation
    gsap.from(modelRef.current.position, {
      y: -5,
      z: 4,
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(modelRef.current.rotation, {
      x: -Math.PI / 3,
      duration: 5,
      ease: "power3.out",
    });
  }, [containerRef]);

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1; // -1 → 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      gsap.to(target.current, {
        x,
        y,
        duration: 4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Apply rotation on each frame
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = target.current.x * 0.3;
      modelRef.current.rotation.x = target.current.y * 0.2;
    }
  });

  return (
    <group {...props} ref={modelRef} dispose={null}>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={0.7}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Logo_Awwwards_1.geometry}
            material={materials.Material__43}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Logo_Awwwards_2.geometry}
            material={materials.Material__44}
          />
        </group>
      </group>
    </group>
  );
});

useGLTF.preload("/model/ruthwik3d.glb");
