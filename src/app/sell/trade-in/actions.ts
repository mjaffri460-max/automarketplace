"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { collectVehiclePhotos } from "@/lib/storage";
import { createTradeInRequest } from "@/data/tradeIns";

const EXTERIOR_KEYS = ["paint", "glass", "tires", "wheels", "lights"];
const INTERIOR_KEYS = ["seats", "dashboard", "climate", "odor", "infotainment"];
const MECHANICAL_KEYS = ["engine", "transmission", "brakes", "suspension", "warningLights"];
const HISTORY_KEYS = ["accidents", "frameDamage", "owners", "title", "maintenanceRecords"];

function pick(formData: FormData, keys: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of keys) {
    const value = formData.get(key);
    if (value) result[key] = String(value);
  }
  return result;
}

export async function submitTradeInRequest(formData: FormData) {
  const supabase = await createClient();

  const photos = await collectVehiclePhotos(supabase, "trade-ins", formData);

  await createTradeInRequest({
    make: String(formData.get("make") ?? ""),
    model: String(formData.get("model") ?? ""),
    year: Number(formData.get("year")),
    mileage: Number(formData.get("mileage")),
    vin: String(formData.get("vin") ?? "") || undefined,
    conditionAnswers: {
      exterior: pick(formData, EXTERIOR_KEYS),
      interior: pick(formData, INTERIOR_KEYS),
      mechanical: pick(formData, MECHANICAL_KEYS),
      history: pick(formData, HISTORY_KEYS),
    },
    photos,
  });

  redirect("/sell/trade-in?submitted=1");
}
