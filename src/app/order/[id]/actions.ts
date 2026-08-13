"use server";

import { redirect } from "next/navigation";
import { createOrder } from "@/data/orders";

export async function placeOrder(vehicleId: string, formData: FormData) {
  const confirmation = await createOrder({
    vehicleId,
    shippingAddress: {
      fullName: String(formData.get("fullName") ?? ""),
      addressLine1: String(formData.get("addressLine1") ?? ""),
      addressLine2: String(formData.get("addressLine2") ?? ""),
      city: String(formData.get("city") ?? ""),
      region: String(formData.get("region") ?? ""),
      postalCode: String(formData.get("postalCode") ?? ""),
      country: String(formData.get("country") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
    },
  });

  const query = new URLSearchParams({ orderId: confirmation.orderId }).toString();
  redirect(`/order/${vehicleId}?${query}`);
}
