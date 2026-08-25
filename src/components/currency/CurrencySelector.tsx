"use client";

import { useCurrency } from "./CurrencyProvider";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";

export function CurrencySelector({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(event) => setCurrency(event.target.value)}
      aria-label="Display currency"
      className={
        className ??
        "h-9 rounded-md border border-border bg-transparent px-2 text-sm text-foreground"
      }
    >
      {SUPPORTED_CURRENCIES.map((option) => (
        <option key={option.code} value={option.code}>
          {option.code} — {option.country}
        </option>
      ))}
    </select>
  );
}
