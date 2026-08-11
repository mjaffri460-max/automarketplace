export type FuelType = "gasoline" | "diesel" | "hybrid" | "electric";

export type Transmission = "automatic" | "manual";

export type CarCondition = "new" | "used" | "certified-pre-owned";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  trim?: string;
  price: number;
  currency: string;
  condition: CarCondition;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  color: string;
  location: string;
  imageUrl: string;
  images: string[];
  description: string;
  features: string[];
  estimatedShippingDays: number;
  shippingCost: number;
}

export interface CarFilters {
  make?: string;
  condition?: CarCondition;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export type ServiceCategory = "warranty" | "maintenance" | "insurance" | "detailing";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  priceFrom: number;
  currency: string;
  durationEstimate: string;
}

export interface BookingRequest {
  serviceId: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  notes?: string;
}

export interface BookingConfirmation {
  bookingId: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  status: "pending" | "confirmed";
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

export interface OrderRequest {
  carId: string;
  shippingAddress: ShippingAddress;
  notes?: string;
}

export interface OrderConfirmation {
  orderId: string;
  carId: string;
  carSummary: string;
  totalPrice: number;
  currency: string;
  estimatedDeliveryDays: number;
  status: "pending" | "confirmed";
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
