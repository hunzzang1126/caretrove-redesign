/* Pure CSS word-stagger: guaranteed to paint even if JS is slow on first load. */
const WORDS = ["Book", "care", "you", "can"];

export default function HeroTitle() {
  return (
    <h1
      className="text-center text-[clamp(36px,7.8vw,64px)] font-extrabold leading-[1.06] tracking-tight text-ink"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {WORDS.map((w, i) => (
        <span
          key={w}
          className="inline-block motion-safe:animate-[ct-rise_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: `${0.08 + i * 0.06}s` }}
        >
          {w}
          <span aria-hidden>&nbsp;</span>
        </span>
      ))}
      <span
        className="relative inline-block text-[1.08em] font-extrabold italic motion-safe:animate-[ct-rise_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
        style={{ animationDelay: `${0.08 + WORDS.length * 0.06}s` }}
      >
        trust.
        <span
          aria-hidden
          className="absolute -bottom-2 left-0 h-[7px] w-full origin-left rounded-full bg-brand motion-safe:animate-[ct-underline_0.6s_cubic-bezier(0.16,1,0.3,1)_0.62s_both] md:-bottom-2.5"
          style={{ transform: "rotate(-1.2deg)" }}
        />
      </span>
    </h1>
  );
}
