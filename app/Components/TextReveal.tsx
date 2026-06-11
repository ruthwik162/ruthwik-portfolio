'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText)

CustomEase.create('reveal.wipe', 'M0,0 C0.4,0 0.2,1 1,1')

interface TextRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  animateOnScroll?: boolean
  start?: string
  blockColor?: string   // FIX 1: was `overlayColor` in interface, mismatched with prop destructure
  stagger?: number
  className?: string
}

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.85,
  animateOnScroll = true,
  start = 'top 88%',
  blockColor = '#252525',
  stagger = 0.08,
  className = '',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // FIX 4: store SplitText instances (not DOM elements) so .revert() works
  const splitInstances = useRef<InstanceType<typeof SplitText>[]>([])
  const blocks = useRef<HTMLElement[]>([])
  const lines = useRef<HTMLElement[]>([])

  useGSAP(() => {
    if (!containerRef.current) return

    splitInstances.current = []
    lines.current = []
    blocks.current = []

    let elements: HTMLElement[] = []
    if (containerRef.current.hasAttribute('data-text-wrapper')) {
      elements = Array.from(containerRef.current.children) as HTMLElement[]
    } else {
      elements = [containerRef.current]
    }

    elements.forEach((element) => {
      const split = SplitText.create(element, {
        type: 'lines',
        linesClass: 'block-line++',
        linesThreshold: 0.1,
      })

      // FIX 4: push the SplitText instance, not the element
      splitInstances.current.push(split)

      split.lines.forEach((line) => {
        const wrapper = document.createElement('div')
        wrapper.classList.add('block-line-wrapper')
        wrapper.style.cssText = `
          position: relative;
          overflow: hidden;
          display: table;  /* shrinks to text width, still breaks across SplitText lines */
        `
        line.parentNode?.insertBefore(wrapper, line)
        wrapper.appendChild(line)

        const block = document.createElement('div')
        block.classList.add('block-line-revealer')
        block.style.cssText = `
          position: absolute;
          inset: 0;
          background-color: ${blockColor};
          transform-origin: left center;
          will-change: transform;
        `
        wrapper.appendChild(block)

        lines.current.push(line as HTMLElement)
        blocks.current.push(block)
      })
    })

    // FIX 3: lines start hidden (opacity 0) — block wipes over them and reveals
    gsap.set(lines.current, { opacity: 0 })
    gsap.set(blocks.current, { scaleX: 0, transformOrigin: 'left center' })

    const createBlockAnimation = (
      line: HTMLElement,
      block: HTMLElement,
      index: number
    ) => {
      const tl = gsap.timeline({
        delay: delay + index * stagger,
      })

      // Block sweeps in from left (covers nothing — line is hidden)
      tl.to(block, {
        scaleX: 1,
        duration,
        ease: 'reveal.wipe',
      })
      // FIX 2: reveal THIS line (not the whole lines array ref)
      tl.set(line, { opacity: 1 })
      // Flip origin so block sweeps out to the right
      tl.set(block, { transformOrigin: 'right center' })
      // Block sweeps out, leaving line visible
      tl.to(block, {
        scaleX: 0,
        duration,
        ease: 'reveal.wipe',
      })

      return tl
    }

    if (animateOnScroll) {
      blocks.current.forEach((block, index) => {
        const tl = createBlockAnimation(lines.current[index], block, index)
        tl.pause()

        ScrollTrigger.create({
          trigger: containerRef.current,
          start,
          once: true,
          onEnter: () => {
            tl.play()
          },
        })
      })
    } else {
      blocks.current.forEach((block, index) => {
        const tl = createBlockAnimation(lines.current[index], block, index)
        tl.play()
      })
    }

    return () => {
      // FIX 4: revert SplitText instances (not DOM elements)
      splitInstances.current.forEach((split) => {
        split.revert()
      })

      // FIX 5: remove wrapper divs cleanly — move children out first, then remove
      const wrappers = containerRef.current?.querySelectorAll('.block-line-wrapper')
      wrappers?.forEach((wrapper) => {
        // Move all real children (lines) back to parent before removing wrapper
        while (wrapper.firstChild) {
          const child = wrapper.firstChild
          // skip the revealer block div — only move text lines
          if ((child as HTMLElement).classList?.contains('block-line-revealer')) {
            wrapper.removeChild(child)
          } else {
            wrapper.parentNode?.insertBefore(child, wrapper)
          }
        }
        wrapper.remove()
      })
    }
  }, {
    scope: containerRef,
    dependencies: [children, delay, duration, animateOnScroll, start, blockColor, stagger],
  })

  return (
    <div ref={containerRef} data-text-wrapper="true" className={className}>
      {children}
    </div>
  )
}