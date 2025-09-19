import React from "react";
import { RoundedBox } from "@react-three/drei";

const RoundedSquare = ({
  width = 20,
  height = 10,
  depth = 0.02,
  radius = 0.15,
  color = "#ffb703",
  metalness = 0.6,
  roughness = 0.3,
  opacity = 1,
  transparent = false,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  children,
}) => {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      {/* width, height, depth, radius, smoothness */}
      <RoundedBox args={[width, height, depth]} radius={radius} smoothness={4}>
        <meshStandardMaterial
          attach="material"
          color={color}
          metalness={metalness}
          roughness={roughness}
          opacity={opacity}
          transparent={transparent}
        />
      </RoundedBox>

      {/* ✅ Allow inserting child 3D objects or images */}
      {children}
    </mesh>
  );
};

export default RoundedSquare;
