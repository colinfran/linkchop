import { eq } from "drizzle-orm"
import ShortUniqueId from "short-unique-id"
import { db } from "../init"
import { urls } from "../tables"
import { CreateUrlsQueryType } from "../types"
import { sendDiscordNotification } from "@/lib/utils"

/**
 * Creates a shortened URL in the database.
 * @param {string} idVal - The unique identifier for the shortened URL.
 * @param {string} originalUrl - The original URL to be shortened.
 * @param {string | null} userId - The user ID associated with the shortened URL (if any).
 * @returns {Promise<CreateUrlsQueryType[]>} A promise that resolves to an array containing the created shortened URL.
 */

export const createUrl = async (
  idVal: string,
  originalUrl: string,
  userId: string | null,
  userEmail: string | null,
): Promise<CreateUrlsQueryType[]> => {
  let id = idVal
  // Check to see if idVal exists; if it does, generate a new ID until a unique one is found.
  let result = await db.select().from(urls).where(eq(urls.id, id))
  while (result.length !== 0) {
    const uid = new ShortUniqueId({ length: 6 })
    id = uid.rnd()
    result = await db.select().from(urls).where(eq(urls.id, id))
  }
  const values = { id, original_url: originalUrl, user_id: userId }
  await sendDiscordNotification(values.original_url, userEmail || "anonymous")
  return await db.insert(urls).values(values)
}
