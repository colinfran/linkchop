import { deleteUrl } from "app/db"

/**
 * Handles POST requests to the '/api/urls/delete' endpoint.
 * Deletes a shortened URL from the database based on the provided URL ID.
 * @param {Request} request - The incoming request object containing the URL ID to be deleted.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the URL deletion process.
 */
export async function POST(request: Request): Promise<Response> {
  // Extract the URL ID from the request body.
  const res = await request.json()
  const { id } = res
  try {
    // Delete the shortened URL from the database.
    const didDelete = await deleteUrl(id)
    // Return a success response if the URL is deleted successfully.
    if (didDelete) {
      return Response.json({ success: true })
    } else {
      console.error("Error deleting URL")
      return Response.json({ success: false, error: "Server Error" })
    }
  } catch (error) {
    // Handle errors that occur during URL deletion and return a server error response.
    console.error("Error deleting URL:", error)
    return Response.json({ success: false, error: "Server Error" })
  }
}
