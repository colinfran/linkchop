import { rejectBots } from "@/lib/utils/rejectBots"
import { isValidPassword } from "@/lib/utils/session"
import { resetPassword } from "@/db/tasks"

/**
 * Handles POST requests to the '/api/auth/password-reset' endpoint.
 * Sets a new password for a signed-out user who followed an emailed reset link.
 * The account is identified only by the reset token, never by an email in the request.
 * @param {Request} request - The incoming request object containing the reset token id and new password.
 * @returns {Promise<Response>} - Returns { success, errorMessage? }.
 */

export async function POST(request: Request): Promise<Response> {
  const botResponse = await rejectBots()
  if (botResponse) return botResponse

  const { id, newPassword } = await request.json()
  if (typeof id !== "string" || !id) {
    return Response.json({
      success: false,
      errorMessage: "This password reset link is invalid or has expired.",
    })
  }
  if (!isValidPassword(newPassword)) {
    return Response.json({
      success: false,
      errorMessage: "The password must be between 8 and 32 characters long.",
    })
  }
  return Response.json(await resetPassword(id, newPassword))
}
