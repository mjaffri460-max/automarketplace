import { searchCars, getMakes } from "@/data/cars";
import { CarGrid } from "@/components/cars/CarGrid";
import { CarFilters } from "@/components/cars/CarFilters";
import type { CarCategory, CarCondition } from "@/types";

interface CarsPageProps {
  searchParams: Promise<{
    query?: string;
    make?: string;
    condition?: string;
    category?: string;
    maxPrice?: string;
  }>;
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;
  const makes = await getMakes();

  const cars = await searchCars({
    query: params.query,
    make: params.make,
    condition: params.condition ? (params.condition as CarCondition) : undefined,
    category: params.category ? (params.category as CarCategory) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Browse Cars</h1>
      <p className="mt-2 text-base text-slate-600">
        {cars.length} {cars.length === 1 ? "car" : "cars"} available
      </p>

      <div className="mt-6">
        <CarFilters
          makes={makes}
          defaultValues={{
            query: params.query,
            make: params.make,
            condition: params.condition,
            category: params.category,
            maxPrice: params.maxPrice,
          }}
        />
      </div>

      <div className="mt-8">
        <CarGrid cars={cars} />
      </div>
    </div>
  );
}
