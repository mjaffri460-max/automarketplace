import { searchCargoTrucks } from "@/data/cargoTrucks";
import { CargoTruckGrid } from "@/components/trucks/CargoTruckGrid";
import { Reveal } from "@/components/motion/Reveal";
import type { CargoTruckType } from "@/types";

const typeOptions: { value: CargoTruckType; label: string }[] = [
  { value: "semi-tractor", label: "Semi-Tractors" },
  { value: "box-truck", label: "Box Trucks" },
  { value: "flatbed", label: "Flatbeds" },
  { value: "refrigerated", label: "Refrigerated" },
  { value: "tanker", label: "Tankers" },
  { value: "dump-truck", label: "Dump Trucks" },
];

interface CargoTrucksPageProps {
  searchParams: Promise<{ type?: string; query?: string; maxPrice?: string }>;
}

export default async function CargoTrucksPage({ searchParams }: CargoTrucksPageProps) {
  const params = await searchParams;
  const trucks = await searchCargoTrucks({
    truckType: params.type ? (params.type as CargoTruckType) : undefined,
    query: params.query,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-foreground">Cargo Trucks</h1>
        <p className="mt-2 text-base text-muted-foreground">
          {trucks.length} {trucks.length === 1 ? "truck" : "trucks"} available for fleets,
          owner-operators, and commercial buyers.
        </p>
      </Reveal>

      <Reveal delay={0.1} as="div" className="mt-6">
        <form method="get" className="flex flex-wrap items-end gap-4 rounded-xl border bg-card p-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="query" className="text-sm font-medium text-foreground/90">
              Search
            </label>
            <input
              id="query"
              name="query"
              type="text"
              placeholder="Make or model"
              defaultValue={params.query}
              className="h-11 rounded-md border border-border px-3 text-base"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-sm font-medium text-foreground/90">
              Truck Type
            </label>
            <select
              id="type"
              name="type"
              defaultValue={params.type ?? ""}
              className="h-11 rounded-md border border-border px-3 text-base"
            >
              <option value="">All Types</option>
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="maxPrice" className="text-sm font-medium text-foreground/90">
              Max Price
            </label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              placeholder="Any"
              defaultValue={params.maxPrice}
              className="h-11 w-32 rounded-md border border-border px-3 text-base"
            />
          </div>
          <button
            type="submit"
            className="h-11 rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Search
          </button>
        </form>
      </Reveal>

      <div className="mt-8">
        <CargoTruckGrid trucks={trucks} />
      </div>
    </div>
  );
}
