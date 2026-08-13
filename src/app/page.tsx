import Link from "next/link";
import { getFeaturedCars } from "@/data/cars";
import { getFeaturedPowersports } from "@/data/powersports";
import { getShippingCountries } from "@/data/countries";
import { getDealers } from "@/data/dealers";
import { getFeaturedReviews, getAverageRating } from "@/data/reviews";
import { CarGrid } from "@/components/cars/CarGrid";
import { PowersportCard } from "@/components/powersports/PowersportCard";
import { CategoryGrid } from "@/components/marketing/CategoryGrid";
import { ShippingMap } from "@/components/map/ShippingMap";
import { DealerCard } from "@/components/dealers/DealerCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/button";

const trustBar = [
  { label: "Best Market Prices", detail: "Verified against other marketplaces" },
  { label: "Ships to 15 Countries", detail: "Worldwide delivery network" },
  { label: "Warranty Included", detail: "Optional coverage on every order" },
  { label: "4.8/5 Customer Rating", detail: "From verified buyers" },
];

export default async function Home() {
  const [featuredCars, featuredPowersports, shippingCountries, dealers, featuredReviews, averageRating] =
    await Promise.all([
      getFeaturedCars(8),
      getFeaturedPowersports(4),
      getShippingCountries(),
      getDealers(),
      getFeaturedReviews(3),
      getAverageRating(),
    ]);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 sm:px-6 sm:py-28">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Find your dream car, wherever it is. We&apos;ll ship it to you.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            Browse cars, motorcycles, and more from every region, order online in a few simple
            steps, and we&apos;ll take care of the rest — including warranty, maintenance,
            insurance, and delivery.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/cars" />} size="lg" className="bg-white text-base text-slate-900 hover:bg-slate-200">
              Browse Cars
            </Button>
            <Button
              render={<Link href="/powersports" />}
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-base text-white hover:bg-white/10"
            >
              Explore Powersports
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
          {trustBar.map((item) => (
            <div key={item.label}>
              <p className="text-lg font-bold text-slate-900">{item.label}</p>
              <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">Shop by Vehicle Type</h2>
        <CategoryGrid />
      </section>

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Featured Cars</h2>
            <Link href="/cars" className="text-base font-medium text-slate-700 hover:text-slate-900">
              View all &rarr;
            </Link>
          </div>
          <CarGrid cars={featuredCars} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Motorcycles, Dirt Bikes &amp; Jet Skis</h2>
            <p className="mt-1 text-base text-slate-600">Not just cars — get your next ride shipped too.</p>
          </div>
          <Link href="/powersports" className="text-base font-medium text-slate-700 hover:text-slate-900">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPowersports.map((item) => (
            <PowersportCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">We Ship Worldwide</h2>
          <p className="mt-1 mb-8 max-w-2xl text-base text-slate-600">
            Vehicles are available to ship from 15 countries and counting.
          </p>
          <ShippingMap countries={shippingCountries} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Meet a Dealer Near You</h2>
            <p className="mt-1 text-base text-slate-600">
              Prefer an in-person handoff? Visit a certified AutoMarketplace hub.
            </p>
          </div>
          <Link href="/dealers" className="text-base font-medium text-slate-700 hover:text-slate-900">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {dealers.slice(0, 3).map((dealer) => (
            <DealerCard key={dealer.id} dealer={dealer} />
          ))}
        </div>
      </section>

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">What Customers Say</h2>
              <p className="mt-1 text-base text-slate-600">{averageRating} out of 5 average rating</p>
            </div>
            <Link href="/reviews" className="text-base font-medium text-slate-700 hover:text-slate-900">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border bg-slate-900 p-10 text-white sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">We&apos;re Hiring</h2>
            <p className="mt-1 max-w-xl text-slate-300">
              Help build the future of buying cars online. Explore open roles across
              engineering, operations, and customer experience.
            </p>
          </div>
          <Button render={<Link href="/careers" />} size="lg" className="shrink-0 bg-white text-base text-slate-900 hover:bg-slate-200">
            View Open Roles
          </Button>
        </div>
      </section>

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">Why We Built AutoMarketplace</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
            Local inventory shouldn&apos;t decide what you get to drive. Read about how we
            started and how we keep prices fair for everyone.
          </p>
          <Button render={<Link href="/about" />} size="lg" variant="outline" className="mt-6 text-base">
            Our Story
          </Button>
        </div>
      </section>
    </div>
  );
}
