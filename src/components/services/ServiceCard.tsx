import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/types";

const categoryLabel: Record<Service["category"], string> = {
  warranty: "Warranty",
  maintenance: "Maintenance",
  insurance: "Insurance",
  detailing: "Detailing",
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
      <Badge className="w-fit bg-muted text-foreground">{categoryLabel[service.category]}</Badge>
      <p className="text-lg font-semibold text-foreground">{service.name}</p>
      <p className="text-sm text-muted-foreground">{service.description}</p>
      <p className="text-base font-semibold text-foreground">
        From ${service.priceFrom.toLocaleString()}{" "}
        <span className="text-sm font-normal text-muted-foreground">&middot; {service.durationEstimate}</span>
      </p>
      <Link
        href={`/services?serviceId=${service.id}#booking-form`}
        className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-base font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Book This Service
      </Link>
    </div>
  );
}
