import Image from "next/image";
import type { Car, Powersport } from "@/types";

export function OrderSummary({ vehicle }: { vehicle: Car | Powersport }) {
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
          <span className="font-medium text-foreground">${vehicle.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-foreground/90">
          <span>Estimated Shipping</span>
          <span className="font-medium text-foreground">${vehicle.shippingCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-bold text-foreground">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <p className="pt-1 text-sm text-muted-foreground">
          Estimated delivery in about {vehicle.estimatedShippingDays} days.
        </p>
      </div>
    </div>
  );
}
