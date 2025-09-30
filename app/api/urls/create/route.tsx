import { createUrl } from "@/db/tasks"
import { isSpamUrl } from "@/lib/utils/isSpamUrl"
import { NextResponse } from "next/server"
import ShortUniqueId from "short-unique-id"
import spam from "./spam.json"
import { parse } from "tldts"

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

  // check if url is google spam spam
  if (await isSpamUrl(originalUrl)) {
    return NextResponse.json(
      { error: "Using this for spam is not allowed. Your IP has been recorded." },
      { status: 500 },
    )
  }

  const url = new URL(originalUrl)
  const { domain } = parse(url.hostname)
  const exists = spam.spam.some((item) => item.includes(domain!))

  if (exists) {
    return NextResponse.json(
      { error: "Using this for spam is not allowed. Your IP has been recorded." },
      { status: 500 },
    )
  }

  // Generate a unique URL ID using ShortUniqueId library.
  const uid = new ShortUniqueId({ length: 6 })
  const id = uid.rnd()

  try {
    // Create a new shortened URL in the database.
    await createUrl(id, originalUrl, userId)
    // Return a response object containing the generated URL ID.
    return NextResponse.json({ urlId: id })
  } catch (error) {
    // Handle errors that occur during URL creation and return a server error response.
    console.error("Error creating URL:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
