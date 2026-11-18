/**
 * Endpoints protected by Vercel BotID (https://vercel.com/docs/botid).
 *
 * <BotIdClient /> in app/layout.tsx attaches BotID headers only to requests matching
 * this list, and each matching route handler calls rejectBots(). Keep both in sync:
 * calling rejectBots() on a route missing from this list blocks every visitor.
 * Paths are exact matches (no prefix matching).
 */
export const botIdProtectedRoutes = [
  { path: "/api/urls/create", method: "POST" },
  { path: "/api/auth/register", method: "POST" },
  { path: "/api/auth/callback/credentials", method: "POST" },
  { path: "/api/auth/forgot-password", method: "POST" },
  { path: "/api/auth/forgot-password/check-id", method: "POST" },
  { path: "/api/auth/password-reset", method: "POST" },
  { path: "/api/user/update", method: "POST" },
]
