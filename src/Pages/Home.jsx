import React from 'react'
import Hero from '../Components/Hero'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Home = () => {

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
                        start: "top 43%",
                        end: "top 35%",
                        scrub: true,
                    },
                }
            );
        });
    })

    return (
        <div className=''>
            <section className='w-full '>
                <Hero />
            </section>
            <section className="w-full h-screen page3">
                <div className=" overflow-hidden flex  ">
                    <div className="overflow-hidden mt-[15vh] ">
                        <div className="md:ml-[5vh]  ml-[3vh]  font-poppins-400 text-[5vh] text-center md:text-[4vw]">
                            <h1 className="num1  md:leading-[3.2vw]  tracking-tighter ">.03</h1>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="overflow-hidden  md:ml-[5vh] ml-[3vh] mt-[15vh]  text-[5vh] text-start md:text-[4vw]">
                            <h1 className="num2 font-poppins-500  md:leading-[3.5vw] tracking-tight ">Skills </h1>
                        </div>
                    </div>
                </div>

            </section>


        </div>
    )
}

export default Home
