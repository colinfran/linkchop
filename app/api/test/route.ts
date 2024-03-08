import { NextResponse } from "next/server"

/**
 * Handles GET requests to the '/api/test' endpoint.
 * Provides a status test endpoint for checking the availability of the API.
 * The API status is tracked with BetterUptime.
 * @returns {Promise<NextResponse>} - Returns a JSON response indicating the success or failure of the status test.
 */

export async function GET(): Promise<NextResponse> {
  try {
    // Return a JSON response indicating that the status test was successful.
    return NextResponse.json({ error: false, success: true })
  } catch (err) {
    // Handle any errors that occur during the status test and return a JSON response indicating failure.
    console.error(err)
    return NextResponse.json({ error: true, success: false })
  }
}
