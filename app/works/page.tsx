"use client"
import React, { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Text from '../Components/Text'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'netha-silks',
    index: '01',
    title: 'Netha Silks & Co.',
    category: 'eCommerce · Fashion · Luxury',
    year: '2024',
    url: 'https://nethasilksandco.com/',
    thumbnail: 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
    accent: '#C9A96E',
    description: 'A premium silk saree eCommerce platform for Pochampally weavers — built to move heritage textiles online.',
    stat1: { label: 'Products Live', value: '120+' },
    stat2: { label: 'Orders Processed', value: '₹2L+' },
    tags: ['Next.js', 'Stripe', 'Sanity CMS', 'Tailwind'],
    type: 'ecommerce',
  },
  {
    id: 'sharvani-jewellery',
    index: '02',
    title: 'Sharvani Jewellery',
    category: 'eCommerce · Jewellery · D2C',
    year: '2024',
    url: 'https://sharvanijewellery-collectives.vercel.app/',
    thumbnail: 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
    accent: '#B8860B',
    description: 'A jewellery collective storefront enabling direct-to-consumer sales with a curated luxury browsing experience.',
    stat1: { label: 'Collections', value: '8' },
    stat2: { label: 'SKUs', value: '200+' },
    tags: ['React', 'Razorpay', 'Firebase', 'GSAP'],
    type: 'ecommerce',
  },
  {
    id: 'naveen-ca',
    index: '03',
    title: 'Naveen Sangewar CA',
    category: 'Portfolio · Professional · Finance',
    year: '2025',
    url: 'https://naveensangewarca.vercel.app/',
    thumbnail: 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
    accent: '#2D5A8E',
    description: 'A trust-first portfolio for a chartered accountant — clear, authoritative, and optimised for lead conversion.',
    stat1: { label: 'Client Leads', value: '+40%' },
    stat2: { label: 'Load Time', value: '<1s' },
    tags: ['Next.js', 'Framer Motion', 'Resend', 'Tailwind'],
    type: 'portfolio',
  },
  {
    id: 'bharath-reddy',
    index: '04',
    title: 'Bharath Reddy',
    category: 'Portfolio · Personal · Creative',
    year: '2025',
    url: 'https://bharath-reddy.vercel.app/',
    thumbnail: 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
    accent: '#E84545',
    description: 'A personal portfolio that communicates personality before credentials — minimal, fast, and memorable.',
    stat1: { label: 'Lighthouse', value: '99/100' },
    stat2: { label: 'Bounce Rate', value: '−35%' },
    tags: ['Next.js', 'GSAP', 'Three.js', 'Tailwind'],
    type: 'portfolio',
  },
]

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const heroTitleRef = useRef<HTMLDivElement>(null)
  const heroDividerRef = useRef<HTMLDivElement>(null)
  const heroSubRef = useRef<HTMLDivElement>(null)
  const listSectionRef = useRef<HTMLElement>(null)
  const closingRef = useRef<HTMLElement>(null)

  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const projectImgRefs = useRef<(HTMLDivElement | null)[]>([])
  const projectMaskRefs = useRef<(HTMLDivElement | null)[]>([])
  const projectInfoRefs = useRef<(HTMLDivElement | null)[]>([])
  const projectLabelRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ──────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from(heroTitleRef.current, { y: 120, opacity: 0, duration: 1.4, delay: 0.2 })
        .from(heroDividerRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'expo.out' }, '-=0.8')
        .from(heroSubRef.current, { y: 40, opacity: 0, duration: 1 }, '-=0.6')

      // ── Per-project: mask reveal + parallax ───────────────
      projects.forEach((_, i) => {
        const wrap = projectRefs.current[i]
        const img = projectImgRefs.current[i]
        const mask = projectMaskRefs.current[i]
        const info = projectInfoRefs.current[i]
        const label = projectLabelRefs.current[i]
        if (!wrap || !img || !mask || !info) return

        // Mask wipe reveal
        gsap.fromTo(
          mask,
          { scaleY: 1 },
          {
            scaleY: 0,
            transformOrigin: 'top',
            ease: 'expo.inOut',
            duration: 1.2,
            scrollTrigger: {
              trigger: wrap,
              start: 'top 75%',
              end: 'top 40%',
              scrub: false,
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Parallax on the image itself
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )

        // Info slides in
        gsap.from(info, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrap,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })

        // Label counter
        if (label) {
          gsap.from(label, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: wrap,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      })

      // ── Closing section ────────────────────────────────────
      if (closingRef.current) {
        gsap.from(closingRef.current.querySelectorAll('.closing-item'), {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: closingRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full font-[PPNeueMontreal] bg-[#ffffff]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[65vh] flex flex-col justify-end px-6 md:px-10 pb-16 pt-36 overflow-hidden"
      >
        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <div ref={heroTitleRef} className="overflow-hidden">
            <h1 className="text-[18vw] md:text-[13vw] leading-[0.88] font-bold tracking-tight text-black">
              Work
            </h1>
          </div>

          <div ref={heroDividerRef} className="w-full h-[1px] bg-white/20 my-6 origin-left" />

          <div ref={heroSubRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <p className="text-black/50 text-[clamp(0.85rem,1.5vw,1.1rem)] leading-relaxed max-w-md">
              Four live products. Real clients. Actual outcomes — not just GitHub repos and Figma mockups.
            </p>
            <div className="flex gap-8 text-black/30 text-[11px] uppercase tracking-[0.2em] font-semibold">
              <span>2× eCommerce</span>
              <span>2× Portfolio</span>
              <span>5+ Live Sites</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT LIST ──────────────────────────────────────── */}
      <section
        ref={listSectionRef}
        className="relative z-10 px-6 md:px-10 pt-8 pb-32"
      >
        <div className="w-full max-w-[1400px] mx-auto space-y-[12vw] md:space-y-[8vw]">

          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={el => { projectRefs.current[i] = el }}
              className="group relative grid grid-cols-12 gap-6 items-start"
            >
              {/* Index + Label */}
              <div
                ref={el => { projectLabelRefs.current[i] = el }}
                className="col-span-12 md:col-span-2 flex md:flex-col gap-3 md:gap-1 items-center md:items-start"
              >
                <span
                  className="font-bold text-[9vw] md:text-[4vw] leading-none"
                  style={{ color: project.accent, opacity: 0.35 }}
                >
                  {project.index}
                </span>
                <div className="flex flex-wrap gap-2 mt-0 md:mt-3">
                  <span
                    className="text-[9px] uppercase tracking-[0.18em] font-semibold px-2 py-1 border"
                    style={{ color: project.accent, borderColor: project.accent + '40' }}
                  >
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Image with mask reveal */}
              <div className={`col-span-12 md:col-span-6 ${i % 2 !== 0 ? 'md:col-start-3' : ''} relative overflow-hidden`} style={{ aspectRatio: '16/9' }}>
                <div
                  ref={el => { projectImgRefs.current[i] = el }}
                  className="absolute inset-0 scale-[1.15]"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                    style={{ filter: 'brightness(0.6) saturate(0.9)' }}
                  />
                  {/* Accent color wash */}
                  <div
                    className="absolute inset-0 mix-blend-color opacity-20"
                    style={{ backgroundColor: project.accent }}
                  />
                </div>

                {/* Mask overlay for wipe reveal */}
                <div
                  ref={el => { projectMaskRefs.current[i] = el }}
                  className="absolute inset-0 z-10 origin-top"
                  style={{ backgroundColor: '#0a0a0a' }}
                />

                {/* Visit link overlay */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.25em] font-semibold px-5 py-3 border"
                    style={{ color: project.accent, borderColor: project.accent, backgroundColor: '#0a0a0a' }}
                  >
                    Visit Live Site ↗
                  </span>
                </a>
              </div>

              {/* Project info */}
              <div
                ref={el => { projectInfoRefs.current[i] = el }}
                className={`col-span-12 md:col-span-4 ${i % 2 !== 0 ? 'md:col-start-9 md:row-start-1' : ''} flex flex-col justify-between py-2 md:py-4`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[1px] w-6" style={{ backgroundColor: project.accent }} />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-black/40 font-semibold">{project.year}</span>
                  </div>

                  <Text variant="slideUp" delay={0.1} stagger={0.03} duration={1.4} animateOnScroll>
                    <h2 className="text-[7vw] md:text-[2.8vw] lg:text-[2.2vw] font-bold leading-[0.92] tracking-tight text-black mb-4">
                      {project.title}
                    </h2>
                  </Text>

                  <p className="text-[11px] uppercase tracking-[0.15em] text-black/40 font-semibold mb-6">
                    {project.category}
                  </p>

                  <Text variant="slideUp" delay={0.2} stagger={0.03} duration={1.4} animateOnScroll>
                    <p className="text-[clamp(0.85rem,1.2vw,1rem)] leading-[1.7] text-black/60 font-medium mb-8">
                      {project.description}
                    </p>
                  </Text>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[project.stat1, project.stat2].map((stat, si) => (
                      <div key={si} className="border-t pt-3" style={{ borderColor: project.accent + '30' }}>
                        <div className="text-[6vw] md:text-[2vw] lg:text-[1.6vw] font-bold leading-none" style={{ color: project.accent }}>
                          {stat.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.15em] text-black/30 font-semibold mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[9px] uppercase tracking-[0.1em] font-semibold text-black/40 border border-white/10 px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA row */}
                <div className="flex items-center gap-6 border-t border-white/10 pt-5">
                  <Link
                    href={`/works/${project.id}`}
                    className="text-[10px] uppercase tracking-[0.18em] font-semibold text-black underline underline-offset-4 hover:text-black/50 transition-colors duration-300"
                  >
                    Case Study
                  </Link>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-[10px] uppercase tracking-[0.18em] font-semibold px-5 py-2.5 border transition-all duration-300 hover:bg-white hover:text-[#0a0a0a]"
                    style={{ color: project.accent, borderColor: project.accent }}
                  >
                    Live ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────── */}
      <section
        ref={closingRef}
        className="relative z-10 px-6 md:px-10 py-32 border-t border-white/10"
      >
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="closing-item">
              <h2 className="text-[10vw] md:text-[6vw] font-bold leading-[0.9] tracking-tight text-black mb-6">
                Got a project<br />that needs to<br />
                <span className="text-black/25">actually ship?</span>
              </h2>
            </div>
            <div className="closing-item">
              <p className="text-black/50 text-[clamp(0.9rem,1.4vw,1.1rem)] leading-relaxed max-w-sm mt-4">
                I take on 2–3 new clients per quarter. Let's talk about turning your idea into a live product.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end gap-4 closing-item">
            <a
              href="mailto:nagaruthwik@gmail.com"
              className="text-[11px] uppercase tracking-[0.2em] font-bold border border-white text-[#0a0a0a] bg-white px-8 py-4 hover:bg-transparent hover:text-black transition-all duration-400"
            >
              Start a Project
            </a>
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.18em] font-semibold text-black/30 hover:text-black transition-colors duration-300"
            >
              ← Back Home
            </Link>
          </div>
        </div>

        {/* Large watermark */}
        <div className="mt-16 overflow-hidden">
          <div className="closing-item text-[18vw] font-bold text-black/[0.03] leading-none tracking-tight select-none">
            Projects
          </div>
        </div>
      </section>

    </div>
  )
}