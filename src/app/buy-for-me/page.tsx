import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion/Reveal";
import { submitConciergeRequest } from "./actions";

const DESTINATION_COUNTRIES = [
  "Canada",
  "United States",
  "United Kingdom",
  "France",
  "India",
  "United Arab Emirates",
  "China",
  "South Korea",
  "Australia",
  "New Zealand",
];

const CATEGORY_OPTIONS = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "truck", label: "Truck" },
  { value: "sports-car", label: "Sports Car" },
  { value: "luxury", label: "Luxury" },
  { value: "electric", label: "Electric" },
  { value: "hatchback", label: "Hatchback" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "jet-ski", label: "Jet Ski" },
];

const selectClassName =
  "h-11 rounded-lg border border-input bg-transparent px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface BuyForMePageProps {
  searchParams: Promise<{ submitted?: string }>;
}

export default async function BuyForMePage({ searchParams }: BuyForMePageProps) {
  const { submitted } = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-foreground">Buy For Me</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Can&apos;t find your dream car in our current inventory? Tell us what you&apos;re
          looking for and our sourcing team will find it, wherever it is, and get it shipped
          to you.
        </p>

        {submitted && (
          <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-foreground">
            Thanks! Your request is in. Our sourcing team will review it and reach out soon.
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1}>
      <form action={submitConciergeRequest} className="mt-8 flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="make">Make (optional)</Label>
            <Input id="make" name="make" placeholder="e.g. Toyota" className="h-11 text-base" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="model">Model (optional)</Label>
            <Input
              id="model"
              name="model"
              placeholder="e.g. Land Cruiser"
              className="h-11 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="yearMin">Year From (optional)</Label>
            <Input
              id="yearMin"
              name="yearMin"
              type="number"
              placeholder="2018"
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="yearMax">Year To (optional)</Label>
            <Input
              id="yearMax"
              name="yearMax"
              type="number"
              placeholder="2025"
              className="h-11 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="budgetMin">Budget From (optional)</Label>
            <Input
              id="budgetMin"
              name="budgetMin"
              type="number"
              placeholder="30000"
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="budgetMax">Budget To (optional)</Label>
            <Input
              id="budgetMax"
              name="budgetMax"
              type="number"
              placeholder="60000"
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

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="category">Vehicle Type (optional)</Label>
          <select id="category" name="category" defaultValue="" className={selectClassName}>
            <option value="">Any type</option>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="destinationCountry">Ship To</Label>
          <select
            id="destinationCountry"
            name="destinationCountry"
            required
            defaultValue=""
            className={selectClassName}
          >
            <option value="" disabled>
              Select a country
            </option>
            {DESTINATION_COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="notes">Tell us more (optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={5}
            placeholder="Trim, color, must-have features, timeline, anything else..."
            className="text-base"
          />
        </div>

        <Button type="submit" size="lg" className="mt-2 text-base">
          Submit Request
        </Button>
      </form>
      </Reveal>
    </div>
  );
}
