import { eq } from "drizzle-orm"
import { db } from "../init"
import { urls } from "../tables"
import { GetUrlType } from "../types"

/**
 * Retrieves a URL from the database by its ID.
 * @param {string} id - The ID of the URL to retrieve.
 * @returns {Promise<GetUrlType[]>} A promise that resolves to an array containing the retrieved URL.
 */

export const getUrl = async (id: string): Promise<GetUrlType[]> => {
  return await db.select().from(urls).where(eq(urls.id, id))
}
