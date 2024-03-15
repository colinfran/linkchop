import { isIdExpired } from "app/db"

/**
 * Handles POST requests to the '/api/auth/forgot-password/check-id' endpoint.
 * Checks if the provided ID is expired or not.
 * @param {Request} request - The incoming request object containing the ID to check.
 * @returns {Promise<Response>} - Returns a response object indicating the validity of the provided ID.
 */

export async function POST(request: Request): Promise<Response> {
  // Extract user registration data from the request body.
  const res = await request.json()
  const { id } = res
  try {
    // check if id is expired
    const isExpired = await isIdExpired(id)
    if (isExpired) return Response.json({ success: false, message: "expired token" })
    return Response.json({ success: true, message: "Id is valid" })
  } catch (error) {
    // Handle registration errors and return an error response.
    console.error("Registration error:", error)
    return Response.json({ error: "Registration failed" })
  }
}
