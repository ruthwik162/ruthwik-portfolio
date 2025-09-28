import React, { useRef } from 'react'
import Hero from '../Components/Hero'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Home = () => {

    const containRef = useRef(null);

    useGSAP(() => {

        gsap.set(containRef.current, { scale: 0.9 });

        gsap.to(containRef.current, {
            scale: 1,
            duration: 3,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containRef.current,
                start: "top 80%",
                end: "top 0%",
                scrub: true,
            },
        });

        gsap.utils.toArray(".num1").forEach((num) => {
            gsap.fromTo(
                num,
                { y: -180, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: num,
                        start: "top 3%",
                        end: "top -5%",
                        scrub: true,
                    },
                }
            );
        });
        gsap.utils.toArray(".num2").forEach((num) => {
            gsap.fromTo(
                num,
                { y: 180, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: num,
                        start: "top bottom%",
                        end: "top 37%",
                        scrub: true,
                    },
                }
            );
        });
    })

    return (
        <div className=' '>
            <section className='w-full '>
                <Hero />
            </section>
            <section className='w-full flex items-center justify-start min-h-screen'>
                <div className='overflow-hidden px-10'>
                    <div className='md:text-[5vw] md:leading-[5vw] font-[font2] '>
                        <h1>The <span className='text-gray-400 font-[font3]'>End</span>...</h1>
                    </div>
                    <div className='md:text-[5vw] md:leading-[5vw] font-[font2] '>
                        <h1>Not our Journey</h1>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
