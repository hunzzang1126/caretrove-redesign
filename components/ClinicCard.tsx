import Image from "next/image";
import Link from "next/link";
import { Star } from "@phosphor-icons/react/dist/ssr";
import type { Clinic } from "@/lib/data";

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <Link href={`/clinic/${clinic.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
        <Image
          src={clinic.image}
          alt={`${clinic.name} in ${clinic.city}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
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
          </span>
        )}
      </div>
    </Link>
  );
}
