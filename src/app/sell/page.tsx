import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export default function SellHubPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-foreground">Sell or Trade In Your Vehicle</h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Two ways to let go of your current car, motorcycle, or jet ski — pick whichever fits
          what you need.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Reveal direction="left">
          <Link
            href="/sell/car"
            className="group flex flex-col gap-3 rounded-xl border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Sell Outright
            </p>
            <h2 className="text-2xl font-bold text-foreground">Sell Your Car</h2>
            <p className="text-base text-muted-foreground">
              List your vehicle for sale. Add details and 360° photos, set your asking price,
              and our team reviews it before it goes live to buyers.
            </p>
            <span className="mt-2 text-base font-semibold text-primary group-hover:underline">
              Start a listing &rarr;
            </span>
          </Link>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <Link
            href="/sell/trade-in"
            className="group flex flex-col gap-3 rounded-xl border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Trade It In
            </p>
            <h2 className="text-2xl font-bold text-foreground">360° Inspection</h2>
            <p className="text-base text-muted-foreground">
              Answer a short condition checklist and add 360° photos. Our team reviews your
              submission and follows up with a real offer — no guesswork, no fake numbers.
            </p>
            <span className="mt-2 text-base font-semibold text-primary group-hover:underline">
              Start an inspection &rarr;
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
