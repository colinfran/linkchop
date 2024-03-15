import { eq } from "drizzle-orm"
import { db } from "../init"
import { urls } from "../tables"

/**
 * Edits a URL in the database.
 * @param {string} id - The ID of the URL to be edited.
 * @param {string} newUrl - The new URL value.
 * @returns {Promise<boolean>} A promise that resolves to true if the URL was successfully edited, false otherwise.
 */

export const editUrl = async (id: string, newUrl: string): Promise<boolean> => {
  try {
    await db.update(urls).set({ original_url: newUrl }).where(eq(urls.id, id))
    return true
  } catch (error) {
    console.error("Error editing URL:", error)
    return false
  }
}
