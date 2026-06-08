"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling on mobile when the drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navLinks = [
        { label: "Featured Works", href: "/works" },
        { label: "About", href: "/about" },
    ];

    return (
        <>
            {/* Top Navigation Bar */}
            <nav
                className={`fixed top-0 left-0 right-0 text-white mix-blend-difference z-40 transition-all duration-500`}
            >
                <div className="w-full">
                    <div className="flex items-center justify-between px-2 pt-2">
                        {/* Logo / Name */}
                        <Link
                            href="/"
                            className="text-[13px] font-[PPNeueMontreal] font-semibold transition-colors duration-300"
                        >
                            Nagaruthwik
                        </Link>

                        {/* DESKTOP: Navigation Links */}
                        <div className="hidden md:flex items-start flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative text-[14px] font-[PPNeueMontreal] font-semibold transition-colors duration-300 group"
                                >
                                    <span>{link.label}</span>
                                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#1a1a1a] group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </div>

                        {/* DESKTOP: Contact Link */}
                        <div className="hidden md:flex items-center flex-col gap-2">
                            <Link
                                href="/contact"
                                className="text-[14px] font-[PPNeueMontreal] font-semibold hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* DESKTOP: Resume Download */}
                        <div className="hidden md:flex items-center flex-col gap-2">
                            <a
                                href="/resume.pdf"
                                download
                                className="text-[14px] font-[PPNeueMontreal] border border-[#ffffff] px-3 py-1.5 hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                            >
                                Resume
                            </a>
                        </div>

                        {/* MOBILE ONLY: Menu Trigger */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex md:hidden group items-center gap-2 text-[14px] font-[PPNeueMontreal] font-semibold cursor-pointer select-none focus:outline-none"
                            aria-label="Open Menu"
                        >
                            <span className="opacity-80">Menu</span>
                            <div className="flex flex-col gap-[4px] w-5">
                                <span className="w-full h-[1px] bg-white transition-transform duration-300 group-hover:translate-x-0.5" />
                                <span className="w-2/3 h-[1px] bg-white self-end transition-transform duration-300 group-hover:translate-x-0" />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE ONLY: Backdrop Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsOpen(false)}
            />

            {/* MOBILE ONLY: Right-to-Left Minimal Drawer */}
            <div
                className={`md:hidden fixed top-4 right-4 h-[calc(60vh-32px)] w-[280px] sm:w-[320px] bg-[#0d0d0d] border border-white/10 text-white z-50 p-6 flex flex-col justify-between rounded-lg shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "translate-x-0" : "translate-x-[calc(100%+16px)]"
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-[11px] uppercase tracking-widest text-white/40 font-mono">Navigation</span>
                    
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-white/30 transition-colors"
                        aria-label="Close Menu"
                    >
                        <div className="relative w-3 h-3">
                            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-white rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
                            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-white -rotate-45 transition-transform duration-300 group-hover:rotate-[45deg]" />
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-1 my-auto pl-2">
                    {[
                        ...navLinks,
                        { label: "Contact", href: "/contact" }
                    ].map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="relative text-[22px] font-[PPNeueMontreal] font-light tracking-tight text-white/70 hover:text-white transition-colors duration-300 group w-fit"
                            style={{ 
                                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                                opacity: isOpen ? 1 : 0,
                                transitionProperty: 'transform, opacity, color'
                            }}
                        >
                            <span>{link.label}</span>
                            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* Drawer Footer */}
                <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                    <a
                        href="/resume.pdf"
                        download
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center text-[13px] font-[PPNeueMontreal] tracking-wide border border-white/20 py-2.5 rounded hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Download Resume
                    </a>
                    <div className="text-[10px] text-white/30 text-center font-mono">
                        © {new Date().getFullYear()} Nagaruthwik
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;