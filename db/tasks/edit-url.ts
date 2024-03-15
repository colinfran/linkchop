import { eq } from "drizzle-orm"
import { db } from "../init"
import { urls } from "../tables"

export const editUrl = async (id: string, newUrl: string): Promise<boolean> => {
  try {
    await db.update(urls).set({ original_url: newUrl }).where(eq(urls.id, id))
    return true
  } catch (error) {
    console.error("Error editing URL:", error)
    return false
  }
}
