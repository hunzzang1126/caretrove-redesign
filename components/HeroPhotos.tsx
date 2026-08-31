"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/* Floating treatment photos with scroll parallax. Outer motion.div owns the
   parallax translate; the inner wrapper owns the idle float + tilt, so the
   two transforms never fight. */
export default function HeroPhotos() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 640], [0, 150]);
  const yFast = useTransform(scrollY, [0, 640], [0, 70]);

  return (
    <>
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: ySlow }}
        className="pointer-events-none absolute -left-7 top-2 w-[86px] md:left-[2%] md:top-[16%] md:w-[168px] xl:left-[4%] xl:top-[14%] xl:w-[200px]"
      >
        <div
          className="motion-safe:animate-[ct-float_7s_ease-in-out_infinite]"
          style={{ "--r": "-6deg" } as React.CSSProperties}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_50px_-18px_rgba(28,25,23,0.35)] xl:rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80&auto=format&fit=crop"
              alt=""
              fill
              sizes="(max-width: 768px) 86px, 200px"
              className="object-cover"
            />
            <span className="glass-sheen" aria-hidden />
          </div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: yFast }}
        className="pointer-events-none absolute -right-7 top-[54%] w-[82px] md:right-[2%] md:top-[22%] md:w-[156px] xl:right-[4%] xl:top-[18%] xl:w-[185px]"
      >
        <div
          className="motion-safe:animate-[ct-float_9s_ease-in-out_infinite]"
          style={{ "--r": "5deg" } as React.CSSProperties}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_50px_-18px_rgba(28,25,23,0.35)] xl:rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1620733723572-11c53f73a416?w=600&q=80&auto=format&fit=crop"
              alt=""
              fill
              sizes="(max-width: 768px) 82px, 185px"
              className="object-cover"
            />
            <span className="glass-sheen" aria-hidden />
          </div>
          <div className="absolute -bottom-4 -left-10 hidden items-center gap-1.5 rounded-full bg-white px-4 py-2.5 shadow-[0_12px_30px_-10px_rgba(28,25,23,0.3)] md:flex">
            <span className="text-[14px] font-extrabold">4.7</span>
            <span className="flex items-center text-brand">★</span>
            <span className="text-[12.5px] text-stone-500">191 verified reviews</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
