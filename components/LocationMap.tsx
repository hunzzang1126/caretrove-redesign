"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "@/components/ClinicMap";

const ClinicMap = dynamic(() => import("@/components/ClinicMap"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-stone-100" />,
});

export default function LocationMap({ marker }: { marker: MapMarker }) {
  return (
    <div className="h-[320px] overflow-hidden rounded-2xl md:h-[380px]">
      <ClinicMap markers={[marker]} className="size-full" />
    </div>
  );
}
