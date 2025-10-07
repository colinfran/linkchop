import { NextResponse } from "next/server"
import postgres from "postgres"

/**
 * Handles GET requests to the '/api/linkchop-uptime/database' endpoints.
 * Checks to see if the LinkChop.com database is running.
 * @returns {Promise<NextResponse>} - Returns a response object.
 */

export async function GET(): Promise<NextResponse> {
  try {
    const connectionString = process.env.POSTGRES_URL!
    const sql = postgres(connectionString)
    await sql`select 1`
    return NextResponse.json({ message: "Database is running" }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Database is not running" }, { status: 503 })
  }
}
