import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { images } from '../assets/assets'

const Image = () => {
    const imgWrapperRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(
            imgWrapperRef.current,
            {
                clipPath: 'inset(0 100% 0 0 )', // start hidden from right
            },
            {
                clipPath: 'inset(0 0% 0 0 )', // fully visible, rounded corners intact
                duration: 3,
                ease: 'power3.out',
                scrollTrigger:{
                    trigger:imgWrapperRef.current,
                    start:"top 30%"
                }
            }
        )


    }, [])

    return (
        <div className=' h-full relative flex flex-col  justify-center items-center'>
            {/* Main Image */}
            <div ref={imgWrapperRef} className='image w-full h-full  z-4  relative overflow-hidden' >
                <div className=''>
                    <img
                        src={images.ruthwik}
                        loading='lazy'
                        alt=""
                        className='h-full w-full hover:scale-105 transition-all duration-500 object-cover'
                    />
                </div>
            </div>

        </div>
    )
}

export default Image
