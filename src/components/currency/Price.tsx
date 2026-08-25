"use client";

import { useCurrency } from "./CurrencyProvider";
import { formatConverted } from "@/lib/currency";

interface PriceProps {
  usd: number;
  className?: string;
}

export function Price({ usd, className }: PriceProps) {
  const { currency, rates } = useCurrency();

  return <span className={className}>{formatConverted(usd, currency, rates)}</span>;
}
