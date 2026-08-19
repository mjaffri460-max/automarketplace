import { supabase } from "@/lib/supabase";
import type { Review } from "@/types";

type ReviewRow = {
  id: string;
  author_name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  vehicle_purchased: string | null;
  date: string;
};

function mapReview(row: ReviewRow): Review {
  return {
    id: row.id,
    authorName: row.author_name,
    location: row.location,
    rating: row.rating,
    title: row.title,
    body: row.body,
    vehiclePurchased: row.vehicle_purchased ?? undefined,
    date: row.date,
  };
}

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase.from("reviews").select("*");
  if (error) throw error;
  return (data as ReviewRow[]).map(mapReview);
}

export async function getFeaturedReviews(limit = 6): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .gte("rating", 4)
    .limit(limit);
  if (error) throw error;
  return (data as ReviewRow[]).map(mapReview);
}

export async function getAverageRating(): Promise<number> {
  const { data, error } = await supabase.from("reviews").select("rating");
  if (error) throw error;
  const ratings = (data as { rating: number }[]).map((row) => row.rating);
  const total = ratings.reduce((sum, rating) => sum + rating, 0);
  return Math.round((total / ratings.length) * 10) / 10;
}
