'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from './TextReveal'
import { images } from '@/public/assets/assets'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const caps = [
  {
    index: '01',
    title: 'Web Development',
    tags: ['React', 'Next.js', 'Tailwind'],
    image: null,
    description:
      'Building responsive, production-grade interfaces with React and Next.js. Every component is optimised for performance and accessibility — from 320px to ultrawide.',
  },
  {
    index: '02',
    title: '3D Web Development',
    tags: ['Three.js', 'R3F', 'GSAP'],
    image: images.threeD,
    description:
      'Crafting immersive 3D experiences using Three.js and React Three Fiber. Interactive renders and scroll-driven animations that run at 60fps in-browser.',
  },
  {
    index: '03',
    title: 'UI / UX Design',
    tags: ['Figma', 'Motion', 'Design Systems'],
    image: images.uiux,
    description:
      'Designing intuitive, award-level interfaces with a deep understanding of visual hierarchy, motion design, and user flow — from wireframes to pixel-perfect production.',
  },
  {
    index: '04',
    title: 'Backend & APIs',
    tags: ['FastAPI', 'Node.js', 'MongoDB'],
    image: null,
    description:
      'Building robust REST and real-time APIs with FastAPI and Node.js. From MongoDB data modelling to Redis caching and SSE-powered live updates.',
  },
  {
    index: '05',
    title: 'AI / ML Integration',
    tags: ['RAG', 'FAISS', 'LLMs'],
    image: null,
    description:
      'Implementing retrieval-augmented generation pipelines, semantic search with FAISS, and production LLM integrations using Mistral and Sentence Transformers.',
  },
  {
    index: '06',
    title: 'Full-Stack Delivery',
    tags: ['DevOps', 'Vercel', 'Client Work'],
    image: images.shopify,
    description:
      'End-to-end ownership — client calls, design mockups, development, deployment, and post-launch support. Five live client sites and counting.',
  },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from([headRef.current, bodyRef.current], {
        opacity: 0,
        y: 32,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
      })

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 88%',
        },
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-white font-[PPNeueMontreal]"

    >
      {/* ── Vertical column rule — matches cura's grid lines */}
      <div className="relative w-full">


        <div className="grid grid-cols-12 gap-0">

          {/* ── Left column — label + heading + copy ─────────────────── */}
          <div
            className="
              col-span-12 lg:col-span-4
              px-8 md:px-12 lg:px-10
              pt-16 md:pt-20
              pb-12 lg:pb-20
               border-black/[0.08]
              flex flex-col gap-6
            "
          >

            <TextReveal>
              <h2
                ref={headRef}
                className="font-[AmericanGrotesk] uppercase
                    text-[10vw] md:text-[6vw] lg:text-[3.2vw]
                font-bold leading-[1.0] tracking-[-0.02em]
                text-black
              "
              >
                What I
                Bring to
                <br />
                the Table.
              </h2>
            </TextReveal>

          </div>



          {/* ── Right column — capability cards grid ─────────────────── */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-5 lg:mt-[15vw]  px-2">
            <div className="col-span-12 lg:col-span-6  py-5 max-w-[600px] px-2">
              <p className="text-[4vw] md:text-[1.2vw] lg:text-[1.1vw] leading-[0.9] font-medium text-black/55">
                A focused set of disciplines — each one practised on live
                projects for real clients. Not tutorial-level familiarity.
                Production-grade fluency.
              </p>
              <p className="text-[4vw] md:text-[1.2vw] lg:text-[1.1vw] mt-5 leading-[0.9] font-medium text-black/55">
                From pixel-perfect UI to deployed AI pipelines, I handle the
                full vertical — design, code, ship.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 py-2 gap-5 md:gap-15">
              {caps.map((cap, i) => (
                <div
                  key={cap.index}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="
    relative
    min-h-[280px]
    overflow-hidden
    bg-[#EAEAEE]
    cursor-default
  "
                >
                  <h3
                    className="
      absolute top-0 left-0
      p-5 z-10
      text-[6vw] md:text-[2.8vw] lg:text-[1.6vw]
      font-bold leading-[1.05]
      tracking-[-0.01em]
      text-white mix-blend-difference
    "
                  >
                    {cap.title}
                  </h3>

                  <div className="absolute -bottom-5 right-0  w-[80%] h-[80%] opacity-80 ">
                    {cap.image && (
                      <Image
                        src={cap.image}
                        alt={cap.title}
                        fill
                        priority
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>


      </div>
    </div>
  )
}