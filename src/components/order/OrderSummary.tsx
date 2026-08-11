import Image from "next/image";
import type { Car } from "@/types";

export function OrderSummary({ car }: { car: Car }) {
  const total = car.price + car.shippingCost;

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="flex gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image src={car.imageUrl} alt={`${car.year} ${car.make} ${car.model}`} fill className="object-cover" />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">
            {car.year} {car.make} {car.model}
          </p>
          {car.trim && <p className="text-sm text-slate-600">{car.trim}</p>}
          <p className="text-sm text-slate-500">{car.location}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t pt-4 text-base">
        <div className="flex justify-between text-slate-700">
          <span>Vehicle Price</span>
          <span className="font-medium text-slate-900">${car.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-700">
          <span>Estimated Shipping</span>
          <span className="font-medium text-slate-900">${car.shippingCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-bold text-slate-900">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <p className="pt-1 text-sm text-slate-500">
          Estimated delivery in about {car.estimatedShippingDays} days.
        </p>
      </div>
    </div>
  );
}
