"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Featured Works", href: "works" },
        { label: "About", href: "about" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 text-white mix-blend-difference z-50 transition-all duration-500`}
        >
            <div className="w-full ">
                <div className="flex items-center justify-between px-2 pt-2">
                    {/* Logo / Name */}
                    <Link
                        href="/"
                        className="text-[13px] font-[PPNeueMontreal] font-semibold transition-colors duration-300"
                    >
                        Nagaruthwik
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-start flex-col ">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-[14px] font-[PPNeueMontreal] font-semibold    transition-colors duration-300 group"
                            >
                                <span>{link.label}</span>
                                {/* Underline effect */}
                                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#1a1a1a] group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center flex-col  gap-2">


                        {/* CTA Button - Resume Download */}
                        <Link
                            href="/contact"
                            className="hidden md:block text-[14px] font-[PPNeueMontreal] font-semibold hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center flex-col gap-2">


                        {/* CTA Button - Resume Download */}
                        <a
                            href="/resume.pdf"
                            download
                            className="hidden md:block text-[14px] font-[PPNeueMontreal]  border border-[#ffffff] px-3 py-1.5 hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;