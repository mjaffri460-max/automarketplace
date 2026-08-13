import dealersData from "./mock/dealers.json";
import type { Dealer } from "@/types";

const dealers = dealersData as Dealer[];

export async function getDealers(): Promise<Dealer[]> {
  return dealers;
}

export async function getDealer(id: string): Promise<Dealer | null> {
  return dealers.find((dealer) => dealer.id === id) ?? null;
}

export async function getDealersByCountry(country: string): Promise<Dealer[]> {
  return dealers.filter((dealer) => dealer.country.toLowerCase() === country.toLowerCase());
}
