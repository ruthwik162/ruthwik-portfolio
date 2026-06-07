'use client'

import React, { useRef, useEffect, Suspense, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, MeshTransmissionMaterial, Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface PhoneModelProps {
    scrollProgress: React.MutableRefObject<number>
    screenImageUrl?: string
}

// ─────────────────────────────────────────────
// Phone 3D Model
// ─────────────────────────────────────────────
function PhoneModel({ scrollProgress, screenImageUrl }: PhoneModelProps) {
    const groupRef = useRef<THREE.Group>(null!)
    const { nodes, materials } = useGLTF('/phone.glb') as any

    // Load screen texture if provided
    const screenTexture = useTexture(screenImageUrl ?? 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif')
    screenTexture.flipY = false

    // Clone screen material and apply texture
    const screenMat = React.useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            map: screenTexture,
            roughness: 0.05,
            metalness: 0.1,
            emissive: new THREE.Color('#1a1a2e'),
            emissiveIntensity: 0.3,
        })
        return mat
    }, [screenTexture])

    useFrame(({ clock }) => {
        if (!groupRef.current) return
        const t = scrollProgress.current

        // Cinematic scroll-driven rotation arc
        // Phase 1 (0–0.4): Float in, Y-rotate from -0.6 to 0
        // Phase 2 (0.4–0.7): Tilt X, show back, dramatic lean
        // Phase 3 (0.7–1.0): Return to hero pose, slight Y oscillation

        const idleOscillation = Math.sin(clock.getElapsedTime() * 0.8) * 0.012

        let rotX = 0
        let rotY = 0
        let rotZ = 0
        let posY = 0
        let posZ = 0

        if (t < 0.4) {
            const p = t / 0.4
            rotY = gsap.utils.interpolate(-1.1, 0, gsap.parseEase('power3.out')(p))
            rotX = gsap.utils.interpolate(0.25, 0, gsap.parseEase('power2.out')(p))
            posY = gsap.utils.interpolate(-0.6, 0, gsap.parseEase('power3.out')(p))
        } else if (t < 0.7) {
            const p = (t - 0.4) / 0.3
            rotY = gsap.utils.interpolate(0, Math.PI * 1.05, gsap.parseEase('power2.inOut')(p))
            rotX = gsap.utils.interpolate(0, 0.18, gsap.parseEase('sine.inOut')(p))
            rotZ = gsap.utils.interpolate(0, 0.08, gsap.parseEase('sine.inOut')(p))
            posZ = gsap.utils.interpolate(0, -0.5, gsap.parseEase('power1.inOut')(p))
        } else {
            const p = (t - 0.7) / 0.3
            rotY = gsap.utils.interpolate(Math.PI * 1.05, Math.PI * 2, gsap.parseEase('power3.out')(p))
            rotX = gsap.utils.interpolate(0.18, 0, gsap.parseEase('power2.out')(p))
            rotZ = gsap.utils.interpolate(0.08, 0, gsap.parseEase('power2.out')(p))
            posZ = gsap.utils.interpolate(-0.5, 0, gsap.parseEase('power2.out')(p))
        }

        groupRef.current.rotation.x = rotX + idleOscillation * 0.4
        groupRef.current.rotation.y = rotY + idleOscillation
        groupRef.current.rotation.z = rotZ
        groupRef.current.position.y = posY
        groupRef.current.position.z = posZ
    })

    return (
        <group ref={groupRef} dispose={null} scale={[7, 7, 7]}>
            <mesh castShadow receiveShadow geometry={nodes.back1.geometry} material={materials['back.003']} />
            <mesh castShadow receiveShadow geometry={nodes.buttons.geometry} material={materials.Buttons} />
            <mesh castShadow receiveShadow geometry={nodes.glass1.geometry} material={materials['glass.001']} />
            <mesh castShadow receiveShadow geometry={nodes.rim.geometry} material={materials.Buttons} />
            <group position={[0, 0, 0.001]}>
                {/* Screen meshes with custom texture */}
                <mesh castShadow receiveShadow geometry={nodes.polySurface4.geometry} material={screenMat} />
                <mesh castShadow receiveShadow geometry={nodes.polySurface5.geometry} material={screenMat} />
            </group>
            <mesh castShadow receiveShadow geometry={nodes.polySurface1.geometry} material={materials['blinn7.001']} />
            <mesh castShadow receiveShadow geometry={nodes.polySurface3.geometry} material={materials['back.002']} />
        </group>
    )
}

