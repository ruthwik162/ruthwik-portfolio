import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { images } from '../assets/assets'

const Image = () => {
    const imgWrapperRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(
            imgWrapperRef.current,
            {
                clipPath: 'inset(0 100% 0 0 round 1.5rem)', // start hidden from right
            },
            {
                clipPath: 'inset(0 0% 0 0 round 1.5rem)', // fully visible, rounded corners intact
                duration: 3,
                ease: 'power3.out'
            }
        )


    }, [])

    return (
        <div className=' h-full relative flex flex-col   justify-center items-center'>
            {/* Main Image */}
            <div ref={imgWrapperRef} className='image md:w-[30vw] lg:w-[28vw] xl:w-[25vw] xl:h-[30vw] sm:w-[45vw]  w-[65vw] mt-[5vh] md:mt-[10vh] lg:mt-[5vh] xl:mt-[10vh] z-4 rounded-2xl relative overflow-hidden' >
                <div className=''>
                    <img
                        src={images.ruthwik}
                        alt=""
                        className='h-full w-full rounded-2xl hover:scale-105 transition-all duration-500 object-cover'
                    />
                </div>
            </div>

        </div>
    )
}

export default Image
