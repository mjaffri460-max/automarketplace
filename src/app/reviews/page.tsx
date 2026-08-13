import { getReviews, getAverageRating } from "@/data/reviews";
import { ReviewCard } from "@/components/reviews/ReviewCard";

export default async function ReviewsPage() {
  const [reviews, averageRating] = await Promise.all([getReviews(), getAverageRating()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Customer Reviews</h1>
      <p className="mt-2 text-base text-slate-600">
        {averageRating} out of 5 average rating from {reviews.length} verified customers.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
