'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

CustomEase.create('aw.expo', 'M0,0 C0.16,1 0.3,1 1,1')
CustomEase.create('aw.quint', 'M0,0 C0.22,0 0.78,1 1,1')
CustomEase.create('aw.heavy', 'M0,0 C0.4,0 0.6,1 1,1')
CustomEase.create('aw.ultra', 'M0,0 C0.5,0 0.5,1 1,1')

const easeExpo = gsap.parseEase('aw.expo')
const easeQuint = gsap.parseEase('aw.quint')
const easeHeavy = gsap.parseEase('aw.heavy')
const easeUltra = gsap.parseEase('aw.ultra')

const BASE_Y = -0.55

// Mouse influence — how much the cursor tilts the phone
// X = left/right lean, Y = up/down tilt
// Keep these small — it's a whisper, not a puppet
const MOUSE_ROT_X = 0.12   // vertical tilt range (radians)
const MOUSE_ROT_Y = 0.10   // horizontal lean range (radians)

interface MobileProps {
    rotationProgress: React.MutableRefObject<number>
    screenImageUrl?: string
    screenBrightness?: number
    screenEmissiveColor?: string
    screenRoughness?: number
    screenMetalness?: number
}

export default function Mobile({
    rotationProgress,
    screenImageUrl,
    screenBrightness = 0.5,
    screenEmissiveColor = '#0a0a18',
    screenRoughness = 0.04,
    screenMetalness = 0.05,
}: MobileProps) {
    const groupRef = useRef<THREE.Group>(null!)
    const { nodes, materials } = useGLTF('/iphone17pro.glb') as any

    // Mouse target — GSAP tweens into this, useFrame reads from it
    // Stored as ref so it never triggers re-render
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            // Normalize to -1 → +1 from screen center
            const nx = (e.clientX / window.innerWidth - 0.5) * 2
            const ny = -(e.clientY / window.innerHeight - 0.5) * 2

            // GSAP tweens the raw mouse values with a lazy ease
            // duration 1.4 + power3.out = the phone "notices" the cursor late
            // and glides toward it — never snaps, always trails
            gsap.to(mouse.current, {
                x: nx,
                y: ny,
                duration: 1.4,
                ease: 'power3.out',
                overwrite: true,
            })
        }

        const onLeave = () => {
            // Cursor left window — phone gracefully returns to neutral
            gsap.to(mouse.current, {
                x: 0,
                y: 0,
                duration: 2.2,
                ease: 'power2.out',
                overwrite: true,
            })
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    const screenTexture = useTexture(
        screenImageUrl ??
        'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif'
    )

    useMemo(() => {
        if (!screenTexture.image) return

        screenTexture.flipY = false
        screenTexture.colorSpace = THREE.SRGBColorSpace
        screenTexture.wrapS = THREE.ClampToEdgeWrapping
        screenTexture.wrapT = THREE.ClampToEdgeWrapping
        screenTexture.anisotropy = 16

        const img = screenTexture.image as HTMLImageElement
        const imageAspect = img.width / img.height
        const screenAspect = 0.45

        if (imageAspect > screenAspect) {
            screenTexture.repeat.x = screenAspect / imageAspect
            screenTexture.repeat.y = 1
            screenTexture.offset.x = (1 - screenTexture.repeat.x) * 0.5
            screenTexture.offset.y = 0
        } else {
            screenTexture.repeat.x = 1
            screenTexture.repeat.y = imageAspect / screenAspect
            screenTexture.offset.x = 0
            screenTexture.offset.y = (1 - screenTexture.repeat.y) * 0.5
        }

        screenTexture.needsUpdate = true
    }, [screenTexture])

    const screenMat = useMemo(() => {
        return new THREE.MeshPhysicalMaterial({
            map: screenTexture,
            roughness: screenRoughness,
            metalness: screenMetalness,
            clearcoat: 1,
            clearcoatRoughness: 0.02,
            emissive: new THREE.Color(screenEmissiveColor),
            emissiveIntensity: screenBrightness,
            toneMapped: true,
        })
    }, [screenTexture, screenRoughness, screenMetalness, screenEmissiveColor, screenBrightness])

    const rawProgress = useRef(0)
    const smoothProgress = useRef(0)

    useFrame(({ clock }, delta) => {
        rawProgress.current = THREE.MathUtils.damp(
            rawProgress.current,
            rotationProgress.current,
            8,
            delta
        )

        smoothProgress.current = THREE.MathUtils.damp(
            smoothProgress.current,
            rawProgress.current,
            3.5,
            delta
        )

        if (!groupRef.current) return

        const t = smoothProgress.current
        const e = clock.getElapsedTime()

        // Idle float
        const idleY = Math.sin(e * 0.28) * 0.014
        const idleX = Math.sin(e * 0.17 + 1.5) * 0.007
        const idleZ = Math.sin(e * 0.21 + 2.8) * 0.005

        // Mouse parallax — GSAP already smoothed mouse.current for us
        // so we just read and scale directly, no extra damp needed
        const mouseX = mouse.current.x * MOUSE_ROT_Y  // cursor left/right → Y rotation lean
        const mouseY = mouse.current.y * MOUSE_ROT_X  // cursor up/down   → X rotation tilt

        let rotX = 0, rotY = 0, rotZ = 0, posY = 0, posZ = 0

        if (t < 0.12) {
            // Phase 1: front face at rest
            const r = t / 0.12
            rotY = Math.PI
            rotX = gsap.utils.interpolate(0.06, 0, easeQuint(r))
            posY = 0
        } else if (t < 0.72) {
            // Phase 2: long cinematic spin
            const r = (t - 0.12) / 0.60
            rotY = gsap.utils.interpolate(Math.PI, Math.PI * 2.1, easeHeavy(r))
            rotX = gsap.utils.interpolate(0, 0.18, easeQuint(r))
            rotZ = gsap.utils.interpolate(0, 0.08, easeQuint(r))
            posZ = gsap.utils.interpolate(0, -0.55, easeExpo(r))
        } else {
            // Phase 3: return to front face
            const r = (t - 0.72) / 0.28
            rotY = gsap.utils.interpolate(Math.PI * 2.1, Math.PI * 3, easeExpo(r))
            rotX = gsap.utils.interpolate(0.18, 0, easeQuint(r))
            rotZ = gsap.utils.interpolate(0.08, 0, easeQuint(r))
            posZ = gsap.utils.interpolate(-0.55, 0, easeUltra(r))
        }

        // Mouse is additive on top of scroll animation
        // During spin (phase 2) mouse influence fades to 0 — cursor shouldn't
        // fight the cinematic rotation, only enhance the resting poses
        const mouseFade = t < 0.12
            ? 1                                          // full influence at rest
            : t < 0.72
                ? 1 - ((t - 0.12) / 0.60)               // fades out during spin
                : (t - 0.72) / 0.28                      // fades back in on return

        groupRef.current.rotation.x = rotX + idleX + (mouseY * mouseFade)
        groupRef.current.rotation.y = rotY + idleY + (mouseX * mouseFade)
        groupRef.current.rotation.z = rotZ + idleZ
        groupRef.current.position.y = BASE_Y + posY
        groupRef.current.position.z = posZ
    })

    return (
        <group ref={groupRef} dispose={null} scale={[7, 7, 7]} position={[0, BASE_Y, 0]}>
            <mesh castShadow receiveShadow geometry={nodes.Plane004.geometry} material={materials['17ProMax_color']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_1.geometry} material={materials['17ProMax_Black2']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_2.geometry} material={materials['17ProMax_color3']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_3.geometry} material={materials['17ProMax_glass']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_4.geometry} material={materials['17ProMax_color2']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_5.geometry} material={materials['17ProMax_Logo']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_6.geometry} material={materials['17ProMax_black1']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_7.geometry} material={materials['17ProMax_21']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_8.geometry} material={materials['17ProMax_22']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_9.geometry} material={materials['17ProMax_2222']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_10.geometry} material={materials['17ProMax_G']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_11.geometry} material={materials['17ProMax_1111']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_12.geometry} material={materials['17ProMax_Lens']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_13.geometry} material={screenMat} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_14.geometry} material={materials['17ProMax_Lens2']} />
            <mesh castShadow receiveShadow geometry={nodes.Plane004_15.geometry} material={materials['17ProMax_2112']} />
        </group>
    )
}

useGLTF.preload('/iphone17pro.glb')