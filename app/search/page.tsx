import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";
import { clinics, categories } from "@/lib/data";
import Link from "next/link";
import { LockSimple } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Clinics in Michigan | CareTrove",
};

type Params = { q?: string; loc?: string; category?: string; date?: string };

function buildHref(params: Params, overrides: Partial<Params>) {
  const next = { ...params, ...overrides };
  const p = new URLSearchParams();
  if (next.q) p.set("q", next.q);
  if (next.loc) p.set("loc", next.loc);
  if (next.category) p.set("category", next.category);
  if (next.date) p.set("date", next.date);
  return `/search${p.size ? `?${p}` : ""}`;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const { q, loc, category, date } = params;

  /* A picked date filters to clinics open on that weekday */
  let day: number | null = null;
  let dateLabel = "";
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, d] = date.split("-").map(Number);
    const parsed = new Date(y, m - 1, d);
    if (!Number.isNaN(parsed.getTime())) {
      day = parsed.getDay();
      dateLabel = parsed.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  }

  const matchesExceptCategory = (c: (typeof clinics)[number]) => {
    if (day !== null && !c.hours[day]) return false;
    if (loc) {
      const hay = `${c.city} ${c.address ?? ""}`.toLowerCase();
      if (!hay.includes(loc.toLowerCase())) return false;
    }
    if (q) {
      const hay = `${c.name} ${c.city} ${c.category} ${c.services.join(" ")}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    }
    return true;
  };

  const base = clinics.filter(matchesExceptCategory);
  const counts = new Map<string, number>();
  base.forEach((c) =>
    counts.set(c.category.toLowerCase(), (counts.get(c.category.toLowerCase()) ?? 0) + 1)
  );
  const filtered = category
    ? base.filter((c) => c.category.toLowerCase() === category.toLowerCase())
    : base;

  const railRow =
    "flex items-baseline justify-between rounded-lg px-3 py-2 text-[14.5px] transition-colors";

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70dvh] max-w-[1500px] px-5 py-8 md:px-10">
        <h1 className="font-display text-2xl font-extrabold tracking-tight md:text-[28px]">
          {q ? `Results for “${q}”` : "Clinics in Michigan"}
        </h1>
        <p className="mt-1 text-[15px] text-stone-500">
          {filtered.length} {filtered.length === 1 ? "clinic" : "clinics"}
          {category ? ` in ${category}` : ""}
          {loc ? ` near “${loc}”` : ""}
          {dateLabel ? ` open on ${dateLabel}` : ""}
        </p>

        {/* Mobile and tablet: category chips */}
        <div className="scrollbar-none mt-5 flex gap-2.5 overflow-x-auto pb-1 lg:hidden">
          <Link
            href={buildHref(params, { category: undefined })}
            className={`shrink-0 rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors ${
              !category
                ? "border-ink bg-ink text-white"
                : "border-stone-300 text-stone-600 hover:border-ink hover:text-ink"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={buildHref(params, { category: c.slug })}
              className={`shrink-0 rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors ${
                category === c.slug
                  ? "border-ink bg-ink text-white"
                  : "border-stone-300 text-stone-600 hover:border-ink hover:text-ink"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-6 lg:grid lg:grid-cols-[225px_1fr] lg:gap-8">
          {/* Desktop filter rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-stone-200 p-4">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wide text-stone-400">
                Category
              </p>
              <nav className="mt-2 space-y-0.5">
                <Link
                  href={buildHref(params, { category: undefined })}
                  className={`${railRow} ${
                    !category
                      ? "bg-stone-50 font-bold text-brand-text"
                      : "text-stone-600 hover:bg-stone-50 hover:text-ink"
                  }`}
                >
                  <span>All</span>
                  <span className="text-[13px] text-stone-400">{base.length}</span>
                </Link>
                {categories.map((c) => {
                  const n = counts.get(c.slug) ?? 0;
                  const active = category === c.slug;
                  return (
                    <Link
                      key={c.slug}
                      href={buildHref(params, { category: c.slug })}
                      className={`${railRow} ${
                        active
                          ? "bg-stone-50 font-bold text-brand-text"
                          : n === 0
                            ? "pointer-events-none text-stone-300"
                            : "text-stone-600 hover:bg-stone-50 hover:text-ink"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[13px] text-stone-400">
                        {n === 0 ? "None yet" : n}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-5 border-t border-stone-100 px-3 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">
                  Distance
                </p>
                {loc ? (
                  <p className="mt-2 text-[13.5px] leading-relaxed text-stone-600">
                    Near “{loc}”.{" "}
                    <Link
                      href={buildHref(params, { loc: undefined })}
                      className="font-bold text-brand-text hover:text-brand-deep"
                    >
                      Clear
                    </Link>
                  </p>
                ) : (
                  <p className="mt-2 text-[13.5px] leading-relaxed text-stone-500">
                    Enter a city or ZIP to filter by distance.
                  </p>
                )}
              </div>

              <div className="mt-5 border-t border-stone-100 px-3 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">
                  Availability
                </p>
                {dateLabel ? (
                  <p className="mt-2 text-[13.5px] leading-relaxed text-stone-600">
                    Open on {dateLabel}.{" "}
                    <Link
                      href={buildHref(params, { date: undefined })}
                      className="font-bold text-brand-text hover:text-brand-deep"
                    >
                      Clear
                    </Link>
                  </p>
                ) : (
                  <p className="mt-2 text-[13.5px] leading-relaxed text-stone-500">
                    Pick a date in the search bar to see who is open.
                  </p>
                )}
              </div>

              {["Price", "Appointment type"].map((label) => (
                <div key={label} className="mt-5 border-t border-stone-100 px-3 pt-4">
                  <p className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-stone-400">
                    {label}
                    <span className="flex items-center gap-1 rounded-full bg-stone-100 px-2 py-1 text-[10.5px] font-bold normal-case tracking-normal text-stone-500">
                      <LockSimple size={10} weight="bold" />
                      Coming soon
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </aside>

          <SearchResults clinics={filtered} />
        </div>
      </main>
      <Footer />
    </>
  );
}
