"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Heart } from "@phosphor-icons/react";
import type { Clinic } from "@/lib/data";

export default function ClinicCard({
  clinic,
  onHover,
  variant = "list",
}: {
  clinic: Clinic;
  onHover?: (slug: string | null) => void;
  variant?: "list" | "glass";
}) {
  const [saved, setSaved] = useState(false);

  const heart = (
    <button
      type="button"
      aria-label={saved ? "Remove from saved" : "Save clinic"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        setSaved((v) => !v);
      }}
      className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
    >
      <Heart
        size={17}
        weight={saved ? "fill" : "bold"}
        className={saved ? "text-brand" : "text-ink"}
      />
    </button>
  );

  if (variant === "glass") {
    return (
      <Link
        href={`/clinic/${clinic.slug}`}
        className="group block"
        onMouseEnter={() => onHover?.(clinic.slug)}
        onMouseLeave={() => onHover?.(null)}
      >
        <div className="ring-shimmer relative aspect-[4/4.6] overflow-hidden rounded-3xl bg-stone-100">
          <Image
            src={clinic.image}
            alt={`${clinic.name} in ${clinic.city}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {heart}
          <div className="glass-panel absolute inset-x-3 bottom-3 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[16px] font-bold leading-snug text-white">
                  {clinic.name}
                </h3>
                <p className="mt-0.5 text-[13.5px] text-white/75">
                  {clinic.city} · {clinic.category}
                </p>
              </div>
              {clinic.rating && (
                <span className="flex shrink-0 items-center gap-1 text-[13.5px] font-semibold text-white">
                  <Star size={13} weight="fill" className="text-brand" />
                  {clinic.rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/clinic/${clinic.slug}`}
      className="group block"
      onMouseEnter={() => onHover?.(clinic.slug)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="ring-shimmer relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
        <Image
          src={clinic.image}
          alt={`${clinic.name} in ${clinic.city}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="glass-sheen" aria-hidden />
        {heart}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[16px] font-bold leading-snug">{clinic.name}</h3>
          <p className="mt-0.5 text-[14px] text-stone-500">
            {clinic.city} · {clinic.category}
          </p>
          <p className="mt-0.5 text-[14px] text-stone-500">
            {clinic.services.slice(0, 2).join(", ")}
          </p>
        </div>
        {clinic.rating && (
          <span className="flex shrink-0 items-center gap-1 text-[14px] font-semibold">
            <Star size={14} weight="fill" className="text-brand" />
            {clinic.rating.toFixed(1)}
            <span className="font-normal text-stone-400">({clinic.reviews})</span>
          </span>
        )}
      </div>
    </Link>
  );
}
