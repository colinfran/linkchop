import { createUrl } from "app/db"
import ShortUniqueId from "short-unique-id"

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  const { originalUrl, userId = null } = res
  const uid = new ShortUniqueId({ length: 6 })
  const id = uid.rnd()
  try {
    await createUrl(id, originalUrl, userId)
    return Response.json({ urlId: id })
  } catch (error) {
    console.error("Error creating URL:", error)
    return res.status(500).json({ error: "Server Error" })
  }
}
