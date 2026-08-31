"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ListBullets, MapTrifold } from "@phosphor-icons/react";
import ClinicCard from "@/components/ClinicCard";
import type { Clinic } from "@/lib/data";

const ClinicMap = dynamic(() => import("@/components/ClinicMap"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse rounded-2xl bg-stone-100" />,
});

export default function SearchResults({ clinics }: { clinics: Clinic[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileMap, setMobileMap] = useState(false);

  const markers = clinics.map((c) => ({
    slug: c.slug,
    name: c.name,
    city: c.city,
    lng: c.lng,
    lat: c.lat,
    rating: c.rating,
    reviews: c.reviews,
    image: c.image,
  }));

  if (clinics.length === 0) {
    return (
      <div className="mt-20 flex flex-col items-center pb-24 text-center">
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
    );
  }

  return (
    <div className="relative mt-6 lg:grid lg:grid-cols-[1fr_minmax(380px,42%)] lg:gap-8">
      <div
        className={`grid gap-x-6 gap-y-10 pb-28 sm:grid-cols-2 lg:pb-16 ${
          mobileMap ? "hidden lg:grid" : ""
        }`}
      >
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.slug} clinic={clinic} onHover={setHovered} />
        ))}
      </div>

      {/* Mobile full-screen map */}
      {mobileMap && (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-30 lg:hidden">
          <ClinicMap markers={markers} hoveredSlug={hovered} className="size-full" />
        </div>
      )}

      {/* Desktop sticky map */}
      <div className="hidden lg:block">
        <div className="sticky top-[88px] h-[calc(100dvh-112px)] overflow-hidden rounded-2xl">
          <ClinicMap markers={markers} hoveredSlug={hovered} className="size-full" />
        </div>
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileMap((v) => !v)}
        className="glass-deep fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-95 lg:hidden"
      >
        {mobileMap ? (
          <>
            <ListBullets size={17} weight="bold" /> List
          </>
        ) : (
          <>
            <MapTrifold size={17} weight="bold" /> Map
          </>
        )}
      </button>
    </div>
  );
}
