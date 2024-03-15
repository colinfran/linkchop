import { createUrl } from "@/db/tasks"
import ShortUniqueId from "short-unique-id"

/**
 * Handles POST requests to the '/api/urls/create' endpoint.
 * Creates a new shortened URL with the provided original URL and optional user ID.
 * Generates a unique URL ID using ShortUniqueId library.
 * @param {Request} request - The incoming request object containing the original URL and user ID (if provided).
 * @returns {Promise<Response>} - Returns a response object containing the generated URL ID or an error message.
 */

export async function POST(request: Request): Promise<Response> {
  // Extract original URL and optional user ID from the request body.
  const res = await request.json()
  const { originalUrl, userId = null } = res
  // Generate a unique URL ID using ShortUniqueId library.
  const uid = new ShortUniqueId({ length: 6 })
  const id = uid.rnd()
  try {
    // Create a new shortened URL in the database.
    await createUrl(id, originalUrl, userId)
    // Return a response object containing the generated URL ID.
    return Response.json({ urlId: id })
  } catch (error) {
    // Handle errors that occur during URL creation and return a server error response.
    console.error("Error creating URL:", error)
    return res.status(500).json({ error: "Server Error" })
  }
}
