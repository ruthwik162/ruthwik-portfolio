import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Glassbox(props) {
  const { nodes } = useGLTF('/model/Glass_Box_Split-draco.glb')

  // Reusable Glass Material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1,       // enables real transparency
    opacity: 1,            // fully visible (transmission handles transparency)
    roughness: 0.05,       // smooth surface
    metalness: 0,          
    thickness: 0.6,        // glass thickness effect
    clearcoat: 1,          
    clearcoatRoughness: 0.05,
    ior: 1.5,              // index of refraction (glass ~1.5)
    reflectivity: 0.9,     
    color: new THREE.Color("skyblue"), // subtle tint
    envMapIntensity: 1.2,  // picks up light reflections
  })

  return (
    <group {...props} scale={0.005} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_0.geometry}
        material={glassMaterial}
        position={[0, 0, -200]}
        rotation={[0, 1.571, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_1.geometry}
        material={glassMaterial}
        position={[156.366, 0, -124.698]}
        rotation={[0, 0.673, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_2.geometry}
        material={glassMaterial}
        position={[194.986, 0, 44.504]}
        rotation={[0, -0.224, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_3.geometry}
        material={glassMaterial}
        position={[86.777, 0, 180.194]}
        rotation={[0, -1.122, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_4.geometry}
        material={glassMaterial}
        position={[-86.777, 0, 180.194]}
        rotation={[Math.PI, -1.122, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_5.geometry}
        material={glassMaterial}
        position={[-194.986, 0, 44.504]}
        rotation={[Math.PI, -0.224, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_6.geometry}
        material={glassMaterial}
        position={[-156.366, 0, -124.698]}
        rotation={[-Math.PI, 0.673, -Math.PI]}
      />
    </group>
  )
}

useGLTF.preload('/model/Glass_Box_Split-draco.glb')
