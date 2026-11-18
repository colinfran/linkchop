import { getSubscriptionInfo } from "@/db/tasks"
import { getSessionUserId, unauthorizedResponse } from "@/lib/utils/session"

/**
 * Handles POST requests to the '/api/subscription/info' endpoint.
 * Retrieves the signed-in user's subscription records.
 * @returns {Promise<Response>} - Returns the subscription records or an error message.
 */

export async function POST(): Promise<Response> {
  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()
  try {
    const arr = await getSubscriptionInfo(userId)
    return Response.json(arr)
  } catch (error) {
    console.error("Error getting subscription info:", error)
    return Response.json({ error: "Server Error" }, { status: 500 })
  }
}
