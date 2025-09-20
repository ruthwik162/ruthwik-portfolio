import React, { useRef, useState } from "react";
import { contact, links } from "../assets/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const topline = useRef(null);
  const bottomline = useRef(null);
  const contactRef = useRef([]);
  const socailRef = useRef([]);

  const [open, setOpen] = useState(false);

  const openTl = useRef(null);
  const closeTl = useRef(null);
  const iconTl = useRef(null);
  const pillRef = useRef(null);
  const iconRef = useRef(null);

  const navigate = useNavigate();

  useGSAP(() => {
    // Initial hidden state
    gsap.set(navRef.current, { yPercent: 100 });
    gsap.set(linksRef.current, { y: 100, opacity: 0 });
    gsap.set(contactRef.current, { y: -100, opacity: 0 });
    gsap.set(socailRef.current, { x: -100, opacity: 0 });
    gsap.set(".line", { height: "0%" });

    // ✅ Open timeline with stagger
    openTl.current = gsap.timeline({ paused: true })
      .to(navRef.current, {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.inOut",
      })
      .to(".line", {
        height: "100%",
        duration: 0.5,
        ease: "power2.out"
      })
      .to(
        linksRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.5"
      )

      .to(
        contactRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.8"
      )
      .to(
        socailRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.8"
      );

    // ✅ Close timeline
    closeTl.current = gsap.timeline({ paused: true })
      .to(socailRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
        stagger: 0.02,
      })
      .to(
        contactRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power3.in",
          stagger: 0.02,
        },
        "-=0.3"
      )
      .to(
        linksRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power3.in",
          stagger: 0.02,
        },
        "-=0.3"
      )
      .to(
        navRef.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.2"
      );

    // ✅ Icon (hamburger → X)
    iconTl.current = gsap.timeline({ paused: true })
      .to(topline.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.9,
        ease: "power3.inOut",
      })
      .to(
        bottomline.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.9,
          ease: "power3.inOut",
        },
        "<"
      );
  }, []);

  const toggleMenu = () => {
    if (open) {
      // closing
      closeTl.current.play(0);
      iconTl.current.reverse();


    } else {
      // opening
      openTl.current.play(0);
      iconTl.current.play();
      gsap.from(".letter", {
        opacity: 1,
        y: 300,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      }).play();

    }

    setOpen(!open);
  };



  return (
    <>
      {/* Nav Overlay */}
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-around w-full h-full md:px-10 px-5  bg-black/90 backdrop-blur-2xl text-white/80"
      >
        <h1 className="letter absolute md:block hidden md:-bottom-[10vh] text-white/50 -bottom-[6vh] right-[19vw] md:right-[53vh] font-[font2] text-[17vh] md:text-[30vh]">  M </h1>
        <h1 className="letter absolute -bottom-[16vh] md:leading-[42vw] n md:block right-[19vh] md:-bottom-[21vh] md:right-[20vh] font-[font2] text-[38vh] md:text-[50vh]"> N</h1>
        <h1 className="letter absolute md:-bottom-[10vh] text-white/50 -bottom-[6vh] right-[19vw] md:right-[5vh] font-[font2] text-[17vh] md:text-[30vh]">R</h1>

        <div className="flex flex-col md:ml-[50%] items-center justify-start md:-mt-[20vh] md:flex-row">
          <div className="relative -ml-[13vh] md:ml-0  -mt-[13vh] pt-2  md:mt-0 md:pt-0  md:w-full flex flex-col font-poppins font-poppins-400 text-4xl gap-y-3 md:text-6xl lg:text-[3vw] ">
            {["Home", "About Me", "Projects", "Contact", "Services"].map(
              (text, index) => (
                <div className="overflow-hidden" key={index}>
                  <div
                    ref={(el) => (linksRef.current[index] = el)}
                    className="overflow-hidden flex gap-10"
                  >
                    <h2
                      onClick={() => {
                        navigate(
                          text === "Home"
                            ? "/"
                            : `/${text.toLowerCase().replace(/\s+/g, "-")}`
                        );
                        setOpen(false);
                        closeTl.current.play(0);
                        scrollTo(0, 0);
                        iconTl.current.reverse();
                      }}
                      className="transition-all duration-300 hover:text-white cursor-pointer"
                    >
                      {text}
                    </h2>
                  </div>
                </div>
              )
            )}
            <hr className="md:hidden block " />
          </div>
          <span className="bg-white w-0.5 h-full md:block hidden line "></span>

          <div className="flex md:flex-row flex-col md:items-start md:mx-10 mt-[5vh] items-end justify-start md:justify-start md:gap-10">
            <div className="relative flex flex-col font-light">
              {contact.map(({ detail, icon: Icon }, ind) => (
                <div className="overflow-hidden" key={ind}>
                  <div
                    ref={(el) => (contactRef.current[ind] = el)}
                    className="overflow-hidden flex gap-2 items-start justify-start"
                  >
                    <h5 className="transition-all flex text-sm md:text-md duration-300 gap-1 hover:text-orange-500 text-white cursor-pointer">
                      <Icon className="text-xl" />:
                      <span className="lowercase font-[font2]">{detail}</span>
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex flex-col font-light">
              {links.map(({ name, href, icon: Icon }, idx) => (
                <div className="overflow-hidden" key={idx}>
                  <div
                    ref={(el) => (socailRef.current[idx] = el)}
                    className="overflow-hidden items-start justify-start flex flex-col"
                  >
                    <a
                      href={href}
                      className="transition-all font-[font2] flex gap-1 text-sm md:text-md duration-300 hover:text-orange-500 text-white cursor-pointer"
                    >
                      <Icon className="text-2xl" /> {name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Top Bar */}
      <div className="fixed z-50 md:mx-10 mx-3 flex items-center justify-between w-full">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
          className={`text-[7vh] transition-all duration-1000 font-[font2] ${!open ? "text-black" : "text-white"}`}
        >
          R
        </Link>        <div
          ref={pillRef}
          onClick={toggleMenu}
          className={`menu-pill flex absolute z-50 top-[2vh] right-[3vh] md:top-[1.9vh] md:right-[8.7vh] items-center justify-between px-2  cursor-pointer h-10 rounded-full bg-black transition-all duration-900 ${open ? "w-11" : "w-22"}`} >
          <h1 className="text-white text-[1.5vh] font-bold transition-all -px-3 duration-700 uppercase"> Menu  </h1>
        </div>

        {/* Orange icon */}
        <div
          ref={iconRef}
          onClick={() => { toggleMenu() }}
          className={`menu-icon z-50 flex cursor-pointer flex-col items-center justify-center gap-1 absolute top-[2.6vh] right-[3.5vh] md:top-[2.4vh] md:right-[9.2vh] bg-orange-500 transition-all duration-700 rounded-full w-8 h-8 md:w-8 md:h-8 ${open ? "scale-130" : "scale-100"} `} >
          <span ref={topline} className="h-[0.29vh] w-5 block origin-center rounded-full bg-black"  ></span>
          <span ref={bottomline} className="h-[0.29vh] w-5 block origin-center rounded-full bg-black" ></span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
