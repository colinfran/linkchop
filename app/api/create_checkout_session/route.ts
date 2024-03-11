"use server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import stripe from "stripe"

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!)
/**
 * Handles GET requests to the '/[url_id]' and '/api/[url_id]' endpoints.
 * Retrieves URL information based on the provided URL ID and redirects the user to the original URL.
 * Tracks click data if the URL was created by an authenticated user.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

const env = process.env.NODE_ENV
// console.log(env)

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  const { email } = res
  console.log(email)

  const headersList = headers()
  const origin = headersList.get("origin")
  try {
    const session = await stripeInstance.checkout.sessions.create({
      customer_email: email,
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of
          // the product you want to sell
          price:
            env === "development"
              ? "price_1OsxH5CBKLwk8JAFwFqJoStE"
              : "price_1Osx8WCBKLwk8JAFWdCgyOc9",
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${origin}/subscribe/return?session_id={CHECKOUT_SESSION_ID}`,
    })
    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (err) {
    // Handle any errors and redirect the user to the 404 page.
    console.error(err)
    console.log("HERERERE")
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
