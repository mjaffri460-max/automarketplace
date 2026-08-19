import { supabase } from "@/lib/supabase";
import type { ShippingRate, VehicleType } from "@/types";

type ShippingRateRow = {
  destination_country: string;
  vehicle_type: string;
  base_cost: number;
  currency: string;
  estimated_days: number;
};

function mapShippingRate(row: ShippingRateRow): ShippingRate {
  return {
    destinationCountry: row.destination_country,
    vehicleType: row.vehicle_type as VehicleType,
    baseCost: row.base_cost,
    currency: row.currency,
    estimatedDays: row.estimated_days,
  };
}

export async function getShippingRates(): Promise<ShippingRate[]> {
  const { data, error } = await supabase.from("shipping_rates").select("*");
  if (error) throw error;
  return (data as ShippingRateRow[]).map(mapShippingRate);
}

export async function getShippingRate(
  destinationCountry: string,
  vehicleType: VehicleType
): Promise<ShippingRate | null> {
  const { data, error } = await supabase
    .from("shipping_rates")
    .select("*")
    .ilike("destination_country", destinationCountry)
    .eq("vehicle_type", vehicleType)
    .maybeSingle();

  if (error) throw error;
  return data ? mapShippingRate(data as ShippingRateRow) : null;
}
