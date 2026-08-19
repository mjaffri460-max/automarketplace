"use server";

import { redirect } from "next/navigation";
import { updateProfile, requestSupplierAccess } from "@/data/profile";

export async function saveProfile(formData: FormData) {
  await updateProfile({
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  });

  redirect("/account?saved=1");
}

export async function applyAsSupplier() {
  await requestSupplierAccess();
  redirect("/account?supplierApplied=1");
}
