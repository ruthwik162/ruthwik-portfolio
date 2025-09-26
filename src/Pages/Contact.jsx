import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {  links } from "../assets/assets";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [toasts, setToasts] = useState([]);

  const contactRef = useRef([]);
  const socailRef = useRef([]);
  const boxRef = useRef();
  const fillRef = useRef();

  const showToast = (message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    showToast("Message sent successfully! I'll get back to you soon.", "success");

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  useGSAP(() => {

    gsap.set(contactRef.current, { y: -100, opacity: 0 });
    gsap.set(socailRef.current, { x: -100, opacity: 0 });
    // Animate the heading sections
    gsap.fromTo(".connect-heading",
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate the tagline
    gsap.fromTo(".tagline-text",
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        stagger: 0.2,
        ease: "power3.inout",
        scrollTrigger: {
          trigger: ".tagline-section",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
    gsap.to(
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
    gsap.to(
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

    // Animate form elements sequentially
    gsap.fromTo(".form-element",
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate the form container
    gsap.fromTo(".form-container",
      {
        opacity: 0,
        scale: 0.95
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.set(fillRef.current, { yPercent: 100 });

    boxRef.current.onmouseenter = () => {
      gsap.to(fillRef.current, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.inOut"
      });
    };

    boxRef.current.onmouseleave = () => {
      gsap.to(fillRef.current, {
        yPercent: 100,
        duration: 0.4,
        ease: "power3.inOut"
      });
    };
  });

  return (
    <div className="w-full relative text-black  min-h-screen overflow-hidden">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-3 w-80 md:w-96">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast-notification transform transition-all duration-500 ease-out ${toast.type === "success"
              ? "bg-gradient-to-r from-green-600 to-emerald-700"
              : "bg-gradient-to-r from-red-600 to-rose-700"
              } text-white p-4 rounded-xl shadow-lg flex items-start`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${toast.type === "success" ? "bg-green-700" : "bg-red-700"
              }`}>
              {toast.type === "success" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="flex-shrink-0 ml-4 text-white/70 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Heading Section */}
      <div className="contact-heading overflow-hidden text-start relative mx-5 pt-24 md:pt-32">
        <div className="overflow-hidden md:w-1/2 mt-[2vw] md:mt-[1vw]  ">
          <div className="overflow-hidden md:leading-[9vw]">
            <h1 className="connect-heading text-6xl md:text-[14vw] font-[font2] text-start uppercase font-bold">
              Let's
            </h1>
          </div>
        </div>

        <div className="md:w-1/2 md:ml-[50%]   overflow-hidden">
          <div className="overflow-hidden md:leading-[9vw]">
            <h1 className="connect-heading text-6xl md:text-[8vw] font-[font2] uppercase font-bold text-start md:text-end">
              Connect
            </h1>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="tagline-section absolute md:top-[21.3vw] top-[13%] right-[3%] md:-left-[10vw] overflow-hidden">
        <div className="overflow-hidden md:leading-[3vw]">
          <h1 className="tagline-text text-[3vw] md:text-[2.5vw] md:leading-[2.5vw] font-[font2] leading-[2.3vw]  font-bold text-center">
            Design is the conversation between <br />{" "}

          </h1>
          <h1 className="tagline-text text-[2.7vw] md:text-[2.5vw] leading-[2.5vw] relative md:leading-[2.5vw] font-[font2]  font-bold text-center">

            <span className="text-black/50">imagination</span> and{" "}
            <span className="text-red-600">reality</span> &nbsp;<Quote className="inline-block absolute top-0" />
          </h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form font-[font2] md:ml-[45%] md:w-[50%] mt-[5vw]  text-black backdrop-blur-md p-8 mb-[5vw] rounded-2xl   form-container">
        <h2 className="form-element text-2xl md:text-3xl font-[font2] font-bold mb-8 uppercase text-center">
          Start a Conversation
        </h2>
        <form className="flex flex-col gap-6 text-black" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="form-element bg-transparent border-b-2 p-5  border-b-indigo-200 focus:border-red-600 outline-none py-3 text-lg placeholder-black/40 transition-all duration-300 focus:scale-105"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="form-element bg-transparent border-b-2 p-5  border-b-indigo-200 focus:border-red-600 outline-none py-3 text-lg placeholder-black/40 transition-all duration-300 focus:scale-105"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="form-element bg-transparent border-b-2 p-5  border-b-indigo-200 focus:border-red-600 outline-none py-3 text-lg placeholder-black/40 transition-all duration-300 focus:scale-105"
            required
          />
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="form-element bg-transparent border-b-2 p-5  border-b-indigo-200 focus:border-red-600 outline-none py-3 text-lg placeholder-black/40 resize-none transition-all duration-300 focus:scale-105"
            required
          />


          <div className="overflow-hidden ">
            <button
              ref={boxRef}
              type="submit"
              className="form-element mt-6 px-8 py-4 cursor-pointer border border-indigo-200  w-1/2 flex items-end justify-center font-[font2] uppercase  transform"
            >
              <div
                ref={fillRef}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-indigo-200"
              >
                <h1 className="text-[2vw] md:text-[1.2vw] font-semibold text-black">
                  Send Message
                </h1>
              </div>
              Send Message
            </button>
          </div>
        </form>

        {/* Contact Info */}

      </div>

      <div className="w-full h-[10vw] md:w-1/3 flex items-center md:py-0 py-[5vw] justify-between px-5 "> 
        {links.map((link,id)=>(
          <div key={id} className="flex flex-row items-center justify-center">
            <a href={link.href} className="flex items-center justify-center hover:text-indigo-200 transition-all duration-400 md:text-[1.5vw] font-[aeonik2] ">{link.name} <ArrowUpRight/> </a>
          </div>
        ))}

      </div>



    </div>
  );
};

export default Contact;