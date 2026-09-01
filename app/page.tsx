import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MagnifyingGlass,
  Scales,
  CalendarCheck,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SearchPill from "@/components/SearchPill";
import HeroTitle from "@/components/HeroTitle";
import HeroPhotos from "@/components/HeroPhotos";
import BrandPin from "@/components/BrandPin";
import { categories, providerBandImage } from "@/lib/data";

const popular = ["Botox", "Hydrafacial", "Laser Hair Removal", "IV Vitamin Therapy"];

const howItWorks = [
  {
    icon: MagnifyingGlass,
    title: "Search",
    body: "Find what you need by service, provider, or location.",
  },
  {
    icon: Scales,
    title: "Compare",
    body: "View services, prices, availability, and verified patient reviews side by side.",
  },
  {
    icon: CalendarCheck,
    title: "Book",
    body: "Choose your care and schedule a time that works for you.",
  },
];

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
                    sizes="(max-width: 768px) 70vw, 25vw"
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
      <section className="topo-pattern bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              How CareTrove Works
            </h2>
          </Reveal>
          <Reveal className="scrollbar-none mt-10 flex snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain px-1 pb-2 pt-4 md:grid md:grid-cols-3 md:overflow-visible">
            {howItWorks.map((step) => (
              <div
                key={step.title}
                className="relative min-w-[260px] snap-start rounded-2xl bg-white p-7 shadow-[0_10px_30px_-18px_rgba(28,25,23,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(28,25,23,0.35)] md:min-w-0"
              >
                <BrandPin className="absolute -top-4 left-7 h-auto w-[20px] drop-shadow-[0_3px_4px_rgba(28,25,23,0.25)]" />
                <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#F67E50] via-[#F15A25] to-[#D14A1A] text-white shadow-[0_8px_20px_-8px_rgba(241,90,37,0.6)]">
                  <step.icon size={22} weight="bold" />
                </span>
                <h3 className="mt-4 text-[17px] font-bold">{step.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-stone-500">
                  {step.body}
                </p>
              </div>
            ))}
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
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=80&auto=format&fit=crop"
              alt="A therapist giving a warm oil massage"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
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
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src={providerBandImage}
              alt="A massage therapist at work"
              width={2000}
              height={900}
              sizes="(max-width: 1500px) 100vw, 1500px"
              className="h-[540px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="glass-deep absolute inset-x-5 bottom-5 rounded-2xl p-7 md:inset-x-auto md:bottom-10 md:left-10 md:max-w-[500px] md:p-9">
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
