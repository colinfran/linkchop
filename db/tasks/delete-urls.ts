import { and, eq } from "drizzle-orm"
import { db } from "../init"
import { urls, visits } from "../tables"

/**
 * Deletes a shortened URL and its visits, if it belongs to the given user.
 * @param {string} id - The ID of the URL to delete.
 * @param {string} userId - The signed-in user's id. Must come from the session.
 * @returns {Promise<boolean>} A promise that resolves to true if the URL was deleted, false if it
 * doesn't exist, isn't owned by the user, or the deletion failed.
 */

export const deleteUrl = async (id: string, userId: string): Promise<boolean> => {
  try {
    const isOwner = and(eq(urls.id, id), eq(urls.user_id, userId))
    const owned = await db.select({ id: urls.id }).from(urls).where(isOwner)
    if (owned.length === 0) return false
    await db.delete(visits).where(eq(visits.url_id, id))
    await db.delete(urls).where(isOwner)
    return true
  } catch (error) {
    console.error("Error deleting URL:", error)
    return false
  }
}
