"use client";

import { useEffect, useId, useRef, useState } from "react";
import { RatingStars } from "@/components/shared/RatingStars";
import { btnPrimary, btnSecondary } from "@/components/shared/button-styles";
import { formatDate } from "@/lib/format";
import { REVIEW_LIMITS, validateReviewDraft, type ReviewErrors } from "@/lib/review-validation";
import { readStoredReviews, saveStoredReview } from "@/lib/storage";
import type { Review, ReviewDraft, ReviewSummary, StoredReview } from "@/types";

type SortKey = "newest" | "highest" | "lowest";
const emptyDraft: ReviewDraft = { rating: "", title: "", body: "", displayName: "" };

function summarize(list: Review[]): ReviewSummary {
  const distribution: ReviewSummary["distribution"] = [0, 0, 0, 0, 0];
  for (const r of list) distribution[r.rating - 1] += 1;
  const average = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
  return { average, count: list.length, distribution };
}

export function ReviewsSection({ productId, productName, sampleReviews }: { productId: string; productName: string; sampleReviews: Review[] }) {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [local, setLocal] = useState<StoredReview[]>([]);
  const [sort, setSort] = useState<SortKey>("newest");
  const [draft, setDraft] = useState<ReviewDraft>(emptyDraft);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [status, setStatus] = useState<"idle" | "saved" | "not-saved">("idle");

  // Read after mount so the first render matches the server HTML.
  useEffect(() => { setLocal(readStoredReviews(productId)); }, [productId]);

  const all: Review[] = [...sampleReviews, ...local];
  const summary = summarize(all);
  const sorted = [...all].sort((a, b) =>
    sort === "highest" ? b.rating - a.rating || b.createdAt.localeCompare(a.createdAt)
    : sort === "lowest" ? a.rating - b.rating || b.createdAt.localeCompare(a.createdAt)
    : b.createdAt.localeCompare(a.createdAt));

  const set = (k: keyof ReviewDraft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDraft((d) => ({ ...d, [k]: e.target.value }));

  const open = () => { setDraft(emptyDraft); setErrors({}); dialogRef.current?.showModal(); };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateReviewDraft(draft);
    setErrors(found);
    const firstInvalid = (["rating", "title", "body", "displayName"] as const).find((k) => found[k]);
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }
    const review: StoredReview = {
      id: `rev-local-${Date.now()}`, productId, rating: Number(draft.rating) as Review["rating"],
      title: draft.title.trim(), body: draft.body.trim(), displayName: draft.displayName.trim(),
      createdAt: new Date().toISOString(), useContext: "Written on this device", isSample: false, source: "device-local",
    };
    setLocal((l) => [...l, review]);
    setStatus(saveStoredReview(review) ? "saved" : "not-saved");
    setSort("newest");
    dialogRef.current?.close();
  };

  const err = (k: keyof ReviewDraft) => errors[k] ? `${uid}-${k}-err` : undefined;
  const field = "mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm aria-[invalid=true]:border-destructive";

  return (
    <section aria-labelledby="reviews-title" className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="reviews-title" className="text-display text-2xl text-primary">Customer reviews</h2>
          <p className="mt-1 text-sm text-muted-foreground">Reviews marked “Sample review” are invented for this prototype.</p>
        </div>
        <button type="button" onClick={open} className={btnSecondary}>Write a review</button>
      </div>

      <p role="status" className="mt-3 text-sm font-medium text-primary">
        {status === "saved" && "Thanks. Your review is saved on this device only. It is not sent anywhere or moderated."}
        {status === "not-saved" && "Your review is shown for this visit only. This browser blocked saving it on your device."}
      </p>

      {all.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No reviews yet for this product. Be the first to write one.</p>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="text-4xl font-bold text-primary">{summary.average.toFixed(1)}</p>
            <RatingStars summary={summary} />
            <ul className="mt-4 space-y-1.5" aria-label="Rating breakdown">
              {[5, 4, 3, 2, 1].map((stars) => {
                const n = summary.distribution[stars - 1];
                return (
                  <li key={stars} className="flex items-center gap-2 text-sm">
                    <span className="w-14 text-muted-foreground">{stars} stars</span>
                    <span className="h-2 flex-1 rounded-sm bg-secondary" aria-hidden="true">
                      <span className="block h-2 rounded-sm bg-signal" style={{ width: `${(n / summary.count) * 100}%` }} />
                    </span>
                    <span className="w-4 text-right tabular-nums">{n}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Sort reviews by
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="min-h-11 rounded-lg border border-input bg-white px-2 text-primary">
                <option value="newest">Newest</option>
                <option value="highest">Highest rated</option>
                <option value="lowest">Lowest rated</option>
              </select>
            </label>
            <ul className="mt-2 divide-y">
              {sorted.map((r) => (
                <li key={r.id} className="py-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="sr-only">{r.rating} out of 5 stars. </span>
                    <span aria-hidden="true">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  </p>
                  <h3 className="mt-1 font-semibold text-primary">{r.title}</h3>
                  <p className="mt-1 whitespace-pre-line text-sm">{r.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {r.displayName}, {formatDate(r.createdAt)}. {r.isSample ? `${r.useContext}. Sample review.` : "Your review, saved on this device only."}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <dialog ref={dialogRef} aria-labelledby={`${uid}-title`} className="m-auto w-[min(32rem,calc(100%-2rem))] rounded-xl bg-white p-0 backdrop:bg-black/40">
        <form onSubmit={submit} noValidate className="p-5">
          <h2 id={`${uid}-title`} className="text-display text-2xl text-primary">Review {productName}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Saved in this browser only. It is not sent anywhere or moderated.</p>

          <fieldset className="mt-4" aria-describedby={err("rating")}>
            <legend className="text-sm font-semibold text-primary">Rating</legend>
            <div className="mt-1 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n} className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg border border-input px-3 text-sm">
                  <input type="radio" name={`${uid}-rating`} value={n} checked={draft.rating === String(n)} onChange={set("rating")} data-field={n === 1 ? "rating" : undefined} className="size-4 accent-primary" />
                  {n} {n === 1 ? "star" : "stars"}
                </label>
              ))}
            </div>
            {errors.rating && <p id={err("rating")} className="mt-1 text-sm text-destructive">{errors.rating}</p>}
          </fieldset>

          <div className="mt-4">
            <label htmlFor={`${uid}-t`} className="text-sm font-semibold text-primary">Title</label>
            <input id={`${uid}-t`} data-field="title" value={draft.title} onChange={set("title")} maxLength={REVIEW_LIMITS.title.max} aria-invalid={!!errors.title} aria-describedby={err("title")} className={field} />
            {errors.title && <p id={err("title")} className="mt-1 text-sm text-destructive">{errors.title}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor={`${uid}-b`} className="text-sm font-semibold text-primary">Your review</label>
            <textarea id={`${uid}-b`} data-field="body" rows={5} value={draft.body} onChange={set("body")} maxLength={REVIEW_LIMITS.body.max} aria-invalid={!!errors.body} aria-describedby={err("body")} className={field} />
            {errors.body && <p id={err("body")} className="mt-1 text-sm text-destructive">{errors.body}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor={`${uid}-n`} className="text-sm font-semibold text-primary">Display name</label>
            <input id={`${uid}-n`} data-field="displayName" value={draft.displayName} onChange={set("displayName")} maxLength={REVIEW_LIMITS.name.max} aria-invalid={!!errors.displayName} aria-describedby={err("displayName")} className={field} />
            {errors.displayName && <p id={err("displayName")} className="mt-1 text-sm text-destructive">{errors.displayName}</p>}
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button type="button" onClick={() => dialogRef.current?.close()} className={btnSecondary}>Cancel</button>
            <button type="submit" className={btnPrimary}>Save review</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
