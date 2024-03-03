import { drizzle } from "drizzle-orm/postgres-js"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { eq } from "drizzle-orm"
import postgres from "postgres"
import { genSaltSync, hashSync } from "bcrypt-ts"

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)
const db = drizzle(client)

type QueryType = { name: string | null; email: string | null; password: string | null }

const users = pgTable("users", {
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  password: varchar("password", { length: 100 }),
})

export const getUser = async (email: string): Promise<QueryType[]> => {
  return await db.select().from(users).where(eq(users.email, email))
}

export const createUser = async (
  email: string,
  password: string,
  name: string,
): Promise<QueryType[]> => {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)
  return await db.insert(users).values({ email, name, password: hash })
}
