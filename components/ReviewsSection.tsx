"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Star, SealCheck, X } from "@phosphor-icons/react";

export type Review = {
  author: string;
  date: string;
  rating: number;
  verified: boolean;
  text: string;
  pending?: boolean;
};

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          weight={i <= value ? "fill" : "regular"}
          className={i <= value ? "text-brand" : "text-stone-300"}
        />
      ))}
    </span>
  );
}

function WriteReviewModal({
  clinicName,
  onClose,
  onSubmit,
}: {
  clinicName: string;
  onClose: () => void;
  onSubmit: (r: { rating: number; text: string; author: string }) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Write a review for ${clinicName}`}
    >
      <div
        className="w-full max-w-[480px] rounded-3xl bg-white p-7 shadow-[0_32px_80px_-20px_rgba(28,25,23,0.45)] md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl font-extrabold tracking-tight">
              Write a review
            </h3>
            <p className="mt-1 text-[14px] text-stone-500">{clinicName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
          >
            <X size={17} />
          </button>
        </div>

        <div className="mt-5">
          <span className="text-[13px] font-bold text-stone-600">Your rating</span>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i} star${i > 1 ? "s" : ""}`}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  size={30}
                  weight={i <= (hoverRating || rating) ? "fill" : "regular"}
                  className={
                    i <= (hoverRating || rating) ? "text-brand" : "text-stone-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <label className="mt-5 block">
          <span className="text-[13px] font-bold text-stone-600">Your review</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="How was the visit? What should others know?"
            className="mt-1.5 w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink"
          />
        </label>

        <label className="mt-3 block">
          <span className="text-[13px] font-bold text-stone-600">Display name</span>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. Jordan K."
            className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink"
          />
        </label>

        {error && <p className="mt-3 text-[13.5px] font-semibold text-red-600">{error}</p>}

        <button
          type="button"
          onClick={() => {
            if (!rating) return setError("Pick a star rating first.");
            if (text.trim().length < 10)
              return setError("Tell us a little more. Reviews need at least 10 characters.");
            if (!author.trim()) return setError("Add a display name.");
            onSubmit({ rating, text: text.trim(), author: author.trim() });
          }}
          className="mt-6 w-full rounded-xl bg-brand py-3.5 text-[15px] font-bold text-white transition-all hover:bg-brand-deep active:scale-[0.99]"
        >
          Submit review
        </button>
        <p className="mt-3 text-center text-[12.5px] leading-relaxed text-stone-400">
          Every review is read by a person before it appears. Clinics can reply,
          and they cannot delete reviews.
        </p>
      </div>
    </div>
  );
}

export default function ReviewsSection({
  clinicSlug,
  clinicName,
  rating,
  count,
  initialReviews,
}: {
  clinicSlug: string;
  clinicName: string;
  rating: number | null;
  count: number;
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [open, setOpen] = useState(false);
  const storageKey = `ct-reviews-${clinicSlug}`;

  /* Demo persistence: reviews written on this device survive reloads via
     localStorage. A real backend replaces this. */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const mine = JSON.parse(stored) as Review[];
        if (Array.isArray(mine) && mine.length) {
          setReviews((prev) => [...mine, ...prev]);
        }
      }
    } catch {
      /* private mode or blocked storage: render without saved drafts */
    }
  }, [storageKey]);

  const persist = (mine: Review[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(mine));
    } catch {
      /* storage unavailable: the review still shows for this visit */
    }
  };

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-extrabold tracking-tight">Reviews</h2>
          {rating && (
            <div className="mt-2 flex items-center gap-3">
              <span className="font-display text-[40px] font-extrabold leading-none">
                {rating.toFixed(1)}
              </span>
              <span>
                <Stars value={Math.round(rating)} size={16} />
                <span className="mt-0.5 block text-[13.5px] text-stone-500">
                  {count} verified-platform reviews
                </span>
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-ink px-5 py-2.5 text-[14px] font-bold transition-all hover:bg-ink hover:text-white active:scale-[0.98]"
        >
          Write a review
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {reviews.map((r, i) => (
          <article key={`${r.author}-${i}`} className="rounded-2xl bg-mist p-5">
            <div className="flex items-center justify-between">
              <Stars value={r.rating} />
              {r.pending ? (
                <span className="rounded-md bg-stone-200 px-2 py-0.5 text-[11.5px] font-bold text-stone-600">
                  Pending moderation
                </span>
              ) : (
                <span className="text-[12.5px] text-stone-400">{r.date}</span>
              )}
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{r.text}</p>
            <p className="mt-3 flex items-center gap-1.5 text-[13.5px] font-bold">
              {r.author}
              {r.verified && (
                <span className="flex items-center gap-0.5 text-[12px] font-semibold text-brand-text">
                  <SealCheck size={13} weight="fill" />
                  Verified visit
                </span>
              )}
            </p>
          </article>
        ))}
      </div>

      {open &&
        createPortal(
          <WriteReviewModal
          clinicName={clinicName}
          onClose={() => setOpen(false)}
          onSubmit={(r) => {
            const mine: Review = {
              author: r.author,
              rating: r.rating,
              text: r.text,
              date: "Just now",
              verified: false,
              pending: true,
            };
            setReviews((prev) => [mine, ...prev]);
            try {
              const stored = localStorage.getItem(storageKey);
              const existing = stored ? (JSON.parse(stored) as Review[]) : [];
              persist([mine, ...existing]);
            } catch {
              persist([mine]);
            }
            setOpen(false);
          }}
          />,
          document.body
        )}
    </section>
  );
}
