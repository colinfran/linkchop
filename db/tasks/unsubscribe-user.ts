import { eq } from "drizzle-orm"
import { db } from "../init"
import { subscriptions } from "../tables"

/**
 * Sets a user as a subscriber in the database.
 * @param {string} email - The email of the user to set as a subscriber.
 * @returns {Promise<boolean>} A promise that resolves to a boolean if the user was set as a subscriber
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const unsubscribeUser = async (id: string, remainingDays: number): Promise<any> => {
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(today.getDate() + remainingDays)
  try {
    return await db
      .update(subscriptions)
      .set({ end_date: futureDate.toISOString(), status: "cancelled" })
      .where(eq(subscriptions.user_id, id))
  } catch (error) {
    console.error("Error setting subscriber:", error)
  }
}
