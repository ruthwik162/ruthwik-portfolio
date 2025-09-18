import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

export function Model({ containerRef, ...props }) {
  const { nodes, materials } = useGLTF("/model/ruthwik3d.glb");
  const modelRef = useRef();

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
      x: -Math.PI / 3 ,
      duration: 5,
      ease: "power3.out",
    });

  }, [containerRef]);

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
}

useGLTF.preload("/model/ruthwik3d.glb");
