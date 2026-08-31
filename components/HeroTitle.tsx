"use client";

import { motion, useReducedMotion } from "motion/react";

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
          className="inline-block font-semibold text-stone-500"
          initial={reduce ? false : { opacity: 0, y: "0.6em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 + i * 0.07, ease: EASE }}
        >
          {w}
          <span aria-hidden>&nbsp;</span>
        </motion.span>
      ))}
      <motion.span
        className="relative inline-block text-[1.08em] font-extrabold italic text-ink"
        initial={reduce ? false : { opacity: 0, y: "0.6em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1 + WORDS.length * 0.07, ease: EASE }}
      >
        trust.
        <motion.span
          aria-hidden
          className="absolute -bottom-2 left-0 h-[7px] w-full origin-left rounded-full bg-brand md:-bottom-2.5"
          style={{ rotate: "-1.2deg" }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        />
      </motion.span>
    </h1>
  );
}
