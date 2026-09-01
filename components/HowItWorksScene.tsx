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
import ScrollReveal from "@/components/ScrollReveal";

/* RECOSM pillars-scene, rebuilt for CareTrove: diagonal ellipse photo with
   internal parallax, and the three steps arriving IN ORDER as you scroll —
   each card rises from below the fold, lands at its anchor, then keeps a
   slow drift. Transform-only choreography: with JS off, every card simply
   sits at its anchor, fully visible. */

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

/* anchor position, resting tilt, and the scroll window where each card lands */
const CARDS = [
  { pos: "md:left-[3%] md:top-[13%]", tilt: "md:-rotate-2", land: 0.3, from: 420 },
  { pos: "md:right-[3%] md:top-[2%]", tilt: "md:rotate-[1.5deg]", land: 0.44, from: 560 },
  { pos: "md:right-[13%] md:-bottom-[1%]", tilt: "md:-rotate-1", land: 0.58, from: 700 },
];

function StepCard({
  step,
  pos,
  tilt,
  index,
  y,
  scale,
  opacity,
}: {
  step: (typeof steps)[number];
  pos: string;
  tilt: string;
  index: number;
  y: MotionValue<number> | 0;
  scale: MotionValue<number> | 1;
  opacity: MotionValue<number> | 1;
}) {
  return (
    <ScrollReveal
      media="(max-width: 767px)"
      delay={index * 0.1}
      y={34}
      className={`md:absolute md:w-[300px] xl:w-[345px] ${pos}`}
    >
      <motion.div
        style={y === 0 ? undefined : { y, scale, opacity }}
        className={`relative rounded-3xl bg-white px-8 py-9 text-center shadow-[0_28px_70px_-28px_rgba(28,25,23,0.45)] ${tilt}`}
      >
      <span className="mx-auto flex size-[72px] items-center justify-center rounded-full bg-gradient-to-br from-[#F67E50] via-[#F15A25] to-[#D14A1A] text-white shadow-[0_12px_28px_-10px_rgba(241,90,37,0.7)]">
        <step.icon size={30} weight="bold" />
      </span>
      <h3 className="mt-5 text-[19px] font-extrabold tracking-tight xl:text-[21px]">
        {step.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-stone-500 xl:text-[14.5px]">
        {step.body}
      </p>
      </motion.div>
    </ScrollReveal>
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

  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  /* Sequential arrivals: rise from far below, land at the anchor, keep drifting */
  const y0 = useTransform(scrollYProgress, [0, CARDS[0].land, 1], [CARDS[0].from, 0, -110]);
  const y1 = useTransform(scrollYProgress, [0.06, CARDS[1].land, 1], [CARDS[1].from, 0, -90]);
  const y2 = useTransform(scrollYProgress, [0.14, CARDS[2].land, 1], [CARDS[2].from, 0, -70]);
  const s0 = useTransform(scrollYProgress, [0, CARDS[0].land], [0.85, 1]);
  const s1 = useTransform(scrollYProgress, [0.06, CARDS[1].land], [0.85, 1]);
  const s2 = useTransform(scrollYProgress, [0.14, CARDS[2].land], [0.85, 1]);
  const o0 = useTransform(scrollYProgress, [0.02, 0.18], [0, 1]);
  const o1 = useTransform(scrollYProgress, [0.12, 0.3], [0, 1]);
  const o2 = useTransform(scrollYProgress, [0.24, 0.44], [0, 1]);
  const ys = [y0, y1, y2];
  const ss = [s0, s1, s2];
  const os = [o0, o1, o2];
  const active = desktop && !reduce;

  return (
    <div>
      <ScrollReveal y={20}>
        <h2 className="mx-auto max-w-[22ch] text-center font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          How CareTrove <span className="italic">Works</span>
        </h2>
      </ScrollReveal>

      <div
        ref={ref}
        className="relative mt-8 max-md:flex max-md:flex-col max-md:gap-4 md:mt-14 md:h-[900px] xl:h-[1040px]"
      >
        {/* Diagonal ellipse photo */}
        <ScrollReveal media="(max-width: 767px)" y={30} className="md:contents">
        <div className="relative -rotate-[14deg] scale-[1.04] overflow-hidden rounded-[50%] max-md:my-8 max-md:aspect-[1.55/1] max-md:w-full md:absolute md:left-1/2 md:top-1/2 md:aspect-[1.55/1] md:w-[820px] md:-translate-x-1/2 md:-translate-y-1/2 md:rotate-[-28deg] md:scale-100 xl:w-[1040px]">
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
        </ScrollReveal>


        {/* Circular photo accent */}
        <div className="absolute bottom-[7%] left-[13%] hidden aspect-square w-[110px] overflow-hidden rounded-full shadow-[0_16px_40px_-16px_rgba(28,25,23,0.4)] md:block xl:w-[150px]">
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
            pos={CARDS[i].pos}
            tilt={CARDS[i].tilt}
            index={i}
            y={active ? ys[i] : 0}
            scale={active ? ss[i] : 1}
            opacity={active ? os[i] : 1}
          />
        ))}
      </div>
    </div>
  );
}
