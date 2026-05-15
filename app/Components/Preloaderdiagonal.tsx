"use client"
import React, { useEffect, useState } from 'react'
import gsap from 'gsap'

const PreloaderDiagonal = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        const timeline = gsap.timeline({
            onComplete: () => {
                setIsLoading(false)
                document.body.style.overflow = 'auto'
            }
        })

        // Text animation - fade in
        timeline.from('.preloader-text', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out'
        })

        // Counter animation
        timeline.to('.counter', {
            textContent: 100,
            duration: 1.5,
            ease: 'power2.inOut',
            snap: { textContent: 1 },
            onUpdate: function() {
                const counter = document.querySelector('.counter')
                if (counter) {
                    counter.textContent = Math.ceil(parseFloat(counter.textContent || '0'))
                }
            }
        }, '-=0.5')

        // Diagonal wipe using polygon clip-path
        timeline.to('.preloader-screen', {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            duration: 1.5,
            ease: 'power4.inOut',
        }, '-=0.3')

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    if (!isLoading) return null

    return (
        <div 
            className="preloader-screen fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        >
            {/* Main content */}
            <div className="preloader-text text-center space-y-6">
                <h1 className="font-[PPNeueMontreal] text-white text-[8vw] md:text-[5vw] font-bold tracking-tight">
                    Nagaruthwik
                </h1>
                
                <div className="flex items-center justify-center gap-4">
                    <div className="counter font-[PPNeueMontreal] text-white/60 text-[3vw] md:text-[2vw] font-semibold tabular-nums">
                        0
                    </div>
                    <div className="text-white/40 text-[11px] uppercase tracking-[0.15em]">
                        Loading
                    </div>
                </div>

                <div className="w-64 h-[1px] bg-white/10 mx-auto overflow-hidden">
                    <div className="h-full bg-white/40 w-0 animate-[loadingBar_2s_ease-in-out_forwards]" />
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[9px] uppercase tracking-[0.2em]">
                Full Stack Developer
            </div>
        </div>
    )
}

export default PreloaderDiagonal