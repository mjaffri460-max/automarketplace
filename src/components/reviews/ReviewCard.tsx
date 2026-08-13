import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border bg-white p-6">
      <StarRating rating={review.rating} />
      <p className="text-base font-semibold text-slate-900">{review.title}</p>
      <p className="flex-1 text-sm text-slate-600">{review.body}</p>
      <div className="border-t pt-3 text-sm">
        <p className="font-medium text-slate-900">{review.authorName}</p>
        <p className="text-slate-500">
          {review.location}
          {review.vehiclePurchased && <> &middot; {review.vehiclePurchased}</>}
        </p>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-amber-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}
