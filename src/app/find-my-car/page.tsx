import Link from "next/link";
import { searchCars } from "@/data/cars";
import { searchPowersports } from "@/data/powersports";
import { CarGrid } from "@/components/cars/CarGrid";
import { PowersportGrid } from "@/components/powersports/PowersportGrid";
import { Reveal } from "@/components/motion/Reveal";
import type { Car, CarCategory, Powersport, PowersportType } from "@/types";

const CAR_CATEGORIES: CarCategory[] = [
  "sedan",
  "suv",
  "truck",
  "sports-car",
  "luxury",
  "electric",
  "hatchback",
];
const POWERSPORT_TYPES: PowersportType[] = ["motorcycle", "dirt-bike", "jet-ski"];

const INTEREST_OPTIONS: { value: string; label: string }[] = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "truck", label: "Truck" },
  { value: "sports-car", label: "Sports Car" },
  { value: "luxury", label: "Luxury" },
  { value: "electric", label: "Electric" },
  { value: "hatchback", label: "Hatchback" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "dirt-bike", label: "Dirt Bike" },
  { value: "jet-ski", label: "Jet Ski" },
];

const selectClassName =
  "h-11 rounded-lg border border-input bg-transparent px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface FindMyCarPageProps {
  searchParams: Promise<{
    budgetMin?: string;
    budgetMax?: string;
    interest?: string;
    country?: string;
  }>;
}

export default async function FindMyCarPage({ searchParams }: FindMyCarPageProps) {
  const params = await searchParams;
  const hasSearched = Boolean(
    params.interest || params.budgetMin || params.budgetMax || params.country
  );

  const budgetMin = params.budgetMin ? Number(params.budgetMin) : undefined;
  const budgetMax = params.budgetMax ? Number(params.budgetMax) : undefined;
  const interest = params.interest;

  const isCarCategory = Boolean(interest && CAR_CATEGORIES.includes(interest as CarCategory));
  const isPowersportType = Boolean(
    interest && POWERSPORT_TYPES.includes(interest as PowersportType)
  );

  let cars: Car[] = [];
  let powersports: Powersport[] = [];

  if (hasSearched) {
    if (isPowersportType) {
      powersports = await searchPowersports({ type: interest as PowersportType });
    } else if (isCarCategory) {
      cars = await searchCars({
        category: interest as CarCategory,
        country: params.country || undefined,
        maxPrice: budgetMax,
      });
    } else {
      const [carResults, powersportResults] = await Promise.all([
        searchCars({ country: params.country || undefined, maxPrice: budgetMax }),
        searchPowersports({}),
      ]);
      cars = carResults;
      powersports = powersportResults;
    }

    if (params.country) {
      const country = params.country.toLowerCase();
      powersports = powersports.filter((item) => item.country.toLowerCase() === country);
    }
    if (budgetMin !== undefined) {
      cars = cars.filter((car) => car.price >= budgetMin);
      powersports = powersports.filter((item) => item.price >= budgetMin);
    }
    if (budgetMax !== undefined) {
      powersports = powersports.filter((item) => item.price <= budgetMax);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-foreground">Find My Car</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Tell us your budget and what you&apos;re into — we&apos;ll show you real matches from
          our live inventory.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <form
          method="get"
          className="mt-8 grid grid-cols-1 gap-4 rounded-xl border bg-card p-4 sm:grid-cols-4 sm:items-end"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="budgetMin" className="text-sm font-medium text-foreground/90">
              Budget From
            </label>
            <input
              id="budgetMin"
              name="budgetMin"
              type="number"
              placeholder="20000"
              defaultValue={params.budgetMin}
              className="h-11 rounded-md border border-border bg-transparent px-3 text-base"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="budgetMax" className="text-sm font-medium text-foreground/90">
              Budget To
            </label>
            <input
              id="budgetMax"
              name="budgetMax"
              type="number"
              placeholder="60000"
              defaultValue={params.budgetMax}
              className="h-11 rounded-md border border-border bg-transparent px-3 text-base"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="interest" className="text-sm font-medium text-foreground/90">
              I&apos;m interested in
            </label>
            <select
              id="interest"
              name="interest"
              defaultValue={params.interest ?? ""}
              className={selectClassName}
            >
              <option value="">Anything</option>
              {INTEREST_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="country" className="text-sm font-medium text-foreground/90">
              Country (optional)
            </label>
            <input
              id="country"
              name="country"
              placeholder="e.g. Canada"
              defaultValue={params.country}
              className="h-11 rounded-md border border-border bg-transparent px-3 text-base"
            />
          </div>
          <div className="sm:col-span-4">
            <button
              type="submit"
              className="h-11 w-full rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              Find Matches
            </button>
          </div>
        </form>
      </Reveal>

      {hasSearched && (
        <div className="mt-10 flex flex-col gap-10">
          {cars.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Matching Cars</h2>
              <CarGrid cars={cars} />
            </div>
          )}
          {powersports.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground">Matching Powersports</h2>
              <PowersportGrid items={powersports} />
            </div>
          )}
          {cars.length === 0 && powersports.length === 0 && (
            <p className="text-base text-muted-foreground">
              No matches yet — try widening your budget, or{" "}
              <Link href="/buy-for-me" className="font-semibold text-primary underline">
                let us source one for you
              </Link>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}
