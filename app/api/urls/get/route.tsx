import { getUrls } from "app/db"

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  const { userId } = res
  try {
    const urlArray = await getUrls(userId)
    return Response.json(urlArray)
  } catch (error) {
    console.error("Error getting URL:", error)
    return res.status(500).json({ error: "Server Error" })
  }
}
