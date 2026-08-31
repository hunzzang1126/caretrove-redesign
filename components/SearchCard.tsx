"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";

export default function SearchCard() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search${q ? `?q=${encodeURIComponent(q)}` : ""}`);
      }}
      className="w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-[0_24px_60px_-12px_rgba(28,25,23,0.35)] md:p-8"
    >
      <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight md:text-[32px]">
        Book care you can trust.
      </h1>

      <label className="mt-6 block">
        <span className="text-[13px] font-bold text-stone-600">Treatment</span>
        <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-stone-300 px-3.5 py-3 transition-colors focus-within:border-ink">
          <MagnifyingGlass size={18} className="shrink-0 text-stone-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Botox, massage, blood panel"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-stone-400"
          />
        </div>
      </label>

      <label className="mt-4 block">
        <span className="text-[13px] font-bold text-stone-600">Where</span>
        <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-stone-300 px-3.5 py-3 transition-colors focus-within:border-ink">
          <MapPin size={18} className="shrink-0 text-stone-400" />
          <input
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            placeholder="City or ZIP in Michigan"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-stone-400"
          />
        </div>
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-brand py-3.5 text-[16px] font-bold text-white transition-all hover:bg-brand-deep active:scale-[0.99]"
      >
        Search
      </button>
    </form>
  );
}
