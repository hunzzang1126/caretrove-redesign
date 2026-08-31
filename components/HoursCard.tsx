"use client";

import { useEffect, useState } from "react";
import { Clock } from "@phosphor-icons/react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function HoursCard({ hours }: { hours: ([string, string] | null)[] }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);

  const todayHours = today !== null ? hours[today] : null;

  return (
    <div className="mt-5 border-t border-stone-100 pt-5">
      <p className="flex items-center gap-2 text-[14px] font-bold">
        <Clock size={16} className="text-stone-400" />
        {today === null ? (
          "Hours"
        ) : todayHours ? (
          <>
            <span className="text-emerald-700">Open today</span>
            <span className="font-medium text-stone-500">until {fmt(todayHours[1])}</span>
          </>
        ) : (
          <span className="text-stone-500">Closed today</span>
        )}
      </p>
      <dl className="mt-3 space-y-1.5">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className={`flex items-baseline justify-between text-[13.5px] ${
              i === today ? "font-bold" : "text-stone-500"
            }`}
          >
            <dt>{d}</dt>
            <dd className="tabular-nums">
              {hours[i] ? `${fmt(hours[i]![0])} - ${fmt(hours[i]![1])}` : "Closed"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
