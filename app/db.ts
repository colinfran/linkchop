import { drizzle } from "drizzle-orm/postgres-js"
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"
import { eq } from "drizzle-orm"
import postgres from "postgres"
import { genSaltSync, hashSync } from "bcrypt-ts"

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)
const db = drizzle(client)

const users = pgTable("users", {
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  password: varchar("password", { length: 100 }),
})

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email))
}

export async function createUser(email: string, password: string, name: string) {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)

  const date = new Date().toISOString()
  return await db.insert(users).values({ email, name, password: hash })
}
