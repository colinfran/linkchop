import { getUserById, setSubscriber } from "@/db/tasks"
import { getSessionUserId, unauthorizedResponse } from "@/lib/utils/session"
import sendEmail from "@/app/api/email/sendEmail"
import { NextResponse } from "next/server"
import stripe from "stripe"

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!)

/**
 * Handles POST requests to process subscription payment confirmations.
 * Retrieves the Stripe checkout session and, if it is complete and belongs to the signed-in
 * user, records the subscription and sends the confirmation email (once per subscription).
 * @param {Request} request - The incoming request object containing the Stripe checkout session id.
 * @returns {Promise<Response>} - Returns { status } with the checkout session status.
 */

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()

  try {
    const { sessionId } = await request.json()
    if (typeof sessionId !== "string" || !sessionId) {
      return NextResponse.json({ error: "Missing session id" }, { status: 400 })
    }

    const session = await stripeInstance.checkout.sessions.retrieve(sessionId)
    const [user] = await getUserById(userId)

    // Sessions created after this check was added carry the user's id. Older ones only
    // have the customer email that was set when the session was created.
    const belongsToUser = session.client_reference_id
      ? session.client_reference_id === userId
      : !!user?.email && session.customer_email?.toLowerCase() === user.email.toLowerCase()
    if (!belongsToUser) {
      return NextResponse.json({ error: "Checkout session not found" }, { status: 403 })
    }

    if (session.status === "complete") {
      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id || null
      const isNewSubscription = await setSubscriber(userId, subscriptionId)
      if (isNewSubscription && user?.email) {
        await sendEmail({
          name: user.name || "",
          email: user.email,
          subject: "Thank you for purchasing the premium subscription!",
          type: "subscribe",
        })
      }
    }

    return NextResponse.json({
      status: session.status,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
