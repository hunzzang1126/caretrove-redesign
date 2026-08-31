import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingFlow from "@/components/BookingFlow";
import { clinics } from "@/lib/data";

export function generateStaticParams() {
  return clinics.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clinic = clinics.find((c) => c.slug === slug);
  return { title: clinic ? `Book ${clinic.name} | CareTrove` : "Book | CareTrove" };
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { slug } = await params;
  const { service } = await searchParams;
  const clinic = clinics.find((c) => c.slug === slug);
  if (!clinic) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[70dvh] max-w-[1200px] px-5 py-10 md:px-10">
        <Link
          href={`/clinic/${clinic.slug}`}
          className="text-[14px] font-bold text-stone-500 transition-colors hover:text-ink"
        >
          ← {clinic.name}
        </Link>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Request an appointment
        </h1>
        <p className="mt-2 max-w-[52ch] text-[15.5px] text-stone-500">
          Pick what works for you. Nothing is charged and nothing is final until
          the clinic confirms.
        </p>
        <div className="mt-10">
          <BookingFlow clinic={clinic} preselectedService={service} />
        </div>
      </main>
      <Footer />
    </>
  );
}
