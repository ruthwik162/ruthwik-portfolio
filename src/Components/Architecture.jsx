import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { ArrowBigRight, ArrowBigRightIcon, ArrowRight, ArrowUpRight, Code2, Lightbulb, PenTool, Plus, Rocket, RocketIcon, Server, Users, Zap } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { BsArrowReturnRight } from "react-icons/bs";

const roles = [
  {
    title: "Inspire - Impact",
    desc: "Crafting innovative solutions that leave a lasting impression.",
    icon: <Lightbulb strokeWidth={1.2} className="role-icon w-6 h-6 md:w-10 md:h-10" />,
  },
  {
    title: "Design - Develop",
    desc: "From wireframes to scalable code, we turn ideas into reality.",
    icon: <PenTool strokeWidth={1.2} className="role-icon w-6 h-6 md:w-10 md:h-10" />,
  },
  {
    title: "Deliver - Deploy",
    desc: "On-time delivery with seamless deployment and ongoing support.",
    icon: <Rocket strokeWidth={1.2} className="role-icon w-6 h-6 md:w-10 md:h-10" />,
  },
];
const services = [
  {
    title: "Frontend Excellence",
    desc: "React, Next.js, and cutting-edge frameworks for immersive user experiences.",
    icon: <Code2 strokeWidth={1.5} className="service-icon w-5 h-5 md:w-7 md:h-7" />,
  },
  {
    title: "Backend Power",
    desc: "Robust server architecture with Node.js, Java & Spring Boot.",
    icon: <Server strokeWidth={1.5} className="service-icon w-5 h-5 md:w-7 md:h-7" />,
  },
  {
    title: "Performance Optimization",
    desc: "Lightning-fast applications with optimized loading and smooth interactions.",
    icon: <Zap strokeWidth={1.5} className="service-icon w-5 h-5 md:w-7 md:h-7" />,
  },
  {
    title: "User-Centric Design",
    desc: "Intuitive interfaces that prioritize user needs and engagement.",
    icon: <Users strokeWidth={1.5} className="service-icon w-5 h-5 md:w-7 md:h-7" />,
  },
];


