import type { CarCondition } from "@/types";

const conditions: { value: CarCondition; label: string }[] = [
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "certified-pre-owned", label: "Certified Pre-Owned" },
];

interface CarFiltersProps {
  makes: string[];
  defaultValues: {
    query?: string;
    make?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export function CarFilters({ makes, defaultValues }: CarFiltersProps) {
  return (
    <form method="get" className="grid grid-cols-1 gap-4 rounded-xl border bg-white p-4 sm:grid-cols-5 sm:items-end">
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="query" className="text-sm font-medium text-slate-700">
          Search
        </label>
        <input
          id="query"
          name="query"
          type="text"
          placeholder="Make or model"
          defaultValue={defaultValues.query}
          className="h-11 rounded-md border border-slate-300 px-3 text-base"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="make" className="text-sm font-medium text-slate-700">
          Make
        </label>
        <select
          id="make"
          name="make"
          defaultValue={defaultValues.make ?? ""}
          className="h-11 rounded-md border border-slate-300 px-3 text-base"
        >
          <option value="">All Makes</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="condition" className="text-sm font-medium text-slate-700">
          Condition
        </label>
        <select
          id="condition"
          name="condition"
          defaultValue={defaultValues.condition ?? ""}
          className="h-11 rounded-md border border-slate-300 px-3 text-base"
        >
          <option value="">Any Condition</option>
          {conditions.map((condition) => (
            <option key={condition.value} value={condition.value}>
              {condition.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="maxPrice" className="text-sm font-medium text-slate-700">
            Max Price
          </label>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            placeholder="Any"
            defaultValue={defaultValues.maxPrice}
            className="h-11 w-full rounded-md border border-slate-300 px-3 text-base"
          />
        </div>
      </div>
      <div className="sm:col-span-5">
        <button
          type="submit"
          className="h-11 w-full rounded-md bg-slate-900 px-6 text-base font-semibold text-white hover:bg-slate-700 sm:w-auto"
        >
          Search Cars
        </button>
      </div>
    </form>
  );
}
