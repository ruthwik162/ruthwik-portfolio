import React from 'react'
import TextReveal from './TextReveal'

const Banner = () => {
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-between bg-white px-6 py-12 md:px-12 md:py-16 overflow-hidden">
            
            {/* Top Minimal Header / Meta Row */}
            <div className="w-full flex justify-between items-start text-xs font-mono uppercase tracking-tight text-neutral-400 mix-blend-difference z-10">
                <div>[ Selected Work — Portfolio '26 ]</div>
                <div className="text-right">Available for Projects</div>
            </div>

            {/* Center Main Hook */}
            <div className="w-full flex-1 flex items-center  justify-center ">
                <TextReveal duration={1.2} stagger={0.08}>
                    <h1 className="text-center font-[Animo] text-[18vw]  md:text-[12vw] lg:text-[14vw] space-y-0.5 font-medium leading-[0.8] tracking-[-0.03em] text-black  max-w-[90vw] lg:max-w-[85vw]">
                        Making the complex simple.
                    </h1>
                </TextReveal>
            </div>

            {/* Bottom Swiss-Grid / Meaning Statements */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-neutral-200 pt-8 mt-auto z-10">
                
                {/* Section 1: The Philosophy */}
                <div className="md:col-span-4 md:col-start-4">
                    <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">01 / Concept</p>
                    <p className=" text-xs text-neutral-800 font-normal leading-tight max-w-sm">
                        We strip away the noise to craft precise, high-performance digital narratives that feel entirely effortless.
                    </p>
                </div>

                {/* Section 2: The Execution */}
                <div className="md:col-span-5 md:col-start-8">
                    <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">02 / Execution</p>
                    <p className="text-xs text-neutral-800 font-normal leading-tight max-w-md">
                        Bridging the gap between cinematic motion design and robust, fluid engineering to build memorable digital products.
                    </p>
                </div>


            </div>
        </div>
    )
}

export default Banner