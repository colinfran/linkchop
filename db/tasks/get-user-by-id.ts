import { eq } from "drizzle-orm"
import { db } from "../init"
import { users } from "../tables"

export type UserType = {
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  is_premium_user: boolean | null
  created_at: string | null
  updated_at: string | null
}

export const getUserById = async (id: string): Promise<UserType[]> => {
  return await db.select().from(users).where(eq(users.id, id))
}
