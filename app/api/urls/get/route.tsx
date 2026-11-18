import { getUrls } from "@/db/tasks"
import { getSessionUserId, unauthorizedResponse } from "@/lib/utils/session"

/**
 * Handles POST requests to the '/api/urls/get' endpoint.
 * Retrieves the shortened URLs that belong to the signed-in user.
 * @returns {Promise<Response>} - Returns a response object containing the list of shortened URLs or an error message.
 */

export async function POST(): Promise<Response> {
  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()
  try {
    const urlArray = await getUrls(userId)
    return Response.json(urlArray)
  } catch (error) {
    console.error("Error getting URL:", error)
    return Response.json({ error: "Server Error" }, { status: 500 })
  }
}
