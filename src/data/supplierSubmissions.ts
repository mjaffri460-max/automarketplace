import { createClient } from "@/lib/supabase/server";
import type { SupplierSubmission, SupplierSubmissionInput } from "@/types";

type SupplierSubmissionRow = {
  id: string;
  supplier_id: string;
  make: string;
  model: string;
  year: number;
  mileage: number | null;
  condition: string | null;
  asking_price: number | null;
  currency: string;
  source_country: string;
  export_or_import: string;
  images: string[];
  notes: string | null;
  status: string;
  created_at: string;
};

function mapSupplierSubmission(row: SupplierSubmissionRow): SupplierSubmission {
  return {
    id: row.id,
    supplierId: row.supplier_id,
    make: row.make,
    model: row.model,
    year: row.year,
    mileage: row.mileage ?? undefined,
    condition: row.condition ?? undefined,
    askingPrice: row.asking_price ?? undefined,
    currency: row.currency,
    sourceCountry: row.source_country,
    exportOrImport: row.export_or_import as SupplierSubmission["exportOrImport"],
    images: row.images,
    notes: row.notes ?? undefined,
    status: row.status as SupplierSubmission["status"],
    createdAt: row.created_at,
  };
}

export async function createSupplierSubmission(
  input: SupplierSubmissionInput
): Promise<SupplierSubmission> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("You must be signed in to submit a car.");

  const { data, error } = await supabase
    .from("supplier_submissions")
    .insert({
      supplier_id: userData.user.id,
      make: input.make,
      model: input.model,
      year: input.year,
      mileage: input.mileage,
      condition: input.condition,
      asking_price: input.askingPrice,
      currency: input.currency,
      source_country: input.sourceCountry,
      export_or_import: input.exportOrImport,
      images: input.images,
      notes: input.notes,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapSupplierSubmission(data as SupplierSubmissionRow);
}

export async function getMySupplierSubmissions(): Promise<SupplierSubmission[]> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("supplier_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as SupplierSubmissionRow[]).map(mapSupplierSubmission);
}
