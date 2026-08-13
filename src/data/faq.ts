import faqData from "./mock/faq.json";
import type { FaqEntry } from "@/types";

const faqs = faqData as FaqEntry[];

export async function getFaqEntries(): Promise<FaqEntry[]> {
  return faqs;
}

export async function findFaqAnswer(query: string): Promise<FaqEntry | null> {
  const normalized = query.toLowerCase();
  const match = faqs.find((faq) => faq.keywords.some((keyword) => normalized.includes(keyword)));
  return match ?? null;
}
