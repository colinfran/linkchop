import { and, eq } from "drizzle-orm"
import { db } from "../init"
import { urls } from "../tables"

/**
 * Changes where a shortened URL points, if it belongs to the given user.
 * @param {string} id - The ID of the URL to edit.
 * @param {string} userId - The signed-in user's id. Must come from the session.
 * @param {string} newUrl - The new destination URL.
 * @returns {Promise<boolean>} A promise that resolves to true if the URL was updated, false if it
 * doesn't exist, isn't owned by the user, or the update failed.
 */

export const editUrl = async (id: string, userId: string, newUrl: string): Promise<boolean> => {
  try {
    const updated = await db
      .update(urls)
      .set({ original_url: newUrl })
      .where(and(eq(urls.id, id), eq(urls.user_id, userId)))
      .returning({ id: urls.id })
    return updated.length > 0
  } catch (error) {
    console.error("Error editing URL:", error)
    return false
  }
}
