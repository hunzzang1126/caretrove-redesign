"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/* Fanned photo stacks on both sides of the hero: three cards per side
   showing a variety of services, each fanning out into place on load.
   The fan-in is a pure CSS keyframe (ct-fan) so first paint never
   depends on JS; scroll parallax is a progressive enhancement on top. */

type FanCard = {
  src: string;
  alt: string;
  /* outer anchor within the group */
  pos: string;
  /* final resting rotation */
  rotate: string;
  /* where the card fans in from (toward the center of the page) */
  fromX: string;
  delay: number;
  z: number;
  aspect: string;
};

const LEFT_CARDS: FanCard[] = [
  {
    src: "/images/hero-left.jpg",
    alt: "",
    pos: "left-0 top-0 w-[112px] 2xl:w-[192px]",
    rotate: "-9deg",
    fromX: "52px",
    delay: 0.1,
    z: 1,
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/hero-facial.jpg",
    alt: "",
    pos: "left-[72px] top-[96px] w-[100px] 2xl:left-[138px] 2xl:top-[118px] 2xl:w-[178px]",
    rotate: "5deg",
    fromX: "26px",
    delay: 0.26,
    z: 3,
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/hero-physio.jpg",
    alt: "",
    pos: "left-[4px] top-[205px] w-[100px] 2xl:left-[16px] 2xl:top-[270px] 2xl:w-[186px]",
    rotate: "-4deg",
    fromX: "44px",
    delay: 0.42,
    z: 2,
    aspect: "aspect-[4/5]",
  },
];

const RIGHT_CARDS: FanCard[] = [
  {
    src: "/images/hero-right.jpg",
    alt: "",
    pos: "right-0 top-0 w-[112px] 2xl:w-[192px]",
    rotate: "8deg",
    fromX: "-52px",
    delay: 0.18,
    z: 1,
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/hero-iv.jpg",
    alt: "",
    pos: "right-[72px] top-[96px] w-[100px] 2xl:right-[138px] 2xl:top-[118px] 2xl:w-[178px]",
    rotate: "-5deg",
    fromX: "-26px",
    delay: 0.34,
    z: 3,
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/hero-laser.jpg",
    alt: "",
    pos: "right-[4px] top-[205px] w-[100px] 2xl:right-[16px] 2xl:top-[270px] 2xl:w-[186px]",
    rotate: "3deg",
    fromX: "-44px",
    delay: 0.5,
    z: 2,
    aspect: "aspect-[4/5]",
  },
];

function Fan({ cards }: { cards: FanCard[] }) {
  return (
    <div className="relative h-[340px] w-[195px] 2xl:h-[520px] 2xl:w-[330px]">
      {cards.map((c) => (
        <div key={c.src} className={`absolute ${c.pos}`} style={{ zIndex: c.z }}>
          <div
            className="motion-safe:animate-[ct-fan_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
            style={
              {
                "--fan-r": c.rotate,
                "--fan-x": c.fromX,
                animationDelay: `${c.delay}s`,
              } as React.CSSProperties
            }
          >
            <div
              className={`relative ${c.aspect} overflow-hidden rounded-2xl bg-stone-100 shadow-[0_22px_45px_-20px_rgba(28,25,23,0.4)]`}
            >
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="360px"
                className="object-cover"
              />
              <span className="glass-sheen" aria-hidden />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroPhotos() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 640], [0, 130]);
  const yFast = useTransform(scrollY, [0, 640], [0, 60]);

  return (
    <>
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: ySlow }}
        className="pointer-events-none absolute top-[7%] hidden min-[1120px]:block left-[min(1.5vw,calc(50%-615px))] 2xl:left-[min(3vw,calc(50%-750px))]"
      >
        <Fan cards={LEFT_CARDS} />
      </motion.div>

      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: yFast }}
        className="pointer-events-none absolute top-[7%] 2xl:top-[10%] hidden min-[1120px]:block right-[min(1.5vw,calc(50%-615px))] 2xl:right-[min(3vw,calc(50%-750px))]"
      >
        <Fan cards={RIGHT_CARDS} />
      </motion.div>
    </>
  );
}
