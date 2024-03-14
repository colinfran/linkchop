import { createPasswordResetToken } from "app/db"
import sendEmail from "../../email/sendEmail"

/**
 * Handles POST requests to the '/api/auth/register' endpoint.
 * Registers a new user with the provided email, name, and password.
 * Checks if the user already exists in the database before registration.
 * @param {Request} request - The incoming request object containing user registration data.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the registration process.
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
