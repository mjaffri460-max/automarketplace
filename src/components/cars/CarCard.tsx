import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Car } from "@/types";

const conditionLabel: Record<Car["condition"], string> = {
  new: "New",
  used: "Used",
  "certified-pre-owned": "Certified Pre-Owned",
};

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={car.imageUrl}
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-white text-slate-900 shadow">
          {conditionLabel[car.condition]}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-lg font-semibold text-slate-900">
          {car.year} {car.make} {car.model}
        </p>
        {car.trim && <p className="text-sm text-slate-600">{car.trim}</p>}
        <p className="mt-2 text-xl font-bold text-slate-900">
          ${car.price.toLocaleString()}
        </p>
        <p className="text-sm text-slate-500">{car.location}</p>
      </div>
    </Link>
  );
}
