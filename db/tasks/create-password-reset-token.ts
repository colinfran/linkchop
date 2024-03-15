import { db } from "../init"
import { passwordResets } from "../tables"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPasswordResetToken = async (email: string): Promise<any> => {
  try {
    return await db.insert(passwordResets).values({ email }).returning()
  } catch (error) {
    console.error("Error resetting password:", error)
  }
}
