import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/libs/stripe";
import {
    upsertProductRecord,
    upsertPriceRecord,
    manageSubscriptionStatusChange,
} from "@/libs/supabaseadmin";

const relevantEvents = new Set([
    "product.created",
    "product.updated",
    "price.created",
    "price.updated",
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
])

/**
 * Handles incoming Stripe webhook events.
 *
 * This function verifies the webhook signature, processes relevant events, and updates the
 * corresponding records in the Supabase database based on the event type.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} - A promise that resolves with a JSON response indicating
 * the success of processing the webhook event.
 * @throws {Error} - Throws an error if there are issues with webhook signature verification
 * or if an unhandled relevant event type is encountered.
 */
export async function POST(
    request: Request
) {
    const body = await request.text();
    const sig = headers().get("Stripe-Signature");

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
        if(!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error: any) {
        console.log("Error message: " + error.message);
        // INFO: Status codes are important here to help explain what's happening with web hooks
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    };

    if (relevantEvents.has(event.type)) {
        try {
            switch(event.type) {
                // METAINFO: If you're new in Typescript, the bottom duplicated cases, would look like a typo due to duplication/missing algorithm.
                //           In reality, however, this just means that both cases would result in the same algorithm
                case "product.created":
                case "product.updated":
                    await upsertProductRecord(event.data.object as Stripe.Product);
                    break;
                case "price.created":
                case "price.updated":
                    await upsertPriceRecord(event.data.object as Stripe.Price);
                    break;
                case "customer.subscription.created":
                case "customer.subscription.updated":
                case "customer.subscription.deleted":
                    const subscription = event.data.object as Stripe.Subscription;
                    await manageSubscriptionStatusChange(
                        subscription.id,
                        subscription.customer as string,
                        event.type === "customer.subscription.created"
                    );
                    break;
                case "checkout.session.completed":
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;
                    if (checkoutSession.mode === "subscription") {
                        const subscriptionId = checkoutSession.subscription;
                        await manageSubscriptionStatusChange(
                            subscriptionId as string,
                            checkoutSession.customer as string,
                            true
                        );
                    };
                    break;
                default:
                    throw new Error("Unhandled relevant event!");
            };
        } catch (error) {
            console.log(error);
            return new NextResponse("Webhook error", { status: 400 });
        };
    };
    return NextResponse.json({ received: true }, { status: 200 });
};
