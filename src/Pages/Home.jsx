import React, { useRef } from 'react'
import Hero from '../Components/Hero'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Footer from '../Components/Footer'
import { Hand, RocketIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Glassbox } from '../Components/Glassbox'
import { Environment, OrbitControls } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {

    const containRef = useRef(null);
    const boxRef = useRef(null);
    const fillRef = useRef(null);
    const navigate = useNavigate()

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

        gsap.from(".end", {
            y: 100,
            duration: 1.2,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".end",
                start: "top 60%",
            }
        })

        gsap.set(fillRef.current, { yPercent: 100 })
        const hoverTimeline = gsap.timeline({ paused: true })
        hoverTimeline.to(fillRef.current, { yPercent: 0, duration: 0.4, ease: "power3.inOut" })
        boxRef.current.addEventListener("mouseenter", () => hoverTimeline.play())
        boxRef.current.addEventListener("mouseleave", () => hoverTimeline.reverse())
    })

    return (
        <div className='  overflow-hidden relative' >
            

            <section className='w-full '>
                <Hero />
            </section>
            <section className='w-full  flex items-start flex-col justify-center min-h-screen'>
                <div className='overflow-hidden px-5 md:w-1/2'>
                    <div className='overflow-hidden'>
                        <div className='xl:text-[5vw] end text-[7vw] leading-[7vw] lg:text-[8vw] overflow-hidden lg:leading-[8vw] xl:leading-[5vw] font-[font2] '>
                            <h1>The <span className='text-gray-400 font-[font3]'>End</span>...</h1>
                        </div>
                    </div>
                    <div className='overflow-hidden'>
                        <div className='xl:text-[3vw] end text-[7vw] leading-[7vw] lg:text-[8vw] overflow-hidden lg:leading-[8vw] xl:leading-[3vw] font-[font2] '>
                            <h1>Not our Journey</h1>
                        </div>
                    </div>
                    <div className='w-full '>
                        <div className='overflow-hidden flex items-center justify-start gap-1'>
                            <div className='xl:text-[1.8vw] end text-[3vw] text-center mt-5 leading-[4vw] lg:text-[3vw] overflow-hidden lg:leading-[8vw] xl:leading-[2vw] font-[font2] '>
                                <h1>I'm in Next page</h1>
                            </div>
                            <div className="overflow-hidden end  relative bg-black w-[70%] md:w-[45%] lg:h-[5vw] md:h-[5vw] xl:h-[3vw] h-[9vw] mt-5 flex items-center   justify-center    rounded-3xl ">
                                <button
                                    ref={boxRef}
                                    type="submit"
                                    onClick={() => { navigate("/profile"); scrollTo(0, 0) }}
                                    className="  px-3 md:px-2 cursor-pointer py-5 md:py-10 lg:text-[2vw] lg:leading-[3vw] md:text-[2vw] xl:leading-[2vw] xl:text-[1.2vw] text-[4vw] w-full flex items-center justify-center   text-white font-[font2]   transform">
                                    <div ref={fillRef} className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-red-600 text-black">
                                        <h1 className="text-[2vw] flex items-center justify-center mt-1 lg:text-[2vw] lg:leading-[3vw] md:text-[2vw] xl:leading-[2vw] xl:text-[1.2vw] font-[font2] text-black">
                                            Let’s Build Something <RocketIcon />
                                        </h1>
                                    </div>
                                    Hire Me Today <Hand />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Footer />
                </div>

            </section>

        </div>
    )
}

export default Home
