import reviewsData from "./mock/reviews.json";
import type { Review } from "@/types";

const reviews = reviewsData as Review[];

export async function getReviews(): Promise<Review[]> {
  return reviews;
}

export async function getFeaturedReviews(limit = 6): Promise<Review[]> {
  return reviews.filter((review) => review.rating >= 4).slice(0, limit);
}

export async function getAverageRating(): Promise<number> {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}
