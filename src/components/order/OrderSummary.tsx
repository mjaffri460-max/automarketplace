import Image from "next/image";
import type { Car, Powersport } from "@/types";

export function OrderSummary({ vehicle }: { vehicle: Car | Powersport }) {
  const total = vehicle.price + vehicle.shippingCost;
  const trim = "trim" in vehicle ? vehicle.trim : undefined;

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="flex gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
          {trim && <p className="text-sm text-slate-600">{trim}</p>}
          <p className="text-sm text-slate-500">{vehicle.location}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t pt-4 text-base">
        <div className="flex justify-between text-slate-700">
          <span>Vehicle Price</span>
          <span className="font-medium text-slate-900">${vehicle.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-700">
          <span>Estimated Shipping</span>
          <span className="font-medium text-slate-900">${vehicle.shippingCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-bold text-slate-900">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <p className="pt-1 text-sm text-slate-500">
          Estimated delivery in about {vehicle.estimatedShippingDays} days.
        </p>
      </div>
    </div>
  );
}
