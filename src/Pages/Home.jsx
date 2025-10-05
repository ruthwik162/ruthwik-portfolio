import React, { useEffect, useRef } from 'react'
import Hero from '../Components/Hero'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Footer from '../Components/Footer'
import { ArrowRight, Hand, RocketIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Glassbox } from '../Components/Glassbox'
import { Environment, OrbitControls } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {

    const navigate = useNavigate();
    const button3Ref = useRef(null);
    const text3Ref = useRef(null);
    const circleRef = useRef(null);

    useGSAP(() => {


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

    })

    useEffect(() => {
        if (!button3Ref.current || !circleRef.current || !text3Ref.current) return;

        // Function to create hover animation
        const addHoverEffect = (button, circle, text) => {
            const tl = gsap.timeline({ paused: true });

            tl.to(circle, {
                scale: 39, // Circle expansion
                duration: 0.6,
                backgroundColor: "#6565FB",
                ease: "power3.out"
            })
                .to(
                    text,
                    {
                        x: "-0.5vw", // Text moves slightly
                        color: "#FFFFFF",
                        duration: 0.45,
                        ease: "power4.inout",
                    },
                    "<" // start simultaneously
                );

            // Hover in
            button.addEventListener("mouseenter", () => tl.play());
            // Hover out
            button.addEventListener("mouseleave", () => tl.reverse());
        };

        addHoverEffect(button3Ref.current, circleRef.current, text3Ref.current);

        // Ripple effect on click
        const addRippleEffect = (button) => {
            button.addEventListener("click", (e) => {
                const ripple = document.createElement("span");
                ripple.className = "ripple";
                ripple.style.left = `${e.offsetX}px`;
                ripple.style.top = `${e.offsetY}px`;
                button.appendChild(ripple);

                gsap.fromTo(
                    ripple,
                    { scale: 0, opacity: 0.5 },
                    {
                        scale: 10,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        onComplete: () => ripple.remove()
                    }
                );
            });
        };

        addRippleEffect(button3Ref.current);

    }, []);

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


                            <div className='end flex items-center justify-center xl:w-1/2 p-5 will-change-transform will-change-opacity gap-2 overflow-hidden'>
                                <div onClick={() => { navigate("/profile") }} ref={button3Ref} className="xl:w-45 md:w-39 w-39 rounded-full h-12 shadow-md flex overflow-hidden items-center justify-center">
                                    <button className="flex items-center justify-center font-[font2] gap-2 xl:text-[1.1vw] "> <span ref={circleRef} className="w-2 h-2 z-0 bg-black rounded-full "></span> <span ref={text3Ref} className="z-50 text-black flex items-center uppercase justify-center gap-2 ">Hire Me <ArrowRight /> </span></button>
                                </div>
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
