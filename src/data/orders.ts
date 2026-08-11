import { getCar } from "./cars";
import type { OrderRequest, OrderConfirmation } from "@/types";

export async function createOrder(request: OrderRequest): Promise<OrderConfirmation> {
  const car = await getCar(request.carId);
  if (!car) {
    throw new Error(`Car not found: ${request.carId}`);
  }

  return {
    orderId: `ord-${Date.now()}`,
    carId: car.id,
    carSummary: `${car.year} ${car.make} ${car.model}`,
    totalPrice: car.price + car.shippingCost,
    currency: car.currency,
    estimatedDeliveryDays: car.estimatedShippingDays,
    status: "pending",
  };
}
