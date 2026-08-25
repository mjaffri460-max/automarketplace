import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCargoTruck } from "@/data/cargoTrucks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PriceComparison } from "@/components/marketing/PriceComparison";
import { Reveal } from "@/components/motion/Reveal";
import { Price } from "@/components/currency/Price";
import { FinancingEstimate } from "@/components/vehicles/FinancingEstimate";

interface CargoTruckDetailPageProps {
  params: Promise<{ id: string }>;
}

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Used",
  "certified-pre-owned": "Certified Pre-Owned",
};

const truckTypeLabel: Record<string, string> = {
  "box-truck": "Box Truck",
  flatbed: "Flatbed",
  "semi-tractor": "Semi-Tractor",
  refrigerated: "Refrigerated",
  tanker: "Tanker",
  "dump-truck": "Dump Truck",
};

export default async function CargoTruckDetailPage({ params }: CargoTruckDetailPageProps) {
  const { id } = await params;
  const truck = await getCargoTruck(id);

  if (!truck) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/cargo-trucks" className="text-base font-medium text-muted-foreground hover:text-foreground">
        &larr; Back to all cargo trucks
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Reveal direction="left" className="flex flex-col gap-4">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={truck.imageUrl}
              alt={`${truck.year} ${truck.make} ${truck.model}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              priority
            />
          </div>
          {truck.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {truck.images.map((image) => (
                <div key={image} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={image}
                    alt={`${truck.model} additional view`}
                    fill
                    sizes="200px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal direction="right" delay={0.1} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Badge className="w-fit bg-muted text-foreground">{truckTypeLabel[truck.truckType]}</Badge>
            <Badge className="w-fit bg-muted text-foreground">{conditionLabel[truck.condition]}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {truck.year} {truck.make} {truck.model}
          </h1>
          <p className="text-4xl font-bold text-foreground">
            <Price usd={truck.price} />
          </p>
          <p className="text-base text-muted-foreground">
            Plus estimated shipping: <Price usd={truck.shippingCost} /> &middot; Arrives in about{" "}
            {truck.estimatedShippingDays} days
          </p>
          <p className="text-base font-semibold text-foreground">
            Total once shipped: <Price usd={truck.price + truck.shippingCost} />
          </p>

          <Separator />

          <dl className="grid grid-cols-2 gap-4 text-base">
            <div>
              <dt className="text-muted-foreground">Mileage</dt>
              <dd className="font-semibold text-foreground">{truck.mileage.toLocaleString()} mi</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Cargo Capacity</dt>
              <dd className="font-semibold text-foreground">{truck.cargoCapacityLbs.toLocaleString()} lb</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Axle Configuration</dt>
              <dd className="font-semibold text-foreground">{truck.axleConfig}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fuel Type</dt>
              <dd className="font-semibold capitalize text-foreground">{truck.fuelType}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Transmission</dt>
              <dd className="font-semibold capitalize text-foreground">{truck.transmission}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="font-semibold text-foreground">{truck.location}</dd>
            </div>
          </dl>

          <Separator />

          <p className="text-base text-foreground/90">{truck.description}</p>

          <div>
            <p className="mb-2 text-base font-semibold text-foreground">Features</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-foreground/90">
              {truck.features.map((feature) => (
                <li key={feature} className="rounded-md bg-muted/40 px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href={`/order/${truck.id}`} />} size="lg" className="text-base">
              Order &amp; Ship This Truck
            </Button>
            <Button
              render={<Link href={`/visit/cargo-truck/${truck.id}`} />}
              size="lg"
              variant="outline"
              className="text-base"
            >
              Book an Inspection Visit
            </Button>
          </div>

          <PriceComparison ourPrice={truck.price} competitorPrices={truck.competitorPrices} />
          <FinancingEstimate price={truck.price} />
        </Reveal>
      </div>
    </div>
  );
}
