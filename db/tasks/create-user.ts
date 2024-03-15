import { genSaltSync, hashSync } from "bcrypt-ts"
import { users } from "../tables"
import { db } from "../init"

export type UserType = {
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  is_premium_user: boolean | null
  created_at: string | null
  updated_at: string | null
}

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
