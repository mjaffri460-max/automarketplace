import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhotoUpload360 } from "@/components/vehicles/PhotoUpload360";
import { submitCarListing } from "./actions";

interface SellCarPageProps {
  searchParams: Promise<{ submitted?: string }>;
}

const CURRENCIES = ["USD", "CAD", "GBP", "EUR", "AED", "AUD", "NZD", "INR", "CNY", "KRW"];

export default async function SellCarPage({ searchParams }: SellCarPageProps) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }

  const { submitted } = await searchParams;

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Listing Submitted
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">
          Thanks — we&apos;re reviewing your car
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Our team will review your listing and reach out with next steps. You can track its
          status from your account.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/account" />} size="lg" className="text-base">
            Go to My Account
          </Button>
          <Button render={<Link href="/sell" />} size="lg" variant="outline" className="text-base">
            Back to Sell / Trade-In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/sell" className="text-base font-medium text-muted-foreground hover:text-foreground">
        &larr; Back
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-foreground">Sell Your Car</h1>
      <p className="mt-2 text-base text-muted-foreground">
        Tell us about your car and add photos. Our team reviews every listing before it goes
        live to buyers.
      </p>

      <form action={submitCarListing} className="mt-8 flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="make">Make</Label>
            <Input id="make" name="make" required placeholder="Toyota" className="h-11 text-base" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="model">Model</Label>
            <Input id="model" name="model" required placeholder="Camry" className="h-11 text-base" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              required
              min={1980}
              max={2027}
              placeholder="2020"
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mileage">Mileage</Label>
            <Input
              id="mileage"
              name="mileage"
              type="number"
              required
              min={0}
              placeholder="45000"
              className="h-11 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="condition">Condition</Label>
            <select
              id="condition"
              name="condition"
              required
              defaultValue=""
              className="h-11 rounded-md border border-border px-3 text-base"
            >
              <option value="" disabled>
                Choose condition
              </option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="color">Color</Label>
            <Input id="color" name="color" placeholder="Midnight Blue" className="h-11 text-base" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Tell buyers about your car's history, upgrades, or condition."
            className="text-base"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="askingPrice">Asking Price</Label>
            <Input
              id="askingPrice"
              name="askingPrice"
              type="number"
              required
              min={0}
              placeholder="25000"
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              name="currency"
              defaultValue="USD"
              className="h-11 rounded-md border border-border px-3 text-base"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" required placeholder="United States" className="h-11 text-base" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="location">City (optional)</Label>
            <Input id="location" name="location" placeholder="Dallas, TX" className="h-11 text-base" />
          </div>
        </div>

        <div className="mt-2 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold text-foreground">360° Photos</h2>
          <div className="mt-3">
            <PhotoUpload360 />
          </div>
        </div>

        <Button type="submit" size="lg" className="mt-2 text-base">
          Submit Listing
        </Button>
      </form>
    </div>
  );
}
