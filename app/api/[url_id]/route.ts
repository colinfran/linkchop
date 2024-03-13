import { getUrl, addVisit } from "app/db"
import { NextResponse, userAgent } from "next/server"

/**
 * Handles GET requests to the '/[url_id]' and '/api/[url_id]' endpoints.
 * Retrieves URL information based on the provided URL ID and redirects the user to the original URL.
 * Tracks visit data if the URL was created by an authenticated user.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export async function GET(request: Request): Promise<Response> {
  try {
    // Parse the request URL to extract the URL ID.
    const requestUrl = new URL(request.url)
    const id = requestUrl.pathname.slice(1)
    // Retrieve URL information from the database based on the provided ID.
    const data = await getUrl(id)
    // If the URL data is found, redirect the user to the original URL.
    if (data[0]) {
      const { original_url, user_id } = data[0]
      const { device, isBot, browser, engine, os } = userAgent(request)
      // Track visit data if the URL was created by an authenticated user.
      if (user_id !== null && user_id !== "") {
        const visitData = {
          url_id: id,
          device_type: device.type,
          device_model: device.model,
          device_vendor: device.vendor,
          is_a_bot: isBot,
          browser_name: browser.name,
          browser_version: browser.version,
          engine_name: engine.name,
          engine_version: engine.version,
          os_name: os.name,
          os_version: os.version,
        }
        await addVisit(visitData)
      }
      // Redirect the user to the original URL.
      return NextResponse.redirect(original_url as string)
    } else {
      // If the URL data is not found, redirect the user to the 404 page.
      return NextResponse.redirect(new URL("/404", request.url))
    }
  } catch (err) {
    // Handle any errors and redirect the user to the 404 page.
    console.error(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