useGLTF.preload('/phone.glb')

// ─────────────────────────────────────────────
// Camera Rig — subtle parallax on scroll
// ─────────────────────────────────────────────
function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
    const { camera } = useThree()

    useFrame(() => {
        const t = scrollProgress.current
        camera.position.z = gsap.utils.interpolate(4.5, 3.8, t)
        camera.position.y = gsap.utils.interpolate(0, 0.3, t)
    })

    return null
}

// ─────────────────────────────────────────────
// Grain Overlay SVG noise filter
// ─────────────────────────────────────────────
function GrainOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>
        </div>
    )
}

// ─────────────────────────────────────────────
// Main Hero Component
// ─────────────────────────────────────────────
export default function PhoneHero() {
    const sectionRef = useRef<HTMLDivElement>(null!)
    const canvasWrapRef = useRef<HTMLDivElement>(null!)
    const headlineRef = useRef<HTMLDivElement>(null!)
    const subRef = useRef<HTMLParagraphElement>(null!)
    const ctaRef = useRef<HTMLDivElement>(null!)
    const label1Ref = useRef<HTMLSpanElement>(null!)
    const label2Ref = useRef<HTMLSpanElement>(null!)
    const scrollProgress = useRef(0)

    // Replace with your actual screen image path
    const SCREEN_IMAGE = 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif'

    // ── Intro animation
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 })

        tl.fromTo(
            headlineRef.current?.querySelectorAll('.char') ?? [],
            { y: '110%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1.1, stagger: 0.04, ease: 'power4.out' }
        )
            .fromTo(
                subRef.current,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
                '-=0.6'
            )
            .fromTo(
                ctaRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                '-=0.5'
            )
            .fromTo(
                [label1Ref.current, label2Ref.current],
                { opacity: 0, x: -12 },
                { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
                '-=0.5'
            )
    }, [])

    // ── GSAP ScrollTrigger → scrollProgress
    useEffect(() => {
        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            onUpdate: (self) => {
                scrollProgress.current = self.progress
            },
        })

        return () => trigger.kill()
    }, [])

    // ── Parallax text layers on scroll
    useEffect(() => {
        gsap.to(headlineRef.current, {
            y: '-18%',
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            },
        })
    }, [])

    return (
        <>
            <GrainOverlay />

            {/* ── Scroll container — tall for scrub space */}
            <div ref={sectionRef} className="relative" style={{ height: '320vh' }}>

                {/* ── Sticky viewport */}
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">

                    {/* Ambient gradient blobs */}
                    <div className="pointer-events-none absolute inset-0 z-0">
                        <div
                            className="absolute left-[-10%] top-[-5%] h-[60vh] w-[60vw] rounded-full opacity-20 blur-[120px]"
                            style={{ background: 'radial-gradient(circle, #5c2dff 0%, transparent 70%)' }}
                        />
                        <div
                            className="absolute bottom-[-10%] right-[-5%] h-[50vh] w-[55vw] rounded-full opacity-15 blur-[140px]"
                            style={{ background: 'radial-gradient(circle, #ff2d78 0%, transparent 70%)' }}
                        />
                    </div>

                    {/* Horizontal rule top */}
                    <div className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16">
                        <span
                            ref={label1Ref}
                            className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30"
                        >
                            — Experience
                        </span>
                        <span
                            ref={label2Ref}
                            className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30"
                        >
                            001 / Scroll to explore
                        </span>
                    </div>

                    {/* ── Three.js Canvas */}
                    <div ref={canvasWrapRef} className="absolute inset-0 z-10">
                        <Canvas
                            shadows
                            camera={{ position: [0, 0, 4.5], fov: 38 }}
                            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
                            style={{ background: 'transparent' }}
                        >
                            <ambientLight intensity={0.15} />
                            <directionalLight
                                position={[4, 6, 3]}
                                intensity={2.5}
                                castShadow
                                shadow-mapSize={[2048, 2048]}
                                color="#ffffff"
                            />
                            <pointLight position={[-4, -2, 2]} intensity={1.2} color="#5c2dff" />
                            <pointLight position={[3, -4, 1]} intensity={0.9} color="#ff2d78" />
                            <spotLight
                                position={[0, 8, 2]}
                                angle={0.3}
                                penumbra={0.9}
                                intensity={1.5}
                                color="#e0d4ff"
                                castShadow
                            />

                            <Environment preset="city" />

                            <CameraRig scrollProgress={scrollProgress} />

                            <Suspense fallback={null}>
                                <PhoneModel scrollProgress={scrollProgress} screenImageUrl={SCREEN_IMAGE} />
                            </Suspense>
                        </Canvas>
                    </div>

                    {/* ── Headline — bottom-left anchored */}
                    <div
                        ref={headlineRef}
                        className="pointer-events-none absolute bottom-[12vh] left-8 z-20 md:left-16"
                        aria-hidden="false"
                    >
                        <div className="overflow-hidden">
                            <div className="flex flex-wrap gap-x-4">
                                {['Designed', 'for the'].map((word, wi) => (
                                    <span
                                        key={wi}
                                        className="char inline-block font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7rem)] font-black leading-none tracking-[-0.03em] text-white"
                                        style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <span
                                className="char inline-block text-[clamp(3rem,8vw,7rem)] font-black leading-none tracking-[-0.03em]"
                                style={{
                                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                                    background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #fb923c 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                Extraordinary.
                            </span>
                        </div>
                    </div>

                    {/* ── Sub copy — bottom-right */}
                    <div className="absolute bottom-[12vh] right-8 z-20 max-w-[280px] text-right md:right-16 md:max-w-[320px]">
                        <p
                            ref={subRef}
                            className="font-light leading-relaxed text-white/50"
                            style={{
                                fontFamily: "'Archivo', 'Helvetica Neue', sans-serif",
                                fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                                letterSpacing: '0.01em',
                            }}
                        >
                            Precision-crafted aluminium, cinematic optics,
                            and a display that redefines what mobile means.
                        </p>

                        {/* CTA */}
                        <div ref={ctaRef} className="mt-6 inline-flex items-center gap-3">
                            <button
                                className="group relative overflow-hidden rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-500"
                                style={{
                                    background: 'linear-gradient(135deg, #5c2dff, #ff2d78)',
                                    fontFamily: "'Archivo', sans-serif",
                                    boxShadow: '0 0 32px rgba(92,45,255,0.4)',
                                }}
                            >
                                <span className="relative z-10">Explore Now</span>
                                <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
                            </button>

                            <button
                                className="text-xs font-medium uppercase tracking-widest text-white/40 transition-colors duration-300 hover:text-white/80"
                                style={{ fontFamily: "'Archivo', sans-serif" }}
                            >
                                Learn more →
                            </button>
                        </div>
                    </div>

                    {/* ── Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                        <div
                            className="h-10 w-[1px] animate-pulse"
                            style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
                        />
                        <span
                            className="font-mono text-[9px] uppercase tracking-[0.3em] text-white"
                            style={{ fontFamily: 'monospace' }}
                        >
                            Scroll
                        </span>
                    </div>

                    {/* ── Vertical edge labels */}
                    <div className="pointer-events-none absolute left-5 top-1/2 z-20 -translate-y-1/2 -rotate-90">
                        <span
                            className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/20"
                        >
                            Next-Gen Mobile · 2025
                        </span>
                    </div>

                    {/* ── Bottom gradient vignette */}
                    <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[30vh]"
                        style={{ background: 'linear-gradient(to top, #050505 0%, transparent 100%)' }}
                    />
                </div>
            </div>
        </>
    )
}