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
}: {
  src: string;
  sizes: string;
  rounded?: string;
}) {
  return (
    <div className="relative">
      <BrandPin className="absolute -top-3 left-1/2 z-10 w-[22px] -translate-x-1/2 drop-shadow-[0_3px_4px_rgba(28,25,23,0.3)]" />
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
          <PinnedPhoto src={LEFT_PHOTO} sizes="200px" rounded="rounded-3xl" />
          <div className="absolute -bottom-4 -right-8 flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 shadow-[0_12px_30px_-10px_rgba(28,25,23,0.3)]">
            <span className="text-[14px] font-extrabold">4.9</span>
            <span className="flex items-center text-brand">★</span>
            <span className="text-[12.5px] text-stone-500">Motor City MedSpa</span>
          </div>
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
          <PinnedPhoto src={RIGHT_PHOTO} sizes="185px" rounded="rounded-3xl" />
          <div className="absolute -bottom-4 -left-10 flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 shadow-[0_12px_30px_-10px_rgba(28,25,23,0.3)]">
            <span className="text-[14px] font-extrabold">4.7</span>
            <span className="flex items-center text-brand">★</span>
            <span className="text-[12.5px] text-stone-500">191 verified reviews</span>
          </div>
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
