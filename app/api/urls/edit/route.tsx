import { editUrl } from "app/db"

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  const { id, newUrl } = res
  try {
    await editUrl(id, newUrl)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Error getting URL:", error)
    return res.status(500).json({ error: "Server Error" })
  }
}
