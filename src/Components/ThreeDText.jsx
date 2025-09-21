// ThreeDText.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Environment,
  Float,
  MeshDistortMaterial,
} from "@react-three/drei";

const ThreeDText = () => {
  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight
          position={[-10, 10, -5]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
        />

        {/* Fancy background environment */}
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        {/* Floating 3D Text */}
        <Float speed={3} rotationIntensity={1} floatIntensity={2}>
          <Text3D
            font="/fonts/optimer_bold.typeface.typeface.json"
            size={window.innerWidth < 768 ? 1 : 1.5} // Responsive scaling
            height={0.6}
            curveSegments={20}
            bevelEnabled
            bevelThickness={0.08}
            bevelSize={0.04}
            bevelOffset={0}
            bevelSegments={8}
            castShadow
            receiveShadow
            anchorX="center"
            anchorY="middle"
          >
            N
            <MeshDistortMaterial
              color={"#ff1d8e"}
              roughness={0.3}
              metalness={1}
              distort={0.2}
              speed={2}
            />
          </Text3D>
          
        </Float>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDText;
