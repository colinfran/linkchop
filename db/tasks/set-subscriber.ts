import { and, eq } from "drizzle-orm"
import { db } from "../init"
import { subscriptions } from "../tables"

/**
 * Records a new active subscription for a user after a completed Stripe checkout.
 * Skips the insert if this Stripe subscription was already recorded (e.g. the return
 * page was reloaded, or a completed checkout session is replayed).
 * @param {string} id - The user's id. Must come from the session.
 * @param {string | null} subscriptionId - The Stripe subscription id from the checkout session.
 * @returns {Promise<boolean>} A promise that resolves to true if a new subscription was recorded.
 */

export const setSubscriber = async (id: string, subscriptionId: string | null): Promise<boolean> => {
  try {
    const existing = await db
      .select({ user_id: subscriptions.user_id })
      .from(subscriptions)
      .where(
        subscriptionId
          ? eq(subscriptions.subscription_id, subscriptionId)
          : and(eq(subscriptions.user_id, id), eq(subscriptions.status, "active")),
      )
    if (existing.length > 0) return false

    await db.insert(subscriptions).values({
      subscription_id: subscriptionId,
      user_id: id,
      start_date: new Date().toISOString(),
      status: "active",
      expiration_day: new Date().getDate(),
      end_date: null,
    })
    return true
  } catch (error) {
    console.error("Error setting subscriber:", error)
    return false
  }
}
