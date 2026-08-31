import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, MapPin, Phone, SealCheck } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { clinics, reviews } from "@/lib/data";

export function generateStaticParams() {
  return clinics.map((c) => ({ slug: c.slug }));
}

export default async function ClinicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clinic = clinics.find((c) => c.slug === slug);
  if (!clinic) notFound();

  const gallery = clinic.gallery ?? [clinic.image];
  const clinicReviews = reviews.filter((r) => r.clinic === clinic.slug);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8 md:px-10">
        <Reveal>
          <h1 className="text-[28px] font-extrabold tracking-tight md:text-[34px]">
            {clinic.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px]">
            {clinic.rating && (
              <span className="flex items-center gap-1 font-semibold">
                <Star size={15} weight="fill" className="text-brand" />
                {clinic.rating.toFixed(1)}
                <span className="font-normal text-stone-500">
                  ({clinic.reviews} reviews)
                </span>
              </span>
            )}
            <span className="text-stone-500">
              {clinic.city}, Michigan · {clinic.category}
            </span>
          </div>
        </Reveal>

        {/* Gallery mosaic */}
        <Reveal className="mt-6">
          <div className="grid h-[320px] grid-cols-2 gap-2 overflow-hidden rounded-3xl md:h-[440px] md:grid-cols-4">
            <div className="relative col-span-2 row-span-2">
              <Image
                src={gallery[0]}
                alt={`${clinic.name} interior`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
            {gallery.slice(1, 5).map((src, i) => (
              <div key={i} className="relative hidden md:block">
                <Image
                  src={src}
                  alt={`${clinic.name} photo ${i + 2}`}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <Reveal>
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-stone-600">
                {clinic.about}
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <h2 className="text-xl font-extrabold tracking-tight">Services</h2>
              <ul className="mt-4 divide-y divide-stone-100">
                {clinic.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-center justify-between py-4"
                  >
                    <span className="text-[15px] font-semibold">{s}</span>
                    <span className="text-[14px] text-stone-400">
                      Request to book
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {clinicReviews.length > 0 && (
              <Reveal className="mt-10">
                <h2 className="text-xl font-extrabold tracking-tight">
                  Reviews
                </h2>
                <div className="mt-5 space-y-7">
                  {clinicReviews.map((r) => (
                    <div key={r.author}>
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-9 items-center justify-center rounded-full bg-stone-100 text-[13px] font-bold">
                          {r.author[0]}
                        </span>
                        <div>
                          <p className="flex items-center gap-1.5 text-[14px] font-bold">
                            {r.author}
                            {r.verified && (
                              <span className="flex items-center gap-0.5 text-[12px] font-semibold text-brand-text">
                                <SealCheck size={13} weight="fill" />
                                Verified visit
                              </span>
                            )}
                          </p>
                          <p className="text-[13px] text-stone-400">{r.date}</p>
                        </div>
                      </div>
                      <p className="mt-2.5 max-w-[60ch] text-[15px] leading-relaxed text-stone-600">
                        {r.text}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Booking card */}
          <div>
            <Reveal className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-stone-200 p-6 shadow-[0_16px_40px_-16px_rgba(28,25,23,0.15)]">
                <p className="text-lg font-extrabold">Request an appointment</p>
                <p className="mt-1 text-[14px] leading-relaxed text-stone-500">
                  Pick a time and the clinic confirms within 24 hours. No
                  account needed.
                </p>
                <button className="mt-5 w-full rounded-xl bg-brand py-3.5 text-[16px] font-bold text-white transition-all hover:bg-brand-deep active:scale-[0.99]">
                  Request a booking
                </button>
                <div className="mt-6 space-y-3 border-t border-stone-100 pt-5 text-[14px] text-stone-600">
                  {clinic.address && (
                    <p className="flex items-start gap-2.5">
                      <MapPin size={17} className="mt-0.5 shrink-0 text-stone-400" />
                      {clinic.address}
                    </p>
                  )}
                  {clinic.phone && (
                    <p className="flex items-center gap-2.5">
                      <Phone size={17} className="shrink-0 text-stone-400" />
                      {clinic.phone}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-14">
          <Link
            href="/search"
            className="text-[15px] font-bold text-brand-text transition-colors hover:text-brand-deep"
          >
            ← Back to all clinics
          </Link>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
