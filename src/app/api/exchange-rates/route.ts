import { NextResponse } from "next/server";
import { AED_PEG_RATE } from "@/lib/currency";

export const runtime = "nodejs";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=USD&symbols=CAD,GBP,EUR,INR,CNY,KRW,AUD,NZD",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Frankfurter API returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      base: "USD",
      rates: { ...data.rates, AED: AED_PEG_RATE },
      asOf: data.date,
    });
  } catch {
    // Fall back to just the fixed AED peg if the live rate feed is unreachable —
    // floating rates are simply unavailable rather than guessed.
    return NextResponse.json({ base: "USD", rates: { AED: AED_PEG_RATE }, asOf: null });
  }
}
