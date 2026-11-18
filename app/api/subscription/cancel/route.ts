import { unsubscribeUser } from "@/db/tasks/unsubscribe-user"
import { getSessionUserId, unauthorizedResponse } from "@/lib/utils/session"

/**
 * Handles POST requests to the '/api/subscription/cancel' endpoint.
 * Cancels the signed-in user's subscription. The remaining days are calculated on the
 * server; any value in the request body is ignored.
 * @returns {Promise<Response>} - Returns a response object indicating whether a subscription was cancelled.
 */

export async function POST(): Promise<Response> {
  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()
  try {
    const success = await unsubscribeUser(userId)
    return Response.json({ success })
  } catch (error) {
    console.error("Error cancelling subscription:", error)
    return Response.json({ error: "Server Error" }, { status: 500 })
  }
}
