"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import Text from "./Text";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Principle {
    number: string;
    title: string;
    description: string;
}

interface Project {
    id: string;
    title: string;
    category: string;
    challenge: string;
    solution: string;
    impact: string;
    tech: string[];
    year: string;
}

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PRINCIPLES: Principle[] = [
    {
        number: "01",
        title: "Solve the business problem, not the technical puzzle",
        description: "Every project starts with understanding what success looks like for the client—more sales, better user experience, operational efficiency. The tech stack is just the tool. I've built eCommerce platforms that process real transactions, appointment booking systems that connect actual patients to doctors, and inventory management dashboards that reduce manual work.",
    },
    {
        number: "02",
        title: "Ship fast, iterate faster",
        description: "I learned early that perfect code that ships in 6 months loses to good code that ships in 2 weeks. My clients need working systems now, not architectural masterpieces later. I deploy early, gather feedback, and improve in production. Continuous delivery isn't just CI/CD pipelines—it's a commitment to making things better every week.",
    },
    {
        number: "03",
        title: "Own it end-to-end",
        description: "From the first client call to the final deployment, I'm involved. This isn't about control—it's about accountability. When you're the founder, the developer, and the support team, you learn to build systems that don't break at 3 AM. You write better documentation because you'll be the one debugging it.",
    },
];

const PROJECTS: Project[] = [
    {
        id: "netha-silks",
        title: "Netha Silks & Co eCommerce",
        category: "Full-Stack Platform",
        year: "2025",
        challenge: "A traditional Pochampally saree business wanted to move online but needed more than just a product catalog—they needed a complete sales system.",
        solution: "Built a full-stack eCommerce platform with separate user and admin dashboards. Implemented 3D product visualization so customers could examine sarees from every angle—critical for textile products where fabric detail matters. Created a streamlined checkout flow that reduced cart abandonment.",
        impact: "Live platform processing real orders. The 3D product models increased customer engagement by making online shopping feel closer to the in-store experience.",
        tech: ["React", "Node.js", "MongoDB", "Three.js", "Express"],
    },
    {
        id: "sharvani-jewellery",
        title: "Sharvani Jewellery Collections",
        category: "Scalable eCommerce",
        year: "2025",
        challenge: "Jewellery eCommerce needs to handle high-value transactions, detailed product filtering, and multiple vendor management.",
        solution: "Developed a scalable full-stack platform with advanced filtering architecture and dual dashboards for customers and admins. Built secure authentication and order management APIs. Designed the system to be reusable—the same codebase could be adapted for multiple store domains.",
        impact: "Reduced backend API response times for faster page loads. Created a template architecture now used for multiple client stores.",
        tech: ["React", "Node.js", "MongoDB", "REST APIs"],
    },
    {
        id: "veena-medicare",
        title: "Veena Medicare Hospital",
        category: "Healthcare Website",
        year: "2024",
        challenge: "A hospital needed online presence and patient appointment booking without complex systems.",
        solution: "Built a responsive, accessible hospital website with an integrated outpatient appointment booking form. Focused on mobile-first design since most patients book appointments from phones.",
        impact: "Patients can now request appointments directly from the website. Clean UI improved information accessibility for services and doctor profiles.",
        tech: ["React", "JavaScript", "Form APIs"],
    },
];

const TIMELINE: TimelineEvent[] = [
    {
        year: "2022",
        title: "Started University",
        description: "Began Computer Science at Malla Reddy University, Hyderabad. Expected textbooks and theory. Got curious about building things people actually use.",
    },
    {
        year: "2024",
        title: "First Real Client",
        description: "Took on my first paying project—a local business needed a website. Realized freelancing beats theoretical coursework.",
    },
    {
        year: "2025",
        title: "Founded Nothing2Real Studio",
        description: "Officially launched my web studio. Started managing multiple client projects simultaneously while finishing my degree.",
    },
    {
        year: "Current",
        title: "Building & Learning",
        description: "Managing 5+ live client websites. Interviewing with enterprise companies. Proving you can run a business and pursue a corporate career path simultaneously.",
    },
    {
        year: "2026",
        title: "Next Chapter",
        description: "Graduating with B.Tech in Computer Science (CGPA: 8.0). Seeking full-time corporate software development role while continuing studio work.",
    },
];

