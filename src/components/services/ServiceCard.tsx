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
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-6">
      <Badge className="w-fit bg-slate-100 text-slate-900">{categoryLabel[service.category]}</Badge>
      <p className="text-lg font-semibold text-slate-900">{service.name}</p>
      <p className="text-sm text-slate-600">{service.description}</p>
      <p className="text-base font-semibold text-slate-900">
        From ${service.priceFrom.toLocaleString()}{" "}
        <span className="text-sm font-normal text-slate-500">&middot; {service.durationEstimate}</span>
      </p>
      <Link
        href={`/services?serviceId=${service.id}#booking-form`}
        className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-slate-900 px-4 text-base font-semibold text-white hover:bg-slate-700"
      >
        Book This Service
      </Link>
    </div>
  );
}
