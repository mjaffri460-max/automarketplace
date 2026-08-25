import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCar } from "@/data/cars";
import { getPowersport } from "@/data/powersports";
import { getOrder } from "@/data/orders";
import { createClient } from "@/lib/supabase/server";
import { OrderSummary } from "@/components/order/OrderSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/motion/Reveal";
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

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    redirect("/login");
  }

  if (orderId) {
    const order = await getOrder(orderId);

    if (!order) {
      notFound();
    }

    const paymentMessage =
      order.paymentMethod === "cash"
        ? order.paymentStatus === "paid"
          ? "Your payment has been received."
          : order.paymentStatus === "failed"
            ? "Your payment didn't go through — you can try again from your account, or contact us for help."
            : "We're waiting for your payment to be confirmed. This can take a moment."
        : `Our financing team will reach out shortly about your ${order.paymentMethod} application.`;

    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Order {order.status === "confirmed" ? "Confirmed" : "Received"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Thank you for your order!</h1>
          <p className="mt-3 text-base text-muted-foreground">
            Order <span className="font-semibold text-foreground">{order.orderId}</span> for your{" "}
            {order.vehicleSummary} has been received — total ${order.totalPrice.toLocaleString()}.
          </p>
          <p className="mt-2 text-base text-muted-foreground">{paymentMessage}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button render={<Link href="/services" />} size="lg" className="text-base">
              Book Warranty, Maintenance, or Insurance
            </Button>
            <Button render={<Link href="/cars" />} size="lg" variant="outline" className="text-base">
              Browse More Vehicles
            </Button>
          </div>
        </Reveal>
      </div>
    );
  }

  const placeOrderForVehicle = placeOrder.bind(null, vehicle.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href={detailHref} className="text-base font-medium text-muted-foreground hover:text-foreground">
        &larr; Back to details
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-foreground">Order &amp; Shipping Details</h1>
      <p className="mt-2 text-base text-muted-foreground">
        Tell us where to ship your order. No payment is required yet — this reserves your order.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <Reveal direction="left" className="lg:col-span-2">
        <form action={placeOrderForVehicle} className="flex flex-col gap-5">
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

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-foreground/90">How would you like to pay?</legend>
            <label className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-base">
              <input type="radio" name="paymentMethod" value="cash" defaultChecked className="h-4 w-4" />
              Pay in full now by card
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-base">
              <input type="radio" name="paymentMethod" value="finance" className="h-4 w-4" />
              Apply for financing
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-base">
              <input type="radio" name="paymentMethod" value="lease" className="h-4 w-4" />
              Apply for a lease
            </label>
            <p className="text-sm text-muted-foreground">
              Financing and lease requests don&apos;t charge you now — our team follows up to
              complete the application.
            </p>
          </fieldset>

          <Button type="submit" size="lg" className="mt-2 text-base">
            Confirm Order
          </Button>
        </form>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <OrderSummary vehicle={vehicle} />
        </Reveal>
      </div>
    </div>
  );
}
