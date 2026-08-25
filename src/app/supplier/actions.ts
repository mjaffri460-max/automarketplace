"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createSupplierSubmission } from "@/data/supplierSubmissions";
import { collectVehiclePhotos } from "@/lib/storage";

function toNumber(value: FormDataEntryValue | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function submitSupplierListing(formData: FormData) {
  const supabase = await createClient();

  const photos = await collectVehiclePhotos(supabase, "supplier-submissions", formData);

  await createSupplierSubmission({
    make: String(formData.get("make") ?? ""),
    model: String(formData.get("model") ?? ""),
    year: Number(formData.get("year") ?? 0),
    mileage: toNumber(formData.get("mileage")),
    condition: String(formData.get("condition") ?? "") || undefined,
    askingPrice: toNumber(formData.get("askingPrice")),
    currency: String(formData.get("currency") ?? "USD"),
    sourceCountry: String(formData.get("sourceCountry") ?? ""),
    exportOrImport: formData.get("exportOrImport") === "import" ? "import" : "export",
    images: Object.values(photos),
    notes: String(formData.get("notes") ?? "") || undefined,
  });

  redirect("/supplier?submitted=1");
}
