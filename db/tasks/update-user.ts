import { eq } from "drizzle-orm"
import { compare, genSaltSync, hashSync } from "bcrypt-ts"
import { db } from "../init"
import { users } from "../tables"

type Props = { success: boolean; errorMessage?: string }

export type UserChanges = {
  name?: string
  newEmail?: string
  newPassword?: string
  oldPassword?: string
}

/**
 * Updates the profile of a signed-in user. Only the name, email and password can change,
 * and a new password requires the current one (checked against the stored hash).
 * Password resets for signed-out users go through resetPassword instead.
 * @param {string} id - The user's id. Must come from the session, never the request body.
 * @param {UserChanges} changes - The requested changes.
 * @returns {Promise<Props>} A promise that resolves to an object indicating the success of the update operation.
 */
export const updateUser = async (id: string, changes: UserChanges): Promise<Props> => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    if (!user) return { success: false, errorMessage: "User not found." }

    const updates: Partial<typeof users.$inferInsert> = {}

    if (changes.name) updates.name = changes.name

    if (changes.newEmail) {
      const newEmail = changes.newEmail.toLowerCase()
      if (newEmail !== user.email) {
        const result = await db.select({ id: users.id }).from(users).where(eq(users.email, newEmail))
        if (result.length !== 0) {
          return {
            success: false,
            errorMessage: "Email address is currently being used by another account.",
          }
        }
        updates.email = newEmail
      }
    }

    if (changes.newPassword) {
      const passwordsMatch =
        !!changes.oldPassword && (await compare(changes.oldPassword, user.password || ""))
      if (!passwordsMatch) {
        return {
          success: false,
          errorMessage: "Incorrect old password.",
        }
      }
      updates.password = hashSync(changes.newPassword, genSaltSync(10))
    }

    updates.updated_at = new Date().toISOString()
    await db.update(users).set(updates).where(eq(users.id, id))
    return { success: true }
  } catch (error) {
    console.error("Error", error)
    return { success: false, errorMessage: "Something went wrong. Please try again." }
  }
}
