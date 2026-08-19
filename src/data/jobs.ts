import { supabase } from "@/lib/supabase";
import type { EmploymentType, JobListing } from "@/types";

type JobRow = {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
};

function mapJob(row: JobRow): JobListing {
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    employmentType: row.employment_type as EmploymentType,
    description: row.description,
    requirements: row.requirements,
  };
}

export async function getJobListings(): Promise<JobListing[]> {
  const { data, error } = await supabase.from("jobs").select("*");
  if (error) throw error;
  return (data as JobRow[]).map(mapJob);
}

export async function getJobListing(id: string): Promise<JobListing | null> {
  const { data, error } = await supabase.from("jobs").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapJob(data as JobRow) : null;
}
