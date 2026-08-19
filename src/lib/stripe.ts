import Stripe from "stripe";

let cachedClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  return cachedClient;
}
