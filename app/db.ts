import { drizzle } from "drizzle-orm/postgres-js"
import { pgTable, varchar, boolean, timestamp } from "drizzle-orm/pg-core"
import { count, eq } from "drizzle-orm"
import postgres from "postgres"
import { genSaltSync, hashSync } from "bcrypt-ts"
import ShortUniqueId from "short-unique-id"

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)
const db = drizzle(client)

type UsersQueryType = { name: string | null; email: string | null; password: string | null }

const users = pgTable("users", {
  id: varchar("id"),
  name: varchar("name"),
  email: varchar("email"),
  password: varchar("password"),
  is_premium_user: boolean("is_premium_user"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
})

const urls = pgTable("urls", {
  id: varchar("id"),
  original_url: varchar("original_url"),
  user_id: varchar("user_id") || "",
  created_at: timestamp("created_at"),
})

const clicks = pgTable("clicks", {
  id: varchar("id"),
  url_id: varchar("url_id") || "",
  timestamp: timestamp("timestamp"),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = async (email: string): Promise<any[]> => {
  const cleanedEmail = email.toLowerCase()
  return await db.select().from(users).where(eq(users.email, cleanedEmail))
}

export const createUser = async (
  email: string,
  password: string,
  name: string,
): Promise<UsersQueryType[]> => {
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
): Promise<CreateUrlsQueryType[]> => { // eslint-disable-line
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

// type GetUrlsQueryType = { id: string; original_url: string; user_id: string; created_at: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUrls = async (userId: string): Promise<any[]> => {
  // return await db.select().from(urls).where(eq(urls.user_id, userId))
  return await db
    .select({
      id: urls.id,
      original_url: urls.original_url,
      created_at: urls.created_at,
      user_id: urls.user_id,
      click_count: count(clicks.id),
    })
    .from(urls)
    .leftJoin(clicks, eq(urls.id, clicks.url_id))
    .where(eq(urls.user_id, userId))
    .groupBy(urls.id, urls.original_url)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUrl = async (id: string): Promise<any[]> => {
  return await db.delete(urls).where(eq(urls.id, id))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editUrl = async (id: string, newUrl: string): Promise<any[]> => {
  return await db.update(urls).set({ original_url: newUrl }).where(eq(urls.id, id))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUrl = async (id: string): Promise<any[]> => {
  return await db.select().from(urls).where(eq(urls.id, id))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addClick = async (id: string): Promise<any[]> => {
  return await db.insert(clicks).values({ url_id: id })
}
