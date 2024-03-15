import { eq } from "drizzle-orm"
import { db } from "../init"
import { urls } from "../tables"

type GetUrlType = {
  id: string | null
  original_url: string | null
  created_at: string | null
  user_id: string | null
}

export const getUrl = async (id: string): Promise<GetUrlType[]> => {
  return await db.select().from(urls).where(eq(urls.id, id))
}
