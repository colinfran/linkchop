import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json({ error: false, success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: true, success: false })
  }
}
