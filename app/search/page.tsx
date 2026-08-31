import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";
import { clinics, categories } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "Clinics in Michigan | CareTrove",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; loc?: string; category?: string; date?: string }>;
}) {
  const { q, loc, category, date } = await searchParams;

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

  const filtered = clinics.filter((c) => {
    if (category && c.category.toLowerCase() !== category.toLowerCase()) return false;
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
  });

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70dvh] max-w-[1500px] px-5 py-8 md:px-10">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-[28px]">
          {q ? `Results for “${q}”` : "Clinics in Michigan"}
        </h1>
        <p className="mt-1 text-[15px] text-stone-500">
          {filtered.length} {filtered.length === 1 ? "clinic" : "clinics"}
          {category ? ` in ${category}` : ""}
          {loc ? ` near “${loc}”` : ""}
          {dateLabel ? ` open on ${dateLabel}` : ""}
        </p>

        <div className="scrollbar-none mt-5 flex gap-2.5 overflow-x-auto pb-1">
          <Link
            href="/search"
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
              href={`/search?category=${c.slug}`}
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

        <SearchResults clinics={filtered} />
      </main>
      <Footer />
    </>
  );
}
