"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SearchPill from "@/components/SearchPill";

/* pillOnScroll: home mode. The compact pill fades in only after the hero pill
   scrolls out of view (the sentinel is #hero-pill-sentinel rendered by the page). */
export default function Header({ pillOnScroll = false }: { pillOnScroll?: boolean }) {
  const [showPill, setShowPill] = useState(!pillOnScroll);
  const raf = useRef(0);

  useEffect(() => {
    if (!pillOnScroll) return;
    const sentinel = document.getElementById("hero-pill-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => setShowPill(!entry.isIntersecting));
      },
      { rootMargin: "-72px 0px 0px 0px" }
    );
    io.observe(sentinel);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [pillOnScroll]);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto grid h-[72px] max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center px-3 md:px-10">
        <Link
          href="/"
          aria-label="CareTrove home"
          className="col-start-1 justify-self-start"
        >
          <Image src="/logo.svg" alt="CareTrove" width={182} height={43} priority className="h-auto w-[146px] -translate-y-[4px] md:w-[182px] md:-translate-y-[5px]" />
        </Link>

        <div
          className={`col-start-2 hidden justify-self-center transition-all duration-300 md:block ${
            showPill
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <SearchPill compact />
        </div>

        <nav className="col-start-3 flex items-center gap-0.5 justify-self-end md:gap-2">
          <Link
            href="/#for-providers"
            className="whitespace-nowrap rounded-full px-1 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-stone-100 md:px-4 md:text-[15px]"
          >
            List Your Practice
          </Link>
          <Link
            href="/search"
            className="whitespace-nowrap rounded-full bg-ink px-2.5 py-[7px] text-[12px] font-bold text-white transition-colors hover:bg-stone-700 active:scale-[0.98] md:px-5 md:py-2.5 md:text-[15px]"
          >
            Login / Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
