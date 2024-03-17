import { db } from "../init"
import { subscriptions } from "../tables"

/**
 * Sets a user as a subscriber in the database.
 * @param {string} email - The email of the user to set as a subscriber.
 * @returns {Promise<boolean>} A promise that resolves to a boolean if the user was set as a subscriber
 */

export const setSubscriber = async (id: string): Promise<boolean> => {
  try {
    await db.insert(subscriptions).values({
      user_id: id,
      start_date: new Date().toISOString(),
      status: "active",
      expiration_day: new Date().getDate(),
    })
    return true
  } catch (error) {
    console.error("Error setting subscriber:", error)
    return false
  }
}
