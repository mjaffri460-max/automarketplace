import { supabase } from "@/lib/supabase";
import { mapCarRow, type CarRow } from "@/lib/mappers/car";
import type { Car, CarFilters } from "@/types";

export async function getCars(): Promise<Car[]> {
  const { data, error } = await supabase.from("cars").select("*");
  if (error) throw error;
  return (data as CarRow[]).map(mapCarRow);
}

export async function getCar(id: string): Promise<Car | null> {
  const { data, error } = await supabase.from("cars").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapCarRow(data as CarRow) : null;
}

export async function searchCars(filters: CarFilters): Promise<Car[]> {
  let query = supabase.from("cars").select("*");

  if (filters.make) {
    query = query.ilike("make", filters.make);
  }
  if (filters.condition) {
    query = query.eq("condition", filters.condition);
  }
  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.country) {
    query = query.ilike("country", filters.country);
  }
  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }
  if (filters.query) {
    const q = filters.query.replace(/[%,]/g, "");
    query = query.or(`make.ilike.%${q}%,model.ilike.%${q}%,trim.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as CarRow[]).map(mapCarRow);
}

export async function getFeaturedCars(limit = 4): Promise<Car[]> {
  const { data, error } = await supabase.from("cars").select("*").limit(limit);
  if (error) throw error;
  return (data as CarRow[]).map(mapCarRow);
}

export async function getMakes(): Promise<string[]> {
  const { data, error } = await supabase.from("cars").select("make");
  if (error) throw error;
  return Array.from(new Set((data as { make: string }[]).map((row) => row.make))).sort();
}
