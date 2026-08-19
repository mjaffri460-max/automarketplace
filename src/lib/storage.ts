import type { SupabaseClient } from "@supabase/supabase-js";
import { VEHICLE_PHOTO_SLOTS } from "./vehiclePhotoSlots";

export async function uploadVehiclePhoto(
  supabase: SupabaseClient,
  userId: string,
  folder: string,
  file: File
): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${userId}/${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("vehicle-photos").upload(path, file, {
    contentType: file.type,
  });

  if (error) throw error;
  return path;
}

export async function collectVehiclePhotos(
  supabase: SupabaseClient,
  userId: string,
  folder: string,
  formData: FormData
): Promise<Record<string, string>> {
  const photos: Record<string, string> = {};

  for (const slot of VEHICLE_PHOTO_SLOTS) {
    const file = formData.get(`photo_${slot.key}`);
    if (file instanceof File && file.size > 0) {
      photos[slot.key] = await uploadVehiclePhoto(supabase, userId, folder, file);
    }
  }

  return photos;
}

export async function getVehiclePhotoUrl(
  supabase: SupabaseClient,
  path: string
): Promise<string> {
  const { data, error } = await supabase.storage
    .from("vehicle-photos")
    .createSignedUrl(path, 3600);

  if (error) throw error;
  return data.signedUrl;
}
