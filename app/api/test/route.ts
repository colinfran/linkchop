import { NextResponse } from "next/server"

export async function GET(request: Request): Promise<NextResponse> {
  try {
    NextResponse.json({ error: false, success: true })
  } catch (err) {
    console.log(err)
    NextResponse.json({ error: true, success: false })
  }
}
