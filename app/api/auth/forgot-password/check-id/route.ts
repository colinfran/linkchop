import { isIdExpired } from "app/db"

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
  const { id } = res
  try {
    // check if id is expired
    const isExpired = await isIdExpired(id)
    console.log(isExpired)
    if (isExpired) return Response.json({ success: false, message: "expired token" })
    return Response.json({ success: true, message: "Id is valid" })
  } catch (error) {
    // Handle registration errors and return an error response.
    console.error("Registration error:", error)
    return Response.json({ error: "Registration failed" })
  }
}
