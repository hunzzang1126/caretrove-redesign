/* Pure CSS rise: guaranteed to paint even if JS is slow on first load. */
export default function HeroTitle() {
  return (
    <h1
      className="mx-auto max-w-[17ch] text-center text-[clamp(30px,6vw,52px)] font-extrabold leading-[1.12] tracking-tight text-ink motion-safe:animate-[ct-rise_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
      style={{ fontFamily: "var(--font-display)" }}
    >
      Find and book{" "}
      <span className="relative inline-block italic">
        trusted
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-brand motion-safe:animate-[ct-underline_0.6s_cubic-bezier(0.16,1,0.3,1)_0.5s_both] md:-bottom-1.5"
          style={{ transform: "rotate(-1.2deg)" }}
        />
      </span>{" "}
      health and wellness services near you.
    </h1>
  );
}
