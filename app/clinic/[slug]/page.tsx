import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  MapPin,
  Phone,
  SealCheck,
  ClockCountdown,
  ChatsCircle,
} from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import HoursCard from "@/components/HoursCard";
import ReviewsSection from "@/components/ReviewsSection";
import GalleryModal from "@/components/GalleryModal";
import LocationMap from "@/components/LocationMap";
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
  const marker = {
    slug: clinic.slug,
    name: clinic.name,
    city: clinic.city,
    lng: clinic.lng,
    lat: clinic.lat,
    rating: clinic.rating,
    reviews: clinic.reviews,
    image: clinic.image,
  };

  const highlights = [
    {
      icon: SealCheck,
      title: "Verified reviews only",
      body: "Every review is checked by a person, and clinics can never delete them.",
    },
    {
      icon: ClockCountdown,
      title: "Confirmed within 24 hours",
      body: "Request a time and our team confirms it with the clinic, usually same day.",
    },
    {
      icon: ChatsCircle,
      title: "No account needed",
      body: "Book as a guest. You only sign in at the last step.",
    },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1200px] px-5 py-8 md:px-10">
        <Reveal>
          <h1 className="font-display text-[30px] font-extrabold tracking-tight md:text-[38px]">
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

        {/* Gallery mosaic with full gallery view */}
        <Reveal className="mt-6">
          <div className="relative">
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
            <GalleryModal photos={gallery} clinicName={clinic.name} />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            {/* About */}
            <Reveal>
              <section className="border-b border-stone-100 pb-8">
                <p className="max-w-[62ch] text-[16px] leading-relaxed text-stone-600">
                  {clinic.about}
                </p>
              </section>
            </Reveal>

            {/* Highlights */}
            <Reveal>
              <section className="space-y-5 border-b border-stone-100 py-8">
                {highlights.map((h) => (
                  <div key={h.title} className="flex gap-4">
                    <h.icon size={26} className="mt-0.5 shrink-0 text-ink" />
                    <div>
                      <p className="text-[15px] font-bold">{h.title}</p>
                      <p className="mt-0.5 max-w-[52ch] text-[14px] leading-relaxed text-stone-500">
                        {h.body}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            </Reveal>

            {/* Services */}
            <Reveal>
              <section className="border-b border-stone-100 py-8">
                <h2 className="font-display text-xl font-extrabold tracking-tight">
                  Services
                </h2>
                <ul className="mt-2 divide-y divide-stone-100">
                  {clinic.services.map((s) => (
                    <li key={s} className="flex items-center justify-between py-4">
                      <span className="text-[15px] font-semibold">{s}</span>
                      <Link
                        href={`/book/${clinic.slug}?service=${encodeURIComponent(s)}`}
                        className="rounded-full border border-stone-300 px-4 py-2 text-[13.5px] font-bold transition-all hover:border-brand hover:text-brand-text active:scale-[0.97]"
                      >
                        Request to book
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Reviews */}
            <Reveal>
              <ReviewsSection
                clinicSlug={clinic.slug}
                clinicName={clinic.name}
                rating={clinic.rating}
                count={clinic.reviews}
                initialReviews={clinicReviews.map((r) => ({
                  author: r.author,
                  date: r.date,
                  rating: r.rating,
                  verified: r.verified,
                  text: r.text,
                }))}
              />
            </Reveal>
          </div>

          {/* Booking card */}
          <div>
            <Reveal className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-stone-200 p-6 shadow-[0_16px_40px_-16px_rgba(28,25,23,0.15)]">
                <p className="font-display text-lg font-extrabold">
                  Request an appointment
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-stone-500">
                  Pick a time and the clinic confirms within 24 hours. No
                  account needed.
                </p>
                <Link
                  href={`/book/${clinic.slug}`}
                  className="mt-5 block w-full rounded-xl bg-brand py-3.5 text-center text-[16px] font-bold text-white transition-all hover:bg-brand-deep active:scale-[0.99]"
                >
                  Request a booking
                </Link>

                <HoursCard hours={clinic.hours} />

                <div className="mt-5 space-y-3 border-t border-stone-100 pt-5 text-[14px] text-stone-600">
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

        {/* Location */}
        <Reveal className="mt-4 border-t border-stone-100 pt-10">
          <h2 className="font-display text-xl font-extrabold tracking-tight">
            Where you will find us
          </h2>
          <p className="mt-1 text-[15px] text-stone-500">
            {clinic.address ?? `${clinic.city}, Michigan`}
          </p>
          <div className="mt-5">
            <LocationMap marker={marker} />
          </div>
        </Reveal>

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
