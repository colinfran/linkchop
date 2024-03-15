import { eq } from "drizzle-orm"
import { db } from "../init"
import { urls } from "../tables"

export const deleteUrl = async (id: string): Promise<boolean> => {
  try {
    await db.delete(urls).where(eq(urls.id, id))
    return true
  } catch (error) {
    console.error("Error deleting URL:", error)
    return false
  }
}
