import { eq } from "drizzle-orm"
import { genSaltSync, hashSync } from "bcrypt-ts"
import { db } from "../init"
import { passwordResets, users } from "../tables"

type Props = { success: boolean; errorMessage?: string }

/**
 * Sets a new password for the account a password reset token was issued to.
 * The token must exist and not be expired. All of that email's reset tokens are
 * deleted afterwards, so each reset link works once.
 * @param {string} token - The password reset token id from the emailed link.
 * @param {string} newPassword - The new plain-text password.
 * @returns {Promise<Props>} A promise that resolves to an object indicating the success of the reset.
 */
export const resetPassword = async (token: string, newPassword: string): Promise<Props> => {
  const invalidLink = {
    success: false,
    errorMessage: "This password reset link is invalid or has expired.",
  }
  try {
    const [reset] = await db.select().from(passwordResets).where(eq(passwordResets.id, token))
    if (!reset?.email || !reset.expiration || reset.expiration < new Date()) return invalidLink

    const updated = await db
      .update(users)
      .set({
        password: hashSync(newPassword, genSaltSync(10)),
        updated_at: new Date().toISOString(),
      })
      .where(eq(users.email, reset.email.toLowerCase()))
      .returning({ id: users.id })

    await db.delete(passwordResets).where(eq(passwordResets.email, reset.email))

    if (updated.length === 0) return invalidLink
    return { success: true }
  } catch (error) {
    console.error("Error resetting password:", error)
    return { success: false, errorMessage: "Something went wrong. Please try again." }
  }
}
