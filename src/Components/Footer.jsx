import React, { useRef } from "react";
import { links } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlEnvolope } from "react-icons/sl";
import { MdEmail } from "react-icons/md";
import GsapMarquee from "./GsapMarquee";

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const today = new Date().toLocaleDateString();

    const hoverFillRef = useRef([]);
    const linksRef = useRef([]);
    const mobile = window.innerWidth < 786;

    useGSAP(() => {
        hoverFillRef.current.forEach((fill) => {
            gsap.set(fill, { xPercent: -100 });
        });

        linksRef.current.forEach((link, i) => {
            const fill = hoverFillRef.current[i];

            link.onmouseenter = () => {
                gsap.to(fill, {
                    xPercent: 0,
                    duration: 0.6,
                    ease: "power3.inOut",
                });
            };

            link.onmouseleave = () => {
                gsap.to(fill, {
                    xPercent: 100,
                    duration: 0.6,
                    ease: "power3.inOut",
                    onComplete: () => gsap.set(fill, { xPercent: -100 }),
                });
            };
        });

        gsap.from(".date", {
            y: 100,
            duration: 1,
            stagger: 0.1,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: ".date",
                start: mobile ? "bottom 70%" : "top bottom",
            }
        })

        gsap.from(".link", {
            y: -100,
            duration: 1,
            stagger: 0.1,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: ".link",
                start: mobile ? "bottom 90%" : "top bottom",
            }
        })

        gsap.from(".textN", {
            y: 100,
            duration: 2,
            stagger: 0.2,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: ".con",
                start: mobile ? "top 100%" : "top bottom",
            }
        })
        gsap.from(".back", {
            x: 200,
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: ".back",
                start: mobile ? "bottom 90%" : "top bottom",
            }
        })
        gsap.from(".emails", {
            y: 100,
            duration: 2,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: ".legal",
                start: mobile ? "bottom 95%" : "top bottom",
            }
        })
        gsap.from(".legal", {
            y: 100,
            duration: 2,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: ".legal",
                start: mobile ? "bottom 95%" : "top bottom",
            }
        })
    }, []);

    // Back to top scroll
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full h-full md:h-[30vh] pb-[10vw] xl:pb-0 font-poppins p-5 mt-[10vw] md:mt-[5vw] ">
            <div className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-5 px-[10vw] md:px-[4vw] xl:px-[3vw] md:gap-10">
                {/* Brand / Identity */}
                <div className="overflow-hidden">
                    <div className="overflow-hidden">
                        <div className="flex date items-center font-[aeonik2] gap-3">
                            <h2 className="text-xl md:text-[1.8vw] lg:text-[1.5vw] text-[3vw] xl:text-[1vw]">
                                {today}
                            </h2>
                            <p className="xl:text-[1.1vw] md:text-[1.3vw] lg:text-[1.5vw] text-[3.5vw]">
                                India
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start font-[aeonik2] space-y-0.5">
                    {links.map(({ name, href, icon: Icon }, index) => (
                        <div
                            key={index}
                            ref={(el) => (linksRef.current[index] = el)}
                            className="xl:text-[1.5vw] xl:leading-[1.1vw] flex lg:text-[2vw] md:text-[2.5vw]"
                        >
                            <div className="overflow-hidden ">
                                <div className="overflow-hidden">
                                    <a href={href} className="flex link items-center flex-col justify-center">
                                        <span className="flex items-center justify-center"><Icon className="mr-1" /> {name} <ArrowRight className="-rotate-45" /></span>
                                        <div className="w-full h-[0.15vw] overflow-hidden">
                                            <div
                                                ref={(el) => (hoverFillRef.current[index] = el)}
                                                className="w-full h-full bg-black"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="overflow-hidden">
                    <div className="font-[font2] xl:text-[1vw] lg:text-[2vw] md:text-[2.5vw] text-[4vw]">
                        <div className=" ">
                            <span className="flex legal items-center justify-center">
                                <a href="mailto:nagaruthwikmerugu162@gmail.com" > Email</a>

                            </span>

                        </div>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <div className="overflow-hidden">
                        <div className="flex legal flex-col justify-center items-end xl:text-[0.8vw] lg:text-[2vw] md:text-[1.5vw] font-[font1] text-[2.8vw] space-y-0.5">
                            <p className="email">© {currentYear} Nagaruthwik. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="text-end xl:text-[1.5vw]  lg:text-[2.1vw] md:text-[2.5vw] mt-[5vw] text-[5vw] font-[font2]">
                    <button onClick={scrollToTop} className="underline back cursor-pointer text-end">
                        Back to Top ↑
                    </button>
                </div>
            </div>

            {/* Big Signature */}
            <div className="flex items-center con flex-col overflow-hidden w-full h-full mx-auto justify-center">
                <div className="overflow-hidden  text-[8vw] leading-[15vw] md:text-[7vw] md:leading-[9vw] xl:text-[5vw] xl:leading-[7vw]">
                    <div className="textN md:block hidden">
                        <GsapMarquee speed={25}>
                            <span>Nagaruthwik ©</span>
                            <span>Nagaruthwik ©</span>
                            <span>Nagaruthwik ©</span>
                        </GsapMarquee>
                    </div>
                    <div className="textN md:hidden block">
                        Nagaruthwik ©
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
