import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCar } from "@/data/cars";
import { getPowersport } from "@/data/powersports";
import { getCargoTruck } from "@/data/cargoTrucks";
import { getYacht } from "@/data/yachts";
import { Reveal } from "@/components/motion/Reveal";
import { VisitBookingForm } from "@/components/vehicles/VisitBookingForm";
import { submitVisitRequest } from "./actions";

interface VisitPageProps {
  params: Promise<{ vehicleType: string; vehicleId: string }>;
  searchParams: Promise<{ requested?: string; travel?: string }>;
}

export default async function VisitPage({ params, searchParams }: VisitPageProps) {
  const { vehicleType, vehicleId } = await params;
  const { requested, travel } = await searchParams;

  if (
    vehicleType !== "car" &&
    vehicleType !== "powersport" &&
    vehicleType !== "cargo-truck" &&
    vehicleType !== "yacht"
  ) {
    notFound();
  }

  const vehicle =
    vehicleType === "car"
      ? await getCar(vehicleId)
      : vehicleType === "powersport"
        ? await getPowersport(vehicleId)
        : vehicleType === "cargo-truck"
          ? await getCargoTruck(vehicleId)
          : await getYacht(vehicleId);

  if (!vehicle) {
    notFound();
  }

  const vehicleSummary = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const boundAction = submitVisitRequest.bind(null, vehicleId, vehicleType, vehicleSummary);
  const detailHrefMap: Record<string, string> = {
    car: `/cars/${vehicleId}`,
    powersport: `/powersports/${vehicleId}`,
    "cargo-truck": `/cargo-trucks/${vehicleId}`,
    yacht: `/yachts/${vehicleId}`,
  };
  const detailHref = detailHrefMap[vehicleType];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link
        href={detailHref}
        className="text-base font-medium text-muted-foreground hover:text-foreground"
      >
        &larr; Back to details
      </Link>

      <Reveal>
        <div className="mt-6 flex items-center gap-4 rounded-xl border bg-card p-4">
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
            <Image src={vehicle.imageUrl} alt={vehicleSummary} fill className="object-cover" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{vehicleSummary}</p>
            <p className="text-sm text-muted-foreground">{vehicle.location}</p>
          </div>
        </div>

        <h1 className="mt-8 text-3xl font-bold text-foreground">Book a Visit</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Schedule a test drive, and optionally get help planning your trip to come see it in
          person.
        </p>

        {requested && (
          <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-base text-foreground">
            Thanks — we&apos;ve received your visit request.{" "}
            {travel === "1"
              ? "Our concierge team will reach out about flights and hotel options — we coordinate on your behalf rather than booking flights directly."
              : "We'll be in touch to confirm your test-drive time."}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8">
          <VisitBookingForm action={boundAction} />
        </div>
      </Reveal>
    </div>
  );
}
