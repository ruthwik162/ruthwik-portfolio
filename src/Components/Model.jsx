import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Model(props) {
  const { nodes, materials } = useGLTF("/model/ruthwik3d.glb");

  const modelRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(modelRef.current.position, {
      y: -5,
      z:4,
      duration: 5,
      rotate: 180,
      rotateY: 360,
    });
    tl.fromTo(
      modelRef.current.rotation,
      { y: 0 ,},
      { y: Math.PI * 2, duration: 8, ease: "power3.out" },
      "<"
    );
  })

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
