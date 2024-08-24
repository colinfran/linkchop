import { eq } from "drizzle-orm"
import { db } from "../init"
import { urls, visits } from "../tables"

/**
 * Deletes a URL from the database.
 * It also deletes any click visit data associated with that url
 * @param {string} id - The ID of the URL to be deleted.
 * @returns {Promise<boolean>} A promise that resolves a boolean if the URL deleted.
 */

export const deleteUrl = async (id: string): Promise<boolean> => {
  try {
    await db.delete(visits).where(eq(visits.url_id, id))
    await db.delete(urls).where(eq(urls.id, id))
    return true
  } catch (error) {
    console.error("Error deleting URL:", error)
    return false
  }
}
