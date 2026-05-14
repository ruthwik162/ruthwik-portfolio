"use client";

import React from "react";
import { usePageTransition } from "./PageTransitionProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * TransitionLink
 *
 * A drop-in replacement for Next.js <Link> that fires the page transition
 * before pushing the new route. Use everywhere you would normally use <Link>.
 *
 * Usage:
 *   <TransitionLink href="/work">Work</TransitionLink>
 *   <TransitionLink href="/about" className="nav-link">About</TransitionLink>
 */
const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className,
  onClick,
  ...rest
}) => {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow modifier keys to open in new tab normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    onClick?.(e);
    navigateTo(href);
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default TransitionLink;