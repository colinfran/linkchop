import { count, eq, lt } from "drizzle-orm"
import { compare, genSaltSync, hashSync } from "bcrypt-ts"
import ShortUniqueId from "short-unique-id"
import { db } from "../init"
import { users } from "../tables"

type UserType = {
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  is_premium_user: boolean | null
  created_at: string | null
  updated_at: string | null
}

export const getUser = async (email: string): Promise<UserType[]> => {
  const cleanedEmail = email.toLowerCase()
  return await db.select().from(users).where(eq(users.email, cleanedEmail))
}
