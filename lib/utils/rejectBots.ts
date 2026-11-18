import { checkBotId } from "botid/server"

/**
 * Runs a Vercel BotID check on the current request.
 * Only call this from routes listed in botIdProtectedRoutes.
 * Fails open: if the check itself errors (BotID outage, OIDC disabled on the project),
 * the request is allowed so sign-up, sign-in and link creation keep working.
 * Always returns null in local development.
 * @returns {Promise<Response | null>} A 403 response if the request came from a bot, otherwise null.
 */
export const rejectBots = async (): Promise<Response | null> => {
  try {
    const { isBot } = await checkBotId()
    if (isBot) return Response.json({ error: "Access denied" }, { status: 403 })
  } catch (error) {
    console.error("BotID check failed, allowing request:", error)
  }
  return null
}
