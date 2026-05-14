"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type EaseType =
  | "power4.out"
  | "power3.out"
  | "power2.out"
  | "expo.out"
  | "elastic.out(1,0.5)"
  | "back.out(1.7)"
  | "circ.out";

type AnimationVariant =
  | "slideUp"       // classic slide from below (original)
  | "slideDown"     // slide from above
  | "reveal"        // fast clip reveal with slight scale
  | "cascade"       // staggered blur + slide
  | "drift"         // slow diagonal drift up
  | "spring"        // elastic spring pop
  | "glide";        // smooth glide with rotation

/**
 * indentLines — per-line indent overrides.
 *
 * Pass a record whose keys are 0-based line indices and whose values are
 * any valid CSS length string, e.g.:
 *
 *   indentLines={{ 0: "0rem", 1: "2rem", 2: "5rem", 3: "9rem" }}
 *
 * Lines not listed keep whatever indent the stylesheet already sets.
 */
interface TextYProps {
  children: React.ReactElement | React.ReactElement[];
  animateOnScroll?: boolean;
  delay?: number;
  variant?: AnimationVariant;
  stagger?: number;
  duration?: number;
  ease?: EaseType;
  scrollStart?: string;
  indentLines?: Record<number, string>;
}

interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

const VARIANT_CONFIGS: Record<AnimationVariant, AnimationConfig> = {
  slideUp: {
    from: { y: "110%", opacity: 1 },
    to: { y: "0%", opacity: 1, ease: "power4.out", duration: 1 },
  },
  slideDown: {
    from: { y: "-110%", opacity: 1 },
    to: { y: "0%", opacity: 1, ease: "power4.out", duration: 0.9 },
  },
  reveal: {
    from: { y: "105%", scaleY: 1.12, opacity: 0 },
    to: { y: "0%", scaleY: 1, opacity: 1, ease: "expo.out", duration: 0.85 },
  },
  cascade: {
    from: { y: "100%", filter: "blur(12px)", opacity: 0 },
    to: { y: "0%", filter: "blur(0px)", opacity: 1, ease: "power3.out", duration: 1.1 },
  },
  drift: {
    from: { y: "80%", x: "-6px", opacity: 0, rotation: 1.5 },
    to: { y: "0%", x: "0px", opacity: 1, rotation: 0, ease: "circ.out", duration: 1.4 },
  },
  spring: {
    from: { y: "100%", scaleX: 0.92, opacity: 0 },
    to: { y: "0%", scaleX: 1, opacity: 1, ease: "elastic.out(1,0.5)", duration: 1.3 },
  },
  glide: {
    from: { y: "100%", skewY: 3, opacity: 0 },
    to: { y: "0%", skewY: 0, opacity: 1, ease: "power4.out", duration: 1.05 },
  },
};

const Text: React.FC<TextYProps> = ({
  children,
  animateOnScroll = true,
  delay = 0,
  variant = "slideUp",
  stagger,
  duration,
  ease,
  scrollStart = "top 75%",
  indentLines,
}) => {
  const containerRef = useRef<HTMLDivElement | HTMLElement | null>(null);
  const elementRef = useRef<HTMLElement[]>([]);
  const splitRef = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        if (!containerRef.current) return;

        // Reset refs
        splitRef.current = [];
        elementRef.current = [];
        lines.current = [];

        const config = VARIANT_CONFIGS[variant];

        // Resolve final animation values (allow prop overrides)
        const toVars: gsap.TweenVars = {
          ...config.to,
          duration: duration ?? (config.to.duration as number),
          ease: ease ?? (config.to.ease as string),
          stagger: stagger ?? 0.1,
          delay,
        };

        // Collect elements
        let elements: HTMLElement[];
        const container = containerRef.current as HTMLElement;

        if (container.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(container.children) as HTMLElement[];
        } else {
          elements = [container];
        }

        elements.forEach((element) => {
          elementRef.current.push(element);

          const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
          });

          splitRef.current.push(split);

          // Preserve text-indent on the first line
          const computedStyle = window.getComputedStyle(element);
          const textIndent = computedStyle.textIndent;

          if (textIndent && textIndent !== "0px") {
            if (split.lines.length > 0) {
              (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
            }
            element.style.textIndent = "0";
          }

          lines.current.push(...(split.lines as HTMLElement[]));
        });

        // Apply per-line indent overrides (indentLines prop)
        if (indentLines) {
          lines.current.forEach((line, i) => {
            if (indentLines[i] !== undefined) {
              line.style.paddingLeft = indentLines[i];
            }
          });
        }
        gsap.set(lines.current, config.from);

        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...toVars,
            scrollTrigger: {
              trigger: container,
              start: scrollStart,
              once: true,
            },
          });
        } else {
          gsap.to(lines.current, toVars);
        }

        // Cleanup
        return () => {
          splitRef.current.forEach((split) => {
            if (split) split.revert();
          });
        };
      });
    },
    {
      scope: containerRef as React.RefObject<HTMLElement>,
      dependencies: [animateOnScroll, delay, variant, stagger, duration, ease, scrollStart, indentLines],
    }
  );

  // Single child: clone with forwarded ref
  // Single child: clone with forwarded ref
  if (React.Children.count(children) === 1) {
    const child = children as React.ReactElement;
    return React.cloneElement(child, {
      ref: containerRef,
    } as any);
  }

  // Multiple children: wrap in a div
  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default Text;