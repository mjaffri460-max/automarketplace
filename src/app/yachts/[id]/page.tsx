import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getYacht } from "@/data/yachts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PriceComparison } from "@/components/marketing/PriceComparison";
import { Reveal } from "@/components/motion/Reveal";
import { Price } from "@/components/currency/Price";
import { FinancingEstimate } from "@/components/vehicles/FinancingEstimate";

interface YachtDetailPageProps {
  params: Promise<{ id: string }>;
}

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Used",
  "certified-pre-owned": "Certified Pre-Owned",
};

const yachtTypeLabel: Record<string, string> = {
  "motor-yacht": "Motor Yacht",
  "sailing-yacht": "Sailing Yacht",
  catamaran: "Catamaran",
  "sport-fisher": "Sport Fisher",
  superyacht: "Superyacht",
};

export default async function YachtDetailPage({ params }: YachtDetailPageProps) {
  const { id } = await params;
  const yacht = await getYacht(id);

  if (!yacht) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/yachts" className="text-base font-medium text-muted-foreground hover:text-foreground">
        &larr; Back to all yachts
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Reveal direction="left" className="flex flex-col gap-4">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={yacht.imageUrl}
              alt={`${yacht.year} ${yacht.make} ${yacht.model}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              priority
            />
          </div>
          {yacht.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {yacht.images.map((image) => (
                <div key={image} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={image}
                    alt={`${yacht.model} additional view`}
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
            <Badge className="w-fit bg-muted text-foreground">{yachtTypeLabel[yacht.yachtType]}</Badge>
            <Badge className="w-fit bg-muted text-foreground">{conditionLabel[yacht.condition]}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {yacht.year} {yacht.make} {yacht.model}
          </h1>
          <p className="text-4xl font-bold text-foreground">
            <Price usd={yacht.price} />
          </p>
          <p className="text-base text-muted-foreground">
            Plus estimated shipping: <Price usd={yacht.shippingCost} /> &middot; Arrives in about{" "}
            {yacht.estimatedShippingDays} days
          </p>
          <p className="text-base font-semibold text-foreground">
            Total once delivered: <Price usd={yacht.price + yacht.shippingCost} />
          </p>

          <Separator />

          <dl className="grid grid-cols-2 gap-4 text-base">
            <div>
              <dt className="text-muted-foreground">Length</dt>
              <dd className="font-semibold text-foreground">{yacht.lengthFt} ft</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Cabins</dt>
              <dd className="font-semibold text-foreground">{yacht.cabins}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Engine Hours</dt>
              <dd className="font-semibold text-foreground">{yacht.engineHours.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Hull Material</dt>
              <dd className="font-semibold capitalize text-foreground">{yacht.hullMaterial}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fuel Type</dt>
              <dd className="font-semibold capitalize text-foreground">{yacht.fuelType}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="font-semibold text-foreground">{yacht.location}</dd>
            </div>
          </dl>

          <Separator />

          <p className="text-base text-foreground/90">{yacht.description}</p>

          <div>
            <p className="mb-2 text-base font-semibold text-foreground">Features</p>
            <ul className="grid grid-cols-2 gap-2 text-sm text-foreground/90">
              {yacht.features.map((feature) => (
                <li key={feature} className="rounded-md bg-muted/40 px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href={`/order/${yacht.id}`} />} size="lg" className="text-base">
              Order This Yacht
            </Button>
            <Button
              render={<Link href={`/visit/yacht/${yacht.id}`} />}
              size="lg"
              variant="outline"
              className="text-base"
            >
              Book a Viewing
            </Button>
          </div>

          <PriceComparison ourPrice={yacht.price} competitorPrices={yacht.competitorPrices} />
          <FinancingEstimate price={yacht.price} />
        </Reveal>
      </div>
    </div>
  );
}
