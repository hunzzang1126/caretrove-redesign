"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Scroll-triggered reveal, safe by construction:
   - Server renders fully visible; the hidden state is applied only after
     mount, and only to elements still below the viewport. JS off or slow
     means everything simply shows.
   - IntersectionObserver-based (no pointer/scroll handlers), transform and
     opacity only, so it is mobile-safe.
   - `media` limits the effect to a breakpoint (e.g. mobile-only reveals
     where desktop already has scrub choreography). */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 26,
  media,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  media?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (media && !window.matchMedia(media).matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [media]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        state === "idle"
          ? undefined
          : {
              opacity: state === "hidden" ? 0 : 1,
              transform:
                state === "hidden" ? `translateY(${y}px)` : "translateY(0)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            }
      }
    >
      {children}
    </div>
  );
}
