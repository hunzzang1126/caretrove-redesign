/* Entrance rise, pure CSS. It must never depend on JS running: a stalled
   animation frame on first paint was leaving whole sections invisible, which
   read as "the page starts scrolled down". CSS animations paint regardless. */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`motion-safe:animate-[ct-rise_0.55s_cubic-bezier(0.16,1,0.3,1)_both] ${className ?? ""}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
