"use client";

import { motion, useReducedMotion } from "motion/react";

const WORDS = ["Book", "care", "you", "can"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroTitle() {
  const reduce = useReducedMotion();

  return (
    <h1
      className="text-center font-extrabold tracking-tight text-white"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <span className="block text-[clamp(32px,8.4vw,56px)] leading-[1.06]">
        {WORDS.map((w, i) => (
          <motion.span
            key={w}
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: "0.6em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 + i * 0.07, ease: EASE }}
          >
            {w}
            {i < WORDS.length - 1 && <span aria-hidden>&nbsp;</span>}
          </motion.span>
        ))}
      </span>
      <motion.span
        className="font-accent relative mt-1 inline-block pr-1 text-[clamp(58px,15vw,104px)] font-normal italic leading-[1.02] tracking-normal md:mt-2"
        initial={reduce ? false : { opacity: 0, y: "0.4em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1 + WORDS.length * 0.07, ease: EASE }}
      >
        trust.
        <motion.span
          aria-hidden
          className="absolute -bottom-1 left-0 h-[7px] w-full origin-left rounded-full bg-brand md:-bottom-1.5 md:h-[9px]"
          style={{ rotate: "-1.2deg" }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        />
      </motion.span>
    </h1>
  );
}
