import { eq } from "drizzle-orm"
import { db } from "../init"
import { users } from "../tables"

type BanUserResult = {
  success: boolean
  message: string
}

export const banUserByEmail = async (email: string): Promise<BanUserResult> => {
  const cleanedEmail = email.trim().toLowerCase()

  if (!cleanedEmail) {
    return { success: false, message: "Email is required." }
  }

  const existingUser = await db.select().from(users).where(eq(users.email, cleanedEmail))

  if (!existingUser[0]) {
    return { success: false, message: `No user found for ${cleanedEmail}.` }
  }

  await db
    .update(users)
    .set({
      is_banned: true,
      updated_at: new Date().toISOString(),
    })
    .where(eq(users.email, cleanedEmail))

  return { success: true, message: `Banned ${cleanedEmail}.` }
}
