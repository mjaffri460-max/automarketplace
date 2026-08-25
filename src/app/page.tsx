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
import { Reveal } from "@/components/motion/Reveal";
import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";

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
      <Hero />

      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold text-foreground">Shop by Vehicle Type</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <CategoryGrid />
        </Reveal>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Featured Cars</h2>
              <Link href="/cars" className="text-base font-medium text-foreground/90 hover:text-primary">
                View all &rarr;
              </Link>
            </div>
          </Reveal>
          <CarGrid cars={featuredCars} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Motorcycles, Dirt Bikes &amp; Jet Skis</h2>
              <p className="mt-1 text-base text-muted-foreground">Not just cars — get your next ride shipped too.</p>
            </div>
            <Link href="/powersports" className="text-base font-medium text-foreground/90 hover:text-primary">
              View all &rarr;
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPowersports.map((item, index) => (
            <Reveal key={item.id} index={index}>
              <PowersportCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground">We Ship Worldwide</h2>
            <p className="mt-1 mb-8 max-w-2xl text-base text-muted-foreground">
              Vehicles are available to ship from and to countries across the globe.
            </p>
          </Reveal>
          <Reveal delay={0.1} direction="none">
            <ShippingMap countries={shippingCountries} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Meet a Dealer Near You</h2>
              <p className="mt-1 text-base text-muted-foreground">
                Prefer an in-person handoff? Visit a certified AutoMarketplace hub.
              </p>
            </div>
            <Link href="/dealers" className="text-base font-medium text-foreground/90 hover:text-primary">
              View all &rarr;
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {dealers.slice(0, 3).map((dealer, index) => (
            <Reveal key={dealer.id} index={index}>
              <DealerCard dealer={dealer} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">What Customers Say</h2>
                <p className="mt-1 text-base text-muted-foreground">{averageRating} out of 5 average rating</p>
              </div>
              <Link href="/reviews" className="text-base font-medium text-foreground/90 hover:text-primary">
                View all &rarr;
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredReviews.map((review, index) => (
              <Reveal key={review.id} index={index}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-primary/20 bg-card p-10 sm:flex-row sm:items-center">
            <div className="glow-field" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-foreground">We&apos;re Hiring</h2>
              <p className="mt-1 max-w-xl text-muted-foreground">
                Help build the future of buying cars online. Explore open roles across
                engineering, operations, and customer experience.
              </p>
            </div>
            <Button
              render={<Link href="/careers" />}
              size="lg"
              className="relative z-10 shrink-0 text-base"
            >
              View Open Roles
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground">Why We Built AutoMarketplace</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
              Local inventory shouldn&apos;t decide what you get to drive. Read about how we
              started and how we keep prices fair for everyone.
            </p>
            <Button render={<Link href="/about" />} size="lg" variant="outline" className="mt-6 text-base">
              Our Story
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
