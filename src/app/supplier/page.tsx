import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhotoUpload360 } from "@/components/vehicles/PhotoUpload360";
import { Reveal } from "@/components/motion/Reveal";
import { submitSupplierListing } from "./actions";

const selectClassName =
  "h-11 rounded-lg border border-input bg-transparent px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface SupplierPageProps {
  searchParams: Promise<{ submitted?: string }>;
}

export default async function SupplierPage({ searchParams }: SupplierPageProps) {
  const { submitted } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-foreground">Supplier Portal</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Submit a vehicle you can export to us, or a vehicle you need imported for a buyer. Our
          sourcing team reviews every submission.
        </p>

        {submitted && (
          <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-foreground">
            Submission received! Our sourcing team will review it shortly.
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1}>
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

        <Reveal delay={0.15}>
          <PhotoUpload360 />
        </Reveal>

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
      </Reveal>
    </div>
  );
}
