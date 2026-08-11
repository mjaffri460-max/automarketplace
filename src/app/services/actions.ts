"use server";

import { redirect } from "next/navigation";
import { createBooking } from "@/data/services";

export async function submitBooking(formData: FormData) {
  const confirmation = await createBooking({
    serviceId: String(formData.get("serviceId") ?? ""),
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    preferredDate: String(formData.get("preferredDate") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  });

  const query = new URLSearchParams({
    bookingId: confirmation.bookingId,
    serviceName: confirmation.serviceName,
    date: confirmation.preferredDate,
  }).toString();

  redirect(`/services/confirmation?${query}`);
}
