"use server"
import { setSubscriber } from "@/app/db"
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

export async function GET(request: Request): Promise<Response> {
  // const headersList = headers()
  // const origin = headersList.get("origin")
  try {
    const url = new URL(request.url)
    const sessionId = url.searchParams.get("session_id")
    const email = url.searchParams.get("email") || ""
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId!)
    // update user in database
    await setSubscriber(email)
    // console.log(session.url)
    return NextResponse.json({
      status: session.status,
    })
  } catch (err) {
    // Handle any errors and redirect the user to the 404 page.
    console.error(err)
    // console.log("herereerere")
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
