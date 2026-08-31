import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SearchCard from "@/components/SearchCard";
import ClinicCard from "@/components/ClinicCard";
import { categories, clinics, heroImage, providerBandImage } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header overlay />

      {/* Hero: full-bleed photo, floating search card */}
      <section className="relative min-h-[92dvh] bg-[#b3a290]">
        <Image
          src={heroImage}
          alt="A calm, sunlit wellness studio"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
        <div className="relative mx-auto flex min-h-[92dvh] max-w-[1400px] items-center px-5 pt-24 pb-16 md:px-10">
          <Reveal>
            <SearchCard />
          </Reveal>
        </div>
      </section>

      {/* Treatments */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Browse by treatment
          </h2>
        </Reveal>
        <div className="scrollbar-none mt-8 flex snap-x gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className="min-w-[240px] snap-start md:min-w-0">
              <Link href="/search" className="group block">
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-stone-100">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 70vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-3 text-[16px] font-bold">{c.name}</h3>
                <p className="text-[14px] text-stone-500">{c.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured clinics */}
      <section className="mx-auto max-w-[1400px] px-5 pb-16 md:px-10 md:pb-24">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Featured in Michigan
            </h2>
            <Link
              href="/search"
              className="text-[15px] font-bold text-brand-text transition-colors hover:text-brand-deep"
            >
              View all
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic, i) => (
            <Reveal key={clinic.slug} delay={(i % 3) * 0.06}>
              <ClinicCard clinic={clinic} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Provider band */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src={providerBandImage}
              alt="A clinic lounge with warm lighting"
              width={2000}
              height={900}
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="h-[420px] w-full object-cover md:h-[480px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-5 p-8 md:flex-row md:items-end md:justify-between md:p-12">
              <h2 className="max-w-[16ch] text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                Run a clinic? Get discovered.
              </h2>
              <Link
                href="/search"
                className="rounded-xl bg-white px-6 py-3.5 text-[15px] font-bold text-ink transition-all hover:shadow-lg active:scale-[0.98]"
              >
                List your clinic
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
