import { Badge } from "@/components/ui/badge";
import type { JobListing } from "@/types";

const employmentTypeLabel: Record<JobListing["employmentType"], string> = {
  "full-time": "Full-Time",
  "part-time": "Part-Time",
  contract: "Contract",
};

export function JobCard({ job }: { job: JobListing }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-muted text-foreground">{job.department}</Badge>
        <Badge className="bg-muted text-foreground">{employmentTypeLabel[job.employmentType]}</Badge>
      </div>
      <p className="text-lg font-semibold text-foreground">{job.title}</p>
      <p className="text-sm text-muted-foreground">{job.location}</p>
      <p className="text-sm text-muted-foreground">{job.description}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {job.requirements.map((requirement) => (
          <li key={requirement}>{requirement}</li>
        ))}
      </ul>
      <a
        href={`mailto:careers@automarketplace.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
        className="mt-2 inline-flex h-11 w-fit items-center justify-center rounded-md bg-primary px-5 text-base font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Apply Now
      </a>
    </div>
  );
}
