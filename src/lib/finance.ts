export interface FinanceEstimateInput {
  price: number;
  downPaymentPercent: number;
  annualRatePercent: number;
  termMonths: number;
}

export function estimateMonthlyFinancePayment({
  price,
  downPaymentPercent,
  annualRatePercent,
  termMonths,
}: FinanceEstimateInput): number {
  const principal = price * (1 - downPaymentPercent / 100);
  const monthlyRate = annualRatePercent / 100 / 12;

  if (monthlyRate === 0) return principal / termMonths;

  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export interface LeaseEstimateInput {
  price: number;
  residualPercent: number;
  moneyFactor: number;
  termMonths: number;
  downPaymentPercent: number;
}

export function estimateMonthlyLeasePayment({
  price,
  residualPercent,
  moneyFactor,
  termMonths,
  downPaymentPercent,
}: LeaseEstimateInput): number {
  const capCost = price * (1 - downPaymentPercent / 100);
  const residualValue = price * (residualPercent / 100);
  const depreciation = (capCost - residualValue) / termMonths;
  const rentCharge = (capCost + residualValue) * moneyFactor;
  return depreciation + rentCharge;
}

// Standard illustrative assumptions used purely to show a ballpark monthly
// payment — real terms depend on credit approval and are quoted separately.
export const DEFAULT_FINANCE_ASSUMPTIONS = {
  downPaymentPercent: 10,
  annualRatePercent: 7.9,
  termMonths: 60,
};

export const DEFAULT_LEASE_ASSUMPTIONS = {
  downPaymentPercent: 10,
  residualPercent: 55,
  moneyFactor: 0.00175, // roughly equivalent to a ~4.2% APR
  termMonths: 36,
};
