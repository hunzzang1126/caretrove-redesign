import Image from "next/image";
import Link from "next/link";

export default function Header({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-stone-100 bg-white/90 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="CareTrove home" className="flex items-center">
          <Image
            src={overlay ? "/logo-white.svg" : "/logo.svg"}
            alt="CareTrove"
            width={132}
            height={31}
            priority
          />
        </Link>
        <nav className="flex items-center gap-1 md:gap-2">
          <Link
            href="/search"
            className={`hidden rounded-full px-4 py-2 text-[15px] font-semibold transition-colors sm:block ${
              overlay
                ? "text-white hover:bg-white/15"
                : "text-ink hover:bg-stone-100"
            }`}
          >
            Find clinics
          </Link>
          <Link
            href="/search"
            className={`hidden rounded-full px-4 py-2 text-[15px] font-semibold transition-colors md:block ${
              overlay
                ? "text-white hover:bg-white/15"
                : "text-ink hover:bg-stone-100"
            }`}
          >
            For providers
          </Link>
          <Link
            href="/search"
            className={`rounded-full px-5 py-2.5 text-[15px] font-bold transition-all active:scale-[0.98] ${
              overlay
                ? "bg-white text-ink shadow-md hover:shadow-lg"
                : "bg-ink text-white hover:bg-stone-700"
            }`}
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
