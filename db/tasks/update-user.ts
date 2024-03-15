import { eq } from "drizzle-orm"
import { compare, genSaltSync, hashSync } from "bcrypt-ts"
import { db } from "../init"
import { users } from "../tables"
import { getUser } from "./get-user"

type Props = {
  success: boolean
  errorMessage?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (data: any): Promise<Props> => {
  let updatedData = { ...data }
  delete updatedData.updated_at
  try {
    if (updatedData.newEmail) {
      delete updatedData.newEmail
      // check if someone is using new email
      const newEmail = data.newEmail
      const result = await db.select().from(users).where(eq(users.email, newEmail))
      if (result.length !== 0) {
        return {
          success: false,
          errorMessage: "Email address is currently being used by another account.",
        }
      } else {
        updatedData.email = data.newEmail
      }
    }
    if (updatedData.newPassword) {
      if (updatedData.oldPassword) {
        const passwordsMatch = await compare(updatedData.oldPassword, data.password)
        if (!passwordsMatch) {
          return {
            success: false,
            errorMessage: "Incorrect old password.",
          }
        }
        delete updatedData.oldPassword
        delete updatedData.newPassword
        const salt = genSaltSync(10)
        const hash = hashSync(data.newPassword, salt)
        updatedData.password = hash
      } else {
        const user = await getUser(data.email)
        console.log(user)
        updatedData = { ...user[0] }
        data.created_at = updatedData.created_at
        data.id = updatedData.id
        delete updatedData.updated_at
        delete updatedData.newPassword
        const salt = genSaltSync(10)
        const hash = hashSync(data.newPassword, salt)
        updatedData.password = hash
      }
    }
    updatedData.created_at = new Date(data.created_at).toISOString()
    updatedData.updated_at = new Date().toISOString()
    await db.update(users).set(updatedData).where(eq(users.id, data.id))
    return { success: true }
  } catch (error) {
    console.error("Error", error)
    return { success: false, errorMessage: `${error}` }
  }
}
