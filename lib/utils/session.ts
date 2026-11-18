import { auth } from "@/app/api/auth/auth"

/**
 * Returns the signed-in user's id from the NextAuth session.
 * API routes must use this instead of any user id sent in the request body,
 * since the body is fully controlled by the caller.
 * @returns {Promise<string | null>} The user id, or null when nobody is signed in.
 */
export const getSessionUserId = async (): Promise<string | null> => {
  const session = await auth()
  return session?.user?.data?.id || null
}

/**
 * Response for API routes that require a signed-in user.
 * @returns {Response} A 401 JSON response.
 */
export const unauthorizedResponse = (): Response =>
  Response.json({ success: false, error: "Unauthorized" }, { status: 401 })

/**
 * Checks a new password against the same rules the sign-up, reset and security forms use.
 * @param {unknown} password - The value from the request body.
 * @returns {boolean} True if it is a string of 8 to 32 characters.
 */
export const isValidPassword = (password: unknown): password is string =>
  typeof password === "string" && password.length >= 8 && password.length <= 32
