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
import ScrollReveal from "@/components/ScrollReveal";
import { categories, providerBandImage } from "@/lib/data";

const popular = ["Botox", "Hydrafacial", "Laser Hair Removal", "IV Vitamin Therapy"];

const whyUse = [
  {
    title: "Insurance doesn't cover everything",
    pre: "Insurance doesn't cover ",
    em: "everything",
    post: "",
    body: "Many healthcare expenses fall outside of coverage. CareTrove helps you compare options and understand pricing before you book.",
  },
  {
    title: "Make your HSA and FSA dollars go further",
    pre: "Make your HSA and FSA dollars go ",
    em: "further",
    post: "",
    body: "Browse services and compare prices to make the most of your healthcare spending accounts.",
  },
  {
    title: "Give yourself more options",
    pre: "Give yourself ",
    em: "more options",
    post: "",
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
          <Reveal delay={0.2} className="relative z-30 mt-8 w-full">
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
        <ScrollReveal y={20}>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Browse by Service
          </h2>
        </ScrollReveal>
        <div className="scrollbar-none mt-8 flex snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {categories.map((c, i) => (
            <ScrollReveal
              key={c.slug}
              delay={i * 0.08}
              y={30}
              className="min-w-[240px] snap-start md:min-w-0"
            >
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
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* How CareTrove Works */}
      <section className="topo-pattern overflow-hidden bg-cream">
        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          <HowItWorksScene />
        </div>
      </section>

      {/* Why Use CareTrove? */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
          <ScrollReveal
            y={30}
            className="relative self-start md:sticky md:top-[104px]"
          >
            <div className="ring-shimmer group relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100 md:aspect-[4/5]">
              <Image
                src="/images/why-use-desk.jpg"
                alt="A receptionist checking availability on a tablet at a spa front desk"
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover object-[47%_30%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="glass-sheen" aria-hidden />
              <div className="glass-deep absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl px-4 py-3.5 md:inset-x-5 md:bottom-5">
                <CheckCircle size={20} weight="fill" className="shrink-0 text-brand" />
                <p className="text-[13.5px] font-semibold leading-snug text-white">
                  Real prices upfront, before you ever book.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="md:pt-2">
            <ScrollReveal y={20}>
              <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Why Use CareTrove?
              </h2>
            </ScrollReveal>
            <div className="mt-2 md:mt-4">
              {whyUse.map((item, i) => (
                <ScrollReveal
                  key={item.title}
                  delay={i * 0.09}
                  y={28}
                  className="border-b border-stone-200/70 py-7 last:border-0 md:py-9"
                >
                  <h3 className="max-w-[24ch] font-display text-[23px] font-extrabold leading-[1.15] tracking-tight md:text-[29px]">
                    {item.pre}
                    <span className="italic text-brand-text">{item.em}</span>
                    {item.post}
                  </h3>
                  <p className="mt-2.5 max-w-[56ch] text-[14.5px] leading-relaxed text-stone-500 md:text-[15px]">
                    {item.body}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Provider band */}
      <section
        id="for-providers"
        className="mx-auto max-w-[1500px] scroll-mt-20 px-5 pb-16 md:px-10 md:pb-24"
      >
        <ScrollReveal y={34}>
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
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
