import { createClient } from "@/lib/supabase/server";
import type { CarListing, CarListingRequest } from "@/types";

type CarListingRow = {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  color: string | null;
  description: string | null;
  asking_price: number;
  currency: string;
  country: string;
  location: string | null;
  images: string[];
  status: string;
  created_at: string;
};

function mapCarListing(row: CarListingRow): CarListing {
  return {
    id: row.id,
    userId: row.user_id,
    make: row.make,
    model: row.model,
    year: row.year,
    mileage: row.mileage,
    condition: row.condition,
    color: row.color ?? undefined,
    description: row.description ?? undefined,
    askingPrice: row.asking_price,
    currency: row.currency,
    country: row.country,
    location: row.location ?? undefined,
    images: row.images,
    status: row.status as CarListing["status"],
    createdAt: row.created_at,
  };
}

export async function createCarListing(request: CarListingRequest): Promise<CarListing> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("You must be signed in to list a car.");

  const { data, error } = await supabase
    .from("car_listings")
    .insert({
      user_id: userData.user.id,
      make: request.make,
      model: request.model,
      year: request.year,
      mileage: request.mileage,
      condition: request.condition,
      color: request.color,
      description: request.description,
      asking_price: request.askingPrice,
      currency: request.currency,
      country: request.country,
      location: request.location,
      images: request.images,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapCarListing(data as CarListingRow);
}

export async function getMyCarListings(): Promise<CarListing[]> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("car_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as CarListingRow[]).map(mapCarListing);
}
