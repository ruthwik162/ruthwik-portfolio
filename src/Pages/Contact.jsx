import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [toasts, setToasts] = useState([]);

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
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tagline-section",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
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
  });

  return (
    <div className="w-full relative text-white bg-black min-h-screen overflow-hidden">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-3 w-80 md:w-96">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast-notification transform transition-all duration-500 ease-out ${
              toast.type === "success" 
                ? "bg-gradient-to-r from-green-600 to-emerald-700" 
                : "bg-gradient-to-r from-red-600 to-rose-700"
            } text-white p-4 rounded-xl shadow-lg flex items-start`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
              toast.type === "success" ? "bg-green-700" : "bg-red-700"
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
      <div className="contact-heading overflow-hidden text-start relative pt-24 md:pt-32">
        <div className="overflow-hidden md:w-1/2 mt-[32vw] md:mt-[10vw] border-b border-gray-400/50 pb-4">
          <div className="overflow-hidden md:leading-[9vw]">
            <h1 className="connect-heading text-6xl md:text-[14vw] font-[font2] text-start uppercase font-bold">
              Let's
            </h1>
          </div>
        </div>

        <div className="md:w-1/2 md:ml-[50%] border-b border-gray-400/50 pb-4 overflow-hidden">
          <div className="overflow-hidden md:leading-[9vw]">
            <h1 className="connect-heading text-6xl md:text-[8vw] font-[font2] uppercase font-bold text-start md:text-end">
              Connect
            </h1>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="tagline-section absolute md:top-[22vw] top-[40%] left-[10%] md:left-[15vw] overflow-hidden">
        <div className="overflow-hidden md:leading-[3vw]">
          <h1 className="tagline-text text-[4.5vw] md:text-[2.5vw] md:leading-[2.2vw] font-[font2] uppercase font-bold text-center">
            Design is the conversation between <br />{" "}
            <span className="text-white/50">imagination</span> and{" "}
            <span className="text-red-600">reality</span>.
          </h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form mt-40 md:mt-60 md:ml-[45%] md:w-[50%] bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl form-container">
        <h2 className="form-element text-2xl md:text-3xl font-[font2] font-bold mb-8 uppercase text-center">
          Start a Conversation
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="form-element bg-transparent border-b border-gray-600 focus:border-red-600 outline-none py-3 text-lg placeholder-white/40 transition-all duration-300 focus:scale-105"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="form-element bg-transparent border-b border-gray-600 focus:border-red-600 outline-none py-3 text-lg placeholder-white/40 transition-all duration-300 focus:scale-105"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="form-element bg-transparent border-b border-gray-600 focus:border-red-600 outline-none py-3 text-lg placeholder-white/40 transition-all duration-300 focus:scale-105"
            required
          />
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="form-element bg-transparent border-b border-gray-600 focus:border-red-600 outline-none py-3 text-lg placeholder-white/40 resize-none transition-all duration-300 focus:scale-105"
            required
          />
          <button
            type="submit"
            className="form-element mt-6 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-600/40 hover:scale-105 transform"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="form-element mt-8 text-center text-white/70 text-sm">
          <p className="mb-2">Email: <span className="text-white">nagaruthwikmerugu162@gmail.com</span></p>
          <p>Find me on: <span className="text-red-400">LinkedIn / GitHub / Dribbble</span></p>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Contact;