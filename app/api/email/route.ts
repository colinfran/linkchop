import sendEmail from "./sendEmail"

/**
 * Handles POST requests to the '/api/email' endpoint.
 * Initiates the process of sending an email to the specified recipient.
 * @param {Request} request - The incoming request object containing email details.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the email sending process.
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
