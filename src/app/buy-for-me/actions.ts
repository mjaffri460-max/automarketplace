"use server";

import { redirect } from "next/navigation";
import { createConciergeRequest } from "@/data/concierge";

function toNumber(value: FormDataEntryValue | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function submitConciergeRequest(formData: FormData) {
  await createConciergeRequest({
    make: String(formData.get("make") ?? "") || undefined,
    model: String(formData.get("model") ?? "") || undefined,
    yearMin: toNumber(formData.get("yearMin")),
    yearMax: toNumber(formData.get("yearMax")),
    budgetMin: toNumber(formData.get("budgetMin")),
    budgetMax: toNumber(formData.get("budgetMax")),
    currency: String(formData.get("currency") ?? "USD"),
    category: String(formData.get("category") ?? "") || undefined,
    destinationCountry: String(formData.get("destinationCountry") ?? ""),
    notes: String(formData.get("notes") ?? "") || undefined,
  });

  redirect("/buy-for-me?submitted=1");
}
