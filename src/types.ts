export type FuelType = "gasoline" | "diesel" | "hybrid" | "electric";

export type Transmission = "automatic" | "manual";

export type CarCondition = "new" | "used" | "certified-pre-owned";

export type CarCategory =
  | "sedan"
  | "suv"
  | "truck"
  | "sports-car"
  | "luxury"
  | "electric"
  | "hatchback";

export interface CompetitorPrice {
  siteName: string;
  price: number;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  trim?: string;
  category: CarCategory;
  price: number;
  currency: string;
  condition: CarCondition;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  color: string;
  location: string;
  country: string;
  imageUrl: string;
  images: string[];
  description: string;
  features: string[];
  estimatedShippingDays: number;
  shippingCost: number;
  competitorPrices: CompetitorPrice[];
}

export interface CarFilters {
  make?: string;
  category?: CarCategory;
  condition?: CarCondition;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export type PowersportType = "motorcycle" | "dirt-bike" | "jet-ski";

export interface Powersport {
  id: string;
  type: PowersportType;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  condition: CarCondition;
  mileage: number;
  engineSize: string;
  color: string;
  location: string;
  country: string;
  imageUrl: string;
  images: string[];
  description: string;
  features: string[];
  estimatedShippingDays: number;
  shippingCost: number;
  competitorPrices: CompetitorPrice[];
}

export interface PowersportFilters {
  type?: PowersportType;
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

export type PaymentMethod = "cash" | "finance" | "lease";
export type PaymentStatus = "unpaid" | "processing" | "paid" | "failed";

export interface OrderRequest {
  vehicleId: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface OrderConfirmation {
  orderId: string;
  vehicleId: string;
  vehicleSummary: string;
  totalPrice: number;
  currency: string;
  estimatedDeliveryDays: number;
  status: "pending" | "confirmed";
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  checkoutUrl?: string;
}

export interface Order extends OrderConfirmation {
  shippingAddress: ShippingAddress;
  notes?: string;
  createdAt: string;
}

export interface Booking extends BookingConfirmation {
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ShippingCountry {
  code: string;
  name: string;
  lat: number;
  lng: number;
}

export interface ShippingCountryAvailability extends ShippingCountry {
  availableVehicles: number;
}

export interface Dealer {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  servicesOffered: string[];
}

export type EmploymentType = "full-time" | "part-time" | "contract";

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  description: string;
  requirements: string[];
}

export interface Review {
  id: string;
  authorName: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  vehiclePurchased?: string;
  date: string;
}

export interface FaqEntry {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
}

export type UserRole = "customer" | "supplier" | "admin";
export type SupplierStatus = "pending" | "approved" | "rejected";

export interface Profile {
  id: string;
  fullName?: string;
  phone?: string;
  role: UserRole;
  supplierStatus?: SupplierStatus;
  createdAt: string;
}

export type VehicleType = "car" | "motorcycle" | "jet-ski";

export interface ShippingRate {
  destinationCountry: string;
  vehicleType: VehicleType;
  baseCost: number;
  currency: string;
  estimatedDays: number;
}

export type ListingStatus = "pending" | "approved" | "rejected" | "sold";

export interface CarListing {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  color?: string;
  description?: string;
  askingPrice: number;
  currency: string;
  country: string;
  location?: string;
  images: string[];
  status: ListingStatus;
  createdAt: string;
}

export interface CarListingRequest {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  color?: string;
  description?: string;
  askingPrice: number;
  currency: string;
  country: string;
  location?: string;
  images: string[];
}

export type TradeInStatus = "submitted" | "under_review" | "offer_made" | "accepted" | "declined";

export interface InspectionAnswers {
  exterior: Record<string, string>;
  interior: Record<string, string>;
  mechanical: Record<string, string>;
  history: Record<string, string>;
}

export interface TradeInRequest {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  vin?: string;
  conditionAnswers: InspectionAnswers;
  photos: Record<string, string>;
  estimatedValue?: number;
  currency: string;
  status: TradeInStatus;
  offerAmount?: number;
  createdAt: string;
}

export interface TradeInRequestInput {
  make: string;
  model: string;
  year: number;
  mileage: number;
  vin?: string;
  conditionAnswers: InspectionAnswers;
  photos: Record<string, string>;
}

export type ConciergeStatus = "open" | "sourcing" | "matched" | "closed";

export interface ConciergeRequest {
  id: string;
  userId: string;
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  budgetMin?: number;
  budgetMax?: number;
  currency: string;
  category?: string;
  destinationCountry: string;
  notes?: string;
  status: ConciergeStatus;
  createdAt: string;
}

export interface ConciergeRequestInput {
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  budgetMin?: number;
  budgetMax?: number;
  currency: string;
  category?: string;
  destinationCountry: string;
  notes?: string;
}

export type SupplierSubmissionStatus = "pending" | "approved" | "rejected" | "listed";

export interface SupplierSubmission {
  id: string;
  supplierId: string;
  make: string;
  model: string;
  year: number;
  mileage?: number;
  condition?: string;
  askingPrice?: number;
  currency: string;
  sourceCountry: string;
  exportOrImport: "export" | "import";
  images: string[];
  notes?: string;
  status: SupplierSubmissionStatus;
  createdAt: string;
}

export interface SupplierSubmissionInput {
  make: string;
  model: string;
  year: number;
  mileage?: number;
  condition?: string;
  askingPrice?: number;
  currency: string;
  sourceCountry: string;
  exportOrImport: "export" | "import";
  images: string[];
  notes?: string;
}
