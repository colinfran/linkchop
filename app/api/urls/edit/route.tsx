import { editUrl } from "@/db/tasks"
import { isSpamUrl } from "@/lib/utils/isSpamUrl"
import { getSessionUserId, unauthorizedResponse } from "@/lib/utils/session"
import { NextResponse } from "next/server"

/**
 * Handles POST requests to the '/api/urls/edit' endpoint.
 * Changes where a shortened URL points, only if it belongs to the signed-in user.
 * @param {Request} request - The incoming request object containing the URL id and new destination.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the edit.
 */

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()

  const res = await request.json()
  const { id, newUrl } = res
  if (typeof id !== "string" || !id || typeof newUrl !== "string" || !newUrl) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }

  if (await isSpamUrl(newUrl)) {
    return NextResponse.json(
      { success: false, error: "Using this for spam is not allowed. Your IP has been recorded." },
      { status: 500 },
    )
  }

  try {
    const didEdit = await editUrl(id, userId, newUrl)
    if (didEdit) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Server Error" })
    }
  } catch (error) {
    console.error("Error editing URL:", error)
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 })
  }
}
