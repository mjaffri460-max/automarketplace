import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/currency/Price";
import type { Yacht } from "@/types";

const yachtTypeLabel: Record<Yacht["yachtType"], string> = {
  "motor-yacht": "Motor Yacht",
  "sailing-yacht": "Sailing Yacht",
  catamaran: "Catamaran",
  "sport-fisher": "Sport Fisher",
  superyacht: "Superyacht",
};

export function YachtCard({ yacht }: { yacht: Yacht }) {
  return (
    <Link
      href={`/yachts/${yacht.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={yacht.imageUrl}
          alt={`${yacht.year} ${yacht.make} ${yacht.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 border border-primary/30 bg-background/80 text-foreground backdrop-blur">
          {yachtTypeLabel[yacht.yachtType]}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-lg font-semibold text-foreground">
          {yacht.year} {yacht.make} {yacht.model}
        </p>
        <p className="text-sm text-muted-foreground">
          {yacht.lengthFt}ft &middot; {yacht.cabins} cabins
        </p>
        <p className="mt-2 text-xl font-bold text-primary">
          <Price usd={yacht.price} />
        </p>
        <p className="text-sm text-muted-foreground">{yacht.location}</p>
      </div>
    </Link>
  );
}
