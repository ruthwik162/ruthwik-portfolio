import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Braces, Bubbles, Building, Lightbulb } from 'lucide-react';
import React, { useRef } from 'react'

const GridLayout = () => {
    const containerRef = useRef(null);
    const left1Slide = useRef(null);
    const left2Slide = useRef(null);

    const right1Slide = useRef(null);
    const right2Slide = useRef(null);

    const centerSlide = useRef(null);
    const c1 = useRef(null);
    const c2 = useRef(null);
    const c3 = useRef(null);
    const c4 = useRef(null);

    useGSAP(() => {
        gsap.set(left1Slide.current, { yPercent: -100, willChange: "transform" });
        gsap.set(left2Slide.current, { yPercent: 100, willChange: "transform" });

        gsap.set(right1Slide.current, { yPercent: -100, willChange: "transform" });
        gsap.set(right2Slide.current, { yPercent: 100, willChange: "transform" });

        gsap.set(c1.current, { xPercent: -110, willChange: "transform" })
        gsap.set(c2.current, { yPercent: -110, willChange: "transform" });
        gsap.set(c3.current, { yPercent: 110, willChange: "transform" })
        gsap.set(c4.current, { xPercent: 110, willChange: "transform" })


        gsap.to(left1Slide.current, {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.inOut"
        })
        gsap.to(left2Slide.current, {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.inOut"
        })

        gsap.to(right1Slide.current, {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.inOut"
        })
        gsap.to(right2Slide.current, {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.inOut"
        })
        gsap.to(c1.current, {
            xPercent: 0,
            duration: 1.5,
            ease: "power4.inOut"
        })
        gsap.to(c2.current, {
            yPercent: 0,
            duration: 1.5,
            ease: "power4.inOut"
        })
        gsap.to(c3.current, {
            yPercent: 0,
            duration: 1.5,
            ease: "power4.inOut"
        })
        gsap.to(c4.current, {
            xPercent: 0,
            duration: 1.5,
            ease: "power4.inOut"
        })

    })

    return (
        <div className='w-full h-[30vh] xl:h-[50vh] overflow-hidden p-2 '>

            <div ref={containerRef} className="container w-full h-full flex items-center mx-auto rounded-sm overflow-hidden will-change-transform  gap-1 justify-center">
                {/* left slide */}
                <div className='w-[22%] h-screen flex flex-col items-center justify-center gap-1 '>
                    <div ref={left1Slide} className='w-full h-[50%] xl:h-[60%] bg-zinc-700 text-center flex flex-col items-center justify-around'>
                        <h1 className=' text-[2vw]  max-w-sm  font-[font2] leading-[2vw] text-white  mix-blend-difference'>Every Idea into a Mind Craft</h1>
                        <Braces className='text-white mix-blend-difference xl:w-[5vw] xl:h-[5vw]' strokeWidth={1} />
                    </div>
                    <div ref={left2Slide} className='w-full h-[40%] bg-lime-400'>
                    </div>

                </div>

                {/* center slide */}
                <div ref={centerSlide} className='w-[56%] h-screen  grid-cols-2 items-center overflow-hidden  gap-1  justify-center'>
                    <div className='w-full h-[50%] flex items-start justify-center gap-1 py-1 overflow-hidden '>
                        <div ref={c1} className='w-[60%] h-full bg-yellow-400'></div>
                        <div ref={c2} className='w-[40%] h-full bg-cyan-400'></div>
                    </div>
                    <div className='w-full h-full flex items-center justify-center gap-1 overflow-hidden  '>
                        <div ref={c3} className='w-[40%] h-full   overflow-hidden'>
                            <div className='w-full h-full bg-orange-400'>
                            </div>
                        </div>
                        <div ref={c4} className='w-[60%] h-full bg-pink-900'></div>
                    </div>

                </div>

                {/* rightslide */}
                <div className='w-[22%] h-screen flex flex-col overflow-hidden items-center gap-1 justify-center'>
                    <div ref={right1Slide} className='w-full h-[40%] bg-red-900'>
                    </div>
                    <div ref={right2Slide} className='w-full h-[50%] xl:h-[60%] bg-black text-center flex flex-col items-center justify-around'>
                        <h1 className=' text-[2vw] font-[aeonik2] leading-[1.5vw]   max-w-sm  mix-blend-difference text-white '>Rightfull Thoughts</h1>
                        <Lightbulb strokeWidth={0.5} className='text-white xl:w-[5vw] xl:h-[5vw]' />

                    </div>
                </div>


            </div>

        </div>
    )
}

export default GridLayout
