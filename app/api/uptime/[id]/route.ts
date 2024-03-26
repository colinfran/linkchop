import { NextResponse } from "next/server"

/**
 * Handles GET requests to the '/uptime/[id]' endpoints.
 * Retrieves BetterUptime information based on id.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
): Promise<Response> {
  const id = params.id
  try {
    const response = await fetch(`https://betteruptime.com/api/v2/monitors/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.BETTERUPTIME_TOKEN}`,
      },
    })
    if (!response.ok) {
      throw Error("Bad response")
    }
    const data = await response.json()
    const status = data?.data?.attributes?.status === "up" ? "up" : "down"
    return NextResponse.json({ status })
  } catch (err) {
    // Handle any errors and redirect the user to the 404 page.
    console.error(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
