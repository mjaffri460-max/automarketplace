import { getReviews, getAverageRating } from "@/data/reviews";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Reveal } from "@/components/motion/Reveal";

export default async function ReviewsPage() {
  const [reviews, averageRating] = await Promise.all([getReviews(), getAverageRating()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-foreground">Customer Reviews</h1>
        <p className="mt-2 text-base text-muted-foreground">
          {averageRating} out of 5 average rating from {reviews.length} verified customers.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <Reveal key={review.id} index={index}>
            <ReviewCard review={review} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
