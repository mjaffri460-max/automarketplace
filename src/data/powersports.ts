import { supabase } from "@/lib/supabase";
import { mapPowersportRow, type PowersportRow } from "@/lib/mappers/car";
import type { Powersport, PowersportFilters } from "@/types";

export async function getPowersports(): Promise<Powersport[]> {
  const { data, error } = await supabase.from("powersports").select("*");
  if (error) throw error;
  return (data as PowersportRow[]).map(mapPowersportRow);
}

export async function getPowersport(id: string): Promise<Powersport | null> {
  const { data, error } = await supabase
    .from("powersports")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapPowersportRow(data as PowersportRow) : null;
}

export async function searchPowersports(filters: PowersportFilters): Promise<Powersport[]> {
  let query = supabase.from("powersports").select("*");

  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  if (filters.query) {
    const q = filters.query.replace(/[%,]/g, "");
    query = query.or(`make.ilike.%${q}%,model.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as PowersportRow[]).map(mapPowersportRow);
}

export async function getFeaturedPowersports(limit = 4): Promise<Powersport[]> {
  const { data, error } = await supabase.from("powersports").select("*").limit(limit);
  if (error) throw error;
  return (data as PowersportRow[]).map(mapPowersportRow);
}
