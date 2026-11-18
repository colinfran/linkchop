import { rejectBots } from "@/lib/utils/rejectBots"
import { createPasswordResetToken } from "@/db/tasks"
import sendEmail from "../../email/sendEmail"

/**
 * Handles POST requests to the '/api/auth/forgot-password' endpoint.
 * Initiates the process of generating a password reset token and sending it via email.
 * Only the email is read from the request; the subject and template are fixed here.
 * @param {Request} request - The incoming request object containing the user's email.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the password reset initiation process.
 */

export async function POST(request: Request): Promise<Response> {
  const botResponse = await rejectBots()
  if (botResponse) return botResponse

  const { email } = await request.json()
  if (typeof email !== "string" || !email) {
    return Response.json({ success: false, error: "Email is required" }, { status: 400 })
  }
  try {
    const data = await createPasswordResetToken(email)
    const { id } = data ? data[0] : { id: "" }
    await sendEmail({ subject: "Forgot Password.", email, id, type: "forgot-password" })
    return Response.json({ success: true, message: "Reset token created" })
  } catch (error) {
    console.error("Forgot password error:", error)
    return Response.json({ error: "Registration failed" })
  }
}
