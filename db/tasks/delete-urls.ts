import { eq } from "drizzle-orm"
import { db } from "../init"
import { urls } from "../tables"

/**
 * Deletes a URL from the database.
 * @param {string} id - The ID of the URL to be deleted.
 * @returns {Promise<boolean>} A promise that resolves a boolean if the URL deleted.
 */

export const deleteUrl = async (id: string): Promise<boolean> => {
  try {
    await db.delete(urls).where(eq(urls.id, id))
    return true
  } catch (error) {
    console.error("Error deleting URL:", error)
    return false
  }
}
