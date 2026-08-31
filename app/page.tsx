import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SearchPill from "@/components/SearchPill";
import HeroTitle from "@/components/HeroTitle";
import ClinicCard from "@/components/ClinicCard";
import MichiganMap from "@/components/MichiganMap";
import { categories, cities, clinics, heroImage, providerBandImage } from "@/lib/data";

const popular = ["Botox", "HydraFacial", "Deep Tissue Massage", "IV Vitamin Therapy", "Laser Hair Removal"];

export default function Home() {
  return (
    <>
      <Header pillOnScroll />

      {/* Hero: short photo band, search pill front and center */}
      <section className="relative flex min-h-[560px] flex-col items-center justify-center bg-[#b3a290] px-5 py-20 md:min-h-[62dvh]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover motion-safe:animate-[kenburns_9s_ease-out_both]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_42%,transparent_30%,rgba(0,0,0,0.28)_100%)]" />
        <div className="relative flex w-full max-w-[880px] flex-col items-center">
          <HeroTitle />
          <Reveal delay={0.3}>
            <p className="mt-5 text-center text-[17px] font-medium text-white/85">
              Verified clinics across Michigan, confirmed within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 w-full">
            <SearchPill />
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {popular.map((t) => (
                <Link
                  key={t}
                  href={`/search?q=${encodeURIComponent(t)}`}
                  className="glass rounded-full px-4 py-2 text-[13.5px] font-semibold text-white transition-transform hover:scale-[1.04] active:scale-[0.98]"
                >
                  {t}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
        <div id="hero-pill-sentinel" className="absolute bottom-0 h-px w-px" />
      </section>

      {/* Featured clinics: inventory first */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
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

      {/* Treatments */}
      <section className="mx-auto max-w-[1500px] px-5 pb-16 md:px-10 md:pb-20">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Browse by treatment
          </h2>
        </Reveal>
        <div className="scrollbar-none mt-8 flex snap-x gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className="min-w-[240px] snap-start md:min-w-0">
              <Link href={`/search?category=${c.slug}`} className="group block">
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

      {/* Browse by city */}
      <section className="topo-pattern bg-cream">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-16 md:grid-cols-[1fr_360px] md:px-10 md:py-24">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Browse by city
              </h2>
              <p className="mt-2 text-[16px] text-stone-500">
                Every clinic on CareTrove is in Michigan.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {cities.map((city, i) => (
                <Reveal key={city.name} delay={i * 0.04}>
                  <Link
                    href={`/search?loc=${encodeURIComponent(city.name)}`}
                    className="group flex items-baseline justify-between border-b border-stone-200 py-4 transition-colors hover:border-brand"
                  >
                    <span className="text-[17px] font-bold transition-colors group-hover:text-brand-text">
                      {city.name}
                    </span>
                    <span className="text-[14px] text-stone-400">
                      {city.count} clinics
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="hidden md:block">
            <MichiganMap className="mx-auto w-full max-w-[320px]" />
          </Reveal>
        </div>
      </section>

      {/* Provider band with glass panel */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src={providerBandImage}
              alt="A massage therapist at work"
              width={2000}
              height={900}
              sizes="(max-width: 1500px) 100vw, 1500px"
              className="h-[440px] w-full object-cover md:h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="glass-deep absolute inset-x-5 bottom-5 rounded-2xl p-7 md:inset-x-auto md:bottom-10 md:left-10 md:max-w-[460px] md:p-9">
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                Run a clinic? Get discovered.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                Free listing during launch. You control your services, hours,
                and team.
              </p>
              <Link
                href="/search"
                className="mt-6 inline-block rounded-xl bg-white px-6 py-3.5 text-[15px] font-bold text-ink transition-all hover:shadow-lg active:scale-[0.98]"
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
