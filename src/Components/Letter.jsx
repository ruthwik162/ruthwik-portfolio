import { Text3D } from "@react-three/drei";

const ThreeDLetter = () => {
  return (
    <Text3D
      font="/fonts/Lausanne-500.woff2" // put font inside /public/fonts
      size={2}       // overall size
      height={0.5}   // extrusion (depth)
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.1}
      bevelSize={0.05}
      bevelSegments={5}
    >
      N
      <meshStandardMaterial color="cyan" metalness={0.6} roughness={0.2} />
    </Text3D>
  );
};

export default ThreeDLetter;