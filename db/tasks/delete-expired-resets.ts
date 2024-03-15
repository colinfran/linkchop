import { lt } from "drizzle-orm"
import { db } from "../init"
import { passwordResets } from "../tables"

/**
 * Deletes expired password reset tokens from the database.
 * @returns {Promise<void>} A promise that resolves when all expired reset tokens are deleted.
 */

export const deleteExpiredResets = async (): Promise<void> => {
  console.log("Running cron to delete expired password reset tokens.")
  try {
    await db.delete(passwordResets).where(lt(passwordResets.expiration, new Date()))
    console.log("Expired password resets deleted successfully.")
  } catch (error) {
    console.error("Error delete password reset tokens:", error)
  }
}
