import Image from "next/image";
import Link from "next/link";

const cols = [
  {
    title: "Explore",
    links: ["Find clinics", "Treatments", "Browse by city"],
  },
  {
    title: "Company",
    links: ["For providers", "About CareTrove", "Contact"],
  },
  {
    title: "Support",
    links: ["Help center", "Accessibility", "Privacy"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-mist">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo.svg" alt="CareTrove" width={126} height={30} />
            <p className="mt-4 max-w-[28ch] text-[15px] leading-relaxed text-stone-500">
              Find, compare, and book trusted health and wellness providers.
              Michigan-first.
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
          © 2026 CareTrove. A directory and booking-request service, not a
          medical provider. Listings are not medical advice.
        </p>
      </div>
    </footer>
  );
}
