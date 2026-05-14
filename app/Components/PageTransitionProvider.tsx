"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";

// ─── Context ──────────────────────────────────────────────────────────────────

interface TransitionContextValue {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

// ─── Page Visibility Gate ─────────────────────────────────────────────────────
// Consumed by usePageEnter — new page stays opacity:0 until this flips true

interface ReadyContextValue {
  isReady: boolean;
}

export const PageReadyContext = createContext<ReadyContextValue>({
  isReady: true,
});

// ─── Provider ────────────────────────────────────────────────────────────────

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router   = useRouter();
  const pathname = usePathname();

  // Gates the new page's reveal animation
  const [isReady, setIsReady]     = useState(true);
  const isAnimating               = useRef(false);
  const pendingPathname           = useRef<string | null>(null);

  // Overlay DOM refs
  const overlayRef  = useRef<HTMLDivElement>(null);
  const panel1Ref   = useRef<HTMLDivElement>(null);
  const panel2Ref   = useRef<HTMLDivElement>(null);
  const panel3Ref   = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const loaderRef   = useRef<HTMLDivElement>(null);

  // ── When pathname actually changes (new page mounted) ─────────────────────
  useEffect(() => {
    // Only run the EXIT animation if we triggered this navigation ourselves
    if (!pendingPathname.current) return;
    pendingPathname.current = null;

    const overlay = overlayRef.current;
    const panels  = [panel1Ref.current, panel2Ref.current, panel3Ref.current];

    if (!overlay || panels.some((p) => !p)) {
      setIsReady(true);
      isAnimating.current = false;
      return;
    }

    // Small tick to let Next.js finish hydrating the new page
    requestAnimationFrame(() => {
      // ── PHASE 2: panels sweep OUT upward, revealing the new page ────────
      gsap.to(panels, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        stagger: 0.06,
        onStart: () => {
          // Reveal new page just as panels start leaving
          setIsReady(true);
        },
        onComplete: () => {
          gsap.set(overlay, { display: "none", pointerEvents: "none" });
          gsap.set(panels, { yPercent: 100 });
          isAnimating.current = false;
        },
      });
    });
  }, [pathname]);

  // ── Navigate with transition ───────────────────────────────────────────────
  const navigateTo = useCallback(
    (href: string) => {
      if (isAnimating.current || href === pathname) return;
      isAnimating.current = true;

      const overlay = overlayRef.current;
      const panels  = [panel1Ref.current, panel2Ref.current, panel3Ref.current];
      const label   = labelRef.current;
      const loader  = loaderRef.current;

      if (!overlay || panels.some((p) => !p)) {
        router.push(href);
        isAnimating.current = false;
        return;
      }

      // Update label
      const slug = href === "/" ? "Home" : href.replace(/^\//, "").replace(/\//g, " · ");
      if (label) label.textContent = slug.charAt(0).toUpperCase() + slug.slice(1);

      // ── PHASE 1: panels sweep IN, covering current page ──────────────────
      gsap
        .timeline()
        .set(overlay, { display: "flex", pointerEvents: "all" })
        .set(panels, { yPercent: 100 })
        .to(panels, {
          yPercent: 0,
          duration: 0.75,
          ease: "power4.inOut",
          stagger: 0.06,
        })
        .fromTo(
          [label, loader],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", stagger: 0.05 },
          "-=0.15"
        )
        // Mark new page as NOT ready before pushing route
        .call(() => {
          setIsReady(false);
          pendingPathname.current = href;
          router.push(href);
        })
        // Fade label while waiting for new page to mount
        .to([label, loader], {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          delay: 0.3,
        });
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      <PageReadyContext.Provider value={{ isReady }}>
        {children}

        {/* ── Overlay ──────────────────────────────────────────────────────── */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            display: "none",
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Panels — staggered venetian shutter */}
          {(
            [
              { ref: panel1Ref, bg: "#0a0a0a" },
              { ref: panel2Ref, bg: "#111111" },
              { ref: panel3Ref, bg: "#f5f0eb" },
            ] as Array<{ ref: React.RefObject<HTMLDivElement | null>; bg: string }>
          ).map(({ ref, bg }, i) => (
            <div
              key={i}
              ref={ref}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: bg,
                transform: "translateY(100%)",
                willChange: "transform",
              }}
            />
          ))}

          {/* Label centred on the cream panel */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <div
              ref={loaderRef}
              style={{
                fontFamily: "PPNeueMontreal, 'Helvetica Neue', sans-serif",
                fontSize: "clamp(0.55rem, 0.9vw, 0.7rem)",
                letterSpacing: "0.35em",
                color: "#0a0a0a",
                opacity: 0,
                textTransform: "uppercase",
              }}
            >
              Loading
            </div>
            <div
              ref={labelRef}
              style={{
                fontFamily: "PPNeueMontreal, 'Helvetica Neue', sans-serif",
                fontSize: "clamp(2rem, 6vw, 5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
                opacity: 0,
                textAlign: "center",
                maxWidth: "80vw",
                lineHeight: 1,
              }}
            />
          </div>
        </div>
      </PageReadyContext.Provider>
    </TransitionContext.Provider>
  );
};

export default PageTransitionProvider;