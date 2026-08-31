"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MagnifyingGlass, MapPin, CalendarBlank } from "@phosphor-icons/react";
import MonthCalendar from "@/components/Calendar";

function DatePopover({
  value,
  onSelect,
  onClose,
}: {
  value: Date | null;
  onSelect: (d: Date) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+12px)] z-50 w-[320px] rounded-2xl border border-stone-100 bg-white p-5 shadow-[0_24px_60px_-16px_rgba(28,25,23,0.3)]"
    >
      <MonthCalendar value={value} onSelect={onSelect} />
    </div>
  );
}

export default function SearchPill({
  compact = false,
  defaultQuery = "",
  defaultLocation = "",
}: {
  compact?: boolean;
  defaultQuery?: string;
  defaultLocation?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(defaultQuery);
  const [loc, setLoc] = useState(defaultLocation);
  const [date, setDate] = useState<Date | null>(null);
  const [calOpen, setCalOpen] = useState(false);

  const submit = () => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (loc) p.set("loc", loc);
    router.push(`/search${p.size ? `?${p}` : ""}`);
  };

  const dateLabel = date
    ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "Add date";

  if (compact) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mx-auto flex h-12 items-center rounded-full border border-stone-200 bg-white pl-5 pr-1.5 shadow-[0_6px_20px_-8px_rgba(28,25,23,0.25)] transition-shadow hover:shadow-[0_10px_28px_-8px_rgba(28,25,23,0.3)]"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Treatment"
          className="w-[120px] bg-transparent text-[13.5px] font-semibold outline-none placeholder:font-medium placeholder:text-stone-500"
        />
        <span className="mx-3 h-6 w-px bg-stone-200" />
        <input
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="City or ZIP"
          className="w-[92px] bg-transparent text-[13.5px] font-semibold outline-none placeholder:font-medium placeholder:text-stone-500"
        />
        <button
          type="submit"
          aria-label="Search"
          className="ml-2 flex size-9 items-center justify-center rounded-full bg-brand text-white transition-all hover:bg-brand-deep active:scale-95"
        >
          <MagnifyingGlass size={15} weight="bold" />
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="relative mx-auto flex w-full max-w-[780px] flex-col rounded-3xl border border-stone-200 bg-white shadow-[0_18px_50px_-16px_rgba(28,25,23,0.28)] transition-shadow hover:shadow-[0_24px_60px_-16px_rgba(28,25,23,0.34)] md:h-[72px] md:flex-row md:items-center md:rounded-full"
    >
      <label className="group flex flex-1 cursor-text items-center gap-3 rounded-t-3xl px-7 py-4 transition-colors hover:bg-stone-50 md:h-full md:rounded-full md:py-0">
        <MagnifyingGlass size={19} className="shrink-0 text-stone-400" />
        <span className="flex w-full flex-col">
          <span className="text-[11.5px] font-bold uppercase tracking-wide text-stone-500">
            Treatment
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Botox, massage, facials"
            className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:font-medium placeholder:text-stone-400"
          />
        </span>
      </label>

      <span className="mx-7 h-px bg-stone-100 md:mx-0 md:h-9 md:w-px" />

      <label className="group flex flex-1 cursor-text items-center gap-3 px-7 py-4 transition-colors hover:bg-stone-50 md:h-full md:rounded-full md:py-0">
        <MapPin size={19} className="shrink-0 text-stone-400" />
        <span className="flex w-full flex-col">
          <span className="text-[11.5px] font-bold uppercase tracking-wide text-stone-500">
            Where
          </span>
          <input
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            placeholder="City or ZIP in Michigan"
            className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:font-medium placeholder:text-stone-400"
          />
        </span>
      </label>

      <span className="mx-7 h-px bg-stone-100 md:mx-0 md:h-9 md:w-px" />

      <div className="relative flex items-center gap-3 rounded-b-3xl py-3 pl-7 pr-3 md:h-full md:rounded-full md:py-0">
        <button
          type="button"
          onClick={() => setCalOpen((v) => !v)}
          className="flex items-center gap-3 rounded-full py-2 text-left transition-colors md:pr-2"
        >
          <CalendarBlank size={19} className="shrink-0 text-stone-400" />
          <span className="flex flex-col">
            <span className="text-[11.5px] font-bold uppercase tracking-wide text-stone-500">
              When
            </span>
            <span
              className={`text-[15px] font-semibold ${date ? "" : "font-medium text-stone-400"}`}
            >
              {dateLabel}
            </span>
          </span>
        </button>
        {calOpen && (
          <DatePopover
            value={date}
            onSelect={(d) => {
              setDate(d);
              setCalOpen(false);
            }}
            onClose={() => setCalOpen(false)}
          />
        )}
        <button
          type="submit"
          aria-label="Search"
          className="ml-auto flex h-[52px] shrink-0 items-center gap-2 rounded-full bg-brand px-6 text-[15px] font-bold text-white transition-all hover:bg-brand-deep active:scale-[0.97] md:ml-2"
        >
          <MagnifyingGlass size={17} weight="bold" />
          Search
        </button>
      </div>
    </form>
  );
}
