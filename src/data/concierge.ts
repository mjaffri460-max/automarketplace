import { createClient } from "@/lib/supabase/server";
import type { ConciergeRequest, ConciergeRequestInput } from "@/types";

type ConciergeRow = {
  id: string;
  user_id: string;
  make: string | null;
  model: string | null;
  year_min: number | null;
  year_max: number | null;
  budget_min: number | null;
  budget_max: number | null;
  currency: string;
  category: string | null;
  destination_country: string;
  notes: string | null;
  status: string;
  created_at: string;
};

function mapConciergeRequest(row: ConciergeRow): ConciergeRequest {
  return {
    id: row.id,
    userId: row.user_id,
    make: row.make ?? undefined,
    model: row.model ?? undefined,
    yearMin: row.year_min ?? undefined,
    yearMax: row.year_max ?? undefined,
    budgetMin: row.budget_min ?? undefined,
    budgetMax: row.budget_max ?? undefined,
    currency: row.currency,
    category: row.category ?? undefined,
    destinationCountry: row.destination_country,
    notes: row.notes ?? undefined,
    status: row.status as ConciergeRequest["status"],
    createdAt: row.created_at,
  };
}

export async function createConciergeRequest(
  input: ConciergeRequestInput
): Promise<ConciergeRequest> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("You must be signed in to submit a sourcing request.");

  const { data, error } = await supabase
    .from("concierge_requests")
    .insert({
      user_id: userData.user.id,
      make: input.make,
      model: input.model,
      year_min: input.yearMin,
      year_max: input.yearMax,
      budget_min: input.budgetMin,
      budget_max: input.budgetMax,
      currency: input.currency,
      category: input.category,
      destination_country: input.destinationCountry,
      notes: input.notes,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapConciergeRequest(data as ConciergeRow);
}

export async function getMyConciergeRequests(): Promise<ConciergeRequest[]> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("concierge_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as ConciergeRow[]).map(mapConciergeRequest);
}
