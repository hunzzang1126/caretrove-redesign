"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MagnifyingGlass,
  MapPin,
  CalendarBlank,
  Storefront,
  Sparkle,
  Star,
} from "@phosphor-icons/react";
import MonthCalendar from "@/components/Calendar";
import { clinics, cities } from "@/lib/data";

/* ---- Suggestion data, built once from live provider data ---- */
const SERVICE_COUNTS = new Map<string, number>();
clinics.forEach((c) =>
  c.services.forEach((s) => SERVICE_COUNTS.set(s, (SERVICE_COUNTS.get(s) ?? 0) + 1))
);
const TREATMENTS = [...SERVICE_COUNTS.entries()].map(([label, count]) => ({
  label,
  count,
}));
const CLINIC_ITEMS = clinics.map((c) => ({
  label: c.name,
  slug: c.slug,
  city: c.city,
  rating: c.rating,
}));

type Item =
  | { kind: "treatment"; label: string; meta: string }
  | { kind: "clinic"; label: string; meta: string; slug: string }
  | { kind: "city"; label: string; meta: string };

function buildQueryItems(query: string): Item[] {
  const q = query.trim().toLowerCase();
  const treatments = (
    q ? TREATMENTS.filter((t) => t.label.toLowerCase().includes(q)) : TREATMENTS
  )
    .slice(0, 5)
    .map<Item>((t) => ({
      kind: "treatment",
      label: t.label,
      meta: `${t.count} ${t.count === 1 ? "clinic" : "clinics"}`,
    }));
  const clinicMatches = (
    q
      ? CLINIC_ITEMS.filter(
          (c) =>
            c.label.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
        )
      : [...CLINIC_ITEMS].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  )
    .slice(0, 3)
    .map<Item>((c) => ({
      kind: "clinic",
      label: c.label,
      slug: c.slug,
      meta: `${c.city}${c.rating ? ` · ★ ${c.rating.toFixed(1)}` : ""}`,
    }));
  return [...treatments, ...clinicMatches];
}

function buildLocItems(query: string): Item[] {
  const q = query.trim().toLowerCase();
  return (q ? cities.filter((c) => c.name.toLowerCase().includes(q)) : cities)
    .slice(0, 6)
    .map<Item>((c) => ({
      kind: "city",
      label: c.name,
      meta: `${c.count} clinics`,
    }));
}

