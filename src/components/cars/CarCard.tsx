import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/currency/Price";
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
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={car.imageUrl}
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 border border-primary/30 bg-background/80 text-foreground backdrop-blur">
          {conditionLabel[car.condition]}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-lg font-semibold text-foreground">
          {car.year} {car.make} {car.model}
        </p>
        {car.trim && <p className="text-sm text-muted-foreground">{car.trim}</p>}
        <p className="mt-2 text-xl font-bold text-primary">
          <Price usd={car.price} />
        </p>
        <p className="text-sm text-muted-foreground">{car.location}</p>
      </div>
    </Link>
  );
}
