"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "@/components/ClinicMap";

const ClinicMap = dynamic(() => import("@/components/ClinicMap"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-stone-100" />,
});

export default function MiniMap({ marker }: { marker: MapMarker }) {
  return (
    <div className="h-[180px] overflow-hidden rounded-xl">
      <ClinicMap markers={[marker]} interactive={false} className="size-full" />
    </div>
  );
}
