import React, { useRef, useState } from "react";
import { contact, links } from "../assets/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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

  useGSAP(() => {
    // Initial hidden state
    gsap.set(navRef.current, { yPercent: 100 });
    gsap.set(linksRef.current, { y: 100, opacity: 0 });
    gsap.set(contactRef.current, { y: -100, opacity: 0 });
    gsap.set(socailRef.current, { x: -100, opacity: 0 });

    // ✅ Open timeline with stagger
    openTl.current = gsap.timeline({ paused: true })
      .to(navRef.current, {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.inOut",
      })
      .to(
        linksRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,   // 👈 links animate one after another
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
          stagger: 0.1,   // 👈 contact items stagger
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
          stagger: 0.1,   // 👈 social icons stagger
        },
        "-=0.8"
      );

    // ✅ Close timeline with stagger
    closeTl.current = gsap.timeline({ paused: true })
      .to(
        socailRef.current,
        {
          duration: 0.25,
          ease: "power3.in",
          stagger: 0.02,
        }
      )
      .to(
        contactRef.current,
        {
          duration: 0.25,
          ease: "power3.in",
          stagger: 0.02,
        },
        "-=0.4"
      )
      .to(
        linksRef.current,
        {
          duration: 0.25,
          ease: "power3.in",
          stagger: 0.02,
        },
        "-=0.4"
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

    // Icon animation
    iconTl.current = gsap.timeline({ paused: true })
      .to(topline.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.5,
        ease: "power3.inOut",
      })
      .to(
        bottomline.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.5,
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
    }
    setOpen(!open);
  };

  return (
    <>
      {/* Nav Overlay */}
      <nav
        ref={navRef}
        className="fixed z-50 flex font-[poppins] flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10"
      >
        {/* Decorative Letters */}
        <h1 className="absolute md:block hidden  text-white/50 top-[42vh] font-[poppins] right-[52vh] text-[30vh]">m</h1>
        <h1 className="absolute -bottom-[16vh] n md:block right-[19vh] md:top-[21vh] md:right-[20vh] font-[font2] text-[38vh] md:text-[50vh]">N</h1>
        <h1 className="absolute md:top-[39vh] text-white/50  -bottom-[6vh] right-[19vw] md:right-[4vh] font-[font2] text-[17vh] md:text-[30vh]">R</h1>

        {/* Main Links */}
        <div className="relative md:left-1/2 mt-15 md:mt-0 md:w-1/2 flex flex-col  text-5xl gap-y-2 md:text-6xl lg:text-[4vw] font-light">
          {["Home", "About Me", "Projects", "Contact", "Services"].map(
            (text, index) => (
              <div className="overflow-hidden" key={index}>
                <div
                  ref={(el) => (linksRef.current[index] = el)}
                  className="overflow-hidden flex gap-10"
                >
                  <a className="transition-all duration-300 hover:text-white cursor-pointer">
                    {text}
                  </a>
                </div>
              </div>
            )
          )}
        </div>

        {/* Contact + Social */}
        <div className="flex items-center md:flex-row flex-col justify-between p-2">
          <div className="box bg-white md:block hidden w-80 h-50">
            <img
              className="h-full w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1754634266990-f86e4ee91ea0?w=600&auto=format&fit=crop&q=60"
              alt=""
            />
          </div>

          <div className="flex md:flex-row flex-col md:items-center md:mx-10 items-end justify-start md:justify-between gap-10">
            <div className="relative flex flex-col font-light">
              {contact.map(({ detail, icon: Icon }, ind) => (
                <div className="overflow-hidden" key={ind}>
                  <div
                    ref={(el) => (contactRef.current[ind] = el)}
                    className="overflow-hidden flex gap-2 items-start justify-start"
                  >
                    <h5 className="transition-all flex text-md duration-300 gap-3 hover:text-orange-500 text-white cursor-pointer">
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
                    className="overflow-hidden flex flex-col"
                  >
                    <a
                      href={href}
                      className="transition-all lowercase font-[font2] flex gap-2 text-xl duration-300 hover:text-orange-500 text-white cursor-pointer"
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
        <div
          className={`text-[10vh] font-[font2] ${
            !open ? "text-black" : "text-white"
          }`}
        >
          R
        </div>

        <div
          onClick={toggleMenu}
          className="fixed flex items-center justify-center cursor-pointer top-3 right-2 md:top-5 md:right-10 w-32 h-16 rounded-full bg-black/80"
        >
          <h1 className="text-white px-2 text-md font-bold uppercase">
            {!open ? "Menu" : "Close"}
          </h1>
          <div className="flex flex-col items-center justify-center gap-1 bg-orange-300/90 scale-90 hover:scale-100 duration-300 transition-all rounded-full w-12 h-12 md:w-12 md:h-12 p-2">
            <span
              ref={topline}
              className="h-[0.3vh] w-9 block origin-center rounded-full bg-black"
            ></span>
            <span
              ref={bottomline}
              className="h-[0.3vh] w-9 block origin-center rounded-full bg-black"
            ></span>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Navbar;
