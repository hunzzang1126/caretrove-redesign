"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { MagnifyingGlass, Scales, CalendarCheck } from "@phosphor-icons/react";

/* RECOSM pillars-scene, rebuilt for CareTrove: diagonal ellipse photo with
   internal parallax, cards drifting past it at different scrub speeds, a
   hand-drawn arrow that draws itself in, and a circular photo accent.
   Transform-only choreography — everything is visible before JS runs. */

const steps = [
  {
    icon: MagnifyingGlass,
    title: "Search",
    body: "Find what you need by service, provider, or location.",
  },
  {
    icon: Scales,
    title: "Compare",
    body: "View services, prices, availability, and verified patient reviews side by side.",
  },
  {
    icon: CalendarCheck,
    title: "Book",
    body: "Choose your care and schedule a time that works for you.",
  },
];

const CARD_POS = [
  "md:left-[4%] md:top-[16%]",
  "md:right-[4%] md:top-[4%]",
  "md:right-[15%] md:bottom-[2%]",
];

function StepCard({
  step,
  pos,
  y,
}: {
  step: (typeof steps)[number];
  pos: string;
  y: MotionValue<number> | 0;
}) {
  return (
    <motion.div
      style={y === 0 ? undefined : { y }}
      className={`rounded-2xl bg-white px-6 py-7 text-center shadow-[0_18px_50px_-24px_rgba(28,25,23,0.35)] md:absolute md:w-[260px] ${pos}`}
    >
      <span className="mx-auto flex size-[64px] items-center justify-center rounded-full bg-gradient-to-br from-[#F67E50] via-[#F15A25] to-[#D14A1A] text-white shadow-[0_10px_24px_-10px_rgba(241,90,37,0.65)]">
        <step.icon size={26} weight="bold" />
      </span>
      <h3 className="mt-4 text-[16.5px] font-bold">{step.title}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-stone-500">
        {step.body}
      </p>
    </motion.div>
  );
}

export default function HowItWorksScene() {
  const ref = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [arrowLen, setArrowLen] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    if (arrowRef.current) setArrowLen(arrowRef.current.getTotalLength());
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const y1 = useTransform(scrollYProgress, [0, 1], [210, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [350, -170]);
  const y3 = useTransform(scrollYProgress, [0, 1], [490, -240]);
  const dash = useTransform(scrollYProgress, [0.08, 0.4], [arrowLen, 0]);
  const ys = [y1, y2, y3];
  const active = desktop && !reduce;

  return (
    <div>
      <h2 className="mx-auto max-w-[22ch] text-center font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        How CareTrove <span className="italic">Works</span>
      </h2>

      <div
        ref={ref}
        className="relative mt-8 max-md:flex max-md:flex-col max-md:gap-4 md:mt-14 md:h-[820px] xl:h-[980px]"
      >
        {/* Diagonal ellipse photo */}
        <div className="relative -rotate-[14deg] scale-[1.04] overflow-hidden rounded-[50%] max-md:my-8 max-md:aspect-[1.55/1] max-md:w-full md:absolute md:left-1/2 md:top-1/2 md:aspect-[1.55/1] md:w-[820px] xl:w-[1040px] md:-translate-x-1/2 md:-translate-y-1/2 md:rotate-[-28deg] md:scale-100">
          <div className="absolute left-1/2 top-1/2 h-[172%] w-[118%] -translate-x-1/2 -translate-y-1/2 rotate-[14deg] md:rotate-[28deg]">
            <motion.div
              style={active ? { y: imgY } : undefined}
              className="absolute inset-0"
            >
              <Image
                src="/images/how-scene.jpg"
                alt="A guest in a bathrobe booking her next visit on her phone"
                fill
                sizes="(max-width: 768px) 140vw, 75vw"
                className="object-cover object-[60%_35%]"
              />
            </motion.div>
          </div>
        </div>

        {/* Hand-drawn arrow, draws in on scroll */}
        <svg
          viewBox="0 0 220 140"
          fill="none"
          aria-hidden
          className="absolute right-[4%] top-[6%] w-[140px] xl:w-[200px] text-ink opacity-75 md:right-[12%] md:top-[3%]"
        >
          <motion.path
            ref={arrowRef}
            d="M204 8C170 84 96 122 18 108"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray={arrowLen || undefined}
            style={active && arrowLen ? { strokeDashoffset: dash } : undefined}
          />
          <path
            d="M30 96l-14 11 17 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Circular photo accent */}
        <div className="absolute bottom-[7%] left-[14%] hidden aspect-square w-[110px] xl:w-[150px] overflow-hidden rounded-full shadow-[0_16px_40px_-16px_rgba(28,25,23,0.4)] md:block">
          <Image
            src="/images/hero-right.jpg"
            alt=""
            aria-hidden
            fill
            sizes="150px"
            className="object-cover"
          />
        </div>

        {steps.map((step, i) => (
          <StepCard
            key={step.title}
            step={step}
            pos={CARD_POS[i]}
            y={active ? ys[i] : 0}
          />
        ))}
      </div>
    </div>
  );
}
