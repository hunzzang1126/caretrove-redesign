"use client";

import { motion, useReducedMotion } from "motion/react";
import BrandPin from "@/components/BrandPin";

const WORDS = ["Book", "care", "you", "can"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroTitle() {
  const reduce = useReducedMotion();

  return (
    <h1
      className="text-center text-[clamp(36px,7.8vw,64px)] font-extrabold leading-[1.06] tracking-tight text-ink"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {WORDS.map((w, i) => (
        <motion.span
          key={w}
          className="inline-block"
          initial={reduce ? false : { opacity: 0, y: "0.6em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 + i * 0.07, ease: EASE }}
        >
          {w}
          <span aria-hidden>&nbsp;</span>
        </motion.span>
      ))}
      <motion.span
        className="inline-block italic"
        initial={reduce ? false : { opacity: 0, y: "0.6em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1 + WORDS.length * 0.07, ease: EASE }}
      >
        trust
      </motion.span>
      {/* The period is the brand pin, dropped into place */}
      <motion.span
        aria-hidden
        className="ml-[0.08em] inline-block w-[0.44em] translate-y-[0.1em] align-baseline"
        initial={reduce ? false : { opacity: 0, y: "-0.9em", scale: 1.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          reduce
            ? undefined
            : { delay: 0.72, type: "spring", stiffness: 420, damping: 17, mass: 0.9 }
        }
      >
        <BrandPin className="h-auto w-full drop-shadow-[0_3px_5px_rgba(241,90,37,0.35)]" />
      </motion.span>
    </h1>
  );
}
