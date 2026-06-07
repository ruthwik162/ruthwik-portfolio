"use client"
import React, { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Text from '@/app/Components/Text'

gsap.registerPlugin(ScrollTrigger)

// ─── Project data ─────────────────────────────────────────────────────────────
const projectsData = {
    'netha-silks': {
        id: 'netha-silks',
        index: '01',
        title: 'Netha Silks & Co.',
        subtitle: 'Moving heritage textiles online — one saree at a time.',
        category: 'eCommerce · Fashion · Luxury',
        year: '2024',
        duration: '6 weeks',
        role: 'Full-Stack Developer · Designer · Deployment',
        url: 'https://nethasilksandco.com/',
        accent: '#C9A96E',
        accentDim: '#C9A96E20',
        thumbnail: 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
        next: 'sharvani-jewellery',
        tags: ['Next.js 14', 'Stripe', 'Sanity CMS', 'Tailwind CSS', 'Vercel', 'Cloudinary'],
        stats: [
            { label: 'Products Live', value: '120+' },
            { label: 'Orders Processed', value: '₹2L+' },
            { label: 'Page Speed', value: '94/100' },
            { label: 'Deployment', value: '6 Weeks' },
        ],
        problem: 'Netha Silks was selling Pochampally handloom sarees exclusively through WhatsApp and Instagram DMs. Every sale required manual catalogue sharing, price negotiation, and UPI payment follow-ups — limiting both scale and trust. The founder needed a real storefront that matched the premium quality of the product.',
        solution: 'I built a full eCommerce platform with a Sanity-powered CMS so the client could manage inventory without developer involvement. Stripe integration handles secure payments, and the UI was designed to feel editorial — warm golds, generous whitespace, and product photography that respects the craft. The site went from zero to 120+ live SKUs in six weeks.',
        outcome: 'Within the first month of launch, Netha Silks processed its first ₹2 lakh in online orders. The founder now spends less time on WhatsApp and more time sourcing new collections. Return visitors are up, and the average order value is 40% higher online than it was through DMs.',
        chapters: [
            {
                number: '001',
                title: 'The Problem With DM Commerce',
                body: 'Handloom weavers have always relied on word of mouth and local markets. When digital channels opened up, the instinct was to use what was already familiar — Instagram stories, WhatsApp broadcasts. But these channels don\'t scale. There\'s no inventory system, no trust signal, no way to handle returns. Netha Silks was growing faster than its infrastructure.',
            },
            {
                number: '002',
                title: 'Designing for Heritage',
                body: 'The product is luxurious, so the UI had to match. I spent the first week studying how high-end fashion brands present textiles online — the use of negative space, the restraint in typography, the way a single product image can carry an entire page. The design system uses a warm ivory base with gold accents that echo the zari work in the sarees themselves.',
            },
            {
                number: '003',
                title: 'CMS-First Development',
                body: 'The most important technical decision was building Sanity CMS as the foundation from day one. The client is not technical. She needed to be able to add a new saree, set a price, upload photos, and publish — all without touching code. Every schema was designed around her workflow, not around developer convenience.',
            },
        ],
    },
    'sharvani-jewellery': {
        id: 'sharvani-jewellery',
        index: '02',
        title: 'Sharvani Jewellery',
        subtitle: 'A curated jewellery collective built for D2C.',
        category: 'eCommerce · Jewellery · D2C',
        year: '2024',
        duration: '5 weeks',
        role: 'Full-Stack Developer · UI Designer',
        url: 'https://sharvanijewellery-collectives.vercel.app/',
        accent: '#B8860B',
        accentDim: '#B8860B20',
        thumbnail: 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
        next: 'naveen-ca',
        tags: ['React', 'Razorpay', 'Firebase', 'GSAP', 'Tailwind CSS'],
        stats: [
            { label: 'Collections', value: '8' },
            { label: 'SKUs', value: '200+' },
            { label: 'Checkout Rate', value: '+28%' },
            { label: 'Mobile Traffic', value: '76%' },
        ],
        problem: 'Sharvani Jewellery had a beautiful product range but a broken buying experience. Their previous site was a generic Shopify template that felt disconnected from the brand. Checkout abandonment was high, mobile performance was poor, and the catalogue had outgrown the template\'s capabilities.',
        solution: 'A ground-up React rebuild with Razorpay integration for reliable Indian payment rails. I built a custom product filtering system that handles 200+ SKUs without performance degradation. The UI leans into luxury — muted golds, full-bleed imagery, smooth GSAP transitions between collection views.',
        outcome: 'Checkout completion rates improved by 28% in the first 60 days. Mobile bounce rate dropped significantly after the performance optimisation. The client reported that customers now comment on the "feel" of the website as a trust signal when placing orders.',
        chapters: [
            {
                number: '001',
                title: 'The Trust Problem in Jewellery',
                body: 'Jewellery is one of the hardest categories to sell online in India. The product is high-value, tactile, and deeply personal. The website has to compensate for the inability to physically hold the piece — through photography, through language, through the feeling that the brand is trustworthy and premium.',
            },
            {
                number: '002',
                title: 'Performance as a Feature',
                body: 'With 76% of traffic on mobile, performance wasn\'t optional. I implemented lazy loading for the product grid, optimised all images through Cloudinary transforms, and used React\'s virtual DOM efficiently to keep the catalogue fast even at 200+ items. A slow site kills trust faster than a bad design.',
            },
            {
                number: '003',
                title: 'Razorpay Over Stripe',
                body: 'The decision to use Razorpay over Stripe was deliberate. The customer base is entirely Indian, and Razorpay\'s UPI, net banking, and EMI options match how people actually pay here. Reducing payment friction at checkout is the single highest-ROI optimisation in Indian eCommerce.',
            },
        ],
    },
    'naveen-ca': {
        id: 'naveen-ca',
        index: '03',
        title: 'Naveen Sangewar CA',
        subtitle: 'Authority and trust, rendered in code.',
        category: 'Portfolio · Professional · Finance',
        year: '2025',
        duration: '3 weeks',
        role: 'Full-Stack Developer · Copywriter',
        url: 'https://naveensangewarca.vercel.app/',
        accent: '#2D5A8E',
        accentDim: '#2D5A8E20',
        thumbnail: 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
        next: 'bharath-reddy',
        tags: ['Next.js 14', 'Framer Motion', 'Resend', 'Tailwind CSS', 'Vercel'],
        stats: [
            { label: 'Client Leads', value: '+40%' },
            { label: 'Load Time', value: '<1s' },
            { label: 'Lighthouse', value: '98/100' },
            { label: 'Form Submissions', value: '+60%' },
        ],
        problem: 'Naveen was a qualified CA with strong expertise but no digital presence. Potential clients were Googling him and finding nothing — or worse, a basic LinkedIn profile that didn\'t communicate his specialisations. He was losing mandates to less-qualified competitors who simply had better websites.',
        solution: 'A trust-first portfolio that leads with services and social proof before credentials. The copy was written to answer the question a prospective client actually asks: "Can I trust this person with my finances?" The contact form connects directly to Naveen\'s email via Resend, with instant notifications so no lead goes cold.',
        outcome: 'Inbound client enquiries increased by 40% in the first two months. Several clients specifically mentioned the website when explaining why they chose Naveen over other CAs. The site now ranks on the first page of Google for his name and location.',
        chapters: [
            {
                number: '001',
                title: 'Credibility Before Credentials',
                body: 'Most professional portfolio sites make the same mistake: they lead with qualifications. A list of degrees and certifications tells you what someone knows, not whether you should trust them. The Naveen CA site leads with outcomes — what problems he solves, who he\'s solved them for, and what working with him looks like.',
            },
            {
                number: '002',
                title: 'The Typography of Trust',
                body: 'Finance is conservative. The design needed to communicate stability and precision without feeling cold or bureaucratic. I used a serif typeface for headings — a quiet signal of authority — paired with clean, well-spaced body copy. Deep navy and white with restrained use of colour. Nothing flashy. Just clear.',
            },
            {
                number: '003',
                title: 'Contact as Conversion',
                body: 'The contact form is the most important element on the site. I rebuilt it twice. The first version was standard — name, email, message. The second version qualifies the lead before it reaches Naveen: type of service, approximate turnover, timeline. This means he spends less time on unqualified enquiries.',
            },
        ],
    },
    'bharath-reddy': {
        id: 'bharath-reddy',
        index: '04',
        title: 'Bharath Reddy',
        subtitle: 'A portfolio that leads with personality, not a CV.',
        category: 'Portfolio · Personal · Creative',
        year: '2025',
        duration: '4 weeks',
        role: 'Full-Stack Developer · Motion Designer',
        url: 'https://bharath-reddy.vercel.app/',
        accent: '#E84545',
        accentDim: '#E84545',
        thumbnail: 'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
        next: 'netha-silks',
        tags: ['Next.js 14', 'GSAP', 'Three.js', 'Tailwind CSS', 'Vercel'],
        stats: [
            { label: 'Lighthouse', value: '99/100' },
            { label: 'Bounce Rate', value: '−35%' },
            { label: 'Avg. Session', value: '4m 12s' },
            { label: 'Recruiter Views', value: '+80%' },
        ],
        problem: 'Bharath had applied to 50+ positions with a PDF resume and heard back from fewer than 5. His skills were strong, but his online presence didn\'t reflect that. He needed something that made a recruiter stop scrolling — and that communicated creative technical ability before they even read a word.',
        solution: 'A personality-led portfolio with a Three.js particle background, custom cursor, and GSAP-choreographed section entrances. The structure breaks from the conventional skills → projects → contact flow. It starts with a statement of what Bharath believes, then earns the credentials. Fast, opinionated, memorable.',
        outcome: 'Recruiter engagement time on the portfolio averages 4 minutes 12 seconds — unusually high. Within three weeks of launch, Bharath received 6 interview requests from companies that specifically mentioned the portfolio. His bounce rate dropped 35% compared to his previous static site.',
        chapters: [
            {
                number: '001',
                title: 'Why Most Dev Portfolios Fail',
                body: 'The average developer portfolio follows a predictable structure: hero with name and title, skills section with logo icons, projects section with screenshots, contact form. Recruiters see this pattern hundreds of times. It signals competence, but it doesn\'t signal character. Bharath needed something that stopped the scroll.',
            },
            {
                number: '002',
                title: 'Performance at Scale of Ambition',
                body: 'Adding Three.js to a portfolio is easy. Making it run at 60fps on a mid-range phone is not. Every particle in the background scene was tuned for mobile performance. The canvas resizes responsively, the particle count scales with device capability, and the Three.js renderer uses power-preference: high-performance as a baseline.',
            },
            {
                number: '003',
                title: 'Animation as Communication',
                body: 'Every animation in the portfolio has a purpose. The cursor that enlarges over interactive elements tells you something is clickable. The section entrances use direction to communicate hierarchy — primary content enters from the left, supporting content from the right. Motion is a language, not decoration.',
            },
        ],
    },
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = projectsData[params.slug as keyof typeof projectsData]
    if (!project) notFound()

    const nextProject = projectsData[project.next as keyof typeof projectsData]

    const containerRef = useRef<HTMLDivElement>(null)
    const heroImgRef = useRef<HTMLDivElement>(null)
    const heroTextRef = useRef<HTMLDivElement>(null)
    const heroMaskRef = useRef<HTMLDivElement>(null)
    const statsSectionRef = useRef<HTMLElement>(null)
    const pinnedMetaRef = useRef<HTMLDivElement>(null)
    const narrativeRef = useRef<HTMLElement>(null)
    const chaptersRef = useRef<HTMLElement>(null)
    const nextRef = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // ── Hero: mask wipe + image parallax ──────────────────
            const heroTl = gsap.timeline({ defaults: { ease: 'expo.inOut' } })
            heroTl
                .to(heroMaskRef.current, { scaleY: 0, transformOrigin: 'top', duration: 1.4, delay: 0.1 })
                .from(heroTextRef.current, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')

            gsap.fromTo(
                heroImgRef.current,
                { yPercent: 0 },
                {
                    yPercent: 25,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: '50% top',
                        scrub: 1.5,
                    },
                }
            )

            // ── Stats: stagger up ──────────────────────────────────
            const statItems = statsSectionRef.current?.querySelectorAll('.stat-item')
            if (statItems?.length) {
                gsap.from(statItems, {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsSectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                })
            }

            // ── Narrative: pinned meta label ──────────────────────
            ScrollTrigger.matchMedia({
                '(min-width: 1024px)': () => {
                    ScrollTrigger.create({
                        trigger: narrativeRef.current,
                        start: 'top 20%',
                        end: 'bottom 80%',
                        pin: pinnedMetaRef.current,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    })
                },
            })

            // ── Chapters: slide in ────────────────────────────────
            const chapterItems = chaptersRef.current?.querySelectorAll('.chapter-item')
            chapterItems?.forEach((el, i) => {
                gsap.from(el, {
                    x: -80,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                })
            })

            // ── Next project reveal ───────────────────────────────
            if (nextRef.current) {
                gsap.from(nextRef.current.querySelectorAll('.next-item'), {
                    y: 60,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: nextRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                })
            }

        }, containerRef)
        return () => ctx.revert()
    }, [project])

    return (
        <div ref={containerRef} className="relative w-full font-[PPNeueMontreal] bg-[#0a0a0a]">

            {/* ── HERO ──────────────────────────────────────────────── */}
            <section className="relative h-[90vh] overflow-hidden">
                {/* Parallax image */}
                <div ref={heroImgRef} className="absolute inset-0 scale-[1.3]">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover object-center"
                        style={{ filter: 'brightness(0.4) saturate(0.8)' }}
                        priority
                    />
                    <div
                        className="absolute inset-0 mix-blend-color opacity-25"
                        style={{ backgroundColor: project.accent }}
                    />
                </div>

                {/* Mask wipe */}
                <div
                    ref={heroMaskRef}
                    className="absolute inset-0 z-10 origin-top"
                    style={{ backgroundColor: '#0a0a0a' }}
                />

                {/* Text content */}
                <div ref={heroTextRef} className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-10 pb-16">
                    <div className="w-full max-w-[1400px] mx-auto">
                        {/* Back link */}
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40 hover:text-white transition-colors duration-300 mb-12"
                        >
                            ← All Projects
                        </Link>

                        <div className="grid grid-cols-12 gap-6 items-end">
                            <div className="col-span-12 md:col-span-8">
                                <div className="flex items-center gap-4 mb-5">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: project.accent }}>
                                        {project.index} / {project.category}
                                    </span>
                                </div>
                                <h1 className="text-[12vw] md:text-[7vw] font-bold leading-[0.88] tracking-tight text-white">
                                    {project.title}
                                </h1>
                                <p className="mt-4 text-[4vw] md:text-[1.8vw] lg:text-[1.4vw] text-white/50 font-medium leading-tight max-w-xl">
                                    {project.subtitle}
                                </p>
                            </div>
                            <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end gap-3">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] uppercase tracking-[0.2em] font-semibold px-6 py-3 border transition-all duration-300 hover:bg-white hover:text-[#0a0a0a]"
                                    style={{ color: project.accent, borderColor: project.accent }}
                                >
                                    Visit Live Site ↗
                                </a>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                                    {project.year} · {project.duration}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ─────────────────────────────────────────── */}
            <section
                ref={statsSectionRef}
                className="relative z-10 border-t border-white/10 px-6 md:px-10 py-16"
            >
                <div className="w-full max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {project.stats.map((stat, i) => (
                        <div key={i} className="stat-item">
                            <div
                                className="text-[10vw] md:text-[4vw] lg:text-[3vw] font-bold leading-none mb-2"
                                style={{ color: project.accent }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-[9px] uppercase tracking-[0.18em] text-white/30 font-semibold">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── NARRATIVE SECTION ─────────────────────────────────── */}
            <section
                ref={narrativeRef}
                className="relative z-10 px-6 md:px-10 py-24 border-t border-white/10"
            >
                <div className="w-full max-w-[1400px] mx-auto grid grid-cols-12 gap-6">

                    {/* Pinned label */}
                    <div className="col-span-12 md:col-span-3">
                        <div ref={pinnedMetaRef}>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 block mb-6">
                                The Story
                            </span>
                            <div className="space-y-3">
                                {project.tags.map(tag => (
                                    <div key={tag} className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.12em]">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 border-t border-white/10 pt-6 space-y-4">
                                <div>
                                    <div className="text-[8px] uppercase tracking-[0.2em] text-white/20 mb-1">Role</div>
                                    <div className="text-[11px] text-white/50 leading-relaxed">{project.role}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] uppercase tracking-[0.2em] text-white/20 mb-1">Timeline</div>
                                    <div className="text-[11px] text-white/50">{project.duration}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Narrative body */}
                    <div className="col-span-12 md:col-span-8 md:col-start-5 space-y-20">

                        {/* Problem */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-8" style={{ backgroundColor: project.accent }} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: project.accent }}>
                                    Problem
                                </span>
                            </div>
                            <Text variant="slideUp" delay={0.1} stagger={0.03} duration={1.6} animateOnScroll>
                                <p className="text-[5.5vw] md:text-[2vw] lg:text-[1.6vw] font-semibold leading-[1.3] text-white/80">
                                    {project.problem}
                                </p>
                            </Text>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-white/10 w-full" />

                        {/* Solution */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-8" style={{ backgroundColor: project.accent }} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: project.accent }}>
                                    Solution
                                </span>
                            </div>
                            <Text variant="slideUp" delay={0.1} stagger={0.03} duration={1.6} animateOnScroll>
                                <p className="text-[5.5vw] md:text-[2vw] lg:text-[1.6vw] font-semibold leading-[1.3] text-white/80">
                                    {project.solution}
                                </p>
                            </Text>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-white/10 w-full" />

                        {/* Outcome */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-8" style={{ backgroundColor: project.accent }} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: project.accent }}>
                                    Outcome
                                </span>
                            </div>
                            <Text variant="slideUp" delay={0.1} stagger={0.03} duration={1.6} animateOnScroll>
                                <p className="text-[5.5vw] md:text-[2vw] lg:text-[1.6vw] font-semibold leading-[1.3] text-white/80">
                                    {project.outcome}
                                </p>
                            </Text>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── CHAPTERS ──────────────────────────────────────────── */}
            <section
                ref={chaptersRef}
                className="relative z-10 px-6 md:px-10 py-24 border-t border-white/10 bg-[#0d0d0d]"
            >
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="mb-16">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/20">
                            Deep Dive
                        </span>
                    </div>

                    <div className="space-y-0">
                        {project.chapters.map((chapter, i) => (
                            <div
                                key={i}
                                className="chapter-item grid grid-cols-12 gap-6 py-12 border-t border-white/10 group"
                            >
                                <div className="col-span-12 md:col-span-2">
                                    <span
                                        className="font-bold text-[8vw] md:text-[2.5vw] leading-none"
                                        style={{ color: project.accent, opacity: 0.3 }}
                                    >
                                        {chapter.number}
                                    </span>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <Text variant="slideUp" delay={0} stagger={0.03} duration={1.4} animateOnScroll>
                                        <h3 className="text-[5vw] md:text-[2vw] lg:text-[1.5vw] font-bold leading-tight text-white group-hover:opacity-60 transition-opacity duration-300">
                                            {chapter.title}
                                        </h3>
                                    </Text>
                                </div>
                                <div className="col-span-12 md:col-span-5 md:col-start-8">
                                    <Text variant="slideUp" delay={0.1} stagger={0.03} duration={1.4} animateOnScroll>
                                        <p className="text-[4vw] md:text-[1vw] lg:text-[0.95rem] leading-[1.75] text-white/50 font-medium">
                                            {chapter.body}
                                        </p>
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── NEXT PROJECT ──────────────────────────────────────── */}
            {nextProject && (
                <section ref={nextRef} className="relative z-10 border-t border-white/10 overflow-hidden">
                    <Link href={`/projects/${nextProject.id}`} className="block group">
                        <div className="relative h-[55vh] overflow-hidden">
                            <Image
                                src={nextProject.thumbnail}
                                alt={nextProject.title}
                                fill
                                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ filter: 'brightness(0.3) saturate(0.7)' }}
                            />
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{ backgroundColor: nextProject.accent }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                <div className="next-item">
                                    <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/30 block mb-6">
                                        Next Project
                                    </span>
                                </div>
                                <div className="next-item">
                                    <h2 className="text-[12vw] md:text-[7vw] font-bold leading-[0.88] tracking-tight text-white mb-4">
                                        {nextProject.title}
                                    </h2>
                                </div>
                                <div className="next-item">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: nextProject.accent }}>
                                        {nextProject.category} →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

        </div>
    )
}