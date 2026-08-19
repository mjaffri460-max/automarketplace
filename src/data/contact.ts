import { supabase } from "@/lib/supabase";
import type { ContactMessage } from "@/types";

export async function submitContactMessage(message: ContactMessage): Promise<{ success: true }> {
  const { error } = await supabase.from("contact_messages").insert({
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
  });

  if (error) throw error;

  return { success: true };
}
