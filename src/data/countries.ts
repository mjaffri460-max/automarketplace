import countriesData from "./mock/countries.json";
import { getCars } from "./cars";
import { getPowersports } from "./powersports";
import type { ShippingCountry, ShippingCountryAvailability } from "@/types";

const countries = countriesData as ShippingCountry[];

export async function getShippingCountries(): Promise<ShippingCountryAvailability[]> {
  const [cars, powersports] = await Promise.all([getCars(), getPowersports()]);
  const counts = new Map<string, number>();

  for (const vehicle of [...cars, ...powersports]) {
    counts.set(vehicle.country, (counts.get(vehicle.country) ?? 0) + 1);
  }

  return countries.map((country) => ({
    ...country,
    availableVehicles: counts.get(country.name) ?? 0,
  }));
}
