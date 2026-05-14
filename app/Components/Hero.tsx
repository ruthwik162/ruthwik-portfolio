"use client"
import { Download } from 'lucide-react'
import Image from 'next/image';
import React, { useRef, useLayoutEffect } from 'react'
import Text from './Text';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinnedImageRef = useRef<HTMLDivElement>(null);
    const heroSectionRef = useRef<HTMLElement>(null);
    const introRef = useRef<HTMLElement>(null);
    const lastSectionRef = useRef<HTMLElement>(null);
    const whoRef = useRef<HTMLDivElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // ─────────────────────────────────────────────────
            // 1. PIN the image wrapper for the full page scroll
            //    pinSpacing:false so it doesn't push content down
            // ─────────────────────────────────────────────────
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                endTrigger: lastSectionRef.current,
                end: "bottom bottom",
                pin: pinnedImageRef.current,
                pinSpacing: false,
                invalidateOnRefresh: true
            });

            ScrollTrigger.matchMedia({

                "(min-width: 1024px)": function () {

                    ScrollTrigger.create({
                        trigger: introRef.current,
                        endTrigger: introRef.current,
                        start: "top 70%",
                        end: "bottom bottom",
                        pin: whoRef.current,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    });

                }

            });
            ScrollTrigger.matchMedia({

                "(min-width: 1024px)": function () {

                    ScrollTrigger.create({
                        trigger: lastSectionRef.current,
                        endTrigger: lastSectionRef.current,
                        start: "top 70%",
                        end: "bottom bottom",
                        pin: philosophyRef.current,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    });

                }

            });



            const img = pinnedImageRef.current?.querySelector('img');
            if (!img) return;

            // ─────────────────────────────────────────────────
            // 2. Phase A → B: as intro section enters viewport,
            //    brightness ramps UP  (0.5 → 1.0)
            // ─────────────────────────────────────────────────
            gsap.fromTo(
                img,
                { filter: 'brightness(0.55)' },
                {
                    filter: 'brightness(0.35)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: introRef.current,
                        start: 'top bottom',   // bottom of viewport touches intro top
                        end: 'top 60%',
                        scrub: 1,
                    },
                }
            );



            // ─────────────────────────────────────────────────
            // 3. Phase B → C: deep into intro content,
            //    brightness fades back down (1.0 → 0.2)
            // ─────────────────────────────────────────────────


        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        // Outer container — total scroll height = hero + intro stacked
        <div ref={containerRef} className='relative w-full font-[PPNeueMontreal]'>

            {/* ── PINNED full-screen image ── */}
            <div
                ref={pinnedImageRef}
                className='w-full h-screen absolute inset-0 z-0 pointer-events-none overflow-hidden'
            >
                <Image
                    src="https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif"
                    alt='hero_banner'
                    className='w-full h-full object-cover object-center'
                    style={{ filter: 'brightness(0.5)' }}
                    fill
                    priority
                />
            </div>

            {/* ── HERO SECTION — floats above the pinned image ── */}
            <section
                ref={heroSectionRef}
                className="relative min-h-screen z-10 flex items-center justify-center px-6 md:px-10 overflow-hidden"
            >
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">

                        <div className='h-[45vh] lg:h-[30vh] md:col-span-12 w-full'>
                            <h1 className="w-full lg:text-[12.5vw] text-[17vw] leading-[0.95] font-[PPNeueMontreal] md:font-bold font-semibold mb-8 tracking-tight text-white">
                                Nagaruthwik
                            </h1>
                            <div className=' md:col-span-12  w-full'>
                                <h1 className="w-full lg:text-[1vw] text-[3vw] w-full leading-[0.95] font-[PPNeueMontreal] md:font-semibold font-semibold tracking-tight text-white">
                                    Full Stack Developer
                                </h1>
                            </div>
                        </div>



                        <div className='w-full h-[1px] col-span-12 bg-white/40' />


                        <div className="col-span-12 md:col-span-6 md:col-start-7 h-[35vh] lg:h-[40vh]">
                            <h1 className="w-full indent-[35%] md:indent-[20%] lg:text-[2.5vw] text-[6vw] leading-[0.95] font-[PPNeueMontreal] font-semibold mb-8 tracking-tight text-white">
                                Building products that people use
                                instead of projects
                                that just sit online
                            </h1>

                            <p className="text-[clamp(1rem,2vw,1.25rem)] leading-tight text-white max-w-[300px] indent-[20%] mb-12">
                                Full-stack developer and founder turning classroom theory into production systems. From Hyderabad to the web, one client at a time.
                            </p>

                            <div className="flex items-center justify-between gap-8">
                                <a
                                    href="#intro"
                                    className="text-[11px] uppercase tracking-[0.15em] font-[PPNeueMontreal] text-white underline underline-offset-4 hover:text-white/60 transition-colors duration-300"
                                >
                                    Read the story
                                </a>
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="flex items-center gap-2 text-[11px] uppercase font-semibold font-[PPNeueMontreal] border border-white text-black px-6 py-3 hover:bg-[#1a1a1a] bg-white hover:text-white transition-all duration-300"
                                >
                                    <Download size={12} />
                                    Resume
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 text-white">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em]">Scroll</span>
                    <div className="w-[1px] h-16 bg-white animate-pulse" />
                </div>
            </section>

            {/* ── INTRO SECTION — no background, scrolls over the pinned image ── */}
            <section
                id="intro"
                ref={introRef}
                className="relative z-10 py-24 px-6 md:px-10 border-t border-white/20"
            >
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">

                        {/* Label column */}
                        <div className="col-span-12 mb-[10vw] md:mb-0 md:col-span-3">
                            <div ref={whoRef}>
                                <span className="text-[6.5vw]  lg:text-[2vw] uppercase font-semibold md:font-bold font-[PPNeueMontreal] text-white">
                                    Who I Am
                                </span>
                            </div>
                        </div>
                        <div className='w-[1px] bg-white/30 h-full absolute right-1/2 top-0 md:block hidden' />


                        {/* Large intro headline */}
                        <div className="col-span-12 md:col-span-6 lg:col-start-7">
                            <div className="space-y-6 text-[15px] leading-[1.8] text-white">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="lg:text-[2vw] text-[6vw] indent-[20%] leading-tight  font-semibold">
                                        Hello, I'm Nagaruthwik a full-stack developer who accidentally became a business owner.
                                    </p>
                                </Text>
                            </div>
                        </div>

                        {/* Two-column body copy */}
                        <div className="col-span-12 md:col-span-6 grid gap-5 grid-cols-9 lg:grid-cols-12 lg:col-start-7">
                            <div className="space-y-6 text-[15px] lg:col-span-5 col-span-8 col-start-1 leading-[1.8] text-white">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="leading-tight font-medium md:indent-[20%] lg:text-[1rem]">
                                        In 2025, while finishing my Computer Science degree at Malla Reddy University, I founded{' '}
                                        <span className="font-bold">Nothing2Real Web Studio</span>. Not because I had a grand plan,
                                        but because real businesses needed real solutions, and I was tired of building projects
                                        that only lived on GitHub.
                                    </p>
                                </Text>
                            </div>

                            <div className="space-y-6 text-[15px] lg:col-span-5 col-span-7 col-start-2 lg:col-start-7 leading-[1.8] text-white">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                        Today, I run a studio managing 5+ live client websites—from eCommerce platforms for
                                        Pochampally saree retailers to professional portfolios for doctors and chartered
                                        accountants. I handle everything: client calls, design mockups, full-stack development,
                                        deployment, and those 2 AM bug fixes that come with the territory.
                                    </p>
                                </Text>
                            </div>
                        </div>

                        {/* Full-width closing copy */}
                        <div className="col-span-12 md:col-span-6 mt-[5vw] lg:col-start-7">
                            <div className="space-y-6 text-[15px] grid grid-cols-9 lg:grid-cols-12 leading-[1.8] text-white">
                                <div className='col-span-9 lg:col-span-12'>
                                    <Text variant="slideUp" delay={0.2} duration={1.8} stagger={0.04} animateOnScroll>
                                        <p className='lg:text-[1.8vw] text-[5vw] font-semibold leading-[0.99] indent-[15%]'>
                                            My background is rooted in the MERN stack and Java Spring Boot, but what really shapes
                                            how I work is understanding that code isn't the end product—the business outcome is.
                                            A smooth checkout flow matters more than perfect abstractions. A fast-loading product
                                            page beats architectural purity.
                                        </p>
                                    </Text>
                                </div>
                                <div className='col-span-6 lg:col-span-6 col-start-1'>
                                    <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                        <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                            I believe the era of developer-first thinking is backwards. The best code serves the
                                            user first, the business second, and the developer's ego last.
                                        </p>
                                    </Text>
                                </div>
                                <div className='col-span-6 lg:col-span-6 col-start-3 lg:col-start-7'>
                                    <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                        <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                            That's why I'm drawn to projects that solve real problems for real people—where a
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


            <section
                ref={lastSectionRef}
                className=" relative z-20 min-h-screen bg-white py-10 px-6 md:px-10 overflow-hidden flex items-center justify-center"
            >
                <div className="w-full max-w-[1400px]  mx-auto">
                    <div className="grid grid-cols-12 gap-6">

                        {/* Label column */}
                        <div className="col-span-12 mb-[10vw] md:mb-0 md:col-span-5">
                            <div ref={philosophyRef}>
                                <span className="text-[6.5vw]  lg:text-[2vw] uppercase font-semibold md:font-bold font-[PPNeueMontreal] text-black">
                                    Philosophy I Admire
                                </span>
                            </div>
                        </div>
                        <div className='w-[1px] bg-white/30 h-full absolute right-1/2 top-0 md:block hidden' />


                        {/* Large intro headline */}
                        <div className="col-span-12 md:col-span-8  lg:col-start-5">
                            <div className="space-y-6 text-[15px] leading-[1.8] text-black">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="lg:text-[2vw] text-[6vw] indent-[20%] leading-[1.05]  font-semibold">
                                        Every project starts with understanding what success looks like for the client—more sales, better user experience, operational efficiency. The tech stack is just the tool. I've built eCommerce platforms that process real transactions, appointment booking systems that connect actual patients to doctors, and inventory management dashboards that reduce manual work. The code works because the solution fits the problem.                                    </p>
                                </Text>
                            </div>
                        </div>

                        {/* Two-column body copy */}
                        <div className="col-span-12 md:col-span-6 grid gap-5 grid-cols-9 lg:grid-cols-12 lg:col-start-7">
                            <div className="space-y-6 text-[15px] lg:col-span-5 col-span-8 col-start-1 leading-[1.8] text-black">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="leading-tight font-medium md:indent-[20%] lg:text-[1rem]">
                                        In 2025, while finishing my Computer Science degree at Malla Reddy University, I founded{' '}
                                        <span className="font-bold">Nothing2Real Web Studio</span>. Not because I had a grand plan,
                                        but because real businesses needed real solutions, and I was tired of building projects
                                        that only lived on GitHub.
                                    </p>
                                </Text>
                            </div>

                            <div className="space-y-6 text-[15px] lg:col-span-5 col-span-7 col-start-2 lg:col-start-7 leading-[1.8] text-black">
                                <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                    <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                        Today, I run a studio managing 5+ live client websites—from eCommerce platforms for
                                        Pochampally saree retailers to professional portfolios for doctors and chartered
                                        accountants. I handle everything: client calls, design mockups, full-stack development,
                                        deployment, and those 2 AM bug fixes that come with the territory.
                                    </p>
                                </Text>
                            </div>
                        </div>

                        {/* Full-width closing copy */}
                        <div className="col-span-12 md:col-span-6 mt-[5vw] lg:col-start-7">
                            <div className="space-y-6 text-[15px] grid grid-cols-9 lg:grid-cols-12 leading-[1.8] text-black">
                                <div className='col-span-9 lg:col-span-12'>
                                    <Text variant="slideUp" delay={0.2} duration={1.8} stagger={0.04} animateOnScroll>
                                        <p className='lg:text-[1.8vw] text-[5vw] font-semibold leading-[0.99] indent-[15%]'>
                                            My background is rooted in the MERN stack and Java Spring Boot, but what really shapes
                                            how I work is understanding that code isn't the end product—the business outcome is.
                                            A smooth checkout flow matters more than perfect abstractions. A fast-loading product
                                            page beats architectural purity.
                                        </p>
                                    </Text>
                                </div>
                                <div className='col-span-6 lg:col-span-6 col-start-1'>
                                    <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                        <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                            I believe the era of developer-first thinking is backwards. The best code serves the
                                            user first, the business second, and the developer's ego last.
                                        </p>
                                    </Text>
                                </div>
                                <div className='col-span-6 lg:col-span-6 col-start-3 lg:col-start-7'>
                                    <Text variant="slideUp" delay={0.2} stagger={0.04} duration={1.8} animateOnScroll>
                                        <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                            That's why I'm drawn to projects that solve real problems for real people—where a
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
        </div>
    );
}

export default Hero;