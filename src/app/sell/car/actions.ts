"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { collectVehiclePhotos } from "@/lib/storage";
import { createCarListing } from "@/data/carListings";

export async function submitCarListing(formData: FormData) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    redirect("/login");
  }

  const photos = await collectVehiclePhotos(
    supabase,
    userData.user.id,
    "car-listings",
    formData
  );

  await createCarListing({
    make: String(formData.get("make") ?? ""),
    model: String(formData.get("model") ?? ""),
    year: Number(formData.get("year")),
    mileage: Number(formData.get("mileage")),
    condition: String(formData.get("condition") ?? ""),
    color: String(formData.get("color") ?? "") || undefined,
    description: String(formData.get("description") ?? "") || undefined,
    askingPrice: Number(formData.get("askingPrice")),
    currency: String(formData.get("currency") ?? "USD"),
    country: String(formData.get("country") ?? ""),
    location: String(formData.get("location") ?? "") || undefined,
    images: Object.values(photos),
  });

  redirect("/sell/car?submitted=1");
}
