import { supabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";
import type { Booking, Service, ServiceCategory, BookingRequest, BookingConfirmation } from "@/types";

type ServiceRow = {
  id: string;
  name: string;
  category: string;
  description: string;
  price_from: number;
  currency: string;
  duration_estimate: string;
};

type BookingRow = {
  id: string;
  service_id: string;
  service_name: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  notes: string | null;
  status: string;
  created_at: string;
};

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ServiceCategory,
    description: row.description,
    priceFrom: row.price_from,
    currency: row.currency,
    durationEstimate: row.duration_estimate,
  };
}

function mapBooking(row: BookingRow): Booking {
  return {
    bookingId: row.id,
    serviceId: row.service_id,
    serviceName: row.service_name,
    preferredDate: row.preferred_date,
    status: row.status as Booking["status"],
    email: row.email,
    phone: row.phone,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
  };
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase.from("services").select("*");
  if (error) throw error;
  return (data as ServiceRow[]).map(mapService);
}

export async function getService(id: string): Promise<Service | null> {
  const { data, error } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapService(data as ServiceRow) : null;
}

export async function getServicesByCategory(category: ServiceCategory): Promise<Service[]> {
  const { data, error } = await supabase.from("services").select("*").eq("category", category);
  if (error) throw error;
  return (data as ServiceRow[]).map(mapService);
}

export async function createBooking(request: BookingRequest): Promise<BookingConfirmation> {
  const serverClient = await createClient();
  const { data: userData } = await serverClient.auth.getUser();
  const service = await getService(request.serviceId);
  const bookingId = `bk-${crypto.randomUUID()}`;

  const { error } = await serverClient.from("bookings").insert({
    id: bookingId,
    user_id: userData.user?.id ?? null,
    service_id: request.serviceId,
    service_name: service?.name ?? "Service",
    full_name: request.fullName,
    email: request.email,
    phone: request.phone,
    preferred_date: request.preferredDate,
    notes: request.notes,
  });

  if (error) throw error;

  return {
    bookingId,
    serviceId: request.serviceId,
    serviceName: service?.name ?? "Service",
    preferredDate: request.preferredDate,
    status: "pending",
  };
}

export async function getMyBookings(): Promise<Booking[]> {
  const serverClient = await createClient();
  const { data: userData } = await serverClient.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await serverClient
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as BookingRow[]).map(mapBooking);
}
