"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger within a row of siblings, in seconds. */
  delay?: number;
  as?: ElementType;
}

/**
 * Fades content in as it enters the viewport.
 *
 * The hidden state is written to the DOM from an effect rather than held in
 * React state: the content then renders visible on the server, stays visible
 * without JavaScript, and skips the animation entirely for anyone who has asked
 * for reduced motion.
 */
export function Reveal({ children, className, delay = 0, as: Comp = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.dataset.reveal = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Comp
      ref={ref}
      className={["zw-reveal", className].filter(Boolean).join(" ")}
      style={delay ? ({ "--zw-reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Comp>
  );
}
