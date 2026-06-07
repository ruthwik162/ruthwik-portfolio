import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./Components/SmoothScroll";
import Navbar from "./Components/Navbar";
import Providers from "./Components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ═══════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE SEO METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  // ─── Basic Metadata ────────────────────────────────────────────────────
  title: {
    default: "Nagaruthwik Merugu | Full-Stack Developer & Studio Founder | MERN Stack Expert",
    template: "%s | Nagaruthwik Merugu",
  },
  description:
    "Full-stack web developer and founder of Nothing2Real Web Studio. Specializing in MERN stack, React, Next.js, Node.js, and Java Spring Boot. Building production-ready eCommerce platforms and enterprise web solutions for real businesses in Hyderabad, India. Fresh Computer Science graduate seeking software development roles.",

  // ─── Keywords ──────────────────────────────────────────────────────────
  keywords: [
    // Primary Skills
    "full-stack developer",
    "MERN stack developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "JavaScript developer",
    "TypeScript developer",
    "Java Spring Boot developer",

    // Technologies
    "MongoDB developer",
    "Express.js",
    "REST API development",
    "full-stack web development",
    "frontend development",
    "backend development",

    // Specializations
    "eCommerce developer",
    "eCommerce platform development",
    "web application development",
    "responsive web design",
    "3D web integration",
    "Three.js developer",

    // Location-based
    "web developer Hyderabad",
    "full-stack developer Hyderabad India",
    "software engineer Hyderabad",
    "React developer Hyderabad",
    "Telangana web developer",

    // Business & Studio
    "Nothing2Real Web Studio",
    "freelance web developer",
    "web development studio",
    "startup founder developer",

    // Education & Experience
    "Computer Science graduate",
    "Malla Reddy University CSE",
    "fresh graduate developer",
    "entry-level software engineer",
    "junior full-stack developer",

    // Projects
    "Netha Silks eCommerce",
    "Sharvani Jewellery website",
    "Pochampally saree online store",
    "hospital website development",

    // Industry
    "web development services",
    "custom web applications",
    "business website development",
    "digital solutions developer",

    // Hiring Keywords
    "hire full-stack developer",
    "React developer for hire",
    "MERN stack developer looking for job",
    "software developer job seeker",
    "web developer portfolio",

    // Tools & Frameworks
    "Tailwind CSS",
    "GSAP animations",
    "Framer Motion",
    "Git GitHub",
    "Vercel deployment",
    "Firebase integration",
    "Postman API testing",
  ],

  // ─── Author & Creator ──────────────────────────────────────────────────
  authors: [
    {
      name: "Nagaruthwik Merugu",
      url: "https://nagaruthwik.vercel.app",
    },
  ],
  creator: "Nagaruthwik Merugu",
  publisher: "Nothing2Real Web Studio",

  // ─── Verification & Ownership ──────────────────────────────────────────
  verification: {
    google: "your-google-verification-code", // Replace with actual code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // ─── Robots & Indexing ─────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Open Graph (Facebook, LinkedIn) ───────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nagaruthwik.vercel.app",
    siteName: "Nagaruthwik Merugu - Full-Stack Developer Portfolio",
    title: "Nagaruthwik Merugu | Full-Stack Developer & Nothing2Real Studio Founder",
    description:
      "Full-stack web developer specializing in MERN stack, React, Next.js, and Java Spring Boot. Founder of Nothing2Real Web Studio managing 5+ live client websites. Building production eCommerce platforms and enterprise solutions in Hyderabad, India.",
    images: [
      {
        url: "https://nagaruthwik.vercel.app/logo.png", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "Nagaruthwik Merugu - Full-Stack Developer Portfolio",
        type: "image/png",
      },
      {
        url: "https://nagaruthwik.vercel.app/og-square.jpg", // Square for some platforms
        width: 1200,
        height: 1200,
        alt: "Nagaruthwik Merugu - Developer",
      },
    ],
  },

  // ─── Twitter Card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@nagaruthwik", // Replace with actual Twitter handle if exists
    creator: "@nagaruthwik", // Replace with actual Twitter handle
    title: "Nagaruthwik Merugu | Full-Stack Developer & Studio Founder",
    description:
      "MERN stack developer & founder of Nothing2Real Web Studio. Building production eCommerce platforms. React, Next.js, Node.js, Java Spring Boot. Hyderabad, India.",
    images: ["https://nagaruthwik.vercel.app/twitter-card.jpg"], // Replace with actual image
  },

  // ─── Alternate Languages ───────────────────────────────────────────────
  alternates: {
    canonical: "https://nagaruthwik.vercel.app",
    languages: {
      "en-IN": "https://nagaruthwik.vercel.app",
      "en-US": "https://nagaruthwik.vercel.app",
    },
  },

  // ─── Category ──────────────────────────────────────────────────────────
  category: "Technology",

  // ─── Additional Metadata ───────────────────────────────────────────────
  other: {
    // Geo targeting
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad",
    "geo.position": "17.385044;78.486671",
    "ICBM": "17.385044, 78.486671",

    // Contact
    "contact:email": "ruthwik.merugu@outlook.com",
    "contact:phone_number": "+91-9182216089",

    // Professional
    "profile:first_name": "Nagaruthwik",
    "profile:last_name": "Merugu",
    "profile:username": "ruthwik162",

    // Classification
    "classification": "Web Development, Software Engineering, Full-Stack Development",
    "rating": "General",
    "distribution": "Global",

    // Mobile
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Nagaruthwik Portfolio",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ADDITIONAL SEO & PERFORMANCE TAGS */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme Color */}
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />

        {/* JSON-LD Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://nagaruthwik.vercel.app/#person",
              name: "Nagaruthwik Merugu",
              alternateName: "Ruthwik Merugu",
              url: "https://nagaruthwik.vercel.app",
              image: "https://nagaruthwik.vercel.app/profile-image.jpg",
              sameAs: [
                "https://github.com/ruthwik162",
                "https://linkedin.com/in/nagaruthwikmerugu",
                "https://nagaruthwik.vercel.app",
              ],
              jobTitle: "Full-Stack Web Developer",
              worksFor: {
                "@type": "Organization",
                name: "Nothing2Real Web Studio",
                url: "https://nagaruthwik.vercel.app",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Malla Reddy University",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Hyderabad",
                  addressRegion: "Telangana",
                  addressCountry: "IN",
                },
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              email: "ruthwik.merugu@outlook.com",
              telephone: "+91-9182216089",
              knowsAbout: [
                "React.js",
                "Next.js",
                "Node.js",
                "MongoDB",
                "JavaScript",
                "TypeScript",
                "Java Spring Boot",
                "Full-Stack Development",
                "eCommerce Development",
                "Web Development",
              ],
              description:
                "Full-stack web developer and founder of Nothing2Real Web Studio, specializing in MERN stack development, building production eCommerce platforms and enterprise web solutions.",
            }),
          }}
        />

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://nagaruthwik.vercel.app/#organization",
              name: "Nothing2Real Web Studio",
              url: "https://nagaruthwik.vercel.app",
              logo: "https://nagaruthwik.vercel.app/logo.png",
              founder: {
                "@type": "Person",
                name: "Nagaruthwik Merugu",
              },
              foundingDate: "2025",
              description:
                "Web development studio building digital solutions for real businesses, specializing in eCommerce platforms and custom web applications.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "ruthwik.merugu@outlook.com",
                telephone: "+91-9182216089",
                contactType: "Customer Service",
              },
            }),
          }}
        />

        {/* Professional Profile Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              dateCreated: "2025-01-01T00:00:00+05:30",
              dateModified: new Date().toISOString(),
              mainEntity: {
                "@type": "Person",
                "@id": "https://nagaruthwik.vercel.app/#person",
                name: "Nagaruthwik Merugu",
                hasOccupation: {
                  "@type": "Occupation",
                  name: "Full-Stack Web Developer",
                  occupationLocation: {
                    "@type": "City",
                    name: "Hyderabad",
                  },
                  estimatedSalary: {
                    "@type": "MonetaryAmountDistribution",
                    name: "Entry to Mid-Level Developer",
                    currency: "INR",
                  },
                  skills: [
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "JavaScript",
                    "TypeScript",
                    "Java",
                    "Spring Boot",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                    "REST APIs",
                    "Git",
                    "GitHub",
                  ],
                },
              },
            }),
          }}
        />

        {/* WebSite Structured Data for Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://nagaruthwik.vercel.app/#website",
              url: "https://nagaruthwik.vercel.app",
              name: "Nagaruthwik Merugu Portfolio",
              description:
                "Portfolio and professional website of Nagaruthwik Merugu, full-stack web developer and founder of Nothing2Real Web Studio",
              publisher: {
                "@id": "https://nagaruthwik.vercel.app/#person",
              },
              inLanguage: "en-IN",
            }),
          }}
        />

        {/* BreadcrumbList for better navigation understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://nagaruthwik.vercel.app",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "About",
                  item: "https://nagaruthwik.vercel.app#about",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Projects",
                  item: "https://nagaruthwik.vercel.app#works",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Contact",
                  item: "https://nagaruthwik.vercel.app#contact",
                },
              ],
            }),
          }}
        />
      </head>


      <body className="min-h-full flex flex-col">

        <Providers>
          <Navbar />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </Providers>

      </body>
    </html >
  );
}