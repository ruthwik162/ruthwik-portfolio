import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React from 'react'
gsap.registerPlugin(SplitText)

const Aboutme = () => {

    useGSAP(()=>{

        const split = new SplitText(".text",{ types: "lines, words,chars" })
        const tl = gsap.timeline();
        tl.from(split.chars,{
            y:-180,
            duration:1,
            stagger:0.15,
            ease:"power3.inOut"
        })
    })

    return (
        <div className='w-full h-screen'>
            <div className=' overflow-hidden  '>
                <div className='overflow-hidden mt-[20vh]  '>
                    <div className=' text  leading-[9vw] text-[11vw] text-teal-900 border-y  md:text-[12vw] uppercase text-center md:leading-[10vw] py-1'>
                        About me
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Aboutme
