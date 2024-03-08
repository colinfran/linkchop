// import { signIn } from "@/app/auth/auth"
import { getUrl, addClick } from "app/db"
import { NextResponse, userAgent } from "next/server"

export async function GET(request: Request): Promise<Response> {
  try {
    const requestUrl = new URL(request.url)
    const id = requestUrl.pathname.slice(1)
    // check if url id is valid

    const { device, isBot, browser, engine, os } = userAgent(request)
    const data = await getUrl(id)
    if (data[0]) {
      const { original_url, user_id } = data[0]
      console.log(user_id)
      if (user_id !== null && user_id !== "") {
        const clickData = {
          url_id: id,
          device_type: device.type,
          device_model: device.model,
          device_vendor: device.vendor,
          is_a_bot: isBot,
          browser_name: browser.name,
          browser_version: browser.version,
          engine_name: engine.name,
          engine_version: engine.version,
          os_name: os.name,
          os_version: os.version,
        }
        await addClick(clickData)
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
