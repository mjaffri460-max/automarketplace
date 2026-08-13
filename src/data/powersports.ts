import powersportsData from "./mock/powersports.json";
import type { Powersport, PowersportFilters } from "@/types";

const powersports = powersportsData as Powersport[];

export async function getPowersports(): Promise<Powersport[]> {
  return powersports;
}

export async function getPowersport(id: string): Promise<Powersport | null> {
  return powersports.find((item) => item.id === id) ?? null;
}

export async function searchPowersports(filters: PowersportFilters): Promise<Powersport[]> {
  return powersports.filter((item) => {
    if (filters.type && item.type !== filters.type) {
      return false;
    }
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const haystack = `${item.make} ${item.model}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

export async function getFeaturedPowersports(limit = 4): Promise<Powersport[]> {
  return powersports.slice(0, limit);
}
