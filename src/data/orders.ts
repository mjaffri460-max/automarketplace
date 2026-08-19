import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { getCar } from "./cars";
import { getPowersport } from "./powersports";
import type { Order, OrderRequest, OrderConfirmation, PaymentStatus, ShippingAddress } from "@/types";

type OrderRow = {
  id: string;
  vehicle_id: string;
  vehicle_summary: string;
  total_price: number;
  currency: string;
  estimated_delivery_days: number;
  status: string;
  shipping_address: ShippingAddress;
  notes: string | null;
  payment_method: string;
  payment_status: string;
  created_at: string;
};

function mapOrder(row: OrderRow): Order {
  return {
    orderId: row.id,
    vehicleId: row.vehicle_id,
    vehicleSummary: row.vehicle_summary,
    totalPrice: row.total_price,
    currency: row.currency,
    estimatedDeliveryDays: row.estimated_delivery_days,
    status: row.status as Order["status"],
    paymentMethod: row.payment_method as Order["paymentMethod"],
    paymentStatus: row.payment_status as PaymentStatus,
    shippingAddress: row.shipping_address,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
  };
}

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function createOrder(request: OrderRequest): Promise<OrderConfirmation> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("You must be signed in to place an order.");

  const car = await getCar(request.vehicleId);
  const vehicle = car ?? (await getPowersport(request.vehicleId));

  if (!vehicle) {
    throw new Error(`Vehicle not found: ${request.vehicleId}`);
  }

  const totalPrice = vehicle.price + vehicle.shippingCost;
  const vehicleSummary = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: userData.user.id,
      vehicle_id: vehicle.id,
      vehicle_summary: vehicleSummary,
      total_price: totalPrice,
      currency: vehicle.currency,
      estimated_delivery_days: vehicle.estimatedShippingDays,
      shipping_address: request.shippingAddress,
      notes: request.notes,
      payment_method: request.paymentMethod,
    })
    .select("id")
    .single();

  if (error) throw error;

  const orderId: string = data.id;
  let checkoutUrl: string | undefined;
  let paymentStatus: PaymentStatus = "unpaid";

  // Finance/lease purchases aren't charged through us — they're a lead our
  // team follows up on with financing partners. Only cash purchases collect
  // payment directly, and only when Stripe is actually configured.
  const stripe = getStripe();
  if (request.paymentMethod === "cash" && stripe) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: vehicle.currency.toLowerCase(),
            unit_amount: Math.round(totalPrice * 100),
            product_data: { name: vehicleSummary },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl()}/order/${vehicle.id}?orderId=${orderId}&paid=1`,
      cancel_url: `${siteUrl()}/order/${vehicle.id}?orderId=${orderId}&paid=0`,
      metadata: { orderId },
    });

    const { error: paymentError } = await supabase.from("payments").insert({
      order_id: orderId,
      user_id: userData.user.id,
      amount: totalPrice,
      currency: vehicle.currency,
      stripe_session_id: session.id,
      status: "pending",
    });
    if (paymentError) throw paymentError;

    checkoutUrl = session.url ?? undefined;
    paymentStatus = "processing";

    await supabase.from("orders").update({ payment_status: paymentStatus }).eq("id", orderId);
  }

  return {
    orderId,
    vehicleId: vehicle.id,
    vehicleSummary,
    totalPrice,
    currency: vehicle.currency,
    estimatedDeliveryDays: vehicle.estimatedShippingDays,
    status: "pending",
    paymentMethod: request.paymentMethod,
    paymentStatus,
    checkoutUrl,
  };
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapOrder(data as OrderRow) : null;
}

export async function getMyOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as OrderRow[]).map(mapOrder);
}
