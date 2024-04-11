import { eq } from "drizzle-orm"
import { compare, genSaltSync, hashSync } from "bcrypt-ts"
import { db } from "../init"
import { users } from "../tables"
import { getUser } from "./get-user"

/**
 * Updates user data in the database.
 * @param {object} data - The data to update.
 * @returns {Promise<Props>} A promise that resolves to an object indicating the success of the update operation.
 */

type Props = { success: boolean; errorMessage?: string }
interface UserProps {
  id: string
  name: string
  email: string
  password?: string
  created_at?: string
  updated_at?: string
  is_premium_user?: boolean
  newEmail?: string
  newPassword?: string
  oldPassword?: string
}
export const updateUser = async (data: UserProps): Promise<Props> => {
  let updatedData = { ...data }
  delete updatedData.updated_at
  try {
    if (updatedData.newEmail) {
      delete updatedData.newEmail
      const newEmail = data.newEmail || ""
      const result = await db.select().from(users).where(eq(users.email, newEmail))
      if (result.length !== 0) {
        return {
          success: false,
          errorMessage: "Email address is currently being used by another account.",
        }
      } else {
        updatedData.email = data.newEmail || ""
      }
    }
    if (updatedData.newPassword) {
      // authenticated user is updating password
      if (updatedData.oldPassword) {
        const pass = data.password || ""
        const passwordsMatch = await compare(updatedData.oldPassword, pass)
        if (!passwordsMatch) {
          return {
            success: false,
            errorMessage: "Incorrect old password.",
          }
        }
        delete updatedData.oldPassword
        delete updatedData.newPassword
        const salt = genSaltSync(10)
        const newPass = data.newPassword || ""
        const hash = hashSync(newPass, salt)
        updatedData.password = hash
      }
      // user forgot password
      else {
        const user = await getUser(data.email)
        updatedData = { ...user[0] } as UserProps
        data.created_at = updatedData.created_at
        data.id = updatedData.id
        delete updatedData.updated_at
        delete updatedData.newPassword
        const salt = genSaltSync(10)
        const newPass = data.newPassword || ""
        const hash = hashSync(newPass, salt)
        updatedData.password = hash
      }
    }
    updatedData.created_at = new Date(data.created_at || "").toISOString()
    updatedData.updated_at = new Date().toISOString()
    await db.update(users).set(updatedData).where(eq(users.id, data.id))
    return { success: true }
  } catch (error) {
    console.error("Error", error)
    return { success: false, errorMessage: `${error}` }
  }
}
