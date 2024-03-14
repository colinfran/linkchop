import { createPasswordResetToken } from "app/db"
import sendEmail from "../../email/sendEmail"

/**
 * Handles POST requests to the '/api/auth/forgot-password' endpoint.
 * Initiates the process of generating a password reset token and sending it via email.
 * @param {Request} request - The incoming request object containing user email and email details.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the password reset initiation process.
 */

export async function POST(request: Request): Promise<Response> {
  // Extract user registration data from the request body.
  const res = await request.json()
  const { email, subject, type } = res
  try {
    const data = await createPasswordResetToken(email)
    const { id } = data[0]
    await sendEmail({ subject, email, id, type })
    return Response.json({ success: true, message: "Reset token created" })
  } catch (error) {
    // Handle registration errors and return an error response.
    console.error("Registration error:", error)
    return Response.json({ error: "Registration failed" })
  }
}
