import { createUser, getUser } from "@/db/tasks"
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
  const { email, name, password } = res
  try {
    // Check if the user already exists in the database.
    const userExists = await getUser(email)
    // If the user already exists, return an error response.
    if (userExists.length > 0) {
      return Response.json({ error: "User already exists" })
    }
    // Create a new user in the database.
    await createUser(email, password, name)
    await sendEmail({
      subject: `Welcome to LinkChop, ${name}!`,
      type: "signup",
      email: email,
      name: name,
    })
    // Return a success response if the user is registered successfully.
    return Response.json({ success: true, message: "User registered successfully" })
  } catch (error) {
    // Handle registration errors and return an error response.
    console.error("Registration error:", error)
    return Response.json({ error: "Registration failed" })
  }
}
