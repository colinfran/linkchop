import { NextRequest } from "next/server"
import { GET, POST as authPOST } from "@/app/api/auth/auth"
import { rejectBots } from "@/lib/utils/rejectBots"

export { GET }

// Credential sign-ins are the brute-force target, so check BotID before NextAuth runs.
export const POST = async (request: NextRequest): Promise<Response> => {
  if (request.nextUrl.pathname === "/api/auth/callback/credentials") {
    const botResponse = await rejectBots()
    if (botResponse) return botResponse
  }
  return authPOST(request)
}
