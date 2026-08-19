import { searchPowersports } from "@/data/powersports";
import { PowersportGrid } from "@/components/powersports/PowersportGrid";
import type { PowersportType } from "@/types";

const typeOptions: { value: PowersportType; label: string }[] = [
  { value: "motorcycle", label: "Motorcycles" },
  { value: "dirt-bike", label: "Dirt Bikes" },
  { value: "jet-ski", label: "Jet Skis" },
];

interface PowersportsPageProps {
  searchParams: Promise<{ type?: string; query?: string }>;
}

export default async function PowersportsPage({ searchParams }: PowersportsPageProps) {
  const params = await searchParams;
  const items = await searchPowersports({
    type: params.type ? (params.type as PowersportType) : undefined,
    query: params.query,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">Motorcycles, Dirt Bikes &amp; Jet Skis</h1>
      <p className="mt-2 text-base text-muted-foreground">
        {items.length} {items.length === 1 ? "listing" : "listings"} available to order and ship.
      </p>

      <form method="get" className="mt-6 flex flex-wrap items-end gap-4 rounded-xl border bg-card p-4">
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
            Type
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
        <button
          type="submit"
          className="h-11 rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Search
        </button>
      </form>

      <div className="mt-8">
        <PowersportGrid items={items} />
      </div>
    </div>
  );
}
