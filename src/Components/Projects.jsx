import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  useEffect(() => {
    // === Horizontal Scroll Setup ===
    const slides = gsap.utils.toArray(".slide");

    const hscroll = gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".real",
        pin: true,
        scrub: 1,
        snap: 1 / (slides.length - 1),
        end: () => "+=" + document.querySelector(".slides").offsetWidth,
      },
    });


    gsap.set(".circle", { scale: 0, transformOrigin: "center" });

    gsap.to(".circle", {
      scale: 10, // slightly bigger to cover whole screen
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ".slide:nth-child(2)",
        containerAnimation: hscroll,
        start: "left center+=100", // starts AFTER text is done
        end: "right center-=100", // finishes earlier, before section end
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="main w-full">
      {/* Real Section */}
      <div className="real section w-full">
        <div className="cont relative">
          {/* Slides */}
          <div className="slides flex w-[200vw] h-screen">
            {/* Slide 1 */}
            <div className="slide flex items-center justify-center w-[100vw] whitespace-nowrap h-screen  px-10">
              <h1 className="text-[20vw] ml-[50%] uppercase font-bold">All Projects</h1>
            </div>

            {/* Slide 2 with Black Circle */}
            <div className="slide flex relative items-center justify-center w-screen h-screen flex-shrink-0 px-10">
              <div className="circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* End Section */}
      <div className="end w-full h-screen flex items-center justify-center bg-black">
        <h1 className="text-9xl text-white z-50 font-bold">End of this section</h1>
      </div>
    </div>
  );
};

export default Projects;
