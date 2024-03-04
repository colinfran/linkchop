import { deleteUrl } from "app/db"

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  const { id } = res
  try {
    await deleteUrl(id)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Error deleting URL:", error)
    return res.status(500).json({ error: "Server Error" })
  }
}
