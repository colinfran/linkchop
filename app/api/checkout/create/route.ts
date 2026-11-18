import { headers } from "next/headers"
import { NextResponse } from "next/server"
import stripe from "stripe"
import { getUserById } from "@/db/tasks"
import { getSessionUserId, unauthorizedResponse } from "@/lib/utils/session"

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!)
/**
 * Handles POST requests to process subscription payments.
 * Creates a Stripe checkout session for the signed-in user. The session is tagged with the
 * user's id (client_reference_id) so '/api/checkout/get' can check who it belongs to.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

const env = process.env.NODE_ENV

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()

  const headersList = headers()
  const origin = headersList.get("origin")

  try {
    const [user] = await getUserById(userId)
    const session = await stripeInstance.checkout.sessions.create({
      customer_email: user?.email || undefined,
      client_reference_id: userId,
      ui_mode: "embedded",
      line_items: [
        {
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
