import Image from "next/image";
import Link from "next/link";

const cols = [
  {
    title: "Explore",
    links: ["Services", "Providers", "Browse by location"],
  },
  {
    title: "Company",
    links: ["For providers", "About CareTrove", "Contact"],
  },
  {
    title: "Support",
    links: ["Help Center", "Accessibility", "Privacy Policy", "Terms of Service"],
  },
];

export default function Footer() {
  return (
    <footer className="topo-pattern border-t border-stone-200 bg-cream">
      <div className="mx-auto max-w-[1500px] px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo.svg" alt="CareTrove" width={152} height={36} className="-ml-1.5" />
            <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-stone-500">
              Find, compare, and book trusted health & wellness providers.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="/search"
                      className="text-[15px] text-stone-500 transition-colors hover:text-ink"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-stone-200 pt-6 text-[13px] text-stone-400">
          © 2026 CareTrove. CareTrove is a directory and booking-request
          service, not a medical provider; listings are not medical advice.
        </p>
      </div>
    </footer>
  );
}
