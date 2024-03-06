// import { signIn } from "@/app/auth/auth"
import { getUrl, addClick } from "app/db"
import { NextResponse } from "next/server"

export async function GET(request: Request): Promise<Response> {
  try {
    const requestUrl = new URL(request.url)
    const id = requestUrl.pathname.slice(1)
    // check if url id is valid
    const data = await getUrl(id)
    if (data[0]) {
      const { original_url, user_id } = data[0]
      console.log(user_id)
      if (user_id !== null && user_id !== "") {
        await addClick(id)
      }
      return NextResponse.redirect(original_url)
    } else {
      return NextResponse.redirect(new URL("/404", request.url))
    }
  } catch (err) {
    console.log(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
