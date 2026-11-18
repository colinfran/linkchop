import { deleteUrl } from "@/db/tasks"
import { getSessionUserId, unauthorizedResponse } from "@/lib/utils/session"

/**
 * Handles POST requests to the '/api/urls/delete' endpoint.
 * Deletes a shortened URL, only if it belongs to the signed-in user.
 * @param {Request} request - The incoming request object containing the ID of the URL to delete.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the deletion operation.
 */

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()

  const { id } = await request.json()
  if (typeof id !== "string" || !id) {
    return Response.json({ success: false, error: "Invalid URL id" }, { status: 400 })
  }
  try {
    const didDelete = await deleteUrl(id, userId)
    if (didDelete) {
      return Response.json({ success: true })
    } else {
      console.error("Error deleting URL")
      return Response.json({ success: false, error: "Server Error" })
    }
  } catch (error) {
    console.error("Error deleting URL:", error)
    return Response.json({ success: false, error: "Server Error" })
  }
}
