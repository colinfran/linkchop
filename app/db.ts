import { drizzle } from "drizzle-orm/postgres-js"
import { pgTable, varchar, boolean, date } from "drizzle-orm/pg-core"
import { count, eq, lt } from "drizzle-orm"
import postgres from "postgres"
import { compare, genSaltSync, hashSync } from "bcrypt-ts"
import ShortUniqueId from "short-unique-id"

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)
const db = drizzle(client)

const users = pgTable("users", {
  id: varchar("id"),
  name: varchar("name"),
  email: varchar("email"),
  password: varchar("password"),
  is_premium_user: boolean("is_premium_user"),
  created_at: date("created_at"),
  updated_at: date("updated_at"),
})

const urls = pgTable("urls", {
  id: varchar("id"),
  original_url: varchar("original_url"),
  user_id: varchar("user_id") || "",
  created_at: date("created_at"),
})

const visits = pgTable("visits", {
  id: varchar("id"),
  url_id: varchar("url_id") || "",
  timestamp: date("timestamp"),
  device_type: varchar("device_type"),
  device_model: varchar("device_model"),
  device_vendor: varchar("device_vendor"),
  is_a_bot: boolean("is_a_bot"),
  browser_name: varchar("browser_name"),
  browser_version: varchar("browser_version"),
  engine_name: varchar("engine_name"),
  engine_version: varchar("engine_version"),
  os_name: varchar("os_name"),
  os_version: varchar("os_version"),
})

const passwordResets = pgTable("password_resets", {
  id: varchar("id"),
  email: varchar("email"),
  expiration: date("expiration"),
})

export type UserType = {
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  is_premium_user: boolean | null
  created_at: string | null
  updated_at: string | null
}

export const getUser = async (email: string): Promise<UserType[]> => {
  const cleanedEmail = email.toLowerCase()
  return await db.select().from(users).where(eq(users.email, cleanedEmail))
}

export const getUserById = async (id: string): Promise<UserType[]> => {
  return await db.select().from(users).where(eq(users.id, id))
}

export const createUser = async (
  email: string,
  password: string,
  name: string,
): Promise<UserType[]> => {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)
  const cleanedEmail = email.toLowerCase()
  return await db.insert(users).values({ email: cleanedEmail, name, password: hash })
}

type CreateUrlsQueryType = { id: string; original_url: string; user_id: string }

export const createUrl = async (
  idVal: string,
  originalUrl: string,
  userId: string | null,
): Promise<CreateUrlsQueryType[]> => {
  let id = idVal
  // check to see if idVal exists (it shoudlnt but theres like a .00000001 chance it could)
  // if it does exist, get a new Id. keep checking until one of the generated Id's is unique.
  // this while loop will probably never run but better safe than sorry!
  let result = await db.select().from(urls).where(eq(urls.id, id))
  while (result.length !== 0) {
    const uid = new ShortUniqueId({ length: 6 })
    id = uid.rnd()
    result = await db.select().from(urls).where(eq(urls.id, id))
  }
  const values = { id, original_url: originalUrl, user_id: userId }
  return await db.insert(urls).values(values)
}

type GetUrlsType = {
  id: string | null
  original_url: string | null
  created_at: string | null
  user_id: string | null
  visit_count: number | null
}

export const getUrls = async (userId: string): Promise<GetUrlsType[]> => {
  return await db
    .select({
      id: urls.id,
      original_url: urls.original_url,
      created_at: urls.created_at,
      user_id: urls.user_id,
      visit_count: count(visits.id),
    })
    .from(urls)
    .leftJoin(visits, eq(urls.id, visits.url_id))
    .where(eq(urls.user_id, userId))
    .groupBy(urls.id, urls.original_url)
}

export const deleteUrl = async (id: string): Promise<boolean> => {
  try {
    await db.delete(urls).where(eq(urls.id, id))
    return true
  } catch (error) {
    console.error("Error deleting URL:", error)
    return false
  }
}

