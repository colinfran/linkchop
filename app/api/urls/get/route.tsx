import { getUrls } from "app/db"

/**
 * Handles POST requests to the '/api/urls/get' endpoint.
 * Retrieves the list of shortened URLs associated with the provided user ID from the database.
 * @param {Request} request - The incoming request object containing the user ID.
 * @returns {Promise<Response>} - Returns a response object containing the list of shortened URLs or an error message.
 */

export async function POST(request: Request): Promise<Response> {
  // Extract the user ID from the request body.
  const res = await request.json()
  const { userId } = res
  try {
    // Retrieve the list of shortened URLs associated with the user ID from the database.
    const urlArray = await getUrls(userId)
    // Return a response object containing the list of shortened URLs.
    return Response.json(urlArray)
  } catch (error) {
    // Handle errors that occur during URL retrieval and return a server error response.
    console.error("Error getting URL:", error)
    return res.status(500).json({ error: "Server Error" })
  }
}
