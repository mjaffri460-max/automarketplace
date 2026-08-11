import servicesData from "./mock/services.json";
import type { Service, ServiceCategory, BookingRequest, BookingConfirmation } from "@/types";

const services = servicesData as Service[];

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getService(id: string): Promise<Service | null> {
  return services.find((service) => service.id === id) ?? null;
}

export async function getServicesByCategory(category: ServiceCategory): Promise<Service[]> {
  return services.filter((service) => service.category === category);
}

export async function createBooking(request: BookingRequest): Promise<BookingConfirmation> {
  const service = await getService(request.serviceId);
  return {
    bookingId: `bk-${Date.now()}`,
    serviceId: request.serviceId,
    serviceName: service?.name ?? "Service",
    preferredDate: request.preferredDate,
    status: "pending",
  };
}
