"use client"

import { Download } from 'lucide-react'
import React, { useRef, useLayoutEffect, Suspense } from 'react'
import Text from './Text'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import Mobile from './Mobile'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────
// Lights — editorial warm/cool split
// ─────────────────────────────────────────────
function SceneLights() {
    return (
        <>
            <ambientLight intensity={0.12} />
            {/* Key — warm top */}
            <directionalLight
                position={[2, 8, 4]}
                intensity={3.5}
                color="#fff5e4"
                castShadow
                shadow-mapSize={[2048, 2048]}
            />
            {/* Fill — cool left */}
            <pointLight position={[-5, 1, 3]} intensity={1.4} color="#c4d4ff" />
            {/* Rim — hot right edge */}
            <pointLight position={[5, -2, -1]} intensity={2.0} color="#ffffff" />
            {/* Ground bounce */}
            <pointLight position={[0, -5, 2]} intensity={0.6} color="#ffe8d0" />
        </>
    )
}

// ─────────────────────────────────────────────
// Hero Component
// ─────────────────────────────────────────────
const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const pinnedRef = useRef<HTMLDivElement>(null)
    const heroSectionRef = useRef<HTMLElement>(null)
    const introRef = useRef<HTMLElement>(null)
    const lastSectionRef = useRef<HTMLElement>(null)
    const whoRef = useRef<HTMLDivElement>(null)
    const philosophyRef = useRef<HTMLDivElement>(null)
    const philosophy = useRef<HTMLDivElement>(null)

    // Canvas overlay fade ref
    const canvasOverlayRef = useRef<HTMLDivElement>(null)

    // Phone rotation driven by scroll — shared ref into Three.js
    const rotationProgress = useRef(0)

    // Last section content refs
    const lastSectionContentRef = useRef<HTMLDivElement>(null)
    const philosophyTitleRef = useRef<HTMLDivElement>(null)
    const philosophyCardRef = useRef<HTMLDivElement>(null)
    const philosophyTextLeftRef = useRef<HTMLDivElement>(null)
    const philosophyTextRightRef = useRef<HTMLDivElement>(null)
    const closingStatementRef = useRef<HTMLDivElement>(null)

    // Replace with your screen image path
    const SCREEN_IMAGE = 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif'

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // ───────────────────────────────────────────
            // 1. PIN the 3D canvas wrapper for full scroll
            // ───────────────────────────────────────────
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                endTrigger: lastSectionRef.current,
                end: 'bottom bottom',
                pin: pinnedRef.current,
                pinSpacing: false,
                invalidateOnRefresh: true,
            })

            // ───────────────────────────────────────────
            // 2. Drive phone rotation progress 0 → 1
            //    over the hero + intro sections
            // ───────────────────────────────────────────
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                endTrigger: introRef.current,
                end: 'bottom bottom',
                scrub: 1.4,
                onUpdate: (self) => {
                    rotationProgress.current = self.progress
                },
            })

            // ───────────────────────────────────────────
            // 3. Fade + blur the canvas as last section enters
            // ───────────────────────────────────────────
            if (canvasOverlayRef.current) {
                gsap.fromTo(
                    canvasOverlayRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: lastSectionRef.current,
                            start: 'top 60%',
                            end: 'top 0%',
                            scrub: 1,
                        },
                    }
                )
            }

            // ───────────────────────────────────────────
            // 4. Pin label columns (desktop only)
            // ───────────────────────────────────────────
            ScrollTrigger.matchMedia({
                '(min-width: 1024px)': function () {
                    ScrollTrigger.create({
                        trigger: introRef.current,
                        endTrigger: introRef.current,
                        start: 'top 80%',
                        end: 'bottom bottom',
                        pin: whoRef.current,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    })

                    ScrollTrigger.create({
                        trigger: introRef.current,
                        endTrigger: introRef.current,
                        start: 'top 30%',
                        end: 'bottom bottom',
                        pin: philosophy.current,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    })

                    ScrollTrigger.create({
                        trigger: lastSectionRef.current,
                        endTrigger: lastSectionRef.current,
                        start: 'top 20%',
                        end: 'bottom 80%',
                        pin: philosophyRef.current,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    })
                },
            })

            // ───────────────────────────────────────────
            // 5. Last section scroll animations
            // ───────────────────────────────────────────
            if (philosophyTitleRef.current) {
                gsap.from(philosophyTitleRef.current, {
                    opacity: 0,
                    y: 60,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: philosophyTitleRef.current,
                        start: 'top 85%',
                        end: 'top 60%',
                        scrub: 1,
                    },
                })
            }

            if (philosophyCardRef.current) {
                gsap.from(philosophyCardRef.current, {
                    y: 80,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: philosophyCardRef.current,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: 1,
                    },
                })
            }

            const textEls = [philosophyTextLeftRef.current, philosophyTextRightRef.current].filter(Boolean)
            textEls.forEach((el, i) => {
                if (!el) return
                gsap.from(el, {
                    x: i === 0 ? -100 : 100,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'top 60%',
                        scrub: 1,
                    },
                })
            })

            if (closingStatementRef.current) {
                gsap.from(closingStatementRef.current, {
                    opacity: 0,
                    y: 60,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: closingStatementRef.current,
                        start: 'top 90%',
                        end: 'top 70%',
                        scrub: 1,
                    },
                })
                gsap.to(closingStatementRef.current, {
                    y: -30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: closingStatementRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                })
            }

            gsap.to(lastSectionRef.current, {
                backgroundColor: '#fafafa',
                ease: 'none',
                scrollTrigger: {
                    trigger: lastSectionRef.current,
                    start: 'top 60%',
                    end: 'top 30%',
                    scrub: 1,
                },
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative  w-full  font-[PPNeueMontreal]">

            {/* ══════════════════════════════════════
          PINNED 3D CANVAS — replaces static image
          ══════════════════════════════════════ */}
            <div
                ref={pinnedRef}
                className="w-full h-screen absolute inset-0 bg-white z-0 pointer-events-none overflow-hidden bg-[#050505]"
            >


                {/* Three.js Canvas */}
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 5.5], fov: 18 }}  // ← y was 0.5, now 0
                    dpr={[1, 2]}
                    gl={{
                        antialias: true,
                        alpha: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.3,
                    }}
                    style={{ background: 'transparent', width: '100%', height: '100%' }}
                >
                    <SceneLights />
                    <Environment preset="city" />
                    <Suspense fallback={null}>
                        <Mobile
                            rotationProgress={rotationProgress}
                            screenImageUrl={SCREEN_IMAGE}
                            screenBrightness={0.25}
                            screenEmissiveColor="#0a0a18"
                        />
                    </Suspense>
                </Canvas>

                {/* White overlay — fades in when last section enters */}
                <div
                    ref={canvasOverlayRef}
                    className="absolute inset-0 bg-white opacity-0 pointer-events-none"
                />


            </div>

            {/* ══════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════ */}
            <section
                ref={heroSectionRef}
                className="relative min-h-screen z-10 flex  items-center justify-center px-6 md:px-10 overflow-hidden"
            >
                <div className="w-full mx-auto">
                    <div className="grid grid-cols-12 gap-6">

                        <div className="h-[45vh] lg:h-[30vh] md:col-span-12 w-full">
                            <h1 className="w-full lg:text-[12.5vw] text-[17vw] leading-[0.95] font-[PPNeueMontreal] md:font-bold font-semibold tracking-tight text-black">
                                Nagaruthwik
                            </h1>
                        </div>

                        <div className="w-full h-[1px] col-span-12 bg-white/40" />

                        <div className="col-span-12 md:col-span-5 md:col-start-8 h-[35vh] lg:h-[40vh]">
                            <h1 className="w-full indent-[35%] md:indent-[20%] lg:text-[2.5vw] text-[6vw] leading-[0.95] font-[PPNeueMontreal] font-semibold mb-8 tracking-tight text-black">
                                Building products that people use
                                instead of projects
                                that just sit online
                            </h1>

                            <p className="text-[clamp(1rem,2vw,1.25rem)] leading-tight text-black max-w-[300px] indent-[20%] mb-12">
                                Full-stack developer and founder turning classroom theory into production systems.
                                From Hyderabad to the web, one client at a time.
                            </p>

                            <div className="flex items-center justify-between gap-8">
                                
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="flex items-center gap-2 text-[11px] uppercase font-semibold font-[PPNeueMontreal] border border-white text-black px-6 py-3 hover:bg-[#1a1a1a] bg-white hover:text-black transition-all duration-300"
                                >
                                    <Download size={12} />
                                    Resume
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 text-black">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em]">Scroll</span>
                    <div className="w-[1px] h-16 bg-white animate-pulse" />
                </div>
            </section>

            {/* ══════════════════════════════════════
          INTRO SECTION
          ══════════════════════════════════════ */}
            <section
                id="intro"
                ref={introRef}
                className="relative z-10 py-24 px-6 md:px-10 border-t border-white/20"
            >
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">

                        <div className="w-[1px] bg-white/30 h-full absolute right-1/2 top-0 md:block hidden" />

                        <div className="col-span-12 md:col-span-5 lg:col-start-1">
                            <div className="space-y-6 text-[15px] leading-[1.8] text-black">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="lg:text-[2vw] text-[6vw] indent-[20%] leading-tight font-semibold">
                                        Hello, I'm Nagaruthwik — a full-stack developer who accidentally became a business owner.
                                    </p>
                                </Text>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 grid gap-5 grid-cols-9 lg:grid-cols-12 lg:col-start-1">
                            <div className="space-y-6 text-[15px] lg:col-span-4 col-span-8 col-start-1 leading-[1.8] text-black">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="leading-tight font-medium md:indent-[20%] lg:text-[1rem]">
                                        In 2025, while finishing my Computer Science degree at Malla Reddy University, I founded{' '}
                                        <span className="font-bold">Nothing2Real Web Studio</span>. Not because I had a grand plan,
                                        but because real businesses needed real solutions, and I was tired of building projects
                                        that only lived on GitHub.
                                    </p>
                                </Text>
                            </div>

                            <div className="space-y-6 text-[15px] lg:col-span-4 col-span-7 col-start-2 lg:col-start-6 leading-[1.8] text-black">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                        Today, I run a studio managing 5+ live client websites — from eCommerce platforms for
                                        Pochampally saree retailers to professional portfolios for doctors and chartered
                                        accountants. I handle everything: client calls, design mockups, full-stack development,
                                        deployment, and those 2 AM bug fixes that come with the territory.
                                    </p>
                                </Text>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-5 mt-[15vw] lg:col-start-8">
                            <div className="space-y-6 text-[15px] grid grid-cols-9 lg:grid-cols-12 leading-[1.8] text-black">
                                <div className="col-span-9 lg:col-span-12">
                                    <Text variant="slideUp" delay={0.2} duration={1.8} stagger={0.04} animateOnScroll>
                                        <p className="lg:text-[1.8vw] text-[5vw] font-semibold leading-[0.99] indent-[15%]">
                                            My background is rooted in the MERN stack and Java Spring Boot, but what really shapes
                                            how I work is understanding that code isn't the end product — the business outcome is.
                                            A smooth checkout flow matters more than perfect abstractions. A fast-loading product
                                            page beats architectural purity.
                                        </p>
                                    </Text>
                                </div>
                                <div className="col-span-6 lg:col-span-6 md:mt-[5vw] col-start-1">
                                    <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                        <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                            I believe the era of developer-first thinking is backwards. The best code serves the
                                            user first, the business second, and the developer's ego last.
                                        </p>
                                    </Text>
                                </div>
                                <div className="col-span-6 lg:col-span-6 col-start-3 md:mt-[5vw] lg:col-start-7">
                                    <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                        <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                            That's why I'm drawn to projects that solve real problems for real people — where a
                                            successful deployment means a business can finally take orders online, not just another
                                            line on my resume.
                                        </p>
                                    </Text>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          LAST SECTION — Philosophy
          ══════════════════════════════════════ */}
            <section
                ref={lastSectionRef}
                className="relative z-20 min-h-screen bg-white py-24 px-6 md:px-10 overflow-hidden"
            >
                <div ref={lastSectionContentRef} className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6 md:gap-8">

                        <div className="col-span-12 mb-12 md:mb-0 md:col-span-3">
                            <div ref={philosophyRef}>
                                <span className="text-[6.5vw] lg:text-[1.1vw] uppercase font-semibold md:font-bold font-[PPNeueMontreal] text-black">
                                    My Philosophy
                                </span>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-4">
                            <TextReveal>
                                <h2 className="text-[8vw]  md:text-[4vw] lg:text-[3vw] font-bold leading-[0.95] tracking-tight text-black ">
                                    Outcome
                                </h2>
                            </TextReveal>
                             <TextReveal>
                                <h2 className="text-[8vw] md:text-[4vw] lg:text-[3vw]   font-bold leading-[0.95] tracking-tight text-black mb-8">
                                    over Architecture
                                </h2>
                            </TextReveal>
                        </div>

                        <div className="col-span-12 md:col-span-8 overflow-hidden md:col-start-5 lg:col-span-10 lg:col-start-4 mb-6">
                            <div className="p-1 md:p-12">
                                <TextReveal>
                                        <p className="text-[5vw] md:text-[2.5vw] lg:text-[2.5vw] indent-[15%] leading-[1.2] font-semibold text-black/90">
                                            Every project starts with understanding what success looks like for the client — more sales,
                                            better user experience, operational efficiency.
                                        </p>
                                </TextReveal>
                                <div className="mt-8 pt-8 border-t border-black/10">
                                    <p className="text-[3.5vw] md:text-[1.2vw] lg:text-[1rem] leading-tight font-medium text-black/70">
                                        The tech stack is just the tool. I've built eCommerce platforms that process real transactions,
                                        appointment booking systems that connect actual patients to doctors, and inventory management
                                        dashboards that reduce manual work.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div  className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7">
                            <div className="border-t border-black/10 pt-12">
                                <p className="text-[6vw] md:text-[3vw] lg:text-[2vw] font-bold leading-[1.1] text-black/90">
                                    The code works because the solution fits the problem.
                                </p>
                                <div className="mt-8 flex items-center gap-4 text-black/40">
                                    <div className="h-[1px] flex-1 bg-black/10" />
                                    <span className="text-[10px] font-semibold">Nothing2Real — Nagaruthwik</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

export default Hero