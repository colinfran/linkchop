import { NextRequest, NextResponse } from "next/server"

/**
 * Handles GET requests to the '/uptime/[id]' endpoints.
 * Retrieves BetterUptime information based on id.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  // const queryParam = request.nextUrl.searchParams.get("queryParam");
  const searchParams = request.nextUrl.searchParams
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

    // const {
    //   label = "website",
    //   label_color = "#555",
    //   style = "flat",
    //   down_message = "down",
    //   down_color = "#e05d44",
    //   up_message = "up",
    //   up_color = "#4c1",
    //   logo = undefined,
    //   logo_color = undefined,
    // }
    const message = status
      ? searchParams.get("up_message") || "up"
      : searchParams.get("down_message") || "down"
    const color = status
      ? searchParams.get("up_color") || "#4c1"
      : searchParams.get("down_color") || "#e05d44"

    const res = {
      schemaVersion: 1,
      label: searchParams.get("label") || "website",
      labelColor: searchParams.get("label_color") || "#555",
      style: searchParams.get("style") || "flat",
      message,
      color,
      isError: false,
      namedLogo: searchParams.get("logo") || undefined,
      logoColor: searchParams.get("logo_color") || undefined,
      cacheSeconds: 300,
    }
    return NextResponse.json(res)
  } catch (err) {
    // Handle any errors and redirect the user to the 404 page.
    console.error(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
