import { genSaltSync, hashSync } from "bcrypt-ts"
import { users } from "../tables"
import { db } from "../init"
import { UserType } from "../types"

/**
 * Creates a user in the database.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} name - The name of the user.
 * @returns {Promise<UserType[]>} A promise that resolves to an array containing the created user.
 */

export const createUser = async (
  email: string,
  password: string,
  name: string,
): Promise<UserType[]> => {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)
  const cleanedEmail = email.toLowerCase()
  return await db.insert(users).values({ email: cleanedEmail, name, password: hash })
}
