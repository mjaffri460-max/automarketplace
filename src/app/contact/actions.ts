"use server";

import { redirect } from "next/navigation";
import { submitContactMessage } from "@/data/contact";

export async function sendContactMessage(formData: FormData) {
  await submitContactMessage({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  });

  redirect("/contact?sent=1");
}
