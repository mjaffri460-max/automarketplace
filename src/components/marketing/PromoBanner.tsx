"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Deal {
  text: string;
  href: string;
  cta: string;
}

const deals: Deal[] = [
  {
    text: "New customers get FREE scheduled maintenance for your first year",
    href: "/services",
    cta: "Claim offer",
  },
  {
    text: "Save up to $2,000 on Certified Pre-Owned vehicles this month",
    href: "/cars?condition=certified-pre-owned",
    cta: "Shop deals",
  },
  {
    text: "Free extended warranty upgrade on every electric vehicle order",
    href: "/cars?category=electric",
    cta: "Browse EVs",
  },
];

export function PromoBanner() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % deals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dismissed]);

  if (dismissed) return null;

  const deal = deals[index];

  return (
    <div className="relative flex items-center justify-center gap-3 bg-primary px-10 py-2.5 text-center text-sm font-medium text-primary-foreground">
      <p className="truncate">
        <span className="font-semibold">Limited-time deal:</span> {deal.text}
      </p>
      <Link href={deal.href} className="shrink-0 whitespace-nowrap font-semibold underline underline-offset-2 hover:no-underline">
        {deal.cta}
      </Link>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss promo banner"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
