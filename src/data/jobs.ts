import jobsData from "./mock/jobs.json";
import type { JobListing } from "@/types";

const jobs = jobsData as JobListing[];

export async function getJobListings(): Promise<JobListing[]> {
  return jobs;
}

export async function getJobListing(id: string): Promise<JobListing | null> {
  return jobs.find((job) => job.id === id) ?? null;
}
