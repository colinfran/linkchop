import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./tables"

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)
const db = drizzle(client, { schema })

export { db, client }
