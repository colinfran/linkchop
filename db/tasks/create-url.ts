import { eq } from "drizzle-orm"
import ShortUniqueId from "short-unique-id"
import { db } from "../init"
import { urls } from "../tables"

type CreateUrlsQueryType = { id: string; original_url: string; user_id: string }

export const createUrl = async (
  idVal: string,
  originalUrl: string,
  userId: string | null,
): Promise<CreateUrlsQueryType[]> => {
  let id = idVal
  // check to see if idVal exists (it shoudlnt but theres like a .00000001 chance it could)
  // if it does exist, get a new Id. keep checking until one of the generated Id's is unique.
  // this while loop will probably never run but better safe than sorry!
  let result = await db.select().from(urls).where(eq(urls.id, id))
  while (result.length !== 0) {
    const uid = new ShortUniqueId({ length: 6 })
    id = uid.rnd()
    result = await db.select().from(urls).where(eq(urls.id, id))
  }
  const values = { id, original_url: originalUrl, user_id: userId }
  return await db.insert(urls).values(values)
}
