"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SquaresFour, X } from "@phosphor-icons/react";

export default function GalleryModal({
  photos,
  clinicName,
}: {
  photos: string[];
  clinicName: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-ink bg-white px-4 py-2 text-[13.5px] font-bold shadow-sm transition-all hover:bg-stone-50 active:scale-[0.97]"
      >
        <SquaresFour size={15} weight="bold" />
        Show all photos
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-50 overflow-y-auto bg-white pt-[env(safe-area-inset-top)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white/95 px-5 py-4 backdrop-blur-sm">
              <p className="font-display text-lg font-extrabold tracking-tight">
                {clinicName}
              </p>
              <button
                type="button"
                aria-label="Close photos"
                onClick={() => setOpen(false)}
                className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mx-auto max-w-[900px] space-y-3 px-5 py-6">
              {photos.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-stone-100"
                >
                  <Image
                    src={src}
                    alt={`${clinicName} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
