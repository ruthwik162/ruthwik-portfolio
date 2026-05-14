"use client";

import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { PageReadyContext } from "./PageTransitionProvider";

/**
 * usePageEnter
 *
 * Attach this ref to your page root div. The element stays invisible
 * (opacity: 0) until PageTransitionProvider flips isReady = true,
 * which happens the moment the exit panels start leaving the screen.
 *
 * Usage:
 *   const pageRef = usePageEnter<HTMLDivElement>();
 *   return <div ref={pageRef}>…</div>;
 */
interface UsePageEnterOptions {
  duration?: number;
  y?: number;
}

export function usePageEnter<T extends HTMLElement = HTMLDivElement>(
  options: UsePageEnterOptions = {}
) {
  const { duration = 0.9, y = 28 } = options;
  const ref        = useRef<T | null>(null);
  const { isReady } = useContext(PageReadyContext);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);

  // Immediately hide the element on mount so it doesn't flash
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y });
  }, [y]);

  // Reveal when the provider says the page is ready
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReady) {
      tweenRef.current?.kill();
      tweenRef.current = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power3.out",
      });
    } else {
      tweenRef.current?.kill();
      gsap.set(el, { opacity: 0, y });
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [isReady, duration, y]);

  return ref;
}

export default usePageEnter;