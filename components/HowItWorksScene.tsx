"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import {
  MagnifyingGlass,
  Scales,
  CalendarCheck,
  ArrowRight,
} from "@phosphor-icons/react";

const steps = [
  {
    icon: MagnifyingGlass,
    num: "01",
    title: "Search",
    body: "Find what you need by service, provider, or location.",
  },
  {
    icon: Scales,
    num: "02",
    title: "Compare",
    body: "View services, prices, availability, and verified patient reviews side by side.",
  },
  {
    icon: CalendarCheck,
    num: "03",
    title: "Book",
    body: "Choose your care and schedule a time that works for you.",
  },
];

/* Each card drifts at its own speed while the section scrolls past —
   transform-only, so everything is fully visible even before JS runs. */
function StepCard({
  step,
  y,
}: {
  step: (typeof steps)[number];
  y: MotionValue<number> | 0;
}) {
  return (
    <motion.div
      style={y === 0 ? undefined : { y }}
      className="rounded-2xl bg-white p-7 shadow-[0_14px_40px_-22px_rgba(28,25,23,0.3)] md:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#F67E50] via-[#F15A25] to-[#D14A1A] text-white shadow-[0_8px_20px_-8px_rgba(241,90,37,0.6)]">
          <step.icon size={22} weight="bold" />
        </span>
        <span className="font-display text-[15px] font-extrabold tracking-widest text-stone-300">
          {step.num}
        </span>
      </div>
      <h3 className="mt-4 text-[17px] font-bold">{step.title}</h3>
      <p className="mt-1.5 max-w-[44ch] text-[14.5px] leading-relaxed text-stone-500">
        {step.body}
      </p>
    </motion.div>
  );
}

export default function HowItWorksScene() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const y1 = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const y2 = useTransform(scrollYProgress, [0, 1], [86, -86]);
  const y3 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const active = desktop && !reduce;

  return (
    <div ref={ref} className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14 xl:gap-20">
      <div className="ring-shimmer relative overflow-hidden rounded-[28px] bg-stone-100 max-md:aspect-[4/3] md:aspect-[3/4] md:w-[420px] xl:w-[480px]">
        <motion.div
          style={active ? { y: photoY } : undefined}
          className="absolute -inset-y-[8%] inset-x-0"
        >
          <Image
            src="/images/how-scene.jpg"
            alt="A guest in a bathrobe booking her next visit on her phone"
            fill
            sizes="(max-width: 768px) 100vw, 46vw"
            className="object-cover object-[62%_center]"
          />
        </motion.div>
        <span className="glass-sheen" aria-hidden />
        <div className="glass-deep absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl px-5 py-4">
          <p className="text-[14px] font-semibold leading-snug text-white">
            Booked in under a minute,
            <br />
            no phone calls needed.
          </p>
          <Link
            href="/search"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105 active:scale-95"
            aria-label="Start searching"
          >
            <ArrowRight size={17} weight="bold" />
          </Link>
        </div>
      </div>

      <div className="space-y-5 md:space-y-6 md:pr-1">
        <StepCard step={steps[0]} y={active ? y1 : 0} />
        <StepCard step={steps[1]} y={active ? y2 : 0} />
        <StepCard step={steps[2]} y={active ? y3 : 0} />
      </div>
    </div>
  );
}
