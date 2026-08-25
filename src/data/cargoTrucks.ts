import { supabase } from "@/lib/supabase";
import { mapCargoTruckRow, type CargoTruckRow } from "@/lib/mappers/car";
import type { CargoTruck, CargoTruckFilters } from "@/types";

export async function getCargoTrucks(): Promise<CargoTruck[]> {
  const { data, error } = await supabase.from("cargo_trucks").select("*");
  if (error) throw error;
  return (data as CargoTruckRow[]).map(mapCargoTruckRow);
}

export async function getCargoTruck(id: string): Promise<CargoTruck | null> {
  const { data, error } = await supabase
    .from("cargo_trucks")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapCargoTruckRow(data as CargoTruckRow) : null;
}

export async function searchCargoTrucks(filters: CargoTruckFilters): Promise<CargoTruck[]> {
  let query = supabase.from("cargo_trucks").select("*");

  if (filters.truckType) {
    query = query.eq("truck_type", filters.truckType);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }
  if (filters.query) {
    const q = filters.query.replace(/[%,]/g, "");
    query = query.or(`make.ilike.%${q}%,model.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as CargoTruckRow[]).map(mapCargoTruckRow);
}

export async function getFeaturedCargoTrucks(limit = 4): Promise<CargoTruck[]> {
  const { data, error } = await supabase.from("cargo_trucks").select("*").limit(limit);
  if (error) throw error;
  return (data as CargoTruckRow[]).map(mapCargoTruckRow);
}
