"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, Star } from "@phosphor-icons/react";
import MonthCalendar from "@/components/Calendar";
import type { Clinic } from "@/lib/data";

/* Demo availability: deterministic per clinic+date so it feels real without a backend. */
function slotsFor(clinic: Clinic, date: Date) {
  const day = date.getDay();
  const span = clinic.hours[day];
  if (!span) return [];
  const [oH] = span[0].split(":").map(Number);
  const [cH] = span[1].split(":").map(Number);
  const out: { label: string; taken: boolean }[] = [];
  for (let h = oH; h < cH; h++) {
    for (const m of [0, 30]) {
      const ampm = h >= 12 ? "PM" : "AM";
      const hr = h % 12 === 0 ? 12 : h % 12;
      const seed = (h * 7 + m + date.getDate() * 3 + clinic.name.length) % 5;
      out.push({
        label: `${hr}:${String(m).padStart(2, "0")} ${ampm}`,
        taken: seed === 0,
      });
    }
  }
  return out;
}

export default function BookingFlow({
  clinic,
  preselectedService,
}: {
  clinic: Clinic;
  preselectedService?: string;
}) {
  const reduce = useReducedMotion();
  const [service, setService] = useState<string | null>(
    preselectedService && clinic.services.includes(preselectedService)
      ? preselectedService
      : null
  );
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const slots = useMemo(() => (date ? slotsFor(clinic, date) : []), [clinic, date]);

  const dateLabel = date
    ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : null;

  if (sent) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex min-h-[60dvh] max-w-[520px] flex-col items-center justify-center px-5 text-center"
      >
        <CheckCircle size={64} weight="fill" className="text-brand" />
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
          Request sent.
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-stone-600">
          {clinic.name} has your request for {service} on {dateLabel} at {time}.
          Our team confirms it with the clinic, usually within 24 hours, and you
          will get an email either way.
        </p>
        <Link
          href={`/clinic/${clinic.slug}`}
          className="mt-8 rounded-xl bg-ink px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-stone-700"
        >
          Back to {clinic.name}
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
      <div className="max-w-[560px]">
        {/* Service */}
        <section className="border-b border-stone-100 pb-8">
          <h2 className="font-display text-xl font-extrabold tracking-tight">
            Choose a service
          </h2>
          <div className="mt-2 divide-y divide-stone-100">
            {clinic.services.map((s) => {
              const active = service === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setService(s)}
                  className="group flex w-full items-center justify-between py-4 text-left"
                >
                  <span
                    className={`text-[15.5px] transition-colors ${
                      active ? "font-bold" : "font-semibold text-stone-600 group-hover:text-ink"
                    }`}
                  >
                    {s}
                  </span>
                  <span
                    className={`flex size-6 items-center justify-center rounded-full border-2 transition-colors ${
                      active ? "border-ink" : "border-stone-300 group-hover:border-stone-500"
                    }`}
                  >
                    {active && <span className="size-3 rounded-full bg-ink" />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Date */}
        <section className="border-b border-stone-100 py-8">
          <h2 className="font-display text-xl font-extrabold tracking-tight">
            Pick a date
          </h2>
          <div className="mt-5 max-w-[360px]">
            <MonthCalendar
              value={date}
              onSelect={(d) => {
                setDate(d);
                setTime(null);
              }}
            />
          </div>
        </section>

        {/* Time */}
        <section className="border-b border-stone-100 py-8">
          <h2 className="font-display text-xl font-extrabold tracking-tight">
            Pick a time
          </h2>
          {!date ? (
            <p className="mt-3 text-[14.5px] text-stone-400">Pick a date first.</p>
          ) : slots.length === 0 ? (
            <p className="mt-3 text-[14.5px] text-stone-500">
              The clinic is closed that day. Try another date.
            </p>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {slots.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  disabled={s.taken}
                  onClick={() => setTime(s.label)}
                  className={`rounded-full border px-4 py-2 text-[13.5px] font-semibold tabular-nums transition-all active:scale-[0.97] ${
                    time === s.label
                      ? "border-ink bg-ink text-white"
                      : s.taken
                        ? "border-stone-100 text-stone-300 line-through"
                        : "border-stone-300 hover:border-ink"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Details */}
        <section className="py-8">
          <h2 className="font-display text-xl font-extrabold tracking-tight">
            Your details
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-[13px] font-bold text-stone-600">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink"
              />
            </label>
            <label className="block">
              <span className="text-[13px] font-bold text-stone-600">Email or phone</span>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="For the confirmation"
                className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink"
              />
            </label>
          </div>
        </section>
      </div>

      {/* Summary */}
      <aside>
        <div className="sticky top-24 rounded-2xl border border-stone-200 p-6 shadow-[0_16px_40px_-16px_rgba(28,25,23,0.15)]">
          <div className="flex items-center gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
              <Image src={clinic.image} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="text-[15px] font-bold leading-snug">{clinic.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[13.5px] text-stone-500">
                {clinic.rating && (
                  <>
                    <Star size={13} weight="fill" className="text-brand" />
                    {clinic.rating.toFixed(1)}
                    <span className="text-stone-300">·</span>
                  </>
                )}
                {clinic.city}
              </p>
            </div>
          </div>
          <dl className="mt-5 space-y-2.5 border-t border-stone-100 pt-5 text-[14.5px]">
            <div className="flex justify-between">
              <dt className="text-stone-500">Service</dt>
              <dd className="font-bold">{service ?? "Not chosen"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Date</dt>
              <dd className="font-bold">{dateLabel ?? "Not chosen"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Time</dt>
              <dd className="font-bold tabular-nums">{time ?? "Not chosen"}</dd>
            </div>
          </dl>
          {error && (
            <p className="mt-4 text-[13.5px] font-semibold text-red-600">{error}</p>
          )}
          <button
            type="button"
            onClick={() => {
              if (!service) return setError("Choose a service first.");
              if (!date || !time) return setError("Pick a date and time.");
              if (!name.trim() || !contact.trim())
                return setError("Add your name and a way to reach you.");
              setError("");
              setSent(true);
            }}
            className="mt-5 w-full rounded-xl bg-brand py-3.5 text-[16px] font-bold text-white transition-all hover:bg-brand-deep active:scale-[0.99]"
          >
            Request this time
          </button>
          <p className="mt-3 text-center text-[12.5px] leading-relaxed text-stone-400">
            No charge now. The clinic confirms within 24 hours.
          </p>
        </div>
      </aside>
    </div>
  );
}
