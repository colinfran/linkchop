import { eq } from "drizzle-orm"
import { db } from "../init"
import { users } from "../tables"
import { UserType } from "../types"

/**
 * Retrieves a user from the database by their email.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<UserType[]>} A promise that resolves to an array containing the retrieved user.
 */

export const getUser = async (email: string): Promise<UserType[]> => {
  const cleanedEmail = email.toLowerCase()
  return await db.select().from(users).where(eq(users.email, cleanedEmail))
}
