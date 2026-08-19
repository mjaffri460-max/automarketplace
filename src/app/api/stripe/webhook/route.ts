import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getServiceRoleClient } from "@/lib/supabase/serviceRole";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const payload = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = getServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.expired") {
    const session = event.data.object as { id: string; payment_intent: string | null };
    const status = event.type === "checkout.session.completed" ? "succeeded" : "failed";

    const { error } = await supabase.rpc("apply_stripe_payment_result", {
      p_stripe_session_id: session.id,
      p_stripe_payment_intent_id: session.payment_intent,
      p_status: status,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
