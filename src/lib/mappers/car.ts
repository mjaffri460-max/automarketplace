import type { Car, Powersport, CargoTruck, Yacht } from "@/types";

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

export type CargoTruckRow = {
  id: string;
  make: string;
  model: string;
  year: number;
  truck_type: string;
  price: number;
  currency: string;
  condition: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  cargo_capacity_lbs: number;
  axle_config: string;
  color: string;
  location: string;
  country: string;
  image_url: string;
  images: string[];
  description: string;
  features: string[];
  estimated_shipping_days: number;
  shipping_cost: number;
  competitor_prices: CargoTruck["competitorPrices"];
};

export function mapCargoTruckRow(row: CargoTruckRow): CargoTruck {
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    truckType: row.truck_type as CargoTruck["truckType"],
    price: row.price,
    currency: row.currency,
    condition: row.condition as CargoTruck["condition"],
    mileage: row.mileage,
    fuelType: row.fuel_type as CargoTruck["fuelType"],
    transmission: row.transmission as CargoTruck["transmission"],
    cargoCapacityLbs: row.cargo_capacity_lbs,
    axleConfig: row.axle_config,
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

export type YachtRow = {
  id: string;
  make: string;
  model: string;
  year: number;
  yacht_type: string;
  price: number;
  currency: string;
  condition: string;
  engine_hours: number;
  length_ft: number;
  cabins: number;
  fuel_type: string;
  hull_material: string;
  color: string;
  location: string;
  country: string;
  image_url: string;
  images: string[];
  description: string;
  features: string[];
  estimated_shipping_days: number;
  shipping_cost: number;
  competitor_prices: Yacht["competitorPrices"];
};

export function mapYachtRow(row: YachtRow): Yacht {
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    yachtType: row.yacht_type as Yacht["yachtType"],
    price: row.price,
    currency: row.currency,
    condition: row.condition as Yacht["condition"],
    engineHours: row.engine_hours,
    lengthFt: row.length_ft,
    cabins: row.cabins,
    fuelType: row.fuel_type as Yacht["fuelType"],
    hullMaterial: row.hull_material as Yacht["hullMaterial"],
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
