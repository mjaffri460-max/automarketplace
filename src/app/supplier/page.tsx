import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhotoUpload360 } from "@/components/vehicles/PhotoUpload360";
import { applyAsSupplier, submitSupplierListing } from "./actions";

const selectClassName =
  "h-11 rounded-lg border border-input bg-transparent px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface SupplierPageProps {
  searchParams: Promise<{ submitted?: string }>;
}

export default async function SupplierPage({ searchParams }: SupplierPageProps) {
  const { submitted } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }

  const profile = await getCurrentProfile();

  if (!profile || profile.role !== "supplier") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground">Supplier Portal</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Have access to cars, motorcycles, or jet skis you can import or export? Apply as a
          supplier to submit vehicles for AutoMarketplace to list, buy, or help move across
          borders.
        </p>
        <form action={applyAsSupplier} className="mt-8">
          <Button type="submit" size="lg" className="text-base">
            Apply as a Supplier
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">Supplier Portal</h1>
      <p className="mt-2 text-base text-muted-foreground">
        Submit a vehicle you can export to us, or a vehicle you need imported for a buyer.
      </p>

      {profile.supplierStatus === "pending" && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-foreground">
          Your supplier application is under review — you can still submit cars for
          consideration while we finish reviewing your account.
        </div>
      )}

      {profile.supplierStatus === "rejected" && (
        <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-base text-destructive">
          Your supplier application wasn&apos;t approved. You can still submit cars below —
          our team reviews each submission individually.
        </div>
      )}

      {submitted && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-foreground">
          Submission received! Our sourcing team will review it shortly.
        </div>
      )}

      <form action={submitSupplierListing} className="mt-8 flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="make">Make</Label>
            <Input id="make" name="make" required placeholder="e.g. Toyota" className="h-11 text-base" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              name="model"
              required
              placeholder="e.g. Land Cruiser"
              className="h-11 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              required
              placeholder="2020"
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mileage">Mileage (optional)</Label>
            <Input
              id="mileage"
              name="mileage"
              type="number"
              placeholder="42000"
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="condition">Condition (optional)</Label>
            <Input id="condition" name="condition" placeholder="e.g. used" className="h-11 text-base" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="askingPrice">Asking Price (optional)</Label>
            <Input
              id="askingPrice"
              name="askingPrice"
              type="number"
              placeholder="35000"
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currency">Currency</Label>
            <select id="currency" name="currency" defaultValue="USD" className={selectClassName}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AED">AED</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sourceCountry">Source Country</Label>
            <Input
              id="sourceCountry"
              name="sourceCountry"
              required
              placeholder="Where is the vehicle located now?"
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exportOrImport">Submission Type</Label>
            <select
              id="exportOrImport"
              name="exportOrImport"
              defaultValue="export"
              className={selectClassName}
            >
              <option value="export">Export — I have this vehicle, ship it to you</option>
              <option value="import">Import — I need this vehicle brought in for a buyer</option>
            </select>
          </div>
        </div>

        <PhotoUpload360 />

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={5}
            placeholder="Condition details, documentation, timeline, anything else..."
            className="text-base"
          />
        </div>

        <Button type="submit" size="lg" className="mt-2 text-base">
          Submit Vehicle
        </Button>
      </form>
    </div>
  );
}
