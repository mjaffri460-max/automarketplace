"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password !== confirmPassword) {
    redirect(`/signup?error=${encodeURIComponent("Passwords do not match")}`);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: String(formData.get("email") ?? ""),
    password,
    options: {
      data: {
        full_name: String(formData.get("fullName") ?? ""),
        role: formData.get("wantsSupplier") ? "supplier" : "customer",
      },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.session) {
    redirect("/login?message=Check+your+email+to+confirm+your+account");
  }

  redirect("/account");
}
