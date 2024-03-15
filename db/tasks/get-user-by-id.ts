import { eq } from "drizzle-orm"
import { db } from "../init"
import { users } from "../tables"
import { UserType } from "../types"

/**
 * Retrieves a user from the database by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<UserType[]>} A promise that resolves to an array containing the retrieved user.
 */

export const getUserById = async (id: string): Promise<UserType[]> => {
  return await db.select().from(users).where(eq(users.id, id))
}
