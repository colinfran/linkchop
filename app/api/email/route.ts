import sendEmail from "./sendEmail"

/**
 * Handles POST requests to the '/api/email' endpoint.
 * Allows for the automation of sending emails to users.
 * @param {Request} request - The incoming request object containing user registration data.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the registration process.
 */

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  try {
    const success = await sendEmail(res)
    if (!success) {
      return Response.json({ success: false, error: "Failed to send email" })
    }
    return Response.json({ success: true, message: "Email sent" })
  } catch (error) {
    console.error("Failed to send email:", error)
    return Response.json({ success: false, error: "Failed to send email" })
  }
}
