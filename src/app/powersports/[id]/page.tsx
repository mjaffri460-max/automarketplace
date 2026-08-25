import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPowersport } from "@/data/powersports";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PriceComparison } from "@/components/marketing/PriceComparison";
import { Reveal } from "@/components/motion/Reveal";
import { Price } from "@/components/currency/Price";
import { FinancingEstimate } from "@/components/vehicles/FinancingEstimate";

interface PowersportDetailPageProps {
  params: Promise<{ id: string }>;
}

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Used",
  "certified-pre-owned": "Certified Pre-Owned",
};

const typeLabel: Record<string, string> = {
  motorcycle: "Motorcycle",
  "dirt-bike": "Dirt Bike",
  "jet-ski": "Jet Ski",
};

export default async function PowersportDetailPage({ params }: PowersportDetailPageProps) {
  const { id } = await params;
  const item = await getPowersport(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/powersports" className="text-base font-medium text-muted-foreground hover:text-foreground">
        &larr; Back to all listings
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Reveal direction="left" className="flex flex-col gap-4">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={item.imageUrl}
              alt={`${item.year} ${item.make} ${item.model}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              priority
            />
          </div>
          {item.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {item.images.map((image) => (
                <div key={image} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={image}
                    alt={`${item.model} additional view`}
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
            <Badge className="w-fit bg-muted text-foreground">{typeLabel[item.type]}</Badge>
            <Badge className="w-fit bg-muted text-foreground">{conditionLabel[item.condition]}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {item.year} {item.make} {item.model}
          </h1>
          <p className="text-4xl font-bold text-foreground">
            <Price usd={item.price} />
          </p>
          <p className="text-base text-muted-foreground">
            Plus estimated shipping: <Price usd={item.shippingCost} /> &middot; Arrives in about{" "}
            {item.estimatedShippingDays} days
          </p>
          <p className="text-base font-semibold text-foreground">
            Total once shipped: <Price usd={item.price + item.shippingCost} />
          </p>

          <Separator />

          <dl className="grid grid-cols-2 gap-4 text-base">
            <div>
              <dt className="text-muted-foreground">Mileage / Hours</dt>
              <dd className="font-semibold text-foreground">{item.mileage.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Engine Size</dt>
              <dd className="font-semibold text-foreground">{item.engineSize}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Color</dt>
              <dd className="font-semibold text-foreground">{item.color}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="font-semibold text-foreground">{item.location}</dd>
            </div>
          </dl>

          <Separator />

          <p className="text-base text-foreground/90">{item.description}</p>

          <div>
            <p className="mb-2 text-base font-semibold text-foreground">Features</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-foreground/90">
              {item.features.map((feature) => (
                <li key={feature} className="rounded-md bg-muted/40 px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href={`/order/${item.id}`} />} size="lg" className="text-base">
              Order &amp; Ship This {typeLabel[item.type]}
            </Button>
            <Button render={<Link href="/services" />} size="lg" variant="outline" className="text-base">
              Add Warranty or Insurance
            </Button>
            <Button
              render={<Link href={`/visit/powersport/${item.id}`} />}
              size="lg"
              variant="outline"
              className="text-base"
            >
              Book a Visit / Test Drive
            </Button>
          </div>

          <PriceComparison ourPrice={item.price} competitorPrices={item.competitorPrices} />
          <FinancingEstimate price={item.price} />
        </Reveal>
      </div>
    </div>
  );
}
