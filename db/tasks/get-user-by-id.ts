import { eq as equals } from "drizzle-orm"
import { db } from "../init"
import { users } from "../tables"
import { UserType } from "../types"
// import { subscriptions, users } from "../tables"

/**
 * Retrieves a user from the database by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<UserType[]>} A promise that resolves to an array containing the retrieved user.
 */

export const getUserById = async (id: string): Promise<UserType[]> => {
  const activeSubscription = !!(await db.query.subscriptions.findFirst({
    where: (subscription, { eq, gte }) =>
      eq(subscription.user_id, id) &&
      eq(subscription.status, "active") &&
      gte(subscription.expiration_day, new Date().getDate()),
  }))

  const user = await db.select().from(users).where(equals(users.id, id))

  const value = {
    ...user[0],
    is_premium_user: activeSubscription,
  }
  return [value]
}
