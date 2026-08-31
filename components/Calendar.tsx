"use client";

import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

export default function MonthCalendar({
  value,
  onSelect,
}: {
  value: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [view, setView] = useState(
    () => new Date((value ?? today).getFullYear(), (value ?? today).getMonth(), 1)
  );

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)
    ),
  ];
  const atCurrentMonth =
    view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          disabled={atCurrentMonth}
          aria-label="Previous month"
          className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-stone-100 disabled:opacity-25"
        >
          <CaretLeft size={15} />
        </button>
        <p className="text-[14px] font-bold">
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </p>
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          aria-label="Next month"
          className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
        >
          <CaretRight size={15} />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 text-center">
        {DOW.map((d, i) => (
          <span key={i} className="py-1 text-[11px] font-bold text-stone-400">
            {d}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const past = d < today;
          const selected =
            value &&
            d.getTime() ===
              new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
          const isToday = d.getTime() === today.getTime();
          return (
            <button
              key={i}
              type="button"
              disabled={past}
              onClick={() => onSelect(d)}
              className={`mx-auto flex size-9 items-center justify-center rounded-full text-[13px] font-semibold transition-colors ${
                selected
                  ? "bg-brand text-white"
                  : past
                    ? "text-stone-300"
                    : "hover:bg-stone-100"
              } ${isToday && !selected ? "ring-1 ring-stone-300" : ""}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
