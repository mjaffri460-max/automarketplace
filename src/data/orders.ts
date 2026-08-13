import { getCar } from "./cars";
import { getPowersport } from "./powersports";
import type { OrderRequest, OrderConfirmation } from "@/types";

export async function createOrder(request: OrderRequest): Promise<OrderConfirmation> {
  const car = await getCar(request.vehicleId);
  const vehicle = car ?? (await getPowersport(request.vehicleId));

  if (!vehicle) {
    throw new Error(`Vehicle not found: ${request.vehicleId}`);
  }

  return {
    orderId: `ord-${Date.now()}`,
    vehicleId: vehicle.id,
    vehicleSummary: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    totalPrice: vehicle.price + vehicle.shippingCost,
    currency: vehicle.currency,
    estimatedDeliveryDays: vehicle.estimatedShippingDays,
    status: "pending",
  };
}
