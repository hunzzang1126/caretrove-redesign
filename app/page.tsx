import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SearchPill from "@/components/SearchPill";
import HeroTitle from "@/components/HeroTitle";
import HeroPhotos from "@/components/HeroPhotos";
import HowItWorksScene from "@/components/HowItWorksScene";
import { categories, providerBandImage } from "@/lib/data";

const popular = ["Botox", "Hydrafacial", "Laser Hair Removal", "IV Vitamin Therapy"];

const whyUse = [
  {
    title: "Insurance doesn't cover everything",
    body: "Many healthcare expenses fall outside of coverage. CareTrove helps you compare options and understand pricing before you book.",
  },
  {
    title: "Make your HSA and FSA dollars go further",
    body: "Browse services and compare prices to make the most of your healthcare spending accounts.",
  },
  {
    title: "Give yourself more options",
    body: "Discover more providers and services in one place, with prices you can compare side by side, without having to call each provider individually.",
  },
];

export default function Home() {
  return (
    <>
      <Header pillOnScroll />

      {/* Hero: cream editorial band with floating treatment photos */}
      <section className="topo-pattern relative bg-cream px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <HeroPhotos />
        </div>

        <div className="relative mx-auto flex w-full max-w-[780px] flex-col items-center">
          <HeroTitle />
          <Reveal delay={0.2} className="mt-8 w-full">
            <SearchPill />
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-[13.5px] font-bold text-stone-500">Popular:</span>
              {popular.map((t) => (
                <Link
                  key={t}
                  href={`/search?q=${encodeURIComponent(t)}`}
                  className="glass-tint relative isolate rounded-full px-4 py-2 text-[13.5px] font-semibold text-stone-700 transition-all hover:scale-[1.04] hover:text-brand-text active:scale-[0.98]"
                >
                  {t}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
        <div id="hero-pill-sentinel" className="absolute bottom-0 h-px w-px" />
      </section>

      {/* Browse by Service */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Browse by Service
          </h2>
        </Reveal>
        <Reveal className="scrollbar-none mt-8 flex snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {categories.map((c) => (
            <div key={c.slug} className="min-w-[240px] snap-start md:min-w-0">
              <Link href={`/search?category=${c.slug}`} className="group block">
                <div className="ring-shimmer relative aspect-[5/4] overflow-hidden rounded-2xl bg-stone-100">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 84vw, 30vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="glass-sheen" aria-hidden />
                </div>
                <h3 className="mt-3 text-[16px] font-bold">{c.name}</h3>
                <p className="text-[14px] text-stone-500">{c.blurb}</p>
              </Link>
            </div>
          ))}
        </Reveal>
      </section>

      {/* How CareTrove Works */}
      <section className="topo-pattern overflow-hidden bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <HowItWorksScene />
          </Reveal>
        </div>
      </section>

      {/* Why Use CareTrove? */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Why Use CareTrove?
          </h2>
        </Reveal>
        <Reveal className="mt-8 grid items-center gap-10 md:mt-10 md:grid-cols-2 md:gap-14">
          <div className="ring-shimmer group relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100">
            <Image
              src="/images/why-use.jpg"
              alt="A therapist giving a warm oil massage"
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span className="glass-sheen" aria-hidden />
          </div>
          <div className="divide-y divide-stone-100">
            {whyUse.map((item) => (
              <div key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <CheckCircle
                  size={24}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-brand"
                />
                <div>
                  <h3 className="text-[16.5px] font-bold leading-snug">{item.title}</h3>
                  <p className="mt-1 max-w-[52ch] text-[14.5px] leading-relaxed text-stone-500">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Provider band */}
      <section
        id="for-providers"
        className="mx-auto max-w-[1500px] scroll-mt-20 px-5 pb-16 md:px-10 md:pb-24"
      >
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl max-md:bg-[#211d1a]">
            <div className="relative">
              <Image
                src={providerBandImage}
                alt="A therapist preparing a treatment table in a wellness studio"
                width={2000}
                height={900}
                sizes="(max-width: 1500px) 100vw, 1500px"
                className="h-[330px] w-full object-cover object-[62%_35%] md:h-[560px] md:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent max-md:from-[#211d1a] max-md:via-transparent" />
            </div>
            <div className="glass-deep p-7 max-md:rounded-none md:absolute md:bottom-10 md:left-10 md:max-w-[500px] md:rounded-2xl md:p-9">
              <h2 className="font-display text-[24px] font-extrabold leading-tight tracking-tight text-white md:text-3xl">
                Run a healthcare or wellness practice? Get discovered on
                CareTrove.
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-snug text-white/90">
                  <CheckCircle size={17} weight="fill" className="mt-[2px] shrink-0 text-brand" />
                  List your practice for FREE
                </li>
                <li className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-snug text-white/90">
                  <CheckCircle size={17} weight="fill" className="mt-[2px] shrink-0 text-brand" />
                  <span>
                    Registration reviewed within
                    <br />
                    24 hours
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-snug text-white/90">
                  <CheckCircle size={17} weight="fill" className="mt-[2px] shrink-0 text-brand" />
                  You control your listing
                </li>
                <li className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-snug text-white/90">
                  <CheckCircle size={17} weight="fill" className="mt-[2px] shrink-0 text-brand" />
                  No cost to get started
                </li>
              </ul>
              <Link
                href="/search"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[15px] font-bold text-ink transition-all hover:shadow-lg active:scale-[0.98]"
              >
                Register your practice
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
