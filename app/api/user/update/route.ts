import { updateUser } from "app/db"

/**
 * Handles POST requests to the '/api/urls/get' endpoint.
 * Retrieves the list of shortened URLs associated with the provided user ID from the database.
 * @param {Request} request - The incoming request object containing the user ID.
 * @returns {Promise<Response>} - Returns a response object containing the list of shortened URLs or an error message.
 */

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  try {
    const response = await updateUser(res)
    return Response.json(response)
  } catch (error) {
    console.error("Error getting URL:", error)
    return Response.json({ status: 500, error: "Server Error", success: false })
  }
}
