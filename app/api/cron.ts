import { deleteExpiredResets } from "../db"

export async function GET(request: Request): Promise<Response> {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }
  await deleteExpiredResets()
  return Response.json({ success: true })
}
