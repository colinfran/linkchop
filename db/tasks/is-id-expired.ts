import { eq } from "drizzle-orm"
import { db } from "../init"
import { passwordResets } from "../tables"

/**
 * Checks if a password reset token ID has expired.
 * @param {string} id - The ID of the password reset.
 * @returns {Promise<boolean>} A promise that resolves to true if the ID has expired, false otherwise.
 */

export const isIdExpired = async (id: string): Promise<boolean> => {
  try {
    const query = await db.select().from(passwordResets).where(eq(passwordResets.id, id))
    const idExists = query.length > 0
    if (!idExists) return true
    return new Date(query[0].expiration!) < new Date()
  } catch (error) {
    console.error("Error resetting password:", error)
    return true
  }
}
