import { setSubscriber } from "@/db/tasks"
import { NextResponse } from "next/server"
import stripe from "stripe"

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!)

/**
 * Handles GET requests to process subscription payment confirmations.
 * Retrieves the Stripe checkout session information based on the provided session ID.
 * Updates the user subscription status in the database.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export async function POST(request: Request): Promise<Response> {
  try {
    const res = await request.json()
    const { email, sessionId } = res
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId!)
    await setSubscriber(email)
    return NextResponse.json({
      status: session.status,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
