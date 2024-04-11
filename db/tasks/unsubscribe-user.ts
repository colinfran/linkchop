import { eq } from "drizzle-orm"
import { db } from "../init"
import { subscriptions } from "../tables"

/**
 * Unsubscribes a user from the LinkChop premium service.
 * @param {string} id - The id of the user to set as unsubscriber.
 * @param {string} remainingDays - The amount of days left for the user as a subscriber
 * @returns {Promise<boolean>} A promise that resolves to a boolean if the user was successfully unsubscribed
 */

export const unsubscribeUser = async (id: string, remainingDays: number): Promise<boolean> => {
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(today.getDate() + remainingDays)
  try {
    await db
      .update(subscriptions)
      .set({ end_date: futureDate.toISOString(), status: "cancelled" })
      .where(eq(subscriptions.user_id, id))
    return true
  } catch (error) {
    console.error("Error setting subscriber:", error)
    return false
  }
}
