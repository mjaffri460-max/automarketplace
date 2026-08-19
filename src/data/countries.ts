import { supabase } from "@/lib/supabase";
import { getCars } from "./cars";
import { getPowersports } from "./powersports";
import type { ShippingCountry, ShippingCountryAvailability } from "@/types";

type CountryRow = {
  code: string;
  name: string;
  lat: number;
  lng: number;
};

function mapCountry(row: CountryRow): ShippingCountry {
  return {
    code: row.code,
    name: row.name,
    lat: row.lat,
    lng: row.lng,
  };
}

export async function getShippingCountries(): Promise<ShippingCountryAvailability[]> {
  const { data, error } = await supabase.from("shipping_countries").select("*");
  if (error) throw error;

  const [cars, powersports] = await Promise.all([getCars(), getPowersports()]);
  const counts = new Map<string, number>();

  for (const vehicle of [...cars, ...powersports]) {
    counts.set(vehicle.country, (counts.get(vehicle.country) ?? 0) + 1);
  }

  return (data as CountryRow[]).map(mapCountry).map((country) => ({
    ...country,
    availableVehicles: counts.get(country.name) ?? 0,
  }));
}
