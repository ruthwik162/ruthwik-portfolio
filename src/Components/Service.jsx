import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2Icon, Code, Lightbulb, Package2, Palette, TrendingUp } from "lucide-react";
import React from "react";
import { AiOutlineAntDesign, AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaCode, FaDiagramSuccessor } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Service = () => {

    const mobile = useMediaQuery({ maxWidth: 853 });

    useGSAP(() => {
        // Title animation
        gsap.utils.toArray(".text-main").forEach((title) => {
            gsap.fromTo(
                title,
                { y: 180, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 43%",
                        end: "top 30%",
                        scrub: true,
                    },
                }
            );
        });
        gsap.utils.toArray(".text-sec").forEach((title) => {
            gsap.fromTo(
                title,
                { y: -180, opacity: 1 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 20%",
                        end: "top -10%",
                        scrub: true,
                    },
                }
            );
        });

        // Line1 (from left)
        gsap.set(".line1", { xPercent: -60, opacity: 0 });
        gsap.to(".line1", {
            xPercent: `${mobile ? -13 : -12}`,
            opacity: 1,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".line1",
                start: "top 70%",
                end: "top 20%",
                scrub: true,
            },
        });

        // Line2 (from right)
        gsap.set(".line2", { xPercent: 20, opacity: 0 });
        gsap.to(".line2", {
            xPercent: `${mobile ? -18 : -21}`,
            opacity: 1,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".line2",
                start: "top 70%",
                end: "top 45%",
                scrub: true,
            },
        });

        gsap.set(".line3", { xPercent: -90, opacity: 1 });
        gsap.to(".line3", {
            xPercent: `${mobile ? -10 : -6}`,
            opacity: 1,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".line1",
                start: "top 70%",
                end: "top 12%",
                scrub: true,
            },
        });
    });

    return (
        <div className="w-full h-full overflow-hidden">
            {/* Main Title */}
            <div className="text-center overflow-hidden">
                <h1 className="md:text-[8vw] text-[10vw] text-main mt-[15vh] md:mt-[18vh] font-poppins font-poppins-500 uppercase text-black leading-[12vh]">
                    Architecture
                </h1>
            </div>
            <div className="text-center overflow-hidden">
                <p className="md:text-[2vw] text-[4vw] mt-[2vh] md:mt-[3vh] md:max-w-3xl z-50 text-sec text-start  ml-[2vh] md:ml-[10vh]  font-poppins font-poppins-200 uppercase text-black leading-[3vh]">
                    A positive social experience where anyone is welcome  to make a resolution , and launch it into the future
                </p>
            </div>

            {/* Line 1 */}
            <div className="line1 mt-[5vh] font-poppins-400 flex items-center gap-2 justify-center">
                <p className="md:text-[4vw]  uppercase text-[5vw] flex gap-2 items-center justify-center">Inspire <Lightbulb size={mobile ? 20 : 70} /></p>
                <span className="bg-red-600 w-8 h-1 rounded-full md:w-10 md:h-2 z-10"></span>
                <p className="md:text-[4vw] uppercase text-[5vw] flex gap-2 items-center justify-center">Impact <TrendingUp size={mobile ? 20 : 60} />  </p>
            </div>

            {/* Line 2 */}
            <div className="line2 mt-[5vh] md:mt-0 flex font-poppins-400 items-center gap-2 justify-center  ">
                <p className="md:text-[4vw] uppercase text-[5vw] flex gap-1 items-center justify-center">Design <Palette size={mobile ? 20 : 60} /></p>
                <span className="bg-red-600 w-8 h-1 rounded-full md:w-10 md:h-2 z-10"></span>
                <p className="md:text-[4vw] uppercase text-[5vw] flex gap-2 items-center justify-center">Develop <Code size={mobile ? 20 : 60} /></p>
            </div>

            <div className="line3 mt-[5vh] md:mt-0 font-poppins-400 flex items-center gap-2 justify-center">
                <p className="md:text-[4vw] uppercase text-[5vw] flex gap-2 items-center justify-center">Deliver <Package2 size={mobile ? 20 : 60} /></p>
                <span className="bg-red-600 w-8 h-1 rounded-full   md:w-10 md:h-2 z-10"></span>
                <p className="md:text-[4vw] uppercase text-[5vw] flex gap-2 items-center justify-center">Success <CheckCircle2Icon size={mobile ? 20 : 60} /></p>
            </div>
        </div>
    );
};

export default Service;
