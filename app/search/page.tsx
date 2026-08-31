import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ClinicCard from "@/components/ClinicCard";
import { clinics, categories } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "Clinics in Michigan | CareTrove",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const filtered = clinics.filter((c) => {
    if (category && c.category.toLowerCase() !== category.toLowerCase()) return false;
    if (q) {
      const hay = `${c.name} ${c.city} ${c.services.join(" ")}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70dvh] max-w-[1400px] px-5 py-10 md:px-10">
        <Reveal>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {q ? `Results for “${q}”` : "Clinics in Michigan"}
          </h1>
          <p className="mt-1 text-[15px] text-stone-500">
            {filtered.length} {filtered.length === 1 ? "clinic" : "clinics"}
            {category ? ` in ${category}` : ""}
          </p>
        </Reveal>

        <div className="scrollbar-none mt-6 flex gap-2.5 overflow-x-auto pb-1">
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

        {filtered.length === 0 ? (
          <div className="mt-20 flex flex-col items-center text-center">
            <p className="text-lg font-bold">No clinics match that search.</p>
            <p className="mt-1 max-w-[36ch] text-[15px] text-stone-500">
              Try a broader treatment name, or browse everything in Michigan.
            </p>
            <Link
              href="/search"
              className="mt-6 rounded-xl bg-ink px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-stone-700"
            >
              Browse all clinics
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((clinic, i) => (
              <Reveal key={clinic.slug} delay={(i % 3) * 0.05}>
                <ClinicCard clinic={clinic} />
              </Reveal>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
