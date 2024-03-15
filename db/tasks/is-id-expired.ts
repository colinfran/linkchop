import { eq } from "drizzle-orm"
import { db } from "../init"
import { passwordResets } from "../tables"

export const isIdExpired = async (id: string): Promise<boolean> => {
  try {
    const query = await db.select().from(passwordResets).where(eq(passwordResets.id, id))
    // Check if the result has any rows
    const idExists = query.length > 0
    if (!idExists) return true
    // Check if the expiration has expired
    return new Date(query[0].expiration!) < new Date()
  } catch (error) {
    console.error("Error resetting password:", error)
    return true
  }
}
