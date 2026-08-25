import { createClient } from "@/lib/supabase/server";

export interface VisitRequestInput {
  vehicleId: string;
  vehicleType: "car" | "powersport" | "cargo-truck" | "yacht";
  vehicleSummary: string;
  preferredDate: string;
  preferredTime?: string;
  wantsTravelHelp: boolean;
  departureCity?: string;
  travelStartDate?: string;
  travelEndDate?: string;
  travelerCount?: number;
  notes?: string;
}

export interface VisitRequest extends VisitRequestInput {
  id: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

type VisitRequestRow = {
  id: string;
  vehicle_id: string;
  vehicle_type: string;
  vehicle_summary: string;
  preferred_date: string;
  preferred_time: string | null;
  wants_travel_help: boolean;
  departure_city: string | null;
  travel_start_date: string | null;
  travel_end_date: string | null;
  traveler_count: number | null;
  notes: string | null;
  status: string;
  created_at: string;
};

function mapVisitRequest(row: VisitRequestRow): VisitRequest {
  return {
    id: row.id,
    vehicleId: row.vehicle_id,
    vehicleType: row.vehicle_type as VisitRequestInput["vehicleType"],
    vehicleSummary: row.vehicle_summary,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time ?? undefined,
    wantsTravelHelp: row.wants_travel_help,
    departureCity: row.departure_city ?? undefined,
    travelStartDate: row.travel_start_date ?? undefined,
    travelEndDate: row.travel_end_date ?? undefined,
    travelerCount: row.traveler_count ?? undefined,
    notes: row.notes ?? undefined,
    status: row.status as VisitRequest["status"],
    createdAt: row.created_at,
  };
}

export async function createVisitRequest(input: VisitRequestInput): Promise<VisitRequest> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const { error } = await supabase.from("visit_requests").insert({
    id,
    user_id: userData.user?.id ?? null,
    vehicle_id: input.vehicleId,
    vehicle_type: input.vehicleType,
    vehicle_summary: input.vehicleSummary,
    preferred_date: input.preferredDate,
    preferred_time: input.preferredTime,
    wants_travel_help: input.wantsTravelHelp,
    departure_city: input.departureCity,
    travel_start_date: input.travelStartDate,
    travel_end_date: input.travelEndDate,
    traveler_count: input.travelerCount,
    notes: input.notes,
  });

  if (error) throw error;

  return {
    id,
    vehicleId: input.vehicleId,
    vehicleType: input.vehicleType,
    vehicleSummary: input.vehicleSummary,
    preferredDate: input.preferredDate,
    preferredTime: input.preferredTime,
    wantsTravelHelp: input.wantsTravelHelp,
    departureCity: input.departureCity,
    travelStartDate: input.travelStartDate,
    travelEndDate: input.travelEndDate,
    travelerCount: input.travelerCount,
    notes: input.notes,
    status: "requested",
    createdAt,
  };
}

export async function getMyVisitRequests(): Promise<VisitRequest[]> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("visit_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as VisitRequestRow[]).map(mapVisitRequest);
}
