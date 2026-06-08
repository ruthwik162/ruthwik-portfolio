'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText)

CustomEase.create('reveal.wipe', 'M0,0 C0.4,0 0.2,1 1,1')

interface TextRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  animateOnScroll?: boolean
  start?: string
  overlayColor?: string
  stagger?: number
  className?: string
}

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.85,
  animateOnScroll = true,
  start = 'top 88%',
  overlayColor = '#252525',
  stagger = 0.08,
  className = '',
}: TextRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // SplitText splits children into individual lines
    const split = new SplitText(wrapper, {
      type: 'lines',
      linesClass: 'reveal-line',
    })

    const lines = split.lines as HTMLElement[]

    // Wrap each line in a clip container + inject the overlay element
    lines.forEach((line) => {
      // Clip parent — hides overflow so overlay doesn't bleed outside line bounds
      line.style.position = 'relative'
      line.style.overflow = 'hidden'

      // Wipe overlay injected per line
      const overlay = document.createElement('div')
      overlay.setAttribute('aria-hidden', 'true')
      overlay.style.cssText = `
        position: absolute;
        inset: 0;
        top: -2px;
        bottom: -2px;
        background: ${overlayColor};
        transform: scaleX(0);
        transform-origin: left center;
        z-index: 2;
        pointer-events: none;
      `
      line.appendChild(overlay)

      // Hide text content within the line before animation
      gsap.set(line.childNodes[0] as Element, { visibility: 'hidden' })
    })

    const overlays = lines.map(
      (line) => line.lastChild as HTMLElement
    )
    const textNodes = lines.map(
      (line) => line.childNodes[0] as HTMLElement
    )

    const tl = gsap.timeline({ delay, paused: animateOnScroll })

    // Step 1 — overlays sweep in left → right, staggered per line
    tl.to(overlays, {
      scaleX: 1,
      duration: duration * 1.12,
      ease: 'reveal.wipe',
      stagger,
    })

    // At peak — reveal all text nodes simultaneously
    tl.set(textNodes, { visibility: 'visible' })

    // Step 2 — overlays exit rightward, staggered per line
    tl.to(overlays, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: duration * 1.12,
      ease: 'reveal.wipe',
      stagger,
    })

    if (animateOnScroll) {
      ScrollTrigger.create({
        trigger: wrapper,
        start,
        once: true,
        onEnter: () => tl.play(),
      })
    } else {
      tl.play()
    }

    return () => {
      tl.kill()
      split.revert()
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === wrapper)
        .forEach((st) => st.kill())
    }
  }, [delay, duration, animateOnScroll, start, overlayColor, stagger])

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  )
}