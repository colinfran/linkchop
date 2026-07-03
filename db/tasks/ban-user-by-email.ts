import { eq, inArray } from "drizzle-orm"
import { db } from "../init"
import { urls, users, visits } from "../tables"

type BanUserResult = {
  success: boolean
  message: string
}

export const banUserByEmail = async (email: string): Promise<BanUserResult> => {
  const cleanedEmail = email.trim().toLowerCase()

  if (!cleanedEmail) {
    return { success: false, message: "Email is required." }
  }

  const existingUser = await db.select().from(users).where(eq(users.email, cleanedEmail))

  if (!existingUser[0]) {
    return { success: false, message: `No user found for ${cleanedEmail}.` }
  }

  const userId = existingUser[0].id
  if (!userId) {
    return { success: false, message: `User ${cleanedEmail} has no id and cannot be banned.` }
  }

  const result = await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({
        is_banned: true,
        updated_at: new Date().toISOString(),
      })
      .where(eq(users.id, userId))

    const userUrls = await tx.select({ id: urls.id }).from(urls).where(eq(urls.user_id, userId))
    const userUrlIds = userUrls.map((item) => item.id).filter((id): id is string => Boolean(id))

    let deletedVisits = 0
    if (userUrlIds.length > 0) {
      const deletedVisitsRows = await tx
        .delete(visits)
        .where(inArray(visits.url_id, userUrlIds))
        .returning({ id: visits.id })
      deletedVisits = deletedVisitsRows.length
    }

    const deletedUrlsRows = await tx
      .delete(urls)
      .where(eq(urls.user_id, userId))
      .returning({ id: urls.id })

    return {
      deletedUrls: deletedUrlsRows.length,
      deletedVisits,
    }
  })

  return {
    success: true,
    message: `Banned ${cleanedEmail}. Deleted ${result.deletedUrls} URL(s) and ${result.deletedVisits} click record(s).`,
  }
}
