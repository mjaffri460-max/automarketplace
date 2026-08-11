import type { ContactMessage } from "@/types";

export async function submitContactMessage(message: ContactMessage): Promise<{ success: true }> {
  console.log("Contact message received:", message);
  return { success: true };
}
