import { and, eq } from "drizzle-orm"
import moment from "moment"
import { db } from "../init"
import { subscriptions } from "../tables"

/**
 * Unsubscribes a user from the LinkChop premium service. Premium stays active until the
 * next monthly payment date, calculated the same way the subscription settings page shows it.
 * @param {string} id - The user's id. Must come from the session.
 * @returns {Promise<boolean>} A promise that resolves to true if an active subscription was cancelled.
 */

export const unsubscribeUser = async (id: string): Promise<boolean> => {
  try {
    const [active] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.user_id, id), eq(subscriptions.status, "active")))
    if (!active) return false

    const today = moment()
    const expirationDay = active.expiration_day ?? today.date()
    let nextPaymentDate = moment(today).date(expirationDay)
    if (today.date() > expirationDay) {
      nextPaymentDate = nextPaymentDate.add(1, "months")
    }

    await db
      .update(subscriptions)
      .set({ end_date: nextPaymentDate.toISOString(), status: "cancelled" })
      .where(eq(subscriptions.user_id, id))
    return true
  } catch (error) {
    console.error("Error setting subscriber:", error)
    return false
  }
}
