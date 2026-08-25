import Image from "next/image";
import { Price } from "@/components/currency/Price";
import type { Car, Powersport, CargoTruck, Yacht } from "@/types";

export function OrderSummary({ vehicle }: { vehicle: Car | Powersport | CargoTruck | Yacht }) {
  const total = vehicle.price + vehicle.shippingCost;
  const trim = "trim" in vehicle ? vehicle.trim : undefined;

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
          {trim && <p className="text-sm text-muted-foreground">{trim}</p>}
          <p className="text-sm text-muted-foreground">{vehicle.location}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t pt-4 text-base">
        <div className="flex justify-between text-foreground/90">
          <span>Vehicle Price</span>
          <span className="font-medium text-foreground">
            <Price usd={vehicle.price} />
          </span>
        </div>
        <div className="flex justify-between text-foreground/90">
          <span>Estimated Shipping</span>
          <span className="font-medium text-foreground">
            <Price usd={vehicle.shippingCost} />
          </span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-bold text-foreground">
          <span>Total</span>
          <span>
            <Price usd={total} />
          </span>
        </div>
        <p className="pt-1 text-sm text-muted-foreground">
          Estimated delivery in about {vehicle.estimatedShippingDays} days.
        </p>
        <p className="text-xs text-muted-foreground">
          Shown for reference — cash payment is charged in USD at checkout.
        </p>
      </div>
    </div>
  );
}
