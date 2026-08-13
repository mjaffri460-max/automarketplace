import type { Dealer } from "@/types";

export function DealerCard({ dealer }: { dealer: Dealer }) {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${dealer.lat},${dealer.lng}`;

  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-white p-6">
      <p className="text-lg font-semibold text-slate-900">{dealer.name}</p>
      <p className="text-sm text-slate-600">{dealer.address}</p>
      <p className="text-sm text-slate-500">{dealer.phone}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {dealer.servicesOffered.map((service) => (
          <span key={service} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {service}
          </span>
        ))}
      </div>
      <a
        href={mapsHref}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex h-10 w-fit items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
      >
        Get Directions
      </a>
    </div>
  );
}
