import React, { useRef, useMemo } from 'react'
import { Canvas } from "@react-three/fiber";

import { useFrame } from '@react-three/fiber'
import { RoundedBox, Environment, OrbitControls, ContactShadows } from '@react-three/drei'

// DecorativeBoxes component - renders a ring/spiral of rounded boxes that spin.
// Usage: <DecorativeBoxes count={24} radius={4} height={2} spread={1.7} />

export default function DecorativeBoxes({ count = 24, radius = 5, height = 2, spread = 1.4 }) {
    return (
        <div className="w-full h-[60vh] md:h-[80vh]">
            <Canvas
                shadows
                camera={{ position: [0, 0, 12], fov: 40 }}
                style={{ background: 'transparent' }}
            >
                {/* Environment (HDR-like) for better lighting response */}
                <Environment preset="studio" resolution={256} />

                {/* Soft ambient fill */}
                <ambientLight intensity={0.45} />

                {/* Strong key directional light */}
                <directionalLight
                    castShadow
                    position={[6, 8, 10]}
                    intensity={1.6}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-near={0.5}
                    shadow-camera-far={50}
                />

                {/* Warm rim lights and colored accents */}
                <pointLight position={[-6, 2, -5]} intensity={0.6} />
                <pointLight position={[4, -3, 5]} intensity={0.7} />
                <spotLight position={[0, 10, 0]} angle={0.3} penumbra={0.6} intensity={0.6} castShadow />

                {/* Group that holds all boxes and rotates as a whole */}
                <BoxesGroup count={count} radius={radius} height={height} spread={spread} />

                {/* Soft contact shadow under the objects */}
                <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={15} blur={2.4} far={6} />

                {/* Optional controls for dev / preview (disable pan/zoom in production) */}
                <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
            </Canvas>
        </div>
    )
}

function BoxesGroup({ count, radius, height, spread }) {
    const groupRef = useRef()

    // Precompute positions and rotations for boxes arranged in a spiral/ring.
    const boxes = useMemo(() => {
        const arr = []
        for (let i = 0; i < count; i++) {
            const t = i / count
            const angle = t * Math.PI * 2 // around circle
            const y = (t - 0.5) * height * spread // vertical spread along the spiral
            const r = radius + Math.sin(t * Math.PI * 4) * 0.6 // subtle radius modulation
            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r

            // slight individual tilt and phase so they feel organic
            const tilt = Math.sin(i * 0.7) * 0.35
            const spinSpeed = 0.2 + (i % 5) * 0.02

            arr.push({ position: [x, y, z], rotation: [tilt, angle + Math.PI / 2, 0], spinSpeed })
        }
        return arr
    }, [count, radius, height, spread])

    // Rotate the whole group slowly
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15 // global spin
        }
    })

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            {boxes.map((b, i) => (
                <DecorativeBox
                    key={i}
                    index={i}
                    position={b.position}
                    rotation={b.rotation}
                    spinSpeed={b.spinSpeed}
                />
            ))}
        </group>
    )
}

function DecorativeBox({ position = [0, 0, 0], rotation = [0, 0, 0], spinSpeed = 0.25, index = 0 }) {
    const meshRef = useRef()

    // Each box also rotates on its own axis for life
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * spinSpeed
            // subtle rocking
            meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * (0.6 + index * 0.01)) * 0.02
        }
    })

    // Material: use MeshStandardMaterial props by passing them to RoundedBox children
    // Radius -> border-radius like effect. Smoothness controls the bevel segments.
    return (
        <RoundedBox
            args={[0.9, 0.14, 1.6]} // width, depth(height in visual terms), depth
            radius={0.18} // corner radius - "border radius"
            smoothness={6}
            castShadow
            receiveShadow
            position={position}
            rotation={rotation}
            ref={meshRef}
        >
            <meshStandardMaterial metalness={0.7} roughness={0.2} envMapIntensity={1.2} />
        </RoundedBox>
    )
}
