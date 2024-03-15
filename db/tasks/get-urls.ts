import { count, eq } from "drizzle-orm"
import { db } from "../init"
import { urls, visits } from "../tables"
import { GetUrlsType } from "../types"

/**
 * Retrieves URLs from the database associated with a specific user ID.
 * @param {string} userId - The ID of the user whose URLs are to be retrieved.
 * @returns {Promise<GetUrlsType[]>} A promise that resolves to an array containing the retrieved URLs.
 */

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