export const editUrl = async (id: string, newUrl: string): Promise<boolean> => {
  try {
    await db.update(urls).set({ original_url: newUrl }).where(eq(urls.id, id))
    return true
  } catch (error) {
    console.error("Error editing URL:", error)
    return false
  }
}

type GetUrlType = {
  id: string | null
  original_url: string | null
  created_at: string | null
  user_id: string | null
}

export const getUrl = async (id: string): Promise<GetUrlType[]> => {
  return await db.select().from(urls).where(eq(urls.id, id))
}

type VisitData = {
  url_id: string
  device_type: string | undefined
  device_model: string | undefined
  device_vendor: string | undefined
  is_a_bot: boolean | undefined
  browser_name: string | undefined
  browser_version: string | undefined
  engine_name: string | undefined
  engine_version: string | undefined
  os_name: string | undefined
  os_version: string | undefined
}

export const addVisit = async (data: VisitData): Promise<boolean> => {
  try {
    await db.insert(visits).values(data)
    return true
  } catch (error) {
    console.error("Error adding visit:", error)
    return false
  }
}

export const setSubscriber = async (email: string): Promise<boolean> => {
  try {
    await db.update(users).set({ is_premium_user: true }).where(eq(users.email, email))
    return true
  } catch (error) {
    console.error("Error setting subscriber:", error)
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (data: any): Promise<any> => {
  let updatedData = { ...data }
  delete updatedData.updated_at
  try {
    if (updatedData.newEmail) {
      delete updatedData.newEmail
      // check if someone is using new email
      const newEmail = data.newEmail
      const result = await db.select().from(users).where(eq(users.email, newEmail))
      if (result.length !== 0) {
        return {
          success: false,
          errorMessage: "Email address is currently being used by another account.",
        }
      } else {
        updatedData.email = data.newEmail
      }
    }
    if (updatedData.newPassword) {
      if (updatedData.oldPassword) {
        const passwordsMatch = await compare(updatedData.oldPassword, data.password)
        if (!passwordsMatch) {
          return {
            success: false,
            errorMessage: "Incorrect old password.",
          }
        }
        delete updatedData.oldPassword
        delete updatedData.newPassword
        const salt = genSaltSync(10)
        const hash = hashSync(data.newPassword, salt)
        updatedData.password = hash
      } else {
        const user = await getUser(data.email)
        console.log(user)
        updatedData = { ...user[0] }
        data.created_at = updatedData.created_at
        data.id = updatedData.id
        delete updatedData.updated_at
        delete updatedData.newPassword
        const salt = genSaltSync(10)
        const hash = hashSync(data.newPassword, salt)
        updatedData.password = hash
      }
    }
    updatedData.created_at = new Date(data.created_at).toISOString()
    updatedData.updated_at = new Date().toISOString()
    await db.update(users).set(updatedData).where(eq(users.id, data.id))
    return { success: true }
  } catch (error) {
    console.error("Error", error)
    return { success: false, errorMessage: error }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPasswordResetToken = async (email: string): Promise<any> => {
  try {
    return await db.insert(passwordResets).values({ email }).returning()
  } catch (error) {
    console.error("Error resetting password:", error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isIdExpired = async (id: string): Promise<any> => {
  try {
    const query = await db.select().from(passwordResets).where(eq(passwordResets.id, id))
    // Check if the result has any rows
    const idExists = query.length > 0

    // Check if the expiration has expired
    return idExists ? new Date(query[0].expiration!) < new Date() : true
  } catch (error) {
    console.error("Error resetting password:", error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteExpiredResets = async (): Promise<any> => {
  console.log("RUNNING CRON TO DELETE EXPIRED RESETS")
  try {
    await db.delete(passwordResets).where(lt(passwordResets.expiration, new Date().toISOString()))
  } catch (error) {
    console.error("Error resetting password:", error)
  }
}
