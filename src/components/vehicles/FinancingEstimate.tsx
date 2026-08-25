"use client";

import { Price } from "@/components/currency/Price";
import {
  estimateMonthlyFinancePayment,
  estimateMonthlyLeasePayment,
  DEFAULT_FINANCE_ASSUMPTIONS,
  DEFAULT_LEASE_ASSUMPTIONS,
} from "@/lib/finance";

export function FinancingEstimate({ price }: { price: number }) {
  const financeMonthly = estimateMonthlyFinancePayment({ price, ...DEFAULT_FINANCE_ASSUMPTIONS });
  const leaseMonthly = estimateMonthlyLeasePayment({ price, ...DEFAULT_LEASE_ASSUMPTIONS });

  return (
    <div className="rounded-xl border bg-card p-6">
      <p className="text-lg font-semibold text-foreground">Financing &amp; Leasing Estimates</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-muted/40 p-4">
          <p className="text-sm font-medium text-muted-foreground">Estimated Finance Payment</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            <Price usd={financeMonthly} />
            <span className="text-base font-normal text-muted-foreground">/mo</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {DEFAULT_FINANCE_ASSUMPTIONS.downPaymentPercent}% down &middot;{" "}
            {DEFAULT_FINANCE_ASSUMPTIONS.termMonths}-month term &middot;{" "}
            {DEFAULT_FINANCE_ASSUMPTIONS.annualRatePercent}% APR (illustrative)
          </p>
        </div>
        <div className="rounded-lg bg-muted/40 p-4">
          <p className="text-sm font-medium text-muted-foreground">Estimated Lease Payment</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            <Price usd={leaseMonthly} />
            <span className="text-base font-normal text-muted-foreground">/mo</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {DEFAULT_LEASE_ASSUMPTIONS.downPaymentPercent}% down &middot;{" "}
            {DEFAULT_LEASE_ASSUMPTIONS.termMonths}-month term &middot;{" "}
            {DEFAULT_LEASE_ASSUMPTIONS.residualPercent}% residual (illustrative)
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        These are rough estimates to help you plan, not an offer of credit. Your actual rate,
        payment, and terms depend on credit approval — apply on the order page for a real quote.
      </p>
    </div>
  );
}
