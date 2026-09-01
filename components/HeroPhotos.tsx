"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import BrandPin from "@/components/BrandPin";

const LEFT_PHOTO =
  "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80&auto=format&fit=crop";
const RIGHT_PHOTO =
  "https://images.unsplash.com/photo-1620733723572-11c53f73a416?w=600&q=80&auto=format&fit=crop";

function PinnedPhoto({
  src,
  sizes,
  rounded = "rounded-2xl",
  tilt = 0,
}: {
  src: string;
  sizes: string;
  rounded?: string;
  /* photo tilt in degrees; the pin counter-rotates to stay upright */
  tilt?: number;
}) {
  return (
    <div className="relative">
      <span
        className="absolute -top-5 left-1/2 z-10 block w-[27px] -translate-x-1/2"
        style={{ transform: `translateX(-50%) rotate(${-tilt}deg)` }}
      >
        <BrandPin className="h-auto w-full drop-shadow-[0_1px_2px_rgba(28,25,23,0.45)] [filter:drop-shadow(0_1px_2px_rgba(28,25,23,0.45))_drop-shadow(0_8px_14px_rgba(28,25,23,0.25))]" />
        <span
          aria-hidden
          className="absolute left-1/2 top-[calc(100%-4px)] h-[5px] w-[12px] -translate-x-1/2 rounded-full bg-ink/25 blur-[2px]"
        />
      </span>
      <div
        className={`relative aspect-[4/5] overflow-hidden ${rounded} shadow-[0_24px_50px_-18px_rgba(28,25,23,0.35)]`}
      >
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
        <span className="glass-sheen" aria-hidden />
      </div>
    </div>
  );
}

/* Desktop: floating pinned snapshots with scroll parallax. The outer motion.div
   owns the parallax translate; the inner wrapper owns idle float + tilt. */
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
        className="pointer-events-none absolute left-[2%] top-[16%] hidden w-[168px] md:block xl:left-[4%] xl:top-[14%] xl:w-[200px]"
      >
        <div
          className="motion-safe:animate-[ct-float_7s_ease-in-out_infinite]"
          style={{ "--r": "-6deg" } as React.CSSProperties}
        >
          <PinnedPhoto src={LEFT_PHOTO} sizes="200px" rounded="rounded-3xl" tilt={-6} />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: yFast }}
        className="pointer-events-none absolute right-[2%] top-[22%] hidden w-[156px] md:block xl:right-[4%] xl:top-[18%] xl:w-[185px]"
      >
        <div
          className="motion-safe:animate-[ct-float_9s_ease-in-out_infinite]"
          style={{ "--r": "5deg" } as React.CSSProperties}
        >
          <PinnedPhoto src={RIGHT_PHOTO} sizes="185px" rounded="rounded-3xl" tilt={5} />
        </div>
      </motion.div>
    </>
  );
}

/* Mobile: a pinned-polaroid pair below the chips, in normal flow so it never
   collides with the headline or the search pill. */
export function MobilePhotoStrip() {
  return (
    <div aria-hidden className="mt-9 flex items-start justify-center md:hidden">
      <div className="w-[124px] -rotate-6 translate-x-2">
        <PinnedPhoto src={LEFT_PHOTO} sizes="124px" />
      </div>
      <div className="w-[118px] rotate-[5deg] -translate-x-2 translate-y-4">
        <PinnedPhoto src={RIGHT_PHOTO} sizes="118px" />
      </div>
    </div>
  );
}
