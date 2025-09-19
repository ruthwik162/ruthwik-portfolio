import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React from 'react'
import Image from '../Components/Image'
gsap.registerPlugin(SplitText)

const Aboutme = () => {

    useGSAP(() => {

        const split = new SplitText(".text", { types: "lines, words,chars" })
        const tl = gsap.timeline();
        tl.from(split.chars, {
            y: -180,
            duration: 1,
            stagger: 0.1,
            ease: "power3.inOut"
        })
    })

    return (
        <div className='w-full  min-h-screen relative'>
            <div className='w-[50vh] h-[50vh] absolute top-[20vh] right-1/2 rounded-2xl object-cover flex items-center justify-center '>
                <Image />
            </div>
            <div className=' overflow-hidden   '>
                <div className='overflow-hidden  mt-[20vh]   '>
                    <div className=' text  leading-[9vw] tracking-tighter text-[11vw] text-teal-900  font-poppins font-poppins-500  md:text-[12vw] uppercase text-end md:px-[5vh] md:leading-[10vw] py-1'>
                        About me
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Aboutme
