export interface SupportedCurrency {
  code: string;
  label: string;
  country: string;
  symbol: string;
}

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  { code: "USD", label: "US Dollar", country: "United States", symbol: "$" },
  { code: "CAD", label: "Canadian Dollar", country: "Canada", symbol: "$" },
  { code: "GBP", label: "British Pound", country: "United Kingdom", symbol: "£" },
  { code: "EUR", label: "Euro", country: "France", symbol: "€" },
  { code: "INR", label: "Indian Rupee", country: "India", symbol: "₹" },
  { code: "AED", label: "UAE Dirham", country: "United Arab Emirates", symbol: "AED " },
  { code: "CNY", label: "Chinese Yuan", country: "China", symbol: "¥" },
  { code: "KRW", label: "South Korean Won", country: "South Korea", symbol: "₩" },
  { code: "AUD", label: "Australian Dollar", country: "Australia", symbol: "$" },
  { code: "NZD", label: "New Zealand Dollar", country: "New Zealand", symbol: "$" },
];

// The UAE dirham has been pegged to the US dollar at this fixed rate by the
// UAE central bank since 1997 — it is not a floating rate, so there is
// nothing to fetch; this constant is the accurate real-world figure.
export const AED_PEG_RATE = 3.6725;

export function formatConverted(usdAmount: number, code: string, rates: Record<string, number>): string {
  const currency = SUPPORTED_CURRENCIES.find((c) => c.code === code);
  if (!currency) return `$${usdAmount.toLocaleString()}`;

  const rate = code === "USD" ? 1 : rates[code];
  if (!rate) return `$${usdAmount.toLocaleString()}`;

  const converted = usdAmount * rate;
  const decimals = code === "KRW" || code === "CNY" ? 0 : 0;
  return `${currency.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: decimals })}`;
}
