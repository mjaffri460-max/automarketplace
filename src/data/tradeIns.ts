import { createClient } from "@/lib/supabase/server";
import type { InspectionAnswers, TradeInRequest, TradeInRequestInput } from "@/types";

type TradeInRow = {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  vin: string | null;
  condition_answers: InspectionAnswers;
  photos: Record<string, string>;
  estimated_value: number | null;
  currency: string;
  status: string;
  offer_amount: number | null;
  created_at: string;
};

function mapTradeIn(row: TradeInRow): TradeInRequest {
  return {
    id: row.id,
    userId: row.user_id,
    make: row.make,
    model: row.model,
    year: row.year,
    mileage: row.mileage,
    vin: row.vin ?? undefined,
    conditionAnswers: row.condition_answers,
    photos: row.photos,
    estimatedValue: row.estimated_value ?? undefined,
    currency: row.currency,
    status: row.status as TradeInRequest["status"],
    offerAmount: row.offer_amount ?? undefined,
    createdAt: row.created_at,
  };
}

export async function createTradeInRequest(
  input: TradeInRequestInput
): Promise<TradeInRequest> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("You must be signed in to request a trade-in.");

  const { data, error } = await supabase
    .from("trade_in_requests")
    .insert({
      user_id: userData.user.id,
      make: input.make,
      model: input.model,
      year: input.year,
      mileage: input.mileage,
      vin: input.vin,
      condition_answers: input.conditionAnswers,
      photos: input.photos,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapTradeIn(data as TradeInRow);
}

export async function getMyTradeInRequests(): Promise<TradeInRequest[]> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("trade_in_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as TradeInRow[]).map(mapTradeIn);
}
