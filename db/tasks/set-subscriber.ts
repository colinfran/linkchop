import { eq } from "drizzle-orm"
import { db } from "../init"
import { users } from "../tables"

/**
 * Sets a user as a subscriber in the database.
 * @param {string} email - The email of the user to set as a subscriber.
 * @returns {Promise<boolean>} A promise that resolves to a boolean if the user was set as a subscriber
 */

export const setSubscriber = async (email: string): Promise<boolean> => {
  try {
    await db.update(users).set({ is_premium_user: true }).where(eq(users.email, email))
    return true
  } catch (error) {
    console.error("Error setting subscriber:", error)
    return false
  }
}
