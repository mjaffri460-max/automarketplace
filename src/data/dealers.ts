import { supabase } from "@/lib/supabase";
import type { Dealer } from "@/types";

type DealerRow = {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  services_offered: string[];
};

function mapDealer(row: DealerRow): Dealer {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    country: row.country,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    phone: row.phone,
    servicesOffered: row.services_offered,
  };
}

export async function getDealers(): Promise<Dealer[]> {
  const { data, error } = await supabase.from("dealers").select("*");
  if (error) throw error;
  return (data as DealerRow[]).map(mapDealer);
}

export async function getDealer(id: string): Promise<Dealer | null> {
  const { data, error } = await supabase.from("dealers").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapDealer(data as DealerRow) : null;
}

export async function getDealersByCountry(country: string): Promise<Dealer[]> {
  const { data, error } = await supabase.from("dealers").select("*").ilike("country", country);
  if (error) throw error;
  return (data as DealerRow[]).map(mapDealer);
}
