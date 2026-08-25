import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/currency/Price";
import type { CargoTruck } from "@/types";

const truckTypeLabel: Record<CargoTruck["truckType"], string> = {
  "box-truck": "Box Truck",
  flatbed: "Flatbed",
  "semi-tractor": "Semi-Tractor",
  refrigerated: "Refrigerated",
  tanker: "Tanker",
  "dump-truck": "Dump Truck",
};

export function CargoTruckCard({ truck }: { truck: CargoTruck }) {
  return (
    <Link
      href={`/cargo-trucks/${truck.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={truck.imageUrl}
          alt={`${truck.year} ${truck.make} ${truck.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 border border-primary/30 bg-background/80 text-foreground backdrop-blur">
          {truckTypeLabel[truck.truckType]}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-lg font-semibold text-foreground">
          {truck.year} {truck.make} {truck.model}
        </p>
        <p className="text-sm text-muted-foreground">
          {truck.cargoCapacityLbs.toLocaleString()} lb capacity
        </p>
        <p className="mt-2 text-xl font-bold text-primary">
          <Price usd={truck.price} />
        </p>
        <p className="text-sm text-muted-foreground">{truck.location}</p>
      </div>
    </Link>
  );
}