const SKILLS = {
    frontend: ["React", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Framer Motion"],
    backend: ["Node.js", "Express.js", "REST APIs", "Spring Boot"],
    database: ["MongoDB", "MySQL"],
    tools: ["Git", "GitHub", "Postman", "Firebase", "Vercel"],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function AboutSection() {
    const introRef = useRef<HTMLDivElement>(null);
    const principlesRef = useRef<HTMLDivElement>(null);

    // Placeholder for GSAP animations - user will implement
    useEffect(() => {
        // TODO: Add GSAP animations here
        // Example: gsap.from(heroRef.current, { opacity: 0, y: 50, duration: 1 })
    }, []);

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-white font-[PPNeueMontreal]">

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* INTRODUCTION */}
            {/* ═══════════════════════════════════════════════════════════════════ */}

            <section id="intro" ref={introRef} className="py-24 px-6 md:px-10 border-t border-[#e5e5e5]">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Label column */}
                        <div className="col-span-12 md:col-span-3">
                            <div className="md:sticky md:top-24">
                                <span className="text-[16px] font-bold  font-[PPNeueMontreal]">
                                    Who I Am
                                </span>
                            </div>
                        </div>

                        {/* Content column */}
                        <div className="col-span-12 md:col-span-6 lg:col-start-7">
                            <div className="space-y-6 text-[15px] leading-[1.8] text-[#1a1a1a]">
                                <Text variant="slideUp" delay={0.2} stagger={0.02} animateOnScroll>
                                    <p className="lg:text-[2vw]  md:indent-[20%] leading-tight font-semibold ">
                                        Hello, I'm Nagaruthwik a full-stack developer who accidentally became a business owner.
                                    </p>
                                </Text>


                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 grid gap-5 lg:grid-cols-12 lg:col-start-7">
                            <div className="space-y-6 text-[15px]  lg:col-span-5 lg:col-start-1 leading-[1.8] text-[#1a1a1a]">
                                <Text variant="slideUp" delay={0.2} stagger={0.02} animateOnScroll>
                                    <p className="leading-tight font-medium md:indent-[20%] lg:text-[1rem]">
                                        In 2025, while finishing my Computer Science degree at Malla Reddy University, I founded <span className="font-[PPNeueMontreal] font-bold ">Nothing2Real Web Studio</span>. Not because I had a grand plan, but because real businesses needed real solutions, and I was tired of building projects that only lived on GitHub.
                                    </p>
                                </Text>
                            </div>

                            <div className="space-y-6 text-[15px] lg:col-span-5 lg:col-start-7 leading-[1.8] text-[#1a1a1a]">
                                <Text variant="slideUp" delay={0.2} stagger={0.0100} animateOnScroll>
                                    <p className="leading-tight md:indent-[20%] font-medium lg:text-[1rem]">
                                        Today, I run a studio managing 5+ live client websites—from eCommerce platforms for Pochampally saree retailers to professional portfolios for doctors and chartered accountants. I handle everything: client calls, design mockups, full-stack development, deployment, and those 2 AM bug fixes that come with the territory.
                                    </p>
                                </Text>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-start-7">
                            <div className="space-y-6 text-[15px] leading-[1.8] text-[#1a1a1a]">
                                <p className="lg:text-[2vw] indent-[5vw] leading-tight font-semibold ">
                                    Hello, I'm Nagaruthwik a full-stack developer who accidentally became a business owner.
                                </p>

                                <p>
                                    In 2025, while finishing my Computer Science degree at Malla Reddy University, I founded <span className="font-[PPNeueMontreal] font-bold ">Nothing2Real Web Studio</span>. Not because I had a grand plan, but because real businesses needed real solutions, and I was tired of building projects that only lived on GitHub.
                                </p>

                                <p>
                                    Today, I run a studio managing 5+ live client websites—from eCommerce platforms for Pochampally saree retailers to professional portfolios for doctors and chartered accountants. I handle everything: client calls, design mockups, full-stack development, deployment, and those 2 AM bug fixes that come with the territory.
                                </p>

                                <p>
                                    My background is rooted in the MERN stack and Java Spring Boot, but what really shapes how I work is understanding that code isn't the end product—the business outcome is. A smooth checkout flow matters more than perfect abstractions. A fast-loading product page beats architectural purity.
                                </p>

                                <p>
                                    I believe the era of developer-first thinking is backwards. The best code serves the user first, the business second, and the developer's ego last.
                                </p>

                                <p className="font-[PPNeueMontreal]">
                                    That's why I'm drawn to projects that solve real problems for real people—where a successful deployment means a business can finally take orders online, not just another line on my resume.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* PRINCIPLES / APPROACH */}
            {/* ═══════════════════════════════════════════════════════════════════ */}

            <section ref={principlesRef} className="py-24 px-6 md:px-10 border-t border-[#e5e5e5] bg-[#fafafa]">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Header */}
                        <div className="col-span-12 md:col-span-3">
                            <div className="md:sticky md:top-24">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal]">
                                    How I Work
                                </span>
                            </div>
                        </div>

                        {/* Principles grid */}
                        <div className="col-span-12 md:col-span-9">
                            <div className="space-y-16">
                                {PRINCIPLES.map((principle, idx) => (
                                    <div
                                        key={principle.number}
                                        className="grid grid-cols-12 gap-6 group"
                                    >
                                        {/* Number */}
                                        <div className="col-span-12 md:col-span-2">
                                            <span className="text-[11px] uppercase tracking-[0.2em] text-[#ccc] font-[PPNeueMontreal] group-hover:text-[#1a1a1a] transition-colors duration-300">
                                                {principle.number}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="col-span-12 md:col-span-10 space-y-4">
                                            <h3 className="text-[20px] leading-tight font-[PPNeueMontreal]">
                                                {principle.title}
                                            </h3>
                                            <p className="text-[14px] leading-[1.7] text-[#666]">
                                                {principle.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* PROJECTS */}
            {/* ═══════════════════════════════════════════════════════════════════ */}

            <section className="py-24 px-6 md:px-10 border-t border-[#e5e5e5]">
                <div className="w-full max-w-[1400px] mx-auto">
                    {/* Section header */}
                    <div className="grid grid-cols-12 gap-6 mb-16">
                        <div className="col-span-12 md:col-span-3">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal]">
                                Selected Work
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-[PPNeueMontreal]">
                                Projects That Matter
                            </h2>
                        </div>
                    </div>

                    {/* Projects list */}
                    <div className="space-y-0">
                        {PROJECTS.map((project, idx) => (
                            <div
                                key={project.id}
                                className="grid grid-cols-12 gap-6 py-12 border-t border-[#e5e5e5] hover:bg-[#fafafa] transition-colors duration-300 group cursor-pointer"
                            >
                                {/* Index & Year */}
                                <div className="col-span-12 md:col-span-2 flex md:flex-col justify-between md:justify-start gap-2">
                                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#ccc] font-[PPNeueMontreal]">
                                        0{idx + 1}
                                    </span>
                                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#999]">
                                        {project.year}
                                    </span>
                                </div>

                                {/* Title & Category */}
                                <div className="col-span-12 md:col-span-4">
                                    <h3 className="text-[22px] leading-tight font-[PPNeueMontreal] mb-2 group-hover:translate-x-1 transition-transform duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#999]">
                                        {project.category}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="col-span-12 md:col-span-6 space-y-4">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal] block mb-1">
                                            Challenge
                                        </span>
                                        <p className="text-[13px] leading-relaxed text-[#666]">
                                            {project.challenge}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal] block mb-1">
                                            Solution
                                        </span>
                                        <p className="text-[13px] leading-relaxed text-[#666]">
                                            {project.solution}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal] block mb-1">
                                            Impact
                                        </span>
                                        <p className="text-[13px] leading-relaxed text-[#1a1a1a] font-[PPNeueMontreal]">
                                            {project.impact}
                                        </p>
                                    </div>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tech.map(tech => (
                                            <span
                                                key={tech}
                                                className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white border border-[#e5e5e5] text-[#999]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* TIMELINE / JOURNEY */}
            {/* ═══════════════════════════════════════════════════════════════════ */}

            <section className="py-24 px-6 md:px-10 border-t border-[#e5e5e5] bg-[#fafafa]">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Header */}
                        <div className="col-span-12 md:col-span-3">
                            <div className="md:sticky md:top-24">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal]">
                                    The Journey
                                </span>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="col-span-12 md:col-span-9">
                            <div className="space-y-0">
                                {TIMELINE.map((event, idx) => (
                                    <div
                                        key={event.year}
                                        className="grid grid-cols-12 gap-6 py-8 border-t border-[#e5e5e5] first:border-t-0 hover:bg-white transition-colors duration-300 group"
                                    >
                                        {/* Year */}
                                        <div className="col-span-12 md:col-span-3">
                                            <span className="text-[13px] uppercase tracking-[0.15em] font-[PPNeueMontreal] group-hover:text-[#666] transition-colors duration-300">
                                                {event.year}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="col-span-12 md:col-span-9 space-y-2">
                                            <h4 className="text-[17px] font-[PPNeueMontreal]">
                                                {event.title}
                                            </h4>
                                            <p className="text-[13px] leading-relaxed text-[#666]">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* SKILLS / CAPABILITIES */}
            {/* ═══════════════════════════════════════════════════════════════════ */}

            <section className="py-24 px-6 md:px-10 border-t border-[#e5e5e5]">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Header */}
                        <div className="col-span-12 md:col-span-3">
                            <div className="md:sticky md:top-24">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal]">
                                    Capabilities
                                </span>
                            </div>
                        </div>

                        {/* Skills grid */}
                        <div className="col-span-12 md:col-span-9">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {Object.entries(SKILLS).map(([category, items]) => (
                                    <div key={category} className="space-y-4">
                                        <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal]">
                                            {category}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map(skill => (
                                                <span
                                                    key={skill}
                                                    className="text-[13px] px-3 py-2 bg-white border border-[#e5e5e5] hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 cursor-default"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* CURRENT STATUS / AVAILABILITY */}
            {/* ═══════════════════════════════════════════════════════════════════ */}

            <section className="py-24 px-6 md:px-10 border-t border-[#e5e5e5] bg-[#1a1a1a] text-white">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-9 md:col-start-2">
                            <div className="mb-8">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal]">
                                    What's Next
                                </span>
                            </div>

                            <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight font-[PPNeueMontreal] mb-8">
                                Seeking the right team
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="space-y-4">
                                    <h3 className="text-[13px] uppercase tracking-[0.15em] font-[PPNeueMontreal] text-[#999]">
                                        What I value
                                    </h3>
                                    <ul className="space-y-2 text-[14px] leading-relaxed text-[#ccc]">
                                        <li>• Hands-on builders who ship code</li>
                                        <li>• Team environments with strong collaboration</li>
                                        <li>• Real-world problem solving over theoretical perfection</li>
                                        <li>• Developers who understand business context</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-[13px] uppercase tracking-[0.15em] font-[PPNeueMontreal] text-[#999]">
                                        What I bring
                                    </h3>
                                    <ul className="space-y-2 text-[14px] leading-relaxed text-[#ccc]">
                                        <li>• Production experience with live client systems</li>
                                        <li>• Full-stack capabilities from UI to deployment</li>
                                        <li>• Entrepreneurial mindset from running a studio</li>
                                        <li>• Proven ability to deliver under real deadlines</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6">
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-[PPNeueMontreal] bg-white text-[#1a1a1a] px-8 py-4 hover:bg-[#f5f5f5] transition-all duration-300"
                                >
                                    <Download size={12} />
                                    Download Resume
                                </a>
                                <a
                                    href="mailto:ruthwik.merugu@outlook.com"
                                    className="text-[11px] uppercase tracking-[0.15em] font-[PPNeueMontreal] underline underline-offset-4 hover:text-[#ccc] transition-colors duration-300"
                                >
                                    Get in touch
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* CONTACT / FOOTER */}
            {/* ═══════════════════════════════════════════════════════════════════ */}

            <section className="py-16 px-6 md:px-10 border-t border-[#e5e5e5]">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Contact info */}
                        <div className="col-span-12 md:col-span-6 space-y-6">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal] block mb-2">
                                    Email
                                </span>
                                <a
                                    href="mailto:ruthwik.merugu@outlook.com"
                                    className="text-[15px] hover:text-[#666] transition-colors duration-300"
                                >
                                    ruthwik.merugu@outlook.com
                                </a>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal] block mb-2">
                                    Phone
                                </span>
                                <a
                                    href="tel:+919182216089"
                                    className="text-[15px] hover:text-[#666] transition-colors duration-300"
                                >
                                    +91 9182216089
                                </a>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal] block mb-2">
                                    Location
                                </span>
                                <p className="text-[15px] text-[#666]">
                                    Hyderabad, Telangana, India
                                </p>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="col-span-12 md:col-span-6 space-y-6">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal] block mb-2">
                                    Connect
                                </span>
                                <div className="space-y-2">
                                    {[
                                        { label: "GitHub", url: "https://github.com/ruthwik162" },
                                        { label: "LinkedIn", url: "https://linkedin.com/in/nagaruthwikmerugu" },
                                        { label: "Portfolio", url: "https://nagaruthwik.vercel.app" },
                                    ].map(link => (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[15px] hover:text-[#666] transition-colors duration-300 group w-fit"
                                        >
                                            {link.label}
                                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-[PPNeueMontreal] block mb-2">
                                    Studio
                                </span>
                                <p className="text-[13px] text-[#666]">
                                    Nothing2Real Web Studio<br />
                                    Building digital solutions for real businesses
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="grid grid-cols-12 gap-6 mt-16 pt-8 border-t border-[#e5e5e5]">
                        <div className="col-span-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <p className="text-[11px] text-[#999]">
                                © {new Date().getFullYear()} Nagaruthwik Merugu. All rights reserved.
                            </p>
                            <p className="text-[11px] text-[#999]">
                                Designed & developed with care
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}