import carsData from "./mock/cars.json";
import type { Car, CarFilters } from "@/types";

const cars = carsData as Car[];

export async function getCars(): Promise<Car[]> {
  return cars;
}

export async function getCar(id: string): Promise<Car | null> {
  return cars.find((car) => car.id === id) ?? null;
}

export async function searchCars(filters: CarFilters): Promise<Car[]> {
  return cars.filter((car) => {
    if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) {
      return false;
    }
    if (filters.condition && car.condition !== filters.condition) {
      return false;
    }
    if (filters.category && car.category !== filters.category) {
      return false;
    }
    if (filters.country && car.country.toLowerCase() !== filters.country.toLowerCase()) {
      return false;
    }
    if (filters.minPrice !== undefined && car.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && car.price > filters.maxPrice) {
      return false;
    }
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const haystack = `${car.make} ${car.model} ${car.trim ?? ""}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

export async function getFeaturedCars(limit = 4): Promise<Car[]> {
  return cars.slice(0, limit);
}

export async function getMakes(): Promise<string[]> {
  return Array.from(new Set(cars.map((car) => car.make))).sort();
}
