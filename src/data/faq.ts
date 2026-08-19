import { supabase } from "@/lib/supabase";
import type { FaqEntry } from "@/types";

type FaqRow = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

function mapFaq(row: FaqRow): FaqEntry {
  return {
    id: row.id,
    question: row.question,
    keywords: row.keywords,
    answer: row.answer,
  };
}

export async function getFaqEntries(): Promise<FaqEntry[]> {
  const { data, error } = await supabase.from("faq").select("*");
  if (error) throw error;
  return (data as FaqRow[]).map(mapFaq);
}

export async function findFaqAnswer(query: string): Promise<FaqEntry | null> {
  const faqs = await getFaqEntries();
  const normalized = query.toLowerCase();
  const match = faqs.find((faq) => faq.keywords.some((keyword) => normalized.includes(keyword)));
  return match ?? null;
}
