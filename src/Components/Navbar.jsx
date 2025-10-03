import React, { useRef, useState } from "react";
import { contact, links } from "../assets/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
  const hoverFillRef = useRef([]);

  const navigate = useNavigate();

  useGSAP(() => {
    // Initial hidden state
    gsap.set(navRef.current, { yPercent: 100 });
    gsap.set(linksRef.current, { y: 100, opacity: 0 });
    gsap.set(contactRef.current, { y: -100, opacity: 0 });
    gsap.set(socailRef.current, { x: -100, opacity: 0 });
    gsap.set(".line", { height: "0%" });

    // Hover underline setup
    hoverFillRef.current.forEach((fill) => {
      gsap.set(fill, { xPercent: -110 });
    });

    // Add hover events for each link underline
    linksRef.current.forEach((link, i) => {
      const fill = hoverFillRef.current[i];

      link.onmouseenter = () => {
        gsap.to(fill, {
          xPercent: 0,
          duration: 1,
          ease: "power3.inOut",
        });
      };

      link.onmouseleave = () => {
        gsap.to(fill, {
          xPercent: 100,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => gsap.set(fill, { xPercent: -100 }), // reset
        });
      };
    });

    // ✅ Open timeline
    openTl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.inOut",
      })
      .to(".line", {
        height: "100%",
        duration: 0.5,
        ease: "power2.out",
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
    closeTl.current = gsap
      .timeline({ paused: true })
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
    iconTl.current = gsap
      .timeline({ paused: true })
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
      closeTl.current.play(0);
      iconTl.current.reverse();
    } else {
      openTl.current.play(0);
      iconTl.current.play();
      gsap.from(".letter", {
        opacity: 1,
        y: 300,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      }).play();
    }
    setOpen(!open);
  };

  return (
    <>
      {/* Nav Overlay */}
      <nav
        ref={navRef}
        className="fixed z-50 overflow-hidden flex flex-col justify-around w-full h-screen md:px-10 px-5 bg-black/90 backdrop-blur-2xl text-white/80"
      >
        {/* Floating letters */}
        <h1 className="letter absolute md:block hidden xl:-bottom-[10vh] text-white/50 -bottom-[6vh] right-[19vw] md:left-[2vw] xl:left-[58vw] font-[font2] text-[17vh] md:text-[30vw] xl:text-[30vh]">
          M
        </h1>
        <h1 className="letter absolute -bottom-[16vh] md:leading-[42vw] text-white/50  md:block right-[19vh] xl:-bottom-[21vh] md:-bottom-[1vw] md:left-[30vw] xl:left-[70vw] font-[font2] text-[38vh] md:text-[50vw] xl:text-[25vw]">
          N
        </h1>
        <h1 className="letter absolute xl:-bottom-[10vh] text-white/50 -bottom-[6vh] right-[19vw] xl:right-[5vh] font-[font2] text-[17vh] md:right-[4vw] md:-bottom-[12vw] md:text-[40vw] xl:text-[30vh]">
          R
        </h1>

        <div className="flex flex-col md:ml-[50%] items-center justify-start md:-mt-[20vh] md:flex-col">
          <div className="relative -ml-[13vh] md:ml-0  -mt-[13vh] pt-2 md:mt-0 md:pt-0  flex flex-col font-[font2] text-4xl gap-y-3 md:text-6xl lg:text-[7vw] xl:text-[4vw]">
            {["Profile", "capability", "Projects", "Contact"].map((text, index) => (
              <div className="overflow-hidden" key={index}>
                <div
                  key={index}
                  ref={(el) => (linksRef.current[index] = el)}
                  className="flex "
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
                   className="flex items-start cursor-pointer flex-col justify-center">
                    <span className="flex items-center justify-center">{text} <ArrowRight strokeWidth={0.8} className="-rotate-45 inline-block xl:w-15 xl:h-15 lg:h-18 lg:w-18 md:w-18 md:h-18 w-10 h-10" /></span>
                    <div className="w-full h-[0.15vw] overflow-hidden rounded">
                      <div
                        ref={(el) => (hoverFillRef.current[index] = el)}
                        className="w-full h-full bg-white"
                      />
                    </div>
                  </h2>
                </div>
              </div>
            ))}
            <hr className="md:hidden block" />
          </div>
          <span className="bg-white w-0.5 h-full md:block hidden line"></span>

          <div className="flex md:flex-row flex-col md:items-start md:mx-10 mt-[5vh] items-end justify-start md:justify-start md:gap-10">
            {/* Contact */}
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

            {/* Social Links */}
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
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
          className={`md:text-[2vw] md:leading-[3vw] md:mt-[2vw] mt-[5vw] xl:text-[1vw] xl:leading-[2vw] text-[3.5vw] transition-all duration-1000 font-[aeonik2] ${!open ? "text-black" : "text-white"
            }`}
        >
          Nagaruthwik ©
        </Link>
        <div
          ref={pillRef}
          onClick={toggleMenu}
          className={`menu-pill flex absolute z-50 top-[2vh] right-[3vh] xl:top-[1.05vw] lg:right-[5vw] lg:top-[2.5vw] md:right-[6vw] xl:right-[4.7vw] items-center justify-between px-2 cursor-pointer h-10 md:h-12 lg:h-16 xl:h-10 rounded-sm bg-black/50 transition-all duration-900 ${open ? "w-11" : "md:w-29  w-22 lg:w-38 xl:w-25"
            }`}
        >
          <h1 className="text-black text-[3vw] md:text-[2.5vw] lg:text-[2.5vw] xl:text-[1.2vw]   font-[font2] transition-all -px-3 duration-700">
            Menu
          </h1>
        </div>

        {/* Orange icon */}
        <div
          ref={iconRef}
          onClick={toggleMenu}
          className={`menu-icon z-50 flex cursor-pointer flex-col items-center justify-center gap-1 absolute top-[2.6vh] right-[3.5vh] md:top-[3.2vw]  md:right-[6.5vw] lg:right-[5.5vw] lg:top-[2.8vw] xl:top-[1.31vw] xl:right-[5vw] bg-white transition-all duration-700 rounded-sm w-8 h-8 md:w-10 md:h-10 lg:h-14 lg:w-14 xl:w-8 xl:h-8 ${open ? "scale-130" : "scale-100"
            }`}
        >
          <span
            ref={topline}
            className="h-[0.29vh] w-5 block origin-center rounded-full bg-black"
          ></span>
          <span
            ref={bottomline}
            className="h-[0.29vh] w-5 block origin-center rounded-full bg-black"
          ></span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
