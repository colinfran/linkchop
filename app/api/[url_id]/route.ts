// import { signIn } from "@/app/auth/auth"
import { getUrl, addClick } from "app/db"
import { NextResponse } from "next/server"

export async function GET(request: Request): Promise<Response> {
  try {
    const requestUrl = new URL(request.url)
    const id = requestUrl.pathname.slice(1)
    // check if url id is valid
    const data = await getUrl(id)
    const { original_url, user_id } = data[0]
    if (data) {
      console.log(user_id)
      if (user_id !== null && user_id !== "") {
        await addClick(id)
      }
      return NextResponse.redirect(original_url)
    } else {
      throw Error("URL does not exist in DB")
    }
  } catch (err) {
    console.error(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
