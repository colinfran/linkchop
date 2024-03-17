import { db } from "../init"
import { eq as equals } from "drizzle-orm"
import { users } from "../tables"
import { UserType } from "../types"

/**
 * Retrieves a user from the database by their email.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<UserType[]>} A promise that resolves to an array containing the retrieved user.
 */

export const getUser = async (email: string): Promise<UserType[]> => {
  const cleanedEmail = email.toLowerCase()

  const userArr = await db
    .select({ id: users.id })
    .from(users)
    .where(equals(users.email, cleanedEmail))
  const { id } = userArr[0]

  console.log(id)
  const activeSubscription = !!(await db.query.subscriptions.findFirst({
    where: (subscription, { eq, gte }) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eq(subscription.user_id as any, id as any) &&
      eq(subscription.status, "active") &&
      gte(subscription.expiration_day, new Date().getDate()),
  }))

  const user = await db.select().from(users).where(equals(users.email, cleanedEmail))

  const value = {
    ...user[0],
    is_premium_user: activeSubscription,
  }
  console.log(value)
  return [value]
}
