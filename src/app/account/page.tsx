import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/data/profile";
import { getMyOrders } from "@/data/orders";
import { getMyBookings } from "@/data/services";
import { getMyCarListings } from "@/data/carListings";
import { getMyTradeInRequests } from "@/data/tradeIns";
import { getMyConciergeRequests } from "@/data/concierge";
import { getMySupplierSubmissions } from "@/data/supplierSubmissions";
import { logout } from "@/app/login/actions";
import { saveProfile, applyAsSupplier } from "./actions";

interface AccountPageProps {
  searchParams: Promise<{ saved?: string; supplierApplied?: string }>;
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { saved, supplierApplied } = await searchParams;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/login");
  }

  const [profile, orders, bookings, listings, tradeIns, concierge, supplierSubmissions] =
    await Promise.all([
      getCurrentProfile(),
      getMyOrders(),
      getMyBookings(),
      getMyCarListings(),
      getMyTradeInRequests(),
      getMyConciergeRequests(),
      getMySupplierSubmissions(),
    ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">My Account</h1>
      <p className="mt-2 text-base text-muted-foreground">{userData.user.email}</p>

      {saved && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-foreground">
          Profile updated.
        </div>
      )}
      {supplierApplied && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-foreground">
          Supplier application submitted — we&apos;ll review it shortly.
        </div>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveProfile} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={profile?.fullName ?? ""}
                className="h-11 text-base"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={profile?.phone ?? ""}
                className="h-11 text-base"
              />
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{profile?.role ?? "customer"}</Badge>
              {profile?.role === "supplier" && profile.supplierStatus && (
                <Badge variant="secondary">supplier: {profile.supplierStatus}</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" className="text-base">
                Save Changes
              </Button>
              {profile?.role !== "supplier" && (
                <form action={applyAsSupplier}>
                  <Button type="submit" variant="secondary" className="text-base">
                    Apply as Supplier
                  </Button>
                </form>
              )}
              <form action={logout}>
                <Button type="submit" variant="outline" className="text-base">
                  Sign Out
                </Button>
              </form>
            </div>
          </form>
        </CardContent>
      </Card>

      <AccountSection title="My Orders" emptyText="No orders yet." count={orders.length}>
        {orders.map((order) => (
          <ListRow
            key={order.orderId}
            title={order.vehicleSummary}
            subtitle={`$${order.totalPrice.toLocaleString()} ${order.currency} · ships in ~${order.estimatedDeliveryDays} days`}
            status={order.status}
          />
        ))}
      </AccountSection>

      <AccountSection title="My Service Bookings" emptyText="No bookings yet." count={bookings.length}>
        {bookings.map((booking) => (
          <ListRow
            key={booking.bookingId}
            title={booking.serviceName}
            subtitle={`Preferred date: ${booking.preferredDate}`}
            status={booking.status}
          />
        ))}
      </AccountSection>

      <AccountSection title="My Car Listings" emptyText="No listings yet." count={listings.length}>
        {listings.map((listing) => (
          <ListRow
            key={listing.id}
            title={`${listing.year} ${listing.make} ${listing.model}`}
            subtitle={`Asking $${listing.askingPrice.toLocaleString()} ${listing.currency} · ${listing.country}`}
            status={listing.status}
          />
        ))}
        <Link href="/sell/car" className="text-sm font-semibold text-primary underline">
          List a car for sale
        </Link>
      </AccountSection>

      <AccountSection title="My Trade-In Requests" emptyText="No trade-in requests yet." count={tradeIns.length}>
        {tradeIns.map((tradeIn) => (
          <ListRow
            key={tradeIn.id}
            title={`${tradeIn.year} ${tradeIn.make} ${tradeIn.model}`}
            subtitle={
              tradeIn.offerAmount
                ? `Offer: $${tradeIn.offerAmount.toLocaleString()} ${tradeIn.currency}`
                : "Awaiting review"
            }
            status={tradeIn.status}
          />
        ))}
        <Link href="/sell/trade-in" className="text-sm font-semibold text-primary underline">
          Request a trade-in inspection
        </Link>
      </AccountSection>

      <AccountSection
        title="My Buy-For-Me Requests"
        emptyText="No sourcing requests yet."
        count={concierge.length}
      >
        {concierge.map((request) => (
          <ListRow
            key={request.id}
            title={`${request.make ?? "Any make"} ${request.model ?? ""}`.trim()}
            subtitle={`Destination: ${request.destinationCountry}`}
            status={request.status}
          />
        ))}
        <Link href="/buy-for-me" className="text-sm font-semibold text-primary underline">
          Submit a sourcing request
        </Link>
      </AccountSection>

      {profile?.role === "supplier" && (
        <AccountSection
          title="My Supplier Submissions"
          emptyText="No submissions yet."
          count={supplierSubmissions.length}
        >
          {supplierSubmissions.map((submission) => (
            <ListRow
              key={submission.id}
              title={`${submission.year} ${submission.make} ${submission.model}`}
              subtitle={`${submission.exportOrImport} · ${submission.sourceCountry}`}
              status={submission.status}
            />
          ))}
          <Link href="/supplier" className="text-sm font-semibold text-primary underline">
            Submit a car
          </Link>
        </AccountSection>
      )}
    </div>
  );
}

function AccountSection({
  title,
  emptyText,
  count,
  children,
}: {
  title: string;
  emptyText: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {count === 0 && <p className="text-base text-muted-foreground">{emptyText}</p>}
        {children}
      </CardContent>
    </Card>
  );
}

function ListRow({
  title,
  subtitle,
  status,
}: {
  title: string;
  subtitle: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
      <div>
        <p className="text-base font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Badge variant="outline" className="capitalize">
        {status.replace(/_/g, " ")}
      </Badge>
    </div>
  );
}
