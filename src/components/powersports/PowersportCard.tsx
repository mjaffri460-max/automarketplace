import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/currency/Price";
import type { Powersport } from "@/types";

const typeLabel: Record<Powersport["type"], string> = {
  motorcycle: "Motorcycle",
  "dirt-bike": "Dirt Bike",
  "jet-ski": "Jet Ski",
};

export function PowersportCard({ item }: { item: Powersport }) {
  return (
    <Link
      href={`/powersports/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={item.imageUrl}
          alt={`${item.year} ${item.make} ${item.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 border border-primary/30 bg-background/80 text-foreground backdrop-blur">
          {typeLabel[item.type]}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-lg font-semibold text-foreground">
          {item.year} {item.make} {item.model}
        </p>
        <p className="mt-2 text-xl font-bold text-primary">
          <Price usd={item.price} />
        </p>
        <p className="text-sm text-muted-foreground">{item.location}</p>
      </div>
    </Link>
  );
}
