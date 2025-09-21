
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model2(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/model/spaceNeedleWithAnim.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Seattle_Space_Needle_-_Full">
          <mesh
            name="Seattle_Space_Needle_-_Full_1"
            castShadow
            receiveShadow
            geometry={nodes['Seattle_Space_Needle_-_Full_1'].geometry}
            material={materials.Main}
          />
          <mesh
            name="Seattle_Space_Needle_-_Full_2"
            castShadow
            receiveShadow
            geometry={nodes['Seattle_Space_Needle_-_Full_2'].geometry}
            material={materials['Glass dark']}
          />
          <mesh
            name="Seattle_Space_Needle_-_Full_3"
            castShadow
            receiveShadow
            geometry={nodes['Seattle_Space_Needle_-_Full_3'].geometry}
            material={materials.Grey}
          />
          <mesh
            name="Seattle_Space_Needle_-_Full_4"
            castShadow
            receiveShadow
            geometry={nodes['Seattle_Space_Needle_-_Full_4'].geometry}
            material={materials['Gold.001']}
          />
          <group name="lift" position={[-0.057, 0.795, 0.035]} rotation={[0, 0.557, 0]}>
            <mesh
              name="Cube001"
              castShadow
              receiveShadow
              geometry={nodes.Cube001.geometry}
              material={materials['Gold.002']}
            />
            <mesh
              name="Cube001_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube001_1.geometry}
              material={materials['Glass dark']}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/spaceNeedleWithAnim.glb')
