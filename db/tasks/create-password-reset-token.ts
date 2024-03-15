import { db } from "../init"
import { passwordResets } from "../tables"
import { PasswordResetTokenProps } from "../types"

/**
 * Creates a password reset token in the database.
 * @param {string} email - The email associated with the password reset.
 * @returns {Promise<PasswordResetTokenProps>} A promise that resolves to the created password reset token.
 */

export const createPasswordResetToken = async (email: string): Promise<PasswordResetTokenProps> => {
  try {
    return await db.insert(passwordResets).values({ email }).returning()
  } catch (error) {
    console.error("Error resetting password:", error)
  }
}
