import { NextResponse } from "next/server"

export async function GET(): Promise<void> {
  try {
    NextResponse.json({ error: false, success: true })
  } catch (err) {
    console.log(err)
    NextResponse.json({ error: true, success: false })
  }
}
