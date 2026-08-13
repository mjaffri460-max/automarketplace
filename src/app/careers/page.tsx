import { getJobListings } from "@/data/jobs";
import { JobCard } from "@/components/careers/JobCard";

export default async function CareersPage() {
  const jobs = await getJobListings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Work at AutoMarketplace</h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600">
        We&apos;re building a simpler way for anyone — from first-time buyers to lifelong car
        enthusiasts — to find and own their dream vehicle. Here&apos;s where we&apos;re hiring right now.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <p className="mt-10 text-sm text-slate-500">
        Don&apos;t see the right role? Reach out on the{" "}
        <a href="/contact" className="font-medium text-slate-700 underline">
          Contact page
        </a>{" "}
        and tell us how you&apos;d like to help.
      </p>
    </div>
  );
}
