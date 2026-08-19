import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";

type ProfileRow = {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  supplier_status: string | null;
  created_at: string;
};

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    fullName: row.full_name ?? undefined,
    phone: row.phone ?? undefined,
    role: row.role as Profile["role"],
    supplierStatus: (row.supplier_status as Profile["supplierStatus"]) ?? undefined,
    createdAt: row.created_at,
  };
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProfile(data as ProfileRow) : null;
}

export async function updateProfile(update: {
  fullName?: string;
  phone?: string;
}): Promise<void> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not signed in");

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: update.fullName, phone: update.phone })
    .eq("id", userData.user.id);

  if (error) throw error;
}

export async function requestSupplierAccess(): Promise<void> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not signed in");

  const { error } = await supabase
    .from("profiles")
    .update({ role: "supplier", supplier_status: "pending" })
    .eq("id", userData.user.id);

  if (error) throw error;
}
