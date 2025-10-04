import React, { useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

// Create a custom shader material
const LiquidEraseMaterial = shaderMaterial(
  // Uniforms
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0, 0),
    u_resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  // Fragment Shader
  `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Convert mouse coordinates to 0-1
      vec2 mouse = u_mouse / u_resolution;

      // Distance from mouse
      float dist = distance(uv, mouse);

      // Liquid erase effect
      float alpha = smoothstep(0.15, 0.3, dist);
      vec3 color = mix(vec3(0.0,0.5,1.0), vec3(1.0), alpha);

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ LiquidEraseMaterial });

const LiquidPlane = () => {
  const materialRef = useRef();
  const [mouse, setMouse] = useState([0, 0]);

  // Track mouse position
  const handleMouseMove = (e) => {
    setMouse([e.clientX, window.innerHeight - e.clientY]);
  };

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.u_time = clock.getElapsedTime();
      materialRef.current.u_mouse = new THREE.Vector2(mouse[0], mouse[1]);
      materialRef.current.u_resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh onPointerMove={handleMouseMove}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <liquidEraseMaterial ref={materialRef} />
    </mesh>
  );
};

const LiquidErase = () => {
  return (
    <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 5] }}>
      <LiquidPlane />
    </Canvas>
  );
};

export default LiquidErase;
