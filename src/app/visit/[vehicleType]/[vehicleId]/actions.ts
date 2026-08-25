"use server";

import { redirect } from "next/navigation";
import { createVisitRequest } from "@/data/visitRequests";

export async function submitVisitRequest(
  vehicleId: string,
  vehicleType: "car" | "powersport",
  vehicleSummary: string,
  formData: FormData
) {
  const wantsTravelHelp = formData.get("wantsTravelHelp") === "on";

  await createVisitRequest({
    vehicleId,
    vehicleType,
    vehicleSummary,
    preferredDate: String(formData.get("preferredDate") ?? ""),
    preferredTime: String(formData.get("preferredTime") ?? "") || undefined,
    wantsTravelHelp,
    departureCity: wantsTravelHelp
      ? String(formData.get("departureCity") ?? "") || undefined
      : undefined,
    travelStartDate: wantsTravelHelp
      ? String(formData.get("travelStartDate") ?? "") || undefined
      : undefined,
    travelEndDate: wantsTravelHelp
      ? String(formData.get("travelEndDate") ?? "") || undefined
      : undefined,
    travelerCount: wantsTravelHelp
      ? Number(formData.get("travelerCount")) || undefined
      : undefined,
    notes: String(formData.get("notes") ?? "") || undefined,
  });

  redirect(`/visit/${vehicleType}/${vehicleId}?requested=1&travel=${wantsTravelHelp ? "1" : "0"}`);
}
