import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCar } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PriceComparison } from "@/components/marketing/PriceComparison";

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Used",
  "certified-pre-owned": "Certified Pre-Owned",
};

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/cars" className="text-base font-medium text-muted-foreground hover:text-foreground">
        &larr; Back to all cars
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={car.imageUrl}
              alt={`${car.year} ${car.make} ${car.model}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {car.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {car.images.map((image) => (
                <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <Image src={image} alt={`${car.model} additional view`} fill sizes="200px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-muted text-foreground">{conditionLabel[car.condition]}</Badge>
          <h1 className="text-3xl font-bold text-foreground">
            {car.year} {car.make} {car.model}
          </h1>
          {car.trim && <p className="text-lg text-muted-foreground">{car.trim}</p>}
          <p className="text-4xl font-bold text-foreground">${car.price.toLocaleString()}</p>
          <p className="text-base text-muted-foreground">
            Plus estimated shipping: ${car.shippingCost.toLocaleString()} &middot; Arrives in
            about {car.estimatedShippingDays} days
          </p>

          <Separator />

          <dl className="grid grid-cols-2 gap-4 text-base">
            <div>
              <dt className="text-muted-foreground">Mileage</dt>
              <dd className="font-semibold text-foreground">{car.mileage.toLocaleString()} mi</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fuel Type</dt>
              <dd className="font-semibold capitalize text-foreground">{car.fuelType}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Transmission</dt>
              <dd className="font-semibold capitalize text-foreground">{car.transmission}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Color</dt>
              <dd className="font-semibold text-foreground">{car.color}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="font-semibold text-foreground">{car.location}</dd>
            </div>
          </dl>

          <Separator />

          <p className="text-base text-foreground/90">{car.description}</p>

          <div>
            <p className="mb-2 text-base font-semibold text-foreground">Features</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-foreground/90">
              {car.features.map((feature) => (
                <li key={feature} className="rounded-md bg-muted/40 px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href={`/order/${car.id}`} />} size="lg" className="text-base">
              Order &amp; Ship This Car
            </Button>
            <Button render={<Link href="/services" />} size="lg" variant="outline" className="text-base">
              Add Warranty or Insurance
            </Button>
          </div>

          <PriceComparison ourPrice={car.price} competitorPrices={car.competitorPrices} />
        </div>
      </div>
    </div>
  );
}
