"use client"
import React, { useEffect, useState } from 'react'
import gsap from 'gsap'

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Prevent scrolling during preloader
        document.body.style.overflow = 'hidden'

        const timeline = gsap.timeline({
            onComplete: () => {
                setIsLoading(false)
                document.body.style.overflow = 'auto'
            }
        })

        // Animate the counter
        timeline.to('.counter', {
            textContent: 100,
            duration: 2,
            ease: 'power2.inOut',
            snap: { textContent: 1 },
            onUpdate: function() {
                const counter = document.querySelector('.counter')
                if (counter) {
                    counter.textContent = Math.ceil(parseFloat(counter.textContent || '0')) + '%'
                }
            }
        })

        // Animate the clip-path reveal - expanding circle from center
        timeline.to('.preloader-screen', {
            clipPath: 'circle(150% at 50% 50%)',
            duration: 1.2,
            ease: 'power4.inOut',
        }, '-=0.3')

        // Fade out the preloader
        timeline.to('.preloader-screen', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
        })

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    if (!isLoading) return null

    return (
        <div className="preloader-screen fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            style={{ clipPath: 'circle(0% at 50% 50%)' }}>
            
            {/* Loading counter */}
            <div className="text-center">
                <div className="counter font-[PPNeueMontreal] text-white text-[15vw] md:text-[10vw] font-bold tracking-tight">
                    0%
                </div>
                <p className="text-white/60 font-[PPNeueMontreal] text-[11px] uppercase tracking-[0.2em] mt-4">
                    Loading Experience
                </p>
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
        </div>
    )
}

export default Preloader