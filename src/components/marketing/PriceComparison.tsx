import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/currency/Price";
import type { CompetitorPrice } from "@/types";

interface PriceComparisonProps {
  ourPrice: number;
  competitorPrices: CompetitorPrice[];
}

export function PriceComparison({ ourPrice, competitorPrices }: PriceComparisonProps) {
  if (competitorPrices.length === 0) return null;

  const cheapestCompetitor = Math.min(...competitorPrices.map((c) => c.price));
  const savings = cheapestCompetitor - ourPrice;
  const rows = [{ siteName: "AutoMarketplace", price: ourPrice, isUs: true }, ...competitorPrices.map((c) => ({ ...c, isUs: false }))].sort(
    (a, b) => a.price - b.price
  );

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-foreground">Price Comparison</p>
        {savings > 0 && <Badge className="bg-emerald-500/15 text-emerald-400">Best Price</Badge>}
      </div>
      {savings > 0 && (
        <p className="mt-1 text-sm text-emerald-400">
          You save up to <Price usd={savings} /> compared to other marketplaces.
        </p>
      )}

      <ul className="mt-4 space-y-2">
        {rows.map((row) => (
          <li
            key={row.siteName}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
              row.isUs ? "bg-primary text-primary-foreground" : "bg-muted/40 text-foreground/90"
            }`}
          >
            <span className="font-medium">{row.siteName}</span>
            <span className="font-semibold">
              <Price usd={row.price} />
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-muted-foreground">
        Other marketplace prices are estimated averages for comparable listings and may vary.
      </p>
    </div>
  );
}
