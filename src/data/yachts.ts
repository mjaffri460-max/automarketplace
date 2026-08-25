import { supabase } from "@/lib/supabase";
import { mapYachtRow, type YachtRow } from "@/lib/mappers/car";
import type { Yacht, YachtFilters } from "@/types";

export async function getYachts(): Promise<Yacht[]> {
  const { data, error } = await supabase.from("yachts").select("*");
  if (error) throw error;
  return (data as YachtRow[]).map(mapYachtRow);
}

export async function getYacht(id: string): Promise<Yacht | null> {
  const { data, error } = await supabase.from("yachts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapYachtRow(data as YachtRow) : null;
}

export async function searchYachts(filters: YachtFilters): Promise<Yacht[]> {
  let query = supabase.from("yachts").select("*");

  if (filters.yachtType) {
    query = query.eq("yacht_type", filters.yachtType);
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
  return (data as YachtRow[]).map(mapYachtRow);
}

export async function getFeaturedYachts(limit = 4): Promise<Yacht[]> {
  const { data, error } = await supabase.from("yachts").select("*").limit(limit);
  if (error) throw error;
  return (data as YachtRow[]).map(mapYachtRow);
}
