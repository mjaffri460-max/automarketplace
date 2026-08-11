import Link from "next/link";
import { getFeaturedCars } from "@/data/cars";
import { CarGrid } from "@/components/cars/CarGrid";
import { Button } from "@/components/ui/button";

const valueProps = [
  {
    title: "Best Market Prices",
    description: "We compare pricing across regions so you always know you're getting a fair deal.",
  },
  {
    title: "Shipped to Your Door",
    description: "Order online and we handle delivery — no matter how far your dream car is from home.",
  },
  {
    title: "Warranty, Maintenance & Insurance",
    description: "Book warranty coverage, scheduled maintenance, and insurance right from this site.",
  },
  {
    title: "Simple for Everyone",
    description: "Clear pricing, big buttons, and a straightforward process — built for first-time buyers and experienced drivers alike.",
  },
];

export default async function Home() {
  const featuredCars = await getFeaturedCars(4);

  return (
    <div className="flex flex-col">
      <section className="border-b bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find your dream car, wherever it is. We&apos;ll ship it to you.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            Browse cars from every region, order online in a few simple steps, and
            we&apos;ll take care of the rest — including warranty, maintenance,
            insurance, and delivery.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/cars" />} size="lg" className="text-base">
              Browse Cars
            </Button>
            <Button render={<Link href="/services" />} size="lg" variant="outline" className="text-base">
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured Cars</h2>
          <Link href="/cars" className="text-base font-medium text-slate-700 hover:text-slate-900">
            View all &rarr;
          </Link>
        </div>
        <CarGrid cars={featuredCars} />
      </section>

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Why buy with AutoMarketplace?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <div key={prop.title} className="rounded-xl border bg-white p-6">
                <p className="text-lg font-semibold text-slate-900">{prop.title}</p>
                <p className="mt-2 text-sm text-slate-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
