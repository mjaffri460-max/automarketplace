import { CarCard } from "@/components/cars/CarCard";
import type { Car } from "@/types";

export function CarGrid({ cars }: { cars: Car[] }) {
  if (cars.length === 0) {
    return (
      <p className="py-12 text-center text-base text-slate-600">
        No cars match your search. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
