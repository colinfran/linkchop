import { eq } from "drizzle-orm"
import { db } from "../init"
import { users } from "../tables"

export const setSubscriber = async (email: string): Promise<boolean> => {
  try {
    await db.update(users).set({ is_premium_user: true }).where(eq(users.email, email))
    return true
  } catch (error) {
    console.error("Error setting subscriber:", error)
    return false
  }
}
