import { count, eq } from "drizzle-orm"
import { db } from "../init"
import { urls, visits } from "../tables"

type GetUrlsType = {
  id: string | null
  original_url: string | null
  created_at: string | null
  user_id: string | null
  visit_count: number | null
}

export const getUrls = async (userId: string): Promise<GetUrlsType[]> => {
  return await db
    .select({
      id: urls.id,
      original_url: urls.original_url,
      created_at: urls.created_at,
      user_id: urls.user_id,
      visit_count: count(visits.id),
    })
    .from(urls)
    .leftJoin(visits, eq(urls.id, visits.url_id))
    .where(eq(urls.user_id, userId))
    .groupBy(urls.id, urls.original_url)
}