const Architecture = () => {
  const rolesRef = useRef([]);
  const audioRef = useRef(null);
  const unlockedRef = useRef(false);
  const arrowRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const planRef = useRef(null);
  const arrow2Ref = useRef(null);
  const mobile = useMediaQuery({ maxWidth: 853 });
  const bottomRef = useRef(null);
  const arrow3Ref = useRef(null);


  // ✅ Arrow Animation
  useGSAP(() => {

    gsap.from(".textS", {
      y: -100,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".textS",
        start: mobile ? "top 60%" : "top 60%",
      }
    })
    gsap.from(".textSS", {
      y: 100,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".textS",
        start: mobile ? "top 50%" : "top 60%",
      }
    })
    gsap.from(".textSSS", {
      y: 100,
      duration: 1,
      rotate: 7,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".textSS",
        start: mobile ? "top 50%" : "top 60%",
        end: mobile ? "top 20%" : "top 5%",
        scrub: true,
      }
    })

    gsap.set(arrowRef.current, { x: -75, opacity: 1 });

    headingWrapperRef.current.addEventListener("mouseenter", () => {
      gsap.to(arrowRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    headingWrapperRef.current.addEventListener("mouseleave", () => {
      gsap.to(arrowRef.current, {
        x: -75,
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut",
      });
    });
    gsap.set(arrow2Ref.current, { x: -75, opacity: 1 });

    planRef.current.addEventListener("mouseenter", () => {
      gsap.to(arrow2Ref.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    planRef.current.addEventListener("mouseleave", () => {
      gsap.to(arrow2Ref.current, {
        x: -75,
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut",
      });
    });

    gsap.set(arrow3Ref.current, { x: -65, opacity: 1 });

    bottomRef.current.addEventListener("mouseenter", () => {
      gsap.to(arrow3Ref.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    bottomRef.current.addEventListener("mouseleave", () => {
      gsap.to(arrow3Ref.current, {
        x: -75,
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut",
      });
    });
  });

  useEffect(() => {
    // ✅ Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ GSAP + hover with audio unlock
    rolesRef.current.forEach((el) => {
      if (!el) return;
      const fill = el.querySelector(".fill");
      const text = el.querySelector(".role-text");
      const icon = el.querySelector(".role-icon");

      gsap.set(fill, { scaleY: 0, transformOrigin: "bottom" });

      el.addEventListener("mouseenter", () => {
        gsap.to(fill, { scaleY: 1, duration: 0.5, ease: "power2.out" });
        gsap.to([text, icon], {
          color: "#ffffff",
          duration: 0.3,
          ease: "power2.out",
        });

        if (audioRef.current) {
          if (!unlockedRef.current) {
            audioRef.current
              .play()
              .then(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                unlockedRef.current = true;
                console.log("Audio unlocked ✅");
              })
              .catch((err) =>
                console.log("Unlock failed (first hover):", err)
              );
          } else {
            audioRef.current.currentTime = 0;
            audioRef.current
              .play()
              .catch((err) => console.log("Playback failed:", err));
          }
        }
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(fill, { scaleY: 0, duration: 0.5, ease: "power3.out" });
        gsap.to([text, icon], {
          color: "#000000",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);

  return (
    <div className="z-0 w-full h-full mx-[1vh] md:mt-0 md:mx-[5vh] flex flex-col items-start justify-start">
      {/* ✅ Arrow + Title */}
      <div ref={headingWrapperRef} className="overflow-hidden  leading-[3vh] md:w-[35%] border-gray-200 cursor-pointer mx-2" >
        <div ref={arrowRef} className="overflow-hidden flex items-center justify-start">
          <ArrowRight className="w-8 h-8 md:w-20 md:h-15 text-black" strokeWidth={1} />
          <h2 className="text-[12vw] md:text-[3vw] flex items-center font-poppins tracking-tighter font-poppins-200 px-12 md:px-0 mt-5 gap-4  mb-6"  >
            Architecture
          </h2>
        </div>
      </div>

      {/* ✅ Roles */}
      <div className="w-full max-w-3xl font-[font2]">
        {roles.map((role, i) => (
          <div
            key={i}
            ref={(el) => (rolesRef.current[i] = el)}
            className="relative overflow-hidden border-b border-gray-200 cursor-pointer"
          >
            <div className="relative  md:gap-[20vh] px-2 z-10">
              <span className="role-text textS flex items-center flex-row-reverse gap-3 justify-between text-[8vw] md:text-[2.5vw] text-black">
                <ArrowUpRight strokeWidth={1.1} className="" />
                <span className="flex items-center gap-1">
                  {role.icon}
                {role.title}
                </span>
              </span>
            </div>
            <div className="fill absolute inset-0 bg-black z-0"></div>
          </div>
        ))}
      </div>

      {/* ✅ Plans */}
      <div className="md:ml-[45%]  md:mt-2 ">
        <div ref={planRef} className="overflow-hidden md:w-[35%] leading-[5vh] border-gray-200 cursor-pointer mx-2" >
          <div ref={arrow2Ref} className="overflow-hidden flex items-center justify-center">
            <ArrowRight className="w-8 h-8 md:w-13 md:h-13 text-black" strokeWidth={1.5} />
            <h2 className="text-[12vw] md:text-[3vw] mt-5 md:leading-[2vw]  font-poppins tracking-tighter font-poppins-200 flex items-center gap-4 px-5 md:px-3 font-[font2] mb-6"  >
              Strategy
            </h2>
          </div>
        </div>
        <div className="w-full font-[font2]">
          {roles.map((role, i) => (
            <div
              key={i}
              className="relative overflow-hidden  cursor-pointer"
            >
              <div className="relative flex items-start justify-start md:justify-start md:gap-[20vh] px-2 z-10">
                <span className="role-text textSS flex text-justify items-center gap-3 justify-center text-[5vw] md:text-[1.7vw] text-black">
                 <BsArrowReturnRight strokeWidth={0.05}  /> {role.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ✅ Plans */}
      <div className="w-full  ">
        <div ref={bottomRef} className="overflow-hidden  cursor-pointer w-full md:w-[20%]" >
          <div ref={arrow3Ref} className="flex items-center">
            <ArrowRight className="w-8 h-8 md:w-13 md:h-13 text-black" strokeWidth={1.5} />
            <h2 className="text-[9vw] md:text-[2vw] font-poppins tracking-tighter font-poppins-300 flex items-center px-10 md:px-5 md:mt-0 mt-[2vh] gap-2 font-[font2]">
              [ Service ]
            </h2>
          </div>
        </div>
        {services.map((s, i) => (
          <div
            key={i}
            className="relative max-w-7xl font-[font2] overflow-hidden border-b  border-gray-200"
          >
            <div className="relative textSSS flex flex-col md:flex-row  items-start md:items-center gap-1    z-10">
              <span className="role-text textSSS flex items-center gap-3 text-[5vw] md:text-[1.7vw] text-black">
                {s.icon} {s.title} <span className="bg-red-700 md:block rounded-full hidden w-6 h-2"></span><span className="md:block hidden">{s.desc}</span>
              </span>

            </div>
          </div>
        ))}
      </div>


      <div className="mt-12 w-full md:ml-[50%] max-w-4xl font-[font2] ">
        <h3 className="text-[10vw] md:text-[2.5vw] font-poppins tracking-tighter font-poppins-300 mb-4">Vision & Mission</h3>
        <div className="overflow-hidden leading-[5vh]">
          <p className="text-lg md:text-xl textSSS text-black leading-relaxed">
            We believe in merging creativity with technology to build experiences that matter.
          </p>
        </div>
        <div className="overflow-hidden leading-[5vh]">
          <p className="text-lg md:text-xl textSSS text-black leading-relaxed">
            Our mission is to empower ideas, scale innovation, and deliver impact that lasts.
          </p>
        </div>
      </div>

      {/* ✅ CTA */}
      <div className="mt-5">
        <button className="md:px-8 px-2 py-2 flex items-center justify-center gap-1 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition text-lg md:text-xl shadow-lg">
          Let’s Build Something Great <RocketIcon />
        </button>
      </div>

      {/* ✅ Hover Sound */}
      <audio
        ref={audioRef}
        src="https://www.soundjay.com/buttons/sounds/button-50.mp3"
        preload="auto"
      />
    </div>
  );
};

export default Architecture;
