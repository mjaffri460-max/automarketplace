import type { Car, Powersport } from "@/types";

export type CarRow = {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string | null;
  category: string;
  price: number;
  currency: string;
  condition: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  color: string;
  location: string;
  country: string;
  image_url: string;
  images: string[];
  description: string;
  features: string[];
  estimated_shipping_days: number;
  shipping_cost: number;
  competitor_prices: Car["competitorPrices"];
};

export function mapCarRow(row: CarRow): Car {
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    trim: row.trim ?? undefined,
    category: row.category as Car["category"],
    price: row.price,
    currency: row.currency,
    condition: row.condition as Car["condition"],
    mileage: row.mileage,
    fuelType: row.fuel_type as Car["fuelType"],
    transmission: row.transmission as Car["transmission"],
    color: row.color,
    location: row.location,
    country: row.country,
    imageUrl: row.image_url,
    images: row.images,
    description: row.description,
    features: row.features,
    estimatedShippingDays: row.estimated_shipping_days,
    shippingCost: row.shipping_cost,
    competitorPrices: row.competitor_prices,
  };
}

export type PowersportRow = {
  id: string;
  type: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  condition: string;
  mileage: number;
  engine_size: string;
  color: string;
  location: string;
  country: string;
  image_url: string;
  images: string[];
  description: string;
  features: string[];
  estimated_shipping_days: number;
  shipping_cost: number;
  competitor_prices: Powersport["competitorPrices"];
};

export function mapPowersportRow(row: PowersportRow): Powersport {
  return {
    id: row.id,
    type: row.type as Powersport["type"],
    make: row.make,
    model: row.model,
    year: row.year,
    price: row.price,
    currency: row.currency,
    condition: row.condition as Powersport["condition"],
    mileage: row.mileage,
    engineSize: row.engine_size,
    color: row.color,
    location: row.location,
    country: row.country,
    imageUrl: row.image_url,
    images: row.images,
    description: row.description,
    features: row.features,
    estimatedShippingDays: row.estimated_shipping_days,
    shippingCost: row.shipping_cost,
    competitorPrices: row.competitor_prices,
  };
}