function SuggestionList({
  items,
  highlight,
  onPick,
  className,
}: {
  items: Item[];
  highlight: number;
  onPick: (item: Item) => void;
  className?: string;
}) {
  if (items.length === 0) return null;
  let lastKind = "";
  return (
    <div
      role="listbox"
      className={`absolute z-50 overflow-hidden rounded-2xl border border-stone-100 bg-white py-2 shadow-[0_24px_60px_-16px_rgba(28,25,23,0.3)] ${className ?? ""}`}
    >
      {items.map((item, i) => {
        const header =
          item.kind !== lastKind
            ? item.kind === "treatment"
              ? "Treatments"
              : item.kind === "clinic"
                ? "Clinics"
                : "Cities"
            : null;
        lastKind = item.kind;
        return (
          <div key={`${item.kind}-${item.label}`}>
            {header && (
              <p className="px-4 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wide text-stone-400">
                {header}
              </p>
            )}
            <button
              type="button"
              role="option"
              aria-selected={i === highlight}
              onPointerDown={(e) => {
                e.preventDefault();
                onPick(item);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                i === highlight ? "bg-stone-50" : "hover:bg-stone-50"
              }`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
                {item.kind === "treatment" ? (
                  <Sparkle size={15} />
                ) : item.kind === "clinic" ? (
                  <Storefront size={15} />
                ) : (
                  <MapPin size={15} />
                )}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[14.5px] font-semibold">
                  {item.label}
                </span>
                <span className="block flex items-center gap-0.5 text-[12.5px] text-stone-400">
                  {item.meta.includes("★") ? (
                    <>
                      {item.meta.split("★")[0]}
                      <Star size={11} weight="fill" className="text-brand" />
                      {item.meta.split("★")[1]}
                    </>
                  ) : (
                    item.meta
                  )}
                </span>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

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
  const formRef = useRef<HTMLFormElement>(null);
  const [q, setQ] = useState(defaultQuery);
  const [loc, setLoc] = useState(defaultLocation);
  const [date, setDate] = useState<Date | null>(null);
  const [calOpen, setCalOpen] = useState(false);
  const [openList, setOpenList] = useState<"q" | "loc" | null>(null);
  const [hi, setHi] = useState(-1);

  const items = useMemo(
    () =>
      openList === "q"
        ? buildQueryItems(q)
        : openList === "loc"
          ? buildLocItems(loc)
          : [],
    [openList, q, loc]
  );

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpenList(null);
        setHi(-1);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const submit = () => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (loc) p.set("loc", loc);
    router.push(`/search${p.size ? `?${p}` : ""}`);
  };

  const pick = (item: Item) => {
    if (item.kind === "clinic" && "slug" in item) {
      router.push(`/clinic/${item.slug}`);
      return;
    }
    if (item.kind === "city") setLoc(item.label);
    else setQ(item.label);
    setOpenList(null);
    setHi(-1);
  };

  const listKeys = (e: React.KeyboardEvent) => {
    if (!openList || items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((v) => (v + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((v) => (v <= 0 ? items.length - 1 : v - 1));
    } else if (e.key === "Enter" && hi >= 0) {
      e.preventDefault();
      pick(items[hi]);
    } else if (e.key === "Escape") {
      setOpenList(null);
      setHi(-1);
    }
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
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="relative mx-auto flex w-full max-w-[780px] flex-col rounded-3xl border border-stone-200 bg-white shadow-[0_18px_50px_-16px_rgba(28,25,23,0.28)] transition-shadow hover:shadow-[0_24px_60px_-16px_rgba(28,25,23,0.34)] md:h-[72px] md:flex-row md:items-center md:rounded-full"
    >
      <label className="group relative flex flex-1 cursor-text items-center gap-3 rounded-t-3xl px-7 py-4 transition-colors hover:bg-stone-50 md:h-full md:rounded-full md:py-0">
        <MagnifyingGlass size={19} className="shrink-0 text-stone-400" />
        <span className="flex w-full flex-col">
          <span className="text-[11.5px] font-bold uppercase tracking-wide text-stone-500">
            Treatment
          </span>
          <input
            value={q}
            role="combobox"
            aria-expanded={openList === "q" && items.length > 0}
            aria-autocomplete="list"
            onChange={(e) => {
              setQ(e.target.value);
              setOpenList("q");
              setHi(-1);
            }}
            onFocus={() => {
              setOpenList("q");
              setHi(-1);
              setCalOpen(false);
            }}
            onKeyDown={listKeys}
            placeholder="Botox, massage, facials"
            className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:font-medium placeholder:text-stone-400"
          />
        </span>
      </label>

      <span className="mx-7 h-px bg-stone-100 md:mx-0 md:h-9 md:w-px" />

      <label className="group relative flex flex-1 cursor-text items-center gap-3 px-7 py-4 transition-colors hover:bg-stone-50 md:h-full md:rounded-full md:py-0">
        <MapPin size={19} className="shrink-0 text-stone-400" />
        <span className="flex w-full flex-col">
          <span className="text-[11.5px] font-bold uppercase tracking-wide text-stone-500">
            Where
          </span>
          <input
            value={loc}
            role="combobox"
            aria-expanded={openList === "loc" && items.length > 0}
            aria-autocomplete="list"
            onChange={(e) => {
              setLoc(e.target.value);
              setOpenList("loc");
              setHi(-1);
            }}
            onFocus={() => {
              setOpenList("loc");
              setHi(-1);
              setCalOpen(false);
            }}
            onKeyDown={listKeys}
            placeholder="City or ZIP in Michigan"
            className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:font-medium placeholder:text-stone-400"
          />
        </span>
      </label>

      <span className="mx-7 h-px bg-stone-100 md:mx-0 md:h-9 md:w-px" />

      <div className="relative flex items-center gap-3 rounded-b-3xl py-3 pl-7 pr-3 md:h-full md:rounded-full md:py-0">
        <button
          type="button"
          onClick={() => {
            setCalOpen((v) => !v);
            setOpenList(null);
          }}
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

      {openList === "q" && (
        <SuggestionList
          items={items}
          highlight={hi}
          onPick={pick}
          className="inset-x-3 top-[calc(100%+10px)] md:left-3 md:right-auto md:w-[360px]"
        />
      )}
      {openList === "loc" && (
        <SuggestionList
          items={items}
          highlight={hi}
          onPick={pick}
          className="inset-x-3 top-[calc(100%+10px)] md:left-[36%] md:right-auto md:w-[320px]"
        />
      )}
    </form>
  );
}
