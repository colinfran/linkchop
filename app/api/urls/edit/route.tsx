import { editUrl } from "@/db/tasks"
/**
 * Handles POST requests to the '/api/urls/edit' endpoint.
 * Edits the original URL of a shortened URL in the database based on the provided URL ID.
 * @param {Request} request - The incoming request object containing the URL ID and the new URL.
 * @returns {Promise<Response>} - Returns a response object indicating the success or failure of the URL editing process.
 */

export async function POST(request: Request): Promise<Response> {
  // Extract the URL ID and the new URL from the request body.
  const res = await request.json()
  const { id, newUrl } = res
  try {
    // Edit the original URL of the shortened URL in the database.
    const didEdit = await editUrl(id, newUrl)
    // Return a success response if the URL is edited successfully.
    if (didEdit) {
      return Response.json({ success: true })
    } else {
      return Response.json({ success: false, error: "Server Error" })
    }
  } catch (error) {
    // Handle errors that occur during URL editing and return a server error response.
    console.error("Error editing URL:", error)
    return Response.json({ success: false, error: "Server Error" })
  }
}
