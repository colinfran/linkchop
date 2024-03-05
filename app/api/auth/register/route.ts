// import { signIn } from "@/app/auth/auth"
import { createUser, getUser } from "app/db"

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  const { email, name, password } = res
  try {
    // Check if user already exists
    const userExists = await getUser(email)
    if (userExists.length > 0) {
      return Response.json({ error: "User already exists" })
    }
    // Create new user
    await createUser(email, password, name)
    return Response.json({ success: true, message: "User registered successfully" })
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json({ error: "Registration failed" })
  }
}
