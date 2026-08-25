import { getDealers } from "@/data/dealers";
import { DealerCard } from "@/components/dealers/DealerCard";
import { Reveal } from "@/components/motion/Reveal";

export default async function DealersPage() {
  const dealers = await getDealers();
  const byCountry = new Map<string, typeof dealers>();

  for (const dealer of dealers) {
    const existing = byCountry.get(dealer.country) ?? [];
    existing.push(dealer);
    byCountry.set(dealer.country, existing);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-foreground">Find a Certified Dealer Hub</h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Prefer to meet in person? Pick up your vehicle, get it inspected, or drop in for service
          at one of our certified delivery hubs around the world.
        </p>
      </Reveal>

      <div className="mt-10 space-y-10">
        {Array.from(byCountry.entries()).map(([country, countryDealers]) => (
          <div key={country}>
            <h2 className="mb-4 text-xl font-bold text-foreground">{country}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {countryDealers.map((dealer, index) => (
                <Reveal key={dealer.id} index={index}>
                  <DealerCard dealer={dealer} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
