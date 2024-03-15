import { lt } from "drizzle-orm"
import { db } from "../init"
import { passwordResets } from "../tables"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteExpiredResets = async (): Promise<any> => {
  console.log("RUNNING CRON TO DELETE EXPIRED RESETS")
  try {
    await db.delete(passwordResets).where(lt(passwordResets.expiration, new Date()))
    console.log("Expired password resets deleted successfully.")
  } catch (error) {
    console.error("Error resetting password:", error)
  }
}
