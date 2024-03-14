import { headers } from "next/headers"
import { NextResponse } from "next/server"
import stripe from "stripe"

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!)
/**
 * Handles POST requests to process subscription payments.
 * Creates a Stripe checkout session for subscription payment based on user email.
 * Redirects the user to the checkout session URL.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

const env = process.env.NODE_ENV

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  const { email } = res
  const headersList = headers()
  const origin = headersList.get("origin")
  try {
    const session = await stripeInstance.checkout.sessions.create({
      customer_email: email,
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID
          price:
            env === "development"
              ? "price_1OtM6SCtlzQ04XrcVWfevWEH"
              : "price_1OtM37CtlzQ04Xrc2QlJK09d",
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${origin}/subscribe/return?session_id={CHECKOUT_SESSION_ID}`,
    })
    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (err) {
    console.error(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
