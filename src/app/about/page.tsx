import { Reveal } from "@/components/motion/Reveal";

const stats = [
  { label: "Vehicles available", value: "200+" },
  { label: "Countries served", value: "15" },
  { label: "Certified delivery hubs", value: "18" },
  { label: "Average customer rating", value: "4.8/5" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Our Story</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          Why should your dream car depend on your zip code?
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
          <p>
            AutoMarketplace started with a simple frustration: too many people can see the exact
            car, motorcycle, or watercraft they want — it just happens to be listed a thousand
            miles away, in a country or region they&apos;ll never physically visit. Local
            inventory shouldn&apos;t decide what you get to drive.
          </p>
          <p>
            So we built a marketplace that treats the whole world as your local lot. Every listing
            you see includes an honest price, a real shipping estimate, and a transparent
            comparison against other marketplaces — so you always know you&apos;re getting a fair
            deal, wherever the vehicle is coming from.
          </p>
          <p>
            We also believe buying a car online shouldn&apos;t require being &quot;good with
            computers.&quot; Whether you&apos;re ordering your first car right out of school or
            your tenth car after decades of driving, the process should be the same: clear prices,
            simple steps, and real people ready to help — including our in-site assistant, always
            available in the corner of your screen.
          </p>
          <p>
            Today that means cars, motorcycles, dirt bikes, and jet skis, shipped to your door or
            picked up at one of our certified delivery hubs — plus warranty, maintenance, and
            insurance, so owning the vehicle is as easy as ordering it.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-6 border-t pt-10 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} index={index}>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
