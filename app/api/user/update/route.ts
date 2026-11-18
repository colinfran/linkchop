import { rejectBots } from "@/lib/utils/rejectBots"
import { getSessionUserId, isValidPassword, unauthorizedResponse } from "@/lib/utils/session"
import { updateUser } from "@/db/tasks"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Handles POST requests to the '/api/user/update' endpoint.
 * Updates the signed-in user's name, email or password. Only those fields are read from the
 * request; the user is always the one in the session. Signed-out password resets use
 * '/api/auth/password-reset'.
 * @param {Request} request - The incoming request object containing name, newEmail, or newPassword + oldPassword.
 * @returns {Promise<Response>} - Returns { success, errorMessage? }.
 */

export async function POST(request: Request): Promise<Response> {
  const botResponse = await rejectBots()
  if (botResponse) return botResponse

  const userId = await getSessionUserId()
  if (!userId) return unauthorizedResponse()

  const { name, newEmail, newPassword, oldPassword } = await request.json()

  if (newEmail !== undefined && (typeof newEmail !== "string" || !EMAIL_PATTERN.test(newEmail))) {
    return Response.json({ success: false, errorMessage: "Please enter a valid email address." })
  }
  if (newPassword !== undefined && !isValidPassword(newPassword)) {
    return Response.json({
      success: false,
      errorMessage: "The password must be between 8 and 32 characters long.",
    })
  }

  try {
    const response = await updateUser(userId, {
      name: typeof name === "string" && name.trim() ? name.trim() : undefined,
      newEmail: typeof newEmail === "string" ? newEmail.trim() : undefined,
      newPassword,
      oldPassword: typeof oldPassword === "string" ? oldPassword : undefined,
    })
    return Response.json(response)
  } catch (error) {
    console.error("Error updating user:", error)
    return Response.json({ status: 500, error: "Server Error", success: false })
  }
}
