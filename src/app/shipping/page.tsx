import { getShippingRates } from "@/data/shipping";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VehicleType } from "@/types";

const vehicleLabel: Record<VehicleType, string> = {
  car: "Car",
  motorcycle: "Motorcycle",
  "jet-ski": "Jet Ski",
};

export default async function ShippingPage() {
  const rates = await getShippingRates();
  const countries = Array.from(new Set(rates.map((rate) => rate.destinationCountry)));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">Shipping & Delivery</h1>
      <p className="mt-2 text-base text-muted-foreground">
        We currently ship to 10 countries. Costs below are estimates — your exact shipping
        cost and delivery window for a specific vehicle is shown on its listing page.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {countries.map((country) => {
          const countryRates = rates.filter((rate) => rate.destinationCountry === country);
          return (
            <Card key={country}>
              <CardHeader>
                <CardTitle>{country}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {countryRates.map((rate) => (
                  <div
                    key={rate.vehicleType}
                    className="flex items-center justify-between text-base"
                  >
                    <span className="text-foreground">{vehicleLabel[rate.vehicleType]}</span>
                    <span className="text-muted-foreground">
                      ${rate.baseCost.toLocaleString()} {rate.currency} · ~{rate.estimatedDays}{" "}
                      days
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
