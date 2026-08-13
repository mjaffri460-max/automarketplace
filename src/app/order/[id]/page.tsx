import Link from "next/link";
import { notFound } from "next/navigation";
import { getCar } from "@/data/cars";
import { getPowersport } from "@/data/powersports";
import { OrderSummary } from "@/components/order/OrderSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { placeOrder } from "./actions";

interface OrderPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderPage({ params, searchParams }: OrderPageProps) {
  const { id } = await params;
  const { orderId } = await searchParams;
  const car = await getCar(id);
  const vehicle = car ?? (await getPowersport(id));

  if (!vehicle) {
    notFound();
  }

  const detailHref = car ? `/cars/${vehicle.id}` : `/powersports/${vehicle.id}`;

  if (orderId) {
    const total = vehicle.price + vehicle.shippingCost;
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Order Confirmed
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Thank you for your order!</h1>
        <p className="mt-3 text-base text-slate-600">
          Order <span className="font-semibold text-slate-900">{orderId}</span> for your{" "}
          {vehicle.year} {vehicle.make} {vehicle.model} has been received. We&apos;ll be in touch
          to confirm shipping details for your total of ${total.toLocaleString()}.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/services" />} size="lg" className="text-base">
            Book Warranty, Maintenance, or Insurance
          </Button>
          <Button render={<Link href="/cars" />} size="lg" variant="outline" className="text-base">
            Browse More Vehicles
          </Button>
        </div>
      </div>
    );
  }

  const placeOrderForVehicle = placeOrder.bind(null, vehicle.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href={detailHref} className="text-base font-medium text-slate-600 hover:text-slate-900">
        &larr; Back to details
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Order &amp; Shipping Details</h1>
      <p className="mt-2 text-base text-slate-600">
        Tell us where to ship your order. No payment is required yet — this reserves your order.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <form action={placeOrderForVehicle} className="flex flex-col gap-5 lg:col-span-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" required placeholder="Jordan Smith" className="h-11 text-base" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" className="h-11 text-base" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" className="h-11 text-base" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input id="addressLine1" name="addressLine1" required placeholder="123 Main Street" className="h-11 text-base" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="addressLine2">Address Line 2 (optional)</Label>
            <Input id="addressLine2" name="addressLine2" placeholder="Apt, suite, etc." className="h-11 text-base" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required className="h-11 text-base" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="region">State / Region</Label>
              <Input id="region" name="region" required className="h-11 text-base" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" name="postalCode" required className="h-11 text-base" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" required placeholder="United States" className="h-11 text-base" />
          </div>

          <Button type="submit" size="lg" className="mt-2 text-base">
            Confirm Order
          </Button>
        </form>

        <div>
          <OrderSummary vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}
