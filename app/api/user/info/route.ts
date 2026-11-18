import { getUserById } from "@/db/tasks"
import { getSessionUserId, unauthorizedResponse } from "@/lib/utils/session"

/**
 * Handles POST requests to the '/api/user/info' endpoint.
 * Returns the signed-in user's data, without the password hash.
 * @returns {Promise<Response>} - Returns a one-element array with the user, or an error.
 */

export async function POST(): Promise<Response> {
  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()
  try {
    const users = await getUserById(userId)
    const safeUsers = users.map((user) => ({ ...user, password: undefined }))
    return Response.json(safeUsers)
  } catch (error) {
    console.error("Error getting user:", error)
    return Response.json({ status: 500, error: "Server Error" })
  }
}
