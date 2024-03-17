import { eq } from "drizzle-orm"
import { db } from "../init"
import { subscriptions } from "../tables"
import { GetSubscriptionType } from "../types"

/**
 * Retrieves a subsription from the database by it user id.
 * @param {string} id - The ID of the URL to retrieve.
 * @returns {Promise<GetSubscriptionType[]>} A promise that resolves to an array containing the retrieved URL.
 */

export const getSubscriptionInfo = async (id: string): Promise<GetSubscriptionType[]> => {
  return await db.select().from(subscriptions).where(eq(subscriptions.user_id, id))
}
